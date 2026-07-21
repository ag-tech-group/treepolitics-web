import { useSubmitContactContactPost } from "@/api/generated/hooks/contact/contact"
import { SocialLinks } from "@/components/social-links"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function ContactPage() {
  const mutation = useSubmitContactContactPost()
  const submitted = mutation.isSuccess

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    mutation.mutate({
      data: {
        name: String(form.get("name") ?? ""),
        email: String(form.get("email") ?? ""),
        subject: String(form.get("subject") ?? ""),
        message: String(form.get("message") ?? ""),
        website: String(form.get("website") ?? ""),
      },
    })
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-12 sm:px-6">
      <h1 className="mb-2 text-3xl sm:text-4xl">Contact</h1>
      <p className="text-muted-foreground mb-8">
        Have a question or want to get in touch? Follow along on social media or
        send a message below.
      </p>

      {/* Social Links */}
      <section className="mb-12">
        <h2 className="mb-4 text-xl">Find Us Online</h2>
        <SocialLinks className="flex gap-5" />
      </section>

      {/* Contact Form */}
      <section>
        <h2 className="mb-4 text-xl">Send a Message</h2>
        {submitted ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-lg font-semibold">Thank you!</p>
              <p className="text-muted-foreground mt-2">
                Your message has been received. We'll get back to you soon.
              </p>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" name="subject" required />
                </div>
                {/* Honeypot — humans never see or fill this; the API drops
                    submissions where it's non-empty. */}
                <div aria-hidden="true" className="absolute -left-[9999px]">
                  <label htmlFor="website">Website</label>
                  <input
                    id="website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    minLength={10}
                    required
                    className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                {mutation.isError && (
                  <p className="text-destructive text-sm" role="alert">
                    Your message couldn't be sent. Please try again in a minute.
                  </p>
                )}
                <Button type="submit" size="lg" disabled={mutation.isPending}>
                  {mutation.isPending ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </section>
    </div>
  )
}
