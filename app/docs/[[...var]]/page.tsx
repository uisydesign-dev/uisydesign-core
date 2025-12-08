"use client"

import React, { useState, useEffect, JSX } from "react"
import { COMPONENTS, DATA } from "@/lib/information"
import { SelectorLink } from "@/registry/uisydesign/blocks/selector"
import { LucideIcon, Rocket } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { ScrollArea } from "@/components/ui/scroll-area"

type CurrentMode = "components"

interface ComponentsPage {
  title: string;
  description: string;
  html: React.JSX.Element
}



export default function DocsPage({ params }: { params: { var?: string[] } }) {
  const value = params.var?.[0] ?? "Get-Started"

  const [type, setType] = useState<CurrentMode | null>(null)
  const [TypeVal, setTypeVal] = useState<string | ComponentsPage>("");

  const full = params.var?.map((val, idx) => {
    if (idx + 1 === params.var?.length) return val
    return val + "/"
  }).join("") || "";

  useEffect(() => {
    if (full.includes("components")) {
      setTypeVal(COMPONENTS[full]);
      setType("components")
    } else {
      setType(null)
    }
  }, [full])

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
          prefix="/docs"
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
                return <a key={idx} href={`/docs${content.path}`} className="text-gray-700 hover:text-black hover:underline text-base transition-colors duration-200">
                  {content.title}
                </a>
              })
            }
          </section>
        </section>
      </section>

      {/* Main content */}
      <ScrollArea className="w-[81%] py-4 mr-8 px-8 h-[90vh] pt-8 overflow-y-auto">
        {/* Page content placeholder */}
        {type === "components" &&
          typeof TypeVal === "object" &&
          TypeVal !== null &&
          "title" in TypeVal && "description" in TypeVal && "html" in TypeVal && (
            <>
              <header className="flex mb-4 flex-row gap-6 justify-between">
                <section>
                  <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight text-balance">
                    {TypeVal.title}
                  </h1>
                  <p className="leading-7 [&:not(:first-child)]:mt-6">
                    {TypeVal.description}
                  </p>
                </section>
                <section className="flex flex-row gap-2 items-center justify-center">
                  <Button className="rounded-xl px-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 147 70" className="size-4.5 -translate-x-px"><path d="M56 50.203V14h14v46.156C70 65.593 65.593 70 60.156 70c-2.596 0-5.158-1-7-2.843L0 14h19.797L56 50.203ZM147 56h-14V23.953L100.953 56H133v14H96.687C85.814 70 77 61.186 77 50.312V14h14v32.156L123.156 14H91V0h36.312C138.186 0 147 8.814 147 19.688V56Z"></path></svg>
                    <span>Open in v0</span>
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="rounded-xl px-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="tabler-icon tabler-icon-chevron-down rotate-180 sm:rotate-0"><path d="M6 9l6 6l6 -6"></path></svg>
                        Open in AI
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="rounded-xl">
                      <DropdownMenuItem asChild>
                        <Link href={"/"} >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08-4.778 2.758a.795.795 0 0 0-.393.681zm1.097-2.365 2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5Z" fill="currentColor"></path></svg>
                          Open in ChatGPT
                        </Link>
                      </DropdownMenuItem>


                    </DropdownMenuContent>
                  </DropdownMenu>
                </section>
              </header>
              {TypeVal.html}
            </>
          )}
      </ScrollArea>
    </main>
  )
}
