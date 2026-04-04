import { Search } from "lucide-react"
import type { GhostTag } from "@/api/ghost"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const

const START_YEAR = 2026
const currentYear = new Date().getFullYear()
const years = Array.from(
  { length: currentYear - START_YEAR + 1 },
  (_, i) => START_YEAR + i
)

interface BlogToolbarProps {
  tags: GhostTag[]
  activeTag?: string
  sort: "newest" | "oldest"
  year?: number
  month?: number
  searchQuery: string
  onTagChange: (tag?: string) => void
  onSortChange: (sort: "newest" | "oldest") => void
  onYearChange: (year?: number) => void
  onMonthChange: (month?: number) => void
  onSearchChange: (query: string) => void
}

export function BlogToolbar({
  tags,
  activeTag,
  sort,
  year,
  month,
  searchQuery,
  onTagChange,
  onSortChange,
  onYearChange,
  onMonthChange,
  onSearchChange,
}: BlogToolbarProps) {
  return (
    <div className="mb-8 space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
        <Input
          placeholder="Search posts by title..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Filters row */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Tag filters */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <Button
              variant={activeTag === undefined ? "default" : "outline"}
              size="sm"
              onClick={() => onTagChange(undefined)}
            >
              All
            </Button>
            {tags.map((tag) => (
              <Button
                key={tag.id}
                variant={activeTag === tag.slug ? "default" : "outline"}
                size="sm"
                onClick={() => onTagChange(tag.slug)}
              >
                {tag.name}
              </Button>
            ))}
          </div>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Date + Sort */}
        <div className="flex gap-2">
          <Select
            value={year?.toString() ?? "all"}
            onValueChange={(v) =>
              onYearChange(v === "all" ? undefined : Number(v))
            }
          >
            <SelectTrigger className="w-28">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All years</SelectItem>
              {years.map((y) => (
                <SelectItem key={y} value={y.toString()}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={month?.toString() ?? "all"}
            onValueChange={(v) =>
              onMonthChange(v === "all" ? undefined : Number(v))
            }
          >
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All months</SelectItem>
              {MONTHS.map((name, i) => (
                <SelectItem key={i} value={(i + 1).toString()}>
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={sort}
            onValueChange={(v) => onSortChange(v as "newest" | "oldest")}
          >
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest first</SelectItem>
              <SelectItem value="oldest">Oldest first</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
