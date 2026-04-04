import { useMemo, useState } from "react"
import { Link } from "@tanstack/react-router"
import { BlogToolbar } from "@/components/blog-toolbar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { buildDateFilter } from "@/lib/ghost-filters"
import { usePosts, useTags } from "@/lib/use-ghost"

export function BlogListingPage() {
  const [page, setPage] = useState(1)
  const [activeTag, setActiveTag] = useState<string | undefined>()
  const [sort, setSort] = useState<"newest" | "oldest">("newest")
  const [year, setYear] = useState<number | undefined>()
  const [month, setMonth] = useState<number | undefined>()
  const [searchQuery, setSearchQuery] = useState("")

  const order = sort === "oldest" ? "published_at asc" : "published_at desc"
  const dateFilter = buildDateFilter(year, month)

  const { data, isLoading } = usePosts({
    page: searchQuery ? 1 : page,
    limit: searchQuery ? 100 : 10,
    tag: activeTag,
    order,
    filter: dateFilter,
  })

  const allPosts = data?.posts ?? []
  const pagination = data?.meta?.pagination

  const posts = useMemo(() => {
    if (!searchQuery.trim()) return allPosts
    const words = searchQuery
      .toLowerCase()
      .split(/\s+/)
      .filter((w) => w.length > 0)
    return allPosts.filter((post) => {
      const title = post.title.toLowerCase()
      return words.some((word) => title.includes(word))
    })
  }, [allPosts, searchQuery])

  function resetPage() {
    setPage(1)
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="mb-2 text-3xl tracking-wide sm:text-4xl">Blog</h1>
      <p className="text-muted-foreground mb-8">
        Commentary on the political life of trees.
      </p>

      <BlogToolbar
        tags={useTags().data ?? []}
        activeTag={activeTag}
        sort={sort}
        year={year}
        month={month}
        searchQuery={searchQuery}
        onTagChange={(tag) => {
          setActiveTag(tag)
          resetPage()
        }}
        onSortChange={(s) => {
          setSort(s)
          resetPage()
        }}
        onYearChange={(y) => {
          setYear(y)
          resetPage()
        }}
        onMonthChange={(m) => {
          setMonth(m)
          resetPage()
        }}
        onSearchChange={setSearchQuery}
      />

      {/* Posts */}
      {isLoading ? (
        <div className="text-muted-foreground py-12 text-center">
          Loading posts...
        </div>
      ) : posts.length === 0 ? (
        <div className="text-muted-foreground py-12 text-center">
          No posts found.
        </div>
      ) : (
        <div className="space-y-8">
          {posts.map((post) => (
            <Link
              key={post.id}
              to="/blog/$slug"
              params={{ slug: post.slug }}
              className="block"
            >
              <Card className="hover:border-primary/40 transition-colors">
                <CardContent className="flex gap-6 p-6">
                  {post.feature_image && (
                    <img
                      src={post.feature_image}
                      alt={post.feature_image_alt ?? post.title}
                      className="hidden h-32 w-48 shrink-0 rounded-lg object-cover sm:block"
                    />
                  )}
                  <div className="flex-1">
                    <p className="text-muted-foreground mb-2 text-xs">
                      {new Date(post.published_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                      {post.reading_time > 0 && (
                        <> &middot; {post.reading_time} min read</>
                      )}
                      {post.primary_tag && (
                        <> &middot; {post.primary_tag.name}</>
                      )}
                    </p>
                    <h2 className="mb-2 text-xl leading-snug font-semibold">
                      {post.title}
                    </h2>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {post.custom_excerpt ?? post.excerpt}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination — hidden during search since we fetch all */}
      {!searchQuery && pagination && pagination.pages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-4">
          <Button
            variant="outline"
            size="sm"
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Previous
          </Button>
          <span className="text-muted-foreground text-sm">
            Page {pagination.page} of {pagination.pages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={page >= pagination.pages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  )
}
