import { lazy, Suspense } from "react"
import { QueryClient } from "@tanstack/react-query"
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router"
import { Toaster } from "sonner"
import { RootErrorComponent } from "@/components/error-boundary"
import { SiteLayout } from "@/components/layout/site-layout"
import { NotFound } from "@/components/not-found"

const TanStackRouterDevtools = import.meta.env.PROD
  ? () => null
  : lazy(() =>
      import("@tanstack/react-router-devtools").then((mod) => ({
        default: mod.TanStackRouterDevtools,
      }))
    )

const ReactQueryDevtools = import.meta.env.PROD
  ? () => null
  : lazy(() =>
      import("@tanstack/react-query-devtools").then((mod) => ({
        default: mod.ReactQueryDevtools,
      }))
    )

interface RouterContext {
  queryClient: QueryClient
  auth: unknown
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
  notFoundComponent: () => (
    <SiteLayout>
      <NotFound />
    </SiteLayout>
  ),
  errorComponent: ({ error, reset }) => (
    <SiteLayout>
      <RootErrorComponent error={error} reset={reset} />
    </SiteLayout>
  ),
})

function RootComponent() {
  return (
    <>
      <SiteLayout>
        <Outlet />
      </SiteLayout>
      <Toaster position="bottom-right" richColors closeButton />
      <Suspense fallback={null}>
        <TanStackRouterDevtools />
        <ReactQueryDevtools />
      </Suspense>
    </>
  )
}
