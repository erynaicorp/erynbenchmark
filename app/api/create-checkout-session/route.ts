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

    // Mock Stripe session creation
    console.log("Mock checkout session for:", body)

    // For demo purposes, redirect directly to success page
    return NextResponse.json({
      sessionId: "mock_session_" + Math.random().toString(36).substr(2, 9),
      redirectUrl: `${request.headers.get("origin")}/early-access/success?session_id=mock_session`,
    })
  } catch (error: any) {
    console.error("Stripe error:", error)
    return NextResponse.json({ error: "Payment processing failed" }, { status: 500 })
  }
}
