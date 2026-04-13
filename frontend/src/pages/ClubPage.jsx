import { useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import {
  CLUB_ACTIVITIES,
  CLUB_DATA,
  CLUB_GALLERY,
  CLUB_PLANS,
  CLUB_REVIEWS,
} from '../data/clubData'

const TABS = ['Overview', 'Activities & Offers', 'Gallery', 'Reviews']

export default function ClubPage() {
  const [tab, setTab] = useState(0)

  return (
    <main className="pt-16">
      <section className="relative h-[614px] min-h-[450px] w-full overflow-hidden">
        <img
          src={CLUB_DATA.heroImage}
          alt="Club hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full px-8 pb-12 max-w-7xl mx-auto flex flex-col md:flex-row items-end justify-between gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex gap-2 flex-wrap">
              <span className="bg-primary-container text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest font-headline">
                {CLUB_DATA.category}
              </span>
              <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest font-headline">
                {CLUB_DATA.specialty}
              </span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter text-white font-headline uppercase leading-none">
              {CLUB_DATA.name}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-white/80 font-body">
              <div className="flex items-center gap-2">
                <Icon name="location_on" size={18} className="text-primary-container" />
                <span className="font-medium">{CLUB_DATA.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="star" fill={1} size={18} className="text-secondary-container" />
                <span className="font-bold text-white">{CLUB_DATA.rating}</span>
                <span className="text-white/60">({CLUB_DATA.reviewCount} reviews)</span>
              </div>
            </div>
          </div>
          <div>
            <Link
              to="/club/book"
              className="bg-white text-on-surface px-8 py-4 rounded-xl font-headline uppercase font-bold tracking-tight hover:bg-surface-variant transition-colors active:scale-95 transform flex items-center gap-2"
            >
              <Icon name="calendar_today" size={20} />
              Book Now
            </Link>
          </div>
        </div>
      </section>

      <section className="sticky top-[60px] z-40 bg-surface-container-low dark:bg-stone-800 border-b border-outline-variant/10">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex gap-8 md:gap-12 overflow-x-auto hide-scrollbar">
            {TABS.map((label, i) => (
              <button
                key={label}
                onClick={() => setTab(i)}
                className={`py-6 border-b-4 font-headline uppercase font-bold tracking-tighter text-lg whitespace-nowrap transition-colors ${
                  tab === i
                    ? 'border-primary-container text-primary-container'
                    : 'border-transparent text-on-surface-variant dark:text-stone-400 hover:text-primary-container'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-8 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 flex flex-col gap-16">
          <section className="flex flex-col gap-6">
            <h2 className="text-4xl font-black italic tracking-tighter font-headline uppercase text-on-surface dark:text-stone-100">
              The Core Experience
            </h2>
            <p className="text-on-surface-variant dark:text-stone-400 text-lg leading-relaxed max-w-2xl font-body">
              {CLUB_DATA.overview}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              {[
                { icon: 'schedule', label: 'Hours', value: CLUB_DATA.hours },
                { icon: 'call', label: 'Phone', value: CLUB_DATA.phone },
                { icon: 'sports_tennis', label: 'Courts', value: CLUB_DATA.courts },
              ].map(({ icon, label, value }) => (
                <div key={label} className="bg-surface-container-high dark:bg-stone-800 p-6 rounded-xl flex flex-col gap-2">
                  <Icon name={icon} size={30} className="text-primary-container" />
                  <span className="text-xs uppercase font-bold text-on-surface-variant dark:text-stone-400 font-body">
                    {label}
                  </span>
                  <span className="font-bold text-on-surface dark:text-stone-100 font-body">{value}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="flex flex-col gap-8">
            <div className="flex justify-between items-end">
              <h2 className="text-4xl font-black italic tracking-tighter font-headline uppercase text-on-surface dark:text-stone-100">
                Active Sessions
              </h2>
              <Link
                to="/club/events"
                className="text-primary-container font-bold uppercase text-sm flex items-center gap-1 hover:underline font-body"
              >
                View All <Icon name="arrow_forward" size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {CLUB_ACTIVITIES.map(({ icon, name, price, schedule, desc }) => (
                <div key={name} className="bg-surface-container-lowest dark:bg-stone-800 p-6 rounded-2xl shadow-sm border border-outline-variant/10 group hover:border-primary-container/40 transition-all duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <div className="bg-primary-container/10 p-3 rounded-xl">
                      <Icon name={icon} size={22} className="text-primary-container" />
                    </div>
                    <span className="text-2xl font-black font-headline text-primary-container">{price}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-1 text-on-surface dark:text-stone-100 font-body">{name}</h3>
                  <p className="text-on-surface-variant dark:text-stone-400 text-sm mb-6 font-body">{desc}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase font-bold text-on-surface-variant dark:text-stone-400 font-body">
                        Next Schedule
                      </span>
                      <span className="text-sm font-semibold text-on-surface dark:text-stone-100 font-body">
                        {schedule}
                      </span>
                    </div>
                    <Link
                      to={`/club/book?activity=${encodeURIComponent(name)}`}
                      className="kinetic-gradient text-white px-6 py-2 rounded-lg font-headline font-bold uppercase tracking-tight active:scale-95 transition-transform"
                    >
                      Book
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="flex flex-col gap-8">
            <h2 className="text-4xl font-black italic tracking-tighter font-headline uppercase text-on-surface dark:text-stone-100">
              Inside the Arena
            </h2>
            <div className="columns-1 md:columns-2 gap-4 space-y-4">
              {CLUB_GALLERY.map(({ src, alt }) => (
                <img
                  key={alt}
                  src={src}
                  alt={alt}
                  className="rounded-2xl w-full object-cover hover:scale-[1.02] transition-transform duration-300"
                />
              ))}
            </div>
          </section>
        </div>

        <aside className="flex flex-col gap-8">
          <div className="bg-on-surface dark:bg-stone-900 text-white p-8 rounded-3xl flex flex-col gap-6 relative overflow-hidden border border-white/5">
            <div className="absolute top-0 right-0 p-4">
              <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-xs font-black uppercase font-headline">
                Limited Offer
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <h4 className="text-3xl font-black italic tracking-tighter font-headline uppercase leading-none">
                {CLUB_PLANS[0].name}
              </h4>
              <p className="text-white/60 text-sm font-body">{CLUB_PLANS[0].note}</p>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-black font-headline text-secondary-container">{CLUB_PLANS[0].price}</span>
              <span className="text-white/40 line-through font-body">$299</span>
            </div>
            <div className="flex gap-2">
              {[['02', 'Days'], ['14', 'Hrs'], ['45', 'Min']].map(([v, l]) => (
                <div key={l} className="flex-1 bg-white/10 rounded-xl p-3 text-center">
                  <span className="block text-xl font-bold font-headline">{v}</span>
                  <span className="text-[10px] uppercase text-white/60 font-body">{l}</span>
                </div>
              ))}
            </div>
            <Link
              to="/club/book"
              className="bg-secondary-container text-on-secondary-container w-full py-4 rounded-xl font-headline font-bold uppercase tracking-tight hover:bg-yellow-400 transition-colors text-center"
            >
              Claim Discount
            </Link>
          </div>

          <div className="bg-surface-container-low dark:bg-stone-800 p-8 rounded-3xl flex flex-col gap-8">
            <h4 className="text-2xl font-black italic tracking-tighter font-headline uppercase text-on-surface dark:text-stone-100">
              User Feedback
            </h4>
            <div className="flex flex-col gap-6">
              {CLUB_REVIEWS.map(({ name, stars, text, img }) => (
                <div key={name} className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <img src={img} alt={name} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <span className="block font-bold text-sm text-on-surface dark:text-stone-100 font-body">{name}</span>
                      <div className="flex text-secondary-container gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Icon key={i} name="star" fill={i < stars ? 1 : 0} size={14} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-on-surface-variant dark:text-stone-400 text-sm italic font-body">{text}</p>
                </div>
              ))}
            </div>
            <Link
              to="/club/book"
              className="text-primary-container font-bold uppercase text-xs text-center border border-primary-container/20 py-3 rounded-xl hover:bg-primary-container/5 transition-colors font-body"
            >
              Read Reviews And Book
            </Link>
          </div>

          <div className="bg-surface-container dark:bg-stone-800 rounded-3xl overflow-hidden h-64 relative">
            <img
              src={CLUB_DATA.mapImage}
              alt="Map"
              className="w-full h-full object-cover grayscale opacity-50"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/90 backdrop-blur p-4 rounded-2xl shadow-xl flex items-center gap-3">
                <div className="bg-primary p-2 rounded-full">
                  <Icon name="location_on" size={20} className="text-white" />
                </div>
                <div>
                  <span className="block font-bold font-body text-on-surface">{CLUB_DATA.name}</span>
                  <span className="text-xs text-on-surface-variant font-body">Get Directions</span>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  )
}
