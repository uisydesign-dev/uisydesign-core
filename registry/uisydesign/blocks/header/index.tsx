"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { Bell, Computer, Moon, Search, Settings, Share2, Star, Sun, User, type LucideIcon } from "lucide-react"
import { useTheme } from "next-themes"
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

// --- Header ---
interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly"
  className?: string
}

const Header = React.forwardRef<HTMLElement, HeaderProps>(({ children, className, justify = "between", ...props }, ref) => {
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
        "flex rounded-bl-xl rounded-br-xl gap-4 items-center px-6 py-3 border-b border-gray-200 bg-white dark:bg-black dark:border-gray-700",
        justifyClasses[justify],
        className
      )}
      {...props}
    >
      {children}
    </header>
  )
})

// --- HeaderGroup ---
interface HeaderGroupProps extends React.HTMLAttributes<HTMLDivElement> {
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
    <div ref={ref} className={cn("flex items-center gap-4", positionClasses[position], className)} {...props}>
      {children}
    </div>
  )
})

// --- HeaderItem ---
interface HeaderItemProps extends React.HTMLAttributes<HTMLDivElement> {
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
interface HeaderLogoProps extends React.HTMLAttributes<HTMLAnchorElement> {
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

interface MenuItem {
  title: string
  href: string
  description?: string
  icon?: LucideIcon
}

interface FeaturedItem {
  href: string
  title: string
  description: string
}

interface NavLink {
  href?: string
  label: string
  isActive?: boolean
  layout?: "single" | "double" | "featured"
  featured?: FeaturedItem
  items?: MenuItem[]
  width?: string
  showIcon?: boolean
}

interface HeaderNavProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode
  links?: NavLink[]
}

const HeaderNav: React.FC<HeaderNavProps> = ({ children, className, links, ...props }) => {
  const isMobile = useIsMobile()

  return (
    <NavigationMenu
      viewport={isMobile}
      className={cn("hidden md:flex z-10 items-center gap-6", className)}
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
                      asChild
                      className={cn(
                        navigationMenuTriggerStyle(),
                        link.isActive ? "text-primary" : "text-muted-foreground"
                      )}
                    >
                      <Link href={link.href}>{link.label}</Link>
                    </NavigationMenuLink>
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
interface HeaderNavLinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
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
interface GenericButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
}

interface SearchButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  onSearch?: (query: string) => void
  kbds?: string[]
  className?: string
}

const SearchButton = React.forwardRef<HTMLDivElement, SearchButtonProps>(
  ({ onSearch, kbds = [], className, ...props }, ref) => {
    const [open, setOpen] = React.useState(false)

    return (
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <section ref={ref} className={cn("relative flex items-center", className)} {...props}>
            <Search className="size-6 mr-2" />
            <div className="relative w-full">
              <Input
                placeholder="Search..."
                className="h-9 pr-16"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && onSearch) {
                    onSearch(e.currentTarget.value)
                    setOpen(false)
                  }
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
          </section>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-[300px] p-4">
          <Card className="w-full h-full">Hello</Card>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
)


interface ShareButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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

const ThemeToggle = React.forwardRef<HTMLButtonElement, GenericButtonProps>((props, ref) => {
  const { theme, setTheme } = useTheme()
  return (
    <Button variant="outline" size="icon" onClick={() => {
      if (theme == "dark") setTheme("system")
      else if (theme == "light") setTheme("dark")
      else setTheme("light")
    }}>
      {theme == "light" ? <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" /> : theme == "dark" ? <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" /> : <Computer className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />}
      
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
})

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

interface MenubarWithAvatarProps {
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
