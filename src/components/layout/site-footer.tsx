import { Link } from "@tanstack/react-router"
import { Separator } from "@/components/ui/separator"

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const

const socialLinks = [
  { label: "YouTube", href: "#" },
  { label: "TikTok", href: "#" },
  { label: "Twitter/X", href: "#" },
] as const

export function SiteFooter() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Brand */}
          <div>
            <Link to="/" className="mb-4 flex items-center gap-3">
              <img
                src="/images/treepolitics_logo.png"
                alt="Tree Politics"
                className="h-12 w-12 rounded-md"
              />
              <span className="text-lg font-semibold">Tree Politics</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              The use and abuse of trees in history. Political ecology through
              an arborist's lens.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-3 text-sm font-semibold tracking-wider uppercase">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="mb-3 text-sm font-semibold tracking-wider uppercase">
              Follow
            </h3>
            <ul className="space-y-2">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <p className="text-muted-foreground text-center text-xs">
          &copy; {new Date().getFullYear()} Tree Politics. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
