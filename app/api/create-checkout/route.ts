import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { priceId, customerEmail, tier, country, timezone } = await request.json()

    if (!priceId) {
      return NextResponse.json(
        { error: 'Price ID is required' },
        { status: 400 }
      )
    }

    const secretKey = process.env.STRIPE_SECRET_KEY
    if (!secretKey) {
      console.error('STRIPE_SECRET_KEY is not set!')
      return NextResponse.json(
        { error: 'Server configuration error: Stripe key missing' },
        { status: 500 }
      )
    }

    // Use hard-coded base URL since NEXT_PUBLIC_BASE_URL might not be available server-side
    const baseUrl = 'https://shepherdverses.com'
    const successUrl = `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`
    const cancelUrl = `${baseUrl}/#signup`

    console.log('Creating checkout session for:', { priceId, tier, country, timezone, successUrl, cancelUrl })
    console.log('Price ID being used:', priceId)

    // Call Stripe API directly using fetch instead of SDK
    const params = new URLSearchParams({
      'payment_method_types[0]': 'card',
      'mode': 'subscription',
      'line_items[0][price]': priceId,
      'line_items[0][quantity]': '1',
      'customer_email': customerEmail || 'user@example.com',
      'metadata[tier]': tier,
      'metadata[country]': country || 'unknown',
      'metadata[timezone]': timezone || 'unknown',
      'success_url': successUrl,
      'cancel_url': cancelUrl,
    })

    // Only add trial if explicitly set (some prices may not support it)
    if (tier) {
      params.append('subscription_data[trial_period_days]', '3')
    }

    const response = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${secretKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('Stripe API error:', data)
      return NextResponse.json(
        { error: data.error?.message || 'Stripe API error' },
        { status: response.status }
      )
    }

    console.log('✅ Session created:', data.id)
    
    return NextResponse.json({ 
      sessionId: data.id, 
      url: data.url,
    })
  } catch (error: any) {
    console.error('❌ API error:', error.message)
    return NextResponse.json(
      { error: error.message || 'Server error' },
      { status: 500 }
    )
  }
}
