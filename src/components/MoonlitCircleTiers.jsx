import { useEffect, useRef, useState } from 'react'

/*
  MOONLIT CIRCLE TIERS (Wyndham "Plan Your Next Trip" layout, Moonlit content)
  Four loyalty tiers in a carousel: 1 card on phones, 2 on tablets, 3 on desktop.

  Client colours, written as hex codes:
    Midnight Navy #0B1B33 · Royal Navy #152A4D · Moonlit Gold #C6A560
    Burnished Gold #A8842F · Himalayan White #F6F4EF · Slate Stone #5F6B7A

  Swap this one line if the project uses Inertia:
  import { Link as NavLink } from '@inertiajs/react'
*/
const NavLink = ({ href, children, ...props }) => (
  <a href={href} {...props}>{children}</a>
)

/* Moon-phase icons, one per tier (Moonlit Gold) */
const icons = {
  crescent: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-18 w-18">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="currentColor" />
    </svg>
  ),
  half: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-18 w-18">
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor" />
    </svg>
  ),
  full: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-18 w-18">
      <circle cx="12" cy="12" r="9" fill="currentColor" />
    </svg>
  ),
  super: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-18 w-18">
      <circle cx="12" cy="12" r="6.5" fill="currentColor" />
      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="12" cy="12" r="8.3" fill="none" stroke="currentColor" strokeWidth=".6" strokeOpacity=".6" />
    </svg>
  ),
}

// Content comes from the Moonlit Circle factsheet
const tiers = [
  { name: 'Crescent', nights: 'Free to join', icon: 'crescent', cta: 'Join free',
    text: 'Member rates, free Wi-Fi and points on spend. Join online, at any Moonlit hotel or at check-in.' },
  { name: 'Half Moon', nights: '10 nights a year', icon: 'half', cta: 'View benefits',
    text: 'Late check-out, a welcome drink and bonus points on every stay.' },
  { name: 'Full Moon', nights: '30 nights a year', icon: 'full', cta: 'View benefits',
    text: 'A room upgrade, breakfast and priority service, across all five Moonlit brands.' },
  { name: 'Supermoon', nights: '60 nights a year', icon: 'super', cta: 'View benefits',
    text: 'A suite upgrade, lounge access, a dedicated contact and partner perks.' },
]

// how many cards are visible: 1 on phones, 2 on tablets, 3 on laptops and larger
function usePerView() {
  const get = () => (window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1)
  const [v, setV] = useState(3)
  useEffect(() => {
    const on = () => setV(get())
    on()
    window.addEventListener('resize', on)
    return () => window.removeEventListener('resize', on)
  }, [])
  return v
}

export default function MoonlitCircleTiers() {
  const perView = usePerView()
  const n = tiers.length
  const max = Math.max(0, n - perView)
  const [index, setIndex] = useState(0)
  const touchX = useRef(null)

  useEffect(() => { setIndex((i) => Math.min(i, max)) }, [max])
  const go = (i) => setIndex(Math.min(Math.max(i, 0), max))

  const arrow = 'absolute top-1/2 z-10 flex h-11 w-8 -translate-y-1/2 items-center justify-center bg-[#F6F4EF]/90 text-[#0B1B33] transition-colors hover:bg-[#C6A560] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A560] disabled:opacity-30 disabled:hover:bg-[#F6F4EF]/90 sm:h-12 sm:w-10'

  return (
    <section aria-labelledby="circle-title" className="bg-[#152A4D] py-12 sm:py-16 lg:py-20">
      <div className=" px-4 sm:px-6 lg:px-12">
        <h2 id="circle-title" className="text-center text-[26px] font-extrabold leading-tight text-[#F6F4EF] sm:text-[30px]">
          Join Moonlit Circle
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-[15px] text-[#F6F4EF]/75 sm:text-lg">
          One loyalty program for every Moonlit hotel. Your light is on wherever you stay.
        </p>

        <div role="region" aria-roledescription="carousel" aria-label="Moonlit Circle tiers" className="relative mt-8 sm:mt-12"
          onKeyDown={(e) => { if (e.key === 'ArrowLeft') go(index - 1); if (e.key === 'ArrowRight') go(index + 1) }}
          onTouchStart={(e) => { touchX.current = e.touches[0].clientX }}
          onTouchEnd={(e) => {
            if (touchX.current == null) return
            const dx = e.changedTouches[0].clientX - touchX.current
            touchX.current = null
            if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1))
          }}>

          <button type="button" aria-label="Previous tiers" disabled={index === 0} onClick={() => go(index - 1)} className={`${arrow} left-0`}>
            <svg viewBox="0 0 8 12" aria-hidden="true" className="h-3 w-2"><path d="M7 1 1.5 6 7 11z" fill="currentColor" /></svg>
          </button>
          <button type="button" aria-label="Next tiers" disabled={index >= max} onClick={() => go(index + 1)} className={`${arrow} right-0`}>
            <svg viewBox="0 0 8 12" aria-hidden="true" className="h-3 w-2"><path d="M1 1l5.5 5L1 11z" fill="currentColor" /></svg>
          </button>

          <div className="mx-10 overflow-hidden sm:mx-12">
            <ul className="flex transition-transform duration-500 ease-out motion-reduce:transition-none"
              style={{ transform: `translateX(-${index * (100 / perView)}%)` }}>
              {tiers.map((t, idx) => {
                const visible = idx >= index && idx < index + perView
                return (
                  <li key={t.name} role="group" aria-roledescription="slide" aria-label={`${idx + 1} of ${n}`}
                    aria-hidden={!visible} {...(visible ? {} : { inert: '' })}
                    className="flex shrink-0 grow-0 px-2 sm:px-3" style={{ flexBasis: `${100 / perView}%` }}>
                    <article className="flex w-full flex-col bg-[#F6F4EF] px-6 pb-6 pt-8 text-center sm:px-8">
                      <div className="mx-auto text-[#C6A560]">{icons[t.icon]}</div>
                      <h3 className="mt-4 text-[22px] font-bold leading-tight text-[#0B1B33] sm:text-[28px]">{t.name}</h3>
                      <p className="mt-2 text-[20px] font-semibold uppercase tracking-wide text-[#A8842F]">{t.nights}</p>
                      <div aria-hidden="true" className="mx-auto my-5 h-px w-16 bg-[#5F6B7A]/40" />
                      <p className="text-[18px] leading-relaxed text-[#5F6B7A]">{t.text}</p>
                      <NavLink href="/moonlit-circle#how-it-works"
                        className="mt-4 inline-block self-center text-[18px] text-[#152A4D] underline underline-offset-2 hover:text-[#A8842F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B1B33]">
                        See how it works
                      </NavLink>
                      <div className="mt-auto pt-6">
                      <NavLink href="/moonlit-circle#join"
                        className="block border-2 border-[#A8842F] px-4 py-3 text-center text-[16px] font-bold uppercase tracking-wide text-[#0B1B33] transition-colors hover:bg-[#C6A560] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B1B33] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F6F4EF]">
                        {t.cta}
                      </NavLink>
                      </div>
                    </article>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        {/* dots */}
        <div className="mt-6 flex items-center justify-center" role="group" aria-label="Choose position">
          {Array.from({ length: max + 1 }).map((_, i) => (
            <button key={i} type="button" aria-label={`Show tiers from ${i + 1}`} aria-current={i === index} onClick={() => go(i)}
              className="group p-2 focus-visible:outline-none">
              <span className={`block h-2 w-2 rounded-full transition-colors group-focus-visible:ring-2 group-focus-visible:ring-[#C6A560] group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-[#152A4D] ${i === index ? 'bg-[#F6F4EF]' : 'bg-[#F6F4EF]/40 group-hover:bg-[#F6F4EF]/70'}`} />
            </button>
          ))}
        </div>

        <p className="mt-2 text-center text-[13px] text-[#F6F4EF]/70">
          We ask for marketing consent separately. Full program terms will be published before launch.
        </p>
      </div>
    </section>
  )
}