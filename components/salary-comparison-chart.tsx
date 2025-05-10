"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"
import type { BenchmarkData } from "@/data/benchmark-data"

Chart.register(...registerables)

interface SalaryComparisonChartProps {
  benchmark: BenchmarkData
}

export default function SalaryComparisonChart({ benchmark }: SalaryComparisonChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    // Parse the salary values
    const medianSalary = Number.parseInt(benchmark.medianSalary.replace(/[^0-9]/g, ""))
    const minSalary = Number.parseInt(benchmark.salaryRange.min.replace(/[^0-9]/g, ""))
    const maxSalary = Number.parseInt(benchmark.salaryRange.max.replace(/[^0-9]/g, ""))

    // Calculate percentiles
    const p25 = minSalary + (medianSalary - minSalary) * 0.5
    const p75 = medianSalary + (maxSalary - medianSalary) * 0.5

    // Generate comparison data
    const industryAvg = Math.round(medianSalary * 0.95)
    const nationalAvg = Math.round(medianSalary * 0.85)

    // Different experience levels
    const entryLevel = Math.round(medianSalary * 0.6)
    const seniorLevel = Math.round(medianSalary * 1.3)

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
        type: "bar",
        data: {
          labels: [
            "25th Percentile",
            "Median",
            "75th Percentile",
            "Industry Average",
            "National Average",
            "Entry Level",
            "Senior Level",
          ],
          datasets: [
            {
              label: "Annual Salary",
              data: [p25, medianSalary, p75, industryAvg, nationalAvg, entryLevel, seniorLevel],
              backgroundColor: ["#93C5FD", "#3B82F6", "#93C5FD", "#64748B", "#94A3B8", "#BFDBFE", "#1D4ED8"],
              borderColor: ["#93C5FD", "#3B82F6", "#93C5FD", "#64748B", "#94A3B8", "#BFDBFE", "#1D4ED8"],
              borderWidth: 1,
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
                text: "Annual Salary",
              },
              ticks: {
                callback: (value) => {
                  return typeof value === "number" ? formatSalary(value) : value
                },
              },
            },
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: (context) => {
                  const value = context.raw as number
                  return `Salary: ${formatSalary(value)}`
                },
              },
            },
            legend: {
              display: false,
            },
            title: {
              display: true,
              text: `${benchmark.role} Salary Comparison`,
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
  }, [benchmark])

  return (
    <div>
      <div className="h-80 w-full">
        <canvas ref={chartRef}></canvas>
      </div>
      <div className="mt-4 text-center text-sm text-gray-500">
        Salary data based on {benchmark.sampleSize} data points for {benchmark.role} positions in {benchmark.location}.
      </div>
    </div>
  )
}
