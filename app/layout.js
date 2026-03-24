import './globals.css'

export const metadata = {
  title: 'Journexa — Trusted Medical Help for Travelers',
  description: 'Find verified English-speaking doctors, emergency numbers, and instant AI-powered medical guidance when you fall ill in an unfamiliar city. Free, 24/7.',
  keywords: 'travel medical help, tourist doctor, emergency abroad, travel health, sick while traveling, doctor finder',
  openGraph: {
    title: 'Journexa — Trusted Medical Help for Travelers',
    description: 'AI-powered medical assistance for travelers. Verified doctors, transparent costs, instant help.',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  )
}
