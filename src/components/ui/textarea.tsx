import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-[140px] w-full rounded-md border-0 bg-[#1C1C1C] px-4 py-3 text-sm font-medium text-white transition-colors outline-none placeholder:text-white/50 focus:border-yellow-base focus-visible:ring-2 focus-visible:ring-yellow-base disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-1 aria-invalid:ring-destructive/20",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
