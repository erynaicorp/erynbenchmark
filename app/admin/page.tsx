"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

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
  const [waitlist, setWaitlist] = useState<WaitlistSignup[]>([])
  const [payments, setPayments] = useState<EarlyAccessPayment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/admin/dashboard")
        if (!res.ok) throw new Error("Failed to load data")
        const json = await res.json()
        setWaitlist(json.waitlist)
        setPayments(json.payments)
      } catch (err: any) {
        setError(err.message ?? "Unknown error")
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Loading…</p>
      </div>
    )

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-red-600">{error}</p>
      </div>
    )

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold" style={{ color: "#182654" }}>
            Admin Dashboard
          </h1>
          <Link href="/" className="text-sm underline">
            Back to site
          </Link>
        </header>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <StatCard label="Waitlist Signups" value={waitlist.length} />
          <StatCard label="Early Access Payments" value={payments.length} />
          <StatCard
            label="Total Revenue"
            value={`$${(payments.reduce((sum, p) => sum + (p.amount ?? 0), 0) / 100).toLocaleString()}`}
          />
        </div>

        {/* Waitlist Table */}
        <DataTable<WaitlistSignup>
          title="Waitlist Signups"
          data={waitlist}
          filename="waitlist-signups.csv"
          columns={[
            { header: "Name", cell: (r) => `${r.first_name} ${r.last_name}` },
            { header: "Email", cell: (r) => r.email },
            { header: "Company", cell: (r) => r.company },
            { header: "Job Title", cell: (r) => r.job_title },
            { header: "Company Size", cell: (r) => r.company_size ?? "N/A" },
            { header: "Industry", cell: (r) => r.industry ?? "N/A" },
            { header: "Date", cell: (r) => new Date(r.created_at).toLocaleDateString() },
          ]}
        />

        {/* Payments Table */}
        <DataTable<EarlyAccessPayment>
          title="Early Access Payments"
          data={payments}
          filename="early-access-payments.csv"
          columns={[
            { header: "Name", cell: (p) => `${p.first_name} ${p.last_name}` },
            { header: "Email", cell: (p) => p.email },
            { header: "Company", cell: (p) => p.company },
            { header: "Job Title", cell: (p) => p.job_title },
            { header: "Status", cell: (p) => p.payment_status },
            { header: "Amount", cell: (p) => `$${(p.amount / 100).toFixed(2)}` },
            { header: "Date", cell: (p) => new Date(p.created_at).toLocaleDateString() },
          ]}
        />
      </div>
    </main>
  )
}

/* ---------- Re-usable helper components ---------- */

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow text-center">
      <h3 className="text-lg font-semibold mb-2">{label}</h3>
      <p className="text-3xl font-bold" style={{ color: "#31E2EF" }}>
        {value}
      </p>
    </div>
  )
}

type Column<T> = { header: string; cell: (row: T) => string }

function DataTable<T extends { id: string }>({
  title,
  data,
  filename,
  columns,
}: {
  title: string
  data: T[]
  filename: string
  columns: Column<T>[]
}) {
  const exportCSV = () => {
    if (!data.length) return
    const header = columns.map((c) => c.header).join(",")
    const rows = data.map((row) => columns.map((c) => `"${c.cell(row).replace(/"/g, '""')}"`).join(",")).join("\n")
    const blob = new Blob([header + "\n" + rows], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <section className="bg-white rounded-lg shadow mb-12">
      <div className="p-6 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-xl font-semibold">{title}</h2>
        {data.length > 0 && (
          <button onClick={exportCSV} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
            Export CSV
          </button>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((col) => (
                <th key={col.header} className="px-6 py-3 text-left font-medium text-gray-500 uppercase">
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((row) => (
              <tr key={row.id}>
                {columns.map((col) => (
                  <td key={col.header} className="px-6 py-4 whitespace-nowrap">
                    {col.cell(row)}
                  </td>
                ))}
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="text-center py-8 text-gray-500">
                  No data yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}
