import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-base font-sans text-neutral-900 placeholder:text-neutral-500 focus-visible:outline-none focus-visible:border-brand-blue focus-visible:shadow-[0_0_0_3px_rgb(0_71_187/0.18)] disabled:cursor-not-allowed disabled:opacity-50 transition-all",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
