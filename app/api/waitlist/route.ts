import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { data, error } = await supabase
      .from("waitlist_signups")
      .insert([
        {
          first_name: body.firstName,
          last_name: body.lastName,
          email: body.email,
          company: body.company,
          job_title: body.jobTitle,
          company_size: body.companySize,
          industry: body.industry,
          phone: body.phone,
        },
      ])
      .select()

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ error: "Failed to save signup" }, { status: 500 })
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
