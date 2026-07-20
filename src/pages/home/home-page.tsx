import { Link } from "@tanstack/react-router"
import { ArrowRight } from "lucide-react"
import { AuthorBio } from "@/components/author-bio"
import { TreeRings } from "@/components/tree-rings"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { usePosts } from "@/lib/use-ghost"

export function HomePage() {
  const { data } = usePosts({ limit: 3 })
  const posts = data?.posts ?? []

  return (
    <div className="flex flex-1 flex-col">
      {/* Hero — tree-ring cross-section; rings record history the way the
          blog does. */}
      <section className="px-6 py-16 lg:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,480px)]">
          <div className="text-center lg:text-left">
            <h1 className="text-6xl leading-[0.95] sm:text-7xl lg:text-8xl">
              Tree <span className="block">Politics</span>
            </h1>
            <p className="text-muted-foreground mx-auto mt-6 max-w-xl text-lg leading-relaxed lg:mx-0 lg:text-xl">
              Woody Political Ecology, the use and abuse of trees in history,
              and tree facts to impress your friends
            </p>
            <Button asChild size="lg" className="mt-8">
              <Link to="/blog">
                Read the Blog
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <TreeRings className="mx-auto w-72 max-w-full sm:w-96 lg:w-full" />
        </div>
      </section>

      {/* Recent Posts */}
      {posts.length > 0 && (
        <section className="mx-auto w-full max-w-5xl px-6 pb-16">
          <div className="mb-8">
            <h2 className="text-2xl">Recent Posts</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link key={post.id} to="/blog/$slug" params={{ slug: post.slug }}>
                <Card className="hover:border-primary/40 h-full transition-colors">
                  {post.feature_image && (
                    <img
                      src={post.feature_image}
                      alt={post.feature_image_alt ?? post.title}
                      className="h-48 w-full rounded-t-lg object-cover"
                    />
                  )}
                  <CardContent className="p-5">
                    <p className="text-muted-foreground mb-2 text-xs">
                      {new Date(post.published_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                      {post.reading_time > 0 && (
                        <> &middot; {post.reading_time} min read</>
                      )}
                    </p>
                    <h3 className="mb-2 text-lg leading-snug font-semibold">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {post.custom_excerpt ?? post.excerpt}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* About */}
      <section className="mx-auto w-full max-w-5xl px-6 pb-20">
        <h2 className="mb-8 text-2xl">About the Author</h2>
        <AuthorBio />
      </section>
    </div>
  )
}
