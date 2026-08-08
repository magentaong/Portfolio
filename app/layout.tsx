import type React from "react"
import type { Metadata } from "next"
import Script from "next/script"
import "@/app/globals.css"
import localFont from "next/font/local"
import { ThemeProvider } from "@/components/theme-provider"
import { siteData } from "@/data/site"

const spaceGrotesk = localFont({
  src: "./fonts/SpaceGrotesk-Variable.ttf",
  variable: "--font-space-grotesk",
  weight: "300 700",
  display: "swap",
})

export const metadata: Metadata = {
  title: siteData.metadata.title,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  description: siteData.metadata.description,
  keywords: siteData.metadata.keywords,
  robots: "index, follow",
  authors: [{ name: siteData.brand }],
  openGraph: {
    title: siteData.metadata.title,
    description: siteData.metadata.description,
    url: siteData.metadata.siteUrl,
    siteName: siteData.metadata.siteName,
    type: "website",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={spaceGrotesk.variable}>
        <Script
          src="/scripts/accent-preference.js"
          strategy="beforeInteractive"
          data-storage-key={siteData.accentPreference.storageKey}
        />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
