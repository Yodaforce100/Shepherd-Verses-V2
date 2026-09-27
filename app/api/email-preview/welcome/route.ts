import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { renderWelcomeEmail } from '@/lib/emails/welcome-email'

const icons = ['telegram', 'pointer', 'log-in', 'bell-ring']

export async function GET(request: Request) {
  if (process.env.VERCEL_ENV === 'production') {
    return new Response('Not found', { status: 404 })
  }

  // The v0.build preview host doesn't reliably serve newly added public files,
  // so the preview inlines the icons. Real emails still load them from the live site.
  const iconData = Object.fromEntries(
    await Promise.all(
      icons.map(async (icon) => {
        const file = await readFile(path.join(process.cwd(), 'public/images/email', `step-${icon}.png`))
        return [icon, `data:image/png;base64,${file.toString('base64')}`] as const
      }),
    ),
  )

  const firstName = new URL(request.url).searchParams.get('name')
  const { html } = renderWelcomeEmail({ firstName, iconSrc: (icon) => iconData[icon] ?? '' })

  return new Response(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' },
  })
}
