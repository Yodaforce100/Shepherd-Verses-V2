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
    .select('stripe_customer_id')
    .eq('id', subscriberId)
    .single()

  if (!subscriber?.stripe_customer_id) {
    return NextResponse.json({ error: 'No billing account found' }, { status: 400 })
  }

  const session = await stripe.billingPortal.sessions.create({
    customer: subscriber.stripe_customer_id,
    return_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://shepherdverses.com'}/account`
  })

  return NextResponse.json({ url: session.url })
}
