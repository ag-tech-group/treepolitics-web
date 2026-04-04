import { Link } from "@tanstack/react-router"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { usePosts } from "@/lib/use-ghost"

export function HomePage() {
  const { data } = usePosts({ limit: 3 })
  const posts = data?.posts ?? []

  return (
    <div className="flex flex-1 flex-col">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center gap-6 px-6 py-20 text-center lg:py-32">
        <img
          src="/images/treepolitics_logo.png"
          alt="Tree Politics"
          className="h-32 w-32 rounded-xl lg:h-40 lg:w-40"
        />
        <h1 className="text-4xl tracking-wide sm:text-5xl lg:text-6xl">
          Tree Politics
        </h1>
        <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed lg:text-xl">
          The use and abuse of trees in history. Political ecology through an
          arborist's lens.
        </p>
        <Button asChild size="lg" className="mt-2">
          <Link to="/blog">
            Read the Blog
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </section>

      {/* Recent Posts */}
      {posts.length > 0 && (
        <section className="mx-auto w-full max-w-5xl px-6 pb-16">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl tracking-wide">Recent Posts</h2>
            <Link
              to="/blog"
              className="text-primary hover:text-primary/80 text-sm font-medium transition-colors"
            >
              View all &rarr;
            </Link>
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
    </div>
  )
}
