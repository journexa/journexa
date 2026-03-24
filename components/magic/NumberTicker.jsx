'use client'
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

export default function NumberTicker({ value, className }) {
  const [display, setDisplay] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    let start = 0
    const end = parseInt(value)
    const duration = 1200
    const step = Math.ceil(end / (duration / 16))
    const timer = setInterval(() => {
      start += step
      if (start >= end) { setDisplay(end); clearInterval(timer) }
      else setDisplay(start)
    }, 16)
    return () => clearInterval(timer)
  }, [value])

  return (
    <span ref={ref} className={cn('font-mono tabular-nums', className)}>
      {display.toLocaleString()}
    </span>
  )
}
