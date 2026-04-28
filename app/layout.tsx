import type { Metadata } from 'next'
import { Inter, Marcellus } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
});

const marcellus = Marcellus({ 
  weight: '400',
  subsets: ["latin"],
  variable: '--font-marcellus',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Shepherd Verses | Daily Scripture Voice Messages',
  description: 'Start your day with a personalized scripture reading, delivered as a warm voice message each morning.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${marcellus.variable}`}>
      <body className="font-sans antialiased bg-stone text-neutral-text">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
