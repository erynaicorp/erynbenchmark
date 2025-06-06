import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Create Stripe customer
    const customer = await stripe.customers.create({
      email: body.email,
      name: `${body.firstName} ${body.lastName}`,
      metadata: {
        company: body.company,
        jobTitle: body.jobTitle,
      },
    })

    // Create subscription
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [
        {
          price: process.env.STRIPE_PRICE_ID!, // Your $99/month price ID
        },
      ],
      payment_behavior: "default_incomplete",
      payment_settings: { save_default_payment_method: "on_subscription" },
      expand: ["latest_invoice.payment_intent"],
    })

    // Save to database
    const { data, error } = await supabase
      .from("early_access_payments")
      .insert([
        {
          first_name: body.firstName,
          last_name: body.lastName,
          email: body.email,
          company: body.company,
          job_title: body.jobTitle,
          stripe_customer_id: customer.id,
          stripe_subscription_id: subscription.id,
          payment_status: "pending",
        },
      ])
      .select()

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Failed to save payment info" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      clientSecret: subscription.latest_invoice?.payment_intent?.client_secret,
      subscriptionId: subscription.id,
    })
  } catch (error) {
    console.error("Payment error:", error)
    return NextResponse.json({ error: "Payment processing failed" }, { status: 500 })
  }
}
