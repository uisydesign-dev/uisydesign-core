import { HeroCentered } from "@/components/hero-centered"
import { Header, HeaderLogo, HeaderNav, HeaderGroup, RateButton, SearchButton } from "@/registry/new-york/blocks/header/header"

export default function Home() {
  return (
    <main className="min-h-svh flex flex-col">
      <Header justify="between">
        <HeaderGroup>
          <HeaderLogo Icon={"./UIsyLogo.jpeg"} reversed>
            UIsy Design
          </HeaderLogo>
          <HeaderNav
            links={[
              {
                href: "/",
                label: "Home",
                isActive: true,
                layout: "featured",
                featured: {
                  href: "/",
                  title: "UIsy Framework",
                  description: "A modern shadcn-forked UI system with AI-powered workflow tooling.",
                },
                items: [
                  {
                    title: "Docs Overview",
                    href: "/docs",
                    description: "Your starting point for understanding the UIsy ecosystem.",
                  },
                  {
                    title: "Installation",
                    href: "/docs/getting-started",
                    description: "Set up UIsy in your project in minutes.",
                  },
                  {
                    title: "Components",
                    href: "/docs/components",
                    description: "Explore beautifully-crafted, ready-to-use components.",
                  },
                ],
              },
              {
                label: "Components",
                layout: "double",
                items: [
                  {
                    title: "UI Elements",
                    href: "/docs/components/ui",
                    description: "Buttons, badges, forms, and core building blocks.",
                  },
                  {
                    title: "Layouts",
                    href: "/docs/components/layouts",
                    description: "Page structures and reusable layout primitives.",
                  },
                  {
                    title: "Navigation",
                    href: "/docs/components/navigation",
                    description: "Menus, navbars, breadcrumbs, and more.",
                  },
                  {
                    title: "Extended",
                    href: "/docs/components/extended",
                    description: "Extra components built on top of shadcn.",
                  },
                ],
              },
              {
                label: "AI Tools",
                layout: "featured",
                featured: {
                  href: "/ai",
                  title: "AI Builder",
                  description: "Generate components, hooks, and utilities using natural language.",
                },
                items: [
                  {
                    title: "Prompt Library",
                    href: "/ai/prompts",
                    description: "Curated prompts to speed up your workflow.",
                  },
                  {
                    title: "Generate Component",
                    href: "/ai/generate/component",
                    description: "Describe a UI element — get production-ready code.",
                  },
                  {
                    title: "Generate Layout",
                    href: "/ai/generate/layout",
                    description: "Turn ideas into full page structures instantly.",
                  },
                ],
              },
              {
                label: "About",
                layout: "single",
                items: [
                  { title: "Our Mission", href: "/about/mission" },
                  { title: "Team", href: "/about/team" },
                  { title: "Roadmap", href: "/about/roadmap" },
                ],
              },
              {
                href: "/contact",
                label: "Contact",
              },
            ]}            
          />
        </HeaderGroup>
        <HeaderGroup>
          <SearchButton/>
        </HeaderGroup>
      </Header>
      <HeroCentered/>
    </main>
  )
}
