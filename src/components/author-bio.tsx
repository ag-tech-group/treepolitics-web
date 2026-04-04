export function AuthorBio() {
  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:gap-8">
      <div className="bg-muted h-40 w-40 shrink-0 rounded-full" />
      <div>
        <h3 className="text-xl font-semibold">Will Thomson</h3>
        <p className="text-muted-foreground mt-2 leading-relaxed">
          Half man, half tree, all heart.
        </p>
      </div>
    </div>
  )
}
