import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import Stripe from 'stripe'

export async function POST(req: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

  const subscriberId = req.cookies.get('sv_session')?.value
  if (!subscriberId) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

  const { data: subscriber } = await supabase
    .from('subscribers')
    .select('stripe_subscription_id')
    .eq('id', subscriberId)
    .single()

  if (!subscriber?.stripe_subscription_id) {
    return NextResponse.json({ error: 'No active subscription found' }, { status: 400 })
  }

  await stripe.subscriptions.update(subscriber.stripe_subscription_id, {
    cancel_at_period_end: true
  })

  await supabase
    .from('subscribers')
    .update({ subscription_status: 'canceled', updated_at: new Date().toISOString() })
    .eq('id', subscriberId)

  return NextResponse.json({ success: true })
}
