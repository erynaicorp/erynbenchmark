"use client"

import { useEffect } from "react"

export default function CalculatorRedirect() {
  useEffect(() => {
    // Redirect to the external calculator
    window.location.href = "https://erynbenchmark-git-main-jeremy-erynais-projects.vercel.app/signup"
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#f8fafc" }}>
      <div className="text-center">
        <div
          className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4"
          style={{ borderColor: "#31E2EF" }}
        ></div>
        <p className="text-lg" style={{ color: "#182654" }}>
          Redirecting to calculator...
        </p>
      </div>
    </div>
  )
}
