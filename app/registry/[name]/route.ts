import { registry } from "@/registry"

export async function GET(request: Request, { params }: { params: Promise<{ name: string }> }) {
  const { name } = await params
  const component = registry.find((item) => item.name === name)

  if (!component) {
    return Response.json({ error: "Component not found" }, { status: 404 })
  }

  return Response.json(component)
}
