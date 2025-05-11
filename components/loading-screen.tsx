import { Logo } from "@/components/logo"

interface LoadingScreenProps {
  message: string
}

export function LoadingScreen({ message }: LoadingScreenProps) {
  return (
    <div className="min-h-screen bg-[#f1f5f9] flex flex-col">
      <header className="border-b bg-white">
        <div className="container flex h-16 items-center">
          <Logo size="small" />
        </div>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center">
        <div className="text-center space-y-6">
          <p className="text-lg text-gray-700">{message}</p>
          <div className="flex space-x-2 justify-center">
            <div className="h-3 w-3 animate-pulse rounded-full bg-[#31E2EF]"></div>
            <div className="h-3 w-3 animate-pulse rounded-full bg-[#31E2EF] opacity-75 delay-150"></div>
            <div className="h-3 w-3 animate-pulse rounded-full bg-[#31E2EF] opacity-50 delay-300"></div>
          </div>
        </div>
      </main>
    </div>
  )
}
