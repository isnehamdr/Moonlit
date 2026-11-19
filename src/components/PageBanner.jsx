import { useState } from 'react'

const NavLink = ({ href, children, ...props }) => (
  <a href={href} {...props}>{children}</a>
)

export default function PageBanner({ crumbs = [], title, text, image }) {
  const [failed, setFailed] = useState(false)

  return (
    <section aria-labelledby="page-title" className="relative isolate overflow-hidden bg-[#0B1B33] text-[#F6F4EF]">
      {/* background: photo or gradient */}
      {image && !failed ? (
        <>
          <img src={image}  alt="" loading="eager" decoding="async" onError={() => setFailed(true)} className="absolute inset-0 -z-10 h-full w-full object-cover" />
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
        {/* breadcrumb */}
        {crumbs.length > 0 && (
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-[#F6F4EF]/75 sm:text-[14px]">
              {crumbs.map((c, i) => (
                <li key={c.name} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden="true" className="text-[#C6A560]">/</span>}
                  {c.href
                    ? <NavLink href={c.href} className="underline-offset-4 hover:text-[#C6A560] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A560]">{c.name}</NavLink>
                    : <span aria-current="page" className="text-[#F6F4EF]">{c.name}</span>}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <h1 id="page-title" className="mt-4 text-[34px] font-bold leading-tight sm:text-[44px] lg:text-[56px]">{title}</h1>
        <div aria-hidden="true" className="mt-4 h-0.5 w-14 bg-[#C6A560]" />
        {text && <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-[#F6F4EF]/85 sm:text-[18px]">{text}</p>}
      </div>
    </section>
  )
}