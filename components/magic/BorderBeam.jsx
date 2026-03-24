import { cn } from '@/lib/utils'

export default function BorderBeam({
  className,
  size = 200,
  duration = 12,
  colorFrom = '#FF6B35',
  colorTo = '#00C896',
}) {
  return (
    <div
      style={{
        '--size': size,
        '--duration': duration,
        '--color-from': colorFrom,
        '--color-to': colorTo,
      }}
      className={cn(
        'pointer-events-none absolute inset-0 rounded-[inherit] [border:calc(var(--size)*0.012px)_solid_transparent]',
        '[background:linear-gradient(var(--card),var(--card))_padding-box,linear-gradient(calc(var(--angle)+45deg),transparent_25%,var(--color-from),var(--color-to),transparent_75%)_border-box]',
        '[--angle:0deg] [animation:_border-beam_calc(var(--duration)*1s)_linear_infinite]',
        '@keyframes_border-beam',
        className
      )}
    />
  )
}
