import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../components/Icon'

const SPORTS = [
  { icon: 'sports_soccer',     label: 'Football' },
  { icon: 'sports_tennis',     label: 'Tennis' },
  { icon: 'fitness_center',    label: 'Boxing' },
  { icon: 'pool',              label: 'Swimming' },
  { icon: 'sports_basketball', label: 'Basketball' },
  { icon: 'directions_run',    label: 'Athletics' },
]

const CLUBS = [
  {
    id: 1,
    name: 'Kinetic Gym & Wellness',
    location: 'Downtown District, NY',
    rating: '4.9',
    badge: 'Elite Partner',
    badgeClass: 'bg-primary-container text-white',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhl2AdclgyMuV9_ReubJQ8kI_IG8KN1Rs8JoUU43LzcKhVGEgspy4jntmGRexSbAHpcs71tNhYLLosNboCiwx0DmctXEzabriXuu9j_vq90Tgbsl-yM4kQrlDyPPVLpp9Q8reCcoymp7zjq1yzIhED3QerpudVWVuY3ZMAOv3wHrkmQFoiE52OzFkDJGYjG7qtdnvwJTH9vgfuicDlRoLKu43cUMoZqF2yYPB4Pv-FQs_cGhEpAG5NxfFkbQXXS1Qi2llC6fGe2A0',
    sports: ['Boxing', 'Athletics'],
  },
  {
    id: 2,
    name: 'Smash Padel Arena',
    location: 'Brooklyn Heights, NY',
    rating: '4.8',
    badge: null,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSvPI1VZOyBf3HuDIhLnF_U6HBqI9_oARdmPHWlG5eQ_n6ifPAXEUOwFftJ74G8lbTeinQEV81e8mHMf1aLTKf0DhTdT4HgtyELCvh4_xw8aKiliTy5BXnN0jY-ZWnTDF5CFJms-KtF46_ffmoKepq-INi9uoV7j81bgeFlMcP9RITfWo8RR13JaOQrPCULSXgwnAQ8QGQ7pvPmL4FAXflM51SMBxMACrVWO494_qc2Q0EyWSzV7jgtUBHkWH2T2xDSbRshDQwPFA',
    sports: ['Tennis', 'Basketball'],
  },
  {
    id: 3,
    name: 'Riverside Tennis Club',
    location: 'Upper West Side, NY',
    rating: '4.7',
    badge: 'Hot Listing',
    badgeClass: 'bg-secondary-container text-on-secondary-container',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDREl3928t9QBS54nHxNv4UgoYeG8zwpZqPejogj9cR1DSIcJKodlsCdSJtHRyawvbvNFid06qLKjixp_LoV0QnNKKdBGwYudDHPGPAJHxm3kxBjVgJO6C9txDUsjQoclqXgU-MpfhWrOIrmqgW3k2Y8M0bmWbk0zHJT8i0ZQcOIH_GcOtU9kRCpV_6zxRIUSNUs0TXKeCuooSh-eSacxrvKz5sckwFyAyfLzbGxuTW9qbhuEhl9GThdxnEhv56CR2b8MrMpOUhNbU',
    sports: ['Tennis'],
  },
  {
    id: 4,
    name: 'Downtown Football Pitch',
    location: 'Lower East Side, NY',
    rating: '4.5',
    badge: null,
    img: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=600&auto=format&fit=crop',
    sports: ['Football'],
  },
  {
    id: 5,
    name: 'Aqua Center',
    location: 'Staten Island, NY',
    rating: '4.8',
    badge: 'New',
    badgeClass: 'bg-blue-600 text-white',
    img: 'https://images.unsplash.com/photo-1576610616656-d3aa5d1f4534?q=80&w=600&auto=format&fit=crop',
    sports: ['Swimming'],
  }
]

function ClubCard({ club }) {
  return (
    <div className="group min-w-[280px] shrink-0 sm:min-w-[340px] xl:min-w-[400px] snap-start">
      <div className="bg-surface-container-lowest rounded-2xl overflow-hidden border-b-8 border-primary-container transition-transform group-hover:-translate-y-2 shadow-sm group-hover:shadow-xl">
        <div className="h-64 relative overflow-hidden">
          <img
            src={club.img}
            alt={club.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {club.badge && (
            <div className={`absolute top-4 right-4 ${club.badgeClass} font-bold px-3 py-1 rounded-lg text-sm uppercase font-headline`}>
              {club.badge}
            </div>
          )}
        </div>
        <div className="p-6">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-headline text-2xl font-bold uppercase tracking-tight text-on-surface">{club.name}</h3>
            <div className="flex items-center gap-1 text-secondary">
              <Icon name="star" fill={1} size={20} />
              <span className="font-bold">{club.rating}</span>
            </div>
          </div>
          <p className="text-on-surface-variant text-sm mb-6 flex items-center gap-2">
            <Icon name="location_on" size={18} />
            {club.location}
          </p>
          <Link
            to="/club"
            className="block w-full py-4 bg-surface-container-high rounded-xl font-headline font-bold uppercase text-center hover:bg-primary-container hover:text-white transition-all text-on-surface"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function HomePage() {
  const [selectedSport, setSelectedSport] = useState(null)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)
  const clubsScrollerRef = useRef(null)

  const filteredClubs = selectedSport 
    ? CLUBS.filter(c => c.sports.includes(selectedSport)) 
    : CLUBS;

  useEffect(() => {
    const scroller = clubsScrollerRef.current

    if (!scroller) {
      return undefined
    }

    const updateScrollState = () => {
      const maxScrollLeft = scroller.scrollWidth - scroller.clientWidth
      setCanScrollPrev(scroller.scrollLeft > 4)
      setCanScrollNext(maxScrollLeft - scroller.scrollLeft > 4)
    }

    updateScrollState()
    scroller.addEventListener('scroll', updateScrollState, { passive: true })
    window.addEventListener('resize', updateScrollState)

    return () => {
      scroller.removeEventListener('scroll', updateScrollState)
      window.removeEventListener('resize', updateScrollState)
    }
  }, [filteredClubs])

  useEffect(() => {
    const scroller = clubsScrollerRef.current

    if (!scroller) {
      return
    }

    scroller.scrollTo({ left: 0, behavior: 'smooth' })
  }, [selectedSport])

  const scrollFeaturedClubs = (direction) => {
    const scroller = clubsScrollerRef.current

    if (!scroller) {
      return
    }

    const amount = Math.max(scroller.clientWidth * 0.8, 320)
    scroller.scrollBy({
      left: direction * amount,
      behavior: 'smooth',
    })
  }

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfbe7haBM79mlV_Lr6boOwG1tQrMjnoAQP0-rtEe2qiMFjC-5VXT-14jWEjfDTPKYsdh57Y09R6Dx0Brd9pkXXTrdubXvy8Z2dfSxdvUtFAYkCRM9AVhd2c9FwPIYOhDHFerSpNjWjPktgu2hmtMsiononiu2DvZpP4F_bPinJMZdMiFutn5Aq4tsu51SFqrkYIW1T6XusR9fDgBfgowekl4R93NRgCP1rEroqLQLmZITsuCQ_XMVP11EacVWYzS7YLWlvwcXTxEw"
            alt="Sports Hero"
            className="w-full h-full object-cover brightness-[0.4]"
          />
        </div>
        <div className="relative z-10 text-center px-4 max-w-5xl">
          <p className="mb-4 font-body text-sm font-bold uppercase tracking-[0.35em] text-white/80 md:text-base">
            Your sports community starts here
          </p>
          <h1 className="font-headline text-6xl md:text-9xl font-black text-white leading-[0.9] tracking-tighter uppercase italic mb-8 drop-shadow-2xl">
            Move Smarter,<br />
            <span className="text-primary-container">Play M3ANA</span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-base text-white/85 md:text-xl font-body">
            MOVE M3ANA helps you discover clubs, compare activities, and book your next session in seconds.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <Link
              to="/map"
              className="bg-primary-container text-white font-headline text-2xl font-bold px-10 py-5 rounded-2xl hover:bg-primary transition-all active:scale-95 flex items-center gap-2 uppercase tracking-tight shadow-lg"
            >
              Explore Activities
              <Icon name="arrow_forward" size={24} />
            </Link>
            <Link
              to="/map"
              className="backdrop-blur-md bg-white/10 text-white font-headline text-2xl font-bold px-10 py-5 rounded-2xl hover:bg-white/20 transition-all active:scale-95 border border-white/20 uppercase tracking-tight"
            >
              View Map
            </Link>
          </div>
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 animate-bounce-arrow">
          <Icon name="keyboard_double_arrow_down" size={40} className="text-white/60" />
        </div>
      </section>

      {/* ── Popular Sports ── */}
      <section className="py-24 bg-surface dark:bg-stone-900">
        <div className="max-w-screen-2xl mx-auto px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-primary-container dark:text-orange-500 font-bold uppercase tracking-widest text-sm mb-2 block font-body">
                Top Categories
              </span>
              <h2 className="font-headline text-5xl font-black uppercase tracking-tighter text-on-surface dark:text-stone-100">
                Popular Sports Near You
              </h2>
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            {SPORTS.map(({ icon, label }) => {
              const isSelected = selectedSport === label;
              return (
                <button
                  key={label}
                  onClick={() => setSelectedSport(isSelected ? null : label)}
                  className={`flex items-center gap-3 px-8 py-4 rounded-full border-2 transition-all group active:scale-95 ${
                    isSelected 
                      ? 'bg-primary-container border-primary-container text-white' 
                      : 'bg-surface-container-lowest dark:bg-stone-800 border-primary-container/20 hover:border-primary-container hover:bg-primary-container hover:text-white'
                  }`}
                >
                  <Icon 
                    name={icon} 
                    size={22} 
                    className={`transition-colors ${
                      isSelected ? 'text-white' : 'text-primary-container group-hover:text-white'
                    }`} 
                  />
                  <span className={`font-bold text-lg uppercase font-headline tracking-tight transition-colors ${
                    isSelected ? 'text-white' : 'text-on-surface dark:text-stone-100 group-hover:text-white'
                  }`}>
                    {label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Featured Clubs ── */}
      <section className="py-24 bg-surface-container-low dark:bg-stone-800/50 overflow-hidden">
        <div className="max-w-screen-2xl mx-auto px-8">
          <div className="flex justify-between items-end mb-12">
            <h2 className="font-headline text-5xl font-black uppercase tracking-tighter text-on-surface dark:text-stone-100">
              Featured Clubs
            </h2>
            <div className="flex gap-2">
              {[
                { icon: 'chevron_left', direction: -1, disabled: !canScrollPrev, label: 'Scroll clubs left' },
                { icon: 'chevron_right', direction: 1, disabled: !canScrollNext, label: 'Scroll clubs right' },
              ].map(({ icon, direction, disabled, label }) => (
                <button
                  key={icon}
                  type="button"
                  aria-label={label}
                  onClick={() => scrollFeaturedClubs(direction)}
                  disabled={disabled}
                  className="w-12 h-12 rounded-full bg-surface-container-highest dark:bg-stone-700 flex items-center justify-center hover:bg-primary-container hover:text-white transition-colors text-on-surface dark:text-stone-100 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-surface-container-highest disabled:hover:text-on-surface"
                >
                  <Icon name={icon} size={24} />
                </button>
              ))}
            </div>
          </div>
          <div
            ref={clubsScrollerRef}
            className="flex gap-8 overflow-x-auto hide-scrollbar pb-8 scroll-smooth snap-x snap-mandatory"
          >
            {filteredClubs.length > 0 ? (
              filteredClubs.map(club => <ClubCard key={club.id} club={club} />)
            ) : (
              <div className="py-12 w-full text-center text-on-surface-variant font-headline text-xl">
                No featured clubs found for {selectedSport}.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Promotions ── */}
      <section className="py-24 bg-surface dark:bg-stone-900 overflow-hidden">
        <div className="max-w-screen-2xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left text */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <span className="text-primary dark:text-orange-400 font-bold uppercase tracking-widest text-sm mb-4 block font-body">
                Limited Time Offers
              </span>
              <h2 className="font-headline text-7xl font-black uppercase tracking-tighter leading-none mb-6 text-on-surface dark:text-stone-100">
                Current<br />
                <span className="text-primary-container">Promotions</span>
              </h2>
              <p className="text-lg text-on-surface-variant dark:text-stone-400 mb-8 max-w-md font-body">
                Unlock exclusive access to top-tier sports facilities with our curated seasonal deals. Join MOVE M3ANA today.
              </p>
              <button className="w-fit bg-on-surface dark:bg-stone-100 text-surface dark:text-stone-900 font-headline text-xl font-bold px-8 py-4 rounded-xl hover:bg-primary-container hover:text-white transition-colors uppercase">
                View All Offers
              </button>
            </div>

            {/* Right cards */}
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Promo 1 */}
              <div className="relative bg-secondary-container rounded-2xl p-8 overflow-hidden group">
                <span className="absolute -right-8 -top-8 font-headline text-9xl font-black opacity-10 text-on-surface">25%</span>
                <div className="relative z-10">
                  <span className="bg-black text-white text-[10px] font-bold px-2 py-1 rounded mb-4 inline-block uppercase tracking-widest font-body">
                    Promo Code: FIRST25
                  </span>
                  <h3 className="font-headline text-3xl font-black uppercase tracking-tighter mb-2 text-on-surface">
                    First Match Discount
                  </h3>
                  <p className="text-on-secondary-container mb-6 font-medium font-body text-sm">
                    Get 25% off your first court booking at any participating club.
                  </p>
                  <button className="text-on-surface font-bold underline underline-offset-4 decoration-2 hover:text-primary-container transition-colors font-body">
                    Claim Offer
                  </button>
                </div>
              </div>

              {/* Promo 2 */}
              <div className="relative bg-primary-container rounded-2xl p-8 overflow-hidden text-white group">
                <span className="absolute -right-8 -top-8 font-headline text-9xl font-black opacity-10">VIP</span>
                <div className="relative z-10">
                  <span className="bg-white text-primary-container text-[10px] font-bold px-2 py-1 rounded mb-4 inline-block uppercase tracking-widest font-body">
                    Seasonal Member
                  </span>
                  <h3 className="font-headline text-3xl font-black uppercase tracking-tighter mb-2">
                    Summer Pass
                  </h3>
                  <p className="text-white/80 mb-6 font-medium font-body text-sm">
                    Unlimited swimming &amp; tennis access throughout July and August.
                  </p>
                  <button className="text-white font-bold underline underline-offset-4 decoration-2 hover:text-yellow-200 transition-colors font-body">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-24 bg-surface-container-low dark:bg-stone-800/50">
        <div className="max-w-screen-2xl mx-auto px-8 text-center">
          <h2 className="font-headline text-5xl font-black uppercase tracking-tighter mb-20 text-on-surface dark:text-stone-100">
            How it works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
            {/* connector */}
            <div className="hidden md:block absolute top-1/4 left-1/4 right-1/4 h-0.5 border-t-2 border-dashed border-outline-variant/30" />

            {[
              { icon: 'search',             title: 'Search',  desc: 'Find the perfect sport, club, or facility based on your location and skill level.',         bg: 'bg-primary-container', color: 'text-white', rotate: 'rotate-3 group-hover:rotate-6'  },
              { icon: 'calendar_month',     title: 'Book',    desc: 'Select your preferred time slot and complete your secure booking in seconds.',               bg: 'bg-secondary-container', color: 'text-on-secondary-container', rotate: '-rotate-3 group-hover:-rotate-6' },
              { icon: 'sports_and_outdoors',title: 'Play',    desc: 'Show up, scan your digital pass, and enjoy your session with the MOVE M3ANA community.',    bg: 'bg-on-surface dark:bg-stone-200', color: 'text-surface dark:text-stone-900', rotate: 'rotate-6 group-hover:rotate-12'  },
            ].map(({ icon, title, desc, bg, color, rotate }) => (
              <div key={title} className="relative group">
                <div className={`w-24 h-24 ${bg} rounded-3xl mx-auto mb-8 flex items-center justify-center ${rotate} transition-transform`}>
                  <Icon name={icon} size={48} className={color} />
                </div>
                <h3 className="font-headline text-3xl font-bold uppercase tracking-tight mb-4 text-on-surface dark:text-stone-100">{title}</h3>
                <p className="text-on-surface-variant dark:text-stone-400 max-w-xs mx-auto font-body">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAB */}
      <Link
        to="/map"
        className="fixed bottom-8 right-8 w-16 h-16 bg-primary-container text-white rounded-full flex items-center justify-center shadow-[0_8px_24px_rgba(255,107,0,0.4)] hover:scale-110 active:scale-95 transition-all z-40"
      >
        <Icon name="add" fill={1} size={30} />
      </Link>
    </>
  )
}
