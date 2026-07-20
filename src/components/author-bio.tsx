import { useAuthor } from "@/lib/use-ghost"

// Single-author site: the Ghost staff profile is the source of truth for the
// photo and bio, editable in Ghost Admin without a deploy. The hardcoded
// strings below are fallbacks for while the Ghost profile fields are empty
// (and for when the Content API is unreachable).
const AUTHOR_SLUG = "will"

const FALLBACK_NAME = "Will Thomson"
const FALLBACK_BIO =
  "Will is a certified arborist and landscape designer. He holds an MSc in " +
  "Environmental Science from the American University of Beirut and an MLA " +
  "from the Spitzer School of Architecture, and is a certified hater of " +
  "using trees to score political points."

export function AuthorBio() {
  const { data: author } = useAuthor(AUTHOR_SLUG)

  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:gap-8">
      {author?.profile_image ? (
        <img
          src={author.profile_image}
          alt={author.name}
          className="h-40 w-40 shrink-0 rounded-full object-cover"
        />
      ) : (
        <div className="bg-muted h-40 w-40 shrink-0 rounded-full" />
      )}
      <div>
        <h3 className="text-xl font-semibold">
          {author?.name ?? FALLBACK_NAME}
        </h3>
        <p className="text-muted-foreground mt-2 leading-relaxed">
          {author?.bio ?? FALLBACK_BIO}
        </p>
      </div>
    </div>
  )
}
