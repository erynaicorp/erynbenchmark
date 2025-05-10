"use client"

import type React from "react"

import { useState } from "react"
import { Search, Briefcase, MapPin, Filter } from "lucide-react"

interface JobSearchSectionProps {
  onSearch: (query: string) => void
}

export default function JobSearchSection({ onSearch }: JobSearchSectionProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    location: "",
    industry: "",
    experience: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchQuery)
  }

  return (
    <div className="rounded-xl bg-white p-6 shadow-md">
      <h2 className="mb-4 text-lg font-semibold text-gray-900">Find Salary Information</h2>

      <form onSubmit={handleSubmit}>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 pl-10 pr-20 text-gray-900 focus:border-[#182654] focus:ring-[#182654]"
            placeholder="Search job titles, roles, or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            type="submit"
            className="absolute right-2.5 bottom-2.5 rounded-lg bg-[#182654] px-4 py-2 text-sm font-medium text-white hover:bg-[#182654]/90 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            Search
          </button>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <button
            type="button"
            className="flex items-center text-sm text-gray-600 hover:text-gray-900"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="mr-1 h-4 w-4" />
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        {showFilters && (
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <div>
              <label htmlFor="location" className="mb-1 block text-sm font-medium text-gray-700">
                Location
              </label>
              <select
                id="location"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-[#182654] focus:ring-[#182654]"
                value={filters.location}
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
              >
                <option value="">All Locations</option>
                <option value="San Francisco, CA">San Francisco, CA</option>
                <option value="New York, NY">New York, NY</option>
                <option value="Chicago, IL">Chicago, IL</option>
                <option value="Remote">Remote</option>
              </select>
            </div>

            <div>
              <label htmlFor="industry" className="mb-1 block text-sm font-medium text-gray-700">
                Industry
              </label>
              <select
                id="industry"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-[#182654] focus:ring-[#182654]"
                value={filters.industry}
                onChange={(e) => setFilters({ ...filters, industry: e.target.value })}
              >
                <option value="">All Industries</option>
                <option value="Technology">Technology</option>
                <option value="Finance">Finance</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Marketing">Marketing</option>
              </select>
            </div>

            <div>
              <label htmlFor="experience" className="mb-1 block text-sm font-medium text-gray-700">
                Experience Level
              </label>
              <select
                id="experience"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-[#182654] focus:ring-[#182654]"
                value={filters.experience}
                onChange={(e) => setFilters({ ...filters, experience: e.target.value })}
              >
                <option value="">All Experience Levels</option>
                <option value="Entry-Level">Entry-Level</option>
                <option value="Mid-Level">Mid-Level</option>
                <option value="Senior">Senior</option>
                <option value="Executive">Executive</option>
              </select>
            </div>
          </div>
        )}
      </form>

      <div className="mt-6 grid gap-4 text-left md:grid-cols-3">
        <div className="rounded-lg bg-gray-50 p-4 shadow-sm">
          <Briefcase className="mb-2 h-6 w-6 text-[#182654]" />
          <h3 className="font-medium">Search by Job Title</h3>
          <p className="mt-1 text-sm text-gray-500">E.g., "Software Engineer", "Marketing Manager"</p>
        </div>
        <div className="rounded-lg bg-gray-50 p-4 shadow-sm">
          <MapPin className="mb-2 h-6 w-6 text-[#182654]" />
          <h3 className="font-medium">Filter by Location</h3>
          <p className="mt-1 text-sm text-gray-500">Find salaries specific to your city or region</p>
        </div>
        <div className="rounded-lg bg-gray-50 p-4 shadow-sm">
          <Search className="mb-2 h-6 w-6 text-[#182654]" />
          <h3 className="font-medium">Compare Compensation</h3>
          <p className="mt-1 text-sm text-gray-500">View salary ranges, bonuses, and benefits</p>
        </div>
      </div>
    </div>
  )
}
