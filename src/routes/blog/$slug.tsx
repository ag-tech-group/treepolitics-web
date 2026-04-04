import { createFileRoute } from "@tanstack/react-router"
import { BlogPostPage } from "@/pages/blog/blog-post-page"

export const Route = createFileRoute("/blog/$slug")({
  component: BlogPostRoute,
})

function BlogPostRoute() {
  const { slug } = Route.useParams()
  return <BlogPostPage slug={slug} />
}
