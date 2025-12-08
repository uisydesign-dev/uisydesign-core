import type { Registry } from "@/registry/schema"

export const registry: Registry = [
  {
    name: "header",
    type: "block",
    description: "A comprehensive header component system with multiple variants",
    registryDependencies: ["navigation-menu", "input", "dropdown-menu"],
    files: [
      {
        path: "registry/new-york/blocks/header/index.tsx",
        content: "",
        type: "text/typescript",
        target: "components/ui/header.tsx",
        name: "Header",
      },
    ],
  },
];
