// import { useState } from 'react'

// const NavLink = ({ href, children, ...props }) => (
//   <a href={href} {...props}>{children}</a>
// )

// export default function PageBanner({ crumbs = [], title, text, image }) {
//   const [failed, setFailed] = useState(false)

//   return (
//     <section aria-labelledby="page-title" className="relative isolate overflow-hidden bg-[#0B1B33] text-[#F6F4EF]">
//       {/* background: photo or gradient */}
//       {image && !failed ? (
//         <>
//           <img src={image}  alt="" loading="eager" decoding="async" onError={() => setFailed(true)} className="absolute inset-0 -z-10 h-full w-full object-cover" />
//           <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0B1B33]/90 via-[#0B1B33]/70 to-[#0B1B33]/30" />
//         </>
//       ) : (
//         <div aria-hidden="true" className="absolute inset-0 -z-10" style={{ background: 'linear-gradient(135deg, #152A4D 0%, #0B1B33 100%)' }}>
//           <svg viewBox="0 0 400 400" className="absolute -right-24 top-1/2 h-[220%] w-auto -translate-y-1/2 opacity-20 sm:-right-10 sm:h-[200%] lg:right-10">
//             <circle cx="200" cy="200" r="190" fill="none" stroke="#C6A560" strokeWidth="1" />
//             <circle cx="200" cy="200" r="140" fill="none" stroke="#C6A560" strokeWidth=".8" />
//             <circle cx="200" cy="200" r="76" fill="#C6A560" fillOpacity=".5" />
//             <circle cx="228" cy="184" r="72" fill="#0B1B33" />
//           </svg>
//         </div>
//       )}

//       <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
//         {/* breadcrumb */}
//         {crumbs.length > 0 && (
//           <nav aria-label="Breadcrumb">
//             <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-[#F6F4EF]/75 sm:text-[14px]">
//               {crumbs.map((c, i) => (
//                 <li key={c.name} className="flex items-center gap-2">
//                   {i > 0 && <span aria-hidden="true" className="text-[#C6A560]">/</span>}
//                   {c.href
//                     ? <NavLink href={c.href} className="underline-offset-4 hover:text-[#C6A560] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A560]">{c.name}</NavLink>
//                     : <span aria-current="page" className="text-[#F6F4EF]">{c.name}</span>}
//                 </li>
//               ))}
//             </ol>
//           </nav>
//         )}

//         <h1 id="page-title" className="mt-4 text-[34px] font-bold leading-tight sm:text-[44px] lg:text-[56px]">{title}</h1>
//         <div aria-hidden="true" className="mt-4 h-0.5 w-14 bg-[#C6A560]" />
//         {text && <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-[#F6F4EF]/85 sm:text-[18px]">{text}</p>}
//       </div>
//     </section>
//   )
// }


import { useState } from 'react'
import { Link } from 'react-router-dom' // remove if not using react-router

// Use router Link for internal nav; falls back to <a>
const NavLink = ({ href, children, ...props }) => {
  const isExternal = /^https?:\/\//.test(href) || href.startsWith('mailto:')
  if (isExternal) {
    return <a href={href} {...props}>{children}</a>
  }
  return <Link to={href} {...props}>{children}</Link>
}

export default function PageBanner({
  crumbs = [],
  title,
  text,
  image,
  // NEW: layout options
  size = 'md',              // 'sm' | 'md' | 'lg'
  align = 'left',           // 'left' | 'center'
  overlay = 'default',      // 'default' | 'light' | 'strong'
  children,                 // optional CTA / extra content slot
}) {
  const [failed, setFailed] = useState(false)

  // Height scales with size prop
  const sizeClasses = {
    sm: 'py-8 sm:py-10 lg:py-12',
    md: 'py-10 sm:py-14 lg:py-20',
    lg: 'py-14 sm:py-20 lg:py-28',
  }[size]

  // Overlay gradient variants
  const overlayClasses = {
    default: 'bg-gradient-to-r from-[#0B1B33]/90 via-[#0B1B33]/70 to-[#0B1B33]/30',
    light:   'bg-gradient-to-r from-[#0B1B33]/70 via-[#0B1B33]/40 to-[#0B1B33]/10',
    strong:  'bg-gradient-to-r from-[#0B1B33]/95 via-[#0B1B33]/85 to-[#0B1B33]/60',
  }[overlay]

  const alignClasses = align === 'center'
    ? 'text-center items-center mx-auto'
    : 'text-left'

  return (
    <section
      aria-labelledby="page-title"
      className="relative isolate overflow-hidden bg-[#0B1B33] text-[#F6F4EF]"
    >
      {/* Background: photo or gradient fallback */}
      {image && !failed ? (
        <>
          <img
            src={image}
            alt=""
            loading="eager"
            decoding="async"
            fetchpriority="high"
            onError={() => setFailed(true)}
            className="absolute inset-0 -z-10 h-full w-full object-cover"
          />
          <div aria-hidden="true" className={`absolute inset-0 -z-10 ${overlayClasses}`} />
        </>
      ) : (
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10"
          style={{ background: 'linear-gradient(135deg, #152A4D 0%, #0B1B33 100%)' }}
        >
          <svg
            viewBox="0 0 400 400"
            className="absolute -right-24 top-1/2 h-[220%] w-auto -translate-y-1/2 opacity-20 sm:-right-10 sm:h-[200%] lg:right-10"
            aria-hidden="true"
          >
            <circle cx="200" cy="200" r="190" fill="none" stroke="#C6A560" strokeWidth="1" />
            <circle cx="200" cy="200" r="140" fill="none" stroke="#C6A560" strokeWidth=".8" />
            <circle cx="200" cy="200" r="76" fill="#C6A560" fillOpacity=".5" />
            <circle cx="228" cy="184" r="72" fill="#0B1B33" />
          </svg>
        </div>
      )}

      <div
        className={`relative mx-auto flex max-w-7xl flex-col px-4 sm:px-6 lg:px-8 ${sizeClasses} ${alignClasses}`}
      >
        {/* Breadcrumb */}
        {crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className={align === 'center' ? 'w-full' : ''}>
            <ol
              className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-[#F6F4EF]/75 sm:text-[14px] ${
                align === 'center' ? 'justify-center' : ''
              }`}
            >
              {crumbs.map((c, i) => {
                const isLast = i === crumbs.length - 1
                return (
                  <li key={c.href || c.name} className="flex items-center gap-2">
                    {i > 0 && <span aria-hidden="true" className="text-[#C6A560]">/</span>}
                    {c.href && !isLast ? (
                      <NavLink
                        href={c.href}
                        className="underline-offset-4 transition-colors hover:text-[#C6A560] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A560] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1B33]"
                      >
                        {c.name}
                      </NavLink>
                    ) : (
                      <span aria-current={isLast ? 'page' : undefined} className="text-[#F6F4EF]">
                        {c.name}
                      </span>
                    )}
                  </li>
                )
              })}
            </ol>
          </nav>
        )}

        {/* Title — fluid clamp sizing scales cleanly from 320px → 1440px+ */}
        <h1
          id="page-title"
          className="mt-4 font-bold leading-tight"
          style={{ fontSize: 'clamp(1.75rem, 4.5vw + 0.5rem, 3.5rem)' }}
        >
          {title}
        </h1>

        {/* Gold accent rule */}
        <div
          aria-hidden="true"
          className={`mt-4 h-0.5 w-14 bg-[#C6A560] ${align === 'center' ? 'mx-auto' : ''}`}
        />

        {text && (
          <p
            className={`mt-5 max-w-2xl text-[16px] leading-relaxed text-[#F6F4EF]/85 sm:text-[18px] ${
              align === 'center' ? 'mx-auto' : ''
            }`}
          >
            {text}
          </p>
        )}

        {/* Optional slot for CTA buttons or extra content */}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </section>
  )
}