import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  const subscriberId = req.cookies.get('sv_session')?.value
  if (!subscriberId) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

  const { preferred_time } = await req.json()
  if (!preferred_time) return NextResponse.json({ error: 'Time required' }, { status: 400 })

  const { error } = await supabase
    .from('subscribers')
    .update({ preferred_time, updated_at: new Date().toISOString() })
    .eq('id', subscriberId)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ success: true })
}
