"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"

interface WaitlistSignup {
  id: string
  first_name: string
  last_name: string
  email: string
  company: string
  job_title: string
  company_size?: string
  industry?: string
  phone?: string
  created_at: string
}

interface EarlyAccessPayment {
  id: string
  first_name: string
  last_name: string
  email: string
  company: string
  job_title: string
  payment_status: string
  amount: number
  created_at: string
}

export default function AdminDashboard() {
  const [waitlistSignups, setWaitlistSignups] = useState<WaitlistSignup[]>([])
  const [earlyAccessPayments, setEarlyAccessPayments] = useState<EarlyAccessPayment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      // Fetch waitlist signups
      const { data: waitlistData, error: waitlistError } = await supabase
        .from("waitlist_signups")
        .select("*")
        .order("created_at", { ascending: false })

      if (waitlistError) throw waitlistError

      // Fetch early access payments
      const { data: paymentsData, error: paymentsError } = await supabase
        .from("early_access_payments")
        .select("*")
        .order("created_at", { ascending: false })

      if (paymentsError) throw paymentsError

      setWaitlistSignups(waitlistData || [])
      setEarlyAccessPayments(paymentsData || [])
    } catch (error: any) {
      console.error("Error fetching data:", error)
      setError("Failed to load data. Please check your database connection.")
    } finally {
      setLoading(false)
    }
  }

  const exportToCSV = (data: any[], filename: string) => {
    if (data.length === 0) return

    const headers = Object.keys(data[0])
    const csvContent = [
      headers.join(","),
      ...data.map((row) =>
        headers
          .map((header) => {
            const value = row[header]
            // Escape commas and quotes in CSV
            if (typeof value === "string" && (value.includes(",") || value.includes('"'))) {
              return `"${value.replace(/"/g, '""')}"`
            }
            return value
          })
          .join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    a.click()
    window.URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8" style={{ color: "#182654" }}>
          Admin Dashboard
        </h1>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Waitlist Signups</h3>
            <p className="text-3xl font-bold" style={{ color: "#31E2EF" }}>
              {waitlistSignups.length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Early Access Payments</h3>
            <p className="text-3xl font-bold" style={{ color: "#31E2EF" }}>
              {earlyAccessPayments.length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Total Revenue</h3>
            <p className="text-3xl font-bold" style={{ color: "#31E2EF" }}>
              ${(earlyAccessPayments.length * 99).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Waitlist Signups */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Waitlist Signups</h2>
            {waitlistSignups.length > 0 && (
              <button
                onClick={() => exportToCSV(waitlistSignups, "waitlist-signups.csv")}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Export CSV
              </button>
            )}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Company</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Job Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Company Size</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Industry</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {waitlistSignups.map((signup) => (
                  <tr key={signup.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {signup.first_name} {signup.last_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{signup.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{signup.company}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{signup.job_title}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{signup.company_size || "N/A"}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{signup.industry || "N/A"}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{new Date(signup.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {waitlistSignups.length === 0 && (
              <div className="text-center py-8 text-gray-500">No waitlist signups yet</div>
            )}
          </div>
        </div>

        {/* Early Access Payments */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Early Access Payments</h2>
            {earlyAccessPayments.length > 0 && (
              <button
                onClick={() => exportToCSV(earlyAccessPayments, "early-access-payments.csv")}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Export CSV
              </button>
            )}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Company</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Job Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {earlyAccessPayments.map((payment) => (
                  <tr key={payment.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {payment.first_name} {payment.last_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{payment.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{payment.company}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{payment.job_title}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          payment.payment_status === "completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {payment.payment_status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">${(payment.amount / 100).toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{new Date(payment.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {earlyAccessPayments.length === 0 && (
              <div className="text-center py-8 text-gray-500">No early access payments yet</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
