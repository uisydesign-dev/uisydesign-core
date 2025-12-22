"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { Bell, Computer, Moon, Search, Settings, Share2, Star, Sun, User, type LucideIcon } from "lucide-react"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { useIsMobile } from "@/hooks/use-mobile"
import Link from "next/link"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@radix-ui/react-dropdown-menu"
import { Input } from "../../ui/input"
import { Kbd, KbdGroup } from "@/components/ui/kbd"
import { Card } from "@/components/ui/card"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { Button } from "@/components/ui/button"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import * as LucideIcons from "lucide-react";
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"

// --- Header ---
export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly"
  className?: string,
  zIndex?: number
}

const Header = React.forwardRef<HTMLElement, HeaderProps>(({ children, zIndex = 30, className, justify = "between", ...props }, ref) => {
  const justifyClasses: Record<NonNullable<HeaderProps["justify"]>, string> = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
    between: "justify-between",
    around: "justify-around",
    evenly: "justify-evenly",
  }

  return (
    <header
      ref={ref}
      className={cn(
        "flex relative rounded-bl-xl rounded-br-xl gap-4 items-center px-6 py-3 border-b border-gray-200 bg-white dark:bg-black dark:border-gray-700",
        justifyClasses[justify],
        `z-[${zIndex}]`,
        className
      )}
      {...props}
    >
      {children}
    </header>
  )
})

// --- HeaderGroup ---
export interface HeaderGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  position?: "left" | "center" | "right"
  className?: string
}

const HeaderGroup = React.forwardRef<HTMLDivElement, HeaderGroupProps>(({ children, className, position = "left", ...props }, ref) => {
  const positionClasses = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
  }

  return (
    <div ref={ref} className={cn("flex relative items-center gap-4", positionClasses[position], className)} {...props}>
      {children}
    </div>
  )
})

// --- HeaderItem ---
export interface HeaderItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  asChild?: boolean
  className?: string
}

const HeaderItem = React.forwardRef<HTMLDivElement, HeaderItemProps>(({ children, className, asChild, ...props }, ref) => {
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      className: cn((children as React.ReactElement<any>).props.className, className),
      ref,
      ...props,
    })
  }

  return (
    <div ref={ref} className={cn("flex items-center", className)} {...props}>
      {children}
    </div>
  )
})

// --- HeaderLogo ---
export interface HeaderLogoProps extends React.HTMLAttributes<HTMLAnchorElement> {
  href?: string
  Icon?: LucideIcon | string | null
  reversed?: boolean
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full"
  className?: string
}

const HeaderLogo = React.forwardRef<HTMLAnchorElement, HeaderLogoProps>(
  ({ children, className, href = "/", Icon, reversed = false, rounded = "md", ...props }, ref) => {
    return (
      <a
        ref={ref}
        href={href}
        className={cn(`flex ${reversed ? "items-end" : "items-start"} items-center gap-2 text-lg font-bold`, className)}
        {...props}
      >
        {Icon && typeof Icon === "string" ? (
          <img src={Icon || "/placeholder.svg"} alt="" className={`size-8 rounded-${rounded} shadow-xl border-0`} />
        ) : (
          Icon && <Icon className="h-6 w-6" />
        )}
        {children}
      </a>
    )
  }
)

export interface MenuItem {
  title: string
  href: string
  description?: string
  icon?: LucideIcon
}

export interface FeaturedItem {
  href: string
  title: string
  description: string
}

export interface NavLink {
  href?: string
  label: string
  isActive?: boolean
  layout?: "single" | "double" | "featured"
  featured?: FeaturedItem
  items?: MenuItem[]
  width?: string
  showIcon?: boolean
}

export interface HeaderNavProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode
  links?: NavLink[]
}

const HeaderNav: React.FC<HeaderNavProps> = ({ children, className, links, ...props }) => {
  const isMobile = useIsMobile()

  return (
    <NavigationMenu
      viewport={isMobile}
      className={cn("hidden md:flex z-30 items-center gap-6", className)}
      {...(props as { className?: string; viewport?: boolean })}
    >
      <NavigationMenuList className="flex flex-wrap gap-4">
        {links
          ? links.map((link, index) => {
            // Simple link without dropdown
            if (!link.layout && link.href) {
              return (
                <NavigationMenuItem key={index}>
                  <NavigationMenuLink

                    className={cn(
                      navigationMenuTriggerStyle(),
                      link.isActive ? "text-primary" : "text-muted-foreground"
                    )}
                  >
                    <Link href={link.href}>{link.label}</Link>                  </NavigationMenuLink>
                </NavigationMenuItem>
              )
            }

            // Link with dropdown menu
            return (
              <NavigationMenuItem key={index}>
                <NavigationMenuTrigger>{link.label}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  {link.layout === "featured" && link.featured && link.items ? (
                    <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <a
                            className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-4 no-underline outline-hidden transition-all duration-200 select-none focus:shadow-md md:p-6"
                            href={link.featured.href}
                          >
                            <div className="mb-2 text-lg font-medium sm:mt-4">
                              {link.featured.title}
                            </div>
                            <p className="text-muted-foreground text-sm leading-tight">
                              {link.featured.description}
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      {link.items.map((item) => (
                        <ListItem key={item.title} href={item.href} title={item.title}>
                          {item.description}
                        </ListItem>
                      ))}
                    </ul>
                  ) : link.layout === "double" && link.items ? (
                    <ul className="grid gap-2 sm:w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {link.items.map((item) => (
                        <ListItem key={item.title} title={item.title} href={item.href}>
                          {item.description}
                        </ListItem>
                      ))}
                    </ul>
                  ) : link.layout === "single" && link.items ? (
                    <ul className={cn("grid gap-4", link.width || "w-[200px]")}>
                      <li>
                        {link.items.map((item) => (
                          <NavigationMenuLink asChild key={item.title}>
                            <Link
                              href={item.href}
                              className={cn(link.showIcon && item.icon && "flex items-center gap-2")}
                            >
                              {link.showIcon && item.icon && <item.icon className="h-4 w-4" />}
                              {item.description ? (
                                <>
                                  <div className="font-medium">{item.title}</div>
                                  <div className="text-muted-foreground text-sm">{item.description}</div>
                                </>
                              ) : (
                                item.title
                              )}
                            </Link>
                          </NavigationMenuLink>
                        ))}
                      </li>
                    </ul>
                  ) : null}
                </NavigationMenuContent>
              </NavigationMenuItem>
            )
          })
          : children}
      </NavigationMenuList>
    </NavigationMenu>
  )
}


// --- ListItem helper ---
function ListItem({ title, children, href, ...props }: React.ComponentPropsWithoutRef<"li"> & { href: string; title?: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          {title && <div className="text-sm leading-none font-medium">{title}</div>}
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">{children}</p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}

// --- HeaderNavLink ---
export interface HeaderNavLinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
  href: string
  isActive?: boolean
  className?: string
}

const HeaderNavLink = React.forwardRef<HTMLAnchorElement, HeaderNavLinkProps>(
  ({ children, className, href, isActive, ...props }, ref) => {
    return (
      <a
        ref={ref}
        href={href}
        className={cn("text-sm font-medium transition-colors hover:text-primary", isActive ? "text-primary" : "text-muted-foreground", className)}
        {...props}
      >
        {children}
      </a>
    )
  }
)

// --- Generic buttons ---
export interface GenericButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
}

export interface SearchButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  onSearch?: (query: string) => void
  kbds?: string[]
  className?: string
  variant?: "modal" | "dropdown"
  queries: Queries
}

export interface CommandShortcut {
  content: string;
}

export interface CommandItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  shortcut?: CommandShortcut;
}

export interface CommandGroup {
  heading: string;
  items: CommandItem[];
}

export interface Queries {
  emptyText: string;
  input: string;
  groups: CommandGroup[];
}

const SearchButton = React.forwardRef<HTMLDivElement, SearchButtonProps>(
  (
    {
      onSearch,
      kbds = [],
      className,
      variant = "dropdown",
      queries = { emptyText: "", input: "", groups: [] },
      ...props
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false)
    const [query, setQuery] = React.useState("")
    const containerRef = React.useRef<HTMLDivElement | null>(null)

    const handleSearch = (value: string) => {
      if (!value) return
      onSearch?.(value)
      setOpen(false)
    }

    /* -------------------- FILTER LOGIC -------------------- */
    const filteredGroups = React.useMemo(() => {
      const q = query.trim().toLowerCase()
      if (!q) return queries.groups

      return queries.groups
        .map((group) => ({
          ...group,
          items: group.items.filter((item) => {
            const haystack = [
              item.label,
              item.shortcut?.content,
            ]
              .join(" ")
              .toLowerCase()

            return haystack.includes(q)
          }),
        }))
        .filter((group) => group.items.length > 0)
    }, [query, queries.groups])

    React.useEffect(() => {
      if (!open) return
    
      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          setOpen(false)
        }
      }
    
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [open])
    

    /* -------------------- DROPDOWN VARIANT -------------------- */
    if (variant === "dropdown") {
      return (
        <div
          ref={(node) => {
            containerRef.current = node
            if (typeof ref === "function") ref(node)
            else if (ref) ref.current = node
          }}
          className={cn("relative w-full max-w-sm", className)}
          {...props}
        >
          {/* INPUT */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />

            <Input
              value={query}
              placeholder="Search..."
              className="h-9 pl-9 pr-14"
              onFocus={() => setOpen(true)}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch(query)
                if (e.key === "Escape") setOpen(false)
              }}
            />

            {kbds.length > 0 && (
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1 pointer-events-none">
                <KbdGroup>
                  {kbds.map((key, i) => (
                    <Kbd key={i}>{key}</Kbd>
                  ))}
                </KbdGroup>
              </div>
            )}
          </div>

          {/* RESULTS */}
          {open && (
            <div className="absolute z-50 mt-2 w-full">
              <Card className="overflow-hidden shadow-lg">
                <ScrollArea className="max-h-[320px] px-3 py-2">
                  {filteredGroups.length === 0 && (
                    <p className="py-6 text-center text-sm text-muted-foreground">
                      {queries.emptyText}
                    </p>
                  )}

                  {filteredGroups.map((group, index) => (
                    <div key={group.heading} className="mb-4 last:mb-0">
                      <h4 className="mb-2 text-xs font-semibold text-muted-foreground">
                        {group.heading}
                      </h4>

                      <div className="flex flex-col gap-1">
                        {group.items.map((item) => {
                          const Icon = item.icon
                          return (
                            <button
                              key={item.label}
                              onClick={() => handleSearch(item.label)}
                              className="flex items-center justify-between rounded-md px-2 py-2 text-sm transition hover:bg-muted"
                            >
                              <div className="flex items-center gap-2">
                                <Icon className="size-4 text-muted-foreground" />
                                <span>{item.label}</span>
                              </div>

                              {item.shortcut && (
                                <span className="text-xs text-muted-foreground">
                                  {item.shortcut.content}
                                </span>
                              )}
                            </button>
                          )
                        })}
                      </div>

                      {index !== filteredGroups.length - 1 && (
                        <Separator className="mt-3" />
                      )}
                    </div>
                  ))}
                </ScrollArea>
              </Card>
            </div>
          )}
        </div>
      )
    }

    /* -------------------- MODAL VARIANT -------------------- */
    return (
      <>
        <section
          ref={ref}
          className={cn("relative flex items-center", className)}
          {...props}
          onClick={() => setOpen(true)}
        >
          <Search className="size-6 mr-2" />
          <div className="relative w-full">
            <Input placeholder="Search..." className="h-9 pr-16" />
            {kbds.length > 0 && (
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1 pointer-events-none">
                <KbdGroup>
                  {kbds.map((key, i) => (
                    <Kbd key={i}>{key}</Kbd>
                  ))}
                </KbdGroup>
              </div>
            )}
          </div>
        </section>

        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput
            placeholder={queries.input}
            value={query}
            onValueChange={setQuery}
          />
          <CommandList>
            <CommandEmpty>{queries.emptyText}</CommandEmpty>

            {filteredGroups.map((group, index) => (
              <React.Fragment key={group.heading}>
                <CommandGroup heading={group.heading}>
                  {group.items.map((item) => {
                    const Icon = item.icon
                    return (
                      <CommandItem
                        key={item.label}
                        onSelect={() => handleSearch(item.label)}
                      >
                        <Icon className="mr-2 size-4" />
                        <span>{item.label}</span>
                        {item.shortcut && (
                          <CommandShortcut>
                            {item.shortcut.content}
                          </CommandShortcut>
                        )}
                      </CommandItem>
                    )
                  })}
                </CommandGroup>

                {index !== filteredGroups.length - 1 && (
                  <CommandSeparator />
                )}
              </React.Fragment>
            ))}
          </CommandList>
        </CommandDialog>
      </>
    )
  }
)

SearchButton.displayName = "SearchButton"





export interface ShareButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  url?: string
  title?: string
  className?: string
}

const ShareButton = React.forwardRef<HTMLButtonElement, ShareButtonProps>(({ url, title, className, ...props }, ref) => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title || document.title,
          url: url || window.location.href,
        })
      } catch (err) {
        console.error("Error sharing:", err)
      }
    } else {
      navigator.clipboard.writeText(url || window.location.href)
    }
  }

  return (
    <button ref={ref} className={cn("h-9 w-9", className)} onClick={handleShare} {...props}>
      <Share2 className="h-4 w-4" />
      <span className="sr-only">Share</span>
    </button>
  )
})

const RateButton = React.forwardRef<HTMLButtonElement, GenericButtonProps>((props, ref) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <button ref={ref} className={cn("h-9 w-9", props.className)} {...props}>
        <Star className="h-4 w-4" />
        <span className="sr-only">Rate us</span>
      </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="w-[200px]">
      <DropdownMenuLabel>Rate Our Service</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
      </DropdownMenuItem>
      <DropdownMenuItem>Leave a Review</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
))

const NotificationButton = React.forwardRef<HTMLButtonElement, GenericButtonProps>((props, ref) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <button ref={ref} className={cn("h-9 w-9 relative", props.className)} {...props}>
        <Bell className="h-4 w-4" />
        <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
        <span className="sr-only">Notifications</span>
      </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="w-[300px]">
      <DropdownMenuLabel>Notifications</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium">New update available</p>
          <p className="text-xs text-muted-foreground">Check out the latest features</p>
        </div>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium">Welcome to UIsy Design</p>
          <p className="text-xs text-muted-foreground">Get started with our components</p>
        </div>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
))

export interface ThemeToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  theme: "light" | "dark" | "system" | undefined;
  setTheme: (theme: "light" | "dark" | "system") => void;
}

const ThemeToggle = React.forwardRef<HTMLButtonElement, ThemeToggleProps>(
  ({ theme, setTheme, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        variant="outline"
        size="icon"
        onClick={() => {
          if (theme === "dark") setTheme("system");
          else if (theme === "light") setTheme("dark");
          else setTheme("light");
        }}
        {...props}
      >
        {theme === "light" ? (
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
        ) : theme === "dark" ? (
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
        ) : (
          <Computer className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
        )}
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }
);


const SettingsButton = React.forwardRef<HTMLButtonElement, GenericButtonProps>((props, ref) => (
  <button ref={ref} className={cn("h-9 w-9", props.className)} {...props}>
    <Link href="/settings">
      <Settings className="h-4 w-4" />
      <span className="sr-only">Settings</span>
    </Link>
  </button>
))

const UserButton = React.forwardRef<HTMLButtonElement, GenericButtonProps>((props, ref) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <button ref={ref} className={cn("h-9 w-9", props.className)} {...props}>
        <User className="h-4 w-4" />
        <span className="sr-only">User menu</span>
      </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="w-[200px]">
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem>Profile</DropdownMenuItem>
      <DropdownMenuItem>Billing</DropdownMenuItem>
      <DropdownMenuItem>Settings</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>Log out</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
))

export interface MenubarWithAvatarProps {
  name: string,
  avatar: string,
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full",
  sizeOfImage?: string
  className?: string
}

const MenubarWithAvatar = ({
  name,
  avatar,
  rounded = "lg",
  sizeOfImage = "25px",
  className,
}: MenubarWithAvatarProps) => {
  return <Menubar>
    <MenubarMenu>
      <MenubarTrigger asChild className={cn(`flex p-2 items-center !rounded-${rounded}`, className)}>
        <Button variant={"ghost"} className="flex p-2 flex-row gap-2 hover:bg-transparent hover:text-muted-foreground focus:bg-transparent focus:text-muted-foreground">
          <Avatar className={cn("shadow-xl", `rounded-${rounded} w-[${sizeOfImage}] h-[${sizeOfImage}]`)}>
            <AvatarImage src={avatar} alt={`Photo of ${name}`} />
            <AvatarFallback>{name.split(" ").map((por) => por.substring(0, 1).toUpperCase())}</AvatarFallback>
          </Avatar>
          <span>{name}</span>
        </Button>
      </MenubarTrigger>
      <MenubarContent>
        <MenubarItem>
          New Tab <MenubarShortcut>⌘T</MenubarShortcut>
        </MenubarItem>
        <MenubarItem>New Window</MenubarItem>
        <MenubarSeparator />
        <MenubarItem>Share</MenubarItem>
        <MenubarSeparator />
        <MenubarItem>Print</MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  </Menubar>
}

export {
  Header,
  HeaderGroup,
  HeaderItem,
  HeaderLogo,
  HeaderNav,
  HeaderNavLink,
  SearchButton,
  ShareButton,
  RateButton,
  NotificationButton,
  ThemeToggle,
  SettingsButton,
  UserButton,
  MenubarWithAvatar,
}
