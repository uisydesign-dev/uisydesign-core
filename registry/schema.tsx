import { z } from "zod"

export const registryItemFileSchema = z.object({
  name: z.string(),
  path: z.string(),
  content: z.string().optional(),
  type: z.enum(["text/typescript", "text/jsx", "text/css"]).optional(),
  target: z.string().optional(),
})

export const registryItemSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  type: z.enum(["block", "component", "example"]),
  registryDependencies: z.array(z.string()).optional(),
  dependencies: z.array(z.string()).optional(),
  files: z.array(registryItemFileSchema),
  category: z.string().optional(),
  subcategory: z.string().optional(),
})

export const registrySchema = z.array(registryItemSchema)

export type Registry = z.infer<typeof registrySchema>
export type RegistryItem = z.infer<typeof registryItemSchema>
export type RegistryItemFile = z.infer<typeof registryItemFileSchema>
