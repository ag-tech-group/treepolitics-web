// Decorative dendrochronology cross-section for the home hero. Ring geometry
// is generated once at module load from a fixed seed so the figure is
// identical across renders and tests. Irregular ring spacing and wobble are
// deliberate — real growth rings vary year to year.

function mulberry32(seed: number) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const CX = 300
const CY = 300

function ringPath(base: number, rng: () => number): string {
  const points: string[] = []
  const n = 96
  const amp1 = 1.5 + rng() * 2.5
  const k1 = 2 + Math.floor(rng() * 3)
  const ph1 = rng() * Math.PI * 2
  const amp2 = 0.8 + rng() * 1.4
  const k2 = 5 + Math.floor(rng() * 4)
  const ph2 = rng() * Math.PI * 2
  for (let i = 0; i < n; i++) {
    const t = (i / n) * Math.PI * 2
    const r =
      base + amp1 * Math.sin(k1 * t + ph1) + amp2 * Math.sin(k2 * t + ph2)
    points.push(
      `${(CX + r * Math.cos(t)).toFixed(1)} ${(CY + r * Math.sin(t)).toFixed(1)}`
    )
  }
  return `M${points.join("L")}Z`
}

interface Ring {
  d: string
  width: number
  opacity: number
  index: number
}

const RINGS: Ring[] = (() => {
  const rng = mulberry32(7)
  const rings: Ring[] = []
  let radius = 66
  let index = 0
  while (radius < 258) {
    radius += 5 + rng() * 10
    rings.push({
      d: ringPath(radius, rng),
      // Occasional heavy ring reads as latewood.
      width: rng() < 0.22 ? 2.6 : 1.2 + rng() * 0.7,
      opacity: 0.45 + rng() * 0.3,
      index: index++,
    })
  }
  return rings
})()

const CAMBIUM = RINGS.length // green living layer, just under the bark
const BARK = RINGS.length + 1

export function TreeRings({ className }: { className?: string }) {
  const rng = mulberry32(23)
  const cambium = ringPath(266, rng)
  const bark = ringPath(276, rng)

  return (
    <svg
      viewBox="0 0 600 600"
      aria-hidden="true"
      className={`tree-rings ${className ?? ""}`}
    >
      <defs>
        <clipPath id="tree-rings-pith">
          <circle cx={CX} cy={CY} r={54} />
        </clipPath>
      </defs>

      {RINGS.map((ring) => (
        <path
          key={ring.index}
          d={ring.d}
          pathLength={1}
          fill="none"
          stroke="var(--ring-ink)"
          strokeWidth={ring.width}
          strokeOpacity={ring.opacity}
          style={{ "--ring-i": ring.index } as React.CSSProperties}
        />
      ))}

      <path
        d={cambium}
        pathLength={1}
        fill="none"
        stroke="var(--tp-green)"
        strokeWidth={2}
        strokeOpacity={0.55}
        style={{ "--ring-i": CAMBIUM } as React.CSSProperties}
      />
      <path
        d={bark}
        pathLength={1}
        fill="none"
        stroke="var(--ring-ink)"
        strokeWidth={6}
        strokeOpacity={0.75}
        style={{ "--ring-i": BARK } as React.CSSProperties}
      />

      <circle
        cx={CX}
        cy={CY}
        r={58}
        fill="var(--pith)"
        stroke="var(--ring-ink)"
        strokeWidth={1.5}
        strokeOpacity={0.6}
      />
      {/* Oversized and positioned so the artwork's bottom caption band falls
          below the clip circle entirely, leaving just the tree and figures. */}
      <image
        href="/images/tp_logo_transparent_bg.png"
        x={CX - 75}
        y={CY - 64}
        width={150}
        height={150}
        clipPath="url(#tree-rings-pith)"
      />
    </svg>
  )
}
