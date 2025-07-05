import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

// Update the metadata title and description
export const metadata: Metadata = {
  title: "eryn | your AI Comp Analyst",
  description: "AI-powered compensation intelligence platform",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* Add this to make the SpeechRecognition type available */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
            if (!window.SpeechRecognition && window.webkitSpeechRecognition) {
              window.SpeechRecognition = window.webkitSpeechRecognition;
            }
          `,
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
