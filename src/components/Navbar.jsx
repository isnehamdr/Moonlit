import { useEffect, useRef, useState } from 'react'


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
  { name: 'Moonlit Grand', desc: "The city's address", href: '/brands/grand' },
  { name: 'Moonlit Sanctuary', desc: 'Restore in the mountains', href: '/brands/sanctuary' },
  { name: 'Moonlit Select', desc: 'Smart, comfortable, dependable', href: '/brands/select' },
  { name: 'Moonlit Inn', desc: 'Good rest on every road', href: '/brands/inn' },
  { name: 'Moonlit Hearth', desc: 'Stay inside the story', href: '/brands/hearth' },
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

// `align: 'right'` keeps the last dropdowns inside the screen
const menus = [
  { id: 'brands', label: 'Our brands', items: brands, footer: { name: 'All brands', href: '/brands' } },
  { id: 'services', label: 'Services', items: services },
  { id: 'circle', label: 'Moonlit Circle', items: circle, footer: { name: 'Join free', href: '/moonlit-circle' } },
  { id: 'about', label: 'About', items: about, align: 'right' },
  { id: 'partner', label: 'Partner with us', items: partner, align: 'right' },
]

/* ------------------------------- small parts ------------------------------- */
const Caret = ({ open }) => (
  <svg viewBox="0 0 10 6" aria-hidden="true" className={`h-1.5 w-2.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
    <path d="M0 0h10L5 6z" fill="currentColor" />
  </svg>
)
const Globe = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
    <circle cx="12" cy="12" r="9.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <path d="M2.5 12h19M12 2.5c3.5 3.5 3.5 15.5 0 19M12 2.5c-3.5 3.5-3.5 15.5 0 19" fill="none" stroke="currentColor" strokeWidth="1.5" />
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

/* ------------------------------- 1. announcement strip ------------------------------- */
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

/* ------------------------------- 3. search band ------------------------------- */
const iso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
const addDays = (s, n) => { const d = new Date(`${s}T00:00:00`); d.setDate(d.getDate() + n); return iso(d) }
const fmt = (s) => new Date(`${s}T00:00:00`)
  .toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })
  .replace(/(\d+), (\d{4})/, '$1 $2')

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

function SearchBand({ onSearch }) {
  const [dest, setDest] = useState('')
  const [checkIn, setCheckIn] = useState(() => iso(new Date()))
  const [checkOut, setCheckOut] = useState(() => addDays(iso(new Date()), 1))
  const [rooms, setRooms] = useState(1)
  const [guests, setGuests] = useState(1)
  const [rate, setRate] = useState('')
  const [guestOpen, setGuestOpen] = useState(false)
  const guestRef = useRef(null)

  useEffect(() => {
    const onDown = (e) => { if (guestRef.current && !guestRef.current.contains(e.target)) setGuestOpen(false) }
    const onKey = (e) => { if (e.key === 'Escape') setGuestOpen(false) }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onKey) }
  }, [])

  const changeCheckIn = (v) => { setCheckIn(v); if (checkOut <= v) setCheckOut(addDays(v, 1)) }
  const changeRooms = (v) => { setRooms(v); if (guests < v) setGuests(v) }

  const submit = (e) => {
    e.preventDefault()
    const params = { destination: dest.trim(), checkin: checkIn, checkout: checkOut, rooms, guests, rate }
    if (onSearch) return onSearch(params)
    const q = new URLSearchParams(Object.fromEntries(Object.entries(params).filter(([, v]) => v !== '' && v != null)))
    window.location.assign(`/find-a-hotel?${q.toString()}`)
  }

  const guestLabel = `${rooms} ROOM${rooms > 1 ? 'S' : ''}, ${guests} GUEST${guests > 1 ? 'S' : ''}`

  return (
    <section aria-label="Find a stay" className="relative z-40 border-b border-[#5F6B7A]/25 bg-[#F6F4EF]">
      <form onSubmit={submit} autoComplete="off" role="search"
        className="mx-auto grid max-w-7xl grid-cols-2 gap-2 px-4 py-3 sm:gap-3 sm:px-6 lg:flex lg:items-stretch lg:px-8">
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
              className="absolute left-0 top-full z-20 mt-2 w-full min-w-[260px] rounded-xl bg-[#F6F4EF] p-4 shadow-[0_12px_32px_rgba(11,27,51,.25)]">
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
      </form>
    </section>
  )
}

/* ------------------------------- the navbar ------------------------------- */
export default function Navbar({ onSearch }) {
  const [open, setOpen] = useState(null)          // desktop dropdown: menu id, 'lang' or null
  const [drawer, setDrawer] = useState(false)     // mobile side drawer
  const [drawerSection, setDrawerSection] = useState(null)
  const barRef = useRef(null)
  const closeBtn = useRef(null)
  const timer = useRef(null)

  useEffect(() => {
    const onDown = (e) => { if (barRef.current && !barRef.current.contains(e.target)) setOpen(null) }
    const onKey = (e) => { if (e.key === 'Escape') { setOpen(null); setDrawer(false) } }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onKey) }
  }, [])

  useEffect(() => {
    document.body.style.overflow = drawer ? 'hidden' : ''
    if (drawer) closeBtn.current?.focus()
    return () => { document.body.style.overflow = '' }
  }, [drawer])

  const hoverOpen = (id) => { clearTimeout(timer.current); setOpen(id) }
  const hoverClose = () => { timer.current = setTimeout(() => setOpen(null), 120) }
  const closeAll = () => { setOpen(null); setDrawer(false) }

  const topBtn = (active) =>
    `flex h-[72px] items-center gap-1.5 px-3 text-[13px] font-semibold uppercase tracking-wide hover:text-[#C6A560] xl:px-4 ${active ? 'text-[#C6A560]' : 'text-[#F6F4EF]'} ${ring}`

  return (
    <>
      <Announcement />

      {/* 2. main bar (stays at the top while scrolling) */}
      <header className="sticky top-0 z-50 bg-[#0B1B33] text-[#F6F4EF]" ref={barRef}>
        <nav aria-label="Main" className="mx-auto flex h-[60px] max-w-7xl items-center justify-between px-4 md:h-[78px] lg:px-6">
          <NavLink href="/" aria-label="Moonlit Hotels & Resorts home" className={`shrink-0 rounded-sm ${ring}`}>
            <img src={LOGO} alt="Moonlit Hotels & Resorts" className="h-10 w-auto md:h-20" />
          </NavLink>

          {/* desktop menu (1024px and up) */}
          <ul className="hidden items-center lg:flex">
            {menus.map((m) => (
              <li key={m.id} className="relative"
                onMouseEnter={() => hoverOpen(m.id)} onMouseLeave={hoverClose}>
                <button type="button" aria-expanded={open === m.id} aria-controls={`panel-${m.id}`}
                  onClick={() => setOpen(open === m.id ? null : m.id)} className={topBtn(open === m.id)}>
                  {m.label}<Caret open={open === m.id} />
                </button>
                {open === m.id && (
                  <div id={`panel-${m.id}`} className={`absolute top-full w-80 ${m.align === 'right' ? 'right-0' : 'left-0'}`}>
                    <div className="rounded-b-lg bg-[#F6F4EF] p-2 shadow-[0_14px_32px_rgba(0,0,0,.35)]">
                      <ItemList items={m.items} footer={m.footer} onNavigate={closeAll} />
                    </div>
                  </div>
                )}
              </li>
            ))}

            {/* divider + language */}
            {/* <li aria-hidden="true" className="mx-2 h-9 w-px bg-[#F6F4EF]/25" /> */}
            {/* <li className="relative" onMouseEnter={() => hoverOpen('lang')} onMouseLeave={hoverClose}>
              <button type="button" aria-label="Language: English" aria-expanded={open === 'lang'}
                onClick={() => setOpen(open === 'lang' ? null : 'lang')} className={topBtn(open === 'lang')}>
                <Globe /><Caret open={open === 'lang'} />
              </button>
              {open === 'lang' && (
                <div className="absolute right-0 top-full w-48">
                  <div className="rounded-b-lg bg-[#F6F4EF] p-2 shadow-[0_14px_32px_rgba(0,0,0,.35)]">
                    <button type="button" onClick={closeAll}
                      className="flex w-full items-center justify-between rounded-md px-4 py-3 text-left text-[15px] font-semibold text-[#0B1B33] hover:bg-[#152A4D] hover:text-[#F6F4EF] focus-visible:bg-[#152A4D] focus-visible:text-[#F6F4EF] focus-visible:outline-none">
                      English
                      <svg viewBox="0 0 16 16" aria-hidden="true" className="h-4 w-4"><path d="m3 8.5 3.2 3L13 4.5" fill="none" stroke="currentColor" strokeWidth="2" /></svg>
                    </button>
                  </div>
                </div>
              )}
            </li> */}
          </ul>

          {/* hamburger (below 1024px) */}
          <button type="button" aria-label="Open menu" aria-expanded={drawer} onClick={() => setDrawer(true)}
            className={`rounded-md p-2 text-[#F6F4EF] hover:text-[#C6A560] lg:hidden ${ring}`}>
            <svg viewBox="0 0 24 24" className="h-8 w-8" aria-hidden="true">
              <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="1.8" fill="none" />
            </svg>
          </button>
        </nav>
      </header>

      <SearchBand onSearch={onSearch} />

      {/* mobile side drawer */}
      {drawer && (
        <div className="fixed inset-0 z-[60] lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="absolute inset-0 bg-[#0B1B33]/70" onClick={() => setDrawer(false)} />
          <div className="absolute inset-y-0 right-0 flex w-[88%] max-w-sm flex-col overflow-y-auto bg-[#0B1B33] text-[#F6F4EF] shadow-2xl">
            <div className="flex h-[60px] shrink-0 items-center justify-between px-4 md:h-[72px]">
              <NavLink href="/" onClick={closeAll} aria-label="Moonlit Hotels & Resorts home" className={`rounded-sm ${ring}`}>
                <img src={LOGO} alt="Moonlit Hotels & Resorts" className="h-10 w-auto" />
              </NavLink>
              <button type="button" ref={closeBtn} aria-label="Close menu" onClick={() => setDrawer(false)}
                className={`rounded-md p-2 hover:text-[#C6A560] ${ring}`}>
                <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden="true">
                  <path d="M5 5l14 14M19 5 5 19" stroke="currentColor" strokeWidth="1.8" fill="none" />
                </svg>
              </button>
            </div>

            <ul className="flex-1 px-4 pb-6">
              {menus.map((m) => (
                <li key={m.id} className="border-t border-[#F6F4EF]/15">
                  <button type="button" aria-expanded={drawerSection === m.id}
                    onClick={() => setDrawerSection(drawerSection === m.id ? null : m.id)}
                    className={`flex w-full items-center justify-between py-4 text-left text-[15px] font-semibold uppercase tracking-wide hover:text-[#C6A560] ${drawerSection === m.id ? 'text-[#C6A560]' : ''} ${ring}`}>
                    {m.label}<Caret open={drawerSection === m.id} />
                  </button>
                  {drawerSection === m.id && (
                    <div className="mb-3 rounded-xl bg-[#F6F4EF] p-2">
                      <ItemList items={m.items} footer={m.footer} onNavigate={closeAll} />
                    </div>
                  )}
                </li>
              ))}
              {/* <li className="flex items-center gap-3 border-t border-[#F6F4EF]/15 py-4 text-[15px] font-semibold uppercase tracking-wide">
                <Globe />English
              </li> */}
            </ul>

            <div className="shrink-0 border-t border-[#F6F4EF]/15 p-4">
              <NavLink href="/contact?type=partner" onClick={closeAll}
                className={`block rounded-sm bg-[#C6A560] px-6 py-3 text-center text-[13px] font-bold uppercase tracking-wide text-[#0B1B33] hover:bg-[#A8842F] ${ring}`}>
                Partner with us
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </>
  )
}