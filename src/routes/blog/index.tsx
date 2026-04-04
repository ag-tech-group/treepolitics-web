import { createFileRoute } from "@tanstack/react-router"
import { BlogListingPage } from "@/pages/blog/blog-listing-page"

export const Route = createFileRoute("/blog/")({
  component: BlogListingPage,
})
