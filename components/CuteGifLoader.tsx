"use client"

import { PawPrint } from "lucide-react"

export default function PawLoader() {
  return (
    <div className="flex items-center justify-center gap-2 pt-4">
      <PawPrint className="text-orange-400 w-6 h-6 animate-bounce" />
      <PawPrint className="text-orange-400 w-6 h-6 animate-bounce [animation-delay:0.1s]" />
      <PawPrint className="text-orange-400 w-6 h-6 animate-bounce [animation-delay:0.2s]" />
      <span className="ml-2 text-orange-500 font-medium animate-pulse">Sending...</span>
    </div>
  )
}
