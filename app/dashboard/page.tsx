"use client"

import { useState } from "react"
import Link from "next/link"
import { Calculator, BarChart2, TrendingUp, DollarSign, FileText, Settings, Bell, Search, Plus } from "lucide-react"

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const quickActions = [
    {
      title: "Salary Aging Calculator",
      description: "Calculate future salary values with compound growth",
      icon: Calculator,
      href: "/salary-aging-calculator",
      color: "bg-blue-500",
    },
    {
      title: "Benchmark Analysis",
      description: "Compare compensation across roles and industries",
      icon: BarChart2,
      href: "/benchmark/1",
      color: "bg-green-500",
    },
    {
      title: "Job Salary Finder",
      description: "Find salary information for specific positions",
      icon: DollarSign,
      href: "/job/1",
      color: "bg-purple-500",
    },
    {
      title: "Market Trends",
      description: "View compensation trends and insights",
      icon: TrendingUp,
      href: "/market-trends",
      color: "bg-orange-500",
    },
  ]

  const recentActivity = [
    {
      action: "Calculated salary aging",
      details: "Software Engineer role - $125,000 to $145,000",
      time: "2 hours ago",
      type: "calculation",
    },
    {
      action: "Viewed benchmark",
      details: "Product Manager in San Francisco, CA",
      time: "1 day ago",
      type: "benchmark",
    },
    {
      action: "Exported report",
      details: "Compensation analysis for Q4 2024",
      time: "3 days ago",
      type: "export",
    },
  ]

  const stats = [
    {
      label: "Calculations This Month",
      value: "24",
      change: "+12%",
      changeType: "positive" as const,
    },
    {
      label: "Benchmarks Viewed",
      value: "156",
      change: "+8%",
      changeType: "positive" as const,
    },
    {
      label: "Reports Generated",
      value: "8",
      change: "+25%",
      changeType: "positive" as const,
    },
    {
      label: "Time Saved",
      value: "12h",
      change: "+15%",
      changeType: "positive" as const,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-8 w-8">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-pej3PEo2vacu5qWbP1jAdYGyEBi7x8.png"
                  alt="eryn logo"
                  className="h-full w-full object-contain"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-sm text-gray-600">Welcome back to your compensation intelligence hub</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search tools, benchmarks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 rounded-md border border-gray-300 pl-10 pr-4 py-2 focus:border-[#182654] focus:outline-none focus:ring-1 focus:ring-[#182654]"
                />
              </div>
              <button className="rounded-md bg-gray-100 p-2 text-gray-600 hover:bg-gray-200">
                <Bell className="h-5 w-5" />
              </button>
              <button className="rounded-md bg-gray-100 p-2 text-gray-600 hover:bg-gray-200">
                <Settings className="h-5 w-5" />
              </button>
              <div className="h-8 w-8 rounded-full bg-[#182654]"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="rounded-lg bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div
                  className={`text-sm font-medium ${
                    stat.changeType === "positive" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {stat.change}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
              <button className="flex items-center space-x-2 rounded-md bg-[#182654] px-4 py-2 text-sm font-medium text-white hover:bg-[#182654]/90">
                <Plus className="h-4 w-4" />
                <span>New Analysis</span>
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {quickActions.map((action, index) => (
                <Link
                  key={index}
                  href={action.href}
                  className="group rounded-lg bg-white p-6 shadow-sm transition-all hover:shadow-md"
                >
                  <div className="flex items-start space-x-4">
                    <div className={`rounded-lg p-3 ${action.color}`}>
                      <action.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 group-hover:text-[#182654]">{action.title}</h3>
                      <p className="mt-1 text-sm text-gray-600">{action.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h2 className="mb-6 text-lg font-semibold text-gray-900">Recent Activity</h2>
            <div className="rounded-lg bg-white shadow-sm">
              <div className="divide-y divide-gray-200">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="p-4">
                    <div className="flex items-start space-x-3">
                      <div
                        className={`mt-1 h-2 w-2 rounded-full ${
                          activity.type === "calculation"
                            ? "bg-blue-500"
                            : activity.type === "benchmark"
                              ? "bg-green-500"
                              : "bg-purple-500"
                        }`}
                      ></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                        <p className="text-sm text-gray-600">{activity.details}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-200 p-4">
                <button className="text-sm font-medium text-[#182654] hover:underline">View all activity</button>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Tools */}
        <div className="mt-8">
          <h2 className="mb-6 text-lg font-semibold text-gray-900">Featured Tools</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 p-6 text-white">
              <Calculator className="mb-4 h-8 w-8" />
              <h3 className="mb-2 text-lg font-semibold">Salary Aging Calculator</h3>
              <p className="mb-4 text-blue-100">Project future salary values using compound growth calculations</p>
              <Link
                href="/salary-aging-calculator"
                className="inline-flex items-center rounded-md bg-white px-4 py-2 text-sm font-medium text-blue-600 hover:bg-gray-100"
              >
                Try Calculator
              </Link>
            </div>

            <div className="rounded-lg bg-gradient-to-br from-green-500 to-green-600 p-6 text-white">
              <BarChart2 className="mb-4 h-8 w-8" />
              <h3 className="mb-2 text-lg font-semibold">Market Benchmarks</h3>
              <p className="mb-4 text-green-100">Compare compensation across industries and locations</p>
              <Link
                href="/benchmark/1"
                className="inline-flex items-center rounded-md bg-white px-4 py-2 text-sm font-medium text-green-600 hover:bg-gray-100"
              >
                View Benchmarks
              </Link>
            </div>

            <div className="rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 p-6 text-white">
              <FileText className="mb-4 h-8 w-8" />
              <h3 className="mb-2 text-lg font-semibold">Custom Reports</h3>
              <p className="mb-4 text-purple-100">Generate detailed compensation analysis reports</p>
              <button className="inline-flex items-center rounded-md bg-white px-4 py-2 text-sm font-medium text-purple-600 hover:bg-gray-100">
                Coming Soon
              </button>
            </div>
          </div>
        </div>

        {/* Pro Features Teaser */}
        <div className="mt-8 rounded-lg border border-blue-200 bg-blue-50 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="rounded-full bg-blue-100 p-3">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-900">Unlock Pro Features</h3>
                <p className="text-blue-700">
                  Get unlimited calculations, advanced analytics, custom reports, and real-time market data
                </p>
              </div>
            </div>
            <button className="rounded-md bg-blue-600 px-6 py-2 text-white font-medium hover:bg-blue-700">
              Upgrade Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
