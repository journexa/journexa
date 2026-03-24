'use client'
import { cn } from '@/lib/utils'

export default function ShimmerButton({ children, className, onClick, disabled, type = 'button' }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'relative inline-flex h-14 w-full items-center justify-center overflow-hidden rounded-xl px-6 font-bold text-base transition-all duration-300',
        'bg-gradient-to-r from-orange-500 to-amber-400 text-[hsl(222,47%,7%)]',
        'shadow-[0_0_0_3px_rgba(255,107,53,0)] hover:shadow-[0_0_0_3px_rgba(255,107,53,0.25)]',
        'hover:-translate-y-0.5 active:translate-y-0',
        'disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0',
        'after:absolute after:inset-0 after:z-10',
        'after:bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.3)_50%,transparent_100%)]',
        'after:bg-[length:200%] after:animate-shimmer',
        className
      )}
    >
      <span className="relative z-20 flex items-center gap-2">{children}</span>
    </button>
  )
}
