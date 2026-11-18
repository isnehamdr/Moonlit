import { useState } from 'react'

/*
  DISCOVER MOONLIT (Wyndham "Discover Thousands of Hotels" layout, Moonlit content)
  A full-width photo with a white message card in the centre.

  Image: save a photo as public/images/discover-bg.jpg (any size, it is cropped to fit).
  If the file is missing, a Royal Navy to Midnight Navy block with moon rings is shown.

  Client colours, written as hex codes:
    Midnight Navy #0B1B33 · Royal Navy #152A4D · Moonlit Gold #C6A560
    Burnished Gold #A8842F · Himalayan White #F6F4EF · Slate Stone #5F6B7A

  Swap this one line if the project uses Inertia:
  import { Link as NavLink } from '@inertiajs/react'
*/
const NavLink = ({ href, children, ...props }) => (
  <a href={href} {...props}>{children}</a>
)

const IMAGE = '/images/hero2.jpg'

function Background() {
  const [failed, setFailed] = useState(false)
  if (!failed) {
    return (
      <img src={IMAGE} alt="" loading="lazy" decoding="async" onError={() => setFailed(true)}
        className="absolute inset-0 h-full w-full object-cover object-center" />
    )
  }
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #152A4D 0%, #0B1B33 100%)' }}>
      <svg viewBox="0 0 400 400" className="absolute -right-16 top-1/2 h-[150%] w-auto -translate-y-1/2 opacity-25">
        <circle cx="200" cy="200" r="190" fill="none" stroke="#C6A560" strokeWidth="1.2" />
        <circle cx="200" cy="200" r="130" fill="none" stroke="#C6A560" strokeWidth="1" />
        <circle cx="200" cy="200" r="70" fill="#C6A560" fillOpacity=".5" />
        <circle cx="228" cy="184" r="66" fill="#152A4D" />
      </svg>
    </div>
  )
}

export default function DiscoverMoonlit() {
  return (
    <section aria-labelledby="discover-title"
      className="relative flex min-h-[440px] items-center justify-center bg-[#0B1B33] px-6 py-10 sm:min-h-[520px] sm:px-6 sm:py-14 lg:min-h-[600px] lg:py-14">
      <Background />

      <div className="relative w-full max-w-[680px] bg-[#F6F4EF] px-6 py-8 text-center shadow-[0_12px_40px_rgba(11,27,51,.35)] sm:px-10 sm:py-10 lg:px-10 lg:py-8">
        <h2 id="discover-title" className="text-[26px] font-bold leading-tight text-[#0B1B33] sm:text-[32px] lg:text-[34px]">
          Discover Moonlit Hotels &amp; Resorts
        </h2>
        <p className="mt-4 text-[17px] font-semibold leading-snug text-[#0B1B33] sm:text-[18px]">
          5 brands. 4 loyalty tiers. 50+ years of combined leadership.
        </p>
        <div aria-hidden="true" className="mx-auto my-5 h-px w-16 bg-[#5F6B7A]/40" />
        <p className="text-[15px] leading-relaxed text-[#5F6B7A] sm:text-base lg:text-[16px]">
          Moonlit Hotels &amp; Resorts is a Kathmandu-based hotel management, franchise and consulting company.
          Its team guides hotels and resorts from first sketch to sustained performance, and franchises its five
          Nepali hotel brands to owners. Global standards, local soul.
        </p>
        <NavLink href="/about"
          className="mt-7 block border-2 border-[#A8842F] px-6 py-3.5 text-center text-[14px] font-bold uppercase tracking-wide text-[#0B1B33] transition-colors hover:bg-[#C6A560] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B1B33] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F6F4EF] sm:inline-block sm:px-10">
          Learn about MHR
        </NavLink>
      </div>
    </section>
  )
}