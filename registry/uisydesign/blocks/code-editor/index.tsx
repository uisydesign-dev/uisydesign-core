"use client"

import type React from "react"

import { useState } from "react"
import { Check, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CodeShowcaseProps {
  code: string
  language?: string
  className?: string
}

export function CodeShowcase({ code, language = "tsx", className = "" }: CodeShowcaseProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const lines = code.split("\n")

  const normalizeWhitespace = (line: string) => {
    return line.replace(/\t/g, "  ")
  }

  // Tokenize and highlight syntax using React elements
  const highlightLine = (line: string) => {
    const normalizedLine = normalizeWhitespace(line)
    const tokens: React.ReactNode[] = []
    let currentIndex = 0
    let key = 0

    // Regex patterns for syntax highlighting
    const patterns = [
      // Strings (must come before keywords to avoid highlighting keywords in strings)
      { regex: /(["'`])((?:\\.|(?!\1)[^\\])*)\1/g, className: "text-[#0A3069] dark:text-[#A5D6FF]" },
      // Comments
      { regex: /(\/\/.*$)/g, className: "text-[#57606A] dark:text-[#8B949E] italic" },
      // Keywords
      {
        regex:
          /\b(import|export|from|const|let|var|function|return|if|else|class|interface|type|async|await|as|default|use)\b/g,
        className: "text-[#CF222E] dark:text-[#FF7B72]",
      },
      // JSX Components (capitalized words)
      { regex: /\b([A-Z][a-zA-Z0-9]*)\b/g, className: "text-[#8250DF] dark:text-[#D2A8FF]" },
    ]

    // Find all matches
    const matches: Array<{ start: number; end: number; text: string; className: string }> = []

    patterns.forEach((pattern) => {
      const regex = new RegExp(pattern.regex.source, pattern.regex.flags)
      let match
      while ((match = regex.exec(normalizedLine)) !== null) {
        matches.push({
          start: match.index,
          end: match.index + match[0].length,
          text: match[0],
          className: pattern.className,
        })
      }
    })

    // Sort matches by start position and remove overlaps (prefer earlier patterns)
    matches.sort((a, b) => a.start - b.start)
    const filteredMatches: Array<{ start: number; end: number; text: string; className: string }> = []

    matches.forEach((match) => {
      // Remove if overlaps with previous match
      if (filteredMatches.length === 0) {
        filteredMatches.push(match)
        return
      }
      const prev = filteredMatches[filteredMatches.length - 1]
      if (match.start >= prev.end) {
        filteredMatches.push(match)
      }
    })

    // Build token array
    filteredMatches.forEach((match) => {
      // Add unmatched text before this match
      if (currentIndex < match.start) {
        tokens.push(
          <span key={key++} className="text-foreground">
            {normalizedLine.slice(currentIndex, match.start)}
          </span>,
        )
      }
      // Add matched/highlighted text
      tokens.push(
        <span key={key++} className={match.className}>
          {match.text}
        </span>,
      )
      currentIndex = match.end
    })

    // Add remaining text
    if (currentIndex < normalizedLine.length) {
      tokens.push(
        <span key={key++} className="text-foreground">
          {normalizedLine.slice(currentIndex)}
        </span>,
      )
    }

    // Handle empty lines
    if (tokens.length === 0) {
      return <span className="select-none text-transparent">.</span>
    }

    return <>{tokens}</>
  }

  return (
    <div className={`relative rounded-lg border border-border bg-muted/50 overflow-hidden ${className}`}>
      <div className="absolute top-3 right-3 z-10">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 bg-background/80 hover:bg-background"
          onClick={handleCopy}
        >
          {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
        </Button>
      </div>

      <div className="overflow-x-auto">
        <div className="px-4 py-4 font-mono text-sm whitespace-pre">
          {lines.map((line, index) => (
            <div key={index} className="flex gap-4 leading-relaxed">
              <span className="select-none text-muted-foreground min-w-[2rem] text-right">{index + 1}</span>
              <span className="flex-1">{highlightLine(line)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
