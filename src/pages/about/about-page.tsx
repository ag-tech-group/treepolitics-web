import { usePage } from "@/lib/use-ghost"
import { sanitizeHtml } from "@/lib/sanitize"

export function AboutPage() {
  const { data: page, isLoading } = usePage("about")

  if (isLoading) {
    return (
      <div className="text-muted-foreground py-20 text-center">Loading...</div>
    )
  }

  if (!page) {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
        <h1 className="mb-6 text-3xl tracking-wide sm:text-4xl">About</h1>
        <div className="prose prose-lg dark:prose-invert prose-headings:font-serif max-w-none">
          <p>
            Tree Politics explores the political life of trees — their use and
            abuse throughout history, from ancient empires to modern cities.
          </p>
          <p>
            Written by a certified arborist and instructor at the New York
            Botanical Garden, this blog applies a political ecology lens to the
            trees around us.
          </p>
          <p className="text-muted-foreground italic">
            This page will be editable via the Ghost admin panel once content is
            published.
          </p>
        </div>
      </div>
    )
  }

  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="mb-6 text-3xl tracking-wide sm:text-4xl">{page.title}</h1>
      {page.feature_image && (
        <img
          src={page.feature_image}
          alt={page.feature_image_alt ?? page.title}
          className="mb-8 w-full rounded-lg shadow-md"
        />
      )}
      <div
        className="prose-ghost prose prose-lg dark:prose-invert prose-headings:font-serif prose-headings:tracking-wide prose-a:text-primary max-w-none"
        dangerouslySetInnerHTML={{ __html: sanitizeHtml(page.html) }}
      />
    </article>
  )
}
