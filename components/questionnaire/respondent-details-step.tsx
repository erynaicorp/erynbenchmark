"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface RespondentDetailsStepProps {
  formData: any
  onNext: (data: {
    respondentName: string
    respondentEmail: string
    respondentDepartment: string
  }) => void
}

export default function RespondentDetailsStep({ formData, onNext }: RespondentDetailsStepProps) {
  const [name, setName] = useState(formData.respondentName || "")
  const [email, setEmail] = useState(formData.respondentEmail || "")
  const [department, setDepartment] = useState(formData.respondentDepartment || "")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext({
      respondentName: name,
      respondentEmail: email,
      respondentDepartment: department,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium">
          Name
        </label>
        <input
          id="name"
          type="text"
          placeholder="John Doe"
          className="w-full px-3 py-2 border rounded-md"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="name@company.com"
          className="w-full px-3 py-2 border rounded-md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="department" className="text-sm font-medium">
          Department
        </label>
        <input
          id="department"
          type="text"
          placeholder="ex. IT"
          className="w-full px-3 py-2 border rounded-md"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          required
        />
      </div>
      <p className="text-sm text-muted-foreground">
        Identify the individual completing the job analysis questionnaire, including their name, contact information,
        and department.
      </p>
      <Button type="submit" className="w-full">
        Continue
      </Button>
    </form>
  )
}
