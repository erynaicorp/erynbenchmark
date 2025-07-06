import Image from "next/image"
import Link from "next/link"

export function DemoSection() {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-2xl border-2 border-gray-200 max-w-3xl mx-auto">
      <h3 className="text-2xl font-semibold text-center mb-6" style={{ color: "#182654" }}>
        eryn
      </h3>
      <div className="bg-white rounded-xl p-6 mb-8 shadow-sm overflow-hidden">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-05-22%20at%209.35.01%E2%80%AFPM-qb7BTrKjYNthc1k7Rmls7UJ9pZWUbN.png"
          alt="Software Engineer compensation data dashboard showing salary comparison in San Francisco"
          width={1200}
          height={800}
          className="w-full h-auto rounded-lg"
          priority
        />
      </div>
      <div className="text-center">
        <Link
          href="/waitlist"
          className="inline-block font-semibold uppercase tracking-wide px-8 py-4 rounded-full text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          style={{ backgroundColor: "#31E2EF", color: "#182654" }}
        >
          Join the Waitlist
        </Link>
      </div>
    </div>
  )
}
