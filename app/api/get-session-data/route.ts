import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

export async function GET(request: NextRequest) {
  try {
    const sessionId = request.nextUrl.searchParams.get('session_id')

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      )
    }

    // Fetch session data from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    // Extract relevant data
    const email = session.customer_email || ''
    const plan = session.metadata?.tier || 'companion'

    return NextResponse.json({
      email,
      plan,
      customerId: session.customer,
      subscriptionId: session.subscription,
    })
  } catch (error: any) {
    console.error('❌ Error fetching session data:', error.message)
    return NextResponse.json(
      { error: 'Failed to fetch session data' },
      { status: 500 }
    )
  }
}
