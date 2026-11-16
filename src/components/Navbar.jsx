import { useEffect, useRef, useState } from 'react'

/*
  Colours used in this navbar (only these two, plus transparency of the same colours):
    Midnight Navy   #0B1B33
    Himalayan White #F6F4EF

  Swap this one line if the project uses Inertia:
  import { Link as NavLink } from '@inertiajs/react'
*/
const NavLink = ({ href, children, ...props }) => (
  <a href={href} {...props}>{children}</a>
)

// Logo files come from Moonlit_Logo_Pack.zip. Put the file in public/images/
const LOGO = '/images/logo.png'

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

const about = [
  { name: 'Our story', desc: 'Vision and mission', href: '/about' },
  { name: 'Leadership', desc: 'The people behind MHR', href: '/about/leadership' },
  { name: 'Why owners choose us', desc: 'Our approach to your asset', href: '/about/why-mhr' },
]

const more = [
  { name: 'Leadership', desc: 'The people behind MHR', href: '/about/leadership' },
  { name: 'Why owners choose us', desc: 'Our approach to your asset', href: '/about/why-mhr' },
  { name: 'Contact', desc: 'Talk to the MHR team', href: '/contact' },
]

// Desktop bar: dropdown items have `items`, plain links have `href`
const desktopItems = [
  { id: 'brands', label: 'Our brands', items: brands, footer: { name: 'All brands', href: '/brands' } },
  { id: 'services', label: 'Services', items: services },
  { label: 'Franchise', href: '/services/franchise' },
  { label: 'Moonlit Circle', href: '/moonlit-circle' },
  { label: 'About', href: '/about' },
  { id: 'more', label: 'More', items: more },
]

// Side drawer (opened by the hamburger)
const drawerItems = [
  { id: 'brands', label: 'Our brands', items: brands },
  { id: 'services', label: 'Services', items: services },
  { label: 'Franchise', href: '/services/franchise' },
  { label: 'Moonlit Circle', href: '/moonlit-circle' },
  { id: 'about', label: 'About', items: about },
  { label: 'Contact', href: '/contact' },
]

const Chevron = ({ open }) => (
  <svg viewBox="0 0 12 12" aria-hidden="true" className={`ml-2 h-3 w-3 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
    <path d="M2 4.5 6 8.5 10 4.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
  </svg>
)

const Globe = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
    <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.6" />
    <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" fill="none" stroke="currentColor" strokeWidth="1.6" />
  </svg>
)

/* A list of dropdown links. Hover = Midnight Navy background with Himalayan White text */
function ItemList({ items, footer, onNavigate }) {
  return (
    <ul>
      {items.map((i) => (
        <li key={i.name}>
          <NavLink href={i.href} onClick={onNavigate}
            className="group block rounded-md px-4 py-3 text-[#0B1B33] hover:bg-[#0B1B33] hover:text-[#F6F4EF] focus-visible:bg-[#0B1B33] focus-visible:text-[#F6F4EF] focus-visible:outline-none">
            <span className="block text-[15px] font-semibold">{i.name}</span>
            <span className="block text-sm opacity-70">{i.desc}</span>
          </NavLink>
        </li>
      ))}
      {footer && (
        <li className="mt-1 border-t border-[#0B1B33]/15 pt-1">
          <NavLink href={footer.href} onClick={onNavigate}
            className="block rounded-md px-4 py-3 text-[15px] font-semibold text-[#0B1B33] underline underline-offset-4 hover:bg-[#0B1B33] hover:text-[#F6F4EF] hover:no-underline focus-visible:bg-[#0B1B33] focus-visible:text-[#F6F4EF] focus-visible:outline-none">
            {footer.name}
          </NavLink>
        </li>
      )}
    </ul>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(null)         // desktop dropdown id
  const [drawer, setDrawer] = useState(false)    // side drawer
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

  const focusRing = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B1B33] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F6F4EF]'

  return (
    <header className="sticky top-0 z-50 ">
      <div aria-hidden="true" className="h-1 w-full bg-[#0B1B33]" />

      <div className="bg-[#F6F4EF] shadow-[0_1px_0_rgba(11,27,51,.10)]" ref={barRef}>
        <nav aria-label="Main" className="mx-auto flex h-[68px] max-w-7xl items-center gap-3 px-0 sm:h-[88px] ">
          {/* hamburger */}
          <button type="button" aria-label="Open menu" aria-expanded={drawer} onClick={() => setDrawer(true)}
            className={`rounded-md p-2 text-[#0B1B33] hover:bg-[#0B1B33]/10 ${focusRing}`}>
            <svg viewBox="0 0 24 24" className="h-12 w-12" aria-hidden="true">
              <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="1" fill="none" />
            </svg>
          </button>

          {/* logo */}
          <NavLink href="/" aria-label="Moonlit Hotels & Resorts home" className={`shrink-0 rounded-sm sm:ml-2 xl:ml-6 ${focusRing}`}>
            <img src={LOGO} alt="Moonlit Hotels & Resorts" className="h-9 w-auto sm:h-20" />
          </NavLink>

          {/* desktop items (xl and up) */}
          <ul className="ml-4 hidden items-center xl:flex 2xl:ml-8">
            {desktopItems.map((m) => (
              <li key={m.label} className="relative"
                onMouseEnter={m.items ? () => hoverOpen(m.id) : undefined}
                onMouseLeave={m.items ? hoverClose : undefined}>
                {m.items ? (
                  <>
                    <button type="button" aria-expanded={open === m.id} aria-controls={`panel-${m.id}`}
                      onClick={() => setOpen(open === m.id ? null : m.id)}
                      className={`flex items-center rounded-md px-4 py-2.5 text-[15px] font-semibold text-[#0B1B33] hover:bg-[#0B1B33]/10 ${open === m.id ? 'bg-[#0B1B33]/10' : ''} ${focusRing}`}>
                      {m.label}<Chevron open={open === m.id} />
                    </button>
                    {open === m.id && (
                      <div id={`panel-${m.id}`} className="absolute left-0 top-full w-80 pt-3">
                        <div className="rounded-xl bg-[#F6F4EF] p-2 shadow-[0_12px_32px_rgba(11,27,51,.22)]">
                          <ItemList items={m.items} footer={m.footer} onNavigate={closeAll} />
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <NavLink href={m.href}
                    className={`block rounded-md px-4 py-2.5 text-[15px] font-semibold text-[#0B1B33] hover:bg-[#0B1B33]/10 ${focusRing}`}>
                    {m.label}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>

          {/* right side */}
          <div className="ml-auto flex items-center gap-3">
            <button type="button" aria-label="Language: English"
              className={`hidden items-center gap-2 rounded-full border-2 border-[#0B1B33] px-4 py-2 text-sm font-semibold text-[#0B1B33] hover:bg-[#0B1B33] hover:text-[#F6F4EF] md:flex ${focusRing}`}>
              <Globe />ENGLISH
            </button>
            <NavLink href="/contact?type=partner"
              className={`rounded-full bg-[#0B1B33] px-5 py-2.5 text-sm font-semibold text-[#F6F4EF] hover:bg-[#0B1B33]/85 sm:px-6 sm:text-[15px] ${focusRing}`}>
              Partner with us
            </NavLink>
          </div>
        </nav>
      </div>

      {/* Side drawer */}
      {drawer && (
        <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="absolute inset-0 bg-[#0B1B33]/60" onClick={() => setDrawer(false)} />
          <div className="absolute inset-y-0 left-0 flex w-[88%] max-w-sm flex-col overflow-y-auto bg-[#F6F4EF] shadow-2xl">
            <div className="flex h-[68px] shrink-0 items-center justify-between px-4 sm:h-[76px] sm:px-6">
              <NavLink href="/" onClick={closeAll} aria-label="Moonlit Hotels & Resorts home" className={`rounded-sm ${focusRing}`}>
                <img src={LOGO} alt="Moonlit Hotels & Resorts" className="h-9 w-auto sm:h-11" />
              </NavLink>
              <button type="button" ref={closeBtn} aria-label="Close menu" onClick={() => setDrawer(false)}
                className={`rounded-md p-2 text-[#0B1B33] hover:bg-[#0B1B33]/10 ${focusRing}`}>
                <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden="true">
                  <path d="M5 5l14 14M19 5 5 19" stroke="currentColor" strokeWidth="1.8" fill="none" />
                </svg>
              </button>
            </div>

            <ul className="flex-1 px-4 pb-6 sm:px-6">
              {drawerItems.map((m) => (
                <li key={m.label} className="border-t border-[#0B1B33]/15">
                  {m.items ? (
                    <>
                      <button type="button" aria-expanded={drawerSection === m.id}
                        onClick={() => setDrawerSection(drawerSection === m.id ? null : m.id)}
                        className={`flex w-full items-center justify-between py-4 text-left text-lg font-semibold text-[#0B1B33] ${focusRing}`}>
                        {m.label}<Chevron open={drawerSection === m.id} />
                      </button>
                      {drawerSection === m.id && (
                        <div className="mb-3"><ItemList items={m.items} onNavigate={closeAll} /></div>
                      )}
                    </>
                  ) : (
                    <NavLink href={m.href} onClick={closeAll}
                      className={`block py-4 text-lg font-semibold text-[#0B1B33] ${focusRing}`}>{m.label}</NavLink>
                  )}
                </li>
              ))}
            </ul>

            <div className="shrink-0 border-t border-[#0B1B33]/15 p-4 sm:p-6">
              <NavLink href="/contact?type=partner" onClick={closeAll}
                className={`block rounded-full bg-[#0B1B33] px-6 py-3 text-center font-semibold text-[#F6F4EF] hover:bg-[#0B1B33]/85 ${focusRing}`}>
                Partner with us
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}