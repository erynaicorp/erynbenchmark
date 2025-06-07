import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // For now, just save the signup info without real Stripe integration
    // You can add Stripe integration later
    const { data, error } = await supabase
      .from("early_access_payments")
      .insert([
        {
          first_name: body.firstName,
          last_name: body.lastName,
          email: body.email,
          company: body.company,
          job_title: body.jobTitle,
          payment_status: "completed", // Simulated for now
        },
      ])
      .select()

    if (error) {
      console.error("Database error:", error)

      // Handle duplicate email error
      if (error.code === "23505") {
        return NextResponse.json({ error: "This email already has early access" }, { status: 400 })
      }

      return NextResponse.json({ error: "Failed to save payment info" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      data,
    })
  } catch (error) {
    console.error("Payment error:", error)
    return NextResponse.json({ error: "Payment processing failed" }, { status: 500 })
  }
}
