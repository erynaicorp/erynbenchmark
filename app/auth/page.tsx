"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"

type AuthStep = "email" | "register" | "loading"

export default function AuthPage() {
  const [authStep, setAuthStep] = useState<AuthStep>("email")
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setAuthStep("register")
  }

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setAuthStep("loading")

    // Simulate API call
    setTimeout(() => {
      window.location.href = "/"
    }, 3000)
  }

  return (
    <div className="flex min-h-screen">
      {/* Left side - Form */}
      <div className="flex w-full flex-col items-center justify-center px-4 sm:px-6 md:w-1/2 lg:px-8 xl:px-12">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Eryn.Ai_Benchmark_Prototype-40LTiB8bhqC9gsqfu6BBe1Wxc9R9yo.png"
              alt="Eryn Logo"
              width={80}
              height={80}
              className="h-16 w-16"
            />
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900">Welcome to eryn</h2>
            <p className="mt-2 text-gray-600">Create account to continue</p>
          </div>

          {authStep === "email" && (
            <form onSubmit={handleEmailSubmit} className="mt-8 space-y-6">
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

              <button
                type="submit"
                className="w-full rounded-md bg-[#182654] py-3 px-4 text-center font-medium text-white hover:bg-[#182654]/90 focus:outline-none focus:ring-2 focus:ring-[#182654] focus:ring-offset-2"
              >
                Continue
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-gray-500">or</span>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  type="button"
                  className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white py-3 px-4 text-gray-700 hover:bg-gray-50"
                >
                  <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Sign in with Google
                </button>

                <button
                  type="button"
                  className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white py-3 px-4 text-gray-700 hover:bg-gray-50"
                >
                  <svg className="mr-2 h-5 w-5" viewBox="0 0 23 23">
                    <path fill="#f3f3f3" d="M0 0h23v23H0z" />
                    <path fill="#f35325" d="M1 1h10v10H1z" />
                    <path fill="#81bc06" d="M12 1h10v10H12z" />
                    <path fill="#05a6f0" d="M1 12h10v10H1z" />
                    <path fill="#ffba08" d="M12 12h10v10H12z" />
                  </svg>
                  Sign in with Microsoft
                </button>
              </div>

              <div className="text-center text-sm">
                Have an account?{" "}
                <Link href="/login" className="font-medium text-[#182654] hover:text-[#182654]/80">
                  Log in
                </Link>
              </div>
            </form>
          )}

          {authStep === "register" && (
            <form onSubmit={handleRegisterSubmit} className="mt-8 space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
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

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative mt-1">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-md border border-gray-300 px-3 py-3 pr-10 text-gray-900 placeholder-gray-400 focus:border-[#31E2EF] focus:outline-none focus:ring-1 focus:ring-[#31E2EF]"
                    placeholder="••••••••••••"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <div className="relative mt-1">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="block w-full rounded-md border border-gray-300 px-3 py-3 pr-10 text-gray-900 placeholder-gray-400 focus:border-[#31E2EF] focus:outline-none focus:ring-1 focus:ring-[#31E2EF]"
                    placeholder="••••••••••••"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-500"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full rounded-md bg-[#182654] py-3 px-4 text-center font-medium text-white hover:bg-[#182654]/90 focus:outline-none focus:ring-2 focus:ring-[#182654] focus:ring-offset-2"
              >
                Create Account
              </button>

              <div className="text-center text-sm">
                <Link href="#" className="font-medium text-[#182654] hover:text-[#182654]/80">
                  Sign in a different way
                </Link>
              </div>

              <div className="text-center text-sm">
                Have an account?{" "}
                <Link href="/login" className="font-medium text-[#182654] hover:text-[#182654]/80">
                  Log in
                </Link>
              </div>
            </form>
          )}

          {authStep === "loading" && (
            <div className="mt-8 flex flex-col items-center justify-center">
              <h3 className="text-xl font-medium text-gray-900">Creating your account...</h3>
              <div className="mt-4 flex space-x-2">
                <div className="h-3 w-3 animate-pulse rounded-full bg-[#31E2EF]"></div>
                <div className="h-3 w-3 animate-pulse rounded-full bg-[#31E2EF] opacity-75 delay-150"></div>
                <div className="h-3 w-3 animate-pulse rounded-full bg-[#31E2EF] opacity-50 delay-300"></div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right side - Illustration */}
      <div className="hidden bg-gray-50 md:block md:w-1/2">
        <div className="flex h-full items-center justify-center">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Eryn.Ai_Benchmark_Prototype-FxHIIsXuHIHqyMtGunOK8iWEsu1JMt.png"
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
