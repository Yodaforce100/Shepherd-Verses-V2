import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'
import crypto from 'crypto'

export async function POST(req: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    const { email } = await req.json()
    if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 })

    const { data: subscriber } = await supabase
      .from('subscribers')
      .select('id, email, first_name, subscription_status')
      .eq('email', email.toLowerCase().trim())
      .single()

    if (!subscriber || subscriber.subscription_status !== 'active') {
      return NextResponse.json({ success: true })
    }

    const token = crypto.randomBytes(32).toString('hex')
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000)

    await supabase
      .from('subscribers')
      .update({
        metadata: { magic_link_token: token, magic_link_expires: expiresAt.toISOString() },
        updated_at: new Date().toISOString()
      })
      .eq('id', subscriber.id)

    const loginUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://shepherdverses.com'}/api/auth/callback?token=${token}&email=${encodeURIComponent(email)}`
    const firstName = subscriber.first_name || 'Friend'

    await resend.emails.send({
      from: 'hello@shepherdverses.com',
      to: email,
      subject: 'Your Shepherd Verses login link',
      html: `
        <div style="font-family: Inter, Georgia, sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 24px; background: #F2F1EE;">
          <div style="background: white; border-radius: 20px; padding: 44px 36px; text-align: center; box-shadow: 0 2px 20px rgba(0,0,0,0.06);">
            <div style="font-size: 40px; margin-bottom: 16px;">🙏</div>
            <p style="font-size: 11px; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; color: #CF9D3E; margin: 0 0 8px;">My Account</p>
            <h1 style="font-family: Georgia, serif; font-size: 26px; font-weight: 400; color: #001C5F; margin: 0 0 12px;">Welcome back, ${firstName}</h1>
            <p style="color: #4A6FA5; font-size: 14px; line-height: 1.6; margin: 0 0 32px;">Click the button below to access your account. This link expires in 15 minutes.</p>
            <a href="${loginUrl}" style="display: inline-block; background: linear-gradient(90deg, #D9B86A 0%, #F5E9A4 35%, #E8D48B 60%, #D9B86A 100%); color: #001C5F; text-decoration: none; padding: 16px 40px; border-radius: 50px; font-size: 15px; font-weight: 600; box-shadow: 0 4px 14px rgba(212,185,106,0.4);">Access my account</a>
            <p style="color: #9CA3AF; font-size: 13px; margin-top: 24px; margin-bottom: 0;">If you didn't request this, you can safely ignore this email.</p>
          </div>
          <p style="text-align: center; color: #9CA3AF; font-size: 12px; margin-top: 20px;">Shepherd Verses · <a href="https://shepherdverses.com" style="color: #4A6FA5; text-decoration: none;">shepherdverses.com</a></p>
        </div>
      `
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Magic link error:', error)
    return NextResponse.json({ error: 'Failed to send link' }, { status: 500 })
  }
}
