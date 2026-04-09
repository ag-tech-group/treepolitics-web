import { Link } from "@tanstack/react-router"
import { ArrowLeft } from "lucide-react"
import { usePost } from "@/lib/use-ghost"
import { sanitizeHtml } from "@/lib/sanitize"

export function BlogPostPage({ slug }: { slug: string }) {
  const { data: post, isLoading } = usePost(slug)

  if (isLoading) {
    return (
      <div className="text-muted-foreground py-20 text-center">Loading...</div>
    )
  }

  if (!post) {
    return (
      <div className="py-20 text-center">
        <h1 className="mb-4 text-2xl">Post not found</h1>
        <Link to="/blog" className="text-primary hover:text-primary/80">
          &larr; Back to blog
        </Link>
      </div>
    )
  }

  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
      <Link
        to="/blog"
        className="text-muted-foreground hover:text-foreground mb-8 inline-flex items-center gap-1 text-sm transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to blog
      </Link>

      <header className="mb-10">
        <h1 className="mb-4 text-3xl leading-tight tracking-wide sm:text-4xl lg:text-5xl">
          {post.title}
        </h1>
        <div className="text-muted-foreground flex flex-wrap items-center gap-2 text-sm">
          <span>
            {new Date(post.published_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          {post.reading_time > 0 && (
            <>
              <span>&middot;</span>
              <span>{post.reading_time} min read</span>
            </>
          )}
          {post.primary_author && (
            <>
              <span>&middot;</span>
              <span>{post.primary_author.name}</span>
            </>
          )}
        </div>
        {post.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Link
                key={tag.id}
                to="/blog"
                search={{ tag: tag.slug }}
                className="bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-xs font-medium"
              >
                {tag.name}
              </Link>
            ))}
          </div>
        )}
      </header>

      {post.feature_image && (
        <img
          src={post.feature_image}
          alt={post.feature_image_alt ?? post.title}
          className="mb-10 w-full rounded-lg shadow-md"
        />
      )}

      <div
        className="prose-ghost prose prose-lg dark:prose-invert prose-headings:font-heading prose-headings:tracking-wide prose-a:text-primary max-w-none"
        dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.html) }}
      />

      {post.primary_author && (
        <footer className="mt-12 border-t pt-8">
          <div className="flex items-center gap-4">
            {post.primary_author.profile_image ? (
              <img
                src={post.primary_author.profile_image}
                alt={post.primary_author.name}
                className="h-14 w-14 rounded-full object-cover"
              />
            ) : (
              <div className="bg-muted h-14 w-14 shrink-0 rounded-full" />
            )}
            <div>
              <p className="font-semibold">{post.primary_author.name}</p>
              {post.primary_author.bio && (
                <p className="text-muted-foreground mt-1 text-sm">
                  {post.primary_author.bio}
                </p>
              )}
            </div>
          </div>
        </footer>
      )}
    </article>
  )
}
