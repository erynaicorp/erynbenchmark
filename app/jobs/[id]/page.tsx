"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Building, MapPin, Briefcase, Clock, DollarSign, Award, GraduationCap, Users } from "lucide-react"
import DashboardHeader from "@/components/dashboard/header"
import DashboardSidebar from "@/components/dashboard/sidebar"
import { jobData, type JobData } from "@/data/job-data"

export default function JobDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [job, setJob] = useState<JobData | null>(null)
  const [loading, setLoading] = useState(true)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  useEffect(() => {
    // Find the job with the matching ID
    const jobId = Number.parseInt(params.id)
    const foundJob = jobData.find((j) => j.id === jobId) || null

    // Simulate loading delay
    setTimeout(() => {
      setJob(foundJob)
      setLoading(false)
    }, 500)
  }, [params.id])

  const goBack = () => {
    router.back()
  }

  const viewFullDetails = () => {
    router.push(`/jobs/${params.id}/details`)
  }

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <DashboardSidebar isOpen={isSidebarOpen} />
        <div className="flex flex-1 flex-col overflow-hidden">
          <DashboardHeader onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
          <div className="flex flex-1 items-center justify-center">
            <div className="flex flex-col items-center">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#182654] border-t-transparent"></div>
              <p className="mt-4 text-gray-600">Loading job details...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!job) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <DashboardSidebar isOpen={isSidebarOpen} />
        <div className="flex flex-1 flex-col overflow-hidden">
          <DashboardHeader onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            <div className="mx-auto max-w-4xl rounded-xl bg-white p-8 shadow-md">
              <button onClick={goBack} className="mb-6 flex items-center text-[#182654] hover:underline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to search results
              </button>
              <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-900">Job Not Found</h1>
                <p className="mt-4 text-gray-600">The job you're looking for doesn't exist or has been removed.</p>
                <button
                  onClick={goBack}
                  className="mt-6 rounded-lg bg-[#182654] px-6 py-2 text-white hover:bg-[#182654]/90"
                >
                  Return to Search
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar isOpen={isSidebarOpen} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardHeader onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="mx-auto max-w-5xl">
            <button onClick={goBack} className="mb-6 flex items-center text-[#182654] hover:underline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to search results
            </button>

            {/* Header Section */}
            <div className="overflow-hidden rounded-t-xl bg-[#182654] p-8 text-white">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold">{job.title}</h1>
                  <div className="mt-2 flex flex-wrap items-center gap-4 text-gray-200">
                    <div className="flex items-center">
                      <Building className="mr-1 h-5 w-5" />
                      {job.company}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="mr-1 h-5 w-5" />
                      {job.location}
                    </div>
                  </div>
                </div>
                <div className="rounded-full bg-white px-4 py-2 text-lg font-bold text-[#182654]">
                  {job.salaryRange}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="rounded-b-xl bg-white p-8 shadow-md">
              {/* Job Overview */}
              <div className="mb-8 grid gap-6 border-b border-gray-200 pb-8 md:grid-cols-3">
                <div className="flex items-start">
                  <Briefcase className="mr-3 h-6 w-6 text-[#182654]" />
                  <div>
                    <h3 className="font-medium text-gray-900">Industry</h3>
                    <p className="text-gray-600">{job.industry}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="mr-3 h-6 w-6 text-[#182654]" />
                  <div>
                    <h3 className="font-medium text-gray-900">Experience</h3>
                    <p className="text-gray-600">{job.experienceLevel}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Users className="mr-3 h-6 w-6 text-[#182654]" />
                  <div>
                    <h3 className="font-medium text-gray-900">Company Size</h3>
                    <p className="text-gray-600">
                      {job.company === "TechCorp" || job.company === "DataDrive"
                        ? "1000+ employees"
                        : job.company === "InnovateCo" || job.company === "DesignHub"
                          ? "100-500 employees"
                          : "50-100 employees"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Compensation Details */}
              <div className="mb-8">
                <h2 className="mb-4 text-2xl font-bold text-gray-900">Compensation Details</h2>
                <div className="grid gap-6 rounded-lg bg-gray-50 p-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div>
                      <h3 className="flex items-center font-medium text-gray-900">
                        <DollarSign className="mr-2 h-5 w-5 text-green-600" />
                        Base Salary
                      </h3>
                      <p className="text-xl font-semibold text-gray-800">{job.baseSalary}</p>
                      <p className="text-sm text-gray-500">Annual base compensation</p>
                    </div>
                    <div>
                      <h3 className="flex items-center font-medium text-gray-900">
                        <Award className="mr-2 h-5 w-5 text-blue-600" />
                        Bonus
                      </h3>
                      <p className="text-xl font-semibold text-gray-800">{job.bonus}</p>
                      <p className="text-sm text-gray-500">Performance-based incentives</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="flex items-center font-medium text-gray-900">
                        <GraduationCap className="mr-2 h-5 w-5 text-purple-600" />
                        Equity
                      </h3>
                      <p className="text-xl font-semibold text-gray-800">{job.equity}</p>
                      <p className="text-sm text-gray-500">Company ownership opportunity</p>
                    </div>
                    <div>
                      <h3 className="flex items-center font-medium text-gray-900">
                        <Users className="mr-2 h-5 w-5 text-orange-600" />
                        Benefits
                      </h3>
                      <p className="text-xl font-semibold text-gray-800">{job.benefits}</p>
                      <p className="text-sm text-gray-500">Additional compensation package</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Job Description */}
              <div className="mb-8">
                <h2 className="mb-4 text-2xl font-bold text-gray-900">Job Description</h2>
                <div className="rounded-lg border border-gray-200 p-6">
                  <p className="text-gray-700">{job.description}</p>
                </div>
              </div>

              {/* View Full Details Button */}
              <div className="flex justify-center">
                <button
                  onClick={viewFullDetails}
                  className="rounded-lg bg-[#182654] px-8 py-3 text-center text-base font-medium text-white hover:bg-[#182654]/90 focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                  View Full Details
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
