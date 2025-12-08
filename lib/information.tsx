import React from "react";
import { Shield, Rocket, Crown } from "lucide-react";
import { Card } from "@/components/ui/card";
import IFrameHeader from "@/app/iframes/components/Header";
import { CodeShowcase } from "@/registry/uisydesign/blocks/code-editor";

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
}

export const COMPONENTS: Record<string, ComponentsPage> = {
  "components/header": {
    title: "Header",
    description:
      "Take the stressors out of customizing your own custom header. Utilize reusable, plug-and-play components that adapt to your app, so you can build your own app instead of reinventing the wheel.",
    html: <section className="w-full flex flex-col gap-2 h-full">
      <section className="gap-2 m-0 p-0 !bg-none w-[80vw] flex flex-row h-[80vh]" >
        <Card className="p-0 m-0 max-w-2/3 h-full">
          <IFrameHeader/>
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
          }/>
        </Card>
      </section>
    </section>,
  },
};


