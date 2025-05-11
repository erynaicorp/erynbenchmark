"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

// Redirect to welcome dashboard by default
export default function Dashboard() {
  const router = useRouter()

  useEffect(() => {
    router.push("/dashboard/welcome")
  }, [router])

  return null
}
