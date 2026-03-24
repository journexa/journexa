import { Separator } from '@/components/ui/separator'

export default function Footer({ language }) {
  const isHindi = language === 'hi'
  return (
    <footer className="relative z-10 border-t border-border/50 py-8 mt-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 text-center">
        <p className="text-xs leading-relaxed text-muted-foreground">
          <span className="font-semibold text-orange-400">Journexa</span>
          {isHindi
            ? ' — यह ऐप आपातकालीन सेवाओं का विकल्प नहीं है। जीवन-संकट में तुरंत 112 पर कॉल करें।'
            : ' — Not a substitute for emergency services. In life-threatening situations, always call 112 (India) or your local emergency number.'}
        </p>
        <p className="mt-2 text-xs text-muted-foreground/40">
          Free forever for travelers · journexa@gmail.com
        </p>
      </div>
    </footer>
  )
}
