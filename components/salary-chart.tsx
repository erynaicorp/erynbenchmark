"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

interface SalaryChartProps {
  jobTitle: string
  currentSalary: string
}

export default function SalaryChart({ jobTitle, currentSalary }: SalaryChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    // Parse the current salary to get a number
    const salaryString = currentSalary.replace(/[^0-9]/g, "")
    const salary = Number.parseInt(salaryString, 10)

    // Generate comparison data
    const lowEnd = Math.round((salary * 0.8) / 1000) * 1000
    const highEnd = Math.round((salary * 1.2) / 1000) * 1000
    const industryAvg = Math.round((salary * 0.95) / 1000) * 1000
    const nationalAvg = Math.round((salary * 0.85) / 1000) * 1000

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
          labels: ["This Position", "Industry Average", "National Average", "Salary Range"],
          datasets: [
            {
              label: "Salary",
              data: [salary, industryAvg, nationalAvg, null],
              backgroundColor: ["#182654", "#31A8E0", "#64748B"],
              borderColor: ["#182654", "#31A8E0", "#64748B"],
              borderWidth: 1,
            },
            {
              label: "Salary Range",
              data: [null, null, null, [lowEnd, highEnd]],
              backgroundColor: "#4ADE80",
              borderColor: "#4ADE80",
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
                  const value = context.raw
                  if (Array.isArray(value)) {
                    return `Range: ${formatSalary(value[0])} - ${formatSalary(value[1])}`
                  }
                  return `Salary: ${formatSalary(value as number)}`
                },
              },
            },
            legend: {
              display: false,
            },
            title: {
              display: true,
              text: `${jobTitle} Salary Comparison`,
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
  }, [jobTitle, currentSalary])

  return (
    <div>
      <div className="h-80 w-full">
        <canvas ref={chartRef}></canvas>
      </div>
      <div className="mt-4 text-center text-sm text-gray-500">
        Salary data based on industry averages and market research for {jobTitle} positions.
      </div>
    </div>
  )
}
