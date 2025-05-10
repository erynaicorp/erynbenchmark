"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

interface MarketTrendsChartProps {
  role: string
  industry: string
}

export default function MarketTrendsChart({ role, industry }: MarketTrendsChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

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

    const roleData = generateTrendData(baseValue * industryMultiplier)
    const industryData = generateTrendData(baseValue * 0.95 * industryMultiplier, 0.025)
    const marketData = generateTrendData(baseValue * 0.9, 0.02)

    // Generate quarters for the last 3 years
    const quarters = []
    const currentYear = new Date().getFullYear()
    const currentQuarter = Math.floor(new Date().getMonth() / 3) + 1

    for (let i = 0; i < 12; i++) {
      const quarterOffset = (currentQuarter - 1 - i) % 4
      const yearOffset = Math.floor((i + (currentQuarter - 1)) / 4)
      const quarter = quarterOffset < 0 ? 4 + quarterOffset : quarterOffset + 1
      const year = currentYear - yearOffset

      quarters.unshift(`Q${quarter} ${year}`)
    }

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
          labels: quarters,
          datasets: [
            {
              label: role,
              data: roleData,
              borderColor: "#3B82F6",
              backgroundColor: "rgba(59, 130, 246, 0.1)",
              borderWidth: 2,
              fill: false,
              tension: 0.1,
            },
            {
              label: `${industry} Industry Average`,
              data: industryData,
              borderColor: "#8B5CF6",
              backgroundColor: "rgba(139, 92, 246, 0.1)",
              borderWidth: 2,
              fill: false,
              tension: 0.1,
            },
            {
              label: "Overall Market",
              data: marketData,
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
                text: "Quarter",
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
              text: "Salary Trends Over Time",
              font: {
                size: 16,
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
  }, [role, industry])

  return (
    <div>
      <div className="h-80 w-full">
        <canvas ref={chartRef}></canvas>
      </div>
      <div className="mt-4 text-center text-sm text-gray-500">
        Quarterly salary trends for {role} positions compared to industry and market averages.
      </div>
    </div>
  )
}
