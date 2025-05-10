"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"
import type { BenchmarkData } from "@/data/benchmark-data"

Chart.register(...registerables)

interface CompensationBreakdownChartProps {
  benchmark: BenchmarkData
}

export default function CompensationBreakdownChart({ benchmark }: CompensationBreakdownChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    // Parse the compensation values
    const baseSalary = Number.parseInt(benchmark.baseSalary.replace(/[^0-9]/g, ""))

    // Parse bonus (assuming format like "10-15%" or "$10,000")
    let bonusValue = 0
    if (benchmark.bonus.includes("%")) {
      const bonusPercent = Number.parseInt(benchmark.bonus.match(/\d+/)?.[0] || "0")
      bonusValue = Math.round((baseSalary * bonusPercent) / 100)
    } else {
      bonusValue = Number.parseInt(benchmark.bonus.replace(/[^0-9]/g, "")) || 0
    }

    // Parse equity (assuming format like "0.1-0.5%" or "$X,XXX")
    let equityValue = 0
    if (benchmark.equity.includes("%")) {
      const equityPercent = Number.parseFloat(benchmark.equity.match(/[\d.]+/)?.[0] || "0")
      // Assuming company valuation for equity calculation
      const assumedCompanyValue = 100000000 // $100M
      equityValue = Math.round((assumedCompanyValue * equityPercent) / 100 / 4) // 4-year vesting
    } else if (benchmark.equity !== "None") {
      equityValue = Number.parseInt(benchmark.equity.replace(/[^0-9]/g, "")) || 0
    }

    // Parse benefits value
    const benefitsValue = Number.parseInt(benchmark.benefitsValue.replace(/[^0-9]/g, ""))

    // Format value numbers
    const formatValue = (value: number) => {
      return `$${value.toLocaleString()}`
    }

    // Calculate percentages for the legend
    const total = baseSalary + bonusValue + equityValue + benefitsValue
    const basePercent = Math.round((baseSalary / total) * 100)
    const bonusPercent = Math.round((bonusValue / total) * 100)
    const equityPercent = Math.round((equityValue / total) * 100)
    const benefitsPercent = Math.round((benefitsValue / total) * 100)

    // Destroy existing chart if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    // Create the chart
    const ctx = chartRef.current.getContext("2d")
    if (ctx) {
      chartInstance.current = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: ["Base Salary", "Bonus", "Equity", "Benefits"],
          datasets: [
            {
              data: [baseSalary, bonusValue, equityValue, benefitsValue],
              backgroundColor: ["#3B82F6", "#10B981", "#8B5CF6", "#F59E0B"],
              borderColor: ["#3B82F6", "#10B981", "#8B5CF6", "#F59E0B"],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            tooltip: {
              callbacks: {
                label: (context) => {
                  const value = context.raw as number
                  const label = context.label || ""
                  const percentage = Math.round((value / total) * 100)
                  return `${label}: ${formatValue(value)} (${percentage}%)`
                },
              },
            },
            legend: {
              position: "right",
              labels: {
                generateLabels: (chart) => {
                  const data = chart.data
                  if (data.labels && data.datasets.length) {
                    return data.labels.map((label, i) => {
                      const meta = chart.getDatasetMeta(0)
                      const style = meta.controller.getStyle(i)

                      let percentage = 0
                      switch (i) {
                        case 0:
                          percentage = basePercent
                          break
                        case 1:
                          percentage = bonusPercent
                          break
                        case 2:
                          percentage = equityPercent
                          break
                        case 3:
                          percentage = benefitsPercent
                          break
                      }

                      return {
                        text: `${label} (${percentage}%)`,
                        fillStyle: style.backgroundColor,
                        strokeStyle: style.borderColor,
                        lineWidth: style.borderWidth,
                        hidden: !chart.getDataVisibility(i),
                        index: i,
                      }
                    })
                  }
                  return []
                },
              },
            },
            title: {
              display: true,
              text: "Total Compensation Breakdown",
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
        Total annual compensation: {benchmark.totalCompensation}
      </div>
      <div className="mt-2 text-center text-sm text-gray-500">
        Note: Equity values are estimates based on typical vesting schedules and company valuations.
      </div>
    </div>
  )
}
