"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface JobDetailsStepProps {
  formData: any
  onNext: (data: { jobTitle: string }) => void
}

export default function JobDetailsStep({ formData, onNext }: JobDetailsStepProps) {
  const [jobTitle, setJobTitle] = useState(formData.jobTitle || "")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext({ jobTitle })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="jobTitle" className="text-sm font-medium">
          Job Title
        </label>
        <input
          id="jobTitle"
          type="text"
          placeholder="ex. Project Manager"
          className="w-full px-3 py-2 border rounded-md"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          required
        />
        <p className="text-sm text-muted-foreground">
          Provide the job title for which the questionnaire will be created.
        </p>
      </div>
      <Button type="submit" className="w-full">
        Continue
      </Button>
    </form>
  )
}
