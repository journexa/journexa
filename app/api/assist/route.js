export const runtime = 'edge'

export async function POST(req) {
  try {
    const { message, city, language } = await req.json()

    if (!message) {
      return Response.json({ error: 'Message is required' }, { status: 400 })
    }

    const isHindi = language === 'hi'

    const prompt = `You are Journexa's medical travel assistant — a calm, trusted guide for travelers who are sick or in a medical emergency in an unfamiliar city.

Respond ONLY in valid JSON. No markdown, no explanation, no extra text — just the raw JSON object.

Rules:
- Be warm, clear, and action-oriented. Never panic the user.
- Always prioritize safety first.
- Give practical, specific steps.
- Mention local emergency numbers when relevant.
- Suggest seeing a real doctor for anything beyond minor issues.
- ${isHindi ? 'Write summary, immediateSteps, warningSign, and pharmacyTip in Hindi (Devanagari). Keep doctor names, hospital names, and emergency service labels in English.' : 'Write everything in English.'}

JSON structure to return:
{
  "urgency": "low" | "medium" | "high" | "critical",
  "summary": "1-2 sentence empathetic acknowledgment",
  "immediateSteps": [
    { "step": 1, "action": "Short action title", "detail": "Specific explanation" }
  ],
  "doctors": [
    {
      "name": "Dr. Full Name",
      "specialty": "Specialty",
      "hospital": "Real hospital name in that city",
      "area": "Area, City",
      "phone": "+91-XXX-XXX-XXXX",
      "languages": ["English", "Hindi"],
      "estimatedCost": "₹500–₹1,200",
      "available": "24/7",
      "verified": true
    }
  ],
  "emergencyNumbers": [
    { "service": "Ambulance", "number": "108", "note": "Free, 24/7" }
  ],
  "warningSign": "When to go to ER immediately — or null",
  "pharmacyTip": "Medicine or pharmacy advice — or null"
}

Generate 3 realistic doctors with real hospital names for the city. Use local currency. Mark urgency 'critical' for chest pain, difficulty breathing, or severe symptoms.

Traveler's situation:
City: ${city || 'Unknown'}
Problem: ${message}
Language: ${isHindi ? 'Hindi' : 'English'}`

    // Call Gemini REST API directly (edge-compatible, no SDK needed)
    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1500,
            responseMimeType: 'application/json',
          },
        }),
      }
    )

    if (!geminiRes.ok) {
      const err = await geminiRes.text()
      console.error('Gemini error:', err)
      throw new Error(`Gemini API error: ${geminiRes.status}`)
    }

    const geminiData = await geminiRes.json()
    const rawText = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text || ''
    const cleaned = rawText.replace(/```json|```/g, '').trim()
    const parsed = JSON.parse(cleaned)

    // Log to Supabase (non-blocking)
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_KEY) {
      fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/queries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': process.env.SUPABASE_SERVICE_KEY,
          'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_KEY}`,
        },
        body: JSON.stringify({
          city: city || 'unknown',
          message: message.substring(0, 300),
          urgency: parsed.urgency,
          language: language || 'en',
          created_at: new Date().toISOString(),
        }),
      }).catch(() => {}) // silent fail
    }

    return Response.json({ success: true, data: parsed })

  } catch (error) {
    console.error('Route error:', error)
    return Response.json({
      error: 'Something went wrong. Please try again or call 112 directly.',
      fallback: true,
    }, { status: 500 })
  }
}
