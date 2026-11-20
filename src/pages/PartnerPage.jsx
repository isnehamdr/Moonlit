import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

/*
  PARTNER WITH US PAGE  (route: /partner)
  The navbar and footer come from the layout in App.jsx, so they are not repeated here.

  1. Header (Midnight Navy)
  2. Who we partner with, and the three franchise routes (Himalayan White)
  3. Which brand fits: room range of each brand (Royal Navy)
  4. What you get / what we ask, and the commercial structure (Himalayan White)
  5. How it works: seven steps (Midnight Navy)
  6. Enquiry form and contact details (Himalayan White)      id: enquiry
  Content comes from the Franchise and Owner factsheets. The Services page already covers the four
  services, the method and "how to start", so this page focuses on partnering and franchising.

  The enquiry form opens the visitor's email app with the message ready to send to
  marketing@moonlithotels.com. To send it to a server instead, replace the code in `send()`.
  The form reads ?type=franchise, ?type=health-check or ?type=partner to pre-select the topic.

  Header photo (optional): public/images/partner-hero.jpg

  Client colours, written as hex codes:
    Midnight Navy #0B1B33 · Royal Navy #152A4D · Moonlit Gold #C6A560 · Burnished Gold #A8842F
    Himalayan White #F6F4EF · Slate Stone #5F6B7A
    Brands: Grand #6B1E2E · Sanctuary #2F5D50 · Select #2A6496 · Inn #B5541C · Hearth #7B3F26
*/

/* Link used on this page. Pages inside the site use React Router; mailto:, https:// and #section links stay normal links. */
const NavLink = ({ href, children, ...props }) => {
  const plain = !href || href.startsWith('#') || /^(https?:|mailto:|tel:|\/\/)/.test(href)
  return plain
    ? <a href={href} {...props}>{children}</a>
    : <Link to={href} {...props}>{children}</Link>
}

const HERO_IMAGE = '/images/partner-hero.jpg'
const EMAIL = 'marketing@moonlithotels.com'

/* ------------------------------- content ------------------------------- */
const suits = [
  { title: 'Owner-operators', text: 'Converting an existing hotel to a Moonlit brand.', icon: <path d="M20 11a8 8 0 0 0-14-4M4 5v4h4M4 13a8 8 0 0 0 14 4M20 19v-4h-4" /> },
  { title: 'Developers', text: 'Building a new hotel to run themselves.', icon: <path d="M4 21V9l8-5 8 5v12M9 21v-6h6v6" /> },
  { title: 'Hospitality groups', text: 'Growing in Nepal.', icon: <path d="M3 21V11h6v10M9 21V5h6v16M15 21v-8h6v8" /> },
]

const routes = ['New-build franchise', 'Conversion franchise', 'Franchise with MHR support']

const sizes = [
  { name: 'Moonlit Grand', min: 120, max: 300, color: '#6B1E2E', note: 'by approval' },
  { name: 'Moonlit Sanctuary', min: 30, max: 120, color: '#2F5D50', note: 'by approval' },
  { name: 'Moonlit Select', min: 60, max: 150, color: '#2A6496', note: 'first' },
  { name: 'Moonlit Inn', min: 30, max: 80, color: '#B5541C', note: 'first' },
  { name: 'Moonlit Hearth', min: 8, max: 30, color: '#7B3F26', note: 'first' },
]
const SCALE = 300 // rooms at the right edge of the chart

const youGet = [
  'Brand identity and logo files',
  'Brand standards and written SOPs',
  'Moonlit Academy training',
  'Moonlit website, reservations and channel management',
  'The Moonlit Circle loyalty program',
  'Marketing templates and guidelines',
  'Opening or conversion support',
  'Quality audits for every franchisee',
]

const weAsk = [
  'Meet the brand standard for rooms, facilities and safety',
  'Complete the agreed improvement plan',
  'Train your team through the Academy',
  'Use Moonlit systems for reservations and reporting',
  'Pay franchise fees',
  'Welcome audits and act on them',
]

const steps = [
  { title: 'Enquiry', text: 'Tell us about your property.' },
  { title: 'Property review', text: 'We visit and match a brand.' },
  { title: 'Proposal', text: 'Brand, plan, timeline and fees in writing.' },
  { title: 'Agreement', text: 'A clear franchise agreement.' },
  { title: 'Plan', text: 'Opening or conversion plan with dates.' },
  { title: 'Training and systems', text: 'Your team, our SOPs.' },
  { title: 'Opening and audits', text: 'Launch, then regular quality audits.' },
]

const topics = ['Management', 'Franchise', 'Consulting and pre-opening', 'Conversion', 'Asset Health Check', 'Not sure yet']
const typeToTopic = { franchise: 'Franchise', 'health-check': 'Asset Health Check', partner: '' }
const brandOptions = ['No preference', 'Moonlit Grand', 'Moonlit Sanctuary', 'Moonlit Select', 'Moonlit Inn', 'Moonlit Hearth']

/* ------------------------------- parts ------------------------------- */
const Check = ({ light }) => (
  <svg viewBox="0 0 16 16" aria-hidden="true" className={`mt-1 h-4 w-4 shrink-0 ${light ? 'text-[#C6A560]' : 'text-[#A8842F]'}`}>
    <path d="m3 8.5 3.2 3L13 4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const input = 'w-full rounded-sm border border-[#5F6B7A]/50 bg-white px-3.5 py-3 text-[15px] text-[#0B1B33] placeholder:text-[#5F6B7A]/70 focus:border-[#0B1B33] focus:outline-none focus:ring-2 focus:ring-[#0B1B33]'

function Field({ id, label, required, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[14px] font-semibold text-[#0B1B33]">
        {label}{required && <span aria-hidden="true" className="text-[#A8842F]"> *</span>}
      </label>
      {children}
      {error && <p id={`${id}-error`} role="alert" className="mt-1.5 text-[13px] font-medium text-[#8A1F1F]">{error}</p>}
    </div>
  )
}

function EnquiryForm() {
  const [params] = useSearchParams()
  const [v, setV] = useState({ name: '', email: '', phone: '', property: '', location: '', rooms: '', topic: typeToTopic[params.get('type')] || '', brand: 'No preference', message: '' })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)
  const set = (k) => (e) => setV({ ...v, [k]: e.target.value })

  const validate = () => {
    const er = {}
    if (!v.name.trim()) er.name = 'Please enter your name.'
    if (!/^\S+@\S+\.\S+$/.test(v.email)) er.email = 'Please enter a valid email address.'
    if (!v.topic) er.topic = 'Please choose what you are interested in.'
    return er
  }

  // Opens the visitor's email app with the enquiry written out. Replace with a server call if you have one.
  const send = () => {
    const body = [
      `Name: ${v.name}`, `Email: ${v.email}`, `Phone: ${v.phone || '-'}`,
      `Property: ${v.property || '-'}`, `Location: ${v.location || '-'}`, `Rooms: ${v.rooms || '-'}`,
      `Interested in: ${v.topic}`, `Preferred brand: ${v.brand}`, '', v.message,
    ].join('\n')
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(`Partner enquiry: ${v.topic}`)}&body=${encodeURIComponent(body)}`
  }

  const submit = (e) => {
    e.preventDefault()
    const er = validate()
    setErrors(er)
    if (Object.keys(er).length) {
      document.getElementById(Object.keys(er)[0])?.focus()
      return
    }
    send()
    setSent(true)
  }

  if (sent) {
    return (
      <div role="status" className="border-t-4 border-[#C6A560] bg-white p-6 sm:p-8">
        <h3 className="text-[22px] font-bold text-[#0B1B33]">Thank you, {v.name.split(' ')[0]}</h3>
        <p className="mt-3 text-[15px] leading-relaxed text-[#5F6B7A]">
          Your email app should have opened with your enquiry ready to send. If it did not, please write to{' '}
          <a href={`mailto:${EMAIL}`} className="font-semibold text-[#152A4D] underline underline-offset-2 hover:text-[#A8842F]">{EMAIL}</a>{' '}
          and tell us about your property.
        </p>
        <button type="button" onClick={() => setSent(false)}
          className="mt-6 border-2 border-[#A8842F] px-6 py-3 text-[13px] font-bold uppercase tracking-wide text-[#0B1B33] transition-colors hover:bg-[#C6A560] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B1B33] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F6F4EF]">
          Edit my enquiry
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={submit} noValidate className="border-t-4 border-[#C6A560] bg-white p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Your name" required error={errors.name}>
          <input id="name" type="text" autoComplete="name" value={v.name} onChange={set('name')} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-error' : undefined} className={input} />
        </Field>
        <Field id="email" label="Email" required error={errors.email}>
          <input id="email" type="email" autoComplete="email" value={v.email} onChange={set('email')} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-error' : undefined} className={input} />
        </Field>
        <Field id="phone" label="Phone"><input id="phone" type="tel" autoComplete="tel" value={v.phone} onChange={set('phone')} className={input} /></Field>
        <Field id="property" label="Property name"><input id="property" type="text" value={v.property} onChange={set('property')} className={input} /></Field>
        <Field id="location" label="Location"><input id="location" type="text" placeholder="City or town" value={v.location} onChange={set('location')} className={input} /></Field>
        <Field id="rooms" label="Number of rooms"><input id="rooms" type="number" min="1" inputMode="numeric" value={v.rooms} onChange={set('rooms')} className={input} /></Field>

        <Field id="topic" label="I am interested in" required error={errors.topic}>
          <select id="topic" value={v.topic} onChange={set('topic')} aria-invalid={!!errors.topic} aria-describedby={errors.topic ? 'topic-error' : undefined} className={input}>
            <option value="">Choose one</option>
            {topics.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </Field>
        <Field id="brand" label="Preferred brand">
          <select id="brand" value={v.brand} onChange={set('brand')} className={input}>
            {brandOptions.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
        </Field>

        <div className="sm:col-span-2">
          <Field id="message" label="Tell us about your property">
            <textarea id="message" rows="4" value={v.message} onChange={set('message')} className={input} />
          </Field>
        </div>
      </div>

      <button type="submit"
        className="mt-6 w-full bg-[#C6A560] px-10 py-3.5 text-[13px] font-bold uppercase tracking-wide text-[#0B1B33] transition-colors hover:bg-[#A8842F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B1B33] focus-visible:ring-offset-2 sm:w-auto">
        Send enquiry
      </button>
      <p className="mt-4 text-[13px] text-[#5F6B7A]">Fields marked * are required.</p>
    </form>
  )
}

/* ------------------------------- the page ------------------------------- */
export default function PartnerPage() {
  const [heroFailed, setHeroFailed] = useState(false)

  return (
    <main>
    <section
  aria-labelledby="page-title"
  className="relative isolate overflow-hidden bg-[#0B1B33] text-[#F6F4EF]"
>
  {/* Background image */}
  <img
    src="/images/partner.jpg"
    alt=""
    loading="eager"
    decoding="async"
    className="absolute inset-0 -z-10 h-full w-full object-cover"
  />
  {/* Dark overlay for text contrast */}
  <div
    aria-hidden="true"
    className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0B1B33]/90 via-[#0B1B33]/70 to-[#0B1B33]/40"
  />

  <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-2 text-[13px] text-[#F6F4EF]/75 sm:text-[14px]">
        <li>
          <NavLink
            href="/"
            className="underline-offset-4 hover:text-[#C6A560] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A560]"
          >
            Home
          </NavLink>
        </li>
        <li aria-hidden="true" className="text-[#C6A560]">/</li>
        <li aria-current="page" className="text-[#F6F4EF]">Partner with us</li>
      </ol>
    </nav>
          <h1 id="partner-title" className="mt-4 text-[34px] font-bold leading-tight sm:text-[44px] lg:text-[56px]">Partner with us</h1>
          <div aria-hidden="true" className="mt-4 h-0.5 w-14 bg-[#C6A560]" />
          <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-[#F6F4EF]/85 sm:text-[18px]">
            Tell us about your property. We will visit, match a brand and put a clear proposal in writing.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <NavLink href="#enquiry"
              className="bg-[#C6A560] px-8 py-3.5 text-center text-[13px] font-bold uppercase tracking-wide text-[#0B1B33] transition-colors hover:bg-[#A8842F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6F4EF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1B33]">
              Send an enquiry
            </NavLink>
            <NavLink href="#how-it-works"
              className="border-2 border-[#F6F4EF]/60 px-8 py-3.5 text-center text-[13px] font-bold uppercase tracking-wide text-[#F6F4EF] transition-colors hover:border-[#C6A560] hover:text-[#C6A560] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A560] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1B33]">
              How it works
            </NavLink>
          </div>
        </div>
      </section>

      {/* 2. who it suits and the three routes */}
      <section aria-labelledby="suits-title" className="bg-[#F6F4EF] py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 id="suits-title" className="text-[26px] font-bold leading-tight text-[#0B1B33] sm:text-[32px] lg:text-[36px]">Who we partner with</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-[#5F6B7A] sm:text-[17px]">
              You operate your hotel or resort under a Moonlit brand. MHR provides the brand, standards, training, distribution and quality audits.
            </p>
          </div>

          <ul className="mt-10 grid gap-5 sm:mt-12 md:grid-cols-3">
            {suits.map((s) => (
              <li key={s.title} className="border border-[#5F6B7A]/25 bg-white p-6 text-center shadow-[0_6px_20px_rgba(11,27,51,.07)]">
                <span aria-hidden="true" className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#0B1B33] text-[#C6A560]">
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{s.icon}</svg>
                </span>
                <h3 className="mt-4 text-[19px] font-bold text-[#0B1B33]">{s.title}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-[#5F6B7A]">{s.text}</p>
              </li>
            ))}
          </ul>

          <div className="mt-10 text-center sm:mt-12">
            <h3 className="text-[13px] font-semibold uppercase tracking-wide text-[#A8842F]">Three routes</h3>
            <ul className="mt-4 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap">
              {routes.map((r, i) => (
                <li key={r} className="flex items-center justify-center gap-3 border-2 border-[#0B1B33]/20 px-5 py-3 text-[15px] font-semibold text-[#0B1B33]">
                  <span aria-hidden="true" className="flex h-6 w-6 items-center justify-center rounded-full bg-[#C6A560] text-[12px] font-bold text-[#0B1B33]">{i + 1}</span>{r}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 3. which brand fits */}
      <section aria-labelledby="sizes-title" className="bg-[#152A4D] py-12 text-[#F6F4EF] sm:py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 id="sizes-title" className="text-[26px] font-bold leading-tight sm:text-[32px] lg:text-[36px]">Which brand fits your property</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-[#F6F4EF]/80 sm:text-[17px]">
              Each brand is built for a range of room counts. Moonlit Select, Inn and Hearth come first, with Moonlit Grand and Sanctuary by approval.
            </p>
          </div>

          <ul className="mt-10 space-y-5 sm:mt-12" aria-label="Rooms per brand">
            {sizes.map((s) => (
              <li key={s.name} className="grid gap-2 sm:grid-cols-[11rem_1fr] sm:items-center sm:gap-5">
                <div className="flex items-center justify-between gap-3 sm:block">
                  <p className="flex items-center gap-2 text-[15px] font-semibold">
                    <span aria-hidden="true" className="h-3 w-3 rounded-full ring-1 ring-[#F6F4EF]/40" style={{ backgroundColor: s.color }} />{s.name}
                  </p>
                  <p className="text-[13px] text-[#F6F4EF]/70 sm:mt-0.5">{s.min} to {s.max} rooms</p>
                </div>
                {/* range bar on a 0 to 300 rooms scale */}
                <div className="relative h-4 bg-[#F6F4EF]/10" role="img" aria-label={`${s.name}: ${s.min} to ${s.max} rooms`}>
                  {[100, 200].map((t) => <span key={t} aria-hidden="true" className="absolute inset-y-0 w-px bg-[#F6F4EF]/15" style={{ left: `${(t / SCALE) * 100}%` }} />)}
                  <span className="absolute inset-y-0 rounded-sm bg-[#C6A560]" style={{ left: `${(s.min / SCALE) * 100}%`, width: `${((s.max - s.min) / SCALE) * 100}%` }} />
                </div>
              </li>
            ))}
          </ul>
          <div aria-hidden="true" className="mt-3 hidden justify-between text-[12px] text-[#F6F4EF]/60 sm:ml-[12.25rem] sm:flex">
            <span>0</span><span>100</span><span>200</span><span>300 rooms</span>
          </div>
        </div>
      </section>

      {/* 4. what you get and what we ask */}
      <section aria-labelledby="terms-title" className="bg-[#F6F4EF] py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 id="terms-title" className="text-center text-[26px] font-bold leading-tight text-[#0B1B33] sm:text-[32px] lg:text-[36px]">A clear give and take</h2>
          <div className="mt-10 grid gap-6 sm:mt-12 md:grid-cols-2 lg:gap-8">
            <div className="border-t-4 border-[#C6A560] bg-[#0B1B33] p-6 text-[#F6F4EF] sm:p-8">
              <h3 className="text-[22px] font-bold">What you get</h3>
              <ul className="mt-5 space-y-3">{youGet.map((i) => <li key={i} className="flex gap-3 text-[15px] leading-snug"><Check light />{i}</li>)}</ul>
            </div>
            <div className="border-t-4 border-[#C6A560] bg-white p-6 shadow-[0_6px_20px_rgba(11,27,51,.07)] sm:p-8">
              <h3 className="text-[22px] font-bold text-[#0B1B33]">What we ask</h3>
              <ul className="mt-5 space-y-3">{weAsk.map((i) => <li key={i} className="flex gap-3 text-[15px] leading-snug text-[#0B1B33]"><Check />{i}</li>)}</ul>
            </div>
          </div>

          <div className="mt-6 border border-[#5F6B7A]/25 bg-white p-5 text-center sm:mt-8 sm:p-6">
            <h3 className="text-[13px] font-semibold uppercase tracking-wide text-[#A8842F]">Commercial structure</h3>
            <p className="mx-auto mt-2 max-w-3xl text-[15px] leading-relaxed text-[#0B1B33] sm:text-base">
              An initial fee, a share of revenue, a marketing and reservation contribution and a fixed term, all set out in writing in the proposal.
            </p>
          </div>
        </div>
      </section>

      {/* 5. how it works */}
      <section id="how-it-works" aria-labelledby="steps-title" className="scroll-mt-40 bg-[#0B1B33] py-12 text-[#F6F4EF] sm:py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 id="steps-title" className="text-center text-[26px] font-bold leading-tight sm:text-[32px] lg:text-[36px]">How it works</h2>
          <ol className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.title} className="flex items-start gap-4 border border-[#F6F4EF]/20 p-5 lg:flex-col lg:gap-3">
                <span aria-hidden="true" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#C6A560] text-[15px] font-bold text-[#0B1B33]">{i + 1}</span>
                <div>
                  <h3 className="text-[17px] font-bold leading-snug">{s.title}</h3>
                  <p className="mt-1 text-[14px] leading-relaxed text-[#F6F4EF]/75">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 6. enquiry */}
      <section id="enquiry" aria-labelledby="enquiry-title" className="scroll-mt-40 bg-[#F6F4EF] py-12 sm:py-16 lg:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.6fr_1fr] lg:gap-12 lg:px-8">
          <div>
            <h2 id="enquiry-title" className="text-[26px] font-bold leading-tight text-[#0B1B33] sm:text-[32px]">Start your enquiry</h2>
            <p className="mb-6 mt-3 text-[15px] leading-relaxed text-[#5F6B7A] sm:text-[17px]">The first step is a conversation. Tell us about your property.</p>
            <EnquiryForm />
          </div>

          <aside aria-label="Contact details" className="self-start bg-[#0B1B33] p-6 text-[#F6F4EF] sm:p-8 lg:mt-[7.25rem]">
            <h3 className="text-[20px] font-bold">Prefer to write?</h3>
            <div aria-hidden="true" className="mt-3 h-0.5 w-10 bg-[#C6A560]" />
            <ul className="mt-5 space-y-4 text-[15px]">
              <li><a href="mailto:marketing@moonlithotels.com" className="break-all underline-offset-4 hover:text-[#C6A560] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A560]">marketing@moonlithotels.com</a></li>
              <li><a href="mailto:moonlithotels@gmail.com" className="break-all underline-offset-4 hover:text-[#C6A560] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A560]">moonlithotels@gmail.com</a></li>
              <li className="text-[#F6F4EF]/80">Kathmandu, Nepal</li>
            </ul>
            <p className="mt-6 border-t border-[#F6F4EF]/20 pt-5 text-[13px] leading-relaxed text-[#F6F4EF]/70">
              Fees are discussed openly at proposal stage and tied to performance where the model allows.
            </p>
          </aside>
        </div>
      </section>
    </main>
  )
}