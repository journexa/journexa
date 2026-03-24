import * as React from 'react'
import { cn } from '@/lib/utils'

const Select = React.forwardRef(({ className, children, ...props }, ref) => (
  <select
    ref={ref}
    className={cn(
      'flex h-11 w-full rounded-lg border border-border bg-secondary/50 px-4 py-2 text-sm font-sans text-foreground',
      'transition-all duration-200 appearance-none cursor-pointer',
      'focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500/50',
      'disabled:cursor-not-allowed disabled:opacity-50',
      className
    )}
    {...props}
  >
    {children}
  </select>
))
Select.displayName = 'Select'

export { Select }
