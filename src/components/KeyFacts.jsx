/*
  KEY FACTS (compact version)
  A short heading and one line of intro, then the six facts in a slim ruled grid, then the notch bar.
  All numbers come from the Corporate factsheet ("Key facts").

  Grid: 2 columns on phones, 3 on tablets, 6 in one row on laptops and larger.

  Client colours, written as hex codes:
    Midnight Navy #0B1B33 · Moonlit Gold #C6A560 · Burnished Gold #A8842F
    Himalayan White #F6F4EF · Slate Stone #5F6B7A · Royal Navy #152A4D

  Swap this one line if the project uses Inertia:
  import { Link as NavLink } from '@inertiajs/react'
*/
const NavLink = ({ href, children, ...props }) => (
  <a href={href} {...props}>{children}</a>
)

// `detail` shows as a tooltip on hover, so the section stays short
const facts = [
  { value: '50+', label: 'Years of combined leadership', detail: 'Experience behind every property we guide.' },
  { value: '3', label: 'Senior leaders', detail: 'President & CEO, Vice President and Director.' },
  { value: '3', label: 'Lifecycle phases', detail: 'Planning & Development, Pre-Opening & Positioning, Full-Scale Operations.' },
  { value: '4', label: 'Operating disciplines', detail: 'Foundation, People, Finance and Growth.' },
  { value: '5', label: 'Hotel brands', detail: 'Moonlit Grand, Sanctuary, Select, Inn and Hearth.' },
  { value: '4', label: 'Loyalty tiers', detail: 'Crescent, Half Moon, Full Moon and Supermoon.' },
]

export default function KeyFacts() {
  return (
    <section aria-labelledby="facts-title" className="bg-[#F6F4EF] pt-10 pb-4 sm:pt-12 lg:pt-14 lg:pb-6">
      <div className="px-4 sm:px-6 lg:px-12">
        {/* heading */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="facts-title" className="text-[22px] font-bold leading-tight text-[#0B1B33] sm:text-[26px] lg:text-[30px]">
            Key Facts
          </h2>
          <p className="mt-2 text-[14px] leading-relaxed text-[#5F6B7A] sm:text-[15px]">
            A Kathmandu-based hotel management, franchise and consulting company. Global standards, local soul.
          </p>
        </div>

        {/* facts: thin ruled grid (the 1px gaps show the line colour) */}
        <ul className="mx-auto mt-6 grid max-w-6xl grid-cols-2 gap-px border-y border-[#5F6B7A]/25 bg-[#5F6B7A]/25 sm:mt-8 sm:grid-cols-3 lg:grid-cols-6">
          {facts.map((f) => (
            <li key={f.label} title={f.detail} className="flex flex-col items-center bg-[#F6F4EF] px-3 py-5 text-center sm:py-6 lg:px-4 lg:py-7">
              <p className="text-[32px] font-bold leading-none text-[#0B1B33] sm:text-[40px] lg:text-[44px]">{f.value}</p>
              <div aria-hidden="true" className="my-2.5 h-0.5 w-8 bg-[#C6A560]" />
              <p className="max-w-[11rem] text-[13px] font-semibold leading-snug text-[#0B1B33] sm:text-[14px]">{f.label}</p>
              <span className="sr-only">{f.detail}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* bar with a notch, full width */}
      <div className="relative mt-8 border-t border-[#5F6B7A]/30 sm:mt-10">
        <span aria-hidden="true" className="absolute -top-[9px] left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-l border-t border-[#5F6B7A]/30 bg-[#F6F4EF]" />
        <NavLink href="/about"
          className="mx-auto block w-fit px-6 py-4 text-[15px] font-medium text-[#152A4D] underline-offset-4 hover:text-[#A8842F] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B1B33] sm:text-[16px]">
          About Moonlit Hotels &amp; Resorts
        </NavLink>
      </div>
    </section>
  )
}