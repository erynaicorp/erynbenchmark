"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { X } from "lucide-react"

export default function NameEntry() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email] = useState("email@company.com") // In a real app, this would come from previous step

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name) {
      router.push("/login/loading")
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
            <p className="mt-2 text-gray-600">Log in to continue</p>
          </div>

          <div className="mt-6 mb-6">
            <div className="flex items-center gap-3 bg-gray-50 px-3 py-2 rounded-md">
              <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-200">
                <Image src="/abstract-profile.png" alt="Profile" fill className="object-cover" />
              </div>
              <span className="flex-1">{email}</span>
              <button className="text-gray-500 hover:text-gray-700">
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Your Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-3 text-gray-900 placeholder-gray-400 focus:border-[#31E2EF] focus:outline-none focus:ring-1 focus:ring-[#31E2EF]"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-md bg-[#182654] py-3 px-4 text-center font-medium text-white hover:bg-[#182654]/90 focus:outline-none focus:ring-2 focus:ring-[#182654] focus:ring-offset-2"
            >
              Continue with Email
            </button>
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
