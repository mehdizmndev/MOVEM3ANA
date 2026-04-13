import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Icon from '../components/Icon'
import { CLUB_ACTIVITIES, CLUB_DATA, CLUB_PLANS, CLUB_REVIEWS } from '../data/clubData'

const today = new Date().toISOString().split('T')[0]

export default function BookingPage() {
  const [params] = useSearchParams()
  const initialActivity = params.get('activity') || CLUB_ACTIVITIES[0]?.name || ''
  const selectedActivity =
    CLUB_ACTIVITIES.find(activity => activity.name === initialActivity) || CLUB_ACTIVITIES[0]

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: today,
    time: selectedActivity?.slots?.[0] || '',
    activity: selectedActivity?.name || '',
    plan: CLUB_PLANS[0]?.name || '',
    description: '',
  })

  const activeActivity =
    CLUB_ACTIVITIES.find(activity => activity.name === form.activity) || CLUB_ACTIVITIES[0]

  function handleChange(event) {
    const { name, value } = event.target

    setForm(current => {
      if (name === 'activity') {
        const nextActivity = CLUB_ACTIVITIES.find(activity => activity.name === value)
        return {
          ...current,
          activity: value,
          time: nextActivity?.slots?.[0] || '',
        }
      }

      return {
        ...current,
        [name]: value,
      }
    })
  }

  return (
    <main className="pt-24 pb-20 bg-background dark:bg-stone-950 min-h-screen">
      <section className="max-w-screen-2xl mx-auto px-6">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <Link
              to="/club"
              className="mb-4 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary-container hover:underline font-body"
            >
              <Icon name="arrow_back" size={16} />
              Back To Club
            </Link>
            <h1 className="font-headline text-5xl md:text-7xl font-black uppercase tracking-tighter text-on-background dark:text-stone-100">
              Book Now
            </h1>
            <p className="mt-3 max-w-2xl text-lg text-tertiary dark:text-stone-400 font-body">
              Reserve your next session at {CLUB_DATA.name}. Fill in your details, choose your activity, and send your booking request.
            </p>
          </div>
          <div className="rounded-2xl border border-outline-variant/10 bg-surface-container-lowest px-5 py-4 dark:border-stone-800 dark:bg-stone-900">
            <div className="flex items-center gap-2 text-secondary-container">
              <Icon name="star" fill={1} size={18} />
              <span className="font-bold text-on-surface dark:text-stone-100 font-body">
                {CLUB_DATA.rating} / 5
              </span>
              <span className="text-sm text-on-surface-variant dark:text-stone-400 font-body">
                {CLUB_DATA.reviewCount} reviews
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1.2fr_0.8fr]">
          <section className="rounded-[2rem] border border-outline-variant/10 bg-surface-container-lowest p-8 shadow-sm dark:border-stone-800 dark:bg-stone-900 md:p-10">
            <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
              {[
                { icon: 'location_on', label: 'Location', value: CLUB_DATA.address },
                { icon: 'call', label: 'Phone', value: CLUB_DATA.phone },
                { icon: 'schedule', label: 'Open', value: CLUB_DATA.hours },
              ].map(({ icon, label, value }) => (
                <div key={label} className="rounded-2xl bg-surface-container-low p-4 dark:bg-stone-800">
                  <Icon name={icon} size={22} className="mb-3 text-primary-container" />
                  <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant dark:text-stone-400 font-body">
                    {label}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-on-surface dark:text-stone-100 font-body">
                    {value}
                  </p>
                </div>
              ))}
            </div>

            <form className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant dark:text-stone-400 font-body">
                  Full Name
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className="w-full rounded-2xl border border-outline-variant/10 bg-surface px-4 py-3 text-sm text-on-surface outline-none transition focus:border-primary-container dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant dark:text-stone-400 font-body">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full rounded-2xl border border-outline-variant/10 bg-surface px-4 py-3 text-sm text-on-surface outline-none transition focus:border-primary-container dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant dark:text-stone-400 font-body">
                  Phone Number
                </label>
                <input
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+212 6 00 00 00 00"
                  className="w-full rounded-2xl border border-outline-variant/10 bg-surface px-4 py-3 text-sm text-on-surface outline-none transition focus:border-primary-container dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant dark:text-stone-400 font-body">
                  Activity
                </label>
                <select
                  name="activity"
                  value={form.activity}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-outline-variant/10 bg-surface px-4 py-3 text-sm text-on-surface outline-none transition focus:border-primary-container dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100"
                >
                  {CLUB_ACTIVITIES.map(activity => (
                    <option key={activity.name} value={activity.name}>
                      {activity.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant dark:text-stone-400 font-body">
                  Date
                </label>
                <input
                  name="date"
                  type="date"
                  min={today}
                  value={form.date}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-outline-variant/10 bg-surface px-4 py-3 text-sm text-on-surface outline-none transition focus:border-primary-container dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant dark:text-stone-400 font-body">
                  Time
                </label>
                <select
                  name="time"
                  value={form.time}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-outline-variant/10 bg-surface px-4 py-3 text-sm text-on-surface outline-none transition focus:border-primary-container dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100"
                >
                  {activeActivity?.slots?.map(slot => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>

              {CLUB_PLANS.length > 0 && (
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant dark:text-stone-400 font-body">
                    Plan
                  </label>
                  <select
                    name="plan"
                    value={form.plan}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-outline-variant/10 bg-surface px-4 py-3 text-sm text-on-surface outline-none transition focus:border-primary-container dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100"
                  >
                    <option value="">No plan</option>
                    {CLUB_PLANS.map(plan => (
                      <option key={plan.name} value={plan.name}>
                        {plan.name} - {plan.price}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant dark:text-stone-400 font-body">
                  Description
                </label>
                <textarea
                  name="description"
                  rows="5"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Tell the club what you need: group size, equipment, coaching, or anything else."
                  className="w-full rounded-2xl border border-outline-variant/10 bg-surface px-4 py-3 text-sm text-on-surface outline-none transition focus:border-primary-container dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100"
                />
              </div>

              <div className="md:col-span-2 flex flex-col gap-4 rounded-3xl bg-primary-container/10 p-5 dark:bg-orange-900/10">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-widest text-primary-container font-body">
                      Selected Session
                    </p>
                    <h2 className="mt-1 font-headline text-3xl font-black uppercase tracking-tight text-on-surface dark:text-stone-100">
                      {activeActivity?.name}
                    </h2>
                  </div>
                  <span className="text-3xl font-black text-primary-container font-headline">
                    {activeActivity?.price}
                  </span>
                </div>
                <p className="text-sm text-on-surface-variant dark:text-stone-400 font-body">
                  {activeActivity?.desc}
                </p>
                {form.plan && (
                  <p className="text-sm font-semibold text-on-surface dark:text-stone-100 font-body">
                    Added plan: {form.plan}
                  </p>
                )}
                <button
                  type="button"
                  className="w-full rounded-2xl bg-primary px-6 py-4 font-headline text-xl font-black uppercase tracking-tight text-white transition hover:bg-primary-container active:scale-[0.99]"
                >
                  Send Booking Request
                </button>
              </div>
            </form>
          </section>

          <aside className="space-y-8">
            <div className="overflow-hidden rounded-[2rem] border border-outline-variant/10 bg-surface-container-lowest shadow-sm dark:border-stone-800 dark:bg-stone-900">
              <img
                src={CLUB_DATA.heroImage}
                alt={CLUB_DATA.name}
                className="h-56 w-full object-cover"
              />
              <div className="space-y-4 p-6">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-primary-container px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white font-headline">
                    {CLUB_DATA.category}
                  </span>
                  <span className="rounded-full bg-secondary-container px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-on-secondary-container font-headline">
                    {CLUB_DATA.specialty}
                  </span>
                </div>
                <h3 className="font-headline text-3xl font-black uppercase tracking-tight text-on-surface dark:text-stone-100">
                  {CLUB_DATA.name}
                </h3>
                <p className="text-sm leading-relaxed text-on-surface-variant dark:text-stone-400 font-body">
                  {CLUB_DATA.overview}
                </p>
              </div>
            </div>

            <div className="rounded-[2rem] border border-outline-variant/10 bg-surface-container-low p-8 dark:border-stone-800 dark:bg-stone-900">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="font-headline text-2xl font-black uppercase tracking-tight text-on-surface dark:text-stone-100">
                  Reviews
                </h3>
                <span className="text-sm font-semibold text-primary-container font-body">
                  {CLUB_REVIEWS.length} shown
                </span>
              </div>
              <div className="space-y-6">
                {CLUB_REVIEWS.map(({ name, stars, text, img }) => (
                  <article key={name} className="rounded-2xl bg-surface-container-lowest p-5 dark:bg-stone-800">
                    <div className="mb-3 flex items-center gap-3">
                      <img src={img} alt={name} className="h-12 w-12 rounded-full object-cover" />
                      <div>
                        <p className="font-bold text-on-surface dark:text-stone-100 font-body">{name}</p>
                        <div className="flex gap-0.5 text-secondary-container">
                          {Array.from({ length: 5 }).map((_, index) => (
                            <Icon key={index} name="star" fill={index < stars ? 1 : 0} size={14} />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm italic leading-relaxed text-on-surface-variant dark:text-stone-400 font-body">
                      {text}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}
