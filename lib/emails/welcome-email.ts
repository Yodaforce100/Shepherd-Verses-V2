const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://shepherdverses.com'
const TELEGRAM_URL = 'https://t.me/Shepherdverses_bot?start=connect'
const SUPPORT_EMAIL = 'hello@shepherdverses.com'
const PADDLE_URL = 'https://paddle.net'

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
  assetBaseUrl?: string
  iconSrc?: (icon: string) => string
}

const notificationStep = 'When Telegram asks, please <strong>ALLOW</strong> notifications - so you see your message arrive every day'
const notificationStepText = 'When Telegram asks, please ALLOW notifications - so you see your message arrive every day'
const startStep = 'Press <strong>Start</strong> (or log in), then enter the email address you subscribed with'
const startStepText = 'Press Start (or log in), then enter the email address you subscribed with'

const stepGroups = [
  {
    title: 'New to Telegram?',
    icons: ['telegram', 'pointer', 'log-in', 'bell-ring'],
    steps: [
      'Download Telegram free from your app store',
      'Come back to this email and tap the <strong>Connect to Telegram</strong> button below',
      startStep,
      notificationStep,
    ],
    textSteps: [
      'Download Telegram free from your app store',
      'Come back to this email and tap the Connect to Telegram button below',
      startStepText,
      notificationStepText,
    ],
  },
  {
    title: 'Already have Telegram?',
    icons: ['telegram', 'log-in', 'bell-ring'],
    steps: ['Tap the <strong>Connect to Telegram</strong> button below', startStep, notificationStep],
    textSteps: ['Tap the Connect to Telegram button below', startStepText, notificationStepText],
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

function renderStepGroup(group: (typeof stepGroups)[number], isLast: boolean, iconSrc: (icon: string) => string) {
  const rows = group.steps
    .map(
      (step, index) => `
          <tr>
            <td valign="top" width="30" style="padding: 3px 0 12px 0;">
              <img src="${iconSrc(group.icons[index])}" alt="" width="18" height="18" style="display: block; width: 18px; height: 18px; border: 0;" />
            </td>
            <td valign="top" style="padding: 0 0 12px 0; font-family: ${sans}; font-size: 15px; line-height: 1.6; color: ${colors.text};">${step}</td>
          </tr>`,
    )
    .join('')

  return `
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: ${colors.softStone}; border-radius: 12px; margin: 0 0 ${isLast ? 0 : 16}px 0;">
        <tr>
          <td style="padding: 20px 22px 10px 22px;">
            <p style="margin: 0 0 14px 0; font-family: ${serif}; font-size: 19px; line-height: 1.3; color: ${colors.navy};">${group.title}</p>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${rows}
            </table>
          </td>
        </tr>
      </table>`
}

export function renderWelcomeEmail({
  firstName,
  assetBaseUrl = SITE_URL,
  iconSrc = (icon) => `${assetBaseUrl}/images/email/step-${icon}.png?v=2`,
}: WelcomeEmailOptions = {}) {
  const trimmedName = firstName?.trim() || null
  const name = trimmedName ? escapeHtml(trimmedName) : null
  const greeting = name ? `Hello ${name}` : 'Hello'
  const subject = 'Welcome to Shepherd Verses - your Telegram link inside'
  const preheader = 'One step to go. Keep this email - your connect link lives here.'

  const stepsHtml = stepGroups.map((group, index) => renderStepGroup(group, index === stepGroups.length - 1, iconSrc)).join('')

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
                    <h1 class="h1" style="margin: 0; font-family: ${serif}; font-weight: 400; font-size: 32px; line-height: 1.25; color: #FFFFFF;">Welcome to Shepherd Verses!</h1>
                    <div style="width: 48px; height: 2px; background-color: ${colors.gold}; margin: 20px auto 0 auto;"></div>
                  </td>
                </tr>

                <tr>
                  <td class="px" style="padding: 36px 48px 8px 48px;">
                    <p style="margin: 0 0 16px 0; font-family: ${serif}; font-size: 22px; line-height: 1.3; color: ${colors.navy};">${greeting}</p>
                    <p style="margin: 0 0 16px 0; font-family: ${sans}; font-size: 16px; line-height: 1.7; color: ${colors.text};">Thank you for joining us - we&rsquo;re so glad you&rsquo;re here.</p>
                    <p style="margin: 0 0 28px 0; font-family: ${sans}; font-size: 16px; line-height: 1.7; color: ${colors.text};"><strong style="color: ${colors.navy};">One step to go</strong> so you can start receiving your daily message - <strong style="color: ${colors.navy};">Connect to the Telegram App</strong>. Telegram is free to use and only takes a few minutes to set up.</p>
                    ${stepsHtml}
                  </td>
                </tr>

                <tr>
                  <td class="px" align="center" style="padding: 20px 48px 28px 48px;">
                    <p style="margin: 0 0 28px 0; font-family: ${sans}; font-size: 15px; line-height: 1.6; color: ${colors.text};">That&rsquo;s it! You&rsquo;ll be connected and ready to receive your daily message.</p>
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td align="center" style="border-radius: 999px; background-color: ${colors.gold};">
                          <a href="${TELEGRAM_URL}" style="display: inline-block; padding: 17px 56px; font-family: ${sans}; font-size: 17px; font-weight: 600; color: ${colors.navy}; text-decoration: none; border-radius: 999px;">Connect to Telegram</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td class="px" style="padding: 0 48px 32px 48px;">
                    <p style="margin: 0 0 4px 0; font-family: ${sans}; font-size: 15px; line-height: 1.7; color: ${colors.text};">With love,</p>
                    <p style="margin: 0; font-family: ${serif}; font-size: 18px; color: ${colors.navy};">The Shepherd Verses team</p>
                  </td>
                </tr>

                <tr>
                  <td class="px" style="padding: 0 48px 28px 48px;">
                          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td width="46%" style="padding: 0;"><div style="height: 1px; line-height: 1px; font-size: 1px; background-color: ${colors.gold};">&nbsp;</div></td>
                              <td width="30" align="center" style="width: 30px; min-width: 30px; padding: 0 10px;">
                                <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
                                  <tr>
                                    <td width="4" height="4" style="font-size: 0; line-height: 0;"></td>
                                    <td width="2" height="4" style="font-size: 0; line-height: 0; background-color: ${colors.gold};"></td>
                                    <td width="4" height="4" style="font-size: 0; line-height: 0;"></td>
                                  </tr>
                                  <tr>
                                    <td width="4" height="2" style="font-size: 0; line-height: 0; background-color: ${colors.gold};"></td>
                                    <td width="2" height="2" style="font-size: 0; line-height: 0; background-color: ${colors.gold};"></td>
                                    <td width="4" height="2" style="font-size: 0; line-height: 0; background-color: ${colors.gold};"></td>
                                  </tr>
                                  <tr>
                                    <td width="4" height="9" style="font-size: 0; line-height: 0;"></td>
                                    <td width="2" height="9" style="font-size: 0; line-height: 0; background-color: ${colors.gold};"></td>
                                    <td width="4" height="9" style="font-size: 0; line-height: 0;"></td>
                                  </tr>
                                </table>
                              </td>
                              <td width="46%" style="padding: 0;"><div style="height: 1px; line-height: 1px; font-size: 1px; background-color: ${colors.gold};">&nbsp;</div></td>
                            </tr>
                          </table>
                  </td>
                </tr>

                <tr>
                  <td class="px" align="center" style="background-color: ${colors.navy}; padding: 24px 48px 22px 48px;">
                    <p style="margin: 0 0 8px 0; font-family: ${serif}; font-size: 18px; line-height: 1.55; color: #FFFFFF; font-style: italic;">&ldquo;Come to me, all you who are weary and burdened,<br>and I will give you rest.&rdquo;</p>
                    <p style="margin: 0; font-family: ${sans}; font-size: 12px; letter-spacing: 1.5px; text-transform: uppercase; color: ${colors.gold};">Matthew 11:28</p>
                  </td>
                </tr>

                <tr>
                  <td class="px" style="padding: 28px 48px 36px 48px;">
                    <p style="margin: 0 0 12px 0; font-family: ${sans}; font-size: 14px; line-height: 1.6; color: ${colors.navy}; font-weight: 600;">Your 3 days free start today!</p>
                    <p style="margin: 0 0 10px 0; font-family: ${sans}; font-size: 13px; line-height: 1.6; color: ${colors.muted};">Keep this email - your connect link will always be here if you need it.</p>
                    <p style="margin: 0 0 10px 0; font-family: ${sans}; font-size: 13px; line-height: 1.6; color: ${colors.muted};">To manage your plan, or update your email or message time, contact us at <a href="mailto:${SUPPORT_EMAIL}" style="color: ${colors.navy}; text-decoration: underline;">${SUPPORT_EMAIL}</a>.</p>
                    <p style="margin: 0; font-family: ${sans}; font-size: 13px; line-height: 1.6; color: ${colors.muted};">For billing, payment methods or cancelling, contact our payment provider Paddle at <a href="${PADDLE_URL}" style="color: ${colors.navy}; text-decoration: underline;">paddle.net</a>.</p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>

          <tr>
            <td align="center" class="px" style="padding: 24px 24px 8px 24px;">
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
    'Welcome to Shepherd Verses!',
    '',
    trimmedName ? `Hello ${trimmedName}` : 'Hello',
    '',
    "Thank you for joining us - we're so glad you're here.",
    '',
    'One step to go so you can start receiving your daily message - Connect to the Telegram App. Telegram is free to use and only takes a few minutes to set up.',
    '',
    ...stepGroups.flatMap((group) => [
      group.title,
      ...group.textSteps.map((step, index) => `${index + 1}. ${step}`),
      '',
    ]),
    "That's it! You'll be connected and ready to receive your daily message.",
    '',
    `Connect to Telegram: ${TELEGRAM_URL}`,
    '',
    'With love,',
    'The Shepherd Verses team',
    '',
    '"Come to me, all you who are weary and burdened,',
  'and I will give you rest." - Matthew 11:28',
    '',
    '---',
    'Your 3 days free start today!',
    'Keep this email - your connect link will always be here if you need it.',
    `To manage your plan, or update your email or message time, contact us at ${SUPPORT_EMAIL}.`,
    `For billing, payment methods or cancelling, contact our payment provider Paddle at ${PADDLE_URL}.`,
  ].join('\n')

  return { subject, html, text }
}
