import Image from "next/image"
import Link from "next/link"

export function Logo({ size = "large" }: { size?: "small" | "large" }) {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="relative w-8 h-8">
        <Image src="/logo.png" alt="eryn logo" fill className="object-contain" />
      </div>
      <span className={`font-semibold ${size === "large" ? "text-2xl" : "text-xl"}`}>eryn</span>
    </Link>
  )
}
