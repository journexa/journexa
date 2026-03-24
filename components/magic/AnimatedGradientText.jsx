import { cn } from '@/lib/utils'

export default function AnimatedGradientText({ children, className }) {
  return (
    <span
      className={cn(
        'inline-flex animate-gradient bg-gradient-to-r from-orange-400 via-amber-300 to-orange-400 bg-[length:200%_auto] bg-clip-text text-transparent',
        className
      )}
    >
      {children}
    </span>
  )
}
