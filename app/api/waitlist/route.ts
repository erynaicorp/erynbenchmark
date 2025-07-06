import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  let body: any
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Body must be valid JSON" }, { status: 400 })
  }

  try {
    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // In a real app, you would save to database here
    console.log("Waitlist signup:", body)

    // Mock successful response
    return NextResponse.json({
      success: true,
      data: {
        id: Math.random().toString(36).substr(2, 9),
        ...body,
        created_at: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
