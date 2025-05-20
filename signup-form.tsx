"use client"

import type React from "react"

import { useState, useRef } from "react"
import { LoginIllustration } from "@/components/login-illustration"
import { X, Search, BarChart2, Filter, Mic, Upload, Building, DollarSign, Info } from "lucide-react"
import { benchmarkData } from "@/data/benchmark-data"
import BenchmarkCard from "@/components/benchmark-card"

export default function SignupForm() {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1)
  const [showFactors, setShowFactors] = useState(false)

  // Benchmark search state
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState({
    location: "",
    revenue: "",
    industry: "",
    companySize: "",
  })
  const [showFilters, setShowFilters] = useState(true)
  const [searchResults, setSearchResults] = useState<typeof benchmarkData>([])
  const [hasSearched, setHasSearched] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Autocomplete state
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  // Get unique values for filter dropdowns
  const locations = [...new Set(benchmarkData.map((data) => data.location))]
  const experiences = [...new Set(benchmarkData.map((data) => data.experienceLevel))]
  const industries = [...new Set(benchmarkData.map((data) => data.industry))]
  const companySizes = [...new Set(benchmarkData.map((data) => data.companySize))]

  // Revenue ranges for the new filter
  const revenueRanges = [
    "Less than $1M",
    "$1M - $10M",
    "$10M - $50M",
    "$50M - $100M",
    "$100M - $500M",
    "$500M - $1B",
    "$1B - $10B",
    "More than $10B",
  ]

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800))
      setStep(2)
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleNameSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800))
      console.log("Signup complete with:", { email, firstName, lastName })
      setStep(3)
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const resetToEmailStep = () => {
    setStep(1)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    performSearch()
  }

  const generateSuggestions = (input: string) => {
    if (!input || input.length < 1) {
      setAutocompleteSuggestions([])
      setShowSuggestions(false)
      return
    }

    const inputLower = input.toLowerCase()

    // Get unique job roles
    const jobRoles = [...new Set(benchmarkData.map((data) => data.role))]

    // Get unique industries
    const industries = [...new Set(benchmarkData.map((data) => data.industry))]

    // Common HR and compensation terms
    const commonTerms = [
      "Compensation",
      "Benefits",
      "Salary",
      "Equity",
      "Bonus",
      "Total Rewards",
      "Executive",
      "Director",
      "Manager",
      "Specialist",
      "Analyst",
      "Remote",
      "Hybrid",
      "Chief",
      "VP",
      "Vice President",
      "Senior",
      "Junior",
      "Lead",
      "Principal",
      "Head of",
      "C-Suite",
      "HRIS",
      "Talent Acquisition",
      "People Operations",
    ]

    // Popular job titles for quick access
    const popularTitles = [
      "Software Engineer",
      "Product Manager",
      "Data Scientist",
      "Marketing Manager",
      "Financial Analyst",
      "UX Designer",
      "Sales Manager",
      "HR Manager",
      "Operations Manager",
    ]

    // Combine all possible suggestions
    const allPossibleSuggestions = [...jobRoles, ...industries, ...commonTerms, ...popularTitles]

    // Filter suggestions based on input
    const filteredSuggestions = allPossibleSuggestions
      .filter((item) => item.toLowerCase().includes(inputLower))
      .slice(0, 8) // Limit to 8 suggestions

    setAutocompleteSuggestions(filteredSuggestions)
    setShowSuggestions(filteredSuggestions.length > 0)
  }

  const performSearch = () => {
    // Filter benchmark data based on search query and filters
    const results = benchmarkData.filter((data) => {
      const matchesSearch =
        searchQuery === "" ||
        data.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        data.industry.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesLocation = filters.location === "" || data.location === filters.location

      // For demo purposes, we'll map company size to revenue ranges
      // In a real app, you would have actual revenue data
      let matchesRevenue = true
      if (filters.revenue !== "") {
        // This is a simplified mapping for demonstration
        const companyToRevenueMap: Record<string, string> = {
          "Small (10-99 employees)": "Less than $1M",
          "Medium (100-999 employees)": "$10M - $50M",
          "Large (1000+ employees)": "$1B - $10B",
        }

        const mappedRevenue = companyToRevenueMap[data.companySize] || ""
        matchesRevenue = mappedRevenue === filters.revenue
      }

      const matchesIndustry = filters.industry === "" || data.industry === filters.industry

      const matchesCompanySize = filters.companySize === "" || data.companySize === filters.companySize

      return matchesSearch && matchesLocation && matchesRevenue && matchesIndustry && matchesCompanySize
    })

    setSearchResults(results)
    setHasSearched(true)
  }

  const resetFilters = () => {
    setFilters({
      location: "",
      revenue: "",
      industry: "",
      companySize: "",
    })
  }

  const triggerFileUpload = () => {
    fileInputRef.current?.click()
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

  const handleSelectSuggestion = (suggestion: string) => {
    setSearchQuery(suggestion)
    setShowSuggestions(false)
    // Optionally perform search immediately
    setTimeout(() => {
      performSearch()
    }, 100)
  }

  const handleClickOutside = () => {
    setShowSuggestions(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return

    // Arrow down
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setActiveSuggestionIndex((prev) => (prev < autocompleteSuggestions.length - 1 ? prev + 1 : prev))
    }
    // Arrow up
    else if (e.key === "ArrowUp") {
      e.preventDefault()
      setActiveSuggestionIndex((prev) => (prev > 0 ? prev - 1 : 0))
    }
    // Enter
    else if (e.key === "Enter" && activeSuggestionIndex >= 0) {
      e.preventDefault()
      handleSelectSuggestion(autocompleteSuggestions[activeSuggestionIndex])
    }
    // Escape
    else if (e.key === "Escape") {
      setShowSuggestions(false)
    }
  }

  const toggleFactors = () => {
    setShowFactors(!showFactors)
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-white p-4">
      {step < 3 ? (
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Form Section */}
          <div className="flex flex-col items-center justify-center p-6">
            <div className="mb-6 h-16 w-16">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-pej3PEo2vacu5qWbP1jAdYGyEBi7x8.png"
                alt="Company logo"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="mb-8 text-center">
              <h1 className="text-2xl font-bold text-[#020617]">Welcome to eryn</h1>
              <p className="mt-2 text-[#0F172A]">Log in to continue</p>
            </div>

            {step === 1 ? (
              <form onSubmit={handleEmailSubmit} className="w-full max-w-md space-y-6">
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-[#0F172A]">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="name@email.com"
                    className="w-full rounded-md border border-[#E2E8F0] bg-white px-4 py-3 text-base placeholder:text-[#94A3B8] focus:border-[#182654] focus:outline-none focus:ring-1 focus:ring-[#182654]"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading || !email}
                  className="w-full rounded-md bg-[#182654] py-3 text-base font-medium text-white hover:bg-[#182654]/90 focus:outline-none focus:ring-2 focus:ring-[#182654] focus:ring-offset-2 disabled:opacity-70"
                >
                  {isLoading ? "Processing..." : "Continue with Email"}
                </button>
              </form>
            ) : (
              <form onSubmit={handleNameSubmit} className="w-full max-w-md space-y-6">
                <div className="mb-4 flex items-center rounded-md bg-gray-50 px-3 py-2">
                  <div className="mr-2 h-6 w-6 rounded-full bg-[#182654]"></div>
                  <span className="flex-1 text-sm">{email}</span>
                  <button type="button" onClick={resetToEmailStep} className="ml-2 text-gray-500 hover:text-gray-700">
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="block text-sm font-medium text-[#0F172A]">
                      First Name
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      placeholder="John"
                      className="w-full rounded-md border border-[#E2E8F0] bg-white px-4 py-3 text-base placeholder:text-[#94A3B8] focus:border-[#182654] focus:outline-none focus:ring-1 focus:ring-[#182654]"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="lastName" className="block text-sm font-medium text-[#0F172A]">
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      placeholder="Doe"
                      className="w-full rounded-md border border-[#E2E8F0] bg-white px-4 py-3 text-base placeholder:text-[#94A3B8] focus:border-[#182654] focus:outline-none focus:ring-1 focus:ring-[#182654]"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading || !firstName || !lastName}
                  className="w-full rounded-md bg-[#182654] py-3 text-base font-medium text-white hover:bg-[#182654]/90 focus:outline-none focus:ring-2 focus:ring-[#182654] focus:ring-offset-2 disabled:opacity-70"
                >
                  {isLoading ? "Processing..." : "Continue with Email"}
                </button>
              </form>
            )}
          </div>

          {/* Illustration Section */}
          <div className="hidden h-full w-full lg:block">
            <LoginIllustration />
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-10 w-10">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-pej3PEo2vacu5qWbP1jAdYGyEBi7x8.png"
                  alt="Company logo"
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-[#182654]"></div>
              <span className="text-sm font-medium">
                {firstName} {lastName}
              </span>
            </div>
          </div>

          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900">eryn, your AI Comp Analyst</h2>
            <p className="mt-2 text-gray-600">Benchmark total rewards across industries, geographies, revenue, & FTE</p>
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
                  onChange={(e) => {
                    const value = e.target.value
                    setSearchQuery(value)
                    generateSuggestions(value)
                  }}
                  onFocus={() => {
                    if (searchQuery.length >= 1) {
                      generateSuggestions(searchQuery)
                    }
                  }}
                  onBlur={() => {
                    // Delay hiding to allow for clicks on suggestions
                    setTimeout(() => handleClickOutside(), 200)
                  }}
                  aria-label="Search for job roles"
                  aria-autocomplete="list"
                  aria-controls="search-suggestions"
                  aria-expanded={showSuggestions}
                  onKeyDown={handleKeyDown}
                />

                {/* Autocomplete suggestions dropdown */}
                {showSuggestions && autocompleteSuggestions.length > 0 && (
                  <div
                    id="search-suggestions"
                    className="absolute z-10 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg"
                    role="listbox"
                  >
                    <div className="px-3 py-2 text-xs font-medium text-gray-500 border-b border-gray-100">
                      Suggested searches
                    </div>
                    <ul className="max-h-60 overflow-auto py-1 text-base">
                      {autocompleteSuggestions.map((suggestion, index) => (
                        <li
                          key={index}
                          className={`cursor-pointer px-4 py-2 ${index === activeSuggestionIndex ? "bg-gray-100" : "hover:bg-gray-100"}`}
                          onMouseDown={() => handleSelectSuggestion(suggestion)}
                          role="option"
                          aria-selected={searchQuery === suggestion}
                        >
                          <div className="flex items-center">
                            <Search className="mr-2 h-4 w-4 text-gray-400" />
                            <span className="text-gray-700">{suggestion}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <div className="border-t border-gray-100 px-3 py-2">
                      <button
                        type="button"
                        className="text-xs font-medium text-blue-600 hover:text-blue-800"
                        onMouseDown={performSearch}
                      >
                        Search for "{searchQuery}"
                      </button>
                    </div>
                  </div>
                )}

                <div className="absolute right-2.5 bottom-2.5 flex items-center gap-2">
                  {/* Microphone button */}
                  <button
                    type="button"
                    onClick={startListening}
                    className={`rounded-lg p-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-300 ${
                      isListening
                        ? "bg-red-500 text-white animate-pulse"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
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
                    <label htmlFor="revenue" className="mb-1 block text-sm font-medium text-gray-700">
                      Revenue
                    </label>
                    <select
                      id="revenue"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                      value={filters.revenue}
                      onChange={(e) => setFilters({ ...filters, revenue: e.target.value })}
                    >
                      <option value="">All Revenue Ranges</option>
                      {revenueRanges.map((range) => (
                        <option key={range} value={range}>
                          {range}
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
                        <DollarSign className="mb-2 h-6 w-6 text-[#182654]" />
                        <h3 className="font-medium">Compensation Data</h3>
                        <p className="mt-1 text-sm text-gray-500">Access detailed salary and benefits information</p>
                      </div>
                      <div className="rounded-lg bg-white p-4 shadow">
                        <Building className="mb-2 h-6 w-6 text-[#182654]" />
                        <h3 className="font-medium">Industry Comparisons</h3>
                        <p className="mt-1 text-sm text-gray-500">Compare compensation across different industries</p>
                      </div>
                      <div className="rounded-lg bg-white p-4 shadow">
                        <BarChart2 className="mb-2 h-6 w-6 text-[#182654]" />
                        <h3 className="font-medium">Market Analysis</h3>
                        <p className="mt-1 text-sm text-gray-500">View detailed compensation analytics and trends</p>
                      </div>
                    </div>
                  </div>

                  {/* Information button for compensation factors */}
                  <div className="mt-8 flex items-center justify-end">
                    <button
                      type="button"
                      onClick={toggleFactors}
                      className="flex items-center rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
                      aria-expanded={showFactors}
                      aria-controls="compensation-factors"
                      title="Compensation Factors"
                    >
                      <Info className="h-5 w-5" />
                      <span className="sr-only">{showFactors ? "Hide" : "Show"} compensation factors</span>
                    </button>
                  </div>

                  {/* Collapsible compensation factors section */}
                  {showFactors && (
                    <div
                      id="compensation-factors"
                      className="mt-4 grid gap-4 rounded-lg border border-gray-200 bg-gray-50 p-4 md:grid-cols-2"
                    >
                      <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
                        <h3 className="mb-3 text-lg font-semibold text-gray-900">Geographic Location</h3>
                        <p className="text-gray-700">
                          Salaries vary significantly by location due to cost of living differences, local market
                          conditions, and regional talent availability. Major tech hubs like San Francisco and New York
                          typically offer higher compensation than smaller markets.
                        </p>
                      </div>

                      <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
                        <h3 className="mb-3 text-lg font-semibold text-gray-900">Company Revenue</h3>
                        <p className="text-gray-700">
                          Company revenue is often a key indicator of compensation levels. Higher-revenue organizations
                          typically offer more competitive salaries and benefits packages, while smaller companies may
                          compensate with greater equity opportunities or other incentives.
                        </p>
                      </div>

                      <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
                        <h3 className="mb-3 text-lg font-semibold text-gray-900">Industry Variations</h3>
                        <p className="text-gray-700">
                          Compensation varies widely across industries, with technology, finance, and healthcare
                          typically offering higher salaries than retail, education, or non-profit sectors for
                          comparable roles and experience levels.
                        </p>
                      </div>

                      <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
                        <h3 className="mb-3 text-lg font-semibold text-gray-900">Company Size</h3>
                        <p className="text-gray-700">
                          Company size often correlates with compensation levels. Larger organizations typically offer
                          higher base salaries, while startups may offer lower base pay but more equity. Mid-size
                          companies often balance both approaches.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
