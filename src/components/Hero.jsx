import { useEffect, useRef, useState } from 'react'


const NavLink = ({ href, children, ...props }) => (
  <a href={href} {...props}>{children}</a>
)

const slides = [
  {
    label: 'Now enquiring:',
    title: 'Hotel management, franchise and consulting',
    text: 'From first sketch to sustained performance, with one accountable team.',
    cta: 'Learn more', href: '/services',
    image: '/images/hero.jpeg', alt: 'Moonlit Hotels & Resorts',
  },
  {
    label: 'Five brands, one family:',
    title: 'Moonlit Grand, Sanctuary, Select, Inn and Hearth',
    text: 'Each brand has its own character and its own guest.',
    cta: 'Explore our brands', href: '/brands',
    image: '/images/hero2.jpg', alt: 'The five Moonlit brands',
  },
  {
    label: 'Coming soon:',
    title: 'Moonlit Circle',
    text: 'One loyalty program for every Moonlit hotel. Your light is on wherever you stay.',
    cta: 'Learn more', href: '/moonlit-circle',
    image: '/images/hero.jpeg', alt: 'Moonlit Circle loyalty program',
  },
]

function SlideImage({ src, alt, eager }) {
  const [failed, setFailed] = useState(false)
  if (!src || failed) {
    return <div aria-hidden="true" className="h-full w-full" style={{ background: 'linear-gradient(135deg, #152A4D 0%, #0B1B33 100%)' }} />
  }
  return (
    <img src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async"
      onError={() => setFailed(true)} className="h-full w-full object-cover object-center" />
  )
}

export default function Hero() {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const touchX = useRef(null)
  const n = slides.length

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setPaused(true); return }
  }, [])
  useEffect(() => {
    if (paused) return
    const t = setInterval(() => setI((v) => (v + 1) % n), 7000)
    return () => clearInterval(t)
  }, [paused, n])

  const prev = () => setI((v) => (v - 1 + n) % n)
  const next = () => setI((v) => (v + 1) % n)
  const s = slides[i]

  const arrow = 'absolute top-1/2 z-10 flex h-14 w-8 -translate-y-1/2 items-center justify-center bg-[#F6F4EF]/85 text-[#0B1B33] transition-colors hover:bg-[#F6F4EF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A560] sm:w-10'

  const Card = () => (
    <div aria-live="polite" className="w-full max-w-[550px] bg-[#F6F4EF] p-6 shadow-[0_10px_36px_rgba(11,27,51,.3)] lg:py-4  lg:px-6" >
      <p className="text-[18px] font-extrabold leading-snug text-[#0B1B33] sm:text-[20px] lg:text-[24px]">{s.label}</p>
      <h2 className="mt-1 text-[22px] font-extrabold italic leading-[1.2] tracking-[-0.02em] text-[#0B1B33] sm:text-[24px] lg:text-[32px]">{s.title}</h2>
      <p className="mt-3 text-[14px] leading-snug text-[#5F6B7A] sm:text-[16px]">{s.text}</p>
      <NavLink href={s.href}
        className="mt-5 inline-block rounded-sm bg-[#C6A560] px-6 py-3 text-[13px] font-bold uppercase tracking-wide text-[#0B1B33] transition-colors hover:bg-[#A8842F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B1B33] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F6F4EF]">
        {s.cta}
      </NavLink>
    </div>
  )

  return (
    <section aria-roledescription="carousel" aria-label="Featured" className="relative bg-[#F6F4EF]"
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}
      onTouchStart={(e) => { touchX.current = e.touches[0].clientX }}
      onTouchEnd={(e) => {
        if (touchX.current == null) return
        const dx = e.changedTouches[0].clientX - touchX.current
        touchX.current = null
        if (Math.abs(dx) > 50) (dx < 0 ? next : prev)()
      }}>
      {/* image area */}
      <div className="relative h-[300px] w-full overflow-hidden bg-[#0B1B33] sm:h-[380px] md:h-[480px] lg:h-[550px]">
        {slides.map((sl, idx) => (
          <div key={sl.title} aria-hidden={idx !== i}
            className={`absolute inset-0 transition-opacity duration-700 motion-reduce:transition-none ${idx === i ? 'opacity-100' : 'opacity-0'}`}>
            <SlideImage src={sl.image} alt={idx === i ? sl.alt : ''} eager={idx === 0} />
          </div>
        ))}

        {/* arrows on the edges */}
        <button type="button" aria-label="Previous slide" onClick={prev} className={`${arrow} left-0`}>
          <svg viewBox="0 0 10 16" aria-hidden="true" className="h-4 w-2.5"><path d="M8.5 1.5 2 8l6.5 6.5" fill="none" stroke="currentColor" strokeWidth="2" /></svg>
        </button>
        <button type="button" aria-label="Next slide" onClick={next} className={`${arrow} right-0`}>
          <svg viewBox="0 0 10 16" aria-hidden="true" className="h-4 w-2.5"><path d="M1.5 1.5 8 8l-6.5 6.5" fill="none" stroke="currentColor" strokeWidth="2" /></svg>
        </button>

        {/* dots */}
        {/* <div className="absolute bottom-14 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full bg-[#0B1B33]/60 px-3 py-2 md:bottom-5">
          {slides.map((sl, idx) => (
            <button key={sl.title} type="button" aria-label={`Go to slide ${idx + 1}`} aria-current={idx === i}
              onClick={() => setI(idx)}
              className={`h-2 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A560] ${idx === i ? 'w-6 bg-[#C6A560]' : 'w-2 bg-[#F6F4EF]/70 hover:bg-[#F6F4EF]'}`} />
          ))}
        </div> */}

        {/* card on the image: tablets and larger */}
        <div className="pointer-events-none absolute inset-0 hidden items-center md:flex">
          <div className="pointer-events-auto mx-auto flex w-full px-14 lg:px-24">
            <Card />
          </div>
        </div>
      </div>

      {/* card under the image: phones */}
      <div className="relative -mt-10 px-4 pb-8 md:hidden">
        <Card />
      </div>
    </section>
  )
}