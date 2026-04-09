import { AuthorBio } from "@/components/author-bio"

export function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
      {/* Mission */}
      <section className="mb-16">
        <h1 className="mb-6 text-3xl tracking-wide sm:text-4xl">Our Mission</h1>
        <div className="prose prose-lg dark:prose-invert prose-headings:font-heading max-w-none">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>
        </div>
      </section>

      {/* Author */}
      <section>
        <h2 className="mb-8 text-2xl tracking-wide">About the Author</h2>
        <AuthorBio />
      </section>
    </div>
  )
}
