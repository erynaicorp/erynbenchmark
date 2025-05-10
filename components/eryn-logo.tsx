import Image from "next/image"

export function ErynLogo({ className = "h-16 w-auto" }: { className?: string }) {
  return (
    <div className="relative">
      <Image
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-FNqZaBmsvQivyiPfCeOKaxOANsN8QB.png"
        alt="Eryn Logo"
        width={80}
        height={80}
        className={className}
      />
    </div>
  )
}
