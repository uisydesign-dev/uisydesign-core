"use client"

import React from "react"
import { BookOpen, Puzzle, Terminal, Sparkles, LayoutGrid, Rocket, Crown, Shield } from "lucide-react"
import IFrameHeader from "@/app/iframes/components/Header"
import { CodeShowcase } from "@/registry/uisydesign/blocks/code-editor"
import { Card } from "@/components/ui/card"
import CLIManualInstallation, { CDNInstall } from "@/registry/uisydesign/blocks/installer"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  Header,
  HeaderLogo,
  HeaderNav,
  HeaderGroup,
  ThemeToggle,
  SearchButton,
  MenubarWithAvatar,
  HeaderItem,
  HeaderNavLink,
  ShareButton,
  RateButton,
  NotificationButton,
  SettingsButton,
  UserButton,
} from "@/registry/uisydesign/blocks/header"
import { Kbd } from "@/components/ui/kbd"

/* ---------------------------
   Small helper: Props table
   --------------------------- */
function PropsTable({ name, rows }: { name: string; rows: Array<{ prop: string; type: string; default?: string; optional?: boolean }> }) {
  return (
    <section className="h-auto flex flex-col gap-4" id={name}>
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Interface</h3>
      <Table>
        <TableCaption>An interface of the {name} object.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Prop</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Default</TableHead>
            <TableHead>Is Optional</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((r) => (
            <TableRow key={r.prop}>
              <TableCell>{r.prop}</TableCell>
              <TableCell>{r.type}</TableCell>
              <TableCell>{r.default ?? '—'}</TableCell>
              <TableCell><Checkbox disabled defaultChecked={!!r.optional} /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  )
}

/* ---------------------------
   Example data (code + live)
   Each example is shown using the SAME template you provided.
   Live render in first Card, CodeShowcase (full JSX) in second Card.
   --------------------------- */

/* HEADER examples (you already had this pattern) */
const headerExamples = [
  {
    title: "UIsy — full nav",
    code: `<Header justify="between" zIndex={60} className="backdrop-blur supports-[backdrop-filter]:bg-background/80">
  <HeaderGroup>
    <HeaderLogo Icon={"./UIsyLogo.jpeg"}>UIsy</HeaderLogo>
    <HeaderNav links={[
      { label: "Docs", href: "/docs", layout: "single", items: [{ title: "Getting Started", href: "/docs/getting-started" }, { title: "Components", href: "/docs/components" }] },
      { label: "Playground", href: "/playground" },
      { label: "Templates", layout: "single", items: [{ title: "Landing Pages", href: "/templates/landing" }] }
    ]} />
  </HeaderGroup>
  <HeaderGroup className="flex-1 justify-center hidden lg:flex">
    <SearchButton variant="dropdown" kbds={["⌘","K"]} queries={{ input: "Search docs…", emptyText: "No results", groups: [] }} />
  </HeaderGroup>
  <HeaderGroup>
    <Button asChild><a href="/login">Sign in</a></Button>
    <Button asChild><a href="/ai">Try AI Builder</a></Button>
  </HeaderGroup>
</Header>`,
    render: (
      <Header justify="between" zIndex={60} className="backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <HeaderGroup>
          <HeaderLogo Icon={"./UIsyLogo.jpeg"}>UIsy</HeaderLogo>
          <HeaderNav links={[
            { label: "Docs", href: "/docs", layout: "single", items: [{ title: "Getting Started", href: "/docs/getting-started" }, { title: "Components", href: "/docs/components" }] },
            { label: "Playground", href: "/playground" },
            { label: "Templates", layout: "single", items: [{ title: "Landing Pages", href: "/templates/landing" }] }
          ] as any} />
        </HeaderGroup>
        <HeaderGroup className="flex-1 justify-center hidden lg:flex">
          <SearchButton variant="dropdown" kbds={["⌘","K"]} queries={{ input: "Search docs…", emptyText: "No results", groups: [] }} />
        </HeaderGroup>
        <HeaderGroup>
          <Button asChild><a href="/login">Sign in</a></Button>
          <Button asChild><a href="/ai">Try AI Builder</a></Button>
        </HeaderGroup>
      </Header>
    )
  },
  {
    title: "ProjectOne — compact",
    code: `<Header justify="between">
  <HeaderGroup>
    <HeaderLogo Icon={"./Logo1.jpeg"}>ProjectOne</HeaderLogo>
    <HeaderNav links={[{ label: "Overview", href: "/project-one" }, { label: "Docs", href: "/project-one/docs" }]} />
  </HeaderGroup>
  <HeaderGroup>
    <Button asChild><a href="/login">Sign in</a></Button>
    <Button asChild><a href="/project-one/start">Start</a></Button>
  </HeaderGroup>
</Header>`,
    render: (
      <Header justify="between">
        <HeaderGroup>
          <HeaderLogo Icon={"./Logo1.jpeg"}>ProjectOne</HeaderLogo>
          <HeaderNav links={[{ label: "Overview", href: "/project-one" }, { label: "Docs", href: "/project-one/docs" }]} />
        </HeaderGroup>
        <HeaderGroup>
          <Button asChild><a href="/login">Sign in</a></Button>
          <Button asChild><a href="/project-one/start">Start</a></Button>
        </HeaderGroup>
      </Header>
    )
  },
  {
    title: "AIBuilder — action-first",
    code: `<Header justify="between">
  <HeaderGroup>
    <HeaderLogo Icon={"./Logo3.jpeg"}>AIBuilder</HeaderLogo>
    <HeaderNav links={[{ label: "Prompts", href: "/ai/prompts" }, { label: "Generate", href: "/ai/generate" }]} />
  </HeaderGroup>
  <HeaderGroup className="flex-1 justify-center hidden lg:flex">
    <SearchButton variant="dropdown" kbds={["⌘","A"]} queries={{ input: "Search AIBuilder…", emptyText: "No results", groups: [] }} />
  </HeaderGroup>
  <HeaderGroup>
    <Button asChild><a href="/login">Sign in</a></Button>
    <Button asChild><a href="/ai/start">Start AI</a></Button>
  </HeaderGroup>
</Header>`,
    render: (
      <Header justify="between">
        <HeaderGroup>
          <HeaderLogo Icon={"./Logo3.jpeg"}>AIBuilder</HeaderLogo>
          <HeaderNav links={[{ label: "Prompts", href: "/ai/prompts" }, { label: "Generate", href: "/ai/generate" }]} />
        </HeaderGroup>
        <HeaderGroup className="flex-1 justify-center hidden lg:flex">
          <SearchButton variant="dropdown" kbds={["⌘","A"]} queries={{ input: "Search AIBuilder…", emptyText: "No results", groups: [] }} />
        </HeaderGroup>
        <HeaderGroup>
          <Button asChild><a href="/login">Sign in</a></Button>
          <Button asChild><a href="/ai/start">Start AI</a></Button>
        </HeaderGroup>
      </Header>
    )
  }
]

/* HEADERGROUP examples */
const headerGroupExamples = [
  {
    title: "Left group (default)",
    code: `<Header>
  <HeaderGroup>
    <HeaderLogo Icon={Rocket}>LeftBrand</HeaderLogo>
  </HeaderGroup>
</Header>`,
    render: (
      <Header>
        <HeaderGroup>
          <HeaderLogo Icon={Rocket}>LeftBrand</HeaderLogo>
        </HeaderGroup>
      </Header>
    )
  },
  {
    title: "Center group (flex-1)",
    code: `<Header>
  <HeaderGroup position="center" className="flex-1 justify-center">
    <div>Centered content</div>
  </HeaderGroup>
</Header>`,
    render: (
      <Header>
        <HeaderGroup position="center" className="flex-1 justify-center">
          <div>Centered content</div>
        </HeaderGroup>
      </Header>
    )
  },
  {
    title: "Right group",
    code: `<Header>
  <HeaderGroup position="right">
    <Button>Action</Button>
  </HeaderGroup>
</Header>`,
    render: (
      <Header>
        <HeaderGroup position="right">
          <Button>Action</Button>
        </HeaderGroup>
      </Header>
    )
  }
]

/* HEADERITEM examples */
const headerItemExamples = [
  {
    title: "Inline item",
    code: `<Header>
  <HeaderGroup>
    <HeaderItem>
      <Button>Inline</Button>
    </HeaderItem>
  </HeaderGroup>
</Header>`,
    render: (
      <Header>
        <HeaderGroup>
          <HeaderItem>
            <Button>Inline</Button>
          </HeaderItem>
        </HeaderGroup>
      </Header>
    )
  },
  {
    title: "asChild item (anchor)",
    code: `<Header>
  <HeaderGroup>
    <HeaderItem asChild>
      <a href="/profile" className="text-sm">Profile</a>
    </HeaderItem>
  </HeaderGroup>
</Header>`,
    render: (
      <Header>
        <HeaderGroup>
          <HeaderItem asChild>
            <a href="/profile" className="text-sm">Profile</a>
          </HeaderItem>
        </HeaderGroup>
      </Header>
    )
  }
]

/* HEADERLOGO examples */
const headerLogoExamples = [
  {
    title: "Image logo",
    code: `<Header>
  <HeaderGroup>
    <HeaderLogo Icon="./LogoAlt.jpeg">Acme</HeaderLogo>
  </HeaderGroup>
</Header>`,
    render: (
      <Header>
        <HeaderGroup>
          <HeaderLogo Icon={"./LogoAlt.jpeg"}>Acme</HeaderLogo>
        </HeaderGroup>
      </Header>
    )
  },
  {
    title: "Lucide icon logo",
    code: `<Header>
  <HeaderGroup>
    <HeaderLogo Icon={Rocket}>Launch</HeaderLogo>
  </HeaderGroup>
</Header>`,
    render: (
      <Header>
        <HeaderGroup>
          <HeaderLogo Icon={Rocket}>Launch</HeaderLogo>
        </HeaderGroup>
      </Header>
    )
  },
  {
    title: "Reversed layout",
    code: `<Header>
  <HeaderGroup>
    <HeaderLogo Icon={Crown} reversed>RoyalApp</HeaderLogo>
  </HeaderGroup>
</Header>`,
    render: (
      <Header>
        <HeaderGroup>
          <HeaderLogo Icon={Crown} reversed>RoyalApp</HeaderLogo>
        </HeaderGroup>
      </Header>
    )
  }
]

/* HEADERNAV examples */
const headerNavExamples = [
  {
    title: "Single layout",
    code: `<Header>
  <HeaderGroup>
    <HeaderLogo Icon={BookOpen}>Docs</HeaderLogo>
    <HeaderNav links={[
      { label: "Docs", layout: "single", items: [{ title: "Start", href: "/start" }] }
    ]} />
  </HeaderGroup>
</Header>`,
    render: (
      <Header>
        <HeaderGroup>
          <HeaderLogo Icon={BookOpen}>Docs</HeaderLogo>
          <HeaderNav links={[{ label: "Docs", layout: "single", items: [{ title: "Start", href: "/start" }] }]} />
        </HeaderGroup>
      </Header>
    )
  },
  {
    title: "Double layout",
    code: `<Header>
  <HeaderGroup>
    <HeaderLogo Icon={LayoutGrid}>Components</HeaderLogo>
    <HeaderNav links={[
      { label: "Components", layout: "double", items: [{ title: "Buttons", href: "/buttons" }, { title: "Inputs", href: "/inputs" }] }
    ]} />
  </HeaderGroup>
</Header>`,
    render: (
      <Header>
        <HeaderGroup>
          <HeaderLogo Icon={LayoutGrid}>Components</HeaderLogo>
          <HeaderNav links={[{ label: "Components", layout: "double", items: [{ title: "Buttons", href: "/buttons" }, { title: "Inputs", href: "/inputs" }] }]} />
        </HeaderGroup>
      </Header>
    )
  },
  {
    title: "Featured layout",
    code: `<Header>
  <HeaderGroup>
    <HeaderLogo Icon={Shield}>Product</HeaderLogo>
    <HeaderNav links={[
      { label: "Product", layout: "featured", featured: { href: "/", title: "Product", description: "Featured" }, items: [{ title: "Overview", href: "/" }] }
    ]} />
  </HeaderGroup>
</Header>`,
    render: (
      <Header>
        <HeaderGroup>
          <HeaderLogo Icon={Shield}>Product</HeaderLogo>
          <HeaderNav links={[{ label: "Product", layout: "featured", featured: { href: "/", title: "Product", description: "Featured" }, items: [{ title: "Overview", href: "/" }] }]} />
        </HeaderGroup>
      </Header>
    )
  }
]

/* HEADERNAVLINK examples */
const headerNavLinkExamples = [
  {
    title: "Active link",
    code: `<Header>
  <HeaderGroup>
    <HeaderNavLink href="/" isActive>Home</HeaderNavLink>
  </HeaderGroup>
</Header>`,
    render: (
      <Header>
        <HeaderGroup>
          <HeaderNavLink href="/" isActive>Home</HeaderNavLink>
        </HeaderGroup>
      </Header>
    )
  },
  {
    title: "Normal link",
    code: `<Header>
  <HeaderGroup>
    <HeaderNavLink href="/about">About</HeaderNavLink>
  </HeaderGroup>
</Header>`,
    render: (
      <Header>
        <HeaderGroup>
          <HeaderNavLink href="/about">About</HeaderNavLink>
        </HeaderGroup>
      </Header>
    )
  }
]

/* SEARCHBUTTON examples */
const searchButtonExamples = [
  {
    title: "Dropdown",
    code: `<SearchButton variant="dropdown" kbds={["⌘","K"]} queries={{ input: "Search…", emptyText: "No results", groups: [] }} />`,
    render: <SearchButton variant="dropdown" kbds={["⌘","K"]} queries={{ input: "Search…", emptyText: "No results", groups: [] }} />
  },
  {
    title: "Modal",
    code: `<SearchButton variant="modal" kbds={["⌘","P"]} queries={{ input: "Command or search…", emptyText: "No results", groups: [] }} />`,
    render: <SearchButton variant="modal" kbds={["⌘","P"]} queries={{ input: "Command or search…", emptyText: "No results", groups: [] }} />
  }
]

/* small button components examples */
const shareExamples = [{ title: "Share", code: `<ShareButton url="https://example.com" title="Example" />`, render: <ShareButton url="https://example.com" title="Example" /> }]
const rateExamples = [{ title: "Rate", code: `<RateButton />`, render: <RateButton /> }]
const notificationExamples = [{ title: "Notifications", code: `<NotificationButton />`, render: <NotificationButton /> }]
const settingsExamples = [{ title: "Settings", code: `<SettingsButton />`, render: <SettingsButton /> }]
const userExamples = [{ title: "User", code: `<UserButton />`, render: <UserButton /> }]
const menubarExamples = [{ title: "Menubar avatar", code: `<MenubarWithAvatar name="UIsy" avatar="/UIsyLogo.jpeg" rounded="full" />`, render: <MenubarWithAvatar name="Zander" avatar="/UIsyLogo.jpeg" rounded="full" /> }]

/* Props definitions used for tables */
const propsFor = {
  Header: [
    { prop: "children", type: "React.ReactNode", default: "<></>" },
    { prop: "justify", type: `"start" | "center" | "end" | "between" | "around" | "evenly"`, default: `"between"` },
    { prop: "className", type: "string", default: `""` },
    { prop: "zIndex", type: "number", default: "30" },
  ],
  HeaderGroup: [
    { prop: "children", type: "React.ReactNode", default: "<></>" },
    { prop: "position", type: `"left" | "center" | "right"`, default: `"left"` },
    { prop: "className", type: "string", default: `""` }
  ],
  HeaderItem: [
    { prop: "children", type: "React.ReactNode", default: "<></>" },
    { prop: "asChild", type: "boolean", default: "false" },
    { prop: "className", type: "string", default: `""` }
  ],
  HeaderLogo: [
    { prop: "children", type: "React.ReactNode", default: "<></>" },
    { prop: "Icon", type: "LucideIcon | string | null", default: "null" },
    { prop: "reversed", type: "boolean", default: "false" }
  ],
  HeaderNav: [
    { prop: "links", type: "NavLink[]", default: "[]" }
  ],
  HeaderNavLink: [
    { prop: "href", type: "string", default: '""' },
    { prop: "isActive", type: "boolean", default: "false" }
  ],
  SearchButton: [
    { prop: "variant", type: `"modal" | "dropdown"`, default: `"dropdown"` },
    { prop: "kbds", type: "string[]", default: "[]" }
  ],
  ShareButton: [
    { prop: "url", type: "string", default: "window.location.href" },
    { prop: "title", type: "string", default: "document.title" }
  ],
  RateButton: [{ prop: "className", type: "string", default: '""' }],
  NotificationButton: [{ prop: "className", type: "string", default: '""' }],
  ThemeToggle: [
    { prop: "theme", type: `"light" | "dark" | "system" | undefined`, default: "system" },
    { prop: "setTheme", type: "(theme) => void", default: "—" }
  ],
  SettingsButton: [{ prop: "className", type: "string", default: '""' }],
  UserButton: [{ prop: "className", type: "string", default: '""' }],
  MenubarWithAvatar: [
    { prop: "name", type: "string", default: '""' },
    { prop: "avatar", type: "string", default: '""' }
  ]
}

/* ---------------------------
   Render function: each section follows EXACTLY the template you asked for
   --------------------------- */
export function HeaderPage() {
  const [theme, setTheme] = React.useState<"light" | "dark" | "system">("system")

  return (
    <section className="w-[73vw] flex flex-col gap-12 h-full">

      {/* Top iframe + quick code */}
      <section className="gap-2 m-0 p-0 !bg-none w-[73vw] flex flex-row h-[80vh]" >
        <Card className="p-0 m-0 max-w-2/3 w-full h-full"><IFrameHeader /></Card>
        <Card className="m-0 p-0 max-w-1/3 w-full h-full">
          <CodeShowcase code={`import { Header, HeaderLogo, HeaderNav, HeaderGroup, SearchButton, ThemeToggle, MenubarWithAvatar } from "@/registry/uisydesign/blocks/header"`} />
        </Card>
      </section>

      {/* About */}
      <section>
        <h2 id="about" className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">About</h2>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          Take the stressors out of customizing your own custom header. Utilize reusable, plug-and-play components that adapt to your app.
        </p>
      </section>

      {/* Installation */}
      <section className="h-auto flex flex-col gap-4">
        <h2 id="installation" className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">Installation</h2>
        <CLIManualInstallation height={"screen"} CLI={<CDNInstall packageManager={"npm"} packageName={"https://uisy-design.vercel.app/r/header.json"} />} Manual={<><h1>Install the following dependencies:</h1></>} />
      </section>

      {/* ---------------- Header (exact template) ---------------- */}
      <section className="h-auto flex flex-col gap-4" id="Header">
        <h2 id="header" className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">Header</h2>
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Examples</h3>

        <section className="gap-2 m-0 p-0 !bg-none w-[73vw] flex flex-col h-[80vh] overflow-visible">
          <Carousel className="relative h-full w-full px-12">
            <CarouselContent className="w-full">
              {headerExamples.map((ex, i) => (
                <CarouselItem key={i} className="flex flex-col gap-4 h-full min-h-0">
                  <Card className="w-full overflow-hidden p-0">
                    {/* live render */}
                    <div className="p-0 m-0">{ex.render}</div>
                  </Card>
                  <Card className="m-0 p-0 w-full flex-1 min-h-0 overflow-hidden">
                    <div className="h-[60vh] overflow-auto">
                      <CodeShowcase code={ex.code} />
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-0" />
            <CarouselNext className="absolute right-0" />
          </Carousel>
        </section>

        {/* Interface */}
        <PropsTable name="Header" rows={propsFor.Header} />
      </section>

      {/* ---------------- HeaderGroup (same template) ---------------- */}
      <section className="h-auto flex flex-col gap-4" id="HeaderGroup">
        <h2 id="header-group" className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">HeaderGroup</h2>
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Examples</h3>

        <section className="gap-2 m-0 p-0 !bg-none w-[73vw] flex flex-col h-[80vh] overflow-visible">
          <Carousel className="relative h-full w-full px-12">
            <CarouselContent className="w-full">
              {headerGroupExamples.map((ex, i) => (
                <CarouselItem key={i} className="flex flex-col gap-4 h-full min-h-0">
                  <Card className="w-full overflow-hidden p-0">
                    <div className="p-4">{ex.render}</div>
                  </Card>
                  <Card className="m-0 p-0 w-full flex-1 min-h-0 overflow-hidden">
                    <div className="h-[60vh] overflow-auto">
                      <CodeShowcase code={ex.code} />
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-0" />
            <CarouselNext className="absolute right-0" />
          </Carousel>
        </section>

        <PropsTable name="HeaderGroup" rows={propsFor.HeaderGroup} />
      </section>

      {/* ---------------- HeaderItem ---------------- */}
      <section className="h-auto flex flex-col gap-4" id="HeaderItem">
        <h2 id="header-item" className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">Header Item</h2>
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Examples</h3>

        <section className="gap-2 m-0 p-0 !bg-none w-[73vw] flex flex-col h-[80vh] overflow-visible">
          <Carousel className="relative h-full w-full px-12">
            <CarouselContent className="w-full">
              {headerItemExamples.map((ex, i) => (
                <CarouselItem key={i} className="flex flex-col gap-4 h-full min-h-0">
                  <Card className="w-full overflow-hidden p-0">
                    <div className="p-4">{ex.render}</div>
                  </Card>
                  <Card className="m-0 p-0 w-full flex-1 min-h-0 overflow-hidden">
                    <div className="h-[60vh] overflow-auto">
                      <CodeShowcase code={ex.code} />
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-0" />
            <CarouselNext className="absolute right-0" />
          </Carousel>
        </section>

        <PropsTable name="HeaderItem" rows={propsFor.HeaderItem} />
      </section>

      {/* ---------------- HeaderLogo ---------------- */}
      <section className="h-auto flex flex-col gap-4" id="HeaderLogo">
        <h2 id="header-logo" className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">Header Logo</h2>
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Examples</h3>

        <section className="gap-2 m-0 p-0 !bg-none w-[73vw] flex flex-col h-[80vh] overflow-visible">
          <Carousel className="relative h-full w-full px-12">
            <CarouselContent className="w-full">
              {headerLogoExamples.map((ex, i) => (
                <CarouselItem key={i} className="flex flex-col gap-4 h-full min-h-0">
                  <Card className="w-full overflow-hidden p-0">
                    <div className="p-4">{ex.render}</div>
                  </Card>
                  <Card className="m-0 p-0 w-full flex-1 min-h-0 overflow-hidden">
                    <div className="h-[60vh] overflow-auto">
                      <CodeShowcase code={ex.code} />
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-0" />
            <CarouselNext className="absolute right-0" />
          </Carousel>
        </section>

        <PropsTable name="HeaderLogo" rows={propsFor.HeaderLogo} />
      </section>

      {/* ---------------- HeaderNav ---------------- */}
      <section className="h-auto flex flex-col gap-4" id="HeaderNav">
        <h2 id="header-nav" className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">Header Nav</h2>
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Examples</h3>

        <section className="gap-2 m-0 p-0 !bg-none w-[73vw] flex flex-col h-[80vh] overflow-visible">
          <Carousel className="relative h-full w-full px-12">
            <CarouselContent className="w-full">
              {headerNavExamples.map((ex, i) => (
                <CarouselItem key={i} className="flex flex-col gap-4 h-full min-h-0">
                  <Card className="w-full overflow-hidden p-0">
                    <div className="p-4">{ex.render}</div>
                  </Card>
                  <Card className="m-0 p-0 w-full flex-1 min-h-0 overflow-hidden">
                    <div className="h-[60vh] overflow-auto">
                      <CodeShowcase code={ex.code} />
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-0" />
            <CarouselNext className="absolute right-0" />
          </Carousel>
        </section>

        <PropsTable name="HeaderNav" rows={propsFor.HeaderNav} />
      </section>

      {/* ---------------- HeaderNavLink ---------------- */}
      <section className="h-auto flex flex-col gap-4" id="HeaderNavLink">
        <h2 id="header-nav-link" className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">Header Nav Link</h2>
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Examples</h3>

        <section className="gap-2 m-0 p-0 !bg-none w-[73vw] flex flex-col h-[80vh] overflow-visible">
          <Carousel className="relative h-full w-full px-12">
            <CarouselContent className="w-full">
              {headerNavLinkExamples.map((ex, i) => (
                <CarouselItem key={i} className="flex flex-col gap-4 h-full min-h-0">
                  <Card className="w-full overflow-hidden p-0">
                    <div className="p-4">{ex.render}</div>
                  </Card>
                  <Card className="m-0 p-0 w-full flex-1 min-h-0 overflow-hidden">
                    <div className="h-[60vh] overflow-auto">
                      <CodeShowcase code={ex.code} />
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-0" />
            <CarouselNext className="absolute right-0" />
          </Carousel>
        </section>

        <PropsTable name="HeaderNavLink" rows={propsFor.HeaderNavLink} />
      </section>

      {/* ---------------- Search Button ---------------- */}
      <section className="h-auto flex flex-col gap-4" id="Search Button">
        <h2 id="search-button" className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">Search Button</h2>
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Examples</h3>

        <section className="gap-2 m-0 p-0 !bg-none w-[73vw] flex flex-col h-[80vh] overflow-visible">
          <Carousel className="relative h-full w-full px-12">
            <CarouselContent className="w-full">
              {searchButtonExamples.map((ex, i) => (
                <CarouselItem key={i} className="flex flex-col gap-4 h-full min-h-0">
                  <Card className="w-full overflow-hidden p-0">
                    <div className="p-4">{ex.render}</div>
                  </Card>
                  <Card className="m-0 p-0 w-full flex-1 min-h-0 overflow-hidden">
                    <div className="h-[60vh] overflow-auto">
                      <CodeShowcase code={ex.code} />
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-0" />
            <CarouselNext className="absolute right-0" />
          </Carousel>
        </section>

        <PropsTable name="SearchButton" rows={propsFor.SearchButton} />
      </section>

      {/* ---------------- Share / Rate / Notification / Settings / User / Menubar */}
      <section className="h-auto flex flex-col gap-4" id="Share Button">
        <h2 id="share-button" className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">Share Button</h2>
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Examples</h3>

        <section className="gap-2 m-0 p-0 !bg-none w-[73vw] flex flex-col h-[80vh] overflow-visible">
          <Carousel className="relative h-full w-full px-12">
            <CarouselContent className="w-full">
              {shareExamples.map((ex, i) => (
                <CarouselItem key={i} className="flex flex-col gap-4 h-full min-h-0">
                  <Card className="w-full overflow-hidden p-0">
                    <div className="p-4">{ex.render}</div>
                  </Card>
                  <Card className="m-0 p-0 w-full flex-1 min-h-0 overflow-hidden">
                    <div className="h-[60vh] overflow-auto">
                      <CodeShowcase code={ex.code} />
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-0" />
            <CarouselNext className="absolute right-0" />
          </Carousel>
        </section>

        <PropsTable name="ShareButton" rows={propsFor.ShareButton} />
      </section>

      <section className="h-auto flex flex-col gap-4" id="Rate Button">
        <h2 id="rate-button" className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">Rate Button</h2>
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Examples</h3>

        <section className="gap-2 m-0 p-0 !bg-none w-[73vw] flex flex-col h-[80vh] overflow-visible">
          <Carousel className="relative h-full w-full px-12">
            <CarouselContent className="w-full">
              {rateExamples.map((ex, i) => (
                <CarouselItem key={i} className="flex flex-col gap-4 h-full min-h-0">
                  <Card className="w-full overflow-hidden p-0">
                    <div className="p-4">{ex.render}</div>
                  </Card>
                  <Card className="m-0 p-0 w-full flex-1 min-h-0 overflow-hidden">
                    <div className="h-[60vh] overflow-auto">
                      <CodeShowcase code={ex.code} />
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-0" />
            <CarouselNext className="absolute right-0" />
          </Carousel>
        </section>

        <PropsTable name="RateButton" rows={propsFor.RateButton} />
      </section>

      <section className="h-auto flex flex-col gap-4" id="Notification Button">
        <h2 id="notification-button" className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">Notification Button</h2>
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Examples</h3>

        <section className="gap-2 m-0 p-0 !bg-none w-[73vw] flex flex-col h-[80vh] overflow-visible">
          <Carousel className="relative h-full w-full px-12">
            <CarouselContent className="w-full">
              {notificationExamples.map((ex, i) => (
                <CarouselItem key={i} className="flex flex-col gap-4 h-full min-h-0">
                  <Card className="w-full overflow-hidden p-0">
                    <div className="p-4">{ex.render}</div>
                  </Card>
                  <Card className="m-0 p-0 w-full flex-1 min-h-0 overflow-hidden">
                    <div className="h-[60vh] overflow-auto">
                      <CodeShowcase code={ex.code} />
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-0" />
            <CarouselNext className="absolute right-0" />
          </Carousel>
        </section>

        <PropsTable name="NotificationButton" rows={propsFor.NotificationButton} />
      </section>

      <section className="h-auto flex flex-col gap-4" id="Theme Toggle">
        <h2 id="theme-toggle" className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">Theme Toggle</h2>
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Examples</h3>

        <section className="gap-2 m-0 p-0 !bg-none w-[73vw] flex flex-col h-[80vh] overflow-visible">
          <Carousel className="relative h-full w-full px-12">
            <CarouselContent className="w-full">
              <CarouselItem className="flex flex-col gap-4 h-full min-h-0">
                <Card className="w-full overflow-hidden p-0">
                  <div className="p-4">
                    <div className="mb-3 font-medium">Theme Toggle (click to cycle)</div>
                    <ThemeToggle theme={theme} setTheme={setTheme} />
                    <div className="mt-2 text-sm">Current: {theme}</div>
                  </div>
                </Card>
                <Card className="m-0 p-0 w-full flex-1 min-h-0 overflow-hidden">
                  <div className="h-[60vh] overflow-auto">
                    <CodeShowcase code={`<ThemeToggle theme={"${theme}"} setTheme={setTheme} />`} />
                  </div>
                </Card>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="absolute left-0" />
            <CarouselNext className="absolute right-0" />
          </Carousel>
        </section>

        <PropsTable name="ThemeToggle" rows={propsFor.ThemeToggle} />
      </section>

      <section className="h-auto flex flex-col gap-4" id="Settings Button">
        <h2 id="settings-button" className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">Settings Button</h2>
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Examples</h3>

        <section className="gap-2 m-0 p-0 !bg-none w-[73vw] flex flex-col h-[80vh] overflow-visible">
          <Carousel className="relative h-full w-full px-12">
            <CarouselContent className="w-full">
              {settingsExamples.map((ex, i) => (
                <CarouselItem key={i} className="flex flex-col gap-4 h-full min-h-0">
                  <Card className="w-full overflow-hidden p-0">
                    <div className="p-4">{ex.render}</div>
                  </Card>
                  <Card className="m-0 p-0 w-full flex-1 min-h-0 overflow-hidden">
                    <div className="h-[60vh] overflow-auto">
                      <CodeShowcase code={ex.code} />
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-0" />
            <CarouselNext className="absolute right-0" />
          </Carousel>
        </section>

        <PropsTable name="SettingsButton" rows={propsFor.SettingsButton} />
      </section>

      <section className="h-auto flex flex-col gap-4" id="User Button">
        <h2 id="user-button" className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">User Button</h2>
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Examples</h3>

        <section className="gap-2 m-0 p-0 !bg-none w-[73vw] flex flex-col h-[80vh] overflow-visible">
          <Carousel className="relative h-full w-full px-12">
            <CarouselContent className="w-full">
              {userExamples.map((ex, i) => (
                <CarouselItem key={i} className="flex flex-col gap-4 h-full min-h-0">
                  <Card className="w-full overflow-hidden p-0">
                    <div className="p-4">{ex.render}</div>
                  </Card>
                  <Card className="m-0 p-0 w-full flex-1 min-h-0 overflow-hidden">
                    <div className="h-[60vh] overflow-auto">
                      <CodeShowcase code={ex.code} />
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-0" />
            <CarouselNext className="absolute right-0" />
          </Carousel>
        </section>

        <PropsTable name="UserButton" rows={propsFor.UserButton} />
      </section>

      <section className="h-auto flex flex-col gap-4" id="Menubar With Avatar">
        <h2 id="menubar-with-avatar" className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">Menubar With Avatar</h2>
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Examples</h3>

        <section className="gap-2 m-0 p-0 !bg-none w-[73vw] flex flex-col h-[80vh] overflow-visible">
          <Carousel className="relative h-full w-full px-12">
            <CarouselContent className="w-full">
              {menubarExamples.map((ex, i) => (
                <CarouselItem key={i} className="flex flex-col gap-4 h-full min-h-0">
                  <Card className="w-full overflow-hidden p-0">
                    <div className="p-4">{ex.render}</div>
                  </Card>
                  <Card className="m-0 p-0 w-full flex-1 min-h-0 overflow-hidden">
                    <div className="h-[60vh] overflow-auto">
                      <CodeShowcase code={ex.code} />
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-0" />
            <CarouselNext className="absolute right-0" />
          </Carousel>
        </section>

        <PropsTable name="MenubarWithAvatar" rows={propsFor.MenubarWithAvatar} />
      </section>
    </section>
  )
}
