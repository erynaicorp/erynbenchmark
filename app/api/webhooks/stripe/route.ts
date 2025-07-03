import { type NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import { supabase } from "@/lib/supabase"
import { headers } from "next/headers"

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = headers().get("stripe-signature")

  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 })
  }

  let event: any

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (error: any) {
    console.error("Webhook signature verification failed:", error.message)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object

        // Update the payment status in the database
        const { error: updateError } = await supabase
          .from("early_access_payments")
          .update({
            stripe_customer_id: session.customer,
            stripe_subscription_id: session.subscription,
            payment_status: "completed",
          })
          .eq("id", session.metadata.user_id)

        if (updateError) {
          console.error("Failed to update payment status:", updateError)
        }
        break

      case "customer.subscription.deleted":
        const subscription = event.data.object

        // Update the payment status when subscription is canceled
        const { error: cancelError } = await supabase
          .from("early_access_payments")
          .update({
            payment_status: "canceled",
          })
          .eq("stripe_subscription_id", subscription.id)

        if (cancelError) {
          console.error("Failed to update cancellation status:", cancelError)
        }
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error: any) {
    console.error("Webhook handler error:", error)
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 })
  }
}
