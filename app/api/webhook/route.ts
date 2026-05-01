import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'

// Initialize Supabase client only if keys are available
let supabase: any = null

const initSupabase = () => {
  if (!supabase && process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    const { createClient } = require('@supabase/supabase-js')
    supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )
  }
  return supabase
}

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    console.error('No Stripe signature provided')
    return NextResponse.json(
      { error: 'No signature provided' },
      { status: 400 }
    )
  }

  let event: Stripe.Event

  try {
    const secret = process.env.STRIPE_WEBHOOK_SECRET
    if (!secret) {
      console.error('❌ STRIPE_WEBHOOK_SECRET is not set in environment variables')
      return NextResponse.json(
        { error: 'Webhook secret not configured' },
        { status: 500 }
      )
    }
    
    event = stripe.webhooks.constructEvent(body, signature, secret)
  } catch (error: any) {
    console.error('❌ Webhook signature verification failed:', error.message)
    console.error('Secret present:', !!process.env.STRIPE_WEBHOOK_SECRET)
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    )
  }

  console.log(`📩 Webhook received: ${event.type}`)

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      
      // Extract subscriber data from session
      const customerEmail = session.customer_email
      const tier = session.metadata?.tier || 'companion'
      const country = session.metadata?.country || 'unknown'
      const timezone = session.metadata?.timezone || 'unknown'
      const subscriptionId = session.subscription as string
      const stripeCustomerId = session.customer as string

      console.log('✅ Checkout completed:', {
        email: customerEmail,
        tier,
        country,
        timezone,
        subscriptionId,
      })

      try {
        const db = initSupabase()
        
        if (!db) {
          console.warn('⚠️ Supabase not configured, skipping subscriber sync')
          console.log('ℹ️ Subscriber data (would be saved to Supabase):', {
            email: customerEmail,
            country,
            timezone,
            tier,
            stripeCustomerId,
          })
        } else {
          // Insert or update subscriber in Supabase
          const { data, error } = await db
            .from('subscribers')
            .upsert(
              {
                email: customerEmail,
                country,
                timezone,
                tier,
                stripe_customer_id: stripeCustomerId,
                stripe_subscription_id: subscriptionId,
                subscription_status: 'active',
                onboarding_complete: false,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
              },
              {
                onConflict: 'email', // Update if email already exists
              }
            )
            .select()

          if (error) {
            console.error('❌ Supabase insert error:', error)
            return NextResponse.json(
              { error: 'Database error', details: error.message },
              { status: 500 }
            )
          }

          console.log('✅ Subscriber saved to Supabase:', data)
        }

        // TODO: Send welcome message to Telegram bot
        // POST to bot endpoint with email + timezone to initiate onboarding
        
      } catch (err) {
        console.error('❌ Error processing checkout:', err)
        return NextResponse.json(
          { error: 'Processing error' },
          { status: 500 }
        )
      }
      
      break
    }

    case 'customer.subscription.updated': {
      const subscription = event.data.object as Stripe.Subscription
      const customerId = subscription.customer as string
      
      console.log('🔄 Subscription updated:', {
        subscriptionId: subscription.id,
        status: subscription.status,
      })

      try {
        const db = initSupabase()
        
        if (!db) {
          console.warn('⚠️ Supabase not configured, skipping update')
        } else {
          // Update subscription status in Supabase
          const { error } = await db
            .from('subscribers')
            .update({
              subscription_status: subscription.status,
              updated_at: new Date().toISOString(),
            })
            .eq('stripe_customer_id', customerId)

          if (error) {
            console.error('❌ Supabase update error:', error)
          } else {
            console.log('✅ Subscription status updated')
          }
        }
      } catch (err) {
        console.error('❌ Error updating subscription:', err)
      }
      
      break
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription
      const customerId = subscription.customer as string
      
      console.log('❌ Subscription deleted:', {
        subscriptionId: subscription.id,
      })

      try {
        const db = initSupabase()
        
        if (!db) {
          console.warn('⚠️ Supabase not configured, skipping update')
        } else {
          // Mark subscription as canceled in Supabase
          const { error } = await db
            .from('subscribers')
            .update({
              subscription_status: 'canceled',
              updated_at: new Date().toISOString(),
            })
            .eq('stripe_customer_id', customerId)

          if (error) {
            console.error('❌ Supabase update error:', error)
          } else {
            console.log('✅ Subscription marked as canceled')
          }
        }
      } catch (err) {
        console.error('❌ Error canceling subscription:', err)
      }
      
      break
    }

    default:
      console.log(`ℹ️ Unhandled event type: ${event.type}`)
  }

  return NextResponse.json({ received: true })
}
