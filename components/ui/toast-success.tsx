"use client"

import { X, Check } from "lucide-react"

interface ToastSuccessProps {
  message: string
  onClose?: () => void
}

export function ToastSuccess({ message, onClose }: ToastSuccessProps) {
  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 w-full max-w-md z-50">
      <div className="bg-green-50 border border-green-100 rounded-md p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-green-100 p-1">
            <Check className="h-5 w-5 text-green-600" />
          </div>
          <p className="text-sm text-green-800">{message}</p>
        </div>
        <button onClick={onClose} className="text-green-500 hover:text-green-700">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
