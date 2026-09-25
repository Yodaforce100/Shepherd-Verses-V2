const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://shepherdverses.com'
const TELEGRAM_URL = 'https://t.me/Shepherdverses_bot?start=connect'
const SUPPORT_EMAIL = 'hello@shepherdverses.com'

const colors = {
  navy: '#001C5F',
  gold: '#D9B86A',
  stone: '#F2F1EE',
  card: '#FFFFFF',
  softStone: '#F7F6F4',
  text: '#3A4A5A',
  muted: '#7A8794',
  border: '#E6E3DC',
}

// Email clients strip web fonts inconsistently, so every family needs a safe fallback.
const serif = "'Marcellus', Georgia, 'Times New Roman', serif"
const sans = "'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif"

type WelcomeEmailOptions = {
  firstName?: string | null
}

const steps = [
  {
    title: 'Connect to Telegram',
    body: 'Tap the button below to open our Telegram bot and press Start. This links your account.',
  },
  {
    title: 'Choose your time',
    body: 'Tell us when you would like your daily message to arrive, so it meets you at the start of your day.',
  },
  {
    title: 'Receive your first message',
    body: 'Your personalised scripture, affirmation and mantra arrive as a voice and written message.',
  },
]

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export function renderWelcomeEmail({ firstName }: WelcomeEmailOptions = {}) {
  const name = firstName?.trim() ? escapeHtml(firstName.trim()) : null
  const greeting = name ? `Welcome, ${name}` : 'Welcome to Shepherd Verses'
  const subject = 'Welcome to Shepherd Verses - your first step'
  const preheader = 'Connect to Telegram to receive your first daily message.'

  const stepsHtml = steps
    .map(
      (step, index) => `
        <tr>
          <td valign="top" width="44" style="padding: 0 0 20px 0;">
            <div style="width: 32px; height: 32px; line-height: 32px; border-radius: 16px; background-color: ${colors.navy}; color: ${colors.gold}; font-family: ${serif}; font-size: 16px; text-align: center;">${index + 1}</div>
          </td>
          <td valign="top" style="padding: 0 0 20px 0;">
            <p style="margin: 0 0 4px 0; font-family: ${serif}; font-size: 18px; line-height: 1.3; color: ${colors.navy};">${step.title}</p>
            <p style="margin: 0; font-family: ${sans}; font-size: 15px; line-height: 1.6; color: ${colors.text};">${step.body}</p>
          </td>
        </tr>`,
    )
    .join('')

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="light only" />
  <title>${subject}</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Marcellus&display=swap" rel="stylesheet" />
  <style>
    @media (max-width: 620px) {
      .container { width: 100% !important; }
      .px { padding-left: 24px !important; padding-right: 24px !important; }
      .h1 { font-size: 28px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: ${colors.stone};">
  <div style="display: none; max-height: 0; overflow: hidden; opacity: 0;">${preheader}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: ${colors.stone};">
    <tr>
      <td align="center" style="padding: 32px 12px;">
        <table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" border="0" style="width: 600px; max-width: 600px;">

          <tr>
            <td align="center" style="padding: 8px 0 24px 0;">
              <img src="${SITE_URL}/images/shepherd-verses-logo-cropped.png" alt="Shepherd Verses" width="200" style="display: block; width: 200px; height: auto; border: 0;" />
            </td>
          </tr>

          <tr>
            <td style="background-color: ${colors.card}; border-radius: 16px; overflow: hidden; border: 1px solid ${colors.border};">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">

                <tr>
                  <td class="px" align="center" style="background-color: ${colors.navy}; padding: 44px 48px 40px 48px; border-radius: 16px 16px 0 0;">
                    <p style="margin: 0 0 12px 0; font-family: ${sans}; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; color: ${colors.gold};">Your journey begins</p>
                    <h1 class="h1" style="margin: 0; font-family: ${serif}; font-weight: 400; font-size: 32px; line-height: 1.25; color: #FFFFFF;">${greeting}</h1>
                    <div style="width: 48px; height: 2px; background-color: ${colors.gold}; margin: 20px auto 0 auto;"></div>
                  </td>
                </tr>

                <tr>
                  <td class="px" style="padding: 36px 48px 8px 48px;">
                    <p style="margin: 0 0 16px 0; font-family: ${sans}; font-size: 16px; line-height: 1.7; color: ${colors.text};">We are so glad you are here.</p>
                    <p style="margin: 0 0 28px 0; font-family: ${sans}; font-size: 16px; line-height: 1.7; color: ${colors.text};">Each morning, Shepherd Verses will send you a personalised scripture, affirmation and mantra to help you wake up supported and start your day guided. Getting set up only takes a minute.</p>
                    <p style="margin: 0 0 20px 0; font-family: ${serif}; font-size: 22px; line-height: 1.3; color: ${colors.navy};">Here is what happens next</p>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${stepsHtml}
                    </table>
                  </td>
                </tr>

                <tr>
                  <td class="px" align="center" style="padding: 8px 48px 36px 48px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td align="center" style="border-radius: 999px; background-color: ${colors.gold};">
                          <a href="${TELEGRAM_URL}" style="display: inline-block; padding: 15px 36px; font-family: ${sans}; font-size: 16px; font-weight: 600; color: ${colors.navy}; text-decoration: none; border-radius: 999px;">Connect to Telegram</a>
                        </td>
                      </tr>
                    </table>
                    <p style="margin: 14px 0 0 0; font-family: ${sans}; font-size: 13px; line-height: 1.6; color: ${colors.muted};">Please allow notifications in Telegram so your messages reach you.</p>
                  </td>
                </tr>

                <tr>
                  <td class="px" style="padding: 0 48px 36px 48px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: ${colors.softStone}; border-left: 3px solid ${colors.gold}; border-radius: 8px;">
                      <tr>
                        <td style="padding: 22px 24px;">
                          <p style="margin: 0 0 8px 0; font-family: ${serif}; font-size: 18px; line-height: 1.5; color: ${colors.navy}; font-style: italic;">&ldquo;Come to me, all you who are weary and burdened, and I will give you rest.&rdquo;</p>
                          <p style="margin: 0; font-family: ${sans}; font-size: 13px; letter-spacing: 1px; text-transform: uppercase; color: ${colors.muted};">Matthew 11:28</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td class="px" style="padding: 0 48px 40px 48px;">
                    <p style="margin: 0 0 16px 0; font-family: ${sans}; font-size: 15px; line-height: 1.7; color: ${colors.text};">Your 3 days free start today. You can manage your plan at any time from your <a href="${SITE_URL}/account" style="color: ${colors.navy}; text-decoration: underline;">account page</a>.</p>
                    <p style="margin: 0 0 4px 0; font-family: ${sans}; font-size: 15px; line-height: 1.7; color: ${colors.text};">With love,</p>
                    <p style="margin: 0; font-family: ${serif}; font-size: 18px; color: ${colors.navy};">The Shepherd Verses team</p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>

          <tr>
            <td align="center" class="px" style="padding: 28px 24px 8px 24px;">
              <p style="margin: 0 0 8px 0; font-family: ${sans}; font-size: 13px; line-height: 1.6; color: ${colors.muted};">Questions? Just reply to this email or write to <a href="mailto:${SUPPORT_EMAIL}" style="color: ${colors.navy}; text-decoration: none;">${SUPPORT_EMAIL}</a></p>
              <p style="margin: 0; font-family: ${sans}; font-size: 12px; line-height: 1.6; color: ${colors.muted};">
                <a href="${SITE_URL}" style="color: ${colors.muted}; text-decoration: underline;">shepherdverses.com</a>
                &nbsp;&middot;&nbsp;
                <a href="${SITE_URL}/privacy" style="color: ${colors.muted}; text-decoration: underline;">Privacy</a>
                &nbsp;&middot;&nbsp;
                <a href="${SITE_URL}/terms" style="color: ${colors.muted}; text-decoration: underline;">Terms</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`

  const text = [
    name ? `Welcome, ${firstName?.trim()}` : 'Welcome to Shepherd Verses',
    '',
    'We are so glad you are here.',
    '',
    'Each morning, Shepherd Verses will send you a personalised scripture, affirmation and mantra to help you wake up supported and start your day guided. Getting set up only takes a minute.',
    '',
    'Here is what happens next:',
    ...steps.map((step, index) => `${index + 1}. ${step.title} - ${step.body}`),
    '',
    `Connect to Telegram: ${TELEGRAM_URL}`,
    'Please allow notifications in Telegram so your messages reach you.',
    '',
    '"Come to me, all you who are weary and burdened, and I will give you rest." - Matthew 11:28',
    '',
    `Your 3 days free start today. Manage your plan any time: ${SITE_URL}/account`,
    '',
    'With love,',
    'The Shepherd Verses team',
    '',
    `Questions? Write to ${SUPPORT_EMAIL}`,
  ].join('\n')

  return { subject, html, text }
}
