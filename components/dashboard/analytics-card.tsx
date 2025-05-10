import type { ReactNode } from "react"

interface AnalyticsCardProps {
  title: string
  value: string
  change: string
  isPositive: boolean
  icon: ReactNode
  description: string
}

export default function AnalyticsCard({ title, value, change, isPositive, icon, description }: AnalyticsCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-center">
        <div className="rounded-md bg-gray-50 p-3">{icon}</div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <div className="flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">{value}</p>
            <p
              className={`ml-2 flex items-baseline text-sm font-semibold ${
                isPositive ? "text-green-600" : "text-red-600"
              }`}
            >
              {change}
            </p>
          </div>
          <p className="mt-1 text-xs text-gray-500">{description}</p>
        </div>
      </div>
    </div>
  )
}
