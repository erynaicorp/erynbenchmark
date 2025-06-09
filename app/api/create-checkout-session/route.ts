import { type NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import { supabase } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, company, jobTitle } = body

    // First, save the user info to the database with pending status
    const { data: userData, error: userError } = await supabase
      .from("early_access_payments")
      .insert([
        {
          first_name: firstName,
          last_name: lastName,
          email: email,
          company: company,
          job_title: jobTitle,
          payment_status: "pending",
        },
      ])
      .select()
      .single()

    if (userError) {
      console.error("Database error:", userError)

      // Handle duplicate email error
      if (userError.code === "23505") {
        return NextResponse.json({ error: "This email already has early access" }, { status: 400 })
      }

      return NextResponse.json({ error: "Failed to save user info" }, { status: 500 })
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "eryn Premium - Early Access",
              description: "Premium compensation benchmarking with AI-powered job matching",
            },
            unit_amount: 9900, // $99.00 in cents
            recurring: {
              interval: "month",
            },
          },
          quantity: 1,
        },
      ],
      customer_email: email,
      metadata: {
        user_id: userData.id,
        first_name: firstName,
        last_name: lastName,
        company: company,
        job_title: jobTitle,
      },
      success_url: `${request.headers.get("origin")}/early-access/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get("origin")}/early-access?canceled=true`,
      allow_promotion_codes: true,
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (error: any) {
    console.error("Stripe error:", error)
    return NextResponse.json({ error: "Payment processing failed" }, { status: 500 })
  }
}
