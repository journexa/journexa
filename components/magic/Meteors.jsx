'use client'
import { cn } from '@/lib/utils'

export default function Meteors({ number = 12 }) {
  const meteors = Array.from({ length: number })
  return (
    <>
      {meteors.map((_, i) => (
        <span
          key={i}
          className={cn(
            'absolute top-1/2 left-1/2 h-0.5 w-0.5 rotate-[215deg] rounded-full',
            'bg-gradient-to-r from-orange-400/60 to-transparent',
            'shadow-[0_0_6px_1px_rgba(255,107,53,0.4)]',
            'before:absolute before:top-1/2 before:transform before:-translate-y-1/2',
            'before:w-[80px] before:h-[1px] before:bg-gradient-to-r before:from-transparent before:to-orange-400/60',
            'animate-meteor'
          )}
          style={{
            top: Math.random() * 40 + '%',
            left: Math.random() * 100 + '%',
            animationDelay: `${Math.random() * 6}s`,
            animationDuration: `${Math.random() * 4 + 4}s`,
          }}
        />
      ))}
    </>
  )
}
