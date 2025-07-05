"use client"

import type React from "react"

import { useState } from "react"
import { LoginIllustration } from "@/components/login-illustration"
import { X } from "lucide-react"

export default function SignupForm() {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const resetToEmailStep = () => {
    setStep(1)
  }

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800))
      setStep(2)
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleNameSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800))
      console.log("Signup complete with:", { email, firstName, lastName })
      // Redirect to salary aging calculator instead of step 3
      window.location.href = "/salary-aging-calculator"
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-white p-4">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Form Section */}
        <div className="flex flex-col items-center justify-center p-6">
          <div className="mb-6 h-16 w-16">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-pej3PEo2vacu5qWbP1jAdYGyEBi7x8.png"
              alt="eryn logo"
              className="h-full w-full object-contain"
            />
          </div>
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-[#020617]">Welcome to eryn</h1>
          </div>

          {step === 1 ? (
            <form onSubmit={handleEmailSubmit} className="w-full max-w-md space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-[#0F172A]">
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
                {isLoading ? "Processing..." : "Continue with Email"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleNameSubmit} className="w-full max-w-md space-y-6">
              <div className="mb-4 flex items-center rounded-md bg-gray-50 px-3 py-2">
                <div className="mr-2 h-6 w-6 rounded-full bg-[#182654]"></div>
                <span className="flex-1 text-sm">{email}</span>
                <button type="button" onClick={resetToEmailStep} className="ml-2 text-gray-500 hover:text-gray-700">
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="block text-sm font-medium text-[#0F172A]">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    placeholder="John"
                    className="w-full rounded-md border border-[#E2E8F0] bg-white px-4 py-3 text-base placeholder:text-[#94A3B8] focus:border-[#182654] focus:outline-none focus:ring-1 focus:ring-[#182654]"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="lastName" className="block text-sm font-medium text-[#0F172A]">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    placeholder="Doe"
                    className="w-full rounded-md border border-[#E2E8F0] bg-white px-4 py-3 text-base placeholder:text-[#94A3B8] focus:border-[#182654] focus:outline-none focus:ring-1 focus:ring-[#182654]"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading || !firstName || !lastName}
                className="w-full rounded-md bg-[#182654] py-3 text-base font-medium text-white hover:bg-[#182654]/90 focus:outline-none focus:ring-2 focus:ring-[#182654] focus:ring-offset-2 disabled:opacity-70"
              >
                {isLoading ? "Processing..." : "Get Started"}
              </button>
            </form>
          )}
        </div>

        {/* Illustration Section */}
        <div className="hidden h-full w-full lg:block">
          <LoginIllustration />
        </div>
      </div>
    </div>
  )
}
