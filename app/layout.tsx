import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import FishCursor from "@/components/shared/FishCursor"
import CatFollower from "@/components/shared/catfollower"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Magenta Ong | Portfolio",
  icons: {
    icon: "/images/favicon.ico", // For older browsers
    shortcut: "/favicon.ico",
    apple: "/favicon.ico", // Apple devices
  },
  description: " Aspiring Full Stack Software Engineer. Passionate about building things that work.",
  keywords: "Aspiring Full Stack Software Engineer, Backend Software Engineer, Magenta Ong, Web Development, Next.js Portfolio",
  robots: "index, follow",
  author: "Magenta Ong",
  openGraph: {
    title: "Magenta Ong | Portfolio",
    description: "Aspiring Full Stack Software Engineer",
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
          <CatFollower />
          <FishCursor />
          {children}
        </ThemeProvider>
        
      </body>
    </html>
  )
}

