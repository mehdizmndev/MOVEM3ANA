import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import Icon from '../components/Icon'
import { clubs as clubsApi, events as eventsApi } from '../services/api'
import { useAuth } from '../context/AuthContext'

const HERO_PH = 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop'

export default function ClubEventsPage() {
  const { id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [club, setClub] = useState(null)
  const [evts, setEvts] = useState([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(null) // ID of event being processed

  const fetchData = async () => {
    try {
      const [cR, eR] = await Promise.all([
        clubsApi.show(id).catch(() => null),
        eventsApi.byClub(id).catch(() => null),
      ])
      setClub(cR?.data?.data || cR?.data || null)
      const e = eR?.data?.data || []
      setEvts(Array.isArray(e) ? e : [])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [id])

  const handleEnroll = async (eventId) => {
    if (!user) {
      navigate('/auth')
      return
    }

    try {
      setActionLoading(eventId)
      await eventsApi.enroll(eventId)
      await fetchData() // Refresh data
    } catch (err) {
      alert(err.response?.data?.message || 'Erreur lors de l\'inscription.')
    } finally {
      setActionLoading(null)
    }
  }

  const handleCancel = async (eventId) => {
    try {
      setActionLoading(eventId)
      await eventsApi.cancel(eventId)
      await fetchData()
    } catch (err) {
      alert('Erreur lors de l\'annulation.')
    } finally {
      setActionLoading(null)
    }
  }

  if (loading) return <main className="min-h-screen flex items-center justify-center"><div className="w-16 h-16 border-4 border-primary-container border-t-transparent rounded-full animate-spin" /></main>
  if (!club) return <main className="min-h-screen flex items-center justify-center flex-col gap-4"><Icon name="error" size={64} className="text-red-400" /><h2 className="font-headline text-3xl font-black uppercase">Club introuvable</h2><Link to="/map" className="text-primary-container font-bold underline">Retour</Link></main>

  const hero = club.logo || HERO_PH

  return (
    <main className="min-h-screen bg-background pb-20 dark:bg-stone-950">
      <section className="max-w-screen-2xl mx-auto px-6">
        <div className="overflow-hidden rounded-[2rem] border border-outline-variant/10 bg-surface-container-lowest shadow-sm dark:border-stone-800 dark:bg-stone-900">
          <div className="relative min-h-[360px] overflow-hidden">
            <img src={hero} alt={club.name} className="absolute inset-0 h-full w-full object-cover" onError={e=>{e.target.src=HERO_PH}} />
            <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/70 to-stone-950/20" />
            <div className="relative z-10 flex min-h-[360px] flex-col justify-end gap-6 px-8 py-10 md:px-12">
              <Link to={`/club/${id}`} className="inline-flex w-fit items-center gap-2 text-sm font-bold uppercase tracking-widest text-white/80 hover:text-white font-body"><Icon name="arrow_back" size={16} /> Retour au Club</Link>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-primary-container px-3 py-1 text-xs font-bold uppercase tracking-widest text-white font-headline">Événements</span>
                <span className="rounded-full bg-secondary-container px-3 py-1 text-xs font-bold uppercase tracking-widest text-on-secondary-container font-headline">{club.sport}</span>
              </div>
              <h1 className="font-headline text-5xl font-black uppercase tracking-tighter text-white md:text-7xl">Événements — {club.name}</h1>
            </div>
          </div>
          <div className="grid gap-4 border-t border-outline-variant/10 bg-surface px-6 py-6 dark:border-stone-800 dark:bg-stone-950 md:grid-cols-3 md:px-10">
            {[{icon:'event',label:'Total Événements',value:`${evts.length}`},{icon:'schedule',label:'Horaires',value:club.horaires||'—'},{icon:'location_on',label:'Adresse',value:club.address||club.city}].map(({icon,label,value})=>(
              <div key={label} className="rounded-2xl bg-surface-container-low p-4 dark:bg-stone-900">
                <Icon name={icon} size={22} className="mb-3 text-primary-container" />
                <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant font-body">{label}</p>
                <p className="mt-1 text-lg font-black uppercase tracking-tight text-on-surface dark:text-stone-100 font-headline">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 xl:grid-cols-[1.2fr_0.8fr]">
          <section className="space-y-6">
            {evts.length > 0 ? evts.map(ev => (
              <article key={ev.id} className="rounded-[2rem] border border-outline-variant/10 bg-surface-container-lowest p-6 shadow-sm dark:border-stone-800 dark:bg-stone-900 md:p-8">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                  <div className="max-w-2xl">
                    <div className="mb-5 flex items-center gap-3">
                      <div className="rounded-2xl bg-primary-container/10 p-4"><Icon name="event" size={26} className="text-primary-container" /></div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-primary-container font-body">Événement</p>
                        <h2 className="font-headline text-3xl font-black uppercase tracking-tight text-on-surface dark:text-stone-100">{ev.title}</h2>
                      </div>
                    </div>
                    <p className="text-base leading-relaxed text-on-surface-variant dark:text-stone-400 font-body">{ev.description}</p>
                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      <div className="rounded-2xl bg-surface-container-low p-4 dark:bg-stone-800">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant font-body">Date</p>
                        <p className="mt-1 text-lg font-bold text-on-surface dark:text-stone-100 font-body">{ev.date ? new Date(ev.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : 'À venir'}</p>
                      </div>
                      <div className="rounded-2xl bg-surface-container-low p-4 dark:bg-stone-800">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant font-body">Lieu</p>
                        <p className="mt-1 text-lg font-bold text-on-surface dark:text-stone-100 font-body">{ev.location || club.address || 'À confirmer'}</p>
                      </div>
                    </div>
                  </div>
                  <div className="w-full max-w-sm rounded-[1.5rem] bg-surface p-5 dark:bg-stone-950">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant font-body">Disponibilité</p>
                    <div className="mt-1 flex items-center justify-between">
                      <p className={`font-headline text-2xl font-black uppercase tracking-tight ${ev.is_sold_out ? 'text-red-500' : 'text-on-surface dark:text-stone-100'}`}>
                        {ev.is_sold_out ? 'Complet' : ev.capacity ? `${ev.available_slots} / ${ev.capacity} places` : 'Illimité'}
                      </p>
                      {ev.is_enrolled && (
                        <span className="flex items-center gap-1 text-[10px] font-black uppercase text-green-500 bg-green-500/10 px-2 py-0.5 rounded-full">
                          <Icon name="check_circle" size={12} /> Inscrit
                        </span>
                      )}
                    </div>
                    
                    {ev.is_enrolled ? (
                      <button 
                        disabled={actionLoading === ev.id}
                        onClick={() => handleCancel(ev.id)}
                        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-red-500 px-5 py-4 text-center font-headline text-lg font-black uppercase tracking-tight text-red-500 hover:bg-red-500 hover:text-white transition-all disabled:opacity-50"
                      >
                        {actionLoading === ev.id ? 'Chargement...' : 'Annuler l\'inscription'}
                      </button>
                    ) : (
                      <button 
                        disabled={ev.is_sold_out || actionLoading === ev.id}
                        onClick={() => handleEnroll(ev.id)}
                        className={`mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-4 text-center font-headline text-lg font-black uppercase tracking-tight text-white transition-all shadow-xl disabled:opacity-50
                          ${ev.is_sold_out ? 'bg-stone-400 cursor-not-allowed shadow-none' : 'bg-primary-container hover:bg-primary shadow-primary-container/20 active:scale-[0.99]'}
                        `}
                      >
                        {actionLoading === ev.id ? 'Chargement...' : ev.is_sold_out ? 'Complet' : 'S\'inscrire'} <Icon name={ev.is_sold_out ? 'block' : 'arrow_forward'} size={18} />
                      </button>
                    )}
                  </div>
                </div>
              </article>
            )) : (
              <div className="py-16 text-center">
                <Icon name="event_busy" size={64} className="mx-auto mb-4 text-on-surface-variant/40" />
                <h3 className="font-headline text-2xl font-black uppercase mb-2 text-on-surface dark:text-stone-100">Aucun événement</h3>
                <p className="text-on-surface-variant font-body">Ce club n'a pas encore d'événements programmés.</p>
              </div>
            )}
          </section>

          <aside className="space-y-6">
            <div className="rounded-[2rem] border border-outline-variant/10 bg-surface-container-low p-8 dark:border-stone-800 dark:bg-stone-900">
              <h3 className="font-headline text-3xl font-black uppercase tracking-tight text-on-surface dark:text-stone-100">Club</h3>
              <p className="mt-4 text-sm leading-relaxed text-on-surface-variant dark:text-stone-400 font-body">{club.description || 'Aucune description.'}</p>
              <div className="mt-6 space-y-4">
                {[{icon:'call',label:'Tél.',value:club.phone||'—'},{icon:'email',label:'Email',value:club.email||'—'},{icon:'payments',label:'Tarifs',value:club.tarifs||'—'}].map(({icon,label,value})=>(
                  <div key={label} className="flex items-start gap-4 rounded-2xl bg-surface-container-lowest p-4 dark:bg-stone-800">
                    <div className="rounded-xl bg-primary-container/10 p-3"><Icon name={icon} size={20} className="text-primary-container" /></div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant font-body">{label}</p>
                      <p className="mt-1 text-sm font-semibold text-on-surface dark:text-stone-100 font-body">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}
