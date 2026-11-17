/*
  WHY MOONLIT (Wyndham "Book Faster with the App" layout, Moonlit content)
  Centred heading and intro, then feature columns: gold icon, title, short divider, text.
  1 column on phones, 2 on tablets, 3 on desktop (the last row is centred).

  Client colours, written as hex codes:
    Midnight Navy #0B1B33 · Moonlit Gold #C6A560
    Himalayan White #F6F4EF · Slate Stone #5F6B7A
*/

/* Solid gold icons (Moonlit Gold) */
const icons = {
  globe: (
    <svg viewBox="0 0 48 48" aria-hidden="true" className="h-11 w-11 sm:h-12 sm:w-12">
      <circle cx="24" cy="24" r="20" fill="currentColor" />
      <g fill="none" stroke="#F6F4EF" strokeWidth="2.2" strokeLinecap="round">
        <path d="M4 24h40" />
        <path d="M24 4c8 7 8 33 0 40M24 4c-8 7-8 33 0 40" />
      </g>
    </svg>
  ),
  chart: (
    <svg viewBox="0 0 48 48" aria-hidden="true" className="h-11 w-11 sm:h-12 sm:w-12">
      <rect x="5" y="26" width="9" height="16" rx="1.5" fill="currentColor" />
      <rect x="19.5" y="16" width="9" height="26" rx="1.5" fill="currentColor" />
      <rect x="34" y="6" width="9" height="36" rx="1.5" fill="currentColor" />
    </svg>
  ),
  custom: (
    <svg viewBox="0 0 48 48" aria-hidden="true" className="h-11 w-11 sm:h-12 sm:w-12">
      <g stroke="currentColor" strokeWidth="4" strokeLinecap="round">
        <path d="M6 12h36M6 24h36M6 36h36" />
      </g>
      <g fill="currentColor" stroke="#F6F4EF" strokeWidth="3">
        <circle cx="16" cy="12" r="5" />
        <circle cx="32" cy="24" r="5" />
        <circle cx="20" cy="36" r="5" />
      </g>
    </svg>
  ),
  growth: (
    <svg viewBox="0 0 48 48" aria-hidden="true" className="h-11 w-11 sm:h-12 sm:w-12">
      <path d="M5 40h38" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path d="M7 30 18 19l8 8 13-14" fill="none" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M30 11h11v11z" fill="currentColor" />
    </svg>
  ),
  moon: (
    <svg viewBox="0 0 48 48" aria-hidden="true" className="h-11 w-11 sm:h-12 sm:w-12">
      <path d="M41 26.5A18 18 0 1 1 21.5 7 14 14 0 0 0 41 26.5z" fill="currentColor" />
    </svg>
  ),
}

// Content comes from the Corporate factsheet ("Why owners choose us")
const features = [
  { icon: 'globe', title: 'Global and local expertise', text: "International standards applied with a real understanding of Nepal's market." },
  { icon: 'chart', title: 'Data-driven decisions', text: 'Every operating change backed by metrics.' },
  { icon: 'custom', title: 'Customised solutions', text: 'Strategies built for your asset, not one-size-fits-all playbooks.' },
  { icon: 'growth', title: 'A focus on return', text: 'Protecting your capital and growing your profit.' },
  { icon: 'moon', title: 'Long-term commitment', text: 'A partner through every season and market cycle.' },
]

export default function WhyMoonlit() {
  return (
    <section aria-labelledby="why-title" className="bg-[#F6F4EF] py-14 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-4">
        {/* heading */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 id="why-title" className="text-[28px] font-bold leading-tight text-[#0B1B33] sm:text-[36px] lg:text-[44px]">
            Why Owners Choose Moonlit
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[#5F6B7A] sm:text-base lg:text-[17px]">
            For owners who expect their asset to be protected, not merely managed. One accountable team, from first
            sketch to sustained performance.
          </p>
        </div>

        {/* features */}
        <ul className="mt-12 flex flex-wrap justify-center gap-y-12 sm:mt-16 lg:mt-20">
          {features.map((f) => (
            <li key={f.title} className="w-full px-4 text-center sm:w-1/2 lg:w-1/3 lg:px-6">
              <div className="mx-auto flex h-12 items-center justify-center text-[#C6A560]">{icons[f.icon]}</div>
              <h3 className="mt-5 text-[22px] font-bold leading-snug text-[#0B1B33] sm:text-[24px]">{f.title}</h3>
              <div aria-hidden="true" className="mx-auto my-4 h-px w-24 bg-[#5F6B7A]/35" />
              <p className="mx-auto max-w-xs text-[15px] leading-relaxed text-[#5F6B7A] sm:text-base">{f.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}