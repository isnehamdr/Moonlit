// import { useEffect, useRef, useState } from 'react'

// const NavLink = ({ href, children, ...props }) => (
//   <a href={href} {...props}>{children}</a>
// )

// // Content comes from the Brand family factsheet. These are brand concepts, not confirmed hotels.
// const brands = [
//   {
//     name: 'Moonlit Grand', tagline: "The city's address",
//     text: 'A luxury city hotel for corporate guests, diplomats, weddings and conferences, in Kathmandu, Pokhara and Lalitpur.',
//     size: '120 to 300 rooms', color: '#6B1E2E', href: '/brands/grand',
//     image: '/images/MoonlitGrand.png', alt: 'A luxury city hotel',
//   },
//   {
//     name: 'Moonlit Sanctuary', tagline: 'Restore in the mountains',
//     text: 'A luxury resort and wellness retreat by the lakeside, in the hills or in the jungle, for couples and international guests.',
//     size: '30 to 120 rooms', color: '#2F5D50', href: '/brands/sanctuary',
//     image: '/images/MoonlitSanctuary.png', alt: 'A mountain wellness resort',
//   },
//   {
//     name: 'Moonlit Select', tagline: 'Smart, comfortable, dependable',
//     text: 'An upscale business hotel for business travellers, government and NGOs, in the secondary cities of Nepal.',
//     size: '60 to 150 rooms', color: '#2A6496', href: '/brands/select',
//     image: '/images/MoonlitSelect.png', alt: 'An upscale business hotel',
//   },
//   {
//     name: 'Moonlit Inn', tagline: 'Good rest on every road',
//     text: 'Midscale limited service for road travellers, families and trekkers, along highways, trailheads and transit towns.',
//     size: '30 to 80 rooms', color: '#B5541C', href: '/brands/inn',
//     image: '/images/MoonlitInn.png', alt: 'A roadside inn',
//   },
//   {
//     name: 'Moonlit Hearth', tagline: 'Stay inside the story',
//     text: 'Boutique heritage stays for culture seekers and independent travellers, in old towns and villages.',
//     size: '8 to 30 rooms', color: '#7B3F26', href: '/brands/hearth',
//     image: '/images/MoonlitHearth.png', alt: 'A heritage boutique stay',
//   },
// ]

// /* Photo with a brand-coloured fallback */
// function BrandImage({ b }) {
//   const [failed, setFailed] = useState(false)
//   if (b.image && !failed) {
//     return <img src={b.image} alt={b.alt} loading="lazy" decoding="async" onError={() => setFailed(true)} className="h-full w-full object-contain" />
//   }
//   return (
//     <div role="img" aria-label={`${b.name} image placeholder`} className="relative h-full w-full overflow-hidden "
//       style={{ background: `linear-gradient(135deg, ${b.color} 0%, #0B1B33 130%)` }}>
//       <svg viewBox="0 0 400 400" aria-hidden="true" className="absolute -right-8 top-1/2 h-[130%] w-auto -translate-y-1/2 opacity-30">
//         <circle cx="200" cy="200" r="190" fill="none" stroke="#C6A560" strokeWidth="1.5" />
//         <circle cx="200" cy="200" r="120" fill="none" stroke="#C6A560" strokeWidth="1" />
//         <circle cx="200" cy="200" r="64" fill="#C6A560" fillOpacity=".55" />
//         <circle cx="226" cy="186" r="60" fill={b.color} />
//       </svg>
//       <span className="absolute inset-0 flex items-center justify-center font-serif text-2xl text-[#C6A560] sm:text-3xl">MHR</span>
//     </div>
//   )
// }

// // how many cards are visible: 1 on phones, 2 on tablets, 3 on laptops and larger
// function usePerView() {
//   const get = () => (window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1)
//   const [v, setV] = useState(3)
//   useEffect(() => {
//     const on = () => setV(get())
//     on()
//     window.addEventListener('resize', on)
//     return () => window.removeEventListener('resize', on)
//   }, [])
//   return v
// }

// export default function BrandCollections() {
//   const perView = usePerView()
//   const n = brands.length
//   const max = Math.max(0, n - perView)       // last start position
//   const [index, setIndex] = useState(0)
//   const touchX = useRef(null)

//   useEffect(() => { setIndex((i) => Math.min(i, max)) }, [max])

//   const go = (i) => setIndex(Math.min(Math.max(i, 0), max))
//   const arrow = 'absolute top-[30%] z-10 flex h-11 w-9 items-center justify-center text-[#0B1B33] transition-colors hover:text-[#A8842F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B1B33] disabled:opacity-25 disabled:hover:text-[#0B1B33] sm:w-10'

//   return (
//     <section aria-labelledby="brands-title" className="bg-[#F6F4EF] py-12 sm:py-16 lg:py-20">
//       <div className="px-4 sm:px-6 lg:px-12">
//         <h2 id="brands-title" className="text-center text-[26px] font-bold leading-tight text-[#0B1B33] sm:text-4xl">
//           Explore Our Brands
//         </h2>

//         <div role="region" aria-roledescription="carousel" aria-label="Moonlit brands" className="relative mt-8 sm:mt-12"
//           onKeyDown={(e) => { if (e.key === 'ArrowLeft') go(index - 1); if (e.key === 'ArrowRight') go(index + 1) }}
//           onTouchStart={(e) => { touchX.current = e.touches[0].clientX }}
//           onTouchEnd={(e) => {
//             if (touchX.current == null) return
//             const dx = e.changedTouches[0].clientX - touchX.current
//             touchX.current = null
//             if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1))
//           }}>

//           <button type="button" aria-label="Previous brands" disabled={index === 0} onClick={() => go(index - 1)} className={`${arrow} left-0`}>
//             <svg viewBox="0 0 8 12" aria-hidden="true" className="h-3 w-2"><path d="M7 1 1.5 6 7 11z" fill="black" /></svg>
//           </button>
//           <button type="button" aria-label="Next brands" disabled={index >= max} onClick={() => go(index + 1)} className={`${arrow} right-0`}>
//             <svg viewBox="0 0 8 12" aria-hidden="true" className="h-3 w-2"><path d="M1 1l5.5 5L1 11z" fill="black" /></svg>
//           </button>

//           {/* window */}
//           <div className="mx-9 overflow-hidden sm:mx-11">
//             <ul className="flex transition-transform duration-500 ease-out motion-reduce:transition-none"
//               style={{ transform: `translateX(-${index * (100 / perView)}%)` }}>
//               {brands.map((b, idx) => {
//                 const visible = idx >= index && idx < index + perView
//                 return (
//                   <li key={b.name} role="group" aria-roledescription="slide" aria-label={`${idx + 1} of ${n}`}
//                     aria-hidden={!visible} {...(visible ? {} : { inert: '' })}
//                     className="flex shrink-0 grow-0 px-2 sm:px-3" style={{ flexBasis: `${100 / perView}%` }}>
//                     <article className="flex w-full flex-col border border-[#5F6B7A]/30  bg-white" >
//                       <div className="aspect-[4/3] w-full overflow-hidden bg-black ">
//   <BrandImage b={b} />
// </div>
//                       <div className="flex flex-1 flex-col px-5 pb-6 pt-6 sm:px-6">
//                         <h3 className="text-[16px] font-bold uppercase leading-snug tracking-wide text-[#0B1B33] sm:text-[22px]">{b.name}</h3>
//                         <p className="mt-1 text-[14px] font-semibold text-[#A8842F]">{b.tagline}</p>
//                         <p className="mt-4 text-[16px] leading-[1.5] text-[#5F6B7A]">{b.text}</p>
//                         <p className="mt-3 flex items-center gap-2 text-[13px] text-[#5F6B7A]">
//                           <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 shrink-0 text-[#C6A560]">
//                             <path d="M12 2c.6 4.6 2.4 8.4 10 10-7.6 1.6-9.4 5.4-10 10-.6-4.6-2.4-8.4-10-10 7.6-1.6 9.4-5.4 10-10Z" fill="currentColor" />
//                           </svg>
//                           Concept size: {b.size}
//                         </p>
//                         <NavLink href={b.href}
//                           className="mt-6 block border-2 border-[#A8842F] px-4 py-3 text-center text-[16px] font-bold uppercase leading-snug tracking-wide text-[#0B1B33] transition-colors hover:bg-[#C6A560] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B1B33] focus-visible:ring-offset-2">
//                           Explore {b.name}
//                         </NavLink>
//                       </div>
//                     </article>
//                   </li>
//                 )
//               })}
//             </ul>
//           </div>
//         </div>

//         {/* dots */}
//         <div className="mt-6 flex items-center justify-center" role="group" aria-label="Choose position">
//           {Array.from({ length: max + 1 }).map((_, i) => (
//             <button key={i} type="button" aria-label={`Show brands from ${i + 1}`} aria-current={i === index} onClick={() => go(i)}
//               className="group p-2 focus-visible:outline-none">
//               <span className={`block h-2 w-2 rounded-full transition-colors group-focus-visible:ring-2 group-focus-visible:ring-[#0B1B33] group-focus-visible:ring-offset-2 ${i === index ? 'bg-[#0B1B33]' : 'bg-[#5F6B7A]/50 group-hover:bg-[#5F6B7A]'}`} />
//             </button>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }


import { useEffect, useRef, useState } from 'react'

const NavLink = ({ href, children, ...props }) => (
  <a href={href} {...props}>{children}</a>
)

// Content comes from the Brand family factsheet. These are brand concepts, not confirmed hotels.
const brands = [
  {
    name: 'Moonlit Grand', tagline: "The city's address",
    text: 'A luxury city hotel for corporate guests, diplomats, weddings and conferences, in Kathmandu, Pokhara and Lalitpur.',
    size: '120 to 300 rooms', color: '#6B1E2E', href: '/brands/grand',
    image: '/images/MoonlitGrand.png', alt: 'A luxury city hotel',
  },
  {
    name: 'Moonlit Sanctuary', tagline: 'Restore in the mountains',
    text: 'A luxury resort and wellness retreat by the lakeside, in the hills or in the jungle, for couples and international guests.',
    size: '30 to 120 rooms', color: '#2F5D50', href: '/brands/sanctuary',
    image: '/images/MoonlitSanctuary.png', alt: 'A mountain wellness resort',
  },
  {
    name: 'Moonlit Select', tagline: 'Smart, comfortable, dependable',
    text: 'An upscale business hotel for business travellers, government and NGOs, in the secondary cities of Nepal.',
    size: '60 to 150 rooms', color: '#2A6496', href: '/brands/select',
    image: '/images/MoonlitSelect.png', alt: 'An upscale business hotel',
  },
  {
    name: 'Moonlit Inn', tagline: 'Good rest on every road',
    text: 'Midscale limited service for road travellers, families and trekkers, along highways, trailheads and transit towns.',
    size: '30 to 80 rooms', color: '#B5541C', href: '/brands/inn',
    image: '/images/MoonlitInn.png', alt: 'A roadside inn',
  },
  {
    name: 'Moonlit Hearth', tagline: 'Stay inside the story',
    text: 'Boutique heritage stays for culture seekers and independent travellers, in old towns and villages.',
    size: '8 to 30 rooms', color: '#7B3F26', href: '/brands/hearth',
    image: '/images/MoonlitHearth.png', alt: 'A heritage boutique stay',
  },
]

/* Photo with a brand-coloured fallback */
function BrandImage({ b }) {
  const [failed, setFailed] = useState(false)
  if (b.image && !failed) {
    return <img src={b.image} alt={b.alt} loading="lazy" decoding="async" onError={() => setFailed(true)} className="h-full w-full object-contain" />
  }
  return (
    <div role="img" aria-label={`${b.name} image placeholder`} className="relative h-full w-full overflow-hidden "
      style={{ background: `linear-gradient(135deg, ${b.color} 0%, #0B1B33 130%)` }}>
      <svg viewBox="0 0 400 400" aria-hidden="true" className="absolute -right-8 top-1/2 h-[130%] w-auto -translate-y-1/2 opacity-30">
        <circle cx="200" cy="200" r="190" fill="none" stroke="#C6A560" strokeWidth="1.5" />
        <circle cx="200" cy="200" r="120" fill="none" stroke="#C6A560" strokeWidth="1" />
        <circle cx="200" cy="200" r="64" fill="#C6A560" fillOpacity=".55" />
        <circle cx="226" cy="186" r="60" fill={b.color} />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center font-serif text-2xl text-[#C6A560] sm:text-3xl">MHR</span>
    </div>
  )
}

// how many cards are visible: 1 on phones, 2 on tablets, 3 on laptops and larger
const getPerView = () => {
  if (typeof window === 'undefined') return 3
  return window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1
}

function usePerView() {
  // start with the real value so phones don't flash the 3-card layout
  const [v, setV] = useState(getPerView)
  useEffect(() => {
    const on = () => setV(getPerView())
    on()
    window.addEventListener('resize', on)
    window.addEventListener('orientationchange', on)
    return () => {
      window.removeEventListener('resize', on)
      window.removeEventListener('orientationchange', on)
    }
  }, [])
  return v
}

export default function BrandCollections() {
  const perView = usePerView()
  const n = brands.length
  const max = Math.max(0, n - perView)       // last start position
  const [index, setIndex] = useState(0)
  const touchX = useRef(null)
  const touchY = useRef(null)

  useEffect(() => { setIndex((i) => Math.min(i, max)) }, [max])

  const go = (i) => setIndex(Math.min(Math.max(i, 0), max))

  // side arrows: sm and up only (unchanged); on phones they move below the cards
  const arrow = 'absolute top-[30%] z-10 hidden h-11 w-9 items-center justify-center text-[#0B1B33] transition-colors hover:text-[#A8842F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B1B33] disabled:opacity-25 disabled:hover:text-[#0B1B33] sm:flex sm:w-10'
  const mobArrow = 'flex h-11 w-11 shrink-0 items-center justify-center text-[#0B1B33] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B1B33] disabled:opacity-25 sm:hidden'

  return (
    <section aria-labelledby="brands-title" className="bg-[#F6F4EF] py-12 sm:py-16 lg:py-20">
      <div className="px-4 sm:px-6 lg:px-12">
        <h2 id="brands-title" className="text-center text-[26px] font-bold leading-tight text-[#0B1B33] sm:text-4xl">
          Explore Our Brands
        </h2>

        <div role="region" aria-roledescription="carousel" aria-label="Moonlit brands" className="relative mt-8 sm:mt-12"
          onKeyDown={(e) => { if (e.key === 'ArrowLeft') go(index - 1); if (e.key === 'ArrowRight') go(index + 1) }}
          onTouchStart={(e) => { touchX.current = e.touches[0].clientX; touchY.current = e.touches[0].clientY }}
          onTouchEnd={(e) => {
            if (touchX.current == null) return
            const dx = e.changedTouches[0].clientX - touchX.current
            const dy = e.changedTouches[0].clientY - (touchY.current ?? 0)
            touchX.current = null
            touchY.current = null
            // ignore vertical scrolls
            if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) go(index + (dx < 0 ? 1 : -1))
          }}>

          <button type="button" aria-label="Previous brands" disabled={index === 0} onClick={() => go(index - 1)} className={`${arrow} left-0`}>
            <svg viewBox="0 0 8 12" aria-hidden="true" className="h-3 w-2"><path d="M7 1 1.5 6 7 11z" fill="black" /></svg>
          </button>
          <button type="button" aria-label="Next brands" disabled={index >= max} onClick={() => go(index + 1)} className={`${arrow} right-0`}>
            <svg viewBox="0 0 8 12" aria-hidden="true" className="h-3 w-2"><path d="M1 1l5.5 5L1 11z" fill="black" /></svg>
          </button>

          {/* window: full width on phones, original margins from sm up */}
          <div className="mx-0 touch-pan-y overflow-hidden sm:mx-11">
            <ul className="flex transition-transform duration-500 ease-out motion-reduce:transition-none"
              style={{ transform: `translateX(-${index * (100 / perView)}%)` }}>
              {brands.map((b, idx) => {
                const visible = idx >= index && idx < index + perView
                return (
                  <li key={b.name} role="group" aria-roledescription="slide" aria-label={`${idx + 1} of ${n}`}
                    aria-hidden={!visible} {...(visible ? {} : { inert: '' })}
                    className="flex min-w-0 shrink-0 grow-0 px-1 min-[400px]:px-2 sm:px-3" style={{ flexBasis: `${100 / perView}%` }}>
                    <article className="flex w-full min-w-0 flex-col border border-[#5F6B7A]/30  bg-white" >
                      <div className="aspect-[4/3] w-full overflow-hidden bg-black ">
                        <BrandImage b={b} />
                      </div>
                      <div className="flex flex-1 flex-col px-4 pb-5 pt-5 min-[400px]:px-5 min-[400px]:pb-6 min-[400px]:pt-6 sm:px-6">
                        <h3 className="break-words text-[16px] font-bold uppercase leading-snug tracking-wide text-[#0B1B33] sm:text-[22px]">{b.name}</h3>
                        <p className="mt-1 text-[14px] font-semibold text-[#A8842F]">{b.tagline}</p>
                        <p className="mt-4 text-[15px] leading-[1.5] text-[#5F6B7A] min-[400px]:text-[16px]">{b.text}</p>
                        <p className="mt-3 flex items-center gap-2 text-[13px] text-[#5F6B7A]">
                          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 shrink-0 text-[#C6A560]">
                            <path d="M12 2c.6 4.6 2.4 8.4 10 10-7.6 1.6-9.4 5.4-10 10-.6-4.6-2.4-8.4-10-10 7.6-1.6 9.4-5.4 10-10Z" fill="currentColor" />
                          </svg>
                          Concept size: {b.size}
                        </p>
                        <NavLink href={b.href}
                          className="mt-auto block border-2 border-[#A8842F] px-3 py-3 text-center text-[14px] font-bold uppercase leading-snug tracking-wide text-[#0B1B33] transition-colors hover:bg-[#C6A560] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B1B33] focus-visible:ring-offset-2 min-[400px]:px-4 min-[400px]:text-[16px] [&]:mt-6">
                          Explore {b.name}
                        </NavLink>
                      </div>
                    </article>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        {/* arrows (phones only) + dots */}
        <div className="mt-6 flex items-center justify-center" role="group" aria-label="Choose position">
          <button type="button" aria-label="Previous brands" disabled={index === 0} onClick={() => go(index - 1)} className={mobArrow}>
            <svg viewBox="0 0 8 12" aria-hidden="true" className="h-3 w-2"><path d="M7 1 1.5 6 7 11z" fill="black" /></svg>
          </button>
          {Array.from({ length: max + 1 }).map((_, i) => (
            <button key={i} type="button" aria-label={`Show brands from ${i + 1}`} aria-current={i === index} onClick={() => go(i)}
              className="group p-2.5 focus-visible:outline-none sm:p-2">
              <span className={`block h-2 w-2 rounded-full transition-colors group-focus-visible:ring-2 group-focus-visible:ring-[#0B1B33] group-focus-visible:ring-offset-2 ${i === index ? 'bg-[#0B1B33]' : 'bg-[#5F6B7A]/50 group-hover:bg-[#5F6B7A]'}`} />
            </button>
          ))}
          <button type="button" aria-label="Next brands" disabled={index >= max} onClick={() => go(index + 1)} className={mobArrow}>
            <svg viewBox="0 0 8 12" aria-hidden="true" className="h-3 w-2"><path d="M1 1l5.5 5L1 11z" fill="black" /></svg>
          </button>
        </div>
      </div>
    </section>
  )
}