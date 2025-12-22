import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { useState } from "react"
import { Check, Copy } from "lucide-react"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area";

export default function CLIManualInstallation({
  CLI,
  Manual,
  height = "screen",
  className
}: {
  CLI: React.JSX.Element
  Manual: React.JSX.Element
  className?: string,
  height?:
  | "auto"
  | "px"
  | "0"
  | "0.5"
  | "1"
  | "1.5"
  | "2"
  | "2.5"
  | "3"
  | "3.5"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "11"
  | "12"
  | "14"
  | "16"
  | "20"
  | "24"
  | "28"
  | "32"
  | "36"
  | "40"
  | "44"
  | "48"
  | "52"
  | "56"
  | "60"
  | "64"
  | "72"
  | "80"
  | "96"
  | "screen"
  | "svh"
  | "lvh"
  | "dvh"
  | "min"
  | "max"
  | "fit"
  | "full"
  | "min-content"
  | "max-content"
  | "auto"

}) {
  const [mode, setMode] = useState<"cli" | "manual">("cli");

  return <Card className={cn("mt-2 !bg-none border-0 shadow-none", `min-h-${height}`)}>
    <CardContent className="w-full flex flex-row gap-2">
      <Card className="w-[15%] !bg-none border-0 shadow-none">
        <CardContent className="flex flex-col justify-center align-top gap-2">
          <Button className="rounded-3xl w-full" variant={"link"} size={"lg"} onClick={() => setMode("cli")}>CLI</Button>
          <Button className="rounded-3xl w-full" variant={"link"} size={"lg"} onClick={() => setMode("manual")}>Manual</Button>
        </CardContent>
      </Card>
      <Card className={cn(`w-[85%] min-h-${height}`, className)}>
        <CardHeader>
          <CardTitle className="text-2xl">{mode == "cli" ? "CLI" : "Manual Installation"}</CardTitle>
        </CardHeader>
        <ScrollArea className={cn(`w-[95%] flex flex-col gap-4 mx-auto h-${height}`, className)}>
          {
            mode == "cli" ? CLI : Manual
          }
        </ScrollArea>
      </Card>
    </CardContent>
  </Card>
}


type PackageManager = "pnpm" | "npm" | "yarn" | "bun"

interface CDNInstallProps {
  packageManager: PackageManager
  packageName: string
}



const packageManagers: PackageManager[] = ["pnpm", "npm", "yarn", "bun"]

export function CDNInstall({ packageManager, packageName }: CDNInstallProps) {
  const [selectedPM, setSelectedPM] = useState<PackageManager>(packageManager)
  const [copied, setCopied] = useState(false)

  const commands: Record<PackageManager, string> = {
    pnpm: `pnpm add ${packageName}`,
    npm: `npm install ${packageName}`,
    yarn: `yarn add ${packageName}`,
    bun: `bun add ${packageName}`,
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(commands[selectedPM])
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="w-full">
      {/* Package Manager Selector */}
      <div className="relative flex items-center gap-2 rounded-t-xl bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800 p-3 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent rounded-t-xl pointer-events-none" />

        {/* Terminal Icon */}
        <div className="flex items-center gap-1.5 pl-1">
          <div className="size-3 rounded-full bg-red-500/80 shadow-[0_0_8px_rgba(239,68,68,0.4)]" />
          <div className="size-3 rounded-full bg-yellow-500/80 shadow-[0_0_8px_rgba(234,179,8,0.4)]" />
          <div className="size-3 rounded-full bg-emerald-500/80 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
        </div>

        {/* Package Manager Tabs */}
        <div className="flex items-center gap-1 ml-auto">
          {packageManagers.map((pm) => (
            <button
              key={pm}
              onClick={() => setSelectedPM(pm)}
              className={cn(
                "relative px-3 py-1.5 text-sm font-medium transition-all duration-300 rounded-lg",
                "hover:text-white/90",
                selectedPM === pm ? "text-emerald-400" : "text-zinc-500 hover:text-zinc-300",
              )}
            >
              {selectedPM === pm && (
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-teal-500/10 to-transparent rounded-lg shadow-[inset_0_1px_2px_rgba(255,255,255,0.1)] animate-in fade-in duration-300" />
              )}
              <span className="relative z-10">{pm}</span>
              {selectedPM === pm && (
                <div className="absolute inset-0 rounded-lg shadow-[0_0_20px_rgba(16,185,129,0.3)] animate-in fade-in duration-300" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Command Display */}
      <div className="relative group rounded-b-xl bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 p-6 shadow-2xl border-t border-white/5">
        {/* Subtle grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.015] rounded-b-xl pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
            backgroundSize: "20px 20px",
          }}
        />

        {/* Animated gradient glow */}
        <div className="absolute -inset-[1px] bg-gradient-to-r from-emerald-500/0 via-emerald-500/10 to-emerald-500/0 rounded-b-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />

        <div className="relative flex items-center justify-between gap-4">
          {/* Command Text */}
          <code
            className="font-mono text-base text-zinc-100 tracking-wide animate-in fade-in slide-in-from-left-2 duration-500"
            key={selectedPM}
          >
            <span className="text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]">{selectedPM}</span>
            <span className="text-zinc-400 mx-2">{commands[selectedPM].replace(selectedPM, "").trim()}</span>
          </code>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className={cn(
              "relative flex items-center justify-center size-10 rounded-lg transition-all duration-300",
              "bg-white/5 hover:bg-white/10",
              "border border-white/10 hover:border-white/20",
              "shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(16,185,129,0.3)]",
              "hover:scale-105 active:scale-95",
              copied && "bg-emerald-500/20 border-emerald-500/50",
            )}
          >
            {copied ? (
              <Check className="size-4 text-emerald-400 animate-in zoom-in duration-300" />
            ) : (
              <Copy className="size-4 text-zinc-400 group-hover:text-zinc-200 transition-colors" />
            )}

            {/* Ripple effect on click */}
            {copied && <div className="absolute inset-0 rounded-lg bg-emerald-400/20 animate-ping" />}
          </button>
        </div>

        {/* Bottom shine effect */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
    </div>
  )
}
