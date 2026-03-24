import * as React from 'react'
import { cn } from '@/lib/utils'

const Input = React.forwardRef(({ className, type, ...props }, ref) => (
  <input
    type={type}
    className={cn(
      'flex h-11 w-full rounded-lg border border-border bg-secondary/50 px-4 py-2 text-sm font-sans text-foreground placeholder:text-muted-foreground',
      'transition-all duration-200',
      'focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500/50',
      'disabled:cursor-not-allowed disabled:opacity-50',
      className
    )}
    ref={ref}
    {...props}
  />
))
Input.displayName = 'Input'

export { Input }
