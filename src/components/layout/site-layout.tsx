import { SiteFooter } from "./site-footer"
import { SiteHeader } from "./site-header"

export function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-svh flex-col">
      <a
        href="#main-content"
        className="bg-background text-foreground sr-only z-50 px-4 py-2 focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main-content" className="flex flex-1 flex-col">
        {children}
      </main>
      <SiteFooter />
    </div>
  )
}
