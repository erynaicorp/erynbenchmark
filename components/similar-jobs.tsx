"use client"

import { useEffect, useState } from "react"
import { jobData, type JobData } from "@/data/job-data"
import Link from "next/link"
import { Building, MapPin, ArrowRight } from "lucide-react"

interface SimilarJobsProps {
  currentJobId: number
  industry: string
}

export default function SimilarJobs({ currentJobId, industry }: SimilarJobsProps) {
  const [similarJobs, setSimilarJobs] = useState<JobData[]>([])

  useEffect(() => {
    // Find similar jobs based on industry, excluding the current job
    const similar = jobData.filter((job) => job.id !== currentJobId && job.industry === industry).slice(0, 3)

    setSimilarJobs(similar)
  }, [currentJobId, industry])

  if (similarJobs.length === 0) {
    return <p className="text-gray-500">No similar jobs found.</p>
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {similarJobs.map((job) => (
        <div
          key={job.id}
          className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md"
        >
          <h3 className="font-semibold text-gray-900">{job.title}</h3>
          <div className="mt-2 text-sm text-gray-600">{job.salaryRange}</div>
          <div className="mt-2 flex flex-col gap-1 text-sm text-gray-500">
            <div className="group relative flex items-center">
              <div className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                Company
              </div>
              <Building className="mr-1 h-4 w-4" />
              <span className="sr-only">Company:</span>
              {job.company}
            </div>
            <div className="group relative flex items-center">
              <div className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                Location
              </div>
              <MapPin className="mr-1 h-4 w-4" />
              <span className="sr-only">Location:</span>
              {job.location}
            </div>
          </div>
          <Link
            href={`/job/${job.id}`}
            className="mt-3 flex items-center text-sm font-medium text-[#182654] hover:underline"
          >
            View Details
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      ))}
    </div>
  )
}
