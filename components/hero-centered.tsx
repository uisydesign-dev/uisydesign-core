import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HeroCentered() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-20">
      <div className="mx-auto max-w-4xl text-center">
        <div className="mb-6 inline-block rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground">
          Introducing Our Latest Innovation
        </div>

        <h1 className="mb-6 text-balance font-sans text-5xl font-bold leading-tight tracking-tight text-foreground md:text-6xl ">
          {"A little bit of everything. That's what makes UI so easy. UIsy."}
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
          {
            "Create stunning digital products with our powerful tools and intuitive design system. Everything you need to bring your vision to life."
          }
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="lg" className="group">
            {"Get Started"}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button size="lg" variant="outline">
            {"Learn More"}
          </Button>
        </div>

        <div className="mt-16 flex items-center justify-center gap-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-primary"></div>
            <span>{"No credit card required"}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-primary"></div>
            <span>{"14-day free trial"}</span>
          </div>
        </div>
      </div>

      {/* Decorative background elements */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-accent/10 blur-3xl"></div>
      </div>
    </section>
  )
}
