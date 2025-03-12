import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Magenta Ong | Portfolio",
  icons: {
    icon: "app/favicon.png", // For older browsers
    shortcut: "app/favicon.png",
    apple: "app/favicon.png", // Apple devices
  },
  description: " Aspiring Full Stack Developer & UI/UX Designer. Passionate about building innovative web experiences.",
  keywords: "Full Stack Developer, UI/UX Designer, Magenta Ong, Web Development, Next.js Portfolio",
  robots: "index, follow",
  author: "Magenta Ong",
  openGraph: {
    title: "Magenta Ong | Portfolio",
    description: "Aspiring Full Stack Developer & UI/UX Designer",
    url: "https://magentaong.vercel.app",
    siteName: "Magenta Ong Portfolio",
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
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

