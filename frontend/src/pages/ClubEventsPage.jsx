import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import { CLUB_ACTIVITIES, CLUB_DATA, CLUB_PLANS } from '../data/clubData'

const totalSlots = CLUB_ACTIVITIES.reduce(
  (count, activity) => count + (activity.slots?.length || 0),
  0,
)

export default function ClubEventsPage() {
  return (
    <main className="min-h-screen bg-background pt-24 pb-20 dark:bg-stone-950">
      <section className="max-w-screen-2xl mx-auto px-6">
        <div className="overflow-hidden rounded-[2rem] border border-outline-variant/10 bg-surface-container-lowest shadow-sm dark:border-stone-800 dark:bg-stone-900">
          <div className="relative min-h-[360px] overflow-hidden">
            <img
              src={CLUB_DATA.heroImage}
              alt={CLUB_DATA.name}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/70 to-stone-950/20" />
            <div className="relative z-10 flex min-h-[360px] flex-col justify-end gap-6 px-8 py-10 md:px-12">
              <Link
                to="/club"
                className="inline-flex w-fit items-center gap-2 text-sm font-bold uppercase tracking-widest text-white/80 transition hover:text-white font-body"
              >
                <Icon name="arrow_back" size={16} />
                Back To Club
              </Link>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-primary-container px-3 py-1 text-xs font-bold uppercase tracking-widest text-white font-headline">
                  Club Events
                </span>
                <span className="rounded-full bg-secondary-container px-3 py-1 text-xs font-bold uppercase tracking-widest text-on-secondary-container font-headline">
                  {CLUB_DATA.specialty}
                </span>
              </div>
              <div className="max-w-3xl">
                <h1 className="font-headline text-5xl font-black uppercase tracking-tighter text-white md:text-7xl">
                  All Events At {CLUB_DATA.name}
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg font-body">
                  Browse every active session, compare schedules, and jump straight into booking from one place.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 border-t border-outline-variant/10 bg-surface px-6 py-6 dark:border-stone-800 dark:bg-stone-950 md:grid-cols-3 md:px-10">
            {[
              { icon: 'event', label: 'Active Events', value: `${CLUB_ACTIVITIES.length}` },
              { icon: 'schedule', label: 'Open Today', value: CLUB_DATA.hours },
              { icon: 'bolt', label: 'Bookable Slots', value: `${totalSlots}` },
            ].map(({ icon, label, value }) => (
              <div key={label} className="rounded-2xl bg-surface-container-low p-4 dark:bg-stone-900">
                <Icon name={icon} size={22} className="mb-3 text-primary-container" />
                <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant dark:text-stone-400 font-body">
                  {label}
                </p>
                <p className="mt-1 text-lg font-black uppercase tracking-tight text-on-surface dark:text-stone-100 font-headline">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 xl:grid-cols-[1.2fr_0.8fr]">
          <section className="space-y-6">
            {CLUB_ACTIVITIES.map(({ icon, name, price, schedule, desc, slots }) => (
              <article
                key={name}
                className="rounded-[2rem] border border-outline-variant/10 bg-surface-container-lowest p-6 shadow-sm dark:border-stone-800 dark:bg-stone-900 md:p-8"
              >
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                  <div className="max-w-2xl">
                    <div className="mb-5 flex items-center gap-3">
                      <div className="rounded-2xl bg-primary-container/10 p-4">
                        <Icon name={icon} size={26} className="text-primary-container" />
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-primary-container font-body">
                          Featured Event
                        </p>
                        <h2 className="font-headline text-3xl font-black uppercase tracking-tight text-on-surface dark:text-stone-100">
                          {name}
                        </h2>
                      </div>
                    </div>

                    <p className="text-base leading-relaxed text-on-surface-variant dark:text-stone-400 font-body">
                      {desc}
                    </p>

                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      <div className="rounded-2xl bg-surface-container-low p-4 dark:bg-stone-800">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant dark:text-stone-400 font-body">
                          Next Session
                        </p>
                        <p className="mt-1 text-lg font-bold text-on-surface dark:text-stone-100 font-body">
                          {schedule}
                        </p>
                      </div>
                      <div className="rounded-2xl bg-surface-container-low p-4 dark:bg-stone-800">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant dark:text-stone-400 font-body">
                          Entry Price
                        </p>
                        <p className="mt-1 text-lg font-bold text-primary-container font-headline">
                          {price}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="w-full max-w-sm rounded-[1.5rem] bg-surface p-5 dark:bg-stone-950">
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant dark:text-stone-400 font-body">
                          Available Times
                        </p>
                        <p className="mt-1 font-headline text-2xl font-black uppercase tracking-tight text-on-surface dark:text-stone-100">
                          {slots.length} Slots
                        </p>
                      </div>
                      <Icon name="schedule" size={24} className="text-primary-container" />
                    </div>

                    <div className="mb-6 flex flex-wrap gap-2">
                      {slots.map(slot => (
                        <span
                          key={slot}
                          className="rounded-full border border-primary-container/20 bg-primary-container/10 px-3 py-2 text-sm font-bold text-on-surface dark:text-stone-100 font-body"
                        >
                          {slot}
                        </span>
                      ))}
                    </div>

                    <Link
                      to={`/club/book?activity=${encodeURIComponent(name)}`}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary-container px-5 py-4 text-center font-headline text-lg font-black uppercase tracking-tight text-white transition hover:bg-primary active:scale-[0.99]"
                    >
                      Book This Event
                      <Icon name="arrow_forward" size={18} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </section>

          <aside className="space-y-6">
            <div className="rounded-[2rem] border border-outline-variant/10 bg-surface-container-low p-8 dark:border-stone-800 dark:bg-stone-900">
              <h3 className="font-headline text-3xl font-black uppercase tracking-tight text-on-surface dark:text-stone-100">
                Club Snapshot
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-on-surface-variant dark:text-stone-400 font-body">
                {CLUB_DATA.overview}
              </p>

              <div className="mt-6 space-y-4">
                {[
                  { icon: 'location_on', label: 'Address', value: CLUB_DATA.address },
                  { icon: 'call', label: 'Phone', value: CLUB_DATA.phone },
                  { icon: 'sports_tennis', label: 'Courts', value: CLUB_DATA.courts },
                ].map(({ icon, label, value }) => (
                  <div key={label} className="flex items-start gap-4 rounded-2xl bg-surface-container-lowest p-4 dark:bg-stone-800">
                    <div className="rounded-xl bg-primary-container/10 p-3">
                      <Icon name={icon} size={20} className="text-primary-container" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant dark:text-stone-400 font-body">
                        {label}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-on-surface dark:text-stone-100 font-body">
                        {value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {CLUB_PLANS[0] && (
              <div className="rounded-[2rem] bg-on-surface p-8 text-white dark:bg-stone-950">
                <p className="text-xs font-bold uppercase tracking-widest text-secondary-container font-body">
                  Membership Offer
                </p>
                <h3 className="mt-3 font-headline text-4xl font-black uppercase tracking-tight">
                  {CLUB_PLANS[0].name}
                </h3>
                <p className="mt-2 text-sm text-white/70 font-body">{CLUB_PLANS[0].note}</p>
                <p className="mt-6 font-headline text-5xl font-black text-secondary-container">
                  {CLUB_PLANS[0].price}
                </p>
                <Link
                  to="/club/book"
                  className="mt-8 inline-flex w-full items-center justify-center rounded-2xl bg-secondary-container px-5 py-4 text-center font-headline text-lg font-black uppercase tracking-tight text-on-secondary-container transition hover:bg-yellow-400"
                >
                  Claim And Book
                </Link>
              </div>
            )}
          </aside>
        </div>
      </section>
    </main>
  )
}
