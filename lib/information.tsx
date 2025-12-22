import React from "react";
import { Shield, Rocket, Crown, BookOpen, LayoutGrid, Puzzle, Sparkles, Terminal } from "lucide-react";
import {HeaderPage} from "./pages/docs/components/componentspage";

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
    html: <HeaderPage/>,
  },
};


