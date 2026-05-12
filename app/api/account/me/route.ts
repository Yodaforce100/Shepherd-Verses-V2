import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(req: NextRequest) {
  const subscriberId = req.cookies.get('sv_session')?.value

  if (!subscriberId) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const { data: subscriber } = await supabase
    .from('subscribers')
    .select('id, email, first_name, subscription_status, tier, preferred_time, timezone, stripe_customer_id')
    .eq('id', subscriberId)
    .single()

  if (!subscriber) {
    return NextResponse.json({ error: 'Not found' }, { status: 401 })
  }

  return NextResponse.json({ subscriber })
}
