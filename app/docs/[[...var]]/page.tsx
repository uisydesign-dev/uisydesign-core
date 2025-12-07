"use client"

import React, { useState, useEffect, JSX } from "react"
import { DATA } from "@/lib/information"
import { SelectorLink } from "@/registry/uisydesign/blocks/selector"
import { LucideIcon, Rocket } from "lucide-react"

export default function DocsPage({ params }: { params: { var?: string[] } }) {
  const value = params.var?.[0] ?? "Get-Started"

  type DocItem = {
    name: string
    logo: LucideIcon
    color: string
    tableOfContents: { title: string, path: string }[]
  }


  // Normalize strings for comparison
  const normalize = (str: string) => str.toLowerCase().replace(/[^a-z]/g, "")

  const foundItem: DocItem = DATA.sections.docs.find(
    (section) => normalize(section.name) === normalize(value)
  ) || { name: "", logo: Rocket, color: "", tableOfContents: [] }


  return (
    <main className="flex flex-row h-[90.5vh] no-scrollbar">
      {/* Sidebar */}
      <section className="w-[19%] flex flex-col gap-4 h-full p-4">
        <SelectorLink
          items={DATA.sections.docs}
          title="Document Sections"
          defaultValue={value}
          side="bottom"
          sectionsType="big"
        />

        {/* TOC */}
        <section className="px-4 flex flex-col overflow-y-auto">
          <h2 className="text-lg font-bold mb-4 tracking-tight">Table of Contents</h2>
          <section className="flex flex-col gap-1 pl-4">
            {
              foundItem.tableOfContents.map((content, idx) => {
                return <a key={idx} href={`${content.path}`} className="text-gray-700 hover:text-black hover:underline text-base transition-colors duration-200">
                  {content.title}
                </a>
              })
            }
          </section>
        </section>
      </section>

      {/* Main content */}
      <section className="w-[81%] h-full p-4 overflow-y-auto">
        {/* Page content placeholder */}
      </section>
    </main>
  )
}
