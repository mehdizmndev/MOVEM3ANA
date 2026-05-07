import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import { clubs as clubsApi } from '../services/api'

const SPORTS = [
  { icon: 'sports_soccer',     label: 'Football' },
  { icon: 'sports_tennis',     label: 'Tennis' },
  { icon: 'fitness_center',    label: 'Fitness' },
  { icon: 'pool',              label: 'Natation' },
  { icon: 'sports_basketball', label: 'Basketball' },
  { icon: 'self_improvement',  label: 'Yoga' },
]

const PLACEHOLDER_IMAGES = [
  'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1576610616656-d3aa5d1f4534?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?q=80&w=600&auto=format&fit=crop',
]

function ClubCard({ club, imgIndex }) {
  const img = club.logo || PLACEHOLDER_IMAGES[imgIndex % PLACEHOLDER_IMAGES.length]
  const rating = club.average_rating || 0

  return (
    <div className="group min-w-[280px] shrink-0 sm:min-w-[340px] xl:min-w-[400px] snap-start">
      <div className="bg-surface-container-lowest rounded-2xl overflow-hidden border-b-8 border-primary-container transition-transform group-hover:-translate-y-2 shadow-sm group-hover:shadow-xl">
        <div className="h-64 relative overflow-hidden">
          <img
            src={img}
            alt={club.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            onError={(e) => { e.target.src = PLACEHOLDER_IMAGES[0] }}
          />
          {club.is_approved && (
            <div className="absolute top-4 right-4 bg-primary-container text-white font-bold px-3 py-1 rounded-lg text-sm uppercase font-headline">
              Vérifié
            </div>
          )}
        </div>
        <div className="p-6">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-headline text-2xl font-bold uppercase tracking-tight text-on-surface">{club.name}</h3>
            <div className="flex items-center gap-1 text-secondary">
              <Icon name="star" fill={1} size={20} />
              <span className="font-bold">{rating > 0 ? rating.toFixed(1) : 'N/A'}</span>
            </div>
          </div>
          <p className="text-on-surface-variant text-sm mb-2 flex items-center gap-2">
            <Icon name="location_on" size={18} />
            {club.address || club.city || 'Tanger'}
          </p>
          <p className="text-on-surface-variant text-xs mb-4 flex items-center gap-2">
            <Icon name="sports" size={16} />
            {club.sport} {club.tarifs ? `• ${club.tarifs}` : ''}
          </p>
          <Link
            to={`/club/${club.id}`}
            className="block w-full py-4 bg-surface-container-high rounded-xl font-headline font-bold uppercase text-center hover:bg-primary-container hover:text-white transition-all text-on-surface"
          >
            Voir le Club
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
  const [clubsList, setClubsList] = useState([])
  const [loadingClubs, setLoadingClubs] = useState(true)
  const clubsScrollerRef = useRef(null)

  // Fetch clubs from API
  useEffect(() => {
    setLoadingClubs(true)
    clubsApi.index()
      .then(res => {
        const data = res.data?.data || res.data || []
        setClubsList(Array.isArray(data) ? data : [])
      })
      .catch(err => {
        console.error('Failed to load clubs:', err)
        setClubsList([])
      })
      .finally(() => setLoadingClubs(false))
  }, [])

  const filteredClubs = selectedSport 
    ? clubsList.filter(c => c.sport?.toLowerCase().includes(selectedSport.toLowerCase())) 
    : clubsList;

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
      <section className="relative h-[calc(100vh-72px)] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1920&auto=format&fit=crop"
            alt="Sports Hero"
            className="w-full h-full object-cover brightness-[0.4]"
          />
        </div>
        <div className="relative z-10 text-center px-4 max-w-5xl">
          <p className="mb-4 font-body text-sm font-bold uppercase tracking-[0.35em] text-white/80 md:text-base">
            Votre communauté sportive commence ici
          </p>
          <h1 className="font-headline text-6xl md:text-9xl font-black text-white leading-[0.9] tracking-tighter uppercase italic mb-8 drop-shadow-2xl">
            Move Smarter,<br />
            <span className="text-primary-container">Play M3ANA</span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-base text-white/85 md:text-xl font-body">
            MOVE M3ANA vous aide à découvrir des clubs, comparer des activités, et réserver votre prochaine séance en quelques secondes.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <Link
              to="/map"
              className="bg-primary-container text-white font-headline text-2xl font-bold px-10 py-5 rounded-2xl hover:bg-primary transition-all active:scale-95 flex items-center gap-2 uppercase tracking-tight shadow-lg"
            >
              Explorer les Clubs
              <Icon name="arrow_forward" size={24} />
            </Link>
            <Link
              to="/map"
              className="backdrop-blur-md bg-white/10 text-white font-headline text-2xl font-bold px-10 py-5 rounded-2xl hover:bg-white/20 transition-all active:scale-95 border border-white/20 uppercase tracking-tight"
            >
              Voir la Carte
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
                Catégories
              </span>
              <h2 className="font-headline text-5xl font-black uppercase tracking-tighter text-on-surface dark:text-stone-100">
                Sports Populaires
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
              Clubs à la Une
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
            {loadingClubs ? (
              // Loading skeletons
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="min-w-[280px] sm:min-w-[340px] xl:min-w-[400px] snap-start">
                  <div className="bg-surface-container-lowest rounded-2xl overflow-hidden border-b-8 border-primary-container/20 shadow-sm animate-pulse">
                    <div className="h-64 bg-stone-200 dark:bg-stone-700" />
                    <div className="p-6 space-y-3">
                      <div className="h-6 bg-stone-200 dark:bg-stone-700 rounded w-3/4" />
                      <div className="h-4 bg-stone-200 dark:bg-stone-700 rounded w-1/2" />
                      <div className="h-12 bg-stone-200 dark:bg-stone-700 rounded" />
                    </div>
                  </div>
                </div>
              ))
            ) : filteredClubs.length > 0 ? (
              filteredClubs.map((club, i) => <ClubCard key={club.id} club={club} imgIndex={i} />)
            ) : (
              <div className="py-12 w-full text-center text-on-surface-variant font-headline text-xl">
                {selectedSport ? `Aucun club trouvé pour ${selectedSport}.` : 'Aucun club disponible.'}
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
                Offres Limitées
              </span>
              <h2 className="font-headline text-7xl font-black uppercase tracking-tighter leading-none mb-6 text-on-surface dark:text-stone-100">
                Nos<br />
                <span className="text-primary-container">Promotions</span>
              </h2>
              <p className="text-lg text-on-surface-variant dark:text-stone-400 mb-8 max-w-md font-body">
                Accédez à des offres exclusives dans les meilleurs clubs sportifs de Tanger. Rejoignez MOVE M3ANA aujourd'hui.
              </p>
              <Link to="/pricing" className="w-fit bg-on-surface dark:bg-stone-100 text-surface dark:text-stone-900 font-headline text-xl font-bold px-8 py-4 rounded-xl hover:bg-primary-container hover:text-white transition-colors uppercase">
                Voir les Offres
              </Link>
            </div>

            {/* Right cards */}
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Promo 1 */}
              <div className="relative bg-secondary-container rounded-2xl p-8 overflow-hidden group">
                <span className="absolute -right-8 -top-8 font-headline text-9xl font-black opacity-10 text-on-surface">25%</span>
                <div className="relative z-10">
                  <span className="bg-black text-white text-[10px] font-bold px-2 py-1 rounded mb-4 inline-block uppercase tracking-widest font-body">
                    Code Promo: FIRST25
                  </span>
                  <h3 className="font-headline text-3xl font-black uppercase tracking-tighter mb-2 text-on-surface">
                    Première Séance
                  </h3>
                  <p className="text-on-secondary-container mb-6 font-medium font-body text-sm">
                    -25% sur votre première réservation dans n'importe quel club partenaire.
                  </p>
                  <Link to="/auth?tab=signup" className="text-on-surface font-bold underline underline-offset-4 decoration-2 hover:text-primary-container transition-colors font-body">
                    Profiter de l'Offre
                  </Link>
                </div>
              </div>

              {/* Promo 2 */}
              <div className="relative bg-primary-container rounded-2xl p-8 overflow-hidden text-white group">
                <span className="absolute -right-8 -top-8 font-headline text-9xl font-black opacity-10">VIP</span>
                <div className="relative z-10">
                  <span className="bg-white text-primary-container text-[10px] font-bold px-2 py-1 rounded mb-4 inline-block uppercase tracking-widest font-body">
                    Membre Saisonnier
                  </span>
                  <h3 className="font-headline text-3xl font-black uppercase tracking-tighter mb-2">
                    Pass Été
                  </h3>
                  <p className="text-white/80 mb-6 font-medium font-body text-sm">
                    Accès illimité natation &amp; fitness tout l'été.
                  </p>
                  <Link to="/pricing" className="text-white font-bold underline underline-offset-4 decoration-2 hover:text-yellow-200 transition-colors font-body">
                    En Savoir Plus
                  </Link>
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
            Comment ça Marche
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
            {/* connector */}
            <div className="hidden md:block absolute top-1/4 left-1/4 right-1/4 h-0.5 border-t-2 border-dashed border-outline-variant/30" />

            {[
              { icon: 'search',             title: 'Chercher',  desc: 'Trouvez le sport, le club ou l\'installation parfait selon votre localisation.',         bg: 'bg-primary-container', color: 'text-white', rotate: 'rotate-3 group-hover:rotate-6', to: '/map'  },
              { icon: 'calendar_month',     title: 'Réserver',    desc: 'Sélectionnez votre créneau horaire et complétez votre réservation en quelques secondes.',               bg: 'bg-secondary-container', color: 'text-on-secondary-container', rotate: '-rotate-3 group-hover:-rotate-6', to: '/map' },
              { icon: 'sports_and_outdoors',title: 'Jouer',    desc: 'Présentez-vous, scannez votre pass digital, et profitez de votre session.',    bg: 'bg-on-surface dark:bg-stone-200', color: 'text-surface dark:text-stone-900', rotate: 'rotate-6 group-hover:rotate-12', to: '/map'  },
            ].map(({ icon, title, desc, bg, color, rotate, to }) => (
              <Link key={title} to={to} className="relative group block">
                <div className={`w-24 h-24 ${bg} rounded-3xl mx-auto mb-8 flex items-center justify-center ${rotate} transition-transform`}>
                  <Icon name={icon} size={48} className={color} />
                </div>
                <h3 className="font-headline text-3xl font-bold uppercase tracking-tight mb-4 text-on-surface dark:text-stone-100">{title}</h3>
                <p className="text-on-surface-variant dark:text-stone-400 max-w-xs mx-auto font-body">{desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Club CTA ── */}
      <section className="py-24 bg-primary text-white">
        <div className="max-w-screen-2xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-2xl">
            <h2 className="font-headline text-5xl md:text-7xl font-black uppercase tracking-tighter italic leading-none mb-6">
              Propulsez Votre Club
            </h2>
            <p className="text-xl text-white/80 font-body">
              Rejoignez les meilleurs centres sportifs de Tanger et simplifiez votre gestion au quotidien.
            </p>
          </div>
          <Link to="/auth?tab=signup&role=club" className="whitespace-nowrap bg-white text-primary font-headline text-3xl font-black uppercase tracking-tighter px-12 py-6 rounded-2xl hover:bg-stone-100 transition-all active:scale-95 shadow-2xl">
            Lancer Mon Club
          </Link>
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
