"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Logo } from "@/components/logo"
import Image from "next/image"

export default function CreateQuestionnaire() {
  const router = useRouter()
  const [jobTitle, setJobTitle] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [department, setDepartment] = useState("")
  const [step, setStep] = useState(1)

  const handleNext = () => {
    if (step === 1 && jobTitle) {
      setStep(2)
    } else if (step === 2 && name && email && department) {
      router.push("/create-questionnaire/sending")
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-white">
        <div className="container flex h-16 items-center justify-between">
          <Logo size="small" />
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">Free questionnaires used: 1/3</span>
            <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-200">
              <Image src="/abstract-profile.png" alt="Profile" fill className="object-cover" />
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1 container py-12 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Create New Questionnaire</h1>

        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-1">Job Details</h2>
              <p className="text-gray-600 mb-6">Provide the job title for which the questionnaire will be created.</p>
            </div>

            <div className="space-y-2">
              <label htmlFor="jobTitle" className="block font-medium">
                Job Title
              </label>
              <input
                id="jobTitle"
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="ex. Project Manager"
                className="w-full px-3 py-3 border rounded-md focus:border-[#31E2EF] focus:outline-none focus:ring-1 focus:ring-[#31E2EF]"
                required
              />
            </div>

            <div className="pt-4">
              <button
                onClick={handleNext}
                disabled={!jobTitle}
                className="py-3 px-6 bg-[#182654] text-white rounded-md hover:bg-[#121d40] transition-colors disabled:opacity-50"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-1">Respondent Details</h2>
              <p className="text-gray-600 mb-6">
                Identify the individual completing the job analysis questionnaire, including their name, contact
                information, and department.
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="block font-medium">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-3 py-3 border rounded-md focus:border-[#31E2EF] focus:outline-none focus:ring-1 focus:ring-[#31E2EF]"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block font-medium">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full px-3 py-3 border rounded-md focus:border-[#31E2EF] focus:outline-none focus:ring-1 focus:ring-[#31E2EF]"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="department" className="block font-medium">
                  Department
                </label>
                <input
                  id="department"
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  placeholder="ex. IT"
                  className="w-full px-3 py-3 border rounded-md focus:border-[#31E2EF] focus:outline-none focus:ring-1 focus:ring-[#31E2EF]"
                  required
                />
              </div>
            </div>

            <div className="pt-4 flex gap-4">
              <button
                onClick={() => setStep(1)}
                className="py-3 px-6 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                disabled={!name || !email || !department}
                className="py-3 px-6 bg-[#182654] text-white rounded-md hover:bg-[#121d40] transition-colors disabled:opacity-50"
              >
                Send Questionnaire
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
