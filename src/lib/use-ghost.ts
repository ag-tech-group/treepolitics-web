import { useQuery } from "@tanstack/react-query"
import { getPost, getPosts, getPage, getTags } from "@/api/ghost"

export function usePosts(options?: {
  page?: number
  limit?: number
  tag?: string
}) {
  return useQuery({
    queryKey: ["ghost", "posts", options],
    queryFn: () => getPosts(options),
  })
}

export function usePost(slug: string) {
  return useQuery({
    queryKey: ["ghost", "post", slug],
    queryFn: () => getPost(slug),
    enabled: !!slug,
  })
}

export function usePage(slug: string) {
  return useQuery({
    queryKey: ["ghost", "page", slug],
    queryFn: () => getPage(slug),
    enabled: !!slug,
  })
}

export function useTags() {
  return useQuery({
    queryKey: ["ghost", "tags"],
    queryFn: getTags,
  })
}
