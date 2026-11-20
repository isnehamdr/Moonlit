import { useState } from 'react'
import { Link } from 'react-router-dom'

const NavLink = ({ href, children, ...props }) => {
  const plain = !href || href.startsWith('#') || /^(https?:|mailto:|tel:|\/\/)/.test(href)
  return plain
    ? <a href={href} {...props}>{children}</a>
    : <Link to={href} {...props}>{children}</Link>
}

const HERO_IMAGE = '/images/about.jpg'

/* ------------------------------- content ------------------------------- */
const glance = [
  { label: 'Headquarters', value: 'Kathmandu, Nepal' },
  { label: 'What we do', value: 'Hotel operations, management, franchise and consulting for hotels and resorts, and a family of Nepali hotel brands.' },
  { label: 'Services', value: 'Management · Franchise · Consulting and pre-opening · Conversion' },
  { label: 'Method', value: 'Planning & Development → Pre-Opening & Positioning → Full-Scale Operations' },
  { label: 'Promise', value: 'Global standards, local soul' },
]

const vision = 'To act as the most trusted partner for hotel and resort owners, driving unwavering operational excellence and implementing innovative strategies that keep every property ahead of its market.'
const mission = 'To deliver unparalleled management and consulting services that transform raw hotel and resort assets into thriving, market-leading destinations, from first concept to full-scale operation.'

const facts = [
  { value: '50+', label: 'Years of combined leadership', detail: 'Combined leadership experience across the MHR team.' },
  { value: '3', label: 'Senior leaders', detail: 'President & CEO, Vice President and Director.' },
  { value: '3', label: 'Lifecycle phases', detail: 'Planning & Development, Pre-Opening & Positioning, Full-Scale Operations.' },
  { value: '4', label: 'Operating disciplines', detail: 'Foundation, People, Finance and Growth.' },
  { value: '5', label: 'Hotel brands', detail: 'Moonlit Grand, Sanctuary, Select, Inn and Hearth.' },
  { value: '4', label: 'Loyalty tiers', detail: 'Crescent, Half Moon, Full Moon and Supermoon.' },
]

const why = [
  { icon: 'globe', title: 'Global and local expertise', text: "International standards applied with a real understanding of Nepal's market." },
  { icon: 'chart', title: 'Data-driven decisions', text: 'Every operating change backed by metrics.' },
  { icon: 'custom', title: 'Customised solutions', text: 'Strategies built for your asset, not one-size-fits-all playbooks.' },
  { icon: 'growth', title: 'A focus on return', text: 'Protecting your capital and growing your profit.' },
  { icon: 'moon', title: 'Long-term commitment', text: 'A partner through every season and market cycle.' },
]

const leaders = [
  { name: 'Roshan Khawas', role: 'President & CEO', initials: 'RK', photo: '/images/user.png' },
  { name: 'Arun Kumar Puri', role: 'Vice President', initials: 'AP', photo: '/images/user.png' },
  { name: 'Madhukar Aran', role: 'Director', initials: 'MA', photo: '/images/user.png' },
]

/* ------------------------------- parts ------------------------------- */
const whyIcons = {
  globe: (<><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" /></>),
  chart: (<path d="M5 20V11M12 20V5M19 20v-6M3 20h18" />),
  custom: (<path d="M4 7h16M4 12h16M4 17h16M9 5v4M15 10v4M8 15v4" />),
  growth: (<path d="M4 19h16M5 15l5-5 4 4 6-7M15 7h5v5" />),
  moon: (<path d="M20 14.5A8 8 0 1 1 9.5 4a6.2 6.2 0 0 0 10.5 10.5z" />),
}

function WhyIcon({ name }) {
  return (
    <span aria-hidden="true" className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#C6A560]/60 text-[#C6A560]">
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{whyIcons[name]}</svg>
    </span>
  )
}

function Leader({ p }) {
  const [failed, setFailed] = useState(false)
  return (
    <li className="border border-[#5F6B7A]/25 bg-white shadow-[0_6px_20px_rgba(11,27,51,.07)]">
      <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[4/5]">
        {p.photo && !failed ? (
          <img src={p.photo} alt={`${p.name}, ${p.role}`} loading="lazy" decoding="async" onError={() => setFailed(true)} className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div role="img" aria-label={`${p.name}, ${p.role}`} className="absolute inset-0 flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #152A4D 0%, #0B1B33 100%)' }}>
            <span className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-[#C6A560] font-serif text-[34px] text-[#C6A560] sm:h-28 sm:w-28 sm:text-[40px]">{p.initials}</span>
          </div>
        )}
      </div>
      <div className="border-t-4 border-[#C6A560] p-5">
        <h3 className="text-[20px] font-bold leading-tight text-[#0B1B33]">{p.name}</h3>
        <p className="mt-1 text-[15px] text-[#A8842F]">{p.role}</p>
      </div>
    </li>
  )
}

/* ------------------------------- the page ------------------------------- */
export default function AboutPage() {
  const [heroFailed, setHeroFailed] = useState(false)

  return (
    <main>
      {/* 1. header */}
      <section aria-labelledby="about-title" className="relative isolate overflow-hidden bg-[#0B1B33] text-[#F6F4EF]">
        {HERO_IMAGE && !heroFailed ? (
          <>
            <img src={HERO_IMAGE} alt="" loading="eager" decoding="async" onError={() => setHeroFailed(true)} className="absolute inset-0 -z-10 h-full w-full object-cover" />
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0B1B33]/90 via-[#0B1B33]/70 to-[#0B1B33]/30" />
          </>
        ) : (
          <div aria-hidden="true" className="absolute inset-0 -z-10" style={{ background: 'linear-gradient(135deg, #152A4D 0%, #0B1B33 100%)' }}>
            <svg viewBox="0 0 400 400" className="absolute -right-24 top-1/2 h-[220%] w-auto -translate-y-1/2 opacity-20 sm:-right-10 sm:h-[200%] lg:right-10">
              <circle cx="200" cy="200" r="190" fill="none" stroke="#C6A560" strokeWidth="1" />
              <circle cx="200" cy="200" r="140" fill="none" stroke="#C6A560" strokeWidth=".8" />
              <circle cx="200" cy="200" r="76" fill="#C6A560" fillOpacity=".5" />
              <circle cx="228" cy="184" r="72" fill="#0B1B33" />
            </svg>
          </div>
        )}
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-x-2 text-[13px] text-[#F6F4EF]/75 sm:text-[14px]">
              <li><NavLink href="/" className="underline-offset-4 hover:text-[#C6A560] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A560]">Home</NavLink></li>
              <li aria-hidden="true" className="text-[#C6A560]">/</li>
              <li aria-current="page" className="text-[#F6F4EF]">About</li>
            </ol>
          </nav>
          <h1 id="about-title" className="mt-4 text-[34px] font-bold leading-tight sm:text-[44px] lg:text-[56px]">About Moonlit Hotels &amp; Resorts</h1>
          <div aria-hidden="true" className="mt-4 h-0.5 w-14 bg-[#C6A560]" />
          <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-[#F6F4EF]/85 sm:text-[18px]">Global standards, local soul.</p>
        </div>
      </section>

      {/* 2. who we are */}
      <section aria-labelledby="who-title" className="bg-[#F6F4EF] py-12 sm:py-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <div>
            <h2 id="who-title" className="text-[26px] font-bold leading-tight text-[#0B1B33] sm:text-[32px] lg:text-[36px]">Who we are</h2>
            <div aria-hidden="true" className="mt-3 h-0.5 w-12 bg-[#C6A560]" />
            <p className="mt-5 text-[15px] leading-relaxed text-[#5F6B7A] sm:text-[17px]">
              Moonlit Hotels &amp; Resorts (MHR) is a Kathmandu-based hotel management, franchise and consulting company.
              Its team guides hotels and resorts from first sketch to sustained performance.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-[#5F6B7A] sm:text-[17px]">
              MHR also franchises its five Nepali hotel brands, Moonlit Grand, Sanctuary, Select, Inn and Hearth, to
              owners, and runs one loyalty program, Moonlit Circle, across all of them.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <NavLink href="/services"
                className="border-2 border-[#A8842F] px-6 py-3 text-center text-[13px] font-bold uppercase tracking-wide text-[#0B1B33] transition-colors hover:bg-[#C6A560] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B1B33] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F6F4EF]">
                Our services
              </NavLink>
              <NavLink href="/brands"
                className="border-2 border-[#A8842F] px-6 py-3 text-center text-[13px] font-bold uppercase tracking-wide text-[#0B1B33] transition-colors hover:bg-[#C6A560] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B1B33] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F6F4EF]">
                Our brands
              </NavLink>
            </div>
          </div>

          {/* at a glance */}
          <div className="border-t-4 border-[#C6A560] bg-white p-6 shadow-[0_6px_20px_rgba(11,27,51,.07)] sm:p-8">
            <h3 className="text-[13px] font-semibold uppercase tracking-wide text-[#A8842F]">At a glance</h3>
            <dl className="mt-4 divide-y divide-[#5F6B7A]/20">
              {glance.map((g) => (
                <div key={g.label} className="grid gap-1 py-3.5 sm:grid-cols-[9rem_1fr] sm:gap-4">
                  <dt className="text-[13px] font-semibold uppercase tracking-wide text-[#5F6B7A]">{g.label}</dt>
                  <dd className="text-[15px] leading-snug text-[#0B1B33]">{g.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* 3. vision and mission */}
      <section aria-label="Vision and mission" className="bg-[#152A4D] py-12 sm:py-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 md:grid-cols-2 lg:gap-8 lg:px-8">
          {[{ id: 'vision', title: 'Our vision', text: vision, icon: (<><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></>) },
            { id: 'mission', title: 'Our mission', text: mission, icon: (<><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.2" /></>) }].map((c) => (
            <article key={c.id} aria-labelledby={`${c.id}-title`} className="border-t-4 border-[#C6A560] bg-[#F6F4EF] p-6 sm:p-8 lg:p-10">
              <span aria-hidden="true" className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0B1B33] text-[#C6A560]">
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{c.icon}</svg>
              </span>
              <h2 id={`${c.id}-title`} className="mt-5 text-[24px] font-bold leading-tight text-[#0B1B33] sm:text-[28px]">{c.title}</h2>
              <p className="mt-3 text-[16px] leading-relaxed text-[#5F6B7A] sm:text-[18px]">{c.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* 4. key facts */}
      <section aria-labelledby="facts-title" className="bg-[#F6F4EF] py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 id="facts-title" className="text-center text-[26px] font-bold leading-tight text-[#0B1B33] sm:text-[32px] lg:text-[36px]">Key facts</h2>
          <ul className="mt-8 grid grid-cols-2 gap-px border-y border-[#5F6B7A]/25 bg-[#5F6B7A]/25 sm:mt-12 lg:grid-cols-3">
            {facts.map((f) => (
              <li key={f.label} className="flex flex-col items-center bg-[#F6F4EF] px-3 py-7 text-center sm:px-6 sm:py-10">
                <p className="text-[40px] font-bold leading-none text-[#0B1B33] sm:text-[52px] lg:text-[60px]">{f.value}</p>
                <div aria-hidden="true" className="my-3 h-0.5 w-10 bg-[#C6A560]" />
                <p className="text-[15px] font-semibold leading-snug text-[#0B1B33] sm:text-[17px]">{f.label}</p>
                <p className="mt-2 max-w-[16rem] text-[13px] leading-relaxed text-[#5F6B7A] sm:text-[14px]">{f.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5. why owners choose us */}
      <section id="why" aria-labelledby="why-title" className="scroll-mt-40 bg-[#0B1B33] py-12 text-[#F6F4EF] sm:py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 id="why-title" className="text-[26px] font-bold leading-tight sm:text-[32px] lg:text-[36px]">Why owners choose us</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-[#F6F4EF]/80 sm:text-[17px]">
              For owners who expect their asset to be protected, not merely managed.
            </p>
          </div>

          <ul className="mt-10 flex flex-wrap justify-center gap-y-6 sm:mt-14">
            {why.map((w) => (
              <li key={w.title} className="w-full px-0 sm:w-1/2 sm:px-3 lg:w-1/3">
                <div className="h-full border border-[#F6F4EF]/20 p-6 transition-colors hover:border-[#C6A560]">
                  <WhyIcon name={w.icon} />
                  <h3 className="mt-5 text-[19px] font-bold leading-snug sm:text-[20px]">{w.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-[#F6F4EF]/80">{w.text}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-10 text-center">
            <NavLink href="/contact?type=partner"
              className="inline-block w-full bg-[#C6A560] px-10 py-3.5 text-center text-[13px] font-bold uppercase tracking-wide text-[#0B1B33] transition-colors hover:bg-[#A8842F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6F4EF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1B33] sm:w-auto">
              Start a conversation
            </NavLink>
          </div>
        </div>
      </section>

      {/* 6. leadership */}
      <section id="leadership" aria-labelledby="leaders-title" className="scroll-mt-40 bg-[#F6F4EF] py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 id="leaders-title" className="text-[26px] font-bold leading-tight text-[#0B1B33] sm:text-[32px] lg:text-[36px]">Our leadership</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-[#5F6B7A] sm:text-[17px]">Three senior leaders, more than 50 years of combined leadership.</p>
          </div>
          <ul className="mx-auto mt-10 grid max-w-md gap-6 sm:mt-12 sm:max-w-none sm:grid-cols-3 sm:gap-6 lg:gap-8">
            {leaders.map((p) => <Leader key={p.name} p={p} />)}
          </ul>
        </div>
      </section>
    </main>
  )
}