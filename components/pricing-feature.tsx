import type React from "react"
import { CheckIcon } from "./check-icon"

interface PricingFeatureProps {
  children: React.ReactNode
}

export function PricingFeature({ children }: PricingFeatureProps) {
  return (
    <li className="flex items-start">
      <CheckIcon />
      <span className="text-gray-600">{children}</span>
    </li>
  )
}
