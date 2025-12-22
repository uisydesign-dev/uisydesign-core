import React from "react";
import { Shield, Rocket, Crown } from "lucide-react";
import IFrameHeader from "@/app/iframes/components/Header";
import { CodeShowcase } from "@/registry/uisydesign/blocks/code-editor";
import { Card } from "@/components/ui/card";
import CLIManualInstallation, { CDNInstall } from "@/registry/uisydesign/blocks/installer";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export const DATA = {
  title: "UIsy Design",
  sections: {
    docs: [
      {
        name: "Get Started",
        logo: Rocket,
        color: "#AC23C7",
        tableOfContents: [
          { title: "Introduction", path: "/get-started/introduction" },
          { title: "Installation", path: "/get-started/installation" },
          { title: "First Steps", path: "/get-started/first-steps" },
          { title: "Create Project", path: "/get-started/first-steps#create-project" },
        ],
      },
      {
        name: "Components",
        logo: Shield,
        color: "#B41ACF",
        tableOfContents: [
          { title: "Overview", path: "/components/" },
          { title: "Header", path: "/components/header" },
          { title: "Inputs", path: "/components/inputs" },
          { title: "Cards", path: "/components/cards" },
          { title: "Basic", path: "/components/cards/basic" },
          { title: "Advanced", path: "/components/cards/advanced" },
        ],
      },
      {
        name: "Templates",
        logo: Crown,
        color: "#8E1BE3",
        tableOfContents: [
          { title: "Landing Page", path: "/templates/landing-page" },
          { title: "Dashboard", path: "/templates/dashboard" },
          { title: "Profile Page", path: "/templates/profile-page" },
        ],
      },
    ],
  },
};

interface ComponentsPage {
  title: string;
  description: string;
  html: React.JSX.Element
  ids: string[]
}

export const COMPONENTS: Record<string, ComponentsPage> = {
  "components/header": {
    title: "Header",
    ids: [
      "about",
      "installation",
      "Header",
      "Header Group",
      "Header Item",
      "Header Logo",
      "Header Nav",
      "Header Nav Link",
      "Search Button",
      "Share Button",
      "Rate Button",
      "Notification Button",
      "Theme Toggle",
      "Settings Button",
      "User Button",
      "Menubar With Avatar"
    ],
    description:
      "Simplify the website creation process by using a custom plug-and-play header.",
    html: <section className="w-[73vw] flex flex-col gap-12 h-full">
      <section className="gap-2 m-0 p-0 !bg-none w-[73vw] flex flex-row h-[80vh]" >
        <Card className="p-0 m-0 max-w-2/3 w-full h-full">
          <IFrameHeader />
        </Card>
        <Card className="m-0 p-0 max-w-1/3 w-full h-full">
          <CodeShowcase code={
            `import { Header, HeaderLogo, HeaderNav, HeaderGroup, SearchButton, ThemeToggle, MenubarWithAvatar } from "@/registry/uisydesign/blocks/header"
import { Building2 } from "lucide-react";

export default function IFrameHeader() {

    return <section className="w-full h-full">
        <Header justify="between">
            <HeaderGroup>
                <HeaderLogo Icon={Building2} reversed>
                    Acme
                </HeaderLogo>
                <HeaderNav
                    links={[
                        {
                            label: "Home",
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
                            href: "/",
                            label: "Home",
                        },
                    ]}
                />
            </HeaderGroup>
            <HeaderGroup>
                <SearchButton kbds={["⌘", "K"]} className="!max-w-[200px]" />
                <MenubarWithAvatar rounded={"full"} name={"UIsy"} avatar={"/UIsyLogo.jpeg"} />
            </HeaderGroup>
        </Header>

    </section>

}`
          } />
        </Card>
      </section>
      <section>
        <h2 id="about" className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          About
        </h2>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          Take the stressors out of customizing your own custom header. Utilize reusable, plug-and-play components that adapt to your app, so you can build your own app instead of reinventing the wheel.
        </p>
      </section>
      <section className="h-auto flex flex-col gap-4">
        <h2 id="installation" className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Installation
        </h2>
        <CLIManualInstallation height={"screen"} CLI={<>
          <CDNInstall packageManager={"npm"} packageName={"https://uisy-design.vercel.app/r/header.json"} />

        </>} Manual={<>
          <h1>Install the following dependencies:</h1>
        </>} />
      </section>
      <section className="h-auto flex flex-col gap-4">
        <h2 id="header" className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Header
        </h2>
        <Table>
          <TableCaption>An interface of the Header object.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Prop</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Default</TableHead>
              <TableHead>Is Optional</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>children</TableCell>
              <TableCell>React.ReactNode</TableCell>
              <TableCell>{"<></>"}</TableCell>
              <TableCell><Checkbox defaultChecked disabled /></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>justify</TableCell>
              <TableCell>{"\"start\" | \"center\" | \"end\" | \"between\" | \"around\" | \"evenly\""}</TableCell>
              <TableCell>{"\"between\""}</TableCell>
              <TableCell><Checkbox defaultChecked disabled /></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>className</TableCell>
              <TableCell>{"string"}</TableCell>
              <TableCell>{"\"\""}</TableCell>
              <TableCell><Checkbox defaultChecked disabled /></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>zIndex</TableCell>
              <TableCell>{"number"}</TableCell>
              <TableCell>{"30"}</TableCell>
              <TableCell><Checkbox defaultChecked disabled /></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>

      <section className="h-auto flex flex-col gap-4">
        <h2 id="header-group" className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Header Group
        </h2>
        <Table>
          <TableCaption>An interface of the Header Group object.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Prop</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Default</TableHead>
              <TableHead>Is Optional</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>children</TableCell>
              <TableCell>React.ReactNode</TableCell>
              <TableCell>{"<></>"}</TableCell>
              <TableCell><Checkbox defaultChecked disabled /></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>position</TableCell>
              <TableCell>{"\"left\" | \"center\" | \"right\""}</TableCell>
              <TableCell>{"\"left\""}</TableCell>
              <TableCell><Checkbox defaultChecked disabled /></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>className</TableCell>
              <TableCell>{"string"}</TableCell>
              <TableCell>{"\"\""}</TableCell>
              <TableCell><Checkbox defaultChecked disabled /></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>

      <section className="h-auto flex flex-col gap-4">
        <h2 id="header-item" className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Header Item
        </h2>
        <Table>
          <TableCaption>An interface of the Header Item object.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Prop</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Default</TableHead>
              <TableHead>Is Optional</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>children</TableCell>
              <TableCell>React.ReactNode</TableCell>
              <TableCell>{"<></>"}</TableCell>
              <TableCell><Checkbox defaultChecked disabled /></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>asChild</TableCell>
              <TableCell>{"boolean"}</TableCell>
              <TableCell>{"false"}</TableCell>
              <TableCell><Checkbox defaultChecked disabled /></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>className</TableCell>
              <TableCell>{"string"}</TableCell>
              <TableCell>{"\"\""}</TableCell>
              <TableCell><Checkbox defaultChecked disabled /></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>

      <section className="h-auto flex flex-col gap-4">
        <h2 id="header-logo" className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Header Logo
        </h2>
        <Table>
          <TableCaption>An interface of the Header Logo object.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Prop</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Default</TableHead>
              <TableHead>Is Optional</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>children</TableCell>
              <TableCell>React.ReactNode</TableCell>
              <TableCell>{"<></>"}</TableCell>
              <TableCell><Checkbox defaultChecked disabled /></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>position</TableCell>
              <TableCell>{"\"left\" | \"center\" | \"right\""}</TableCell>
              <TableCell>{"\"left\""}</TableCell>
              <TableCell><Checkbox defaultChecked disabled /></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>className</TableCell>
              <TableCell>{"string"}</TableCell>
              <TableCell>{"\"\""}</TableCell>
              <TableCell><Checkbox defaultChecked disabled /></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>

      <section className="h-auto flex flex-col gap-4">
        <h2 id="header-nav" className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Header Nav
        </h2>
        <Tabs defaultValue="1" className="w-full">
          <TabsList>
            <TabsTrigger value="1">HeaderNavProps</TabsTrigger>
            <TabsTrigger value="2">NavLink</TabsTrigger>
            <TabsTrigger value="3">FeaturedItem</TabsTrigger>
            <TabsTrigger value="4">MenuItem</TabsTrigger>
          </TabsList>
          <TabsContent value="1">
            <Table>
              <TableCaption>An interface of the HeaderNavProps object.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Prop</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Default</TableHead>
                  <TableHead>Is Optional</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>children</TableCell>
                  <TableCell>{"React.ReactNode"}</TableCell>
                  <TableCell>{"<></>"}</TableCell>
                  <TableCell><Checkbox disabled defaultChecked /></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>links</TableCell>
                  <TableCell>{"NavLink[]"}</TableCell>
                  <TableCell>{"[]"}</TableCell>
                  <TableCell><Checkbox disabled defaultChecked /></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TabsContent>
          <TabsContent value="2">
            <Table>
              <TableCaption>An interface of the NavLink object.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Prop</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Default</TableHead>
                  <TableHead>Is Optional</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>href</TableCell>
                  <TableCell>string</TableCell>
                  <TableCell>{"\"\""}</TableCell>
                  <TableCell><Checkbox defaultChecked disabled /></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>label</TableCell>
                  <TableCell>string</TableCell>
                  <TableCell>{"\"\""}</TableCell>
                  <TableCell><Checkbox disabled /></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>isActive</TableCell>
                  <TableCell>boolean</TableCell>
                  <TableCell>{"false"}</TableCell>
                  <TableCell><Checkbox disabled defaultChecked /></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>layout</TableCell>
                  <TableCell>{"\"single\", \"double\", \"triple\""}</TableCell>
                  <TableCell>{"single"}</TableCell>
                  <TableCell><Checkbox disabled defaultChecked /></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>featured</TableCell>
                  <TableCell>{"FeaturedItem"}</TableCell>
                  <TableCell>{"{ href: \"\", title: \"\", description: \"\"}"}</TableCell>
                  <TableCell><Checkbox disabled defaultChecked /></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>items</TableCell>
                  <TableCell>{"MenuItem[]"}</TableCell>
                  <TableCell>{"[]"}</TableCell>
                  <TableCell><Checkbox disabled defaultChecked /></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>width</TableCell>
                  <TableCell>{"string"}</TableCell>
                  <TableCell>{"\"\""}</TableCell>
                  <TableCell><Checkbox disabled defaultChecked /></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>showIcon</TableCell>
                  <TableCell>{"boolean"}</TableCell>
                  <TableCell>{"false"}</TableCell>
                  <TableCell><Checkbox disabled defaultChecked /></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TabsContent>
          <TabsContent value="3">
            <Table>
              <TableCaption>An interface of the FeaturedItem object.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Prop</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Default</TableHead>
                  <TableHead>Is Optional</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>href</TableCell>
                  <TableCell>string</TableCell>
                  <TableCell>{"\"\""}</TableCell>
                  <TableCell><Checkbox disabled /></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>title</TableCell>
                  <TableCell>string</TableCell>
                  <TableCell>{"\"\""}</TableCell>
                  <TableCell><Checkbox disabled /></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>description</TableCell>
                  <TableCell>string</TableCell>
                  <TableCell>{"\"\""}</TableCell>
                  <TableCell><Checkbox disabled defaultChecked /></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TabsContent>
          <TabsContent value="4">
            <Table>
              <TableCaption>An interface of the MenuItem object.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Prop</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Default</TableHead>
                  <TableHead>Is Optional</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>title</TableCell>
                  <TableCell>string</TableCell>
                  <TableCell>{"\"\""}</TableCell>
                  <TableCell><Checkbox disabled /></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>href</TableCell>
                  <TableCell>string</TableCell>
                  <TableCell>{"\"\""}</TableCell>
                  <TableCell><Checkbox disabled /></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>description</TableCell>
                  <TableCell>string</TableCell>
                  <TableCell>{"\"\""}</TableCell>
                  <TableCell><Checkbox disabled defaultChecked /></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>icon</TableCell>
                  <TableCell>LucideIcon</TableCell>
                  <TableCell>{"\"\""}</TableCell>
                  <TableCell><Checkbox disabled defaultChecked /></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>




      </section>

      <section className="h-auto flex flex-col gap-4">
        <h2 id="header-nav-link" className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Header Nav Link
        </h2>
      </section>

      <section className="h-auto flex flex-col gap-4">
        <h2 id="search-button" className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Search Button
        </h2>
      </section>

      <section className="h-auto flex flex-col gap-4">
        <h2 id="share-button" className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Share Button
        </h2>
      </section>

      <section className="h-auto flex flex-col gap-4">
        <h2 id="rate-button" className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Rate Button
        </h2>
      </section>

      <section className="h-auto flex flex-col gap-4">
        <h2 id="notification-button" className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Notification Button
        </h2>
      </section>

      <section className="h-auto flex flex-col gap-4">
        <h2 id="theme-toggle" className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Theme Toggle
        </h2>
      </section>

      <section className="h-auto flex flex-col gap-4">
        <h2 id="settings-button" className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Settings Button
        </h2>
      </section>

      <section className="h-auto flex flex-col gap-4">
        <h2 id="user-button" className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          User Button
        </h2>
      </section>

      <section className="h-auto flex flex-col gap-4">
        <h2 id="menubar-with-avatar" className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Menubar With Avatar
        </h2>
      </section>

    </section>,
  },
};


