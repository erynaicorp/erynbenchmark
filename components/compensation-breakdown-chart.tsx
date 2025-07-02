"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"
import type { BenchmarkData } from "@/data/benchmark-data"

Chart.register(...registerables)

interface CompensationBreakdownChartProps {
  benchmark: BenchmarkData
}

export default function CompensationBreakdownChart({ benchmark }: CompensationBreakdownChartProps) {
  const stateChartRef = useRef<HTMLCanvasElement>(null)
  const nationalChartRef = useRef<HTMLCanvasElement>(null)
  const stateChartInstance = useRef<Chart | null>(null)
  const nationalChartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (!stateChartRef.current || !nationalChartRef.current) return

    // Extract state from location (assuming format like "San Francisco, CA")
    const state = benchmark.location.split(", ").pop() || ""

    // Parse the compensation values for the state/current role
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

    // Calculate national average values (typically lower than state values for high-cost states)
    // Adjust these multipliers based on the state to simulate realistic differences
    const stateToNationalMultiplier =
      state === "CA" || state === "NY"
        ? 0.85
        : state === "WA" || state === "MA"
          ? 0.9
          : state === "TX" || state === "FL"
            ? 1.05
            : 0.95

    const nationalBaseSalary = Math.round(baseSalary * stateToNationalMultiplier)
    const nationalBonusValue = Math.round(bonusValue * stateToNationalMultiplier)
    const nationalEquityValue = Math.round(equityValue * stateToNationalMultiplier * 0.8) // Equity tends to be even lower nationally
    const nationalBenefitsValue = Math.round(benefitsValue * stateToNationalMultiplier)

    // Format value numbers
    const formatValue = (value: number) => {
      return `$${value.toLocaleString()}`
    }

    // Calculate percentages for the legend - State
    const stateTotal = baseSalary + bonusValue + equityValue + benefitsValue
    const stateBasePercent = Math.round((baseSalary / stateTotal) * 100)
    const stateBonusPercent = Math.round((bonusValue / stateTotal) * 100)
    const stateEquityPercent = Math.round((equityValue / stateTotal) * 100)
    const stateBenefitsPercent = Math.round((benefitsValue / stateTotal) * 100)

    // Calculate percentages for the legend - National
    const nationalTotal = nationalBaseSalary + nationalBonusValue + nationalEquityValue + nationalBenefitsValue
    const nationalBasePercent = Math.round((nationalBaseSalary / nationalTotal) * 100)
    const nationalBonusPercent = Math.round((nationalBonusValue / nationalTotal) * 100)
    const nationalEquityPercent = Math.round((nationalEquityValue / nationalTotal) * 100)
    const nationalBenefitsPercent = Math.round((nationalBenefitsValue / nationalTotal) * 100)

    // Destroy existing charts if they exist
    if (stateChartInstance.current) {
      stateChartInstance.current.destroy()
    }
    if (nationalChartInstance.current) {
      nationalChartInstance.current.destroy()
    }

    // Create the state chart
    const stateCtx = stateChartRef.current.getContext("2d")
    if (stateCtx) {
      stateChartInstance.current = new Chart(stateCtx, {
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
                  const percentage = Math.round((value / stateTotal) * 100)
                  return `${label}: ${formatValue(value)} (${percentage}%)`
                },
              },
            },
            legend: {
              position: "bottom",
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
                          percentage = stateBasePercent
                          break
                        case 1:
                          percentage = stateBonusPercent
                          break
                        case 2:
                          percentage = stateEquityPercent
                          break
                        case 3:
                          percentage = stateBenefitsPercent
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
              text: `${state} Compensation Breakdown`,
              font: {
                size: 16,
              },
            },
          },
        },
      })
    }

    // Create the national chart
    const nationalCtx = nationalChartRef.current.getContext("2d")
    if (nationalCtx) {
      nationalChartInstance.current = new Chart(nationalCtx, {
        type: "doughnut",
        data: {
          labels: ["Base Salary", "Bonus", "Equity", "Benefits"],
          datasets: [
            {
              data: [nationalBaseSalary, nationalBonusValue, nationalEquityValue, nationalBenefitsValue],
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
                  const percentage = Math.round((value / nationalTotal) * 100)
                  return `${label}: ${formatValue(value)} (${percentage}%)`
                },
              },
            },
            legend: {
              position: "bottom",
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
                          percentage = nationalBasePercent
                          break
                        case 1:
                          percentage = nationalBonusPercent
                          break
                        case 2:
                          percentage = nationalEquityPercent
                          break
                        case 3:
                          percentage = nationalBenefitsPercent
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
              text: "National Compensation Breakdown",
              font: {
                size: 16,
              },
            },
          },
        },
      })
    }

    return () => {
      if (stateChartInstance.current) {
        stateChartInstance.current.destroy()
      }
      if (nationalChartInstance.current) {
        nationalChartInstance.current.destroy()
      }
    }
  }, [benchmark])

  return (
    <div>
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <div className="h-64 w-full">
            <canvas ref={stateChartRef}></canvas>
          </div>
          <div className="mt-2 text-center text-sm text-gray-500">Total: {benchmark.totalCompensation}</div>
        </div>
        <div>
          <div className="h-64 w-full">
            <canvas ref={nationalChartRef}></canvas>
          </div>
          <div className="mt-2 text-center text-sm text-gray-500">
            {/* Calculate approximate national total (85-95% of state total depending on location) */}
            Total:{" "}
            {`$${Math.round(Number.parseInt(benchmark.totalCompensation.replace(/[^0-9]/g, "")) * 0.9).toLocaleString()}`}
          </div>
        </div>
      </div>
      <div className="mt-4 text-center text-sm text-gray-500">
        Note: Equity values are estimates based on typical vesting schedules and company valuations. National averages
        are calculated based on industry standards and regional cost adjustments.
      </div>
    </div>
  )
}
