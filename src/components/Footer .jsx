import { useState } from 'react'


const NavLink = ({ href, children, ...props }) => (
  <a href={href} {...props}>{children}</a>
)
const LOGO = '/images/logo.png'

const tiers = [
  { label: 'Luxury', brands: [
    { name: 'Moonlit Grand', href: '/brands#moonlit-grand' },
    { name: 'Moonlit Sanctuary', href: '/brands#moonlit-sanctuary' },
  ] },
  { label: 'Upscale', brands: [{ name: 'Moonlit Select', href: '/brands#moonlit-select' }] },
  { label: 'Midscale', brands: [{ name: 'Moonlit Inn', href: '/brands#moonlit-inn' }] },
  { label: 'Boutique Heritage', brands: [{ name: 'Moonlit Hearth', href: '/brands#moonlit-hearth' }] },
]

const columns = [
  [
    { title: 'Moonlit Hotels & Resorts', links: [
      { name: 'About', href: '/about' },
      { name: 'Our brands', href: '/brands' },
      { name: 'Leadership', href: '/about' },
      { name: 'Why owners choose us', href: '/about' },
    ] },
    { title: 'Contact', links: [
      { name: 'marketing@moonlithotels.com', href: 'mailto:marketing@moonlithotels.com' },
      { name: 'moonlithotels@gmail.com', href: 'mailto:moonlithotels@gmail.com' },
      { name: 'Contact form', href: '/contact-us' },
    ], address: 'Kathmandu, Nepal' },
  ],
  [
    { title: 'Services', links: [
      { name: 'Management', href: '/services/management' },
      { name: 'Franchise', href: '/services/franchise' },
      { name: 'Consulting and pre-opening', href: '/services/consulting' },
      { name: 'Conversion', href: '/services/conversion' },
    ] },
    { title: 'Terms & Policies', links: [
      { name: 'Privacy Policy', href: '/privacy-policy' },
      { name: 'Terms of Use', href: '/terms' },
      { name: 'Cookie Consent', href: '/cookies' },
      { name: 'Moonlit Circle terms (coming soon)', href: '/loyalty-program#terms' },
    ] },
  ],
  [
    { title: 'Owner Resources', links: [
      { name: 'Asset Health Check', href: '/contact-us' },
      { name: 'Franchise information', href: '/services/franchise' },
      { name: 'Moonlit Academy', href: '/services/franchise#academy' },
      { name: 'Our method', href: '/about#method' },
    ] },
    { title: 'Moonlit Circle', links: [
      { name: 'How it works', href: '/loyalty-program#how-it-works' },
      { name: 'The four tiers', href: '/loyalty-program#tiers' },
      { name: 'Join free', href: '/loyalty-program#join' },
    ] },
  ],
]

// Replace the # links with the real social media addresses
const socials = [
  { name: 'Facebook', href: '#', icon: (
    <path d="M14 8h3V4h-3c-2.8 0-4.5 1.8-4.5 4.5V11H7v4h2.5v6h4v-6h3l.5-4h-3.5V9c0-.6.4-1 1-1z" fill="currentColor" />
  ) },
  { name: 'Instagram', href: '#', icon: (
    <g fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r=".6" fill="currentColor" />
    </g>
  ) },
  { name: 'TikTok', href: '#', icon: (
    <path d="M16 3c.3 2.2 1.7 3.8 4 4v3.3c-1.5 0-2.9-.5-4-1.3V15a6 6 0 1 1-6-6c.3 0 .7 0 1 .1v3.4a2.7 2.7 0 1 0 1.8 2.5V3H16z" fill="currentColor" />
  ) },
]

const link = 'text-[14px] leading-snug text-[#F6F4EF]/80 transition-colors hover:text-[#C6A560] hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A560] rounded-sm'

/* ------------------------------- parts ------------------------------- */
function BrandDirectory() {
  const [open, setOpen] = useState(true)
  return (
    <div className="bg-[#152A4D]">
      <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 sm:pt-12 lg:px-8">
        <NavLink href="/" aria-label="Moonlit Hotels & Resorts home" className="mx-auto block w-fit rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A560]">
          <img src={LOGO} alt="Moonlit Hotels & Resorts" className="h-14 w-auto sm:h-16" />
        </NavLink>

        <h2 className="mt-8 text-center text-[15px] font-bold uppercase tracking-wide text-[#F6F4EF] sm:mt-10 sm:text-[17px]">
          Moonlit Brands
        </h2>

        {open && (
          <div id="brand-directory" className="mt-6 border-t border-[#F6F4EF]/25">
            <ul className="grid grid-cols-2 lg:grid-cols-4">
              {tiers.map((t, i) => (
                <li key={t.label}
                  className={`border-[#F6F4EF]/25 px-3 py-6 text-center ${i % 2 === 1 ? 'border-l' : ''} ${i > 0 ? 'lg:border-l' : ''} ${i >= 2 ? 'border-t lg:border-t-0' : ''}`}>
                  <h3 className="text-[12px] font-bold uppercase tracking-wide text-[#F6F4EF]">{t.label}</h3>
                  <ul className="mt-5 space-y-4">
                    {t.brands.map((b) => (
                      <li key={b.name}>
                        <NavLink href={b.href}
                          className="inline-block font-serif text-[17px] text-[#F6F4EF] transition-colors hover:text-[#C6A560] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A560] sm:text-[19px]">
                          {b.name}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* hide / show handle, like the two bars at the bottom of Wyndham's panel */}
        <div className="flex justify-center pt-2">
          <button type="button" aria-expanded={open} aria-controls="brand-directory" onClick={() => setOpen(!open)}
            className="group flex h-10 w-16 items-center justify-center rounded-t-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A560]">
            <span className="sr-only">{open ? 'Hide Moonlit brands' : 'Show Moonlit brands'}</span>
            <span aria-hidden="true" className="block w-8 space-y-1.5">
              <span className="block h-0.5 w-full bg-[#F6F4EF]/70 group-hover:bg-[#C6A560]" />
              <span className="block h-0.5 w-full bg-[#F6F4EF]/70 group-hover:bg-[#C6A560]" />
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="bg-[#0B1B33] text-[#F6F4EF]">
      <BrandDirectory />

      {/* link columns */}
      <div className="mx-auto max-w-7xl px-4 pb-8 pt-12 sm:px-6 sm:pt-14 lg:px-8">
        <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {columns.map((col, ci) => (
            <div key={ci} className="space-y-10">
              {col.map((g) => (
                <nav key={g.title} aria-label={g.title}>
                  <h2 className="text-[17px] font-bold text-[#F6F4EF]">{g.title}</h2>
                  <ul className="mt-4 space-y-3">
                    {g.links.map((l) => (
                      <li key={l.name}><NavLink href={l.href} className={link}>{l.name}</NavLink></li>
                    ))}
                    {g.address && <li className="text-[14px] text-[#F6F4EF]/80">{g.address}</li>}
                  </ul>
                </nav>
              ))}
            </div>
          ))}

          {/* social */}
          <div>
            <h2 className="sr-only">Follow Moonlit</h2>
            <ul className="flex flex-wrap gap-4">
              {socials.map((s) => (
                <li key={s.name}>
                  <a href={s.href} aria-label={`Moonlit on ${s.name}`}
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-[#F6F4EF]/80 text-[#F6F4EF] transition-colors hover:border-[#C6A560] hover:bg-[#C6A560] hover:text-[#0B1B33] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A560] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1B33] sm:h-14 sm:w-14">
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">{s.icon}</svg>
                  </a>
                </li>
              ))}
            </ul>
            <NavLink href="mailto:marketing@moonlithotels.com?subject=Website%20feedback"
              className="mt-6 inline-block text-[14px] font-semibold text-[#F6F4EF] underline-offset-4 hover:text-[#C6A560] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A560]">
              Website Feedback
            </NavLink>
          </div>
        </div>
      </div>

      {/* copyright */}
      <div className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-2 border-t border-[#F6F4EF]/20 pt-6 text-center text-[13px] text-[#F6F4EF]/70 sm:flex-row sm:text-left">
          <p>&copy; {new Date().getFullYear()} Moonlit Hotels &amp; Resorts. All rights reserved.</p>
         <p>
  Crafted by:{" "}
  <a
    href="https://sait.com.np/"
    target="_blank"
    rel="noopener noreferrer"
    className="font-semibold text-[#F6F4EF] transition-colors hover:text-[#C6A560]"
  >
    S.A. I.T Solution Nepal
  </a>
</p>
        </div>
      </div>
    </footer>
  )
}