import { Header, HeaderLogo, HeaderNav, HeaderGroup, SearchButton, MenubarWithAvatar } from "@/registry/uisydesign/blocks/header"
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

}