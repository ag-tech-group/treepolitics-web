import { lazy, Suspense } from "react"
import { QueryClient } from "@tanstack/react-query"
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router"
import { Toaster } from "sonner"
import { SiteLayout } from "@/components/layout/site-layout"

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
