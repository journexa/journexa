'use client'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function Header({ language, setLanguage, onEmergency }) {
  const isHindi = language === 'hi'

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className={cn(
            'flex h-9 w-9 items-center justify-center rounded-xl text-lg font-bold',
            'bg-gradient-to-br from-orange-500 to-amber-400 text-[hsl(222,47%,7%)]',
            'shadow-lg shadow-orange-500/25'
          )}>
            ✚
          </div>
          <span className="font-display text-xl font-bold tracking-tight">
            Journexa
          </span>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Language toggle */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setLanguage(isHindi ? 'en' : 'hi')}
            className="text-xs font-semibold"
          >
            {isHindi ? 'EN' : 'हिं'}
          </Button>

          {/* Emergency */}
          <Button
            variant="danger"
            size="sm"
            onClick={onEmergency}
            className="animate-pulse text-xs font-bold"
          >
            🚨 {isHindi ? 'आपातकाल' : 'Emergency'}
          </Button>
        </div>
      </div>
    </header>
  )
}
