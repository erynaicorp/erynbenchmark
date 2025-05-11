"use client"

import { useRouter } from "next/navigation"
import { Logo } from "@/components/logo"
import Image from "next/image"

export default function WelcomeDashboard() {
  const router = useRouter()

  const handleCreateNew = () => {
    router.push("/create-questionnaire")
  }

  const handleLogout = () => {
    router.push("/?logout=success")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-white">
        <div className="container flex h-16 items-center justify-between">
          <Logo size="small" />
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">Free questionnaires used: 0/3</span>
            <div
              className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-200 cursor-pointer"
              onClick={handleLogout}
            >
              <Image src="/abstract-profile.png" alt="Profile" fill className="object-cover" />
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1 container py-16 flex flex-col items-center justify-center">
        <div className="text-center max-w-lg">
          <h1 className="text-3xl font-bold mb-4">Welcome to eryn!</h1>
          <p className="text-gray-600 mb-8">
            Create job analysis questionnaires and send them to respondents. You have 3 free questionnaires to get
            started.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="py-3 px-6 bg-[#182654] text-white rounded-md hover:bg-[#121d40] transition-colors"
              onClick={handleCreateNew}
            >
              Create Your First Questionnaire
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
