import React from "react";
import { Shield, Rocket, Crown } from "lucide-react";
import { Card } from "@/components/ui/card";
import IFrameHeader from "@/app/iframes/components/Header";

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
      <section className="gap-2 m-0 p-0 !bg-none w-full flex flex-row h-[80vh]" >
        <Card className="w-2/3 h-full">
          <IFrameHeader/>
        </Card>
        <Card className="w-1/3 h-full"></Card>
      </section>
    </section>,
  },
};


