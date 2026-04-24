import { useEffect, useRef, useState, useCallback } from 'react'

// ─── Phase data ────────────────────────────────────────────────────────────────
const PHASES = [
  {
    num: '01',
    title: 'Foundation',
    date: 'Q4 2024',
    status: 'complete',
    statusLabel: 'Complete',
    description: 'Brand identity, product vision, and core architecture. Defining what Circle is, who it serves, and how it grows.',
    milestones: ['Brand & visual system', 'Product architecture', 'Market research & validation'],
    accent: '#4AACCF',
  },
  {
    num: '02',
    title: 'MVP Build',
    date: 'Q1 2025',
    status: 'active',
    statusLabel: 'In Progress',
    description: 'Building the core product — event discovery, QR-based connections, user profiles, and community Circles.',
    milestones: ['Event creation & discovery', 'QR connection flow', 'User profiles & badge system'],
    accent: '#E8863A',
  },
  {
    num: '03',
    title: 'Beta Launch',
    date: 'Q2 2025',
    status: 'upcoming',
    statusLabel: 'Coming Soon',
    description: 'Invite-only access for early adopters. Real-world feedback to sharpen every detail before opening the doors.',
    milestones: ['Closed beta program', 'Feedback & iteration loops', 'Performance & stability tuning'],
    accent: '#7EC8E3',
  },
  {
    num: '04',
    title: 'Public Release',
    date: 'Q3 2025',
    status: 'planned',
    statusLabel: 'Planned',
    description: 'Open launch with full host tools, business profiles, ticketing integrations, and the Circle reward system.',
    milestones: ['App Store & Play Store launch', 'Host subscription tiers', 'Reward & loyalty system'],
    accent: '#C9AA7A',
  },
  {
    num: '05',
    title: 'Expansion',
    date: '2026',
    status: 'future',
    statusLabel: 'Future',
    description: 'Growing into new cities, global partnerships, and deepening the social layer that keeps communities alive between events.',
    milestones: ['Multi-city & global rollout', 'Brand & venue partnerships', 'Social feed & stories'],
    accent: '#A89080',
  },
]

const STATUS_STYLE = {
  complete: { bg: 'rgba(74,172,207,0.12)',  color: '#4AACCF', pulse: false },
  active:   { bg: 'rgba(232,134,58,0.13)',  color: '#E8863A', pulse: true  },
  upcoming: { bg: 'rgba(26,22,18,0.07)',    color: '#7A6F65', pulse: false },
  planned:  { bg: 'rgba(26,22,18,0.05)',    color: '#A0948A', pulse: false },
  future:   { bg: 'rgba(26,22,18,0.04)',    color: '#BBADA4', pulse: false },
}

function buildCubicPath(nodes) {
  let d = `M ${nodes[0].x} ${nodes[0].y}`
  for (let i = 1; i < nodes.length; i++) {
    const p = nodes[i - 1], c = nodes[i]
    const midY = (p.y + c.y) / 2
    d += ` C ${p.x} ${midY}, ${c.x} ${midY}, ${c.x} ${c.y}`
  }
  return d
}

// ─────────────────────────────────────────────────────────────────────────────
//  MOBILE SVG GEOMETRY — 1:1 pixel mapping
//
//  Key principle: M_VW === SVG_COL_W (both = 56px)
//  → viewBox units === CSS pixels on BOTH axes
//  → scale = 1:1, no distortion, no sub-pixel blurring
//  → circles are perfectly round, strokes are crisp
//  → dot/card positions need NO conversion: pt.x and pt.y are already CSS px
//
//  The S-curve fits within 56px wide:
//  - spine at x=28 (center of column)
//  - nodes alternate ±12px → x=40 or x=16
//  - plenty of visual weave for a slim column
// ─────────────────────────────────────────────────────────────────────────────

// Desktop
const D_VW    = 760
const D_SPINE = 380
const D_SWING = 55
const D_ROW   = 500

// Mobile — all units are CSS pixels (1:1 with viewBox)
const SVG_COL_W  = 56   // rendered px width AND viewBox width → scale = 1.0
const M_SPINE    = 28   // center of 56px column
const M_SWING    = 12   // node weave ±12px from spine
const M_ROW      = 420  // vertical spacing between nodes (px = viewBox units)

// Layout constants
const WRAPPER_PAD_LEFT   = 16   // section left padding
const COL_TO_CARD_GAP    = 12   // gap between SVG column right edge and card
const CARD_CONTAINER_X   = WRAPPER_PAD_LEFT + SVG_COL_W + COL_TO_CARD_GAP

// Node ring sizes (px, exact)
const M_NODE_OUTER_R = 14  // outer ring radius
const M_NODE_INNER_R = 5   // filled inner dot radius

export default function Phases() {
  const sectionRef = useRef(null)
  const pathRef    = useRef(null)
  const dotRef     = useRef(null)
  const svgRef     = useRef(null)
  const cardRefs   = useRef([])
  const rafRef     = useRef(null)

  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  )
  const [pathLen, setPathLen] = useState(0)

  // ── Breakpoint detection ────────────────────────────────────────────────────
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const handler = e => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // ── Geometry ────────────────────────────────────────────────────────────────
  const ROW   = isMobile ? M_ROW   : D_ROW
  const VW    = isMobile ? SVG_COL_W : D_VW   // mobile: VW = SVG_COL_W → 1:1
  const SPINE = isMobile ? M_SPINE : D_SPINE
  const SWING = isMobile ? M_SWING : D_SWING
  const VH    = PHASES.length * ROW + 120      // same units as ROW

  const NODES = PHASES.map((_, i) => ({
    x: SPINE + (i % 2 === 0 ? SWING : -SWING),
    y: 100 + i * ROW,
  }))

  const PATH_D = buildCubicPath(NODES)

  // ── Measure path ────────────────────────────────────────────────────────────
  useEffect(() => {
    const id = setTimeout(() => {
      const path = pathRef.current
      if (!path) return
      const len = path.getTotalLength()
      if (len > 0) {
        path.style.strokeDasharray  = `${len}`
        path.style.strokeDashoffset = `${len}`
        setPathLen(len)
      }
    }, 100)
    return () => clearTimeout(id)
  }, [isMobile, PATH_D])

  // ── Reset cards on breakpoint switch ────────────────────────────────────────
  useEffect(() => {
    cardRefs.current.forEach(c => {
      if (!c) return
      c.style.opacity   = '0'
      c.style.transform = 'translateY(16px)'
    })
  }, [isMobile])

  // ── Scroll handler ─────────────────────────────────────────────────────────
  const onScroll = useCallback(() => {
    const section = sectionRef.current
    const path    = pathRef.current
    const dot     = dotRef.current
    const svgEl   = svgRef.current
    if (!section || !path || !pathLen) return

    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      const rect       = section.getBoundingClientRect()
      const scrollable = section.offsetHeight - window.innerHeight
      const progress   = scrollable > 0
        ? Math.max(0, Math.min(1, -rect.top / scrollable))
        : 0

      path.style.strokeDashoffset = `${pathLen * (1 - progress)}`

      if (dot) {
        const safeP = Math.min(progress, 0.9999)
        const pt    = path.getPointAtLength(pathLen * safeP)

        if (isMobile) {
          // 1:1 mapping — pt.x and pt.y are already CSS px within the SVG column
          // Dot is positioned relative to mobile-wrapper (position:relative)
          // SVG column starts at WRAPPER_PAD_LEFT from wrapper left edge
          dot.style.left = `${WRAPPER_PAD_LEFT + pt.x}px`
          dot.style.top  = `${pt.y}px`
        } else {
          if (!svgEl) return
          const svgRect   = svgEl.getBoundingClientRect()
          const innerEl   = sectionRef.current.querySelector('.journey-inner')
          const innerRect = innerEl ? innerEl.getBoundingClientRect() : svgRect
          const scaleX    = svgRect.width  / D_VW
          const scaleY    = svgRect.height / VH
          dot.style.left  = `${(svgRect.left - innerRect.left) + pt.x * scaleX}px`
          dot.style.top   = `${pt.y * scaleY}px`
        }
      }

      NODES.forEach((node, i) => {
        const threshold = Math.max(0, (node.y - 80) / VH - 0.03)
        const card = cardRefs.current[i]
        if (!card) return
        const visible = progress >= threshold
        card.style.opacity   = visible ? '1' : '0'
        card.style.transform = visible ? 'translateY(0)' : 'translateY(16px)'
      })
    })
  }, [pathLen, NODES, VH, isMobile])

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafRef.current)
    }
  }, [onScroll])

  // ── Desktop card position ───────────────────────────────────────────────────
  function desktopCardStyle(node, i) {
    const nodeXPct = (node.x / D_VW) * 100
    const isRight  = i % 2 === 0
    return {
      position: 'absolute',
      top: node.y - 80,
      ...(isRight
        ? { right: `calc(100% - ${nodeXPct}% + 32px)`, left: 'auto'  }
        : { left:  `calc(${nodeXPct}% + 32px)`,        right: 'auto' }
      ),
      width: 'clamp(220px, 24vw, 285px)',
    }
  }

  // ─── MOBILE RENDER ──────────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <section
        id="phases"
        ref={sectionRef}
        style={{ background: 'var(--cream)', paddingBottom: '5rem', position: 'relative' }}
      >
        <SectionHeader />

        {/* Wrapper — position:relative anchors the dot */}
        <div
          style={{
            position: 'relative',
            paddingRight: 16,
          }}
        >
          {/* SVG column — pinned left, exact pixel dimensions */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: WRAPPER_PAD_LEFT,
            width: SVG_COL_W,
            height: VH,
            zIndex: 1,
            pointerEvents: 'none',
          }}>
            <svg
              ref={svgRef}
              // viewBox width === rendered width === SVG_COL_W
              // → scale = 1:1 on both axes → crisp, no distortion
              viewBox={`0 0 ${SVG_COL_W} ${VH}`}
              preserveAspectRatio="xMidYMin meet"
              aria-hidden="true"
              style={{
                display: 'block',
                width: SVG_COL_W,
                height: VH,
                overflow: 'visible',
                // Hint browser to rasterize on GPU layer → crisp on retina
                willChange: 'transform',
              }}
            >
              <defs>
                <linearGradient id="mobileGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor="#4AACCF" stopOpacity="0.9" />
                  <stop offset="40%"  stopColor="#E8863A" stopOpacity="0.9" />
                  <stop offset="75%"  stopColor="#C9AA7A" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#A89080" stopOpacity="0.7"  />
                </linearGradient>
              </defs>

              {/* Ghost track */}
              <path
                d={PATH_D}
                fill="none"
                stroke="rgba(26,22,18,0.09)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              {/* Animated draw path */}
              <path
                ref={pathRef}
                d={PATH_D}
                fill="none"
                stroke="url(#mobileGrad)"
                strokeWidth="2"
                strokeLinecap="round"
              />

              {/* Node rings — coordinates are exact px, circles are perfectly round */}
              {NODES.map((pos, i) => {
                const p = PHASES[i]
                return (
                  <g key={i}>
                    <circle
                      cx={pos.x} cy={pos.y}
                      r={M_NODE_OUTER_R}
                      fill="var(--cream)"
                      stroke={p.accent}
                      strokeWidth="1.5"
                    />
                    <circle
                      cx={pos.x} cy={pos.y}
                      r={M_NODE_INNER_R}
                      fill={p.status === 'future' ? 'rgba(26,22,18,0.14)' : p.accent}
                    />
                  </g>
                )
              })}
            </svg>
          </div>

          {/* Traveling dot — positioned in same relative context as wrapper */}
          <div
            ref={dotRef}
            style={{
              position: 'absolute',
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: 'var(--ink)',
              border: '2px solid var(--cream)',
              boxShadow: '0 0 0 2.5px rgba(26,22,18,0.1)',
              transform: 'translate(-50%, -50%)',
              zIndex: 10,
              pointerEvents: 'none',
              willChange: 'top, left',
            }}
          />

          {/* Card column — right of SVG */}
          <div style={{
            position: 'relative',
            marginLeft: CARD_CONTAINER_X,
            height: VH,
          }}>
            {PHASES.map((phase, i) => {
              const node = NODES[i]
              // node.y is exact CSS px (1:1 mapping) — align card with node center
              const CARD_TOP_OFFSET = M_NODE_OUTER_R + 4  // just below node ring top
              return (
                <div
                  key={i}
                  ref={el => { cardRefs.current[i] = el }}
                  style={{
                    position: 'absolute',
                    top: node.y - CARD_TOP_OFFSET,
                    left: 0,
                    right: 0,
                    opacity: 0,
                    transform: 'translateY(16px)',
                    transition: 'opacity 0.5s ease, transform 0.5s ease',
                    zIndex: 5,
                  }}
                >
                  <PhaseCard phase={phase} />
                </div>
              )
            })}
          </div>
        </div>

        <style>{`
          @keyframes phasePulse {
            0%,100% { opacity:1; transform:scale(1);   }
            50%      { opacity:.5; transform:scale(.78); }
          }
        `}</style>
      </section>
    )
  }

  // ─── DESKTOP RENDER ─────────────────────────────────────────────────────────
  return (
    <section
      id="phases"
      ref={sectionRef}
      style={{ background: 'var(--cream)', paddingBottom: '8rem', position: 'relative' }}
    >
      <SectionHeader />

      <div style={{ position: 'relative', maxWidth: 960, margin: '0 auto', padding: '0 1.5rem' }}>
        <div className="journey-inner" style={{ position: 'relative', height: VH }}>

          <svg
            ref={svgRef}
            viewBox={`0 0 ${D_VW} ${VH}`}
            preserveAspectRatio="xMidYMin meet"
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: 0, left: '50%',
              transform: 'translateX(-50%)',
              width: '100%',
              maxWidth: D_VW,
              height: VH,
              overflow: 'visible',
              pointerEvents: 'none',
            }}
          >
            <defs>
              <linearGradient id="roadGradD" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor="#4AACCF" stopOpacity="0.9" />
                <stop offset="40%"  stopColor="#E8863A" stopOpacity="0.9" />
                <stop offset="75%"  stopColor="#C9AA7A" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#A89080" stopOpacity="0.7"  />
              </linearGradient>
            </defs>
            <path d={PATH_D} fill="none" stroke="rgba(26,22,18,0.07)" strokeWidth="1.5" strokeLinecap="round" />
            <path ref={pathRef} d={PATH_D} fill="none" stroke="url(#roadGradD)" strokeWidth="2.2" strokeLinecap="round" />
            {NODES.map((pos, i) => {
              const p = PHASES[i]
              return (
                <g key={i}>
                  <circle cx={pos.x} cy={pos.y} r={23} fill="var(--cream)" stroke={p.accent} strokeWidth="1.5" />
                  <circle cx={pos.x} cy={pos.y} r={7}  fill={p.status === 'future' ? 'rgba(26,22,18,0.14)' : p.accent} />
                  <text
                    x={pos.x} y={pos.y + 0.5}
                    textAnchor="middle" dominantBaseline="middle"
                    fontSize="8" fontFamily="DM Sans, sans-serif"
                    fontWeight="500" fill={p.accent}
                    style={{ userSelect: 'none' }}
                  >
                    {p.num}
                  </text>
                </g>
              )
            })}
          </svg>

          <div ref={dotRef} style={{
            position: 'absolute',
            width: 12, height: 12,
            borderRadius: '50%',
            background: 'var(--ink)',
            border: '2.5px solid var(--cream)',
            boxShadow: '0 0 0 3px rgba(26,22,18,0.09)',
            transform: 'translate(-50%, -50%)',
            zIndex: 10,
            pointerEvents: 'none',
            willChange: 'top, left',
          }} />

          {PHASES.map((phase, i) => (
            <div
              key={i}
              ref={el => { cardRefs.current[i] = el }}
              style={{
                opacity: 0,
                transform: 'translateY(16px)',
                transition: 'opacity 0.5s ease, transform 0.5s ease',
                zIndex: 5,
                ...desktopCardStyle(NODES[i], i),
              }}
            >
              <PhaseCard phase={phase} />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes phasePulse {
          0%,100% { opacity:1; transform:scale(1);   }
          50%      { opacity:.5; transform:scale(.78); }
        }
      `}</style>
    </section>
  )
}

// ─── Section header ────────────────────────────────────────────────────────────
function SectionHeader() {
  return (
    <div style={{
      textAlign: 'center',
      padding: 'clamp(4.5rem, 8vw, 7.5rem) clamp(1.5rem, 5vw, 3rem) 0',
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
        fontWeight: 300, lineHeight: 1.1, color: 'var(--ink)',
        marginBottom: '1.1rem',
      }}>
        The road to{' '}
        <em style={{ fontStyle: 'italic', color: 'var(--orange-dark)' }}>your circle</em>
      </h2>
      <p style={{
        fontSize: 'clamp(0.875rem, 1.8vw, 1rem)',
        color: 'var(--ink-muted)', fontWeight: 300, lineHeight: 1.7,
      }}>
        Five phases. One destination — a world where you never feel like a stranger.
      </p>
    </div>
  )
}

// ─── Phase card ────────────────────────────────────────────────────────────────
function PhaseCard({ phase }) {
  const [hovered, setHovered] = useState(false)
  const s = STATUS_STYLE[phase.status]

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#FDFAF5',
        border: '1px solid rgba(26,22,18,0.08)',
        borderRadius: 18,
        padding: 'clamp(1rem, 3vw, 1.4rem)',
        boxShadow: hovered
          ? '0 14px 44px rgba(26,22,18,0.1)'
          : '0 3px 18px rgba(26,22,18,0.055)',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        transition: 'box-shadow 0.28s ease, transform 0.28s ease',
      }}
    >
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: '0.38rem',
        background: s.bg, borderRadius: 100,
        padding: '0.27rem 0.72rem', marginBottom: '0.75rem',
      }}>
        <span style={{
          width: 5, height: 5, borderRadius: '50%',
          background: s.color, flexShrink: 0,
          animation: s.pulse ? 'phasePulse 1.8s ease-in-out infinite' : 'none',
        }} />
        <span style={{
          fontSize: '0.63rem', fontWeight: 500,
          letterSpacing: '0.09em', textTransform: 'uppercase',
          color: s.color,
        }}>
          {phase.statusLabel}
        </span>
      </div>

      <p style={{ fontSize: '0.7rem', color: 'var(--ink-muted)', marginBottom: '0.2rem' }}>
        {phase.date}
      </p>
      <h3 style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
        fontWeight: 500, color: 'var(--ink)',
        lineHeight: 1.1, marginBottom: '0.5rem',
      }}>
        {phase.title}
      </h3>
      <p style={{
        fontSize: '0.775rem', color: 'var(--ink-muted)',
        fontWeight: 300, lineHeight: 1.65, marginBottom: '0.8rem',
      }}>
        {phase.description}
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
        {phase.milestones.map((m, j) => (
          <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.45rem' }}>
            <span style={{
              width: 4, height: 4, borderRadius: '50%',
              background: phase.accent, flexShrink: 0, marginTop: '0.42rem',
            }} />
            <span style={{ fontSize: '0.73rem', color: 'var(--ink-soft)', fontWeight: 300, lineHeight: 1.5 }}>
              {m}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
