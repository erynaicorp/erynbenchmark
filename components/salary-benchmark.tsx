"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Search, Briefcase, MapPin, Filter, Mic, Upload, X, BarChart2 } from "lucide-react"
import { benchmarkData } from "@/data/benchmark-data"
import BenchmarkCard from "./benchmark-card"
import CompensationFactors from "./compensation-factors"

export default function SalaryBenchmark() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState({
    location: "",
    experience: "",
    industry: "",
    companySize: "",
  })
  const [showFilters, setShowFilters] = useState(false)
  const [searchResults, setSearchResults] = useState<typeof benchmarkData>([])
  const [hasSearched, setHasSearched] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Get unique values for filter dropdowns
  const locations = [...new Set(benchmarkData.map((data) => data.location))]
  const experiences = [...new Set(benchmarkData.map((data) => data.experienceLevel))]
  const industries = [...new Set(benchmarkData.map((data) => data.industry))]
  const companySizes = [...new Set(benchmarkData.map((data) => data.companySize))]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    performSearch()
  }

  const performSearch = () => {
    // Filter benchmark data based on search query and filters
    const results = benchmarkData.filter((data) => {
      const matchesSearch =
        searchQuery === "" ||
        data.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        data.industry.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesLocation = filters.location === "" || data.location === filters.location

      const matchesExperience = filters.experience === "" || data.experienceLevel === filters.experience

      const matchesIndustry = filters.industry === "" || data.industry === filters.industry

      const matchesCompanySize = filters.companySize === "" || data.companySize === filters.companySize

      return matchesSearch && matchesLocation && matchesExperience && matchesIndustry && matchesCompanySize
    })

    setSearchResults(results)
    setHasSearched(true)
  }

  const resetFilters = () => {
    setFilters({
      location: "",
      experience: "",
      industry: "",
      companySize: "",
    })
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadedFile(file)
    setIsProcessing(true)

    // Simulate processing the file
    setTimeout(() => {
      // In a real app, you would parse the job description to extract role information
      const fileName = file.name.toLowerCase()
      let newQuery = ""

      if (fileName.includes("developer") || fileName.includes("engineer")) {
        newQuery = "Software Engineer"
      } else if (fileName.includes("manager")) {
        newQuery = "Product Manager"
      } else if (fileName.includes("marketing")) {
        newQuery = "Marketing"
      } else if (fileName.includes("data")) {
        newQuery = "Data Scientist"
      } else {
        newQuery = "Job Description"
      }

      setSearchQuery(newQuery)
      setIsProcessing(false)
      performSearch()
    }, 1500)
  }

  const triggerFileUpload = () => {
    fileInputRef.current?.click()
  }

  const clearUploadedFile = () => {
    setUploadedFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const startListening = () => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      alert("Speech recognition is not supported in your browser. Try Chrome or Edge.")
      return
    }

    setIsListening(true)

    // Use the SpeechRecognition API
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()

    recognition.lang = "en-US"
    recognition.interimResults = false
    recognition.maxAlternatives = 1

    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript
      setSearchQuery(speechResult)
      setIsListening(false)
      // Automatically search after voice input
      setTimeout(() => performSearch(), 500)
    }

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error)
      setIsListening(false)
    }

    recognition.onend = () => {
      setIsListening(false)
    }

    recognition.start()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">Compensation Benchmarking</h1>
        <p className="mt-2 text-gray-600">
          Compare market salaries across industries, locations, and experience levels
        </p>
      </div>

      <div className="mx-auto max-w-4xl rounded-xl bg-white p-6 shadow-md">
        <form onSubmit={handleSearch}>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 pl-10 pr-32 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Search job titles or roles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute right-2.5 bottom-2.5 flex items-center gap-2">
              {/* Microphone button */}
              <button
                type="button"
                onClick={startListening}
                className={`rounded-lg p-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-300 ${
                  isListening ? "bg-red-500 text-white animate-pulse" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                title="Search by voice"
              >
                <Mic className="h-5 w-5" />
                <span className="sr-only">Search by voice</span>
              </button>

              {/* Upload button */}
              <button
                type="button"
                onClick={triggerFileUpload}
                className="rounded-lg bg-gray-100 p-2 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
                title="Upload job description"
              >
                <Upload className="h-5 w-5" />
                <span className="sr-only">Upload job description</span>
              </button>

              {/* Hidden file input */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept=".pdf,.doc,.docx,.txt"
                className="hidden"
              />

              {/* Search button */}
              <button
                type="submit"
                className="rounded-lg bg-[#182654] px-4 py-2 text-sm font-medium text-white hover:bg-[#182654]/90 focus:outline-none focus:ring-4 focus:ring-blue-300"
              >
                Benchmark
              </button>
            </div>
          </div>

          {/* File upload status */}
          {uploadedFile && (
            <div className="mt-2 flex items-center rounded-md bg-blue-50 px-3 py-2 text-sm text-blue-700">
              <div className="flex-1">
                {isProcessing ? (
                  <div className="flex items-center">
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
                    Processing: {uploadedFile.name}
                  </div>
                ) : (
                  <div>Uploaded: {uploadedFile.name}</div>
                )}
              </div>
              <button type="button" onClick={clearUploadedFile} className="ml-2 text-blue-700 hover:text-blue-900">
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          {/* Voice input status */}
          {isListening && (
            <div className="mt-2 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">Listening... Speak now</div>
          )}

          <div className="mt-4 flex items-center justify-between">
            <button
              type="button"
              className="flex items-center text-sm text-gray-600 hover:text-gray-900"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="mr-1 h-4 w-4" />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </button>

            {showFilters && (
              <button type="button" className="text-sm text-blue-600 hover:text-blue-800" onClick={resetFilters}>
                Reset Filters
              </button>
            )}
          </div>

          {showFilters && (
            <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div>
                <label htmlFor="location" className="mb-1 block text-sm font-medium text-gray-700">
                  Location
                </label>
                <select
                  id="location"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  value={filters.location}
                  onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                >
                  <option value="">All Locations</option>
                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location}
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
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  value={filters.experience}
                  onChange={(e) => setFilters({ ...filters, experience: e.target.value })}
                >
                  <option value="">All Experience Levels</option>
                  {experiences.map((exp) => (
                    <option key={exp} value={exp}>
                      {exp}
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
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  value={filters.industry}
                  onChange={(e) => setFilters({ ...filters, industry: e.target.value })}
                >
                  <option value="">All Industries</option>
                  {industries.map((industry) => (
                    <option key={industry} value={industry}>
                      {industry}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="companySize" className="mb-1 block text-sm font-medium text-gray-700">
                  Company Size
                </label>
                <select
                  id="companySize"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  value={filters.companySize}
                  onChange={(e) => setFilters({ ...filters, companySize: e.target.value })}
                >
                  <option value="">All Company Sizes</option>
                  {companySizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </form>

        {/* Results Section */}
        <div className="mt-8">
          {hasSearched && (
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              {searchResults.length} {searchResults.length === 1 ? "Result" : "Results"} Found
            </h2>
          )}

          {hasSearched && searchResults.length === 0 ? (
            <div className="rounded-lg bg-gray-50 p-8 text-center">
              <p className="text-gray-600">No compensation benchmarks found for your search.</p>
              <p className="mt-2 text-gray-500">Try adjusting your search terms or filters.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {searchResults.map((benchmark) => (
                <BenchmarkCard key={benchmark.id} benchmark={benchmark} />
              ))}
            </div>
          )}

          {!hasSearched && (
            <div>
              <div className="rounded-lg bg-gray-50 p-8 text-center">
                <p className="text-gray-600">Enter a job title or role to find compensation benchmarks.</p>
                <div className="mt-6 grid gap-4 text-left md:grid-cols-3">
                  <div className="rounded-lg bg-white p-4 shadow">
                    <Briefcase className="mb-2 h-6 w-6 text-[#182654]" />
                    <h3 className="font-medium">Search by Role</h3>
                    <p className="mt-1 text-sm text-gray-500">E.g., "Software Engineer", "Marketing Manager"</p>
                  </div>
                  <div className="rounded-lg bg-white p-4 shadow">
                    <MapPin className="mb-2 h-6 w-6 text-[#182654]" />
                    <h3 className="font-medium">Filter by Location</h3>
                    <p className="mt-1 text-sm text-gray-500">Compare salaries across different regions</p>
                  </div>
                  <div className="rounded-lg bg-white p-4 shadow">
                    <BarChart2 className="mb-2 h-6 w-6 text-[#182654]" />
                    <h3 className="font-medium">Analyze Market Data</h3>
                    <p className="mt-1 text-sm text-gray-500">View detailed compensation analytics</p>
                  </div>
                </div>
              </div>

              {/* Compensation Factors Section */}
              <div className="mt-8">
                <h2 className="mb-4 text-xl font-semibold text-gray-800">Key Compensation Factors</h2>
                <CompensationFactors />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
