"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, CheckCircle, CreditCard, Lock } from "lucide-react"

export default function EarlyAccessPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    jobTitle: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    billingAddress: "",
    city: "",
    state: "",
    zipCode: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

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

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to process payment")
      }

      setIsSubmitted(true)
    } catch (error: any) {
      console.error("Error submitting form:", error)
      setError(error.message || "There was an error processing your payment. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <main className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="mb-6">
              <CheckCircle className="w-16 h-16 mx-auto" style={{ color: "#31E2EF" }} />
            </div>
            <h1 className="text-2xl font-bold mb-4" style={{ color: "#182654" }}>
              Welcome to Early Access!
            </h1>
            <p className="text-gray-600 mb-6">
              Your payment has been processed successfully. You are now in the exclusive group and will get first dibs
              on this data. You'll receive access credentials within 24 hours and be among the first to experience
              eryn's premium features.
            </p>
            <p className="text-sm text-gray-500 mb-8">Check your email for next steps and setup instructions.</p>
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
              Secure your spot and get immediate access to all premium features when we launch.
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
              <p className="text-sm text-gray-600">Cancel anytime • Priority support</p>
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

              {/* Payment Information */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: "#182654" }}>
                  <CreditCard className="w-5 h-5" />
                  Payment Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-2">
                      Card Number *
                    </label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      required
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-colors focus:ring-cyan-600 focus:border-cyan-600"
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-2">
                        Expiry Date *
                      </label>
                      <input
                        type="text"
                        id="expiryDate"
                        name="expiryDate"
                        required
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-colors focus:ring-cyan-600 focus:border-cyan-600"
                        placeholder="MM/YY"
                        maxLength={5}
                      />
                    </div>
                    <div>
                      <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-2">
                        CVV *
                      </label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        required
                        value={formData.cvv}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-colors focus:ring-cyan-600 focus:border-cyan-600"
                        placeholder="123"
                        maxLength={4}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Billing Address */}
              <div>
                <h3 className="text-lg font-semibold mb-4" style={{ color: "#182654" }}>
                  Billing Address
                </h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="billingAddress" className="block text-sm font-medium text-gray-700 mb-2">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      id="billingAddress"
                      name="billingAddress"
                      required
                      value={formData.billingAddress}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-colors focus:ring-cyan-600 focus:border-cyan-600"
                      placeholder="123 Main Street"
                    />
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-colors focus:ring-cyan-600 focus:border-cyan-600"
                        placeholder="San Francisco"
                      />
                    </div>
                    <div>
                      <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                        State *
                      </label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        required
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-colors focus:ring-cyan-600 focus:border-cyan-600"
                        placeholder="CA"
                      />
                    </div>
                    <div>
                      <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-2">
                        ZIP Code *
                      </label>
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        required
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-colors focus:ring-cyan-600 focus:border-cyan-600"
                        placeholder="94102"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Notice */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <Lock className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">Secure Payment</span>
                </div>
                <p className="text-xs text-gray-600">
                  Your payment information is encrypted and secure. We use industry-standard SSL encryption to protect
                  your data.
                </p>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full font-semibold uppercase tracking-wide px-8 py-4 rounded-full text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  style={{ backgroundColor: "#31E2EF", color: "#182654" }}
                >
                  {isSubmitting ? "Processing Payment..." : "Start Early Access - $99/month"}
                </button>
              </div>

              {/* Terms */}
              <div className="text-center">
                <p className="text-xs text-gray-500">
                  By proceeding, you agree to our{" "}
                  <Link href="#" className="underline hover:text-gray-700">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="#" className="underline hover:text-gray-700">
                    Privacy Policy
                  </Link>
                  . You can cancel anytime.
                </p>
              </div>
            </form>
          </div>

          {/* Features Reminder */}
          <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-xl font-semibold mb-6 text-center" style={{ color: "#182654" }}>
              What You Get with Early Access
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: "#31E2EF" }} />
                <span className="text-sm text-gray-600">Immediate access to all premium features</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: "#31E2EF" }} />
                <span className="text-sm text-gray-600">Priority customer support</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: "#31E2EF" }} />
                <span className="text-sm text-gray-600">Advanced AI-powered job matching</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: "#31E2EF" }} />
                <span className="text-sm text-gray-600">Full access to all job levels and filters</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: "#31E2EF" }} />
                <span className="text-sm text-gray-600">Report exports and integrations</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: "#31E2EF" }} />
                <span className="text-sm text-gray-600">Exclusive beta features access</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
