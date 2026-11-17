import { useState } from 'react'


const NavLink = ({ href, children, ...props }) => (
  <a href={href} {...props}>{children}</a>
)

const brands = [
  { name: 'Moonlit Grand', color: '#6B1E2E', href: '/brands/grand', logo: '/images/MoonlitGrand.svg' },
  { name: 'Moonlit Sanctuary', color: '#2F5D50', href: '/brands/sanctuary', logo: '/images/MoonlitSanctuary.svg' },
  { name: 'Moonlit Select', color: '#2A6496', href: '/brands/select', logo: '/images/MoonlitSelect.svg' },
  { name: 'Moonlit Inn', color: '#B5541C', href: '/brands/inn', logo: '/images/MoonlitInn.svg' },
  { name: 'Moonlit Hearth', color: '#7B3F26', href: '/brands/hearth', logo: '/images/MoonlitHearth.svg' },
]

function Logo({ b }) {
  const [failed, setFailed] = useState(false)
  if (!failed) {
    return (
      <img src={b.logo} alt="" width="240" height="120" loading="eager" decoding="async"
        onError={() => { console.warn(`Logo not found: ${b.logo}. Check that the file is in public/images/`); setFailed(true) }}
        className="block aspect-[2/1] h-auto w-full max-w-[240px] object-contain transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none" />
    )
  }
  // fallback: brand name in its own colour
  return (
    <span aria-hidden="true" className="flex aspect-[2/1] w-full max-w-[240px] items-center justify-center text-center font-serif text-2xl" style={{ color: b.color }}>
      {b.name}
    </span>
  )
}

export default function BrandLogos() {
  return (
    <section aria-labelledby="logos-title" className="bg-[#F6F4EF] pt-12 sm:pt-16 lg:pt-20 lg:pb-2">
      <div className="px-4 sm:px-6 lg:px-12">
        {/* heading */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 id="logos-title" className="text-[26px] font-bold leading-tight text-[#0B1B33] sm:text-[32px] lg:text-[36px]">
            Five Brands, One Family
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[#5F6B7A] sm:text-base lg:text-[17px]">
            Every Moonlit brand carries the same promise, global standards and local soul, and the same MHR mark.
            Each has its own character and its own guest. Plus, one Moonlit Circle account works across all five brands.
          </p>
          <NavLink href="/moonlit-circle"
            className="mt-4 inline-block text-[16px] text-[#152A4D] underline-offset-4 hover:text-[#A8842F] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B1B33]">
            Explore Moonlit Circle
          </NavLink>
        </div>

        {/* logos: 2 per row on phones, 3 on tablets, 5 on desktop (last row centred) */}
        <ul className="mt-10 flex flex-wrap justify-center gap-y-10 sm:mt-14 lg:mt-20">
          {brands.map((b) => (
            <li key={b.name} className="flex w-1/2 justify-center px-2 sm:w-1/3 sm:px-4 lg:w-1/5">
              <NavLink href={b.href}
                className="group flex w-full flex-col items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B1B33] focus-visible:ring-offset-4 focus-visible:ring-offset-[#F6F4EF]">
                <Logo b={b} />
                <span className="mt-4 text-center text-[15px] text-[#152A4D] underline-offset-4 group-hover:text-[#A8842F] group-hover:underline sm:text-[16px]">
                  {b.name}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* "See All Brands" bar with a notch, full width */}
      <div className="relative mt-12 border-t border-[#5F6B7A]/30 sm:mt-16">
        <span aria-hidden="true" className="absolute -top-[9px] left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-l border-t border-[#5F6B7A]/30 bg-[#F6F4EF]" />
        <NavLink href="/brands"
          className="mx-auto block w-fit px-6 py-5 text-[16px] font-medium text-[#152A4D] underline-offset-4 hover:text-[#A8842F] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B1B33]">
          Explore All Brands
        </NavLink>
      </div>
    </section>
  )
}