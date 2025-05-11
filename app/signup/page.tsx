"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

export default function SignUp() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email && name) {
      router.push("/login/loading") // Reuse the loading page
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Left side - Form */}
      <div className="flex w-full flex-col items-center justify-center px-4 sm:px-6 md:w-1/2 lg:px-8 xl:px-12">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <div className="relative h-16 w-16">
              <Image src="/logo.png" alt="Eryn Logo" fill className="object-contain" />
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900">Welcome to eryn</h2>
            <p className="mt-2 text-gray-600">Create account to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
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
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-3 text-gray-900 placeholder-gray-400 focus:border-[#31E2EF] focus:outline-none focus:ring-1 focus:ring-[#31E2EF]"
                placeholder="name@email.com"
              />
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Your Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-3 text-gray-900 placeholder-gray-400 focus:border-[#31E2EF] focus:outline-none focus:ring-1 focus:ring-[#31E2EF]"
                placeholder="John Doe"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-[#182654] py-3 px-4 text-center font-medium text-white hover:bg-[#182654]/90 focus:outline-none focus:ring-2 focus:ring-[#182654] focus:ring-offset-2"
            >
              Create Account
            </button>

            <div className="text-center text-sm">
              Have an account?{" "}
              <Link href="/" className="font-medium text-[#182654] hover:text-[#182654]/80">
                Log in
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Right side - Illustration */}
      <div className="hidden bg-gray-50 md:block md:w-1/2">
        <div className="flex h-full items-center justify-center">
          <Image
            src="/illustration.png"
            alt="Analytics Illustration"
            width={800}
            height={600}
            className="max-w-full"
            priority
          />
        </div>
      </div>
    </div>
  )
}
