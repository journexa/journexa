'use client'
import { useState } from 'react'
import Header from '@/components/Header'
import CrisisAssistant from '@/components/CrisisAssistant'
import EmergencyModal from '@/components/EmergencyModal'
import Footer from '@/components/Footer'
import AnimatedGradientText from '@/components/magic/AnimatedGradientText'
import NumberTicker from '@/components/magic/NumberTicker'
import Meteors from '@/components/magic/Meteors'
import MagicCard from '@/components/magic/MagicCard'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ShieldCheck, Clock, Globe, Wallet } from 'lucide-react'
import { cn } from '@/lib/utils'

const STATS = [
  { value: 40,   suffix: '+', label: 'Countries covered',      labelHi: 'देश' },
  { value: 24,   suffix: '/7', label: 'Always available',      labelHi: 'हमेशा उपलब्ध' },
  { value: 100,  suffix: '%', label: 'Free for travelers',     labelHi: 'यात्रियों के लिए निःशुल्क' },
  { value: 8,    suffix: '+', label: 'Cities with guides',     labelHi: 'शहरों के गाइड' },
]

const HOW_IT_WORKS = [
  {
    num: '01', icon: '🗣️',
    en: { title: 'Describe your problem',    desc: 'Type your symptoms in plain language. No medical jargon needed.' },
    hi: { title: 'समस्या बताएं',              desc: 'अपने लक्षण सरल भाषा में लिखें। कोई मेडिकल जानकारी ज़रूरी नहीं।' },
  },
  {
    num: '02', icon: '🤖',
    en: { title: 'AI analyzes instantly',    desc: 'Gemini AI understands urgency and finds verified doctors near you.' },
    hi: { title: 'AI तुरंत विश्लेषण',         desc: 'Gemini AI आपकी स्थिति समझता है और पास के डॉक्टर ढूंढता है।' },
  },
  {
    num: '03', icon: '💰',
    en: { title: 'Costs shown upfront',      desc: 'Every doctor shows estimated fees before you call or visit.' },
    hi: { title: 'कीमत पहले दिखती है',        desc: 'हर डॉक्टर की फीस कॉल से पहले दिखाई जाती है।' },
  },
  {
    num: '04', icon: '📞',
    en: { title: 'Call directly, no fees',   desc: 'Tap to call the doctor. No booking fee. No middleman. Ever.' },
    hi: { title: 'सीधे कॉल करें, मुफ्त',       desc: 'डॉक्टर को सीधे कॉल करें। कोई बुकिंग फीस नहीं।' },
  },
]

const TRUST_BADGES = [
  { icon: <ShieldCheck className="h-3.5 w-3.5" />, en: 'Verified doctors',    hi: 'सत्यापित डॉक्टर' },
  { icon: <Wallet className="h-3.5 w-3.5" />,      en: 'Transparent costs',   hi: 'पारदर्शी कीमत' },
  { icon: <Globe className="h-3.5 w-3.5" />,       en: 'English speaking',    hi: 'अंग्रेज़ी बोलने वाले' },
  { icon: <Clock className="h-3.5 w-3.5" />,       en: '24/7 available',      hi: '24/7 उपलब्ध' },
]

export default function Home() {
  const [language, setLanguage]         = useState('en')
  const [showEmergency, setShowEmergency] = useState(false)
  const isHindi = language === 'hi'

  return (
    <>
      {/* Backgrounds */}
      <div className="aurora-bg" aria-hidden />
      <div className="grid-overlay" aria-hidden />

      <Header
        language={language}
        setLanguage={setLanguage}
        onEmergency={() => setShowEmergency(true)}
      />

      <EmergencyModal
        isOpen={showEmergency}
        onClose={() => setShowEmergency(false)}
        language={language}
      />

      <main className="relative z-10 mx-auto max-w-5xl px-4 pb-4 sm:px-6">

        {/* ── Hero ── */}
        <section className="py-14 text-center">

          {/* Eyebrow pill */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/8 px-4 py-1.5 animate-fadeUp">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-400 shadow-[0_0_8px] shadow-orange-400" />
            <span className="text-xs font-semibold uppercase tracking-widest text-orange-400">
              {isHindi ? 'यात्रियों के लिए निःशुल्क · AI-संचालित' : 'Free for travelers · AI-powered'}
            </span>
          </div>

          {/* Headline */}
          <h1 className={cn(
            'font-display text-5xl font-black leading-[1.08] tracking-tight sm:text-6xl md:text-7xl',
            'mb-5 animate-fadeUp [animation-delay:100ms] opacity-0'
          )}>
            {isHindi ? (
              <>अनजान शहर में<br />
                <AnimatedGradientText>भरोसेमंद डॉक्टर</AnimatedGradientText>
              </>
            ) : (
              <>Trusted care,<br />
                <AnimatedGradientText>wherever you travel.</AnimatedGradientText>
              </>
            )}
          </h1>

          {/* Subheadline */}
          <p className={cn(
            'mx-auto max-w-lg text-lg leading-relaxed text-muted-foreground',
            'mb-8 animate-fadeUp [animation-delay:200ms] opacity-0'
          )}>
            {isHindi
              ? 'यात्रा के दौरान बीमार? AI की मदद से तुरंत जानें — क्या करें, कहाँ जाएं, और कितना खर्च होगा।'
              : 'Fall ill while traveling? Get instant AI guidance — what to do, which verified doctor to see, and what it costs. Free, always.'}
          </p>

          {/* Trust badges */}
          <div className={cn(
            'mb-12 flex flex-wrap items-center justify-center gap-2',
            'animate-fadeUp [animation-delay:300ms] opacity-0'
          )}>
            {TRUST_BADGES.map((b, i) => (
              <Badge key={i} variant="secondary" className="gap-1.5 border border-border/80 py-1.5 text-xs">
                <span className="text-orange-400">{b.icon}</span>
                {isHindi ? b.hi : b.en}
              </Badge>
            ))}
          </div>
        </section>

        {/* ── Main Tool ── */}
        <section className="animate-fadeUp [animation-delay:350ms] opacity-0">
          <CrisisAssistant language={language} />
        </section>

        {/* ── Stats ── */}
        <section className="py-14">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {STATS.map((s, i) => (
              <MagicCard key={i} className="p-5 text-center">
                <div className="font-display text-3xl font-black text-foreground">
                  <NumberTicker value={s.value} />
                  <span className="text-orange-400">{s.suffix}</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {isHindi ? s.labelHi : s.label}
                </p>
              </MagicCard>
            ))}
          </div>
        </section>

        <Separator className="opacity-50" />

        {/* ── How it works ── */}
        <section className="py-14">
          <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-orange-400">
            {isHindi ? 'प्रक्रिया' : 'The process'}
          </div>
          <h2 className="mb-10 font-display text-3xl font-bold sm:text-4xl">
            {isHindi ? 'Journexa कैसे काम करता है' : 'How Journexa works'}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {HOW_IT_WORKS.map((step, i) => (
              <MagicCard key={i} className="p-5 relative overflow-hidden">
                <div className={cn(
                  'mb-4 flex h-9 w-9 items-center justify-center rounded-xl',
                  'border border-orange-500/20 bg-orange-500/8',
                  'font-mono text-sm font-bold text-orange-400'
                )}>
                  {step.num}
                </div>
                <div className="mb-3 text-2xl">{step.icon}</div>
                <h4 className="mb-2 font-semibold text-foreground">
                  {isHindi ? step.hi.title : step.en.title}
                </h4>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {isHindi ? step.hi.desc : step.en.desc}
                </p>
              </MagicCard>
            ))}
          </div>
        </section>

        <Separator className="opacity-50" />

        {/* ── Promise strip ── */}
        <section className="py-14">
          <MagicCard
            className="relative overflow-hidden p-8 sm:p-10"
            gradientColor="rgba(255,107,53,0.06)"
          >
            <Meteors number={8} />
            <div className="relative z-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-orange-500/10 border border-orange-500/20 text-3xl">
                ✚
              </div>
              <div>
                <h3 className="font-display text-xl font-bold mb-1">
                  {isHindi ? 'हमारा वादा' : 'Our promise to every traveler'}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground max-w-xl">
                  {isHindi
                    ? 'Journexa हमेशा यात्रियों के लिए निःशुल्क रहेगा। कोई सदस्यता नहीं, कोई छुपी फीस नहीं, कोई विज्ञापन नहीं। हम आपकी मदद के लिए हैं, मुनाफे के लिए नहीं।'
                    : 'Journexa will always be free for travelers. No subscription, no hidden fees, no ads. We exist to help you when you need it most — not to profit from your emergency.'}
                </p>
              </div>
            </div>
          </MagicCard>
        </section>

      </main>

      <Footer language={language} />
    </>
  )
}
