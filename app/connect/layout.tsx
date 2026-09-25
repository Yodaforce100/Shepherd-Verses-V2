import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Welcome — Connect to Telegram | Shepherd Verses",
  description:
    "Your free trial has started. Connect to Telegram to receive your daily verse and voice message.",
}

export default function ConnectLayout({ children }: { children: React.ReactNode }) {
  return children
}
