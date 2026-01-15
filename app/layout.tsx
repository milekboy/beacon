import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { PWAInstallPrompt } from "@/components/PWAInstallPrompt"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Beacon – Polymarket Intelligence",
  description:
    "Detect informed Polymarket activity before odds move. Real-time alerts for unusual trading.",
  manifest: "/manifest.json",
  themeColor: "#000000",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Beacon",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${_geist.className} font-sans antialiased`}>
        {children}
        <PWAInstallPrompt />
        <Analytics />
      </body>
    </html>
  )
}
