import { renderWelcomeEmail } from '@/lib/emails/welcome-email'

export async function GET(request: Request) {
  if (process.env.VERCEL_ENV === 'production') {
    return new Response('Not found', { status: 404 })
  }

  const firstName = new URL(request.url).searchParams.get('name')
  const { html } = renderWelcomeEmail({ firstName })

  return new Response(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  })
}
