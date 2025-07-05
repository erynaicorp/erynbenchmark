"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800))
      console.log("Password reset requested for:", email)
      setIsSubmitted(true)
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-white px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-6 flex justify-center">
          <div className="h-14 w-14 bg-gray-200"></div>
        </div>

        {/* Heading */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-medium text-gray-900">Reset your password</h1>
          <p className="mt-2 text-gray-600">
            {isSubmitted
              ? "Check your email for reset instructions"
              : "Enter your email and we'll send you instructions to reset your password"}
          </p>
        </div>

        {isSubmitted ? (
          <div className="rounded-md bg-green-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-green-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-green-800">
                  We've sent a password reset link to <strong>{email}</strong>
                </p>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#182654] focus:outline-none focus:ring-1 focus:ring-[#182654]"
                placeholder="name@email.com"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || !email}
              className="w-full rounded-md bg-[#182654] py-3 text-center text-sm font-medium text-white shadow-sm hover:bg-[#182654]/90 focus:outline-none focus:ring-2 focus:ring-[#182654] focus:ring-offset-2 disabled:opacity-70"
            >
              Send reset instructions
            </button>
          </form>
        )}

        <div className="mt-6 text-center">
          <Link href="/login" className="inline-flex items-center text-sm text-[#182654] hover:underline">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to login
          </Link>
        </div>
      </div>
    </div>
  )
}
