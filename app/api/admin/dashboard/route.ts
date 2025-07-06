import { type NextRequest, NextResponse } from "next/server"
import { mockWaitlistData, mockPaymentData } from "@/lib/supabase"

/**
 * GET /api/admin/dashboard
 * Returns mock data for the admin dashboard (no database required)
 */
export async function GET(_req: NextRequest) {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    return NextResponse.json({
      waitlist: mockWaitlistData,
      payments: mockPaymentData,
    })
  } catch (err) {
    console.error("Dashboard API error:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
