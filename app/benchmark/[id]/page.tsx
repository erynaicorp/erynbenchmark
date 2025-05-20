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
  BookOpen,
  GraduationCap,
  Brain,
  PenToolIcon as Tool,
  Award,
  ClipboardList,
  CheckSquare,
  FileText,
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
  const [activeTab, setActiveTab] = useState<"compensation" | "jobDescription">("compensation")

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
                <div className="sr-only">
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

          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200 bg-white">
            <button
              className={`flex-1 py-4 text-center font-medium ${
                activeTab === "compensation"
                  ? "border-b-2 border-[#182654] text-[#182654]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("compensation")}
            >
              Compensation Data
            </button>
            <button
              className={`flex-1 py-4 text-center font-medium ${
                activeTab === "jobDescription"
                  ? "border-b-2 border-[#182654] text-[#182654]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("jobDescription")}
            >
              Job Description
            </button>
          </div>

          {/* Main Content */}
          <div className="rounded-b-xl bg-white p-8 shadow-md">
            {activeTab === "compensation" ? (
              /* Compensation Tab Content */
              <>
                {/* Benchmark Overview */}
                <div className="mb-8 grid gap-6 border-b border-gray-200 pb-8 md:grid-cols-4">
                  <div className="group relative flex items-start">
                    <div className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                      Experience Level
                    </div>
                    <Briefcase className="mr-3 h-6 w-6 text-[#182654]" />
                    <div>
                      <h3 className="sr-only">Experience Level</h3>
                      <p className="text-gray-600">{benchmark.experienceLevel}</p>
                    </div>
                  </div>
                  <div className="group relative flex items-start">
                    <div className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                      Company Size
                    </div>
                    <Users className="mr-3 h-6 w-6 text-[#182654]" />
                    <div>
                      <h3 className="sr-only">Company Size</h3>
                      <p className="text-gray-600">{benchmark.companySize}</p>
                    </div>
                  </div>
                  <div className="group relative flex items-start">
                    <div className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                      Total Compensation
                    </div>
                    <DollarSign className="mr-3 h-6 w-6 text-[#182654]" />
                    <div>
                      <h3 className="sr-only">Total Compensation</h3>
                      <p className="text-gray-600">{benchmark.totalCompensation}</p>
                    </div>
                  </div>
                  <div className="group relative flex items-start">
                    <div className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                      Year-over-Year Change
                    </div>
                    <TrendingUp className="mr-3 h-6 w-6 text-[#182654]" />
                    <div>
                      <h3 className="sr-only">YoY Change</h3>
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
                    Market Trends (Trailing 12 Months)
                  </h2>
                  <div className="rounded-lg border border-gray-200 p-6">
                    <MarketTrendsChart
                      role={benchmark.role}
                      industry={benchmark.industry}
                      location={benchmark.location}
                    />
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
                    self-reported salaries, HR-provided compensation bands, and public job listings. Data is normalized
                    for regional cost of living differences and updated quarterly.
                  </p>
                  <div className="mt-4 text-sm text-gray-500">
                    <p>Last updated: May 2025</p>
                    <p>Sample size: {benchmark.sampleSize} compensation data points</p>
                  </div>
                </div>
              </>
            ) : (
              /* Job Description Tab Content */
              <>
                {benchmark.jobDescription ? (
                  <div className="space-y-8">
                    {/* Job Overview */}
                    <div>
                      <h2 className="mb-4 flex items-center text-2xl font-bold text-gray-900">
                        <FileText className="mr-2 h-6 w-6 text-[#182654]" />
                        Job Overview
                      </h2>
                      <div className="rounded-lg border border-gray-200 p-6">
                        <p className="text-gray-700">{benchmark.jobDescription.overview}</p>
                      </div>
                    </div>

                    {/* Education Requirements */}
                    <div>
                      <h2 className="mb-4 flex items-center text-xl font-bold text-gray-900">
                        <GraduationCap className="mr-2 h-6 w-6 text-[#182654]" />
                        Education Requirements
                      </h2>
                      <div className="rounded-lg border border-gray-200 p-6">
                        <ul className="list-inside list-disc space-y-2 text-gray-700">
                          {benchmark.jobDescription.education.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Knowledge Requirements */}
                    <div>
                      <h2 className="mb-4 flex items-center text-xl font-bold text-gray-900">
                        <Brain className="mr-2 h-6 w-6 text-[#182654]" />
                        Knowledge Requirements
                      </h2>
                      <div className="rounded-lg border border-gray-200 p-6">
                        <ul className="list-inside list-disc space-y-2 text-gray-700">
                          {benchmark.jobDescription.knowledge.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Skills */}
                    <div>
                      <h2 className="mb-4 flex items-center text-xl font-bold text-gray-900">
                        <Tool className="mr-2 h-6 w-6 text-[#182654]" />
                        Skills
                      </h2>
                      <div className="rounded-lg border border-gray-200 p-6">
                        <ul className="list-inside list-disc space-y-2 text-gray-700">
                          {benchmark.jobDescription.skills.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Abilities */}
                    <div>
                      <h2 className="mb-4 flex items-center text-xl font-bold text-gray-900">
                        <Award className="mr-2 h-6 w-6 text-[#182654]" />
                        Abilities
                      </h2>
                      <div className="rounded-lg border border-gray-200 p-6">
                        <ul className="list-inside list-disc space-y-2 text-gray-700">
                          {benchmark.jobDescription.abilities.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Responsibilities */}
                    <div>
                      <h2 className="mb-4 flex items-center text-xl font-bold text-gray-900">
                        <ClipboardList className="mr-2 h-6 w-6 text-[#182654]" />
                        Responsibilities
                      </h2>
                      <div className="rounded-lg border border-gray-200 p-6">
                        <ul className="list-inside list-disc space-y-2 text-gray-700">
                          {benchmark.jobDescription.responsibilities.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Accountabilities */}
                    <div>
                      <h2 className="mb-4 flex items-center text-xl font-bold text-gray-900">
                        <CheckSquare className="mr-2 h-6 w-6 text-[#182654]" />
                        Accountabilities
                      </h2>
                      <div className="rounded-lg border border-gray-200 p-6">
                        <ul className="list-inside list-disc space-y-2 text-gray-700">
                          {benchmark.jobDescription.accountabilities.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Work Environment */}
                    {benchmark.jobDescription.workEnvironment && (
                      <div>
                        <h2 className="mb-4 flex items-center text-xl font-bold text-gray-900">
                          <Building className="mr-2 h-6 w-6 text-[#182654]" />
                          Work Environment
                        </h2>
                        <div className="rounded-lg border border-gray-200 p-6">
                          <p className="text-gray-700">{benchmark.jobDescription.workEnvironment}</p>
                        </div>
                      </div>
                    )}

                    {/* Physical Requirements */}
                    {benchmark.jobDescription.physicalRequirements && (
                      <div>
                        <h2 className="mb-4 flex items-center text-xl font-bold text-gray-900">
                          <Users className="mr-2 h-6 w-6 text-[#182654]" />
                          Physical Requirements
                        </h2>
                        <div className="rounded-lg border border-gray-200 p-6">
                          <ul className="list-inside list-disc space-y-2 text-gray-700">
                            {benchmark.jobDescription.physicalRequirements.map((item, index) => (
                              <li key={index}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}

                    {/* Certifications */}
                    {benchmark.jobDescription.certifications && (
                      <div>
                        <h2 className="mb-4 flex items-center text-xl font-bold text-gray-900">
                          <BookOpen className="mr-2 h-6 w-6 text-[#182654]" />
                          Certifications
                        </h2>
                        <div className="rounded-lg border border-gray-200 p-6">
                          <ul className="list-inside list-disc space-y-2 text-gray-700">
                            {benchmark.jobDescription.certifications.map((item, index) => (
                              <li key={index}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12">
                    <FileText className="h-16 w-16 text-gray-300" />
                    <h3 className="mt-4 text-xl font-medium text-gray-700">Job Description Not Available</h3>
                    <p className="mt-2 text-center text-gray-500">
                      Detailed job description information is not available for this role. Please check back later or
                      contact our support team for assistance.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
