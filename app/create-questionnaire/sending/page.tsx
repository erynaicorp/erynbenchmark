"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { LoadingScreen } from "@/components/loading-screen"

export default function SendingQuestionnaire() {
  const router = useRouter()

  useEffect(() => {
    // Simulate sending time
    const timer = setTimeout(() => {
      router.push("/dashboard")
    }, 2000)

    return () => clearTimeout(timer)
  }, [router])

  return <LoadingScreen message="Sending questionnaire..." />
}
