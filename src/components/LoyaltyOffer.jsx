// import { useState } from 'react'

// const NavLink = ({ href, children, ...props }) => (
//   <a href={href} {...props}>{children}</a>
// )

// const IMAGE = '/images/FamilyBoard.png' // optional: a photo of a Moonlit franchise hotel, or leave blank to show the brand tiles

// const tiles = [
//   { name: 'Grand', color: '#6B1E2E' },
//   { name: 'Sanctuary', color: '#2F5D50' },
//   { name: 'Select', color: '#2A6496' },
//   { name: 'Inn', color: '#B5541C' },
//   { name: 'Hearth', color: '#7B3F26' },
// ]

// /* Default visual: the five brands as tiles, like the client's "Five brands, one family" slide */
// function BrandTiles() {
//   return (
//     <div className="relative flex h-full w-full items-center justify-center overflow-hidden p-6 sm:p-8"
//       style={{ background: 'radial-gradient(70% 80% at 50% 40%, #152A4D 0%, #0B1B33 100%)' }}>
//       {/* faint orbit rings, echoing the Moonlit Circle logo */}
//       <svg viewBox="0 0 400 400" aria-hidden="true" className="absolute left-1/2 top-1/2 h-[120%] w-auto -translate-x-1/2 -translate-y-1/2 opacity-25">
//         <circle cx="200" cy="200" r="190" fill="none" stroke="#C6A560" strokeWidth="1.2" />
//         <circle cx="200" cy="200" r="140" fill="none" stroke="#C6A560" strokeWidth="1" />
//       </svg>

//       <ul aria-label="Five brands you can franchise" className="relative grid w-full max-w-[420px] grid-cols-6 gap-3 sm:gap-4">
//         {tiles.map((t, i) => (
//           <li key={t.name}
//             className={`col-span-2 ${i === 3 ? 'col-start-2' : ''}`}>
//             <div className="flex aspect-square flex-col items-center justify-center rounded-xl shadow-[0_8px_20px_rgba(0,0,0,.35)] sm:rounded-2xl"
//               style={{ backgroundColor: t.color }}>
//               <span className="font-serif text-[clamp(1rem,4vw,1.5rem)] leading-none text-[#C6A560]">MHR</span>
//               <span className="mt-2 text-[clamp(.6rem,2vw,.8rem)] leading-none text-[#F6F4EF]">{t.name}</span>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   )
// }

// export default function FranchiseOffer() {
//   const [failed, setFailed] = useState(false)

//   return (
//     <section aria-labelledby="franchise-title" className="bg-[#F6F4EF] py-12 sm:py-16 lg:py-20">
//       <div className="mx-auto grid max-w-7xl items-center gap-8 px-8 sm:px-6 md:grid-cols-2 lg:gap-14 lg:px-6">
//         {/* visual */}
//         <div className="aspect-[4/3] w-full overflow-hidden border-2 border-[#C6A560] ">
//           {IMAGE && !failed
//             ? <img src={IMAGE} alt="A Moonlit franchise hotel" loading="lazy" decoding="async" onError={() => setFailed(true)} className="h-full w-full object-contain" />
//             : <BrandTiles />}
//         </div>

//         {/* text */}
//         <div>
//           <p className="text-[18px] font-semibold leading-snug text-[#0B1B33] sm:text-[20px]">For hotel owners:</p>
//           <h2 id="franchise-title" className="mt-1 text-[26px] font-bold leading-tight text-[#0B1B33] sm:text-[30px] lg:text-[34px]">
//             Bring a Moonlit brand to your hotel
//           </h2>
//           <p className="mt-4 text-[15px] leading-relaxed text-[#5F6B7A] sm:text-base">
//             Operate your hotel or resort under a Moonlit brand. MHR provides the brand identity, standards, written SOPs,
//             Moonlit Academy training, distribution and quality audits. Moonlit Select, Inn and Hearth come first, with
//             Moonlit Grand and Sanctuary by approval. Fees are set out in writing in your proposal.{' '}
//             <NavLink href="/services/franchise"
//               className="text-[#152A4D] underline underline-offset-2 hover:text-[#A8842F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B1B33]">
//               See how it works
//             </NavLink>
//           </p>
//           <NavLink href="/contact?type=franchise"
//             className="mt-7 block border-2 border-[#A8842F] px-6 py-3.5 text-center text-[14px] font-bold uppercase tracking-wide text-[#0B1B33] transition-colors hover:bg-[#C6A560] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B1B33] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F6F4EF] sm:inline-block sm:text-left">
//             Start a franchise conversation
//           </NavLink>
//         </div>
//       </div>
//     </section>
//   )
// }

import { useState } from 'react'

/*
  LOYALTY OFFER (replaces the franchise offer)
  Split layout: the Moonlit Circle emblem on the left; label, headline, text, three steps and a button on the right.
  On phones the emblem sits above the text.
  Content comes from the Moonlit Circle factsheet.

  Background: Royal Navy, so it stands apart from the light brands section above it and the light tiers
  section below it.

  The picture sets the size of the frame: the frame hugs the image, so there is no empty space inside it.
  The gold frame is a ring drawn outside the image, so it takes no extra space. If IMAGE is empty or
  the file is missing, the emblem drawn in code is shown instead (in a 4:3 frame).

  Client colours, written as hex codes:
    Midnight Navy #0B1B33 · Royal Navy #152A4D · Moonlit Gold #C6A560
    Burnished Gold #A8842F · Himalayan White #F6F4EF

  Swap this one line if the project uses Inertia:
  import { Link as NavLink } from '@inertiajs/react'
*/
const NavLink = ({ href, children, ...props }) => (
  <a href={href} {...props}>{children}</a>
)

const IMAGE = '/images/loyaltyprogram.jpeg' // picture of the Moonlit Circle logo (leave '' to draw the emblem in code)

const steps = [
  { title: 'Join free', text: 'Online, at any Moonlit hotel or at check-in.' },
  { title: 'Stay and earn', text: 'One account across Grand, Sanctuary, Select, Inn and Hearth.' },
  { title: 'Rise through the moon phases', text: 'From Crescent to Supermoon.' },
]

/* The Moonlit Circle emblem: a navy disc with a gold rim and the moon phases around a star */
function Emblem() {
  const gold = '#C6A560'
  return (
    <div className="flex h-full w-full items-center justify-center p-4 sm:p-6"
      style={{ background: 'radial-gradient(70% 80% at 50% 40%, #152A4D 0%, #0B1B33 100%)' }}>
      <svg viewBox="0 0 400 300" role="img" aria-label="Moonlit Circle emblem: moon phases around a star" className="h-full w-full">
        {/* disc and rings */}
        <circle cx="200" cy="150" r="132" fill="#0B1B33" stroke={gold} strokeWidth="4" />
        <circle cx="200" cy="150" r="116" fill="none" stroke={gold} strokeOpacity=".3" strokeWidth="1.2" />
        <circle cx="200" cy="150" r="84" fill="none" stroke={gold} strokeOpacity=".3" strokeWidth="1.2" />

        {/* crescent, top */}
        <circle cx="200" cy="66" r="17" fill={gold} />
        <circle cx="207" cy="62" r="15" fill="#0B1B33" />

        {/* full moon with rings, left */}
        <circle cx="116" cy="150" r="30" fill="none" stroke={gold} strokeOpacity=".35" strokeWidth="1.2" />
        <circle cx="116" cy="150" r="19" fill={gold} />

        {/* half moon, right */}
        <circle cx="284" cy="150" r="17" fill="none" stroke={gold} strokeOpacity=".5" strokeWidth="1.2" />
        <path d="M284 133a17 17 0 0 1 0 34z" fill={gold} />

        {/* full moon, bottom */}
        <circle cx="200" cy="234" r="19" fill={gold} />

        {/* four-point star, centre */}
        <path d="M200 118C204 136 208 145 228 150 208 155 204 164 200 182 196 164 192 155 172 150 192 145 196 136 200 118Z" fill={gold} />
      </svg>
    </div>
  )
}

export default function LoyaltyOffer() {
  const [failed, setFailed] = useState(false)
  const showImage = IMAGE && !failed

  return (
    <section aria-labelledby="loyalty-title" className="bg-[#152A4D] py-12 sm:py-16 lg:py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-8 sm:px-6 md:grid-cols-2 lg:gap-14 lg:px-6">
        {/* visual */}
        <div className={`w-full overflow-hidden ring-2 ring-[#C6A560] ${showImage ? '' : 'aspect-[4/3]'}`}>
          {showImage
            ? <img src={IMAGE} alt="Moonlit Circle loyalty program" width="1600" height="800" loading="lazy" decoding="async" onError={() => setFailed(true)} className="block h-auto w-full" />
            : <Emblem />}
        </div>

        {/* text */}
        <div>
          <p className="text-[18px] font-semibold leading-snug text-[#C6A560] sm:text-[20px]">Welcome to the Circle:</p>
          <h2 id="loyalty-title" className="mt-1 text-[26px] font-bold leading-tight text-[#F6F4EF] sm:text-[30px] lg:text-[34px]">
            One loyalty program for every Moonlit hotel
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[#F6F4EF]/80 sm:text-base">
            Moonlit Circle is the loyalty program of Moonlit Hotels &amp; Resorts. Your light is on wherever you stay.
            Your data stays private, and we ask for marketing consent separately.{' '}
            <NavLink href="/moonlit-circle#how-it-works"
              className="text-[#C6A560] underline underline-offset-2 hover:text-[#F6F4EF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A560]">
              See how it works
            </NavLink>
          </p>

          {/* how it works, from the factsheet */}
          <ol className="mt-6 space-y-4">
            {steps.map((s, i) => (
              <li key={s.title} className="flex items-start gap-4">
                <span aria-hidden="true" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-[#C6A560] text-[14px] font-bold text-[#C6A560]">
                  {i + 1}
                </span>
                <p className="text-[15px] leading-snug text-[#F6F4EF]/80 sm:text-base">
                  <span className="font-semibold text-[#F6F4EF]">{s.title}.</span> {s.text}
                </p>
              </li>
            ))}
          </ol>

          <NavLink href="/moonlit-circle#join"
            className="mt-8 block bg-[#C6A560] px-6 py-3.5 text-center text-[14px] font-bold uppercase tracking-wide text-[#0B1B33] transition-colors hover:bg-[#A8842F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6F4EF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#152A4D] sm:inline-block sm:px-10 sm:text-left">
            Join Moonlit Circle
          </NavLink>
        </div>
      </div>
    </section>
  )
}