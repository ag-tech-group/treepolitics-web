import { renderWithFileRoutes } from "@/test/renderers"
import { screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

describe("HomePage", () => {
  it("renders the main heading", async () => {
    await renderWithFileRoutes(<div />, { initialLocation: "/" })

    expect(
      screen.getByRole("heading", { name: /tree politics/i })
    ).toBeInTheDocument()
  })

  it("renders the hero call-to-action", async () => {
    await renderWithFileRoutes(<div />, { initialLocation: "/" })

    expect(
      screen.getByRole("link", { name: /read the blog/i })
    ).toBeInTheDocument()
  })
})
