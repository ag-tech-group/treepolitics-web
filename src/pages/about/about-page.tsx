import { AuthorBio } from "@/components/author-bio"

export function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
      {/* Why Tree Politics */}
      <section className="mb-16">
        <h1 className="mb-6 text-3xl tracking-wide sm:text-4xl">
          Why Tree Politics?
        </h1>
        <div className="prose prose-lg dark:prose-invert prose-headings:font-heading max-w-none">
          <p>
            "Trees are the answer" read the bumper sticker on the back of my
            boss's silver RAV4 at the first job I ever had working as an
            arborist. My first reaction was to snicker to myself: what does that
            even mean? Got a broken leg? Trees! Student debt getting you down?
            Trees! But it stuck with me, and as I continued to work with trees
            and learn more and more about their place in human history, it's one
            that bothered me. And it was also one that clashed with my personal
            experience interacting with people in urban areas around trees.
          </p>
          <p>
            In this series I'll be looking through a political ecology lens to
            examine the history of human use and interaction with trees, how
            trees become political actors and shape and are shaped by our
            political landscape.
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
