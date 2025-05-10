"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  Building,
  MapPin,
  Briefcase,
  Users,
  DollarSign,
  TrendingUp,
  BarChart2,
  PieChart,
  Globe,
} from "lucide-react"
import { benchmarkData, type BenchmarkData } from "@/data/benchmark-data"
import SalaryComparisonChart from "@/components/salary-comparison-chart"
import CompensationBreakdownChart from "@/components/compensation-breakdown-chart"
import MarketTrendsChart from "@/components/market-trends-chart"
import RegionalComparisonTable from "@/components/regional-comparison-table"

export default function BenchmarkDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [benchmark, setBenchmark] = useState<BenchmarkData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Find the benchmark with the matching ID
    const benchmarkId = Number.parseInt(params.id)
    const foundBenchmark = benchmarkData.find((b) => b.id === benchmarkId) || null

    // Simulate loading delay
    setTimeout(() => {
      setBenchmark(foundBenchmark)
      setLoading(false)
    }, 500)
  }, [params.id])

  const goBack = () => {
    router.back()
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#182654] border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Loading benchmark data...</p>
        </div>
      </div>
    )
  }

  if (!benchmark) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-4xl rounded-xl bg-white p-8 shadow-md">
          <button onClick={goBack} className="mb-6 flex items-center text-[#182654] hover:underline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to search results
          </button>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Benchmark Not Found</h1>
            <p className="mt-4 text-gray-600">The compensation benchmark you're looking for doesn't exist.</p>
            <button
              onClick={goBack}
              className="mt-6 rounded-lg bg-[#182654] px-6 py-2 text-white hover:bg-[#182654]/90"
            >
              Return to Search
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-5xl">
          <button onClick={goBack} className="mb-6 flex items-center text-[#182654] hover:underline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to search results
          </button>

          {/* Header Section */}
          <div className="overflow-hidden rounded-t-xl bg-[#182654] p-8 text-white">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold">{benchmark.role}</h1>
                <div className="mt-2 flex flex-wrap items-center gap-4 text-gray-200">
                  <div className="flex items-center">
                    <Building className="mr-1 h-5 w-5" />
                    {benchmark.industry}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="mr-1 h-5 w-5" />
                    {benchmark.location}
                  </div>
                </div>
              </div>
              <div className="rounded-full bg-white px-4 py-2 text-lg font-bold text-[#182654]">
                {benchmark.medianSalary}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="rounded-b-xl bg-white p-8 shadow-md">
            {/* Benchmark Overview */}
            <div className="mb-8 grid gap-6 border-b border-gray-200 pb-8 md:grid-cols-4">
              <div className="flex items-start">
                <Briefcase className="mr-3 h-6 w-6 text-[#182654]" />
                <div>
                  <h3 className="font-medium text-gray-900">Experience Level</h3>
                  <p className="text-gray-600">{benchmark.experienceLevel}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Users className="mr-3 h-6 w-6 text-[#182654]" />
                <div>
                  <h3 className="font-medium text-gray-900">Company Size</h3>
                  <p className="text-gray-600">{benchmark.companySize}</p>
                </div>
              </div>
              <div className="flex items-start">
                <DollarSign className="mr-3 h-6 w-6 text-[#182654]" />
                <div>
                  <h3 className="font-medium text-gray-900">Total Compensation</h3>
                  <p className="text-gray-600">{benchmark.totalCompensation}</p>
                </div>
              </div>
              <div className="flex items-start">
                <TrendingUp className="mr-3 h-6 w-6 text-[#182654]" />
                <div>
                  <h3 className="font-medium text-gray-900">YoY Change</h3>
                  <p className="text-gray-600">{benchmark.yearOverYearChange}</p>
                </div>
              </div>
            </div>

            {/* Salary Comparison Chart */}
            <div className="mb-8">
              <h2 className="mb-4 flex items-center text-2xl font-bold text-gray-900">
                <BarChart2 className="mr-2 h-6 w-6 text-[#182654]" />
                Market Salary Comparison
              </h2>
              <div className="rounded-lg border border-gray-200 p-6">
                <SalaryComparisonChart benchmark={benchmark} />
              </div>
            </div>

            {/* Compensation Breakdown */}
            <div className="mb-8">
              <h2 className="mb-4 flex items-center text-2xl font-bold text-gray-900">
                <PieChart className="mr-2 h-6 w-6 text-[#182654]" />
                Compensation Breakdown
              </h2>
              <div className="rounded-lg border border-gray-200 p-6">
                <CompensationBreakdownChart benchmark={benchmark} />
              </div>
            </div>

            {/* Market Trends */}
            <div className="mb-8">
              <h2 className="mb-4 flex items-center text-2xl font-bold text-gray-900">
                <TrendingUp className="mr-2 h-6 w-6 text-[#182654]" />
                Market Trends (Last 3 Years)
              </h2>
              <div className="rounded-lg border border-gray-200 p-6">
                <MarketTrendsChart role={benchmark.role} industry={benchmark.industry} />
              </div>
            </div>

            {/* Regional Comparison */}
            <div className="mb-8">
              <h2 className="mb-4 flex items-center text-2xl font-bold text-gray-900">
                <Globe className="mr-2 h-6 w-6 text-[#182654]" />
                Regional Salary Comparison
              </h2>
              <div className="rounded-lg border border-gray-200 p-6">
                <RegionalComparisonTable role={benchmark.role} currentLocation={benchmark.location} />
              </div>
            </div>

            {/* Methodology & Data Sources */}
            <div className="rounded-lg bg-gray-50 p-6">
              <h3 className="mb-3 text-lg font-semibold text-gray-900">Methodology & Data Sources</h3>
              <p className="text-gray-700">
                This compensation benchmark is based on data from {benchmark.dataSources}. The analysis includes
                self-reported salaries, HR-provided compensation bands, and public job listings. Data is normalized for
                regional cost of living differences and updated quarterly.
              </p>
              <div className="mt-4 text-sm text-gray-500">
                <p>Last updated: May 2025</p>
                <p>Sample size: {benchmark.sampleSize} compensation data points</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
