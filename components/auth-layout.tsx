import type React from "react"
import Image from "next/image"
import { Logo } from "@/components/logo"

interface AuthLayoutProps {
  children: React.ReactNode
  showLogo?: boolean
}

export function AuthLayout({ children, showLogo = true }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <div className="flex flex-1 flex-col items-center justify-center p-8">
        {showLogo && (
          <div className="mb-8">
            <Logo />
          </div>
        )}
        <div className="w-full max-w-md space-y-6">{children}</div>
      </div>
      <div className="hidden md:block md:flex-1 bg-[#f1f5f9] relative">
        <div className="absolute inset-0">
          <Image src="/illustration.png" alt="Analytics illustration" fill className="object-contain p-12" priority />
        </div>
      </div>
    </div>
  )
}
