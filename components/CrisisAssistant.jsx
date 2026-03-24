'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import MagicCard from '@/components/magic/MagicCard'
import ShimmerButton from '@/components/magic/ShimmerButton'
import { cn } from '@/lib/utils'
import {
  MapPin, Stethoscope, Search, Phone, BadgeCheck,
  Clock, Banknote, Languages, ChevronRight, AlertTriangle,
  Pill, Loader2, Zap, Heart, Thermometer, Wind
} from 'lucide-react'

const QUICK_SCENARIOS = [
  { icon: <Thermometer className="h-3.5 w-3.5" />, en: 'High fever', hi: 'तेज़ बुखार',        query: 'I have a high fever since last night, temperature around 103°F, body aches' },
  { icon: <Wind className="h-3.5 w-3.5" />,        en: 'Food poisoning', hi: 'फूड पॉइज़निंग', query: 'Severe vomiting and diarrhea after eating street food, think it is food poisoning' },
  { icon: <Heart className="h-3.5 w-3.5" />,       en: 'Chest pain', hi: 'सीने में दर्द',      query: 'I have chest pain and shortness of breath, came on suddenly' },
  { icon: <Zap className="h-3.5 w-3.5" />,         en: 'Injury or fall', hi: 'चोट लगी',        query: 'I fell and hurt my ankle badly, possible fracture, a lot of swelling' },
  { icon: <Stethoscope className="h-3.5 w-3.5" />, en: 'Cold & cough', hi: 'सर्दी खांसी',      query: 'Bad cold, sore throat, cough for 3 days, getting worse' },
  { icon: <Pill className="h-3.5 w-3.5" />,        en: 'Need medicine', hi: 'दवाई चाहिए',       query: 'I need to find a pharmacy, need prescription medicine refill' },
]

const URGENCY = {
  low:      { label: 'Low Urgency',    labelHi: 'सामान्य',        color: 'text-emerald-400', bg: 'bg-emerald-500/8',  border: 'border-emerald-500/20', dot: 'bg-emerald-400' },
  medium:   { label: 'Moderate',       labelHi: 'सावधानी ज़रूरी',  color: 'text-amber-400',   bg: 'bg-amber-500/8',    border: 'border-amber-500/20',   dot: 'bg-amber-400' },
  high:     { label: 'High Urgency',   labelHi: 'तुरंत देखभाल',   color: 'text-orange-400',  bg: 'bg-orange-500/8',   border: 'border-orange-500/20',  dot: 'bg-orange-400 animate-pulse' },
  critical: { label: '🚨 CRITICAL',    labelHi: '🚨 गंभीर',        color: 'text-red-400',     bg: 'bg-red-500/10',     border: 'border-red-500/25',     dot: 'bg-red-400 animate-ping' },
}

export default function CrisisAssistant({ language }) {
  const [city, setCity]       = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult]   = useState(null)
  const [error, setError]     = useState(null)

  const isHindi = language === 'hi'
  const u = result ? (URGENCY[result.urgency] || URGENCY.medium) : null

  async function handleSubmit() {
    if (!message.trim()) return
    setLoading(true); setResult(null); setError(null)
    try {
      const res  = await fetch('/api/assist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, city, language }),
      })
      const json = await res.json()
      if (json.success) setResult(json.data)
      else setError(json.error || 'Something went wrong.')
    } catch {
      setError('Network error. Please check your connection and try again.')
    }
    setLoading(false)
  }

  function pickQuick(s) { setMessage(s.query); setResult(null); setError(null) }

  return (
    <div className="relative z-10 space-y-4">

      {/* ── Input Card ── */}
      <MagicCard className="p-6 shadow-xl shadow-black/30">

        {/* City */}
        <div className="mb-4">
          <label className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            <MapPin className="h-3 w-3" />
            {isHindi ? 'आपका शहर' : 'Your City'}
          </label>
          <Input
            value={city}
            onChange={e => setCity(e.target.value)}
            placeholder={isHindi ? 'जैसे: मुंबई, दिल्ली, गोवा, बैंकॉक…' : 'e.g. Mumbai, Delhi, Goa, Bangkok…'}
          />
        </div>

        {/* Symptoms */}
        <div className="mb-5">
          <label className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            <Stethoscope className="h-3 w-3" />
            {isHindi ? 'समस्या बताएं' : 'Describe Your Problem'}
          </label>
          <Textarea
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder={
              isHindi
                ? 'अपने लक्षण सरल भाषा में लिखें… जैसे: कल रात से तेज़ बुखार है, 103°F, बदन दर्द है…'
                : 'Describe your symptoms in plain language… e.g., high fever since last night, 103°F, body aches…'
            }
            rows={4}
            onKeyDown={e => { if (e.key === 'Enter' && e.metaKey) handleSubmit() }}
          />
        </div>

        {/* Submit */}
        <ShimmerButton onClick={handleSubmit} disabled={loading || !message.trim()}>
          {loading
            ? <><Loader2 className="h-4 w-4 animate-spin" /> {isHindi ? 'विश्लेषण हो रहा है…' : 'Analyzing your situation…'}</>
            : <><Search className="h-4 w-4" /> {isHindi ? 'मदद पाएं' : 'Get Help Now'}</>
          }
        </ShimmerButton>
      </MagicCard>

      {/* ── Quick Scenarios ── */}
      {!result && !loading && (
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            {isHindi ? 'त्वरित परिदृश्य' : 'Quick scenarios'}
          </p>
          <div className="flex flex-wrap gap-2">
            {QUICK_SCENARIOS.map((s, i) => (
              <button
                key={i}
                onClick={() => pickQuick(s)}
                className={cn(
                  'flex items-center gap-1.5 rounded-full border border-border px-3.5 py-1.5',
                  'text-xs text-muted-foreground transition-all duration-200',
                  'hover:border-orange-500/35 hover:text-orange-400 hover:bg-orange-500/5'
                )}
              >
                {s.icon}
                {isHindi ? s.hi : s.en}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Error ── */}
      {error && (
        <Card className="border-red-500/20 bg-red-500/5 animate-fadeUp">
          <CardContent className="flex items-start gap-3 p-4">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
            <p className="text-sm text-red-400">{error}</p>
          </CardContent>
        </Card>
      )}

      {/* ── Results ── */}
      {result && u && (
        <div className="space-y-4 animate-fadeUp">

          {/* Urgency Banner */}
          <div className={cn('flex items-center gap-3 rounded-xl border p-4', u.bg, u.border)}>
            <span className={cn('h-2.5 w-2.5 rounded-full shrink-0', u.dot)} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={cn('text-sm font-bold', u.color)}>
                  {isHindi ? u.labelHi : u.label}
                </span>
              </div>
              <p className="mt-0.5 text-sm text-muted-foreground leading-relaxed">{result.summary}</p>
            </div>
          </div>

          {/* Critical Warning */}
          {result.urgency === 'critical' && (
            <div className="flex items-start gap-3 rounded-xl border border-red-500/25 bg-red-500/8 p-4 animate-fadeUp">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
              <p className="text-sm font-semibold text-red-400">
                {isHindi ? 'तुरंत 112 पर कॉल करें या नजदीकी ER जाएं।' : 'Call 112 immediately or go to the nearest Emergency Room now.'}
              </p>
            </div>
          )}

          {/* Warning Sign */}
          {result.warningSign && result.urgency !== 'critical' && (
            <div className="flex items-start gap-3 rounded-xl border border-amber-500/20 bg-amber-500/6 p-4">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-amber-400 mb-1">
                  {isHindi ? 'ER कब जाएं' : 'Go to ER if'}
                </p>
                <p className="text-sm text-muted-foreground">{result.warningSign}</p>
              </div>
            </div>
          )}

          {/* Immediate Steps */}
          {result.immediateSteps?.length > 0 && (
            <MagicCard className="overflow-hidden">
              <div className="border-b border-border px-5 py-4">
                <h3 className="font-display text-lg font-bold">
                  {isHindi ? 'तुरंत क्या करें' : 'Immediate Steps'}
                </h3>
              </div>
              <div className="divide-y divide-border">
                {result.immediateSteps.map((s, i) => (
                  <div key={i} className="flex gap-4 p-5">
                    <div className={cn(
                      'flex h-7 w-7 shrink-0 items-center justify-center rounded-lg',
                      'border border-orange-500/25 bg-orange-500/8',
                      'font-mono text-xs font-bold text-orange-400'
                    )}>
                      {String(s.step).padStart(2, '0')}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground">{s.action}</p>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </MagicCard>
          )}

          {/* Doctors */}
          {result.doctors?.length > 0 && (
            <div>
              <h3 className="mb-3 font-display text-lg font-bold">
                🏥 {isHindi ? 'पास के डॉक्टर' : 'Nearby Doctors'}
              </h3>
              <div className="space-y-3">
                {result.doctors.map((doc, i) => (
                  <MagicCard key={i} className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">

                        {/* Name + verified */}
                        <div className="mb-1 flex flex-wrap items-center gap-2">
                          <span className="font-semibold text-foreground">{doc.name}</span>
                          {doc.verified && (
                            <Badge variant="success" className="gap-1">
                              <BadgeCheck className="h-3 w-3" />
                              {isHindi ? 'सत्यापित' : 'Verified'}
                            </Badge>
                          )}
                        </div>

                        <p className="mb-3 text-sm font-medium text-orange-400">{doc.specialty}</p>

                        {/* Meta info */}
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3 shrink-0" />
                            <span>{doc.hospital} · {doc.area}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3 shrink-0" />
                            <span>{doc.available}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Banknote className="h-3 w-3 shrink-0" />
                            <span className="font-mono text-emerald-400">{doc.estimatedCost}</span>
                          </div>
                        </div>

                        {/* Language tags */}
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {doc.languages?.map((l, j) => (
                            <Badge key={j} variant="info" className="gap-1 text-xs">
                              <Languages className="h-2.5 w-2.5" />
                              {l}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Call button */}
                      <a
                        href={`tel:${doc.phone}`}
                        className={cn(
                          'flex shrink-0 flex-col items-center gap-1.5 rounded-xl border border-orange-500/25',
                          'bg-orange-500/8 px-4 py-3 text-orange-400 transition-all duration-200',
                          'hover:bg-orange-500/15 hover:border-orange-500/40 hover:-translate-y-0.5'
                        )}
                      >
                        <Phone className="h-4 w-4" />
                        <span className="text-xs font-bold">{isHindi ? 'कॉल' : 'Call'}</span>
                      </a>
                    </div>
                  </MagicCard>
                ))}
              </div>
            </div>
          )}

          {/* Emergency Numbers */}
          {result.emergencyNumbers?.length > 0 && (
            <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
              <h4 className="mb-3 text-sm font-bold text-red-400">
                🚨 {isHindi ? 'आपातकालीन नंबर' : 'Emergency Numbers'}
              </h4>
              <div className="flex flex-wrap gap-2.5">
                {result.emergencyNumbers.map((en, i) => (
                  <a
                    key={i}
                    href={`tel:${en.number}`}
                    className="flex flex-col rounded-lg border border-red-500/15 bg-secondary/50 px-3.5 py-2.5 hover:border-red-500/30 transition-colors"
                  >
                    <span className="text-[10px] text-muted-foreground">{en.service}</span>
                    <span className="font-mono text-xl font-semibold text-red-400">{en.number}</span>
                    <span className="text-[10px] text-muted-foreground">{en.note}</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Pharmacy Tip */}
          {result.pharmacyTip && (
            <div className="flex items-start gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/6 p-4">
              <Pill className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-emerald-400 mb-1">
                  {isHindi ? 'फार्मेसी सलाह' : 'Pharmacy Tip'}
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">{result.pharmacyTip}</p>
              </div>
            </div>
          )}

          {/* New search */}
          <Button
            variant="outline"
            className="w-full"
            onClick={() => { setResult(null); setMessage(''); setCity('') }}
          >
            {isHindi ? '← नई खोज करें' : '← Start a new search'}
          </Button>
        </div>
      )}
    </div>
  )
}
