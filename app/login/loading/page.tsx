"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { LoadingScreen } from "@/components/loading-screen"

export default function LoginLoading() {
  const router = useRouter()

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      // Direct to welcome dashboard instead of success page
      router.push("/dashboard/welcome")
    }, 2000)

    return () => clearTimeout(timer)
  }, [router])

  return <LoadingScreen message="Logging you in..." />
}
