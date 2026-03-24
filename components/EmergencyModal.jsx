'use client'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const EMERGENCY_NUMBERS = [
  { country: '🇮🇳 India', service: 'National Emergency', number: '112', note: 'Police · Fire · Ambulance' },
  { country: '🇮🇳 India', service: 'Free Ambulance',     number: '108', note: 'Free 24/7 ambulance' },
  { country: '🇮🇳 India', service: 'Tourist Helpline',   number: '1363', note: '24/7 tourist support' },
  { country: '🇺🇸 USA',   service: 'Emergency',          number: '911',  note: 'All emergencies' },
  { country: '🇬🇧 UK',    service: 'Emergency',          number: '999',  note: 'All emergencies' },
  { country: '🇪🇺 Europe', service: 'Emergency',         number: '112',  note: 'All EU countries' },
  { country: '🇦🇪 UAE',   service: 'Emergency',          number: '999',  note: 'All emergencies' },
  { country: '🇹🇭 Thailand', service: 'Tourist Police',  number: '1155', note: 'English speaking' },
  { country: '🌐 Global', service: 'International SOS',  number: '+1-215-942-8226', note: '24/7 traveler help' },
]

export default function EmergencyModal({ isOpen, onClose, language }) {
  if (!isOpen) return null
  const isHindi = language === 'hi'

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fadeIn"
      style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-2xl border border-red-500/20 bg-card p-6 shadow-2xl animate-fadeUp max-h-[85vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Glow */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-red-500/5 via-transparent to-transparent" />

        {/* Header */}
        <div className="relative mb-5 flex items-start justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-red-400">
              🚨 {isHindi ? 'आपातकालीन नंबर' : 'Emergency Numbers'}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {isHindi
                ? 'जीवन-संकट में तुरंत इन नंबरों पर कॉल करें'
                : 'Call immediately in any life-threatening situation'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Numbers grid */}
        <div className="relative flex flex-col gap-2.5">
          {EMERGENCY_NUMBERS.map((item, i) => (
            <a
              key={i}
              href={`tel:${item.number}`}
              className={cn(
                'flex items-center justify-between rounded-xl border border-border bg-secondary/40 p-3.5',
                'hover:border-red-500/25 hover:bg-secondary/70 transition-all duration-200 group'
              )}
            >
              <div>
                <p className="text-xs text-muted-foreground">{item.country} · {item.service}</p>
                <p className="font-mono text-2xl font-semibold text-red-400 leading-tight">{item.number}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{item.note}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-red-400 border border-red-500/25 bg-red-500/10 px-3 py-1.5 rounded-lg group-hover:bg-red-500/20 transition-colors">
                  {isHindi ? 'कॉल करें' : 'Call'}
                </span>
              </div>
            </a>
          ))}
        </div>

        <p className="relative mt-5 text-center text-xs text-muted-foreground/60 leading-relaxed">
          {isHindi
            ? 'Journexa आपातकालीन सेवाओं का विकल्प नहीं है।'
            : 'Journexa is not a substitute for emergency services.'}
        </p>
      </div>
    </div>
  )
}
