import type { ComponentProps, FC } from "react"
import { Instagram, Twitter, Youtube } from "lucide-react"
import { socialLinks } from "@/lib/constants"

function TikTokIcon(props: ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  )
}

const iconMap: Record<string, FC<{ className?: string }>> = {
  YouTube: Youtube,
  TikTok: TikTokIcon,
  Instagram: Instagram,
  "Twitter/X": Twitter,
}

export function SocialLinks({ className }: { className?: string }) {
  return (
    <div className={className}>
      {socialLinks.map((link) => {
        const Icon = iconMap[link.label]
        return (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {Icon && <Icon className="h-5 w-5" />}
          </a>
        )
      })}
    </div>
  )
}
