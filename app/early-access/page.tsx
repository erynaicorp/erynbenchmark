"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, CheckCircle } from "lucide-react"

export default function EarlyAccessPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    jobTitle: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      const response = await fetch("/api/early-access", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const contentType = response.headers.get("content-type") ?? ""
      const data = contentType.includes("application/json") ? await response.json() : { error: await response.text() }

      if (!response.ok) {
        throw new Error(data.error ?? "Request failed")
      }

      setSuccess(true)
    } catch (error: any) {
      console.error("Error submitting form:", error)
      setError(error.message || "There was an error processing your request. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (success) {
    return (
      <main className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="mb-6">
              <CheckCircle className="w-16 h-16 mx-auto" style={{ color: "#31E2EF" }} />
            </div>
            <h1 className="text-2xl font-bold mb-4" style={{ color: "#182654" }}>
              Thank You for Your Interest!
            </h1>
            <p className="text-gray-600 mb-6">
              We've received your early access request. Our team will be in touch soon with next steps and access
              details.
            </p>
            <Link
              href="/"
              className="inline-block font-semibold uppercase tracking-wide px-8 py-3 rounded-full text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              style={{ backgroundColor: "#31E2EF", color: "#182654" }}
            >
              Back to Home
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen" style={{ backgroundColor: "#f8fafc" }}>
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="inline-flex items-center text-gray-700 hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>

      {/* Early Access Form */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4" style={{ color: "#182654" }}>
              Get Early Access to eryn Premium
            </h1>
            <p className="text-xl text-gray-600 max-w-lg mx-auto mb-6">
              Join our exclusive early access program and be among the first to experience premium compensation
              benchmarking.
            </p>
            <div className="bg-white rounded-xl p-6 shadow-sm border-2" style={{ borderColor: "#31E2EF" }}>
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="text-3xl font-bold" style={{ color: "#182654" }}>
                  $99
                </div>
                <div className="text-gray-600">/month</div>
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                  Early Access
                </div>
              </div>
              <p className="text-sm text-gray-600">Priority access • Premium support</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-semibold mb-4" style={{ color: "#182654" }}>
                  Personal Information
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-colors focus:ring-cyan-600 focus:border-cyan-600"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-colors focus:ring-cyan-600 focus:border-cyan-600"
                      placeholder="Doe"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-colors focus:ring-cyan-600 focus:border-cyan-600"
                      placeholder="john.doe@company.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                      Company *
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      required
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-colors focus:ring-cyan-600 focus:border-cyan-600"
                      placeholder="Acme Corp"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-2">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    id="jobTitle"
                    name="jobTitle"
                    required
                    value={formData.jobTitle}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-colors focus:ring-cyan-600 focus:border-cyan-600"
                    placeholder="HR Director"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full font-semibold uppercase tracking-wide px-8 py-4 rounded-full text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  style={{ backgroundColor: "#31E2EF", color: "#182654" }}
                >
                  {isSubmitting ? "Submitting..." : "Request Early Access"}
                </button>
              </div>

              {/* Terms */}
              <div className="text-center">
                <p className="text-xs text-gray-500">
                  By submitting, you agree to be contacted about eryn Premium early access.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}
