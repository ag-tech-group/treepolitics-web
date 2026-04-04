const GHOST_URL = import.meta.env.VITE_GHOST_URL || "http://localhost:2368"
const GHOST_KEY = import.meta.env.VITE_GHOST_CONTENT_KEY || ""

const baseParams = `key=${GHOST_KEY}`

export interface GhostPost {
  id: string
  uuid: string
  title: string
  slug: string
  html: string
  feature_image: string | null
  feature_image_alt: string | null
  excerpt: string
  custom_excerpt: string | null
  published_at: string
  updated_at: string
  reading_time: number
  tags: GhostTag[]
  primary_tag: GhostTag | null
  authors: GhostAuthor[]
  primary_author: GhostAuthor
}

export interface GhostTag {
  id: string
  name: string
  slug: string
  description: string | null
}

export interface GhostAuthor {
  id: string
  name: string
  slug: string
  profile_image: string | null
  bio: string | null
}

export interface GhostPage {
  id: string
  title: string
  slug: string
  html: string
  feature_image: string | null
  feature_image_alt: string | null
  excerpt: string
  custom_excerpt: string | null
  published_at: string
  updated_at: string
}

interface GhostResponse<T> {
  posts?: T[]
  pages?: T[]
  tags?: T[]
  meta: {
    pagination: {
      page: number
      limit: number
      pages: number
      total: number
    }
  }
}

async function ghostFetch<T>(path: string): Promise<T> {
  const separator = path.includes("?") ? "&" : "?"
  const res = await fetch(
    `${GHOST_URL}/ghost/api/content/${path}${separator}${baseParams}`
  )
  if (!res.ok) {
    throw new Error(`Ghost API error: ${res.status} ${res.statusText}`)
  }
  return res.json()
}

export async function getPosts(options?: {
  page?: number
  limit?: number
  tag?: string
  order?: string
  filter?: string
}) {
  const { page = 1, limit = 10, tag, order, filter } = options ?? {}
  let path = `posts/?include=tags,authors&page=${page}&limit=${limit}`

  const filterParts: string[] = []
  if (tag) filterParts.push(`tag:${tag}`)
  if (filter) filterParts.push(filter)
  if (filterParts.length > 0) path += `&filter=${filterParts.join("+")}`

  if (order) path += `&order=${encodeURIComponent(order)}`

  return ghostFetch<GhostResponse<GhostPost>>(path)
}

export async function getPost(slug: string) {
  const data = await ghostFetch<GhostResponse<GhostPost>>(
    `posts/slug/${slug}/?include=tags,authors`
  )
  return data.posts?.[0] ?? null
}

export async function getPage(slug: string) {
  const data = await ghostFetch<GhostResponse<GhostPage>>(
    `pages/slug/${slug}/?include=tags`
  )
  return data.pages?.[0] ?? null
}

export async function getTags() {
  const data = await ghostFetch<GhostResponse<GhostTag>>("tags/?limit=all")
  return data.tags ?? []
}
