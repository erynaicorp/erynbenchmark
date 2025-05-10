"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import DashboardHeader from "@/components/dashboard/header"
import DashboardSidebar from "@/components/dashboard/sidebar"
import JobCard from "@/components/job-card"
import { jobData } from "@/data/job-data"
import { Search, Filter } from "lucide-react"

export default function JobsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    location: "",
    industry: "",
    experience: "",
  })
  const [filteredJobs, setFilteredJobs] = useState(jobData)

  useEffect(() => {
    // Get search query from URL
    const query = searchParams.get("query") || ""
    setSearchQuery(query)

    // Filter jobs based on the query
    filterJobs(query, filters)
  }, [searchParams])

  const filterJobs = (query: string, currentFilters = filters) => {
    const filtered = jobData.filter((job) => {
      // Search query filter
      const matchesQuery =
        !query ||
        job.title.toLowerCase().includes(query.toLowerCase()) ||
        job.company.toLowerCase().includes(query.toLowerCase()) ||
        job.description.toLowerCase().includes(query.toLowerCase())

      // Location filter
      const matchesLocation = !currentFilters.location || job.location === currentFilters.location

      // Industry filter
      const matchesIndustry = !currentFilters.industry || job.industry === currentFilters.industry

      // Experience filter
      const matchesExperience = !currentFilters.experience || job.experienceLevel === currentFilters.experience

      return matchesQuery && matchesLocation && matchesIndustry && matchesExperience
    })

    setFilteredJobs(filtered)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Update URL with search query
    router.push(`/jobs?query=${encodeURIComponent(searchQuery)}`)
    filterJobs(searchQuery)
  }

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters)
    filterJobs(searchQuery, newFilters)
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <DashboardSidebar isOpen={isSidebarOpen} />

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <DashboardHeader onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="mx-auto max-w-7xl">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">Job Salary Information</h1>
              <p className="mt-1 text-gray-600">Browse and compare salary information for various job positions</p>
            </div>

            {/* Search Bar */}
            <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
              <form onSubmit={handleSearch}>
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
                        onChange={(e) => handleFilterChange({ ...filters, location: e.target.value })}
                      >
                        <option value="">All Locations</option>
                        {[...new Set(jobData.map((job) => job.location))].map((location) => (
                          <option key={location} value={location}>
                            {location}
                          </option>
                        ))}
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
                        onChange={(e) => handleFilterChange({ ...filters, industry: e.target.value })}
                      >
                        <option value="">All Industries</option>
                        {[...new Set(jobData.map((job) => job.industry))].map((industry) => (
                          <option key={industry} value={industry}>
                            {industry}
                          </option>
                        ))}
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
                        onChange={(e) => handleFilterChange({ ...filters, experience: e.target.value })}
                      >
                        <option value="">All Experience Levels</option>
                        {[...new Set(jobData.map((job) => job.experienceLevel))].map((level) => (
                          <option key={level} value={level}>
                            {level}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
              </form>
            </div>

            {/* Results */}
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                {filteredJobs.length} {filteredJobs.length === 1 ? "Result" : "Results"} Found
              </h2>
            </div>

            {/* Job Cards */}
            <div className="space-y-4">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <JobCard key={job.id} job={job} onClick={() => router.push(`/jobs/${job.id}`)} />
                ))
              ) : (
                <div className="rounded-lg bg-white p-8 text-center shadow-sm">
                  <h3 className="text-lg font-medium text-gray-900">No results found</h3>
                  <p className="mt-2 text-gray-600">
                    Try adjusting your search or filter criteria to find more results.
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
