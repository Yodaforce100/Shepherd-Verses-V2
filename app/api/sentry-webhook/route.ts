import { NextRequest, NextResponse } from 'next/server'

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const GARETH_TELEGRAM_ID = process.env.GARETH_TELEGRAM_ID
const SENTRY_WEBHOOK_SECRET = process.env.SENTRY_WEBHOOK_SECRET

function escapeMarkdown(text: string): string {
  return text.replace(/[_*[\]()~`>#+=|{}.!\\-]/g, '\\$&')
}

type Parsed = { title: string; url: string; project: string; environment: string; level: string; culprit: string; action: string } | null

function parsePayload(payload: any): Parsed {
  const action = payload?.action || ''
  const data = payload?.data
  if (!data) return null

  if (data.issue) {
    const i = data.issue
    return {
      action,
      title: i.title || i.metadata?.value || 'Unknown error',
      url: i.url || i.web_url || '',
      project: i.project?.name || i.project_slug || '',
      environment: i.environment || '',
      level: (i.level || 'error').toLowerCase(),
      culprit: i.culprit || '',
    }
  }
  if (data.event) {
    const e = data.event
    return {
      action,
      title: e.title || e.message || 'Unknown event',
      url: e.web_url || e.url || '',
      project: e.project_slug || '',
      environment: e.environment || '',
      level: (e.level || 'error').toLowerCase(),
      culprit: e.culprit || '',
    }
  }
  return null
}

function buildMarkdownMessage(p: NonNullable<Parsed>): string {
  const emoji = p.action === 'resolved' ? '✅' : p.level === 'fatal' ? '🔥' : '🚨'
  const verb = p.action === 'resolved' ? 'RESOLVED' : 'ERROR'
  const lines = [
    `${emoji} *${verb}* \\| Shepherd Verses`,
    '',
    `*${escapeMarkdown(p.title)}*`,
    p.culprit ? `at \`${escapeMarkdown(p.culprit)}\`` : '',
    '',
    p.project ? `Project: ${escapeMarkdown(p.project)}` : '',
    p.environment ? `Env: ${escapeMarkdown(p.environment)}` : '',
    `Level: ${escapeMarkdown(p.level)}`,
    p.url ? `\n[View in Sentry](${p.url})` : '',
  ]
  return lines.filter(Boolean).join('\n')
}

function buildPlainTextMessage(p: NonNullable<Parsed>): string {
  const emoji = p.action === 'resolved' ? '✅' : p.level === 'fatal' ? '🔥' : '🚨'
  const verb = p.action === 'resolved' ? 'RESOLVED' : 'ERROR'
  const lines = [
    `${emoji} ${verb} | Shepherd Verses`,
    '',
    p.title,
    p.culprit ? `at ${p.culprit}` : '',
    '',
    p.project ? `Project: ${p.project}` : '',
    p.environment ? `Env: ${p.environment}` : '',
    `Level: ${p.level}`,
    p.url ? `\n${p.url}` : '',
  ]
  return lines.filter(Boolean).join('\n')
}

async function sendTelegram(text: string, parseMode: 'MarkdownV2' | null): Promise<{ ok: boolean; status: number; body: string }> {
  const tgUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`
  const body: any = {
    chat_id: GARETH_TELEGRAM_ID,
    text,
    disable_web_page_preview: true,
  }
  if (parseMode) body.parse_mode = parseMode
  const res = await fetch(tgUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  return { ok: res.ok, status: res.status, body: await res.text() }
}

export async function POST(request: NextRequest) {
  try {
    if (!TELEGRAM_BOT_TOKEN || !GARETH_TELEGRAM_ID) {
      console.error('Sentry webhook: missing TELEGRAM_BOT_TOKEN or GARETH_TELEGRAM_ID')
      return NextResponse.json({ error: 'Server not configured' }, { status: 500 })
    }

    if (SENTRY_WEBHOOK_SECRET) {
      const provided = request.headers.get('x-sentry-webhook-secret') || request.nextUrl.searchParams.get('secret')
      if (provided !== SENTRY_WEBHOOK_SECRET) {
        console.warn('Sentry webhook: invalid secret')
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }
    }

    const payload = await request.json()
    const parsed = parsePayload(payload)
    if (!parsed) {
      console.log('Sentry webhook: unrecognised payload, skipping', JSON.stringify(payload).slice(0, 300))
      return NextResponse.json({ ok: true, skipped: 'unrecognised payload' })
    }

    if (parsed.action !== 'resolved' && !['error', 'fatal'].includes(parsed.level)) {
      console.log(`Sentry webhook: skipping level=${parsed.level}`)
      return NextResponse.json({ ok: true, skipped: `level=${parsed.level}` })
    }

    let result = await sendTelegram(buildMarkdownMessage(parsed), 'MarkdownV2')
    if (!result.ok) {
      console.warn('Sentry webhook: MarkdownV2 failed, falling back to plain text', result.status, result.body)
      result = await sendTelegram(buildPlainTextMessage(parsed), null)
    }
    if (!result.ok) {
      console.error('Sentry webhook: Telegram send failed', result.status, result.body)
      return NextResponse.json({ error: 'Telegram send failed', detail: result.body }, { status: 502 })
    }

    return NextResponse.json({ ok: true })
  } catch (error: any) {
    console.error('Sentry webhook error:', error?.message)
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    info: 'Sentry → Telegram webhook. POST Sentry payloads here.',
    configured: !!(TELEGRAM_BOT_TOKEN && GARETH_TELEGRAM_ID),
    secretRequired: !!SENTRY_WEBHOOK_SECRET,
  })
}

export async function HEAD() {
  return new Response(null, { status: 200 })
}

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Allow': 'GET, POST, HEAD, OPTIONS',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, HEAD, OPTIONS',
      'Access-Control-Allow-Headers': '*',
    },
  })
}
