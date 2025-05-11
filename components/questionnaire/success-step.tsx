"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface SuccessStepProps {
  formData: any
  onNext?: () => void
}

export default function SuccessStep({ formData }: SuccessStepProps) {
  const router = useRouter()

  return (
    <div className="space-y-4 text-center">
      <div className="flex justify-center">
        <div className="rounded-full bg-green-100 p-3">
          <svg
            className="h-6 w-6 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
      </div>
      <h3 className="text-lg font-medium">Questionnaire Sent!</h3>
      <p className="text-sm text-muted-foreground">
        The transcription will be sent to your email once the survey has been completed. Upgrade your account to create
        unlimited questionnaires and access additional features.
      </p>
      <div className="flex flex-col space-y-2">
        <Button onClick={() => router.push("/dashboard")}>Back to Dashboard</Button>
        <Button variant="outline">Upgrade Now</Button>
      </div>
    </div>
  )
}
