import { useState } from 'react'
import { Link } from 'react-router-dom'

const NavLink = ({ href, children, ...props }) => {
  const plain = !href || href.startsWith('#') || /^(https?:|mailto:|tel:|\/\/)/.test(href)
  return plain
    ? <a href={href} {...props}>{children}</a>
    : <Link to={href} {...props}>{children}</Link>
}

const LOGO = '/images/loyaltyprogram.jpeg'

/* ------------------------------- content ------------------------------- */
const brands = [
  { name: 'Grand', color: '#6B1E2E' },
  { name: 'Sanctuary', color: '#2F5D50' },
  { name: 'Select', color: '#2A6496' },
  { name: 'Inn', color: '#B5541C' },
  { name: 'Hearth', color: '#7B3F26' },
]

const steps = [
  { title: 'Join free', text: 'Sign up online, at any Moonlit hotel or at check-in. The first tier costs nothing.' },
  { title: 'Stay and earn', text: 'Earn points on what you spend across all five brands, all in one account.' },
  { title: 'Rise through the moon phases', text: 'Qualifying nights each year move you up from Crescent to Supermoon.' },
]

/* Moon-phase icons, one per tier — kept ONLY for the fallback card if an image fails to load */
const moon = {
  crescent: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-full w-full"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="currentColor" /></svg>
  ),
  half: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-full w-full">
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.6" /><path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor" />
    </svg>
  ),
  full: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-full w-full"><circle cx="12" cy="12" r="9" fill="currentColor" /></svg>
  ),
  super: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-full w-full">
      <circle cx="12" cy="12" r="6.5" fill="currentColor" />
      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="12" cy="12" r="8.3" fill="none" stroke="currentColor" strokeWidth=".6" strokeOpacity=".6" />
    </svg>
  ),
}

// bg/fg/accent/chip describe the fallback look of each membership card (used only if image is missing)
// image = the picture shown for the card.
const tiers = [
  { name: 'Crescent', nights: 'Free to join', icon: 'crescent',
    image: '/images/crescent.png',
    benefits: ['Member rates', 'Free Wi-Fi', 'Points on spend'],
    bg: 'linear-gradient(135deg, #152A4D 0%, #0B1B33 100%)', fg: '#F6F4EF', accent: '#C6A560',
    chip: 'linear-gradient(135deg,#C6A560,#A8842F)' },
  { name: 'Half Moon', nights: '10 nights a year', icon: 'half',
    image: '/images/half-moon.png',
    benefits: ['Late check-out', 'A welcome drink', 'Bonus points'],
    bg: '#0B1B33', fg: '#F6F4EF', accent: '#C6A560', border: '#A8842F',
    chip: 'linear-gradient(135deg,#C6A560,#A8842F)' },
  { name: 'Full Moon', nights: '30 nights a year', icon: 'full',
    image: '/images/full-moon.png',
    benefits: ['A room upgrade', 'Breakfast', 'Priority service'],
    bg: 'linear-gradient(135deg, #C6A560 0%, #A8842F 100%)', fg: '#0B1B33', accent: '#0B1B33',
    chip: 'linear-gradient(135deg,#0B1B33,#152A4D)' },
  { name: 'Supermoon', nights: '60 nights a year', icon: 'super',
    image: '/images/supermoon.png',
    benefits: ['A suite upgrade', 'Lounge access', 'A dedicated contact', 'Partner perks'],
    bg: 'radial-gradient(90% 120% at 80% 0%, #152A4D 0%, #0B1B33 70%)', fg: '#F6F4EF', accent: '#C6A560', border: '#C6A560',
    chip: 'linear-gradient(135deg,#C6A560,#A8842F)' },
]

const joinWays = [
  { title: 'Online', text: 'Join from this website.' },
  { title: 'At any Moonlit hotel', text: 'Ask at the front desk.' },
  { title: 'At check-in', text: 'Join when you arrive.' },
]

/* ------------------------------- parts ------------------------------- */
const Check = ({ light }) => (
  <svg viewBox="0 0 16 16" aria-hidden="true" className={`mt-1 h-4 w-4 shrink-0 ${light ? 'text-[#C6A560]' : 'text-[#A8842F]'}`}>
    <path d="m3 8.5 3.2 3L13 4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

/* The emblem drawn in code, shown if the logo file is missing */
function Emblem() {
  const gold = '#C6A560'
  return (
    <div className="flex aspect-[4/3] w-full items-center justify-center p-4 sm:p-6"
      style={{ background: 'radial-gradient(70% 80% at 50% 40%, #152A4D 0%, #0B1B33 100%)' }}>
      <svg viewBox="0 0 400 300" role="img" aria-label="Moonlit Circle emblem" className="h-full w-full">
        <circle cx="200" cy="150" r="132" fill="#0B1B33" stroke={gold} strokeWidth="4" />
        <circle cx="200" cy="150" r="116" fill="none" stroke={gold} strokeOpacity=".3" strokeWidth="1.2" />
        <circle cx="200" cy="150" r="84" fill="none" stroke={gold} strokeOpacity=".3" strokeWidth="1.2" />
        <circle cx="200" cy="66" r="17" fill={gold} /><circle cx="207" cy="62" r="15" fill="#0B1B33" />
        <circle cx="116" cy="150" r="30" fill="none" stroke={gold} strokeOpacity=".35" strokeWidth="1.2" /><circle cx="116" cy="150" r="19" fill={gold} />
        <circle cx="284" cy="150" r="17" fill="none" stroke={gold} strokeOpacity=".5" strokeWidth="1.2" /><path d="M284 133a17 17 0 0 1 0 34z" fill={gold} />
        <circle cx="200" cy="234" r="19" fill={gold} />
        <path d="M200 118C204 136 208 145 228 150 208 155 204 164 200 182 196 164 192 155 172 150 192 145 196 136 200 118Z" fill={gold} />
      </svg>
    </div>
  )
}

/* Fallback card, drawn in code — only shown if the tier image fails to load */
function MemberCardFallback({ t }) {
  return (
    <div role="img" aria-label={`${t.name} membership card`}
      className="relative aspect-[1.586/1] w-full overflow-hidden rounded-2xl p-4 sm:p-5"
      style={{ background: t.bg, color: t.fg,
        boxShadow: `0 14px 30px rgba(11,27,51,.28)${t.border ? `, inset 0 0 0 2px ${t.border}` : ''}` }}>
      <svg viewBox="0 0 200 200" aria-hidden="true" className="absolute -right-12 -top-14 h-[130%] w-auto opacity-20" style={{ color: t.accent }}>
        <circle cx="100" cy="100" r="95" fill="none" stroke="currentColor" strokeWidth="1" />
        <circle cx="100" cy="100" r="62" fill="none" stroke="currentColor" strokeWidth=".8" />
      </svg>

      <div className="relative flex h-full flex-col justify-between">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[.2em]">Moonlit Circle</p>
            <p className="mt-0.5 text-[9px] opacity-70">Moonlit Hotels &amp; Resorts</p>
          </div>
          <span className="h-8 w-8" style={{ color: t.accent }}>{moon[t.icon]}</span>
        </div>

        <span aria-hidden="true" className="block h-7 w-9 rounded-md" style={{ background: t.chip }} />

        <div className="flex items-end justify-between gap-2">
          <div>
            <p className="font-serif text-[22px] leading-none sm:text-[24px]">{t.name}</p>
            <p className="mt-1.5 text-[10px] tracking-[.25em] opacity-70">&bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull;</p>
          </div>
          <p className="text-right text-[10px] font-semibold uppercase leading-tight tracking-wide opacity-80">{t.nights}</p>
        </div>
      </div>
    </div>
  )
}

/* Tier card — uses the image; falls back to the drawn card if the image fails */
function MemberCard({ t }) {
  const [failed, setFailed] = useState(false)

  if (!t.image || failed) return <MemberCardFallback t={t} />

  return (
    <div
      role="img"
      aria-label={`${t.name} membership card`}
      className="relative aspect-[1.586/1] w-full overflow-hidden rounded-2xl"
      style={{ boxShadow: '0 14px 30px rgba(11,27,51,.28)' }}
    >
      <img
        src={t.image}
        alt={`${t.name} tier membership card`}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
        className="block h-full w-full object-cover"
      />
    </div>
  )
}

/* ------------------------------- the page ------------------------------- */
export default function MoonlitCirclePage() {
  const [logoFailed, setLogoFailed] = useState(false)

  return (
    <main>
      {/* 1. header with the loyalty program logo */}
      <section aria-labelledby="circle-page-title" className="relative isolate overflow-hidden bg-[#0B1B33] text-[#F6F4EF]"
        style={{ backgroundImage: 'radial-gradient(60% 80% at 85% 40%, rgba(21,42,77,.95) 0%, rgba(11,27,51,0) 70%)' }}>
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-10 sm:px-6 sm:py-14 md:grid-cols-2 lg:gap-14 lg:px-8 lg:py-20">
          <div>
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-x-2 text-[13px] text-[#F6F4EF]/75 sm:text-[14px]">
                <li><NavLink href="/" className="underline-offset-4 hover:text-[#C6A560] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A560]">Home</NavLink></li>
                <li aria-hidden="true" className="text-[#C6A560]">/</li>
                <li aria-current="page" className="text-[#F6F4EF]">Moonlit Circle</li>
              </ol>
            </nav>
            <h1 id="circle-page-title" className="mt-4 text-[34px] font-bold leading-tight sm:text-[44px] lg:text-[56px]">Moonlit Circle</h1>
            <div aria-hidden="true" className="mt-4 h-0.5 w-14 bg-[#C6A560]" />
            <p className="mt-5 max-w-lg text-[16px] leading-relaxed text-[#F6F4EF]/85 sm:text-[18px]">
              The loyalty program of Moonlit Hotels &amp; Resorts. Welcome to the Circle.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <NavLink href="#join"
                className="bg-[#C6A560] px-8 py-3.5 text-center text-[13px] font-bold uppercase tracking-wide text-[#0B1B33] transition-colors hover:bg-[#A8842F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6F4EF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1B33]">
                Join free
              </NavLink>
              <NavLink href="#tiers"
                className="border-2 border-[#F6F4EF]/60 px-8 py-3.5 text-center text-[13px] font-bold uppercase tracking-wide text-[#F6F4EF] transition-colors hover:border-[#C6A560] hover:text-[#C6A560] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A560] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1B33]">
                See the four tiers
              </NavLink>
            </div>
          </div>

          {/* logo: the frame hugs the picture, the gold ring is drawn outside it */}
          <div className="mx-auto w-full max-w-xl overflow-hidden ring-2 ring-[#C6A560]">
            {LOGO && !logoFailed
              ? <img src={LOGO} alt="Moonlit Circle, a Moonlit Hotels & Resorts loyalty program" width="1600" height="800" loading="eager" decoding="async"
                  onError={() => setLogoFailed(true)} className="block h-auto w-full" />
              : <Emblem />}
          </div>
        </div>
      </section>

      {/* 2. one account, five brands */}
      <section aria-labelledby="account-title" className="bg-[#F6F4EF] py-12 sm:py-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <div>
            <h2 id="account-title" className="text-[26px] font-bold leading-tight text-[#0B1B33] sm:text-[32px] lg:text-[36px]">One account, five brands</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-[#5F6B7A] sm:text-[17px]">
              Moonlit Circle works at every Moonlit hotel. Stay at Moonlit Grand, Sanctuary, Select, Inn or Hearth and
              your nights and points all go to the same account.
            </p>
            <div className="mt-6 flex gap-4 border-l-4 border-[#C6A560] bg-white p-5">
              <div>
                <h3 className="text-[16px] font-bold text-[#0B1B33]">Your data stays private</h3>
                <p className="mt-1 text-[15px] leading-relaxed text-[#5F6B7A]">We ask for marketing consent separately.</p>
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[420px] overflow-hidden rounded-2xl border-2 border-[#C6A560] shadow-[0_14px_30px_rgba(11,27,51,.28)]">
  <img
    src="/images/FamilyBoard.png"
    alt="The five Moonlit brands: Grand, Sanctuary, Select, Inn and Hearth"
    loading="lazy"
    decoding="async"
    className="block h-[40vh] w-[80vh] object-fit"
  />
</div>
        </div>
      </section>

      {/* 3. how it works */}
      <section id="how-it-works" aria-labelledby="how-title" className="scroll-mt-40 bg-[#152A4D] py-12 text-[#F6F4EF] sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="how-title" className="text-center text-[26px] font-bold leading-tight sm:text-[32px] lg:text-[36px]">How it works</h2>
          <ol className="relative mt-10 grid gap-8 sm:mt-14 md:grid-cols-3 md:gap-8">
            <span aria-hidden="true" className="absolute left-[16%] right-[16%] top-5 hidden h-px bg-[#F6F4EF]/25 md:block" />
            {steps.map((s, i) => (
              <li key={s.title} className="relative text-center">
                <span aria-hidden="true" className="relative z-10 mx-auto flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#C6A560] bg-[#152A4D] text-[16px] font-bold text-[#C6A560]">{i + 1}</span>
                <h3 className="mt-4 text-[20px] font-bold leading-snug sm:text-[22px]">{s.title}</h3>
                <p className="mx-auto mt-2 max-w-xs text-[15px] leading-relaxed text-[#F6F4EF]/80 sm:text-base">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 4. the four tiers as membership cards */}
      <section id="tiers" aria-labelledby="tiers-title" className="scroll-mt-40 bg-[#F6F4EF] py-12 sm:py-16 lg:py-20">
        <div id="benefits" className="mx-auto max-w-7xl scroll-mt-40 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 id="tiers-title" className="text-[26px] font-bold leading-tight text-[#0B1B33] sm:text-[32px] lg:text-[36px]">Four tiers, four moon phases</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-[#5F6B7A] sm:text-[17px]">
              The more nights you stay in a year, the brighter your card becomes.
            </p>
          </div>

          <ul className="mt-10 grid gap-8 sm:mt-14 sm:grid-cols-2 xl:grid-cols-4">
            {tiers.map((t) => (
              <li key={t.name} className="flex flex-col">
                <MemberCard t={t} />
                <div className="mt-6 flex flex-1 flex-col">
                  <h3 className="text-[22px] font-bold leading-tight text-[#0B1B33]">{t.name}</h3>
                  <p className="mt-1 text-[13px] font-semibold uppercase tracking-wide text-[#A8842F]">{t.nights}</p>
                  <ul className="mt-4 space-y-2 border-t border-[#5F6B7A]/25 pt-4">
                    {t.benefits.map((b) => (
                      <li key={b} className="flex gap-2.5 text-[15px] leading-snug text-[#0B1B33]"><Check />{b}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5. join */}
      <section id="join" aria-labelledby="join-title" className="scroll-mt-40 bg-[#0B1B33] py-12 text-[#F6F4EF] sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 id="join-title" className="text-[26px] font-bold leading-tight sm:text-[32px]">Join the Circle, free</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-[#F6F4EF]/80 sm:text-[17px]">Start at Crescent today. Choose whichever way suits you.</p>
          </div>

          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {joinWays.map((w) => (
              <li key={w.title} className="border border-[#F6F4EF]/20 p-5 text-center">
                <p className="text-[17px] font-semibold">{w.title}</p>
                <p className="mt-1 text-[14px] text-[#F6F4EF]/75">{w.text}</p>
              </li>
            ))}
          </ul>

          <div className="mt-8 text-center">
            <NavLink href="/contact-us"
              className="inline-block w-full bg-[#C6A560] px-10 py-3.5 text-center text-[13px] font-bold uppercase tracking-wide text-[#0B1B33] transition-colors hover:bg-[#A8842F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6F4EF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1B33] sm:w-auto">
              Join Moonlit Circle
            </NavLink>
          </div>

          <p id="terms" className="mx-auto mt-8 max-w-2xl scroll-mt-40 border-t border-[#F6F4EF]/20 pt-6 text-center text-[13px] leading-relaxed text-[#F6F4EF]/70">
            Full program terms will be published before launch.
          </p>
        </div>
      </section>
    </main>
  )
}