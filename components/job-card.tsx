import { DollarSign, Briefcase, MapPin, Building, Clock } from "lucide-react"
import Link from "next/link"
import type { JobData } from "@/data/job-data"

interface JobCardProps {
  job: JobData
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md">
      <div className="p-5">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
          <div className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
            {job.salaryRange}
          </div>
        </div>

        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-500">
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
          <div className="group relative flex items-center">
            <div className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
              Industry
            </div>
            <Briefcase className="mr-1 h-4 w-4" />
            <span className="sr-only">Industry:</span>
            {job.industry}
          </div>
          <div className="group relative flex items-center">
            <div className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
              Experience Level
            </div>
            <Clock className="mr-1 h-4 w-4" />
            <span className="sr-only">Experience Level:</span>
            {job.experienceLevel}
          </div>
        </div>

        <p className="mt-3 text-gray-600">{job.description}</p>

        <div className="mt-4">
          <h4 className="sr-only">Compensation Details:</h4>
          <div className="mt-2 grid gap-2 rounded-lg bg-gray-50 p-3 text-sm md:grid-cols-2">
            <div className="group relative">
              <div className="absolute bottom-full left-0 mb-2 rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                Base Salary
              </div>
              <span className="sr-only">Base Salary:</span>
              <span className="font-medium">Base:</span> {job.baseSalary}
            </div>
            <div className="group relative">
              <div className="absolute bottom-full left-0 mb-2 rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                Bonus
              </div>
              <span className="sr-only">Bonus:</span>
              <span className="font-medium">Bonus:</span> {job.bonus}
            </div>
            <div className="group relative">
              <div className="absolute bottom-full left-0 mb-2 rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                Equity
              </div>
              <span className="sr-only">Equity:</span>
              <span className="font-medium">Equity:</span> {job.equity}
            </div>
            <div className="group relative">
              <div className="absolute bottom-full left-0 mb-2 rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                Benefits
              </div>
              <span className="sr-only">Benefits:</span>
              <span className="font-medium">Benefits:</span> {job.benefits}
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <Link
            href={`/job/${job.id}`}
            className="inline-flex items-center rounded-lg bg-[#182654] px-4 py-2 text-center text-sm font-medium text-white hover:bg-[#182654]/90 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            <DollarSign className="mr-1 h-4 w-4" />
            View Full Details
          </Link>
        </div>
      </div>
    </div>
  )
}
