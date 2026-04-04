import { useState } from "react"
import { Link } from "@tanstack/react-router"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"

const navigation = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const

function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 overflow-y-auto">
        <SheetHeader>
          <SheetTitle>
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3"
            >
              <img
                src="/images/treepolitics_logo.png"
                alt="Tree Politics"
                className="h-10 w-10 rounded-md"
              />
              <span className="text-base font-semibold">Tree Politics</span>
            </Link>
          </SheetTitle>
        </SheetHeader>
        <Separator className="my-3" />
        <nav className="flex flex-col gap-1">
          {navigation.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              onClick={() => setOpen(false)}
              className="hover:bg-accent rounded-md px-3 py-2 text-sm font-medium transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Separator className="my-3" />
        <div className="px-3">
          <ThemeToggle />
        </div>
      </SheetContent>
    </Sheet>
  )
}

export function SiteHeader() {
  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/images/treepolitics_logo.png"
              alt="Tree Politics"
              className="h-9 w-9 rounded-md"
            />
            <span className="text-lg font-semibold tracking-wide">
              Tree Politics
            </span>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            {navigation.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="text-foreground/80 hover:text-foreground text-sm font-medium transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden lg:block">
            <ThemeToggle />
          </div>
          <MobileNav />
        </div>
      </div>
    </header>
  )
}
