"use client"

import { DollarSign, Briefcase, MapPin, Building, Clock } from "lucide-react"
import type { JobData } from "@/data/job-data"

interface JobCardProps {
  job: JobData
  onClick: () => void
}

export default function JobCard({ job, onClick }: JobCardProps) {
  return (
    <div
      className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md cursor-pointer"
      onClick={onClick}
    >
      <div className="p-5">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
          <div className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
            {job.salaryRange}
          </div>
        </div>

        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-500">
          <div className="flex items-center">
            <Building className="mr-1 h-4 w-4" />
            {job.company}
          </div>
          <div className="flex items-center">
            <MapPin className="mr-1 h-4 w-4" />
            {job.location}
          </div>
          <div className="flex items-center">
            <Briefcase className="mr-1 h-4 w-4" />
            {job.industry}
          </div>
          <div className="flex items-center">
            <Clock className="mr-1 h-4 w-4" />
            {job.experienceLevel}
          </div>
        </div>

        <p className="mt-3 text-gray-600">{job.description}</p>

        <div className="mt-4">
          <h4 className="font-medium text-gray-900">Compensation Details:</h4>
          <div className="mt-2 grid gap-2 rounded-lg bg-gray-50 p-3 text-sm md:grid-cols-2">
            <div>
              <span className="font-medium">Base Salary:</span> {job.baseSalary}
            </div>
            <div>
              <span className="font-medium">Bonus:</span> {job.bonus}
            </div>
            <div>
              <span className="font-medium">Equity:</span> {job.equity}
            </div>
            <div>
              <span className="font-medium">Benefits:</span> {job.benefits}
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={(e) => {
              e.stopPropagation()
              onClick()
            }}
            className="inline-flex items-center rounded-lg bg-[#182654] px-4 py-2 text-center text-sm font-medium text-white hover:bg-[#182654]/90 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            <DollarSign className="mr-1 h-4 w-4" />
            View Details
          </button>
        </div>
      </div>
    </div>
  )
}
