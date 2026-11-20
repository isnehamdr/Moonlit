import { useState } from 'react'
import PageBanner from '../components/PageBanner'


const NavLink = ({ href, children, ...props }) => (
  <a href={href} {...props}>{children}</a>
)
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')


/* ------------------------------- content ------------------------------- */
const tiers = [
  { id: 'luxury', label: 'Luxury', brands: [
    { name: 'Moonlit Grand', tagline: "The city's address", segment: 'Luxury city hotel',
      guests: 'Corporate, diplomats, weddings, conferences', where: 'Kathmandu, Pokhara, Lalitpur',
      size: '120 to 300 rooms', signature: 'The Moonlit Hour', franchise: 'by approval',
      href: '/brands', image: '/images/MoonlitGrand.png', alt: 'A luxury city hotel' },
    { name: 'Moonlit Sanctuary', tagline: 'Restore in the mountains', segment: 'Luxury resort and wellness',
      guests: 'Couples, wellness, NRN, international guests', where: 'Lakeside, hills, jungle',
      size: '30 to 120 rooms', signature: 'Moonlit Nights', franchise: 'by approval',
      href: '/brands', image: '/images/MoonlitSanctuary.png', alt: 'A mountain wellness resort' },
  ] },
  { id: 'upscale', label: 'Upscale', brands: [
    { name: 'Moonlit Select', tagline: 'Smart, comfortable, dependable', segment: 'Upscale business hotel',
      guests: 'Business travellers, government, NGOs', where: 'Secondary cities',
      size: '60 to 150 rooms', signature: 'Moonlit Morning', franchise: 'available first',
      href: '/brands', image: '/images/MoonlitSelect.png', alt: 'An upscale business hotel' },
  ] },
  { id: 'midscale', label: 'Midscale', brands: [
    { name: 'Moonlit Inn', tagline: 'Good rest on every road', segment: 'Midscale limited service',
      guests: 'Road travellers, families, trekkers', where: 'Highways, trailheads, transit towns',
      size: '30 to 80 rooms', signature: 'The Hot Cup', franchise: 'available first',
      href: '/brands', image: '/images/MoonlitInn.png', alt: 'A roadside inn' },
  ] },
  { id: 'boutique', label: 'Boutique Heritage', brands: [
    { name: 'Moonlit Hearth', tagline: 'Stay inside the story', segment: 'Boutique heritage stays',
      guests: 'Culture seekers, independent travellers', where: 'Old towns, villages',
      size: '8 to 30 rooms', signature: 'The Hearth Welcome', franchise: 'available first',
      href: '/brands', image: '/images/MoonlitHearth.png', alt: 'A heritage boutique stay' },
  ] },
]

/* ------------------------------- parts ------------------------------- */
function BrandImage({ b }) {
  const [failed, setFailed] = useState(false)
  if (b.image && !failed) {
    return <img src={b.image} alt={b.alt} loading="lazy" decoding="async" onError={() => setFailed(true)} className="absolute inset-0 h-full w-full object-contain" />
  }
  return (
    <div role="img" aria-label={`${b.name} image placeholder`} className="absolute inset-0 overflow-hidden bg-[#EEF0F2]">
      <svg viewBox="0 0 400 400" aria-hidden="true" className="absolute -right-10 top-1/2 h-[130%] w-auto -translate-y-1/2 opacity-[0.08]">
        <circle cx="200" cy="200" r="190" fill="none" stroke="#0B1B33" strokeWidth="1.5" />
        <circle cx="200" cy="200" r="120" fill="none" stroke="#0B1B33" strokeWidth="1" />
        <circle cx="200" cy="200" r="64" fill="#0B1B33" fillOpacity=".35" />
        <circle cx="226" cy="186" r="60" fill="#EEF0F2" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="font-serif text-4xl text-[#0B1B33]/40 sm:text-5xl">MHR</span>
        <span className="mt-2 font-serif text-lg text-[#5F6B7A] sm:text-xl">{b.name}</span>
      </div>
    </div>
  )
}

function Detail({ label, value }) {
  return (
    <div>
      <dt className="text-[12px] font-semibold uppercase tracking-wide text-[#5F6B7A]">{label}</dt>
      <dd className="mt-1 text-[15px] font-medium leading-snug text-[#0B1B33]">{value}</dd>
    </div>
  )
}

/* One brand: image on one side, details on the other. On wide screens the image side alternates. */
function BrandCard({ b, flip }) {
  return (
    <article
      id={slug(b.name)}
      className="grid scroll-mt-40 overflow-hidden border border-[#5F6B7A]/25 bg-white shadow-[0_6px_20px_rgba(11,27,51,.07)] md:grid-cols-12"
    >
      <div className={`relative aspect-[16/10] w-full md:col-span-5 md:aspect-auto md:min-h-[380px] ${flip ? 'md:order-2' : ''}`}>
        <BrandImage b={b} />
      </div>

      <div className="p-6 sm:p-8 md:col-span-7 lg:p-10">
        <p className="text-[13px] font-semibold uppercase tracking-wide text-[#A8842F]">{b.segment}</p>
        <h3 className="mt-2 text-[26px] font-bold leading-tight text-[#0B1B33] sm:text-[32px]">{b.name}</h3>
        <p className="mt-1 text-[17px] font-medium text-[#152A4D] sm:text-[18px]">{b.tagline}</p>

        <dl className="mt-6 grid gap-x-8 gap-y-5 border-t border-[#5F6B7A]/25 pt-6 sm:grid-cols-2">
          <Detail label="Guests" value={b.guests} />
          <Detail label="Where" value={b.where} />
          <Detail label="Concept size" value={b.size} />
          <Detail label="Signature" value={b.signature} />
        </dl>

        <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
          <NavLink href={b.href}
            className="block border-2 border-[#A8842F] px-6 py-3 text-center text-[13px] font-bold uppercase tracking-wide text-[#0B1B33] transition-colors hover:bg-[#C6A560] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B1B33] focus-visible:ring-offset-2 sm:inline-block">
            Explore {b.name}
          </NavLink>
          <p className="text-[14px] text-[#5F6B7A]">
            Franchise: <NavLink href="/services/franchise" className="font-semibold text-[#152A4D] underline underline-offset-2 hover:text-[#A8842F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B1B33]">{b.franchise}</NavLink>
          </p>
        </div>
      </div>
    </article>
  )
}

/* ------------------------------- the page ------------------------------- */
export default function BrandsPage() {
  let n = 0 // counts brands so the image side alternates across the whole page
  return (
    <>
      
      <main>
        <PageBanner
          crumbs={[{ name: 'Home', href: '/' }, { name: 'Our brands' }]}
          title="Our Brands"
          text="Five brands, one family. Every Moonlit brand carries the same promise, global standards and local soul, and the same MHR mark. Each has its own character and its own guest."
          image="/images/hero.jpeg"
          
        />

        <section aria-label="Moonlit brands by tier" className="bg-[#F6F4EF] py-10 sm:py-14 lg:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* quick links to each tier */}
            <nav aria-label="Jump to a tier">
              <ul className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden">
                {tiers.map((t) => (
                  <li key={t.id} className="shrink-0">
                    <a href={`#${t.id}`}
                      className="block rounded-full border-2 border-[#0B1B33]/25 px-5 py-2 text-[14px] font-semibold text-[#0B1B33] transition-colors hover:border-[#0B1B33] hover:bg-[#0B1B33] hover:text-[#F6F4EF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B1B33] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F6F4EF]">
                      {t.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* every tier, then its brands */}
            <div className="mt-10 space-y-12 sm:mt-14 sm:space-y-16">
              {tiers.map((t) => (
                <section key={t.id} id={t.id} aria-labelledby={`${t.id}-title`} className="scroll-mt-40">
                  <div className="flex items-center gap-4">
                    <h2 id={`${t.id}-title`} className="text-[22px] font-bold text-[#0B1B33] sm:text-[28px]">{t.label}</h2>
                    <span aria-hidden="true" className="h-px flex-1 bg-[#5F6B7A]/30" />
                  </div>
                  <div className="mt-6 space-y-6 sm:space-y-8">
                    {t.brands.map((b) => <BrandCard key={b.name} b={b} flip={n++ % 2 === 1} />)}
                  </div>
                </section>
              ))}
            </div>

            <p className="mx-auto mt-12 max-w-3xl text-center text-[13px] leading-relaxed text-[#5F6B7A] sm:mt-16">
              These are brand concepts. Each hotel receives its own factsheet when it is confirmed.
            </p>
          </div>
        </section>

        {/* call to action */}
        <section aria-labelledby="brands-cta-title" className="bg-[#0B1B33] py-12 text-center text-[#F6F4EF] sm:py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <h2 id="brands-cta-title" className="text-[24px] font-bold leading-tight sm:text-[32px]">One family, one loyalty program</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-[#F6F4EF]/80 sm:text-[17px]">
              One Moonlit Circle account works across all five brands, from Crescent to Supermoon. Own a hotel?
              Operate it under a Moonlit brand.
            </p>
            <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:gap-4">
              <NavLink href="/moonlit-circle"
                className="bg-[#C6A560] px-8 py-3.5 text-[13px] font-bold uppercase tracking-wide text-[#0B1B33] transition-colors hover:bg-[#A8842F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6F4EF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1B33]">
                Join Moonlit Circle
              </NavLink>
              <NavLink href="/services/franchise"
                className="border-2 border-[#F6F4EF]/60 px-8 py-3.5 text-[13px] font-bold uppercase tracking-wide text-[#F6F4EF] transition-colors hover:border-[#C6A560] hover:text-[#C6A560] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A560] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1B33]">
                Start a franchise conversation
              </NavLink>
            </div>
          </div>
        </section>
      </main>
    
    </>
  )
}