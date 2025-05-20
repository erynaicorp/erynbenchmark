"use client"

import { useEffect, useRef, useState } from "react"
import { Chart, registerables } from "chart.js"
import { Download } from "lucide-react"

Chart.register(...registerables)

interface MarketTrendsChartProps {
  role: string
  industry: string
  location: string
}

interface TrendData {
  quarters: string[] // Keeping the property name for compatibility
  roleData: number[]
  stateAvgData: number[]
  nationalAvgData: number[]
}

export default function MarketTrendsChart({ role, industry, location }: MarketTrendsChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)
  const [chartData, setChartData] = useState<TrendData | null>(null)
  const [isExporting, setIsExporting] = useState(false)

  useEffect(() => {
    if (!chartRef.current) return

    // Extract state from location (assuming format like "San Francisco, CA")
    const state = location.split(", ").pop() || ""

    // Generate trend data based on role and industry
    // In a real app, this would come from an API
    const baseValue =
      role.includes("Engineer") || role.includes("Developer")
        ? 120000
        : role.includes("Manager")
          ? 140000
          : role.includes("Director")
            ? 180000
            : 90000

    const industryMultiplier =
      industry === "Technology" ? 1.1 : industry === "Finance" ? 1.2 : industry === "Healthcare" ? 1.05 : 1.0

    // State multiplier based on common cost of living differences
    const stateMultiplier =
      state === "CA"
        ? 1.2
        : state === "NY"
          ? 1.15
          : state === "WA"
            ? 1.1
            : state === "TX"
              ? 0.9
              : state === "FL"
                ? 0.85
                : 1.0

    // Generate 3 years of quarterly data with some randomness
    const generateTrendData = (base: number, growth = 0.03) => {
      const data = []
      let current = base

      // 3 years back from now
      for (let i = 0; i < 12; i++) {
        // Add some randomness to the growth
        const randomFactor = 1 + (Math.random() * 0.02 - 0.01)
        current = current * (1 + growth * randomFactor)
        data.push(Math.round(current))
      }

      return data
    }

    // Generate data for each series
    const roleData = generateTrendData(baseValue * industryMultiplier * stateMultiplier)
    const stateAvgData = generateTrendData(baseValue * 0.95 * stateMultiplier, 0.025)
    const industryStateAvgData = generateTrendData(baseValue * 0.9 * industryMultiplier * stateMultiplier, 0.028)
    const nationalAvgData = generateTrendData(baseValue * 0.85, 0.02)

    // Generate months for the last year
    const months = []
    const currentDate = new Date()
    const currentMonth = currentDate.getMonth()
    const currentYear = currentDate.getFullYear()

    for (let i = 11; i >= 0; i--) {
      const monthIndex = (currentMonth - i + 12) % 12
      const yearOffset = currentMonth - i < 0 ? -1 : 0
      const year = currentYear + yearOffset

      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

      months.push(`${monthNames[monthIndex]} ${year}`)
    }

    // Store the data for export
    setChartData({
      quarters: months,
      roleData,
      stateAvgData,
      nationalAvgData,
    })

    // Format salary numbers
    const formatSalary = (value: number) => {
      return `$${value.toLocaleString()}`
    }

    // Destroy existing chart if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    // Create the chart
    const ctx = chartRef.current.getContext("2d")
    if (ctx) {
      chartInstance.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: months,
          datasets: [
            {
              label: `${role} , ${state}`,
              data: roleData,
              borderColor: "#3B82F6",
              backgroundColor: "rgba(59, 130, 246, 0.1)",
              borderWidth: 2,
              fill: false,
              tension: 0.1,
            },
            {
              label: `${role} , National Average`,
              data: nationalAvgData,
              borderColor: "#64748B",
              backgroundColor: "rgba(100, 116, 139, 0.1)",
              borderWidth: 2,
              fill: false,
              tension: 0.1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: false,
              title: {
                display: true,
                text: "Median Salary",
              },
              ticks: {
                callback: (value) => {
                  return typeof value === "number" ? formatSalary(value) : value
                },
              },
            },
            x: {
              title: {
                display: true,
                text: "Month",
              },
            },
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: (context) => {
                  const value = context.raw as number
                  return `${context.dataset.label}: ${formatSalary(value)}`
                },
              },
            },
            title: {
              display: true,
              text: "Monthly Salary Trends (Past Year)",
              font: {
                size: 16,
              },
            },
            legend: {
              position: "top",
              labels: {
                boxWidth: 12,
                padding: 15,
              },
            },
          },
        },
      })
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [role, industry, location])

  const exportToCSV = () => {
    if (!chartData) return

    setIsExporting(true)

    try {
      // Create CSV headers
      const headers = [
        "Quarter",
        `${role} in ${location.split(", ").pop()}`,
        `${location.split(", ").pop()} Average`,
        `National Average`,
      ]

      // Create CSV rows
      const rows = chartData.quarters.map((quarter, index) => [
        quarter,
        chartData.roleData[index],
        chartData.stateAvgData[index],
        chartData.nationalAvgData[index],
      ])

      // Combine headers and rows
      const csvContent = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n")

      // Create a blob and download link
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.setAttribute("href", url)
      link.setAttribute(
        "download",
        `${role.replace(/\s+/g, "-").toLowerCase()}_salary_trends_${new Date().toISOString().split("T")[0]}.csv`,
      )
      link.style.visibility = "hidden"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error("Error exporting CSV:", error)
      alert("There was an error exporting the data. Please try again.")
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div>
      <div className="mb-2 flex justify-end">
        <button
          onClick={exportToCSV}
          disabled={isExporting || !chartData}
          className="flex items-center rounded-md bg-[#182654] px-3 py-1.5 text-sm font-medium text-white hover:bg-[#182654]/90 focus:outline-none focus:ring-2 focus:ring-[#182654] focus:ring-offset-2 disabled:opacity-50"
        >
          <Download className="mr-1.5 h-4 w-4" />
          {isExporting ? "Exporting..." : "Export to CSV"}
        </button>
      </div>
      <div className="h-80 w-full">
        <canvas ref={chartRef}></canvas>
      </div>
      <div className="mt-4 text-center text-sm text-gray-500">
        Monthly salary trends comparing role-specific, state, and national averages over the past year.
      </div>
    </div>
  )
}
