import * as React from 'react'
import { cn } from '@/lib/utils'

const Textarea = React.forwardRef(({ className, ...props }, ref) => (
  <textarea
    className={cn(
      'flex min-h-[90px] w-full rounded-lg border border-border bg-secondary/50 px-4 py-3 text-sm font-sans text-foreground placeholder:text-muted-foreground',
      'transition-all duration-200 resize-none',
      'focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500/50',
      'disabled:cursor-not-allowed disabled:opacity-50',
      className
    )}
    ref={ref}
    {...props}
  />
))
Textarea.displayName = 'Textarea'

export { Textarea }
