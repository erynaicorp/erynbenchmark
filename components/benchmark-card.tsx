import { BarChart2, Building, MapPin, Briefcase, Users } from "lucide-react"
import Link from "next/link"
import type { BenchmarkData } from "@/data/benchmark-data"

interface BenchmarkCardProps {
  benchmark: BenchmarkData
}

export default function BenchmarkCard({ benchmark }: BenchmarkCardProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md">
      <div className="p-5">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <h3 className="text-xl font-semibold text-gray-900">{benchmark.role}</h3>
          <div className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
            {benchmark.medianSalary}
          </div>
        </div>

        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-500">
          <div className="group relative flex items-center">
            <div className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
              Industry
            </div>
            <Building className="mr-1 h-4 w-4" />
            <span className="sr-only">Industry:</span>
            {benchmark.industry}
          </div>
          <div className="group relative flex items-center">
            <div className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
              Location
            </div>
            <MapPin className="mr-1 h-4 w-4" />
            <span className="sr-only">Location:</span>
            {benchmark.location}
          </div>
          <div className="group relative flex items-center">
            <div className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
              Experience Level
            </div>
            <Briefcase className="mr-1 h-4 w-4" />
            <span className="sr-only">Experience Level:</span>
            {benchmark.experienceLevel}
          </div>
          <div className="group relative flex items-center">
            <div className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
              Company Size
            </div>
            <Users className="mr-1 h-4 w-4" />
            <span className="sr-only">Company Size:</span>
            {benchmark.companySize}
          </div>
        </div>

        <div className="mt-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="sr-only">Salary Range:</span>
            <span className="group relative text-sm font-medium text-gray-700">
              <div className="absolute bottom-full left-0 mb-2 rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                Salary Range
              </div>
              Salary Range
            </span>
            <span className="text-sm font-medium text-gray-700">
              {benchmark.salaryRange.min} - {benchmark.salaryRange.max}
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full rounded-full bg-blue-600"
              style={{
                width: "100%",
                background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${
                  ((Number.parseInt(benchmark.medianSalary.replace(/[^0-9]/g, "")) -
                    Number.parseInt(benchmark.salaryRange.min.replace(/[^0-9]/g, ""))) /
                    (Number.parseInt(benchmark.salaryRange.max.replace(/[^0-9]/g, "")) -
                      Number.parseInt(benchmark.salaryRange.min.replace(/[^0-9]/g, "")))) *
                  100
                }%, #dbeafe ${
                  ((Number.parseInt(benchmark.medianSalary.replace(/[^0-9]/g, "")) -
                    Number.parseInt(benchmark.salaryRange.min.replace(/[^0-9]/g, ""))) /
                    (Number.parseInt(benchmark.salaryRange.max.replace(/[^0-9]/g, "")) -
                      Number.parseInt(benchmark.salaryRange.min.replace(/[^0-9]/g, "")))) *
                  100
                }%, #dbeafe 100%)`,
              }}
            ></div>
          </div>
        </div>

        <div className="mt-4 grid gap-2 rounded-lg bg-gray-50 p-3 text-sm md:grid-cols-2">
          <div className="group relative">
            <div className="absolute bottom-full left-0 mb-2 rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
              Base Salary
            </div>
            <span className="sr-only">Base Salary:</span>
            <span className="font-medium">Base:</span> {benchmark.baseSalary}
          </div>
          <div className="group relative">
            <div className="absolute bottom-full left-0 mb-2 rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
              Bonus
            </div>
            <span className="sr-only">Bonus:</span>
            <span className="font-medium">Bonus:</span> {benchmark.bonus}
          </div>
          <div className="group relative">
            <div className="absolute bottom-full left-0 mb-2 rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
              Equity
            </div>
            <span className="sr-only">Equity:</span>
            <span className="font-medium">Equity:</span> {benchmark.equity}
          </div>
          <div className="group relative">
            <div className="absolute bottom-full left-0 mb-2 rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
              Benefits Value
            </div>
            <span className="sr-only">Benefits Value:</span>
            <span className="font-medium">Benefits:</span> {benchmark.benefitsValue}
          </div>
        </div>

        <div className="mt-4 flex justify-between">
          <div className="group relative text-sm text-gray-500">
            <div className="absolute bottom-full left-0 mb-2 rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
              Data Sources
            </div>
            <span className="sr-only">Data Sources:</span>
            <span className="font-medium">Sources:</span> {benchmark.dataSources}
          </div>
          <Link
            href={`/benchmark/${benchmark.id}`}
            className="inline-flex items-center rounded-lg bg-[#182654] px-4 py-2 text-center text-sm font-medium text-white hover:bg-[#182654]/90 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            <BarChart2 className="mr-1 h-4 w-4" />
            View Analysis
          </Link>
        </div>
      </div>
    </div>
  )
}
