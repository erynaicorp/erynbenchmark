"use client"

import { useState, useEffect } from "react"
import {
  Calculator,
  TrendingUp,
  Info,
  Download,
  Share2,
  BookOpen,
  DollarSign,
  Calendar,
  Percent,
  Search,
  Briefcase,
} from "lucide-react"

interface JobData {
  title: string
  medianSalary: number
  agingFactor: number
  category: string
  description: string
}

interface CalculationResult {
  agedSalary: number
  totalIncrease: number
  percentageIncrease: number
  yearlyBreakdown: Array<{
    year: number
    salary: number
    increase: number
    cumulativeIncrease: number
  }>
}

// Job database with aging factors
const jobDatabase: JobData[] = [
  // High-growth tech roles
  {
    title: "AI/ML Engineer",
    medianSalary: 165000,
    agingFactor: 8.5,
    category: "Technology",
    description: "High demand, specialized skills",
  },
  {
    title: "Data Scientist",
    medianSalary: 130000,
    agingFactor: 6.2,
    category: "Technology",
    description: "Growing field with AI integration",
  },
  {
    title: "Cybersecurity Specialist",
    medianSalary: 115000,
    agingFactor: 7.1,
    category: "Technology",
    description: "Critical security needs",
  },
  {
    title: "Cloud Architect",
    medianSalary: 155000,
    agingFactor: 6.8,
    category: "Technology",
    description: "Cloud migration demand",
  },

  // Skilled trades (positive aging due to labor shortages)
  {
    title: "Electrician",
    medianSalary: 65000,
    agingFactor: 4.2,
    category: "Skilled Trades",
    description: "Labor shortage, automation-resistant",
  },
  {
    title: "Plumber",
    medianSalary: 62000,
    agingFactor: 4.5,
    category: "Skilled Trades",
    description: "Essential services, high demand",
  },
  {
    title: "HVAC Technician",
    medianSalary: 58000,
    agingFactor: 4.8,
    category: "Skilled Trades",
    description: "Growing with climate needs",
  },
  {
    title: "General Contractor",
    medianSalary: 75000,
    agingFactor: 3.9,
    category: "Skilled Trades",
    description: "Construction boom, skilled labor shortage",
  },
  {
    title: "Welder",
    medianSalary: 55000,
    agingFactor: 3.2,
    category: "Skilled Trades",
    description: "Manufacturing resurgence",
  },

  // Healthcare (generally positive)
  {
    title: "Registered Nurse",
    medianSalary: 78000,
    agingFactor: 5.1,
    category: "Healthcare",
    description: "Aging population, nurse shortage",
  },
  {
    title: "Physical Therapist",
    medianSalary: 92000,
    agingFactor: 4.7,
    category: "Healthcare",
    description: "Aging demographics",
  },
  {
    title: "Mental Health Counselor",
    medianSalary: 68000,
    agingFactor: 5.8,
    category: "Healthcare",
    description: "Growing mental health awareness",
  },

  // Traditional white-collar (negative or low aging due to AI/automation)
  {
    title: "Software Developer",
    medianSalary: 105000,
    agingFactor: -1.2,
    category: "Technology",
    description: "AI code generation impact",
  },
  {
    title: "Accountant",
    medianSalary: 65000,
    agingFactor: -2.1,
    category: "Finance",
    description: "Automation of routine tasks",
  },
  {
    title: "Financial Analyst",
    medianSalary: 85000,
    agingFactor: -1.8,
    category: "Finance",
    description: "AI-driven analysis tools",
  },
  { title: "Paralegal", medianSalary: 52000, agingFactor: -2.5, category: "Legal", description: "Document automation" },
  {
    title: "Junior Consultant",
    medianSalary: 78000,
    agingFactor: -1.9,
    category: "Consulting",
    description: "AI research and analysis",
  },
  {
    title: "Content Writer",
    medianSalary: 48000,
    agingFactor: -3.2,
    category: "Marketing",
    description: "AI content generation",
  },
  {
    title: "Graphic Designer",
    medianSalary: 52000,
    agingFactor: -2.8,
    category: "Creative",
    description: "AI design tools",
  },
  {
    title: "Data Entry Clerk",
    medianSalary: 35000,
    agingFactor: -4.5,
    category: "Administrative",
    description: "High automation risk",
  },
  {
    title: "Customer Service Representative",
    medianSalary: 38000,
    agingFactor: -3.8,
    category: "Service",
    description: "Chatbot replacement",
  },

  // Stable/moderate growth roles
  {
    title: "Project Manager",
    medianSalary: 95000,
    agingFactor: 2.1,
    category: "Management",
    description: "Human coordination still needed",
  },
  {
    title: "Sales Manager",
    medianSalary: 88000,
    agingFactor: 1.8,
    category: "Sales",
    description: "Relationship-based selling",
  },
  {
    title: "Teacher",
    medianSalary: 52000,
    agingFactor: 2.8,
    category: "Education",
    description: "Human interaction essential",
  },
  {
    title: "Social Worker",
    medianSalary: 58000,
    agingFactor: 3.1,
    category: "Social Services",
    description: "Human empathy required",
  },
]

export default function SalaryAgingCalculatorPage() {
  const [jobTitle, setJobTitle] = useState<string>("")
  const [filteredJobs, setFilteredJobs] = useState<JobData[]>([])
  const [showJobSuggestions, setShowJobSuggestions] = useState(false)
  const [selectedJob, setSelectedJob] = useState<JobData | null>(null)

  const [currentSalary, setCurrentSalary] = useState<string>("75000")
  const [targetDate, setTargetDate] = useState<string>("2024-01-01")
  const [agingRate, setAgingRate] = useState<string>("3.5")
  const [result, setResult] = useState<CalculationResult | null>(null)
  const [showFormula, setShowFormula] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Set default target date to current date
  useEffect(() => {
    const today = new Date()
    const formattedDate = today.toISOString().split("T")[0]
    setTargetDate(formattedDate)
  }, [])

  // Filter jobs based on search input
  useEffect(() => {
    if (jobTitle.length > 1) {
      const filtered = jobDatabase
        .filter(
          (job) =>
            job.title.toLowerCase().includes(jobTitle.toLowerCase()) ||
            job.category.toLowerCase().includes(jobTitle.toLowerCase()),
        )
        .slice(0, 8) // Limit to 8 suggestions
      setFilteredJobs(filtered)
      setShowJobSuggestions(true)
    } else {
      setFilteredJobs([])
      setShowJobSuggestions(false)
    }
  }, [jobTitle])

  const handleJobSelect = (job: JobData) => {
    setJobTitle(job.title)
    setSelectedJob(job)
    setCurrentSalary(job.medianSalary.toString())
    setAgingRate(job.agingFactor.toString())
    setShowJobSuggestions(false)
  }

  const validateInputs = () => {
    const newErrors: Record<string, string> = {}

    const salary = Number.parseFloat(currentSalary)
    if (isNaN(salary) || salary <= 0) {
      newErrors.currentSalary = "Please enter a valid salary amount"
    }

    const rate = Number.parseFloat(agingRate)
    if (isNaN(rate) || rate < -10 || rate > 20) {
      newErrors.agingRate = "Please enter a rate between -10% and 20%"
    }

    if (!targetDate) {
      newErrors.targetDate = "Please select a target date"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const calculateSalaryAging = () => {
    if (!validateInputs()) return

    const salary = Number.parseFloat(currentSalary)
    const rate = Number.parseFloat(agingRate) / 100
    const target = new Date(targetDate)
    const today = new Date()

    // Calculate years difference (can be fractional)
    const yearsDifference = (target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24 * 365.25)

    // Apply compound interest formula: FV = PV * (1 + r)^n
    const agedSalary = salary * Math.pow(1 + rate, yearsDifference)
    const totalIncrease = agedSalary - salary
    const percentageIncrease = (totalIncrease / salary) * 100

    // Generate yearly breakdown
    const yearlyBreakdown = []
    const startYear = today.getFullYear()
    const endYear = target.getFullYear()

    for (let year = startYear; year <= endYear; year++) {
      const yearsFromStart = year - startYear
      const yearSalary = salary * Math.pow(1 + rate, yearsFromStart)
      const yearIncrease = yearSalary - salary

      yearlyBreakdown.push({
        year,
        salary: yearSalary,
        increase: yearIncrease,
        cumulativeIncrease: (yearIncrease / salary) * 100,
      })
    }

    setResult({
      agedSalary,
      totalIncrease,
      percentageIncrease,
      yearlyBreakdown,
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatPercentage = (percentage: number) => {
    return `${percentage.toFixed(2)}%`
  }

  const exportResults = () => {
    if (!result) return

    const csvContent = [
      ["Salary Aging Calculator Results"],
      [""],
      ["Input Parameters:"],
      [`Job Title,${jobTitle || "Custom"}`],
      [`Current Salary,${formatCurrency(Number.parseFloat(currentSalary))}`],
      [`Target Date,${targetDate}`],
      [`Annual Aging Rate,${agingRate}%`],
      [""],
      ["Results:"],
      [`Aged Salary,${formatCurrency(result.agedSalary)}`],
      [`Total Increase,${formatCurrency(result.totalIncrease)}`],
      [`Percentage Increase,${formatPercentage(result.percentageIncrease)}`],
      [""],
      ["Yearly Breakdown:"],
      ["Year,Salary,Cumulative Increase"],
      ...result.yearlyBreakdown.map((year) => [
        year.year.toString(),
        formatCurrency(year.salary),
        formatPercentage(year.cumulativeIncrease),
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `salary-aging-calculation-${new Date().toISOString().split("T")[0]}.csv`
    link.click()
    URL.revokeObjectURL(url)
  }

  const shareResults = async () => {
    if (!result) return

    const shareText = `Salary Aging Calculator Results:
Job: ${jobTitle || "Custom"}
Current Salary: ${formatCurrency(Number.parseFloat(currentSalary))}
Aged Salary (${targetDate}): ${formatCurrency(result.agedSalary)}
Total Change: ${formatCurrency(result.totalIncrease)} (${formatPercentage(result.percentageIncrease)})

Calculate your own at: https://erynai.com/calculator`

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Salary Aging Calculator Results",
          text: shareText,
        })
      } catch (error) {
        console.log("Error sharing:", error)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(shareText)
      alert("Results copied to clipboard!")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div>
                <h1 className="text-xl font-bold text-gray-900">Salary Aging Calculator</h1>
                <p className="text-sm text-gray-600">Professional compensation analysis tool</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">Free Tool</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-6xl">
          {/* Introduction */}
          <div className="mb-8 rounded-lg bg-white p-6 shadow-sm">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <Calculator className="h-8 w-8 text-[#182654]" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">What is Salary Aging?</h2>
                <p className="mt-2 text-gray-700">
                  Salary aging refers to how the market value of a job changes over time based on evolving supply and
                  demand. It isn't inherently positive or negative—some roles "age well," gaining value, while others
                  decline as market forces shift. Jobs with scarce, in-demand skills may see their compensation rise
                  over time. In contrast, roles with an oversupply of talent or declining relevance often see wages
                  stagnate or fall.
                </p>
                <div className="mt-4 grid gap-4 md:grid-cols-3">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    <span className="text-sm text-gray-600">Market-Driven Value Analysis</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-5 w-5 text-blue-600" />
                    <span className="text-sm text-gray-600">Supply & Demand Impact</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-purple-600" />
                    <span className="text-sm text-gray-600">Future Relevance Projection</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Job Search Section */}
          <div className="mb-8 rounded-lg bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-gray-900 flex items-center">
              <Briefcase className="h-5 w-5 mr-2 text-[#182654]" />
              Quick Start: Search by Job Title
            </h3>
            <p className="mb-4 text-sm text-gray-600">
              Search for your job title to automatically populate salary and aging factor data, or enter custom values
              below.
            </p>

            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search job titles (e.g., Software Developer, Electrician, Nurse)..."
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                onFocus={() => jobTitle.length > 1 && setShowJobSuggestions(true)}
                className="block w-full rounded-md border border-gray-300 pl-10 pr-3 py-3 focus:outline-none focus:ring-2 focus:ring-[#182654] focus:border-[#182654]"
              />

              {/* Job Suggestions Dropdown */}
              {showJobSuggestions && filteredJobs.length > 0 && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                  {filteredJobs.map((job, index) => (
                    <button
                      key={index}
                      onClick={() => handleJobSelect(job)}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none border-b border-gray-100 last:border-b-0"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium text-gray-900">{job.title}</div>
                          <div className="text-sm text-gray-600">{job.category}</div>
                          <div className="text-xs text-gray-500 mt-1">{job.description}</div>
                        </div>
                        <div className="text-right ml-4">
                          <div className="text-sm font-medium text-gray-900">{formatCurrency(job.medianSalary)}</div>
                          <div
                            className={`text-xs font-medium ${job.agingFactor >= 0 ? "text-green-600" : "text-red-600"}`}
                          >
                            {job.agingFactor >= 0 ? "+" : ""}
                            {job.agingFactor}% aging
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Selected Job Info */}
            {selectedJob && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium text-blue-900">{selectedJob.title}</h4>
                    <p className="text-sm text-blue-700 mt-1">{selectedJob.description}</p>
                    <div className="flex items-center space-x-4 mt-2 text-sm">
                      <span className="text-blue-600">Category: {selectedJob.category}</span>
                      <span className="text-blue-600">Median Salary: {formatCurrency(selectedJob.medianSalary)}</span>
                      <span
                        className={`font-medium ${selectedJob.agingFactor >= 0 ? "text-green-700" : "text-red-700"}`}
                      >
                        Aging Factor: {selectedJob.agingFactor >= 0 ? "+" : ""}
                        {selectedJob.agingFactor}%
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedJob(null)
                      setJobTitle("")
                    }}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    Clear
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Calculator Input */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h3 className="mb-6 text-lg font-semibold text-gray-900">Calculate Salary Aging</h3>

              <div className="space-y-6">
                <div>
                  <label htmlFor="currentSalary" className="block text-sm font-medium text-gray-700 mb-2">
                    Current Annual Salary
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <DollarSign className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      id="currentSalary"
                      value={currentSalary}
                      onChange={(e) => setCurrentSalary(e.target.value)}
                      className={`block w-full rounded-md border pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#182654] focus:border-[#182654] ${
                        errors.currentSalary ? "border-red-300" : "border-gray-300"
                      }`}
                      placeholder="75000"
                    />
                  </div>
                  {errors.currentSalary && <p className="mt-1 text-sm text-red-600">{errors.currentSalary}</p>}
                </div>

                <div>
                  <label htmlFor="targetDate" className="block text-sm font-medium text-gray-700 mb-2">
                    Target Date
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <Calendar className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="date"
                      id="targetDate"
                      value={targetDate}
                      onChange={(e) => setTargetDate(e.target.value)}
                      className={`block w-full rounded-md border pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#182654] focus:border-[#182654] ${
                        errors.targetDate ? "border-red-300" : "border-gray-300"
                      }`}
                    />
                  </div>
                  {errors.targetDate && <p className="mt-1 text-sm text-red-600">{errors.targetDate}</p>}
                </div>

                <div>
                  <label htmlFor="agingRate" className="block text-sm font-medium text-gray-700 mb-2">
                    Annual Aging Rate
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <Percent className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      id="agingRate"
                      value={agingRate}
                      onChange={(e) => setAgingRate(e.target.value)}
                      step="0.1"
                      min="-10"
                      max="20"
                      className={`block w-full rounded-md border pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#182654] focus:border-[#182654] ${
                        errors.agingRate ? "border-red-300" : "border-gray-300"
                      }`}
                      placeholder="3.5"
                    />
                  </div>
                  {errors.agingRate && <p className="mt-1 text-sm text-red-600">{errors.agingRate}</p>}
                  <p className="mt-1 text-sm text-gray-500">
                    Range: -10% to +20% (negative values indicate declining job value)
                  </p>
                </div>

                <button
                  onClick={calculateSalaryAging}
                  className="w-full rounded-md bg-[#182654] px-4 py-3 text-white font-medium hover:bg-[#182654]/90 focus:outline-none focus:ring-2 focus:ring-[#182654] focus:ring-offset-2 transition-colors"
                >
                  Calculate Aged Salary
                </button>
              </div>
            </div>

            {/* Results */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Results</h3>
                {result && (
                  <div className="flex space-x-2">
                    <button
                      onClick={shareResults}
                      className="rounded-md bg-gray-100 p-2 text-gray-600 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
                      title="Share Results"
                    >
                      <Share2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={exportResults}
                      className="rounded-md bg-gray-100 p-2 text-gray-600 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
                      title="Export to CSV"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>

              {result ? (
                <div className="space-y-6">
                  {/* Key Results */}
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className={`rounded-lg p-4 ${result.totalIncrease >= 0 ? "bg-green-50" : "bg-red-50"}`}>
                      <div className="flex items-center">
                        <TrendingUp
                          className={`h-5 w-5 mr-2 ${result.totalIncrease >= 0 ? "text-green-600" : "text-red-600"}`}
                        />
                        <span
                          className={`text-sm font-medium ${result.totalIncrease >= 0 ? "text-green-800" : "text-red-800"}`}
                        >
                          Aged Salary
                        </span>
                      </div>
                      <p
                        className={`mt-1 text-2xl font-bold ${result.totalIncrease >= 0 ? "text-green-900" : "text-red-900"}`}
                      >
                        {formatCurrency(result.agedSalary)}
                      </p>
                    </div>
                    <div className={`rounded-lg p-4 ${result.totalIncrease >= 0 ? "bg-blue-50" : "bg-orange-50"}`}>
                      <div className="flex items-center">
                        <DollarSign
                          className={`h-5 w-5 mr-2 ${result.totalIncrease >= 0 ? "text-blue-600" : "text-orange-600"}`}
                        />
                        <span
                          className={`text-sm font-medium ${result.totalIncrease >= 0 ? "text-blue-800" : "text-orange-800"}`}
                        >
                          Total Change
                        </span>
                      </div>
                      <p
                        className={`mt-1 text-2xl font-bold ${result.totalIncrease >= 0 ? "text-blue-900" : "text-orange-900"}`}
                      >
                        {result.totalIncrease >= 0 ? "+" : ""}
                        {formatCurrency(result.totalIncrease)}
                      </p>
                      <p className={`text-sm ${result.totalIncrease >= 0 ? "text-blue-700" : "text-orange-700"}`}>
                        ({result.percentageIncrease >= 0 ? "+" : ""}
                        {formatPercentage(result.percentageIncrease)} change)
                      </p>
                    </div>
                  </div>

                  {/* Yearly Breakdown */}
                  <div>
                    <h4 className="text-md font-semibold text-gray-900 mb-3">Yearly Projection</h4>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Year
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Salary
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Cumulative Change
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {result.yearlyBreakdown.map((year, index) => (
                            <tr key={year.year} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                              <td className="px-4 py-2 text-sm font-medium text-gray-900">{year.year}</td>
                              <td className="px-4 py-2 text-sm text-gray-900">{formatCurrency(year.salary)}</td>
                              <td
                                className={`px-4 py-2 text-sm font-medium ${year.cumulativeIncrease >= 0 ? "text-green-600" : "text-red-600"}`}
                              >
                                {year.cumulativeIncrease >= 0 ? "+" : ""}
                                {formatPercentage(year.cumulativeIncrease)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Calculator className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-4 text-gray-500">Enter your salary details and click calculate to see results</p>
                </div>
              )}
            </div>
          </div>

          {/* Formula Explanation */}
          <div className="mt-8 rounded-lg bg-white p-6 shadow-sm">
            <button
              onClick={() => setShowFormula(!showFormula)}
              className="flex items-center space-x-2 text-lg font-semibold text-gray-900 hover:text-[#182654] transition-colors"
            >
              <BookOpen className="h-5 w-5" />
              <span>Understanding the Formula</span>
              <Info className="h-4 w-4" />
            </button>

            {showFormula && (
              <div className="mt-4 space-y-4">
                <div className="rounded-lg bg-gray-50 p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Excel Formula:</h4>
                  <code className="block bg-white p-3 rounded border text-sm font-mono">
                    =Current_Salary * (1 + Annual_Rate)^Years_Difference
                  </code>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">How it Works:</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• Uses compound interest formula</li>
                      <li>• Accounts for year-over-year growth</li>
                      <li>• Calculates fractional years precisely</li>
                      <li>• Projects future salary value</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Common Use Cases:</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• Salary negotiation planning</li>
                      <li>• Budget forecasting</li>
                      <li>• Compensation benchmarking</li>
                      <li>• Career progression analysis</li>
                    </ul>
                  </div>
                </div>

                <div className="rounded-lg bg-blue-50 p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">Pro Tip:</h4>
                  <p className="text-sm text-blue-800">
                    Industry standard aging rates typically range from 2.5% to 5.0% annually, combining inflation
                    adjustments (2-3%) with merit increases (0.5-2%). However, some roles may have negative aging
                    factors due to automation and AI displacement.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Market Context Section */}
          <div className="mt-8 rounded-lg bg-white p-6 shadow-sm">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <TrendingUp className="h-8 w-8 text-[#182654]" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Market Context & Trends</h2>
                <p className="mt-2 text-gray-700">
                  This dynamic is especially impacting traditionally high-paying, entry-level white-collar positions
                  such as consultants, software developers, accountants, and lawyers. As AI and automation become more
                  capable, routine and standardized tasks in these fields are increasingly at risk of being
                  commoditized, reducing demand and long-term compensation potential.
                </p>
                <p className="mt-2 text-gray-700">
                  At the same time, we're seeing increased value in roles that AI, robotics, and automation cannot
                  easily perform—especially skilled trades that require physical dexterity, situational judgment, and
                  on-site problem-solving. Jobs like plumbers, HVAC technicians, electricians, and general contractors
                  are experiencing a resurgence in demand, driven by both labor shortages and their resistance to
                  automation.
                </p>
                <p className="mt-2 text-gray-700">
                  Use this calculator to estimate how compensation for a given job may shift over time based on these
                  macroeconomic and technological trends.
                </p>
              </div>
            </div>
          </div>

          {/* eryn Branding */}
          <div className="mt-8 rounded-lg bg-gradient-to-r from-[#182654] to-[#31A8E0] p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div>
                  <h3 className="text-lg font-semibold">Need More Advanced Compensation Analysis?</h3>
                  <p className="text-blue-100">
                    eryn's AI-powered platform provides comprehensive compensation intelligence, market benchmarking,
                    and strategic insights for HR professionals.
                  </p>
                </div>
              </div>
              <div className="flex-shrink-0">
                <button className="rounded-md bg-white px-4 py-2 text-[#182654] font-medium hover:bg-gray-100 transition-colors">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
