import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-12 w-full min-w-0 rounded-md border-0 bg-[#1C1C1C] px-4 py-3 text-sm font-medium text-white transition-colors outline-none placeholder:text-white/50 focus:border-yellow-base focus-visible:ring-2 focus-visible:ring-yellow-base disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-1 aria-invalid:ring-destructive/20",
        className
      )}
      {...props}
    />
  )
}

export { Input }
