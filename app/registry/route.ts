import { registry } from "@/registry"

export async function GET() {
  return Response.json(registry)
}
