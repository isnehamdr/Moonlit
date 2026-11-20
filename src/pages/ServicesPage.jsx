import PageBanner from '../components/PageBanner'
import { Link} from 'react-router-dom'


const NavLink = ({ href, children, ...props }) => {
  const plain = !href || href.startsWith('#') || /^(https?:|mailto:|tel:|\/\/)/.test(href)
  return plain
    ? <a href={href} {...props}>{children}</a>
    : <Link to={href} {...props}>{children}</Link>
}

/* ------------------------------- content ------------------------------- */
const services = [
  { id: 'management', icon: 'management', title: 'Management', href: '/services/management',
    lead: 'We run your hotel. You own it.',
    provides: ['Team and systems', 'Standards', 'Sales and revenue', 'Monthly reporting'],
    youProvide: ['The building', 'Capital', 'Approval of the budget'] },
  { id: 'franchise', icon: 'franchise', title: 'Franchise', href: '/services/franchise',
    lead: 'Operate your hotel under a Moonlit brand.',
    provides: ['Brand identity', 'Standards and SOPs', 'Moonlit Academy training', 'Distribution', 'The Moonlit Circle', 'Quality audits'],
    youProvide: ['Operating the hotel to brand standard', 'Franchise fees', 'Audits'],
    note: 'Moonlit Select, Inn and Hearth first. Moonlit Grand and Sanctuary by approval.' },
  { id: 'consulting', icon: 'consulting', title: 'Consulting and pre-opening', href: '/services/consulting',
    lead: 'From first concept to opening day.',
    provides: ['Concept and feasibility', 'Design coordination', 'Budgets', 'SOPs', 'Hiring and training'],
    youProvide: ['Project access', 'Decisions on schedule'] },
  { id: 'conversion', icon: 'conversion', title: 'Conversion', href: '/services/conversion',
    lead: 'Relaunch an existing hotel.',
    provides: ['An improvement plan', 'A relaunch under your own name (Managed by Moonlit Hotels & Resorts) or a Moonlit brand'],
    youProvide: ['Funding for the improvement plan'] },
]

const phases = [
  { title: 'Planning & Development', items: ['Site evaluation and concept', 'Feasibility and project planning', 'Architecture and interior design coordination'] },
  { title: 'Pre-Opening & Positioning', items: ['Brand alignment and quality assurance', 'Budgets, timelines, SOPs, systems', 'Hiring, training and development'] },
  { title: 'Full-Scale Operations', items: ['Comprehensive management', 'Sales, marketing, revenue optimisation', 'Advanced F&B and wellness integration'] },
]

const engine = [
  { title: 'Foundation', text: 'SOPs and systems' },
  { title: 'People', text: 'Training and hiring the right people' },
  { title: 'Finance', text: 'Cost control, vendors, P&L mastery' },
  { title: 'Growth', text: 'Data-driven revenue and distribution' },
]

const receive = [
  'A monthly performance report and an annual budget',
  'Written SOPs and trained teams',
  'A quality audit system for Moonlit-branded hotels',
  'Central distribution and the Moonlit Circle for Moonlit brands',
  'Training through the Moonlit Academy',
]

const start = [
  'A first conversation',
  'Asset Health Check or site visit',
  'Written proposal with timeline and fees',
  'Agreement',
]

/* ------------------------------- parts ------------------------------- */
const icons = {
  management: <path d="M4 21V4h10v17M14 9h6v12M7 8h4M7 12h4M7 16h4M3 21h18" />,
  franchise: <path d="M5 21V4M5 5h11l-2.5 4L16 13H5" />,
  consulting: <path d="M9 4h6v3H9zM6 6h12v15H6zM9 12h6M9 16h4" />,
  conversion: <path d="M20 11a8 8 0 0 0-14-4M4 5v4h4M4 13a8 8 0 0 0 14 4M20 19v-4h-4" />,
}

function Icon({ name }) {
  return (
    <span aria-hidden="true" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#0B1B33] text-[#C6A560]">
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {icons[name]}
      </svg>
    </span>
  )
}

const Check = ({ light }) => (
  <svg viewBox="0 0 16 16" aria-hidden="true" className={`mt-1 h-4 w-4 shrink-0 ${light ? 'text-[#C6A560]' : 'text-[#A8842F]'}`}>
    <path d="m3 8.5 3.2 3L13 4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

function List({ title, items }) {
  return (
    <div>
      <h4 className="text-[12px] font-semibold uppercase tracking-wide text-[#5F6B7A]">{title}</h4>
      <ul className="mt-3 space-y-2">
        {items.map((i) => (
          <li key={i} className="flex gap-2.5 text-[15px] leading-snug text-[#0B1B33]"><Check />{i}</li>
        ))}
      </ul>
    </div>
  )
}

function ServiceCard({ s }) {
  return (
    <article id={s.id} className="flex scroll-mt-40 flex-col border border-[#5F6B7A]/25 bg-white p-6 shadow-[0_6px_20px_rgba(11,27,51,.07)] sm:p-8"
      style={{ borderTop: '4px solid #C6A560' }}>
      <div className="flex items-center gap-4">
        <Icon name={s.icon} />
        <div>
          <h3 className="text-[22px] font-bold leading-tight text-[#0B1B33] sm:text-[26px]">{s.title}</h3>
          <p className="mt-0.5 text-[15px] text-[#A8842F]">{s.lead}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-6 border-t border-[#5F6B7A]/25 pt-6 sm:grid-cols-2">
        <List title="MHR provides" items={s.provides} />
        <List title="You provide" items={s.youProvide} />
      </div>

      {s.note && <p className="mt-5 text-[14px] leading-relaxed text-[#5F6B7A]">{s.note}</p>}

      <div className="mt-auto pt-6">
        <NavLink href={s.href}
          className="block border-2 border-[#A8842F] px-6 py-3 text-center text-[13px] font-bold uppercase tracking-wide text-[#0B1B33] transition-colors hover:bg-[#C6A560] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B1B33] focus-visible:ring-offset-2 sm:inline-block">
          Explore {s.title.split(' and ')[0]}
        </NavLink>
      </div>
    </article>
  )
}

/* ------------------------------- the page ------------------------------- */
export default function ServicesPage() {
  return (
    <main>
      <PageBanner
        crumbs={[{ name: 'Home', href: '/' }, { name: 'Services' }]}
        title="Our Services"
        text="For owners who expect their asset to be protected, not merely managed. One accountable team, from first sketch to sustained performance."
        image="/images/service.jpg"
      />

      {/* 1. the four services */}
      <section aria-labelledby="services-title" className="bg-[#F6F4EF] py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 id="services-title" className="text-[26px] font-bold leading-tight text-[#0B1B33] sm:text-[32px] lg:text-[36px]">How we can work together</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-[#5F6B7A] sm:text-[17px]">
              Four ways to work with Moonlit Hotels &amp; Resorts. Each one is clear about what we provide and what you provide.
            </p>
          </div>

          {/* quick links */}
          <nav aria-label="Jump to a service" className="mt-8">
            <ul className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden">
              {services.map((s) => (
                <li key={s.id} className="shrink-0">
                  <a href={`#${s.id}`}
                    className="block rounded-full border-2 border-[#0B1B33]/25 px-5 py-2 text-[14px] font-semibold text-[#0B1B33] transition-colors hover:border-[#0B1B33] hover:bg-[#0B1B33] hover:text-[#F6F4EF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B1B33] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F6F4EF]">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-10 grid gap-6 sm:mt-12 lg:grid-cols-2 lg:gap-8">
            {services.map((s) => <ServiceCard key={s.id} s={s} />)}
          </div>
        </div>
      </section>

      {/* 2. method */}
      <section aria-labelledby="method-title" className="bg-[#152A4D] py-12 text-[#F6F4EF] sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 id="method-title" className="text-[26px] font-bold leading-tight sm:text-[32px] lg:text-[36px]">One team, three phases</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-[#F6F4EF]/80 sm:text-[17px]">
              The same accountable team guides your property from the first sketch to sustained performance.
            </p>
          </div>

          <ol className="relative mt-10 grid gap-10 sm:mt-14 md:grid-cols-3 md:gap-8">
            {/* line behind the numbers, wide screens only */}
            <span aria-hidden="true" className="absolute left-0 right-0 top-5 hidden h-px bg-[#F6F4EF]/25 md:block" />
            {phases.map((p, i) => (
              <li key={p.title} className="relative">
                <span aria-hidden="true" className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#C6A560] bg-[#152A4D] text-[16px] font-bold text-[#C6A560]">{i + 1}</span>
                <h3 className="mt-4 text-[20px] font-bold leading-snug sm:text-[22px]">{p.title}</h3>
                <ul className="mt-3 space-y-2">
                  {p.items.map((it) => (
                    <li key={it} className="flex gap-2.5 text-[15px] leading-snug text-[#F6F4EF]/85"><Check light />{it}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 3. engine and what owners receive */}
      <section aria-labelledby="engine-title" className="bg-[#F6F4EF] py-12 sm:py-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8">
          <div>
            <h2 id="engine-title" className="text-[26px] font-bold leading-tight text-[#0B1B33] sm:text-[32px]">The Operations Excellence Engine</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-[#5F6B7A] sm:text-[17px]">
              Four disciplines that all serve one outcome: a better guest experience.
            </p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {engine.map((e, i) => (
                <li key={e.title} className="border border-[#5F6B7A]/25 bg-white p-5">
                  <span className="text-[13px] font-bold text-[#A8842F]">0{i + 1}</span>
                  <h3 className="mt-1 text-[18px] font-bold text-[#0B1B33]">{e.title}</h3>
                  <p className="mt-1 text-[15px] leading-snug text-[#5F6B7A]">{e.text}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#0B1B33] p-6 text-[#F6F4EF] sm:p-8 lg:self-start">
            <h2 className="text-[22px] font-bold leading-tight sm:text-[26px]">What owners receive</h2>
            <div aria-hidden="true" className="mt-3 h-0.5 w-10 bg-[#C6A560]" />
            <ul className="mt-5 space-y-3">
              {receive.map((r) => (
                <li key={r} className="flex gap-3 text-[15px] leading-snug sm:text-base"><Check light />{r}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 4. how to start */}
      <section aria-labelledby="start-title" className="bg-[#0B1B33] py-12 text-[#F6F4EF] sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 id="start-title" className="text-[26px] font-bold leading-tight sm:text-[32px]">How to start</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-[#F6F4EF]/80 sm:text-[17px]">
              Fees are discussed openly at proposal stage and tied to performance where the model allows.
            </p>
          </div>

          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {start.map((s, i) => (
              <li key={s} className="flex items-start gap-4 border border-[#F6F4EF]/20 p-5 lg:flex-col lg:gap-3">
                <span aria-hidden="true" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#C6A560] text-[15px] font-bold text-[#0B1B33]">{i + 1}</span>
                <p className="text-[16px] font-semibold leading-snug">{s}</p>
              </li>
            ))}
          </ol>

          <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:gap-4">
            <NavLink href="/contact?type=partner"
              className="bg-[#C6A560] px-8 py-3.5 text-center text-[13px] font-bold uppercase tracking-wide text-[#0B1B33] transition-colors hover:bg-[#A8842F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6F4EF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1B33]">
              Start a conversation
            </NavLink>
            <NavLink href="/contact?type=health-check"
              className="border-2 border-[#F6F4EF]/60 px-8 py-3.5 text-center text-[13px] font-bold uppercase tracking-wide text-[#F6F4EF] transition-colors hover:border-[#C6A560] hover:text-[#C6A560] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A560] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1B33]">
              Book an Asset Health Check
            </NavLink>
          </div>
        </div>
      </section>
    </main>
  )
}