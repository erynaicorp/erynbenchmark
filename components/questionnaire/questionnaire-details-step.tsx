"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

interface QuestionnaireDetailsStepProps {
  formData: any
  onNext: (data: {
    startDate: string
    endDate: string
  }) => void
}

export default function QuestionnaireDetailsStep({ formData, onNext }: QuestionnaireDetailsStepProps) {
  const [startDate, setStartDate] = useState<Date | undefined>(
    formData.startDate ? new Date(formData.startDate) : undefined,
  )
  const [endDate, setEndDate] = useState<Date | undefined>(formData.endDate ? new Date(formData.endDate) : undefined)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext({
      startDate: startDate ? startDate.toISOString() : "",
      endDate: endDate ? endDate.toISOString() : "",
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <p className="text-sm text-muted-foreground mb-4">
        Select the start and end dates for respondents to complete the questionnaire.
      </p>

      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="startDate" className="text-sm font-medium">
            Start Date
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                {startDate ? (
                  format(startDate, "MM/dd/yyyy")
                ) : (
                  <span className="text-muted-foreground">mm/dd/yyyy</span>
                )}
                <CalendarIcon className="ml-auto h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <label htmlFor="endDate" className="text-sm font-medium">
            End Date
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                {endDate ? format(endDate, "MM/dd/yyyy") : <span className="text-muted-foreground">mm/dd/yyyy</span>}
                <CalendarIcon className="ml-auto h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={setEndDate}
                initialFocus
                disabled={(date) => (startDate ? date < startDate : false)}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <Button type="submit" className="w-full">
        Send Questionnaire
      </Button>
    </form>
  )
}
