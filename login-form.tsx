"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("Continue with email:", email)
      // Redirect to salary aging calculator
      window.location.href = "/salary-aging-calculator"
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-white p-4">
      <div className="mx-auto w-full max-w-md p-6">
        <div className="flex flex-col items-center gap-6">
          {/* Logo */}
          <div className="h-16 w-auto">
            <Image src="/eryn-logo.png" alt="eryn logo" width={160} height={64} />
          </div>

          {/* Header */}
          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="text-2xl font-medium text-[#020617]">Welcome to eryn</h1>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="w-full space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-base font-medium text-[#0F172A]">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="name@email.com"
                className="w-full rounded-md border border-[#E2E8F0] bg-white px-4 py-3 text-base placeholder:text-[#94A3B8] focus:border-[#182654] focus:outline-none focus:ring-1 focus:ring-[#182654]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || !email}
              className="w-full rounded-md bg-[#182654] py-3 text-base font-medium text-white hover:bg-[#182654]/90 focus:outline-none focus:ring-2 focus:ring-[#182654] focus:ring-offset-2 disabled:opacity-70"
            >
              Continue with Email
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
