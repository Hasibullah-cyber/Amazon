import { type NextRequest, NextResponse } from "next/server"

const GEMINI_API_KEY = process.env.GEMINI_API_KEY

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json()

    if (!GEMINI_API_KEY) {
      return NextResponse.json({ error: "Gemini API key not configured" }, { status: 500 })
    }

    const searchPrompt = `You are a product search assistant for Hasib Shop. Based on the user's search query, suggest relevant products from our categories:

Electronics: headphones, smartwatches, cameras, power banks, earbuds, speakers
Fashion: sunglasses, wallets, watches, ties, belts, handbags  
Home & Living: candles, pillows, clocks, vases, bed sheets, lamps
Beauty: skincare sets, hair dryers, shavers, makeup brushes, perfumes, facial massagers

User query: "${query}"

Provide a helpful response suggesting specific products and categories that match their needs. Keep it concise and mention price ranges in Bangladeshi Taka (৳).`

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
                  text: searchPrompt,
                },
              ],
            },
          ],
        }),
      },
    )

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`)
    }

    const data = await response.json()
    const suggestion = data.candidates[0].content.parts[0].text

    return NextResponse.json({ suggestion })
  } catch (error) {
    console.error("Error in AI search API:", error)
    return NextResponse.json({ error: "Search failed" }, { status: 500 })
  }
}
