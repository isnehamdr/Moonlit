import { useEffect, useRef, useState } from 'react'

/*
  NAVBAR (Wyndham layout, Moonlit content and colours)

  Scroll behaviour:
    - The announcement strip scrolls away with the page.
    - Scrolling DOWN: the main bar slides out of sight, the search band stays pinned at the top.
    - Scrolling UP: the main bar slides back in above the search band.

  Search band:
    - 1024px and up: one full row (destination, dates, rooms and guests, rates, search).
    - Below 1024px: one slim row showing a summary. Tap it to open the full form as a panel,
      so the pinned band never covers the screen on phones and tablets.

  Menu on phones and tablets:
    - The hamburger opens a full-screen menu that slides in from the right and slides back out
      when closed. It has a "Book now" button that opens the search panel.

  Client colours, written as hex codes:
    Midnight Navy #0B1B33 · Royal Navy #152A4D · Moonlit Gold #C6A560
    Burnished Gold #A8842F · Himalayan White #F6F4EF · Slate Stone #5F6B7A

  Swap this one line if the project uses Inertia:
  import { Link as NavLink } from '@inertiajs/react'
*/
const NavLink = ({ href, children, ...props }) => (
  <a href={href} {...props}>{children}</a>
)

// The bar is dark, so use the gold or white version of the logo (from Moonlit_Logo_Pack.zip)
const LOGO = '/images/logo.png'

/* ------------------------------- content ------------------------------- */
const announcements = [
  { label: 'Moonlit Circle:', text: 'One loyalty program for every Moonlit hotel. Join free when it launches.', link: 'Learn more', href: '/moonlit-circle' },
  { label: 'Franchise:', text: 'Moonlit Select, Inn and Hearth first. Grand and Sanctuary by approval.', link: 'See how it works', href: '/services/franchise' },
  { label: 'For hotel owners:', text: 'Start with an Asset Health Check or a site visit.', link: 'Get in touch', href: '/contact?type=health-check' },
]

const brands = [
  { name: 'Moonlit Grand', desc: "The city's address", href: '/brands/grand', color: '#6B1E2E' },
  { name: 'Moonlit Sanctuary', desc: 'Restore in the mountains', href: '/brands/sanctuary', color: '#2F5D50' },
  { name: 'Moonlit Select', desc: 'Smart, comfortable, dependable', href: '/brands/select', color: '#2A6496' },
  { name: 'Moonlit Inn', desc: 'Good rest on every road', href: '/brands/inn', color: '#B5541C' },
  { name: 'Moonlit Hearth', desc: 'Stay inside the story', href: '/brands/hearth', color: '#7B3F26' },
]
const services = [
  { name: 'Management', desc: 'We run your hotel, you own it', href: '/services/management' },
  { name: 'Franchise', desc: 'Operate under a Moonlit brand', href: '/services/franchise' },
  { name: 'Consulting and pre-opening', desc: 'Concept, budgets, SOPs, hiring', href: '/services/consulting' },
  { name: 'Conversion', desc: 'Relaunch an existing hotel', href: '/services/conversion' },
]
const circle = [
  { name: 'How it works', desc: 'Join free, stay and earn, rise', href: '/moonlit-circle' },
  { name: 'The four tiers', desc: 'Crescent, Half Moon, Full Moon, Supermoon', href: '/moonlit-circle#tiers' },
  { name: 'Member benefits', desc: 'Member rates, upgrades, lounge access', href: '/moonlit-circle#benefits' },
]
const about = [
  { name: 'Our story', desc: 'Vision and mission', href: '/about' },
  { name: 'Leadership', desc: 'The people behind MHR', href: '/about/leadership' },
  { name: 'Why owners choose us', desc: 'Our approach to your asset', href: '/about/why-mhr' },
]
const partner = [
  { name: 'Start a franchise conversation', desc: 'Brand, standards and training', href: '/services/franchise' },
  { name: 'Book an Asset Health Check', desc: 'For hotel and resort owners', href: '/contact?type=health-check' },
  { name: 'Contact the team', desc: 'marketing@moonlithotels.com', href: '/contact' },
]

// Every menu is a wide panel: content on the left, image with text and a button on the right.
// kind 'brands' = brand tiles on the left, left to right (3 per row on wide screens)
// kind 'list'   = a list of links on the left
//                 (image files go in public/images/menu/)
const menus = [
  {
  id: 'brands',
  kind: 'brands',
  label: 'Our brands',
  items: brands,
},
  { id: 'services', kind: 'list', label: 'Services', items: services,
    image: { src: '/images/service.jpg', alt: 'Hotel management team at work', from: '#152A4D', to: '#0B1B33',
      title: 'Hotel & Resort Owners', text: 'One accountable team, from first sketch to sustained performance.',
      cta: 'Learn more', href: '/services' } },
  { id: 'circle', kind: 'list', label: 'Moonlit Circle', items: circle, footer: { name: 'Join free', href: '/moonlit-circle' },
    image: { src: '/images/loyalty.jpg', alt: 'A guest being welcomed at a Moonlit hotel', from: '#0B1B33', to: '#A8842F',
      title: 'Moonlit Circle', text: 'One loyalty program for every Moonlit hotel. Your light is on wherever you stay.',
      cta: 'Join free', href: '/moonlit-circle' } },
  { id: 'about', kind: 'list', label: 'About', items: about,
    image: { src: '/images/about.jpg', alt: 'Kathmandu, where Moonlit Hotels & Resorts is based', from: '#152A4D', to: '#5F6B7A',
      title: 'Global standards, local soul', text: 'A Kathmandu-based team guiding hotels and resorts from first sketch to sustained performance.',
      cta: 'Learn more', href: '/about' } },
  { id: 'partner', kind: 'list', label: 'Partner with us', items: partner,
    image: { src: '/images/partner.jpg', alt: 'Hotel owner meeting the Moonlit team', from: '#0B1B33', to: '#152A4D',
      title: 'Partner with us', text: 'A partner through every season and market cycle. Start with a first conversation.',
      cta: 'Get in touch', href: '/contact?type=partner' } },
]

/* ------------------------------- small parts ------------------------------- */
const Caret = ({ open }) => (
  <svg viewBox="0 0 10 6" aria-hidden="true" className={`h-1.5 w-2.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
    <path d="M0 0h10L5 6z" fill="currentColor" />
  </svg>
)
const ring = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A560]'
const ringLight = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B1B33]'

/* Dropdown list: Himalayan White card, Royal Navy on hover */
function ItemList({ items, footer, onNavigate }) {
  return (
    <ul>
      {items.map((i) => (
        <li key={i.name}>
          <NavLink href={i.href} onClick={onNavigate}
            className="group block rounded-md px-4 py-3 hover:bg-[#152A4D] focus-visible:bg-[#152A4D] focus-visible:outline-none">
            <span className="block text-[15px] font-semibold text-[#0B1B33] group-hover:text-[#F6F4EF] group-focus-visible:text-[#F6F4EF]">{i.name}</span>
            <span className="block text-sm text-[#5F6B7A] group-hover:text-[#F6F4EF]/75 group-focus-visible:text-[#F6F4EF]/75">{i.desc}</span>
          </NavLink>
        </li>
      ))}
      {footer && (
        <li className="mt-1 border-t border-[#5F6B7A]/25 pt-1">
          <NavLink href={footer.href} onClick={onNavigate}
            className="block rounded-md px-4 py-3 text-[15px] font-semibold text-[#A8842F] hover:bg-[#152A4D] hover:text-[#F6F4EF] focus-visible:bg-[#152A4D] focus-visible:text-[#F6F4EF] focus-visible:outline-none">
            {footer.name}
          </NavLink>
        </li>
      )}
    </ul>
  )
}

/* Brand "image": a rounded square in the brand colour with the gold MHR mark, 48px (h-12 w-12) */
function BrandTile({ color }) {
  return (
    <span aria-hidden="true" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl shadow-[inset_0_0_0_1px_rgba(255,255,255,.08)]"
      style={{ backgroundColor: color }}>
      <span className="font-serif text-[14px] leading-none text-[#C6A560]">MHR</span>
    </span>
  )
}

/* Brands, left to right. If a row is not full, the empty cells stay empty, so more brands can be added later. */
function BrandGrid({ items, footer, onNavigate, className }) {
  return (
    <div>
      <ul className={className}>
        {items.map((b) => (
          <li key={b.name}>
            <NavLink href={b.href} onClick={onNavigate}
              className="group flex items-center gap-3 rounded-lg p-3 hover:bg-[#152A4D] focus-visible:bg-[#152A4D] focus-visible:outline-none">
              <BrandTile color={b.color} />
              <span className="min-w-0">
                <span className="block text-[15px] font-semibold text-[#0B1B33] group-hover:text-[#F6F4EF] group-focus-visible:text-[#F6F4EF]">{b.name}</span>
                <span className="block text-sm text-[#5F6B7A] group-hover:text-[#F6F4EF]/75 group-focus-visible:text-[#F6F4EF]/75">{b.desc}</span>
              </span>
            </NavLink>
          </li>
        ))}
      </ul>
      {footer && (
        <div className="mt-2 border-t border-[#5F6B7A]/25 pt-2">
          <NavLink href={footer.href} onClick={onNavigate}
            className="inline-block rounded-md px-3 py-2 text-[15px] font-semibold text-[#A8842F] hover:bg-[#152A4D] hover:text-[#F6F4EF] focus-visible:bg-[#152A4D] focus-visible:text-[#F6F4EF] focus-visible:outline-none">
            {footer.name}
          </NavLink>
        </div>
      )}
    </div>
  )
}

/*
  Image on the right of a dropdown, with a title, text and an outlined button on top (like Wyndham's panel).
  If the file is missing, a colour block with moon rings is shown. `compact` = title only (used in the phone menu).
*/
function MenuImage({ src, alt, title, text, cta, href, from, to, className = '', compact = false, onNavigate }) {
  const [failed, setFailed] = useState(false)
  return (
    <div className={`relative overflow-hidden ${compact ? 'rounded-lg' : ''} ${className}`}>
      {src && !failed ? (
        <img src={src} alt={alt} loading="lazy" decoding="async" onError={() => setFailed(true)} className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        <div aria-hidden="true" className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${from} 0%, ${to} 100%)` }}>
          <svg viewBox="0 0 200 200" className="absolute -right-10 top-1/2 h-[130%] w-auto -translate-y-1/2 opacity-30">
            <circle cx="100" cy="100" r="95" fill="none" stroke="#C6A560" strokeWidth="1" />
            <circle cx="100" cy="100" r="60" fill="none" stroke="#C6A560" strokeWidth=".8" />
            <circle cx="100" cy="100" r="32" fill="#C6A560" fillOpacity=".55" />
            <circle cx="114" cy="92" r="30" fill={from} />
          </svg>
        </div>
      )}

      {compact ? (
        <p className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0B1B33]/90 via-[#0B1B33]/55 to-transparent px-4 pb-4 pt-12 text-[14px] font-semibold leading-snug text-[#F6F4EF]">
          {title}
        </p>
      ) : (
        <>
          {/* darker on the left so the text is easy to read on any photo */}
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-[#0B1B33]/85 via-[#0B1B33]/50 to-[#0B1B33]/10" />
          <div className="relative flex h-full flex-col justify-center p-8 xl:p-12">
            <h3 className="max-w-sm text-[28px] font-bold leading-tight text-[#F6F4EF] xl:text-[32px]">{title}</h3>
            <p className="mt-4 max-w-sm text-[16px] leading-relaxed text-[#F6F4EF] xl:text-[18px]">{text}</p>
            <NavLink href={href} onClick={onNavigate}
              className="mt-7 inline-block w-fit border-2 border-[#F6F4EF] px-10 py-3.5 text-[13px] font-bold uppercase tracking-wide text-[#F6F4EF] transition-colors hover:bg-[#F6F4EF] hover:text-[#0B1B33] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A560] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1B33]">
              {cta}
            </NavLink>
          </div>
        </>
      )}
    </div>
  )
}

/* ------------------------------- 1. announcement strip (scrolls away) ------------------------------- */
function Announcement() {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const n = announcements.length

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setPaused(true); return }
  }, [])
  useEffect(() => {
    if (paused) return
    const t = setInterval(() => setI((v) => (v + 1) % n), 6000)
    return () => clearInterval(t)
  }, [paused, n])

  const a = announcements[i]
  const arrow = `flex h-8 w-8 shrink-0 items-center justify-center text-[#C6A560] hover:text-[#F6F4EF] ${ring}`
  return (
    <div role="region" aria-roledescription="carousel" aria-label="Announcements"
      className="bg-[#152A4D] text-[#F6F4EF]"
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
      <div className="mx-auto flex min-h-[44px] max-w-7xl items-center gap-1 px-2 py-1.5 sm:px-4">
        <button type="button" aria-label="Previous announcement" className={arrow} onClick={() => setI((i - 1 + n) % n)}>
          <svg viewBox="0 0 8 12" aria-hidden="true" className="h-3 w-2"><path d="M7 1 1.5 6 7 11z" fill="currentColor" /></svg>
        </button>
        <p aria-live="polite" className="flex-1 text-center text-[12px] leading-snug sm:text-[13px]">
          <span className="font-bold uppercase text-[#C6A560]">{a.label}</span>{' '}
          {a.text}{' '}
          <NavLink href={a.href} className="whitespace-nowrap font-semibold underline underline-offset-2 hover:text-[#C6A560] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A560]">
            {a.link}
          </NavLink>
        </p>
        <button type="button" aria-label="Next announcement" className={arrow} onClick={() => setI((i + 1) % n)}>
          <svg viewBox="0 0 8 12" aria-hidden="true" className="h-3 w-2"><path d="M1 1l5.5 5L1 11z" fill="currentColor" /></svg>
        </button>
      </div>
    </div>
  )
}

/* ------------------------------- 3. search band (always pinned) ------------------------------- */
const iso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
const addDays = (s, n) => { const d = new Date(`${s}T00:00:00`); d.setDate(d.getDate() + n); return iso(d) }
const fmt = (s) => new Date(`${s}T00:00:00`)
  .toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })
  .replace(/(\d+), (\d{4})/, '$1 $2')
const fmtShort = (s) => new Date(`${s}T00:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

const box = 'rounded-sm border border-[#5F6B7A]/40 bg-white focus-within:ring-2 focus-within:ring-[#0B1B33]'

function DateField({ label, value, min, onChange }) {
  return (
    <label className="relative flex h-12 min-w-0 flex-1 cursor-pointer flex-col justify-center px-3">
      <span className="text-[10px] uppercase leading-none text-[#5F6B7A]">{label}</span>
      <span className="mt-1 truncate text-[13px] font-semibold uppercase leading-none text-[#0B1B33]">{fmt(value)}</span>
      <input type="date" value={value} min={min} aria-label={label}
        onChange={(e) => e.target.value && onChange(e.target.value)}
        onClick={(e) => { try { e.currentTarget.showPicker?.() } catch (_) {} }}
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0" />
    </label>
  )
}

function Stepper({ label, value, min, max, onChange }) {
  const btn = `flex h-9 w-9 items-center justify-center rounded-full border border-[#0B1B33]/40 text-xl leading-none text-[#0B1B33] hover:bg-[#0B1B33] hover:text-[#F6F4EF] disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-[#0B1B33] ${ringLight}`
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-[15px] font-semibold text-[#0B1B33]">{label}</span>
      <div className="flex items-center gap-3">
        <button type="button" aria-label={`Fewer ${label.toLowerCase()}`} disabled={value <= min} onClick={() => onChange(value - 1)} className={btn}>&minus;</button>
        <span className="w-5 text-center text-[15px] font-semibold text-[#0B1B33]" aria-live="polite">{value}</span>
        <button type="button" aria-label={`More ${label.toLowerCase()}`} disabled={value >= max} onClick={() => onChange(value + 1)} className={btn}>+</button>
      </div>
    </div>
  )
}

function SearchBand({ onSearch, panelOpen, setPanelOpen }) {
  const [dest, setDest] = useState('')
  const [checkIn, setCheckIn] = useState(() => iso(new Date()))
  const [checkOut, setCheckOut] = useState(() => addDays(iso(new Date()), 1))
  const [rooms, setRooms] = useState(1)
  const [guests, setGuests] = useState(1)
  const [rate, setRate] = useState('')
  const [guestOpen, setGuestOpen] = useState(false)
  const guestRef = useRef(null)
  const bandRef = useRef(null)

  useEffect(() => {
    const onDown = (e) => {
      if (guestRef.current && !guestRef.current.contains(e.target)) setGuestOpen(false)
      if (bandRef.current && !bandRef.current.contains(e.target)) setPanelOpen(false)
    }
    const onKey = (e) => { if (e.key === 'Escape') { setGuestOpen(false); setPanelOpen(false) } }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onKey) }
  }, [setPanelOpen])

  const changeCheckIn = (v) => { setCheckIn(v); if (checkOut <= v) setCheckOut(addDays(v, 1)) }
  const changeRooms = (v) => { setRooms(v); if (guests < v) setGuests(v) }

  const submit = (e) => {
    e.preventDefault()
    setPanelOpen(false)
    const params = { destination: dest.trim(), checkin: checkIn, checkout: checkOut, rooms, guests, rate }
    if (onSearch) return onSearch(params)
    const q = new URLSearchParams(Object.fromEntries(Object.entries(params).filter(([, v]) => v !== '' && v != null)))
    window.location.assign(`/find-a-hotel?${q.toString()}`)
  }

  const guestLabel = `${rooms} ROOM${rooms > 1 ? 'S' : ''}, ${guests} GUEST${guests > 1 ? 'S' : ''}`
  const summaryMain = dest.trim() || 'Where to?'
  const summarySub = `${fmtShort(checkIn)} - ${fmtShort(checkOut)} · ${rooms} room${rooms > 1 ? 's' : ''} · ${guests} guest${guests > 1 ? 's' : ''}`

  return (
    <section ref={bandRef} aria-label="Find a stay" className="relative z-10 border-b border-[#5F6B7A]/25 bg-[#F6F4EF]">
      {/* below 1024px: one slim row that opens the form as a panel */}
      <div className="lg:hidden">
        <button type="button" aria-expanded={panelOpen} aria-controls="search-panel" onClick={() => setPanelOpen(!panelOpen)}
          className={`mx-auto flex h-14 w-full max-w-7xl items-center gap-3 px-4 text-left sm:px-6 ${ringLight}`}>
          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 shrink-0 text-[#5F6B7A]">
            <circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
            <path d="m15.5 15.5 5 5" stroke="currentColor" strokeWidth="1.6" fill="none" />
          </svg>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[14px] font-semibold leading-tight text-[#0B1B33]">{summaryMain}</span>
            <span className="block truncate text-[12px] leading-tight text-[#5F6B7A]">{summarySub}</span>
          </span>
          <span className="shrink-0 rounded-sm bg-[#C6A560] px-4 py-2 text-[12px] font-bold uppercase tracking-wide text-[#0B1B33]">
            {panelOpen ? 'Close' : 'Search'}
          </span>
        </button>
      </div>

      {/* the form: a panel below 1024px, a full row at 1024px and up */}
      <form id="search-panel" onSubmit={submit} autoComplete="off" role="search"
        className={`${panelOpen ? 'block' : 'hidden'} absolute inset-x-0 top-full max-h-[calc(100svh-140px)] overflow-y-auto border-t border-[#5F6B7A]/25 bg-[#F6F4EF] shadow-[0_14px_28px_rgba(11,27,51,.25)] lg:static lg:block lg:max-h-none lg:overflow-visible lg:border-0 lg:shadow-none`}>
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-2 px-4 py-4 sm:gap-3 sm:px-6 lg:flex lg:items-stretch lg:px-8 lg:py-3">
          {/* destination */}
          <label className={`${box} col-span-2 flex h-12 min-w-0 items-center gap-3 px-3 lg:flex-[2.3]`}>
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 shrink-0 text-[#5F6B7A]">
              <circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
              <path d="m15.5 15.5 5 5" stroke="currentColor" strokeWidth="1.6" fill="none" />
            </svg>
            <span className="sr-only">Destination</span>
            <input type="text" value={dest} onChange={(e) => setDest(e.target.value)} placeholder="Enter destination"
              className="w-full min-w-0 bg-transparent text-[14px] text-[#0B1B33] placeholder:text-[#5F6B7A] focus:outline-none" />
          </label>

          {/* check-in and check-out, joined */}
          <div className={`${box} col-span-2 flex divide-x divide-[#5F6B7A]/40 lg:flex-[2]`}>
            <DateField label="Check in" value={checkIn} min={iso(new Date())} onChange={changeCheckIn} />
            <DateField label="Check out" value={checkOut} min={addDays(checkIn, 1)} onChange={setCheckOut} />
          </div>

          {/* rooms and guests */}
          <div ref={guestRef} className="relative col-span-2 sm:col-span-1 lg:flex-[1.4]">
            <button type="button" aria-haspopup="dialog" aria-expanded={guestOpen} onClick={() => setGuestOpen(!guestOpen)}
              className={`${box} flex h-12 w-full items-center justify-between gap-2 px-3 text-left ${ringLight}`}>
              <span className="truncate text-[13px] font-semibold text-[#0B1B33]">{guestLabel}</span>
              <span className="text-[#5F6B7A]"><Caret open={guestOpen} /></span>
            </button>
            {guestOpen && (
              <div role="dialog" aria-label="Rooms and guests"
                className="mt-2 w-full min-w-[260px] rounded-xl border border-[#5F6B7A]/25 bg-[#F6F4EF] p-4 lg:absolute lg:left-0 lg:top-full lg:z-20 lg:border-0 lg:shadow-[0_12px_32px_rgba(11,27,51,.25)]">
                <Stepper label="Rooms" value={rooms} min={1} max={9} onChange={changeRooms} />
                <Stepper label="Guests" value={guests} min={rooms} max={20} onChange={setGuests} />
                <button type="button" onClick={() => setGuestOpen(false)}
                  className={`mt-3 w-full rounded-md bg-[#C6A560] px-5 py-2.5 text-sm font-bold uppercase text-[#0B1B33] hover:bg-[#A8842F] ${ringLight}`}>
                  Done
                </button>
              </div>
            )}
          </div>

          {/* special rates */}
          <label className={`${box} relative col-span-2 flex h-12 items-center sm:col-span-1 lg:flex-[1.2]`}>
            <span className="sr-only">Special rates</span>
            <select value={rate} onChange={(e) => setRate(e.target.value)}
              className="h-full w-full cursor-pointer appearance-none bg-transparent px-3 pr-9 text-[13px] font-semibold uppercase text-[#0B1B33] focus:outline-none">
              <option value="">Special rates</option>
              <option value="circle">Moonlit Circle member rate</option>
            </select>
            <span className="pointer-events-none absolute right-3 text-[#5F6B7A]"><Caret /></span>
          </label>

          {/* search */}
          <button type="submit"
            className={`col-span-2 h-12 rounded-sm bg-[#C6A560] px-8 text-[13px] font-bold uppercase tracking-wide text-[#0B1B33] transition-colors hover:bg-[#A8842F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F6F4EF] lg:w-40 ${ringLight}`}>
            Search
          </button>
        </div>
      </form>
    </section>
  )
}

/* ------------------------------- the navbar ------------------------------- */
export default function Navbar({ onSearch }) {
  const [open, setOpen] = useState(null)          // desktop dropdown id
  const [drawer, setDrawer] = useState(false)     // full-screen menu is on the page
  const [drawerIn, setDrawerIn] = useState(false) // full-screen menu has slid into view
  const [drawerSection, setDrawerSection] = useState(null)
  const [barHidden, setBarHidden] = useState(false) // true while scrolling down
  const [searchOpen, setSearchOpen] = useState(false)
  const barRef = useRef(null)
  const closeBtn = useRef(null)
  const timer = useRef(null)
  const searchOpenRef = useRef(false)
  const drawerTimer = useRef(null)

  const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const openDrawer = () => {
    clearTimeout(drawerTimer.current)
    setDrawer(true)
    // two frames, so the browser paints the closed position first and the slide can animate
    requestAnimationFrame(() => requestAnimationFrame(() => setDrawerIn(true)))
  }
  const closeDrawer = () => {
    setDrawerIn(false)
    clearTimeout(drawerTimer.current)
    drawerTimer.current = setTimeout(() => setDrawer(false), reduced() ? 0 : 350) // wait for the slide-out
  }
  const bookNow = () => { setSearchOpen(true); setBarHidden(false); closeDrawer() }

  useEffect(() => { searchOpenRef.current = searchOpen }, [searchOpen])

  useEffect(() => {
    const onDown = (e) => { if (barRef.current && !barRef.current.contains(e.target)) setOpen(null) }
    const onKey = (e) => { if (e.key === 'Escape') { setOpen(null); closeDrawer() } }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onKey) }
  }, [])

  // Hide the main bar when scrolling down, show it again when scrolling up.
  useEffect(() => {
    let lastY = window.scrollY
    let ticking = false
    const update = () => {
      ticking = false
      const y = Math.max(0, window.scrollY)
      const dy = y - lastY
      if (searchOpenRef.current) { lastY = y; return }   // keep things still while the search panel is open
      if (y < 80) { setBarHidden(false); lastY = y; return }
      if (dy > 8) { setBarHidden(true); setOpen(null); lastY = y }
      else if (dy < -8) { setBarHidden(false); lastY = y }
    }
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update) } }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // lock page scrolling while the full-screen menu is on the page
  useEffect(() => {
    document.body.style.overflow = drawer ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [drawer])

  useEffect(() => { if (drawerIn) closeBtn.current?.focus() }, [drawerIn])

  // if the window becomes wide while the menu is open, close it straight away
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const on = () => { if (mq.matches) { clearTimeout(drawerTimer.current); setDrawerIn(false); setDrawer(false) } }
    mq.addEventListener('change', on)
    return () => { mq.removeEventListener('change', on); clearTimeout(drawerTimer.current) }
  }, [])

  const hoverOpen = (id) => { clearTimeout(timer.current); setOpen(id) }
  const hoverClose = () => { timer.current = setTimeout(() => setOpen(null), 120) }
  const closeAll = () => { setOpen(null); closeDrawer() }

  const topBtn = (active) =>
    `flex h-[72px] items-center gap-1.5 px-3 text-[13px] font-semibold uppercase tracking-wide hover:text-[#C6A560] xl:px-4 ${active ? 'text-[#C6A560]' : 'text-[#F6F4EF]'} ${ring}`

  return (
    <>
      <Announcement />

      {/*
        Pinned block: main bar + search band.
        Its sticky offset equals the main bar height (60px, 78px from 768px), so when the bar is
        hidden only the search band stays on screen. Changing the offset moves nothing else on the page.
      */}
      <div className={`sticky z-50 transition-[top] duration-300 ease-out motion-reduce:transition-none ${barHidden ? '-top-[60px] md:-top-[78px]' : 'top-0'}`}
        onFocus={() => setBarHidden(false)}>
        <header className="relative z-20 bg-[#0B1B33] text-[#F6F4EF]" ref={barRef}>
          <nav aria-label="Main" className="mx-auto flex h-[60px] max-w-7xl items-center justify-between px-4 md:h-[78px] lg:px-6">
            <NavLink href="/" aria-label="Moonlit Hotels & Resorts home" className={`shrink-0 rounded-sm ${ring}`}>
              <img src={LOGO} alt="Moonlit Hotels & Resorts" className="h-10 w-auto md:h-[72px]" />
            </NavLink>

            {/* desktop menu (1024px and up) */}
            <ul className="hidden items-center lg:flex">
              {menus.map((m) => (
                <li key={m.id}
                  onMouseEnter={() => hoverOpen(m.id)} onMouseLeave={hoverClose}>
                  <button type="button" aria-expanded={open === m.id} aria-controls={`panel-${m.id}`}
                    onClick={() => setOpen(open === m.id ? null : m.id)} className={topBtn(open === m.id)}>
                    {m.label}<Caret open={open === m.id} />
                  </button>
                 
{open === m.id && (
  <div
    id={`panel-${m.id}`}
    className="pointer-events-none absolute inset-x-0 top-full px-4 lg:px-6"
  >
    <div
      className={`pointer-events-auto mx-auto overflow-hidden bg-[#F6F4EF] shadow-[0_14px_32px_rgba(0,0,0,.35)] ${
        m.kind === 'brands'
          ? 'max-w-[900px]'
          : 'flex max-w-[1240px]'
      }`}
    >
      <div
        className={
          m.kind === 'brands'
            ? 'w-full p-5 xl:p-8'
            : 'w-[36%] shrink-0 p-5 xl:p-8'
        }
      >
        {m.kind === 'brands' ? (
          <BrandGrid
            items={m.items}
            onNavigate={closeAll}
            className="grid grid-cols-2 gap-2 sm:grid-cols-3"
          />
        ) : (
          <ItemList
            items={m.items}
            footer={m.footer}
            onNavigate={closeAll}
          />
        )}
      </div>

      {m.kind !== 'brands' && (
        <MenuImage
          {...m.image}
          onNavigate={closeAll}
          className="min-h-[380px] flex-1 xl:min-h-[460px]"
        />
      )}
    </div>
  </div>
)}

                </li>
              ))}
            </ul>

            {/* hamburger (below 1024px) */}
            <button type="button" aria-label="Open menu" aria-expanded={drawerIn} onClick={openDrawer}
              className={`rounded-md p-2 text-[#F6F4EF] hover:text-[#C6A560] lg:hidden ${ring}`}>
              <svg viewBox="0 0 24 24" className="h-8 w-8" aria-hidden="true">
                <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="1.8" fill="none" />
              </svg>
            </button>
          </nav>
        </header>

        <SearchBand onSearch={onSearch} panelOpen={searchOpen} setPanelOpen={setSearchOpen} />
      </div>

      {/* full-screen menu (below 1024px): slides in from the right, slides back out on close */}
      {drawer && (
        <div role="dialog" aria-modal="true" aria-label="Menu"
          className={`fixed inset-0 z-[60] flex flex-col bg-[#0B1B33] text-[#F6F4EF] transition-transform duration-[350ms] ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none lg:hidden ${drawerIn ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex h-[60px] shrink-0 items-center justify-between px-4 sm:px-8 md:h-[78px]">
            <NavLink href="/" onClick={closeAll} aria-label="Moonlit Hotels & Resorts home" className={`rounded-sm ${ring}`}>
              <img src={LOGO} alt="Moonlit Hotels & Resorts" className="h-10 w-auto md:h-[72px]" />
            </NavLink>
            <button type="button" ref={closeBtn} aria-label="Close menu" onClick={closeDrawer}
              className={`rounded-md p-2 transition-transform duration-300 hover:rotate-90 hover:text-[#C6A560] motion-reduce:transition-none ${ring}`}>
              <svg viewBox="0 0 24 24" className="h-8 w-8" aria-hidden="true">
                <path d="M5 5l14 14M19 5 5 19" stroke="currentColor" strokeWidth="1.8" fill="none" />
              </svg>
            </button>
          </div>

          {/* the content fades in a little after the panel starts moving */}
          <div className={`flex min-h-0 flex-1 flex-col transition-[opacity,transform] duration-500 delay-150 motion-reduce:transition-none ${drawerIn ? 'translate-x-0 opacity-100' : 'translate-x-6 opacity-0'}`}>
            <ul className="min-h-0 flex-1 overflow-y-auto px-4 pb-4 sm:px-8">
              {menus.map((m) => (
                <li key={m.id} className="border-t border-[#F6F4EF]/15">
                  <button type="button" aria-expanded={drawerSection === m.id}
                    onClick={() => setDrawerSection(drawerSection === m.id ? null : m.id)}
                    className={`flex w-full items-center justify-between py-4 text-left text-[16px] font-semibold uppercase tracking-wide hover:text-[#C6A560] sm:py-5 sm:text-[18px] ${drawerSection === m.id ? 'text-[#C6A560]' : ''} ${ring}`}>
                    {m.label}<Caret open={drawerSection === m.id} />
                  </button>
                  {drawerSection === m.id && (
                    <div className="mb-3 rounded-xl bg-[#F6F4EF] p-2 sm:flex sm:gap-3 sm:p-3">
                      <div className="sm:min-w-0 sm:flex-1">
                        {m.kind === 'brands'
                          ? <BrandGrid items={m.items} footer={m.footer} onNavigate={closeAll} className="grid gap-1 sm:grid-cols-2" />
                          : <ItemList items={m.items} footer={m.footer} onNavigate={closeAll} />}
                      </div>
                      {/* on tablets the image sits on the right; on phones it is left out to save space */}
                      {m.kind === 'list' && <MenuImage {...m.image} compact className="hidden min-h-[200px] sm:block sm:w-44 md:w-56" />}
                    </div>
                  )}
                </li>
              ))}
            </ul>

            {/* Book now opens the search panel */}
            <div className="shrink-0 space-y-3 border-t border-[#F6F4EF]/15 p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] sm:px-8">
              <button type="button" onClick={bookNow}
                className={`flex h-12 w-full items-center justify-center gap-2 rounded-sm bg-[#C6A560] px-6 text-[13px] font-bold uppercase tracking-wide text-[#0B1B33] transition-colors hover:bg-[#A8842F] ${ring}`}>
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
                  <rect x="3.5" y="5" width="17" height="15.5" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M3.5 10h17M8 3v4M16 3v4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
                Book now
              </button>
              <NavLink href="/contact?type=partner" onClick={closeAll}
                className={`block rounded-sm border-2 border-[#F6F4EF]/40 px-6 py-3 text-center text-[13px] font-bold uppercase tracking-wide text-[#F6F4EF] transition-colors hover:border-[#C6A560] hover:text-[#C6A560] ${ring}`}>
                Partner with us
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </>
  )
}