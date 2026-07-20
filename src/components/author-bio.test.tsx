import { render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import { AuthorBio } from "./author-bio"

const useAuthorMock = vi.hoisted(() => vi.fn())

vi.mock("@/lib/use-ghost", () => ({
  useAuthor: useAuthorMock,
}))

describe("AuthorBio", () => {
  it("renders the fallback name, bio, and placeholder when Ghost has no data", () => {
    useAuthorMock.mockReturnValue({ data: undefined })

    render(<AuthorBio />)

    expect(screen.getByText("Will Thomson")).toBeInTheDocument()
    expect(screen.getByText(/certified arborist/i)).toBeInTheDocument()
    expect(screen.queryByRole("img")).not.toBeInTheDocument()
  })

  it("renders the Ghost profile image, name, and bio when present", () => {
    useAuthorMock.mockReturnValue({
      data: {
        id: "1",
        name: "Will Thomson",
        slug: "will",
        profile_image: "https://content.example.com/will.jpg",
        bio: "Arborist and author.",
      },
    })

    render(<AuthorBio />)

    const img = screen.getByRole("img", { name: "Will Thomson" })
    expect(img).toHaveAttribute("src", "https://content.example.com/will.jpg")
    expect(screen.getByText("Arborist and author.")).toBeInTheDocument()
    expect(screen.queryByText(/certified arborist/i)).not.toBeInTheDocument()
  })
})
