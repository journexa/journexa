import * as React from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:     'border-transparent bg-primary text-primary-foreground',
        secondary:   'border-transparent bg-secondary text-secondary-foreground',
        outline:     'text-foreground',
        brand:       'border-orange-500/20 bg-orange-500/10 text-orange-400',
        success:     'border-emerald-500/20 bg-emerald-500/10 text-emerald-400',
        info:        'border-sky-500/20 bg-sky-500/10 text-sky-400',
        danger:      'border-red-500/20 bg-red-500/10 text-red-400',
        warning:     'border-amber-500/20 bg-amber-500/10 text-amber-400',
      },
    },
    defaultVariants: { variant: 'default' },
  }
)

function Badge({ className, variant, ...props }) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
