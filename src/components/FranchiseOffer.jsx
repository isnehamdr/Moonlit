import { useState } from 'react'

const NavLink = ({ href, children, ...props }) => (
  <a href={href} {...props}>{children}</a>
)

const IMAGE = '/images/FamilyBoard.png' // optional: a photo of a Moonlit franchise hotel, or leave blank to show the brand tiles

const tiles = [
  { name: 'Grand', color: '#6B1E2E' },
  { name: 'Sanctuary', color: '#2F5D50' },
  { name: 'Select', color: '#2A6496' },
  { name: 'Inn', color: '#B5541C' },
  { name: 'Hearth', color: '#7B3F26' },
]

/* Default visual: the five brands as tiles, like the client's "Five brands, one family" slide */
function BrandTiles() {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden p-6 sm:p-8"
      style={{ background: 'radial-gradient(70% 80% at 50% 40%, #152A4D 0%, #0B1B33 100%)' }}>
      {/* faint orbit rings, echoing the Moonlit Circle logo */}
      <svg viewBox="0 0 400 400" aria-hidden="true" className="absolute left-1/2 top-1/2 h-[120%] w-auto -translate-x-1/2 -translate-y-1/2 opacity-25">
        <circle cx="200" cy="200" r="190" fill="none" stroke="#C6A560" strokeWidth="1.2" />
        <circle cx="200" cy="200" r="140" fill="none" stroke="#C6A560" strokeWidth="1" />
      </svg>

      <ul aria-label="Five brands you can franchise" className="relative grid w-full max-w-[420px] grid-cols-6 gap-3 sm:gap-4">
        {tiles.map((t, i) => (
          <li key={t.name}
            className={`col-span-2 ${i === 3 ? 'col-start-2' : ''}`}>
            <div className="flex aspect-square flex-col items-center justify-center rounded-xl shadow-[0_8px_20px_rgba(0,0,0,.35)] sm:rounded-2xl"
              style={{ backgroundColor: t.color }}>
              <span className="font-serif text-[clamp(1rem,4vw,1.5rem)] leading-none text-[#C6A560]">MHR</span>
              <span className="mt-2 text-[clamp(.6rem,2vw,.8rem)] leading-none text-[#F6F4EF]">{t.name}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function FranchiseOffer() {
  const [failed, setFailed] = useState(false)

  return (
    <section aria-labelledby="franchise-title" className="bg-[#F6F4EF] py-12 sm:py-16 lg:py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 sm:px-6 md:grid-cols-2 lg:gap-14 lg:px-6">
        {/* visual */}
        <div className="aspect-[4/3] w-full overflow-hidden border-2 border-[#C6A560] ">
          {IMAGE && !failed
            ? <img src={IMAGE} alt="A Moonlit franchise hotel" loading="lazy" decoding="async" onError={() => setFailed(true)} className="h-full w-full object-contain" />
            : <BrandTiles />}
        </div>

        {/* text */}
        <div>
          <p className="text-[18px] font-semibold leading-snug text-[#0B1B33] sm:text-[20px]">For hotel owners:</p>
          <h2 id="franchise-title" className="mt-1 text-[26px] font-bold leading-tight text-[#0B1B33] sm:text-[30px] lg:text-[34px]">
            Bring a Moonlit brand to your hotel
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[#5F6B7A] sm:text-base">
            Operate your hotel or resort under a Moonlit brand. MHR provides the brand identity, standards, written SOPs,
            Moonlit Academy training, distribution and quality audits. Moonlit Select, Inn and Hearth come first, with
            Moonlit Grand and Sanctuary by approval. Fees are set out in writing in your proposal.{' '}
            <NavLink href="/services/franchise"
              className="text-[#152A4D] underline underline-offset-2 hover:text-[#A8842F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B1B33]">
              See how it works
            </NavLink>
          </p>
          <NavLink href="/contact?type=franchise"
            className="mt-7 block border-2 border-[#A8842F] px-6 py-3.5 text-center text-[14px] font-bold uppercase tracking-wide text-[#0B1B33] transition-colors hover:bg-[#C6A560] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B1B33] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F6F4EF] sm:inline-block sm:text-left">
            Start a franchise conversation
          </NavLink>
        </div>
      </div>
    </section>
  )
}