import Link from "next/link"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-900">Welcome to Eryn</h1>
      <p className="mt-2 text-gray-600">Your account has been created successfully!</p>
      <div className="mt-8">
        <Link
          href="/auth"
          className="rounded-md bg-[#182654] px-4 py-2 text-white hover:bg-[#182654]/90 focus:outline-none focus:ring-2 focus:ring-[#182654] focus:ring-offset-2"
        >
          Back to Login
        </Link>
      </div>
    </div>
  )
}
