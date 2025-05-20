import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Job Salary Finder",
  description: "Find accurate salary information for any job position",
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
