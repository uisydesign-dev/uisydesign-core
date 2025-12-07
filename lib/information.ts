import { Shield, Rocket, Crown } from "lucide-react";

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
          { title: "Buttons", path: "/components/buttons" },
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
