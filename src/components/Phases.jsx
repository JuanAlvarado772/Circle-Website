import { useEffect, useRef, useState } from 'react'

// ─── Brand data ────────────────────────────────────────────────────────────────
const PHASES = [
  {
    num: '01',
    title: 'Foundation',
    date: 'Q4 2024',
    status: 'complete',
    statusLabel: 'Complete',
    description:
      'Brand identity, product vision, and core architecture. Defining what Circle is, who it serves, and why it matters.',
    milestones: ['Brand & visual system', 'Product architecture', 'Market research & validation'],
    accent: '#4AACCF',
  },
  {
    num: '02',
    title: 'MVP Build',
    date: 'Q1 2025',
    status: 'active',
    statusLabel: 'In Progress',
    description:
      'Building the core product — event discovery, QR-based connections, user profiles, and community Circles.',
    milestones: ['Event creation & discovery', 'QR connection flow', 'User profiles & badge system'],
    accent: '#E8863A',
  },
  {
    num: '03',
    title: 'Beta Launch',
    date: 'Q2 2025',
    status: 'upcoming',
    statusLabel: 'Coming Soon',
    description:
      'Invite-only access for early adopters. Real-world feedback to sharpen every detail before opening the doors.',
    milestones: ['Closed beta program', 'Feedback & iteration loops', 'Performance & stability tuning'],
    accent: '#7EC8E3',
  },
  {
    num: '04',
    title: 'Public Release',
    date: 'Q3 2025',
    status: 'planned',
    statusLabel: 'Planned',
    description:
      'Open launch with full host tools, business profiles, ticketing integrations, and the Circle reward system.',
    milestones: ['App Store & Play Store launch', 'Host subscription tiers live', 'Reward & loyalty system'],
    accent: '#C9AA7A',
  },
  {
    num: '05',
    title: 'Expansion',
    date: '2026',
    status: 'future',
    statusLabel: 'Future',
    description:
      'Growing into new cities, global partnerships, and deepening the social layer that keeps communities alive between events.',
    milestones: ['Multi-city & global rollout', 'Brand & venue partnerships', 'Social feed, stories & discovery'],
    accent: '#A89080',
  },
]

// ─── SVG path geometry ─────────────────────────────────────────────────────────
// Viewbox: 800 wide × 2600 tall. Cards sit left/right of center spine.
const VW = 800
const VH = 2600
const SPINE = VW / 2  // center x of path

// Node anchors — alternating slight left/right of spine for organic feel
const NODES = [
  { x: SPINE + 40,  y: 260 },
  { x: SPINE - 40,  y: 780 },
  { x: SPINE + 50,  y: 1300 },
  { x: SPINE - 50,  y: 1820 },
  { x: SPINE + 20,  y: 2340 },
]

// Build a smooth cubic bezier through all nodes
function buildPath(nodes) {
  let d = `M ${nodes[0].x} ${nodes[0].y}`
  for (let i = 1; i < nodes.length; i++) {
    const p = nodes[i - 1], c = nodes[i]
    const midY = (p.y + c.y) / 2
    d += ` C ${p.x} ${midY}, ${c.x} ${midY}, ${c.x} ${c.y}`
  }
  return d
}

const PATH_D = buildPath(NODES)

// ─── Status styling ────────────────────────────────────────────────────────────
const STATUS = {
  complete: { bg: 'rgba(74,172,207,0.13)', color: '#4AACCF', pulse: false },
  active:   { bg: 'rgba(232,134,58,0.13)', color: '#E8863A', pulse: true  },
  upcoming: { bg: 'rgba(26,22,18,0.07)',   color: '#7A6F65', pulse: false },
  planned:  { bg: 'rgba(26,22,18,0.05)',   color: '#A0948A', pulse: false },
  future:   { bg: 'rgba(26,22,18,0.04)',   color: '#C0B4AA', pulse: false },
}

// ─── Main component ────────────────────────────────────────────────────────────
export default function Phases() {
  const sectionRef  = useRef(null)
  const pathRef     = useRef(null)
  const dotRef      = useRef(null)
  const cardRefs    = useRef([])
  const rafRef      = useRef(null)
  const [pathLen, setPathLen] = useState(0)

  // Measure path on mount
  useEffect(() => {
    if (pathRef.current) {
      const len = pathRef.current.getTotalLength()
      setPathLen(len)
      pathRef.current.style.strokeDasharray = len
      pathRef.current.style.strokeDashoffset = len
    }
  }, [])

  // Scroll driver
  useEffect(() => {
    if (!pathLen) return
    const section = sectionRef.current

    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect()
        const scrollable = section.offsetHeight - window.innerHeight
        const progress = Math.max(0, Math.min(1, -rect.top / scrollable))

        // Draw path
        pathRef.current.style.strokeDashoffset = pathLen * (1 - progress)

        // Move dot
        const pt = pathRef.current.getPointAtLength(pathLen * progress)
        if (dotRef.current) {
          dotRef.current.style.left = `${(pt.x / VW) * 100}%`
          dotRef.current.style.top  = `${pt.y}px`
        }

        // Reveal cards
        NODES.forEach((node, i) => {
          const threshold = (node.y - 120) / VH
          const card = cardRefs.current[i]
          if (!card) return
          if (progress >= threshold) {
            card.style.opacity   = '1'
            card.style.transform = 'translateY(0) scale(1)'
          } else {
            card.style.opacity   = '0'
            card.style.transform = 'translateY(24px) scale(0.98)'
          }
        })
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafRef.current)
    }
  }, [pathLen])

  return (
    <section
      id="phases"
      ref={sectionRef}
      style={{
        background: 'var(--cream)',
        paddingBottom: '10rem',
        position: 'relative',
      }}
    >
      {/* ── Section header ── */}
      <div style={{
        textAlign: 'center',
        padding: 'clamp(5rem, 9vw, 8rem) 1.5rem 0',
        maxWidth: 600,
        margin: '0 auto',
      }}>
        <p style={{
          fontSize: '0.68rem', fontWeight: 500, letterSpacing: '0.16em',
          textTransform: 'uppercase', color: 'var(--blue-dark)',
          marginBottom: '1.25rem',
        }}>
          Roadmap
        </p>
        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(2.25rem, 5vw, 3.75rem)',
          fontWeight: 300, lineHeight: 1.1,
          color: 'var(--ink)', marginBottom: '1.25rem',
        }}>
          The road to{' '}
          <em style={{ fontStyle: 'italic', color: 'var(--orange-dark)' }}>your circle</em>
        </h2>
        <p style={{
          fontSize: '1rem', color: 'var(--ink-muted)',
          fontWeight: 300, lineHeight: 1.7,
        }}>
          Five phases. One destination — a world where you never feel like a stranger.
        </p>
      </div>

      {/* ── Journey container ── */}
      <div style={{
        position: 'relative',
        maxWidth: 1000,
        margin: '0 auto',
        height: `${VH}px`,
        padding: '0 1rem',
      }}>

        {/* SVG track */}
        <svg
          viewBox={`0 0 ${VW} ${VH}`}
          preserveAspectRatio="xMidYMid meet"
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100%',
            maxWidth: VW,
            height: VH,
            overflow: 'visible',
            pointerEvents: 'none',
          }}
        >
          <defs>
            <linearGradient id="trackGrad" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
              <stop offset="0%"   stopColor="#4AACCF" stopOpacity="0.9" />
              <stop offset="40%"  stopColor="#E8863A" stopOpacity="0.9" />
              <stop offset="75%"  stopColor="#C9AA7A" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#A89080" stopOpacity="0.7" />
            </linearGradient>
          </defs>

          {/* Ghost track */}
          <path
            d={PATH_D}
            fill="none"
            stroke="rgba(26,22,18,0.08)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* Animated draw path */}
          <path
            ref={pathRef}
            d={PATH_D}
            fill="none"
            stroke="url(#trackGrad)"
            strokeWidth="2"
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 0.04s linear' }}
          />

          {/* Node rings */}
          {NODES.map((pos, i) => {
            const phase = PHASES[i]
            return (
              <g key={i}>
                {/* Outer ring */}
                <circle cx={pos.x} cy={pos.y} r={22} fill="var(--cream)" stroke={phase.accent} strokeWidth="1.5" />
                {/* Inner dot */}
                <circle
                  cx={pos.x} cy={pos.y} r={7}
                  fill={phase.status === 'future' ? 'rgba(26,22,18,0.15)' : phase.accent}
                />
                {/* Phase number */}
                <text
                  x={pos.x} y={pos.y + 0.5}
                  textAnchor="middle" dominantBaseline="middle"
                  fontSize="8.5" fontFamily="DM Sans, sans-serif"
                  fontWeight="500" fill={phase.accent}
                  style={{ userSelect: 'none' }}
                >
                  {phase.num}
                </text>
              </g>
            )
          })}
        </svg>

        {/* Traveling dot */}
        <div
          ref={dotRef}
          style={{
            position: 'absolute',
            width: 13, height: 13,
            borderRadius: '50%',
            background: 'var(--ink)',
            border: '2.5px solid var(--cream)',
            boxShadow: '0 0 0 3px rgba(26,22,18,0.1)',
            transform: 'translate(-50%, -50%)',
            zIndex: 10,
            transition: 'top 0.04s linear, left 0.04s linear',
            pointerEvents: 'none',
          }}
        />

        {/* Phase cards */}
        {PHASES.map((phase, i) => {
          const node = NODES[i]
          const isRight = node.x >= SPINE  // card flips to opposite side of node
          const nodeXPct = (node.x / VW) * 100

          return (
            <div
              key={i}
              ref={el => { cardRefs.current[i] = el }}
              style={{
                position: 'absolute',
                top: node.y - 90,
                ...(isRight
                  ? { right: `calc(100% - ${nodeXPct}% + 36px)`, left: 'auto' }
                  : { left: `calc(${nodeXPct}% + 36px)`, right: 'auto' }
                ),
                width: 'clamp(220px, 27vw, 300px)',
                opacity: 0,
                transform: 'translateY(24px) scale(0.98)',
                transition: 'opacity 0.55s ease, transform 0.55s ease',
                zIndex: 5,
              }}
            >
              <PhaseCard phase={phase} />
            </div>
          )
        })}
      </div>

      {/* CSS for pulse animation */}
      <style>{`
        @keyframes phasePulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.6; transform: scale(0.85); }
        }
      `}</style>
    </section>
  )
}

// ─── Phase card ────────────────────────────────────────────────────────────────
function PhaseCard({ phase }) {
  const [hovered, setHovered] = useState(false)
  const s = STATUS[phase.status]

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#FDFAF5',
        border: '1px solid rgba(26,22,18,0.08)',
        borderRadius: 20,
        padding: '1.5rem 1.5rem 1.35rem',
        boxShadow: hovered
          ? '0 12px 48px rgba(26,22,18,0.1)'
          : '0 4px 24px rgba(26,22,18,0.055)',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        transition: 'box-shadow 0.3s ease, transform 0.3s ease',
      }}
    >
      {/* Status badge */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
        background: s.bg, borderRadius: 100,
        padding: '0.3rem 0.8rem', marginBottom: '1rem',
      }}>
        <span style={{
          width: 6, height: 6, borderRadius: '50%',
          background: s.color, flexShrink: 0,
          ...(s.pulse ? { animation: 'phasePulse 1.8s ease-in-out infinite' } : {}),
        }} />
        <span style={{
          fontSize: '0.68rem', fontWeight: 500,
          letterSpacing: '0.09em', textTransform: 'uppercase',
          color: s.color,
        }}>
          {phase.statusLabel}
        </span>
      </div>

      {/* Date */}
      <p style={{
        fontSize: '0.73rem', color: 'var(--ink-muted)',
        fontWeight: 400, marginBottom: '0.3rem', letterSpacing: '0.02em',
      }}>
        {phase.date}
      </p>

      {/* Title */}
      <h3 style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: '1.55rem', fontWeight: 500,
        color: 'var(--ink)', lineHeight: 1.12,
        marginBottom: '0.7rem',
      }}>
        {phase.title}
      </h3>

      {/* Description */}
      <p style={{
        fontSize: '0.8rem', color: 'var(--ink-muted)',
        fontWeight: 300, lineHeight: 1.7,
        marginBottom: '1.1rem',
      }}>
        {phase.description}
      </p>

      {/* Milestones */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        {phase.milestones.map((m, j) => (
          <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.55rem' }}>
            <span style={{
              width: 4, height: 4, borderRadius: '50%',
              background: phase.accent,
              flexShrink: 0, marginTop: '0.45rem',
            }} />
            <span style={{
              fontSize: '0.775rem', color: 'var(--ink-soft)',
              fontWeight: 300, lineHeight: 1.5,
            }}>
              {m}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
