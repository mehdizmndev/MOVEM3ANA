import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Icon from '../components/Icon'
import { clubs as clubsApi, reviews as reviewsApi, events as eventsApi } from '../services/api'

const TABS = ['Aperçu', 'Offres', 'Événements', 'Galerie', 'Avis']
const HERO_PH = 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop'
const GAL_PH = [
  'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1576610616656-d3aa5d1f4534?q=80&w=600&auto=format&fit=crop',
]

export default function ClubPage() {
  const { id } = useParams()
  const [tab, setTab] = useState(0)
  const [club, setClub] = useState(null)
  const [revs, setRevs] = useState([])
  const [evts, setEvts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    Promise.all([
      clubsApi.show(id).catch(() => null),
      reviewsApi.byClub(id).catch(() => null),
      eventsApi.byClub(id).catch(() => null),
    ]).then(([cR, rR, eR]) => {
      setClub(cR?.data?.data || cR?.data || null)
      const r = rR?.data?.data || []; setRevs(Array.isArray(r) ? r : [])
      const e = eR?.data?.data || []; setEvts(Array.isArray(e) ? e : [])
    }).finally(() => setLoading(false))
  }, [id])

  if (loading) return (
    <main className="pt-16 min-h-screen flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-primary-container border-t-transparent rounded-full animate-spin" />
    </main>
  )
  if (!club) return (
    <main className="pt-24 min-h-screen flex items-center justify-center flex-col gap-4">
      <Icon name="error" size={64} className="text-red-400" />
      <h2 className="font-headline text-3xl font-black uppercase">Club introuvable</h2>
      <Link to="/map" className="text-primary-container font-bold underline">Retour</Link>
    </main>
  )

  const hero = club.logo || HERO_PH
  const gallery = club.images?.length > 0 ? club.images : GAL_PH

  return (
    <main>
      {/* Hero */}
      <section className="relative h-[550px] w-full overflow-hidden">
        <img src={hero} alt={club.name} className="absolute inset-0 w-full h-full object-cover" onError={e => { e.target.src = HERO_PH }} />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full px-8 pb-12 max-w-7xl mx-auto flex flex-col md:flex-row items-end justify-between gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex gap-2 flex-wrap">
              <span className="bg-primary-container text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest font-headline">{club.sport || 'Sport'}</span>
              <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest font-headline">{club.city || 'Tanger'}</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-black italic tracking-tighter text-white font-headline uppercase leading-none">{club.name}</h1>
            <div className="flex flex-wrap items-center gap-6 text-white/80 font-body">
              <div className="flex items-center gap-2"><Icon name="location_on" size={18} className="text-primary-container" /><span>{club.address || 'Tanger'}</span></div>
              <div className="flex items-center gap-2"><Icon name="star" fill={1} size={18} className="text-secondary-container" /><span className="font-bold text-white">{club.average_rating > 0 ? club.average_rating.toFixed(1) : 'N/A'}</span></div>
            </div>
          </div>
          <Link to={`/club/${id}/book`} className="bg-white text-on-surface px-8 py-4 rounded-xl font-headline uppercase font-bold tracking-tight hover:bg-surface-variant transition-colors active:scale-95 flex items-center gap-2">
            <Icon name="calendar_today" size={20} /> Réserver
          </Link>
        </div>
      </section>

      {/* Tabs */}
      <section className="sticky top-[80px] z-40 bg-surface-container-low dark:bg-stone-800 border-b border-outline-variant/10">
        <div className="max-w-7xl mx-auto px-8 flex gap-8 overflow-x-auto hide-scrollbar">
          {TABS.map((l, i) => {
            const ids = ['overview', 'offers', 'events', 'gallery', 'reviews']
            return (
              <button 
                key={l} 
                onClick={() => {
                  setTab(i)
                  const el = document.getElementById(ids[i])
                  if (el) {
                    const offset = 128 // Header (80) + Tabs height (~48)
                    const bodyRect = document.body.getBoundingClientRect().top
                    const elementRect = el.getBoundingClientRect().top
                    const elementPosition = elementRect - bodyRect
                    const offsetPosition = elementPosition - offset

                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth'
                    })
                  }
                }} 
                className={`py-6 border-b-4 font-headline uppercase font-bold tracking-tighter text-lg whitespace-nowrap transition-colors ${tab === i ? 'border-primary-container text-primary-container' : 'border-transparent text-on-surface-variant hover:text-primary-container'}`}
              >
                {l}
              </button>
            )
          })}
        </div>
      </section>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-8 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 flex flex-col gap-16">
          {/* Overview */}
          <section id="overview" className="flex flex-col gap-6 scroll-mt-32">
            <h2 className="text-4xl font-black italic tracking-tighter font-headline uppercase text-on-surface dark:text-stone-100">À Propos</h2>
            <p className="text-on-surface-variant dark:text-stone-400 text-lg leading-relaxed max-w-2xl font-body">{club.description || 'Aucune description.'}</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              {[{icon:'schedule',label:'Horaires',value:club.horaires||'—'},{icon:'call',label:'Tél.',value:club.phone||'—'},{icon:'payments',label:'Tarifs (dès)',value:club.tarifs||'—'}].map(({icon,label,value})=>(
                <div key={label} className="bg-surface-container-high dark:bg-stone-800 p-6 rounded-xl flex flex-col gap-2">
                  <Icon name={icon} size={30} className="text-primary-container" />
                  <span className="text-xs uppercase font-bold text-on-surface-variant font-body">{label}</span>
                  <span className="font-bold text-on-surface dark:text-stone-100 font-body">{value}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Offers Section */}
          <section id="offers" className="flex flex-col gap-8 scroll-mt-32">
            <h2 className="text-4xl font-black italic tracking-tighter font-headline uppercase text-on-surface dark:text-stone-100">Nos Offres</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {club.offers && club.offers.length > 0 ? club.offers.map((offer) => (
                <div key={offer.id} className="bg-surface-container-lowest dark:bg-stone-800 p-6 rounded-2xl border-2 border-primary-container/10 hover:border-primary-container transition-all flex flex-col justify-between">
                  <div>
                    <h3 className="font-headline text-xl font-bold uppercase mb-2 text-on-surface dark:text-stone-100">{offer.title}</h3>
                    <p className="text-sm text-on-surface-variant dark:text-stone-400 mb-6 font-body">{offer.description}</p>
                  </div>
                  <div className="mt-auto">
                    <span className="text-3xl font-black text-primary-container font-headline">{offer.price} DH</span>
                    <span className="text-xs font-bold text-on-surface-variant uppercase ml-1">/ {offer.period}</span>
                  </div>
                </div>
              )) : (
                <p className="col-span-3 text-on-surface-variant italic font-body">Contactez le club pour plus d'informations sur les tarifs.</p>
              )}
            </div>
          </section>

          {/* Events */}
          <section id="events" className="flex flex-col gap-8 scroll-mt-32">
            <div className="flex justify-between items-end">
              <h2 className="text-4xl font-black italic tracking-tighter font-headline uppercase text-on-surface dark:text-stone-100">Événements</h2>
              <Link to={`/club/${id}/events`} className="text-primary-container font-bold uppercase text-sm flex items-center gap-1 hover:underline font-body">Voir Tout <Icon name="arrow_forward" size={14} /></Link>
            </div>
            {evts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {evts.slice(0,4).map(ev => {
                  const isEnrolled = ev.is_enrolled;
                  return (
                    <div key={ev.id} className="bg-surface-container-lowest dark:bg-stone-800 p-6 rounded-2xl shadow-sm border border-outline-variant/10 hover:border-primary-container/40 transition-all">
                      <div className="flex justify-between items-start mb-4">
                        <div className="bg-primary-container/10 p-3 rounded-xl"><Icon name="event" size={22} className="text-primary-container" /></div>
                        <span className="text-sm font-bold text-primary-container">{ev.capacity !== null ? `${ev.capacity} places restantes` : ''}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-1 text-on-surface dark:text-stone-100 font-body">{ev.title}</h3>
                      <p className="text-on-surface-variant text-sm mb-4 font-body line-clamp-2">{ev.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-on-surface dark:text-stone-100 font-body">{ev.date ? new Date(ev.date).toLocaleDateString('fr-FR') : 'Bientôt'}</span>
                          <span className="text-xs text-on-surface-variant font-body">{ev.date ? new Date(ev.date).toLocaleTimeString('fr-FR', {hour: '2-digit', minute:'2-digit'}) : ''}</span>
                        </div>
                        <button 
                          onClick={async () => {
                            if (isEnrolled) return;
                            try {
                              const res = await eventsApi.enroll(ev.id);
                              alert(res.data.message);
                              // Refresh events
                              const eR = await eventsApi.byClub(id);
                              const e = eR?.data?.data || []; setEvts(Array.isArray(e) ? e : []);
                            } catch (err) {
                              alert(err.response?.data?.message || "Erreur lors de l'inscription");
                            }
                          }}
                          disabled={isEnrolled || ev.is_sold_out}
                          className={`px-5 py-2 rounded-lg font-headline font-bold uppercase text-sm transition-all ${
                            isEnrolled 
                              ? "bg-green-100 text-green-700 cursor-default" 
                              : ev.is_sold_out 
                                ? "bg-stone-200 text-stone-400 cursor-not-allowed"
                                : "bg-primary-container text-white hover:bg-primary active:scale-95"
                          }`}
                        >
                          {isEnrolled ? "Inscrit" : ev.is_sold_out ? "Complet" : "S'inscrire"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : <p className="text-on-surface-variant font-body text-center py-8">Aucun événement prévu.</p>}
          </section>

          {/* Gallery */}
          <section id="gallery" className="flex flex-col gap-8 scroll-mt-32">
            <h2 className="text-4xl font-black italic tracking-tighter font-headline uppercase text-on-surface dark:text-stone-100">Galerie</h2>
            <div className="columns-1 md:columns-2 gap-4 space-y-4">
              {gallery.map((src, i) => <img key={i} src={typeof src==='string'?src:GAL_PH[i%4]} alt={`Photo ${i+1}`} className="rounded-2xl w-full object-cover hover:scale-[1.02] transition-transform duration-300" onError={e=>{e.target.src=GAL_PH[i%4]}} />)}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="flex flex-col gap-8">
          <div className="bg-on-surface dark:bg-stone-900 text-white p-8 rounded-3xl flex flex-col gap-6 border border-white/5">
            <h4 className="text-3xl font-black italic tracking-tighter font-headline uppercase leading-none">{club.name}</h4>
            <p className="text-white/60 text-sm font-body">{club.sport} • {club.city}</p>
            <span className="text-4xl font-black font-headline text-secondary-container">{club.tarifs || 'Gratuit'}</span>
            <Link to={`/club/${id}/book`} className="bg-secondary-container text-on-secondary-container w-full py-4 rounded-xl font-headline font-bold uppercase tracking-tight hover:bg-yellow-400 transition-colors text-center">Réserver</Link>
          </div>

          <div id="reviews" className="bg-surface-container-low dark:bg-stone-800 p-8 rounded-3xl flex flex-col gap-6 scroll-mt-32">
            <h4 className="text-2xl font-black italic tracking-tighter font-headline uppercase text-on-surface dark:text-stone-100">Avis ({revs.length})</h4>
            {revs.length > 0 ? revs.slice(0,5).map(r => (
              <div key={r.id} className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-container/20 flex items-center justify-center"><Icon name="person" size={20} className="text-primary-container" /></div>
                  <div>
                    <span className="block font-bold text-sm text-on-surface dark:text-stone-100 font-body">{r.user?.name||'Utilisateur'}</span>
                    <div className="flex text-secondary-container gap-0.5">{Array.from({length:5}).map((_,i)=><Icon key={i} name="star" fill={i<(r.rating||0)?1:0} size={14} />)}</div>
                  </div>
                </div>
                <p className="text-on-surface-variant text-sm italic font-body">"{r.comment}"</p>
              </div>
            )) : <p className="text-on-surface-variant text-sm font-body">Aucun avis.</p>}
          </div>

          {club.email && (
            <div className="bg-surface-container dark:bg-stone-800 p-6 rounded-3xl">
              <div className="flex items-center gap-3"><Icon name="email" size={20} className="text-primary-container" /><span className="font-body text-sm font-bold text-on-surface dark:text-stone-100">{club.email}</span></div>
            </div>
          )}
        </aside>
      </div>
    </main>
  )
}
