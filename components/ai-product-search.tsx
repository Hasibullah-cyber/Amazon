"use client"

import { useState } from "react"
import { Sparkles } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

export default function AIProductSearch() {
  const [query, setQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleAISearch = async () => {
    if (!query.trim()) return

    setIsLoading(true)
    try {
      const response = await fetch("/api/ai-search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      })

      if (!response.ok) {
        throw new Error("Search failed")
      }

      const data = await response.json()

      // Redirect to search results or show suggestions
      toast({
        title: "AI Search Results",
        description: data.suggestion || "Here are some product suggestions for you!",
      })
    } catch (error) {
      toast({
        title: "Search Error",
        description: "Sorry, AI search is temporarily unavailable.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative">
      <div className="flex">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Try: 'I need a gift for my tech-savvy friend' or 'Best headphones under ৳5000'"
          className="flex-1 rounded-r-none"
          onKeyPress={(e) => e.key === "Enter" && handleAISearch()}
        />
        <Button
          onClick={handleAISearch}
          disabled={isLoading}
          className="rounded-l-none bg-[#febd69] hover:bg-[#f3a847] text-black border-l-0"
        >
          {isLoading ? (
            <div className="animate-spin h-4 w-4 border-2 border-black border-t-transparent rounded-full" />
          ) : (
            <Sparkles className="h-4 w-4" />
          )}
        </Button>
      </div>
      <div className="absolute -bottom-6 left-0 text-xs text-gray-500 flex items-center">
        <Sparkles className="h-3 w-3 mr-1" />
        AI-powered search
      </div>
    </div>
  )
}
