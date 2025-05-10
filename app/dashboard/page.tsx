"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import DashboardHeader from "@/components/dashboard/header"
import DashboardSidebar from "@/components/dashboard/sidebar"
import AnalyticsCard from "@/components/dashboard/analytics-card"
import RecentActivityCard from "@/components/dashboard/recent-activity-card"
import SalaryChart from "@/components/dashboard/salary-chart"
import JobSearchSection from "@/components/dashboard/job-search-section"
import { BarChart2, Users, DollarSign, TrendingUp } from "lucide-react"

export default function DashboardPage() {
  const router = useRouter()
  const [isMounted, setIsMounted] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null // Prevents hydration errors
  }

  const handleJobSearch = (query: string) => {
    // Navigate to job search results with the query
    router.push(`/jobs?query=${encodeURIComponent(query)}`)
  }

  const handleJobClick = (jobId: number) => {
    // Navigate to job details page
    router.push(`/jobs/${jobId}`)
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <DashboardSidebar isOpen={isSidebarOpen} />

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <DashboardHeader onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="mx-auto max-w-7xl">
            {/* Welcome Section */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">Welcome back, Alex</h1>
              <p className="mt-1 text-gray-600">Here's what's happening with your compensation benchmarks today.</p>
            </div>

            {/* Job Search Section */}
            <JobSearchSection onSearch={handleJobSearch} />

            {/* Analytics Cards */}
            <div className="mb-6 mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <AnalyticsCard
                title="Total Benchmarks"
                value="24"
                change="+12%"
                isPositive={true}
                icon={<BarChart2 className="h-6 w-6 text-blue-600" />}
                description="vs. last month"
              />
              <AnalyticsCard
                title="Salary Insights"
                value="156"
                change="+8%"
                isPositive={true}
                icon={<DollarSign className="h-6 w-6 text-green-600" />}
                description="vs. last month"
              />
              <AnalyticsCard
                title="Industry Comparisons"
                value="8"
                change="-3%"
                isPositive={false}
                icon={<TrendingUp className="h-6 w-6 text-purple-600" />}
                description="vs. last month"
              />
              <AnalyticsCard
                title="Team Members"
                value="5"
                change="+1"
                isPositive={true}
                icon={<Users className="h-6 w-6 text-orange-600" />}
                description="new this month"
              />
            </div>

            {/* Charts and Activity Section */}
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Salary Trends Chart */}
              <div className="lg:col-span-2">
                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">Salary Trends</h2>
                    <div className="flex items-center space-x-2">
                      <select className="rounded-md border border-gray-300 bg-white px-3 py-1 text-sm">
                        <option>Last 6 Months</option>
                        <option>Last Year</option>
                        <option>All Time</option>
                      </select>
                    </div>
                  </div>
                  <SalaryChart />
                </div>
              </div>

              {/* Recent Activity */}
              <div className="lg:col-span-1">
                <RecentActivityCard />
              </div>
            </div>

            {/* Recent Benchmarks */}
            <div className="mt-6">
              <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Recent Benchmarks</h2>
                  <button
                    onClick={() => router.push("/jobs")}
                    className="text-sm font-medium text-[#182654] hover:text-[#182654]/80"
                  >
                    View All
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                        >
                          Role
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                        >
                          Industry
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                        >
                          Location
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                        >
                          Median Salary
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      <tr className="cursor-pointer hover:bg-gray-50" onClick={() => handleJobClick(1)}>
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                          Software Engineer
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">Technology</td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">San Francisco, CA</td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">$145,000</td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleJobClick(1)
                            }}
                            className="font-medium text-[#182654] hover:text-[#182654]/80"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                      <tr className="cursor-pointer hover:bg-gray-50" onClick={() => handleJobClick(2)}>
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                          Product Manager
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">Technology</td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">New York, NY</td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">$160,000</td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleJobClick(2)
                            }}
                            className="font-medium text-[#182654] hover:text-[#182654]/80"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                      <tr className="cursor-pointer hover:bg-gray-50" onClick={() => handleJobClick(3)}>
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                          Marketing Specialist
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">Marketing</td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">Chicago, IL</td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">$60,000</td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleJobClick(3)
                            }}
                            className="font-medium text-[#182654] hover:text-[#182654]/80"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
