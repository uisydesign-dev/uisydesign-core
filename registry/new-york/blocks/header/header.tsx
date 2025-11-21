"use client"
import React from "react"
import { cn } from "@/lib/utils" // Assuming this utility exists for TailwindCSS class merging
import { Bell, Moon, Search, Settings, Share2, Star, Sun, User, type LucideIcon } from "lucide-react"
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

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
    children?: React.ReactNode
    justify?: "start" | "center" | "end" | "between" | "around" | "evenly" // Tailwind justify options
}

const Header: React.FC<HeaderProps> = ({ children, className, justify = "between", ...props }) => {
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
            className={cn(
                "flex z-[20] rounded-bl-xl rounded-br-xl gap-4 items-center px-6 py-3 border-b border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700",
                justifyClasses[justify],
                className,
            )}
            {...props}
        >
            {children}
        </header>
    )
}

// --- Header Group Component ---
interface HeaderGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode
    position?: "left" | "center" | "right"
}

const HeaderGroup: React.FC<HeaderGroupProps> = ({ children, className, position = "left", ...props }) => {
    const positionClasses = {
        left: "justify-start",
        center: "justify-center",
        right: "justify-end",
    }

    return (
        <div className={cn("flex items-center gap-4", positionClasses[position], className)} {...props}>
            {children}
        </div>
    )
}

// --- Header Item Component ---
interface HeaderItemProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode
    asChild?: boolean // If true, renders its child without a wrapper div
}

const HeaderItem: React.FC<HeaderItemProps> = ({ children, className, asChild, ...props }) => {
    if (asChild) {
        if (React.isValidElement(children)) {
            // Type assertion: we know children is a ReactElement with props
            return React.cloneElement(children as React.ReactElement<any>, {
                className: cn((children as React.ReactElement<any>).props.className, className),
                ...props,
            })
        }
        return <>{children}</> // fallback
    }

    return (
        <div className={cn("flex items-center", className)} {...props}>
            {children}
        </div>
    )
}

// --- Export Components ---
export { Header, HeaderGroup, HeaderItem }

interface HeaderLogoProps extends React.HTMLAttributes<HTMLAnchorElement> {
    href?: string
    Icon?: LucideIcon | string | null
    reversed?: boolean;
    rounded?: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";
}

const HeaderLogo: React.FC<HeaderLogoProps> = ({
    children,
    className,
    href = "/",
    Icon,
    reversed = false,
    rounded = "md",
    ...props
}) => {
    return (
        <a
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

export { HeaderLogo }

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
            className={cn("hidden md:flex items-center gap-6", className)}
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
                                            link.isActive ? "text-primary" : "text-muted-foreground",
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
                                                        <div className="mb-2 text-lg font-medium sm:mt-4">{link.featured.title}</div>
                                                        <p className="text-muted-foreground text-sm leading-tight">{link.featured.description}</p>
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

// Helper component for navigation menu items with descriptions
function ListItem({ title, children, href, ...props }: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
    return (
        <li {...props}>
            <NavigationMenuLink asChild>
                <Link href={href}>
                    <div className="text-sm leading-none font-medium">{title}</div>
                    <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">{children}</p>
                </Link>
            </NavigationMenuLink>
        </li>
    )
}

// Optional: A more specific Nav Link component example
interface HeaderNavLinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
    href: string
    isActive?: boolean
}

const HeaderNavLink: React.FC<HeaderNavLinkProps> = ({ children, className, href, isActive, ...props }) => {
    return (
        <a
            href={href}
            className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive ? "text-primary" : "text-muted-foreground",
                className,
            )}
            {...props}
        >
            {children}
        </a>
    )
}

interface SearchButtonProps {
    onSearch?: (query: string) => void
  }
  
  const SearchButton: React.FC<SearchButtonProps> = ({ onSearch }) => {
    const [open, setOpen] = React.useState(false)
  
    return (
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild className="flex flex-row">
          <>
          <Search className="size-6" />
          <Input
              placeholder="Search..."
              className="h-9"
              onKeyDown={(e) => {
                if (e.key === "Enter" && onSearch) {
                  onSearch(e.currentTarget.value)
                  setOpen(false)
                }
              }}
            />
          </>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[300px] p-4">
          <div className="flex gap-2">
            
            <button  className="h-9">
              Search
            </button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
  
  interface ShareButtonProps {
    url?: string
    title?: string
  }
  
  const ShareButton: React.FC<ShareButtonProps> = ({ url, title }) => {
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
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(url || window.location.href)
      }
    }
  
    return (
      <button   className="h-9 w-9" onClick={handleShare}>
        <Share2 className="h-4 w-4" />
        <span className="sr-only">Share</span>
      </button>
    )
  }
  
  const RateButton: React.FC = () => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button   className="h-9 w-9">
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
    )
  }
  
  const NotificationButton: React.FC = () => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button   className="h-9 w-9 relative">
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
    )
  }
  
  const ThemeToggle: React.FC = () => {
    const [theme, setTheme] = React.useState<"light" | "dark">("light")
  
    const toggleTheme = () => {
      setTheme((prev) => (prev === "light" ? "dark" : "light"))
    }
  
    return (
      <button   className="h-9 w-9" onClick={toggleTheme}>
        {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        <span className="sr-only">Toggle theme</span>
      </button>
    )
  }
  
  const SettingsButton: React.FC = () => {
    return (
      <button   className="h-9 w-9" >
        <Link href="/settings">
          <Settings className="h-4 w-4" />
          <span className="sr-only">Settings</span>
        </Link>
      </button>
    )
  }
  
  const UserButton: React.FC = () => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button   className="h-9 w-9">
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
    )
  }

export { HeaderNav, HeaderNavLink, SearchButton,
    ShareButton,
    RateButton,
    NotificationButton,
    ThemeToggle,
    SettingsButton,
    UserButton }