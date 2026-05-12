import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET(req: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { searchParams } = new URL(req.url)
  const token = searchParams.get('token')
  const email = searchParams.get('email')

  if (!token || !email) {
    return NextResponse.redirect(new URL('/login?error=invalid', req.url))
  }

  const { data: subscriber } = await supabase
    .from('subscribers')
    .select('id, email, metadata')
    .eq('email', email.toLowerCase().trim())
    .single()

  if (!subscriber) {
    return NextResponse.redirect(new URL('/login?error=invalid', req.url))
  }

  const meta = subscriber.metadata as any
  if (!meta?.magic_link_token || meta.magic_link_token !== token) {
    return NextResponse.redirect(new URL('/login?error=invalid', req.url))
  }

  if (!meta.magic_link_expires || new Date() > new Date(meta.magic_link_expires)) {
    return NextResponse.redirect(new URL('/login?error=expired', req.url))
  }

  await supabase
    .from('subscribers')
    .update({
      metadata: { ...meta, magic_link_token: null, magic_link_expires: null },
      updated_at: new Date().toISOString()
    })
    .eq('id', subscriber.id)

  const response = NextResponse.redirect(new URL('/account', req.url))
  response.cookies.set('sv_session', subscriber.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30,
    path: '/'
  })
  return response
}
