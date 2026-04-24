import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'

const USER_TYPES = ['Traveler', 'Local', 'Creator', 'Host', 'Other']

const FIELD_STYLE = {
  width: '100%',
  background: 'rgba(245,240,232,0.06)',
  border: '1px solid rgba(245,240,232,0.14)',
  borderRadius: 12,
  padding: '0.9rem 1.1rem',
  fontSize: '0.9rem',
  fontFamily: "'DM Sans', sans-serif",
  fontWeight: 300,
  color: '#F5F0E8',
  outline: 'none',
  transition: 'border-color 0.2s ease, background 0.2s ease',
  boxSizing: 'border-box',
}

export default function WaitlistForm({ onSubmit }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    city: '',
    type: '',
    hope: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [focused, setFocused]   = useState(null)
  const containerRef = useRef()
  const successRef   = useRef()

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = e => {
    e.preventDefault()
    // Frontend only — no submission yet
    // TODO: wire to backend / email service
    setSubmitted(true)
    if (onSubmit) onSubmit(form)
  }

  // Entrance animation
  useEffect(() => {
    if (!containerRef.current) return
    gsap.fromTo(
      containerRef.current.querySelectorAll('.form-row'),
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.1, delay: 0.2 }
    )
  }, [])

  // Success state animation
  useEffect(() => {
    if (!submitted || !successRef.current) return
    gsap.fromTo(successRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
    )
  }, [submitted])

  if (submitted) {
    return (
      <div
        ref={successRef}
        style={{ textAlign: 'center', padding: '3rem 0', opacity: 0 }}
      >
        <p style={{
          fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.16em',
          textTransform: 'uppercase', color: '#4AACCF',
          marginBottom: '1.25rem',
        }}>
          You're in
        </p>
        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(2rem, 5vw, 3.25rem)',
          fontWeight: 300, lineHeight: 1.1,
          color: '#F5F0E8',
          marginBottom: '1rem',
        }}>
          Your circle is waiting.
        </h2>
        <p style={{
          fontSize: '0.9rem', color: 'rgba(245,240,232,0.55)',
          fontWeight: 300, lineHeight: 1.7, maxWidth: 360, margin: '0 auto',
        }}>
          We'll reach out as soon as Circle is ready for you. Keep an eye on your inbox.
        </p>
      </div>
    )
  }

  const fieldFocus = name => ({
    onFocus: () => setFocused(name),
    onBlur:  () => setFocused(null),
    style: {
      ...FIELD_STYLE,
      borderColor: focused === name ? 'rgba(245,240,232,0.4)' : 'rgba(245,240,232,0.14)',
      background:  focused === name ? 'rgba(245,240,232,0.09)' : 'rgba(245,240,232,0.06)',
    }
  })

  return (
    <form ref={containerRef} onSubmit={handleSubmit} style={{ width: '100%' }}>

      {/* Name + Email row */}
      <div className="form-row" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '0.75rem',
        marginBottom: '0.75rem',
        opacity: 0,
      }}>
        <div>
          <label style={labelStyle}>Name</label>
          <input
            name="name" type="text"
            placeholder="Your name"
            value={form.name}
            onChange={handleChange}
            required
            {...fieldFocus('name')}
          />
        </div>
        <div>
          <label style={labelStyle}>Email</label>
          <input
            name="email" type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            required
            {...fieldFocus('email')}
          />
        </div>
      </div>

      {/* City */}
      <div className="form-row" style={{ marginBottom: '0.75rem', opacity: 0 }}>
        <label style={labelStyle}>City or Location</label>
        <input
          name="city" type="text"
          placeholder="Where are you based?"
          value={form.city}
          onChange={handleChange}
          {...fieldFocus('city')}
          style={{ ...fieldFocus('city').style, width: '100%' }}
        />
      </div>

      {/* User type — pill selector */}
      <div className="form-row" style={{ marginBottom: '0.75rem', opacity: 0 }}>
        <label style={labelStyle}>What best describes you?</label>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
          {USER_TYPES.map(type => {
            const selected = form.type === type
            return (
              <button
                key={type}
                type="button"
                onClick={() => setForm(f => ({ ...f, type }))}
                style={{
                  padding: '0.45rem 1.1rem',
                  borderRadius: '100px',
                  border: `1px solid ${selected ? 'rgba(245,240,232,0.55)' : 'rgba(245,240,232,0.14)'}`,
                  background: selected ? 'rgba(245,240,232,0.12)' : 'transparent',
                  color: selected ? '#F5F0E8' : 'rgba(245,240,232,0.45)',
                  fontSize: '0.8rem',
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: selected ? 500 : 300,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  letterSpacing: '0.01em',
                }}
              >
                {type}
              </button>
            )
          })}
        </div>
      </div>

      {/* Hope textarea */}
      <div className="form-row" style={{ marginBottom: '1.5rem', opacity: 0 }}>
        <label style={labelStyle}>What are you hoping to find on Circle?</label>
        <textarea
          name="hope"
          placeholder="Events, friends, community, travel partners..."
          value={form.hope}
          onChange={handleChange}
          rows={3}
          {...fieldFocus('hope')}
          style={{
            ...fieldFocus('hope').style,
            width: '100%',
            resize: 'vertical',
            minHeight: 80,
            lineHeight: 1.6,
          }}
        />
      </div>

      {/* Submit */}
      <div className="form-row" style={{ opacity: 0 }}>
        <button
          type="submit"
          className="waitlist-submit"
          style={{
            width: '100%',
            padding: '1rem',
            borderRadius: '100px',
            border: 'none',
            background: '#F5F0E8',
            color: '#1A1612',
            fontSize: '0.9375rem',
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 500,
            letterSpacing: '0.01em',
            cursor: 'pointer',
            transition: 'opacity 0.2s, transform 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-1px)' }}
          onMouseLeave={e => { e.currentTarget.style.opacity = '1';    e.currentTarget.style.transform = 'translateY(0)'    }}
        >
          Reserve my spot →
        </button>

        <p style={{
          textAlign: 'center',
          marginTop: '1.1rem',
          fontSize: '0.75rem',
          color: 'rgba(245,240,232,0.3)',
          fontWeight: 300,
          letterSpacing: '0.01em',
        }}>
          No spam. No noise. Just your circle, when it's ready.
        </p>
      </div>
    </form>
  )
}

const labelStyle = {
  display: 'block',
  fontSize: '0.7rem',
  fontWeight: 500,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: 'rgba(245,240,232,0.4)',
  marginBottom: '0.45rem',
  fontFamily: "'DM Sans', sans-serif",
}
