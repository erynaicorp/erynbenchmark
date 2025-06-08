import type React from "react"
import type { Metadata } from "next"
import { Instrument_Sans } from "next/font/google"
import Script from "next/script"
import "./globals.css"

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument-sans",
})

export const metadata: Metadata = {
  title: "Instant Compensation Benchmarking | Skip the Survey Hassle",
  description:
    "Get premium compensation benchmarking data instantly—without months of internal coordination and complex job matching",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-4LFP82QSSG" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-4LFP82QSSG');
          `}
        </Script>
      </head>
      <body className={instrumentSans.className}>{children}</body>
    </html>
  )
}
