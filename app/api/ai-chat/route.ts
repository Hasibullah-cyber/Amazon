import { type NextRequest, NextResponse } from "next/server"

// You'll need to add your Gemini API key to your environment variables
const GEMINI_API_KEY = process.env.GEMINI_API_KEY

export async function POST(request: NextRequest) {
  try {
    const { message, context } = await request.json()

    if (!GEMINI_API_KEY) {
      return NextResponse.json({ error: "Gemini API key not configured" }, { status: 500 })
    }

    // Create a context-aware prompt for the shopping assistant
    const systemPrompt = `You are a helpful AI shopping assistant for Hasib Shop, an e-commerce website in Bangladesh. 

Our product categories include:
- Electronics (headphones, smartwatches, cameras, power banks, earbuds, speakers)
- Fashion (sunglasses, wallets, watches, ties, belts, handbags)
- Home & Living (candles, pillows, clocks, vases, bed sheets, lamps)
- Beauty & Personal Care (skincare sets, hair dryers, shavers, makeup brushes, perfumes, facial massagers)

Key information:
- We accept bKash, Nagad, Rocket, Credit/Debit Cards, and Cash on Delivery
- Delivery: 1-2 days in Dhaka, 2-4 days outside Dhaka
- All prices include 10% VAT
- We offer 14-day returns on most items
- Free shipping on orders over ৳5,000

Please help customers find products, answer questions about policies, and provide helpful shopping advice. Keep responses concise and friendly. Always mention prices in Bangladeshi Taka (৳).`

    const fullPrompt = `${systemPrompt}\n\nCustomer question: ${message}`

    // Make request to Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: fullPrompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
        }),
      },
    )

    if (!response.ok) {
      console.error("Gemini API error:", response.status, response.statusText)
      throw new Error(`Gemini API error: ${response.status}`)
    }

    const data = await response.json()

    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      throw new Error("Invalid response from Gemini API")
    }

    const aiResponse = data.candidates[0].content.parts[0].text

    return NextResponse.json({ response: aiResponse })
  } catch (error) {
    console.error("Error in AI chat API:", error)
    return NextResponse.json(
      {
        error: "Failed to get AI response",
        response:
          "I'm sorry, I'm having trouble responding right now. Please try again later or contact our customer service for assistance.",
      },
      { status: 500 },
    )
  }
}
