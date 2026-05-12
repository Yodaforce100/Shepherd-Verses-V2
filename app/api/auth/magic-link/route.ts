import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'
import crypto from 'crypto'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()
    if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 })

    // Check subscriber exists
    const { data: subscriber } = await supabase
      .from('subscribers')
      .select('id, email, first_name, subscription_status')
      .eq('email', email.toLowerCase().trim())
      .single()

    // Always return success even if email not found (security best practice)
    if (!subscriber || subscriber.subscription_status !== 'active') {
      return NextResponse.json({ success: true })
    }

    // Generate a secure token
    const token = crypto.randomBytes(32).toString('hex')
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000) // 15 minutes

    // Store token in Supabase (using metadata field)
    await supabase
      .from('subscribers')
      .update({
        metadata: { magic_link_token: token, magic_link_expires: expiresAt.toISOString() },
        updated_at: new Date().toISOString()
      })
      .eq('id', subscriber.id)

    const loginUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://shepherdverses.com'}/api/auth/callback?token=${token}&email=${encodeURIComponent(email)}`
    const firstName = subscriber.first_name || 'Friend'

    // Send magic link email
    await resend.emails.send({
      from: 'hello@shepherdverses.com',
      to: email,
      subject: 'Your Shepherd Verses login link',
      html: `
        <div style="font-family: Inter, sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 24px; background: #F2F1EE;">
          <div style="background: white; border-radius: 16px; padding: 40px; text-align: center;">
            <div style="font-size: 40px; margin-bottom: 16px;">🙏</div>
            <h1 style="font-family: Georgia, serif; font-size: 24px; color: #3A4A5A; margin-bottom: 8px;">
              Welcome back, ${firstName}
            </h1>
            <p style="color: #4A5B6B; font-size: 15px; line-height: 1.6; margin-bottom: 32px;">
              Click the button below to access your Shepherd Verses account. This link expires in 15 minutes.
            </p>
            <a href="${loginUrl}" style="display: inline-block; background: #3A4A5A; color: white; text-decoration: none; padding: 14px 32px; border-radius: 10px; font-size: 15px; font-weight: 500;">
              Access my account
            </a>
            <p style="color: #A9C3D6; font-size: 13px; margin-top: 24px;">
              If you didn't request this, you can safely ignore this email.
            </p>
          </div>
          <p style="text-align: center; color: #A9C3D6; font-size: 12px; margin-top: 24px;">
            Shepherd Verses · shepherdverses.com
          </p>
        </div>
      `
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Magic link error:', error)
    return NextResponse.json({ error: 'Failed to send link' }, { status: 500 })
  }
}
