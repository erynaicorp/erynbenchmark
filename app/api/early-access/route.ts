import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  let body: any
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Body must be valid JSON" }, { status: 400 })
  }

  const { firstName, lastName, email, company, jobTitle } = body

  try {
    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // In a real app, you would save to database here
    console.log("Early access signup:", body)

    // Mock successful response
    return NextResponse.json({
      success: true,
      data: {
        id: Math.random().toString(36).substr(2, 9),
        first_name: firstName,
        last_name: lastName,
        email: email,
        company: company,
        job_title: jobTitle,
        payment_status: "completed",
        created_at: new Date().toISOString(),
      },
    })
  } catch (error: any) {
    console.error("Payment error:", error)
    return NextResponse.json({ error: "Payment processing failed" }, { status: 500 })
  }
}
