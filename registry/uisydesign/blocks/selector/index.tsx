"use client"

import * as React from "react"
import { ChevronsUpDown, LucideIcon } from "lucide-react"
import Link from "next/link"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

// Type for TOC entries
export interface TOCEntry {
  page?: number
  subsections?: Record<string, TOCEntry | string | number>
}

// Main Doc item type
export interface DocItem {
  name: string
  logo: LucideIcon | React.ElementType
  color: string
  toc?: Record<string, TOCEntry | string | number>
}

interface SelectorLinkProps {
  items: DocItem[]
  side?: "left" | "right" | "bottom" | "top"
  title: string
  defaultValue?: string
  sectionsType?: "normal" | "big"
}

export function SelectorLink({
  items,
  side = "right",
  title,
  defaultValue,
  sectionsType,
}: SelectorLinkProps) {
  // Normalize function: lowercase, remove non-letters
  const normalize = (str: string) => str.toLowerCase().replace(/[^a-z]/g, "")

  const [activeItem, setActiveItem] = React.useState(
    items.find((item) => normalize(item.name) === normalize(defaultValue || "")) || items[0]
  )

  /**
   * Converts a hex color into border and slightly darker background color
   */
  function getBorderAndDarkBg(hex: string) {
    const cleanHex = hex.replace("#", "")
    const r = parseInt(cleanHex.substring(0, 2), 16)
    const g = parseInt(cleanHex.substring(2, 4), 16)
    const b = parseInt(cleanHex.substring(4, 6), 16)
    const factor = 0.7
    const darkR = Math.max(Math.floor(r * factor), 0)
    const darkG = Math.max(Math.floor(g * factor), 0)
    const darkB = Math.max(Math.floor(b * factor), 0)
    const toHex = (n: number) => n.toString(16).padStart(2, "0")
    return {
      borderColor: `#${cleanHex}`,
      backgroundColor: `#${toHex(darkR)}${toHex(darkG)}${toHex(darkB)}`,
    }
  }

  /**
   * Convert a string to slug for URL paths
   */
  function toSlug(str: string) {
    return str
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
  }

  if (!activeItem) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="lg"
          className="w-full py-6 rounded-2xl justify-start gap-2 data-[state=open]:bg-accent data-[state=open]:text-accent-foreground"
        >
          <div
            className="flex border-2 shadow-3xl aspect-square size-8 items-center justify-center rounded-lg text-primary-foreground"
            style={{
              backgroundColor: getBorderAndDarkBg(activeItem.color).backgroundColor,
              borderColor: getBorderAndDarkBg(activeItem.color).borderColor,
            }}
          >
            <activeItem.logo className="size-4" />
          </div>

          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">{activeItem.name}</span>
          </div>

          <ChevronsUpDown className="ml-auto size-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="min-w-56 rounded-lg" align="start" side={side} sideOffset={4}>
        <DropdownMenuLabel className="text-xs text-muted-foreground">{title}</DropdownMenuLabel>

        {sectionsType === "big"
          ? items.map((item) => (
              <Link href={`/docs/${toSlug(item.name)}`} key={item.name}>
                <DropdownMenuItem onClick={() => setActiveItem(item)} className="gap-2 p-2 pl-3">
                  <div
                    className="flex shadow-2xl size-8 rounded-md border-2 items-center justify-center"
                    style={{
                      backgroundColor: getBorderAndDarkBg(item.color).backgroundColor,
                      borderColor: getBorderAndDarkBg(item.color).borderColor,
                    }}
                  >
                    <item.logo className="size-4 shrink-0" color="white" />
                  </div>
                  {item.name}
                </DropdownMenuItem>
              </Link>
            ))
          : items.map((item, index) => (
              <Link href={`/docs/${toSlug(item.name)}`} key={item.name}>
                <DropdownMenuItem onClick={() => setActiveItem(item)} className="gap-2 p-2">
                  <div className="flex size-6 items-center justify-center rounded-md border">
                    <item.logo className="size-3.5 shrink-0" />
                  </div>
                  {item.name}
                  <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                </DropdownMenuItem>
              </Link>
            ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
