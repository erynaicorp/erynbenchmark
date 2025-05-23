"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Building, MapPin, Briefcase, Clock, DollarSign, Award, GraduationCap, Users } from "lucide-react"
import { jobData, type JobData } from "@/data/job-data"
import SalaryChart from "@/components/salary-chart"
import SimilarJobs from "@/components/similar-jobs"

export default function JobDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [job, setJob] = useState<JobData | null>(null)
  const [loading, setLoading] = useState(true)

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

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#182654] border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Loading job details...</p>
        </div>
      </div>
    )
  }

  if (!job) {
    return (
      <div className="container mx-auto px-4 py-12">
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
              <div className="rounded-full bg-white px-4 py-2 text-lg font-bold text-[#182654]">{job.salaryRange}</div>
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

            {/* Salary Visualization */}
            <div className="mb-8">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">Salary Comparison</h2>
              <div className="rounded-lg border border-gray-200 p-6">
                <SalaryChart jobTitle={job.title} currentSalary={job.baseSalary} />
              </div>
            </div>

            {/* Job Description */}
            <div className="mb-8">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">Job Description</h2>
              <div className="rounded-lg border border-gray-200 p-6">
                <p className="text-gray-700">{job.description}</p>

                {/* Additional job details - this would come from a more detailed API in a real app */}
                <h3 className="mt-6 font-semibold text-gray-900">Responsibilities:</h3>
                <ul className="mt-2 list-inside list-disc space-y-1 text-gray-700">
                  <li>Develop and maintain high-quality applications</li>
                  <li>Collaborate with cross-functional teams to define and implement new features</li>
                  <li>Ensure the performance, quality, and responsiveness of applications</li>
                  <li>Identify and correct bottlenecks and fix bugs</li>
                  <li>Help maintain code quality, organization, and automatization</li>
                </ul>

                <h3 className="mt-6 font-semibold text-gray-900">Requirements:</h3>
                <ul className="mt-2 list-inside list-disc space-y-1 text-gray-700">
                  <li>Bachelor's degree in Computer Science or related field</li>
                  <li>Proven work experience in a similar role</li>
                  <li>Strong problem-solving skills and attention to detail</li>
                  <li>Excellent communication and teamwork skills</li>
                  <li>Ability to work independently and manage multiple priorities</li>
                </ul>
              </div>
            </div>

            {/* Company Information */}
            <div className="mb-8">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">About {job.company}</h2>
              <div className="rounded-lg border border-gray-200 p-6">
                <p className="text-gray-700">
                  {job.company} is a leading company in the {job.industry.toLowerCase()} industry, known for its
                  innovative approach and commitment to excellence. With a strong focus on employee growth and
                  development, {job.company} offers competitive compensation packages and a supportive work environment.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800">Great Benefits</span>
                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-800">Work-Life Balance</span>
                  <span className="rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-800">Career Growth</span>
                  <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-800">Innovative</span>
                </div>
              </div>
            </div>

            {/* Similar Jobs */}
            <div>
              <h2 className="mb-4 text-2xl font-bold text-gray-900">Similar Jobs</h2>
              <SimilarJobs currentJobId={job.id} industry={job.industry} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
