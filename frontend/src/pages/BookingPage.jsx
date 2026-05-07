import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Icon from '../components/Icon'
import { clubs as clubsApi, reviews as reviewsApi } from '../services/api'
import { useAuth } from '../context/AuthContext'

const today = new Date().toISOString().split('T')[0]
const TIME_SLOTS = ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00']

export default function BookingPage() {
  const { id } = useParams()
  const { user } = useAuth()
  const [club, setClub] = useState(null)
  const [revs, setRevs] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    date: today,
    time: TIME_SLOTS[0],
    description: '',
  })

  useEffect(() => {
    Promise.all([
      clubsApi.show(id).catch(() => null),
      reviewsApi.byClub(id).catch(() => null),
    ]).then(([cR, rR]) => {
      setClub(cR?.data?.data || cR?.data || null)
      const r = rR?.data?.data || []; setRevs(Array.isArray(r) ? r : [])
    }).finally(() => setLoading(false))
  }, [id])

  useEffect(() => {
    if (user) setForm(f => ({ ...f, name: user.name || '', email: user.email || '', phone: user.phone || '' }))
  }, [user])

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
  }

  if (loading) return <main className="min-h-screen flex items-center justify-center"><div className="w-16 h-16 border-4 border-primary-container border-t-transparent rounded-full animate-spin" /></main>
  if (!club) return <main className="min-h-screen flex items-center justify-center flex-col gap-4"><Icon name="error" size={64} className="text-red-400" /><h2 className="font-headline text-3xl font-black uppercase">Club introuvable</h2><Link to="/map" className="text-primary-container font-bold underline">Retour</Link></main>

  if (submitted) return (
    <main className="pb-20 bg-background dark:bg-stone-950 min-h-screen flex items-center justify-center">
      <div className="text-center max-w-md mx-auto">
        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6"><Icon name="check_circle" size={48} className="text-green-500" /></div>
        <h2 className="font-headline text-4xl font-black uppercase tracking-tighter mb-4 text-on-surface dark:text-stone-100">Réservation Envoyée!</h2>
        <p className="text-on-surface-variant mb-8 font-body">Votre demande de réservation chez {club.name} a bien été envoyée. Vous recevrez une confirmation bientôt.</p>
        <div className="flex gap-4 justify-center">
          <Link to={`/club/${id}`} className="bg-primary-container text-white px-8 py-3 rounded-xl font-headline font-bold uppercase">Retour au Club</Link>
          <Link to="/map" className="bg-surface-container-high text-on-surface px-8 py-3 rounded-xl font-headline font-bold uppercase">Explorer</Link>
        </div>
      </div>
    </main>
  )

  return (
    <main className="pb-20 bg-background dark:bg-stone-950 min-h-screen">
      <section className="max-w-screen-2xl mx-auto px-6">
        <div className="mb-10">
          <Link to={`/club/${id}`} className="mb-4 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary-container hover:underline font-body"><Icon name="arrow_back" size={16} /> Retour au Club</Link>
          <h1 className="font-headline text-5xl md:text-7xl font-black uppercase tracking-tighter text-on-background dark:text-stone-100">Réserver</h1>
          <p className="mt-3 max-w-2xl text-lg text-tertiary dark:text-stone-400 font-body">Réservez votre prochaine session chez {club.name}.</p>
        </div>

        <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1.2fr_0.8fr]">
          <section className="rounded-[2rem] border border-outline-variant/10 bg-surface-container-lowest p-8 shadow-sm dark:border-stone-800 dark:bg-stone-900 md:p-10">
            <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
              {[{icon:'location_on',label:'Lieu',value:club.address||club.city},{icon:'call',label:'Tél.',value:club.phone||'—'},{icon:'schedule',label:'Horaires',value:club.horaires||'—'}].map(({icon,label,value})=>(
                <div key={label} className="rounded-2xl bg-surface-container-low p-4 dark:bg-stone-800">
                  <Icon name={icon} size={22} className="mb-3 text-primary-container" />
                  <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant font-body">{label}</p>
                  <p className="mt-1 text-sm font-semibold text-on-surface dark:text-stone-100 font-body">{value}</p>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {[{name:'name',label:'Nom Complet',type:'text',ph:'Votre nom'},{name:'email',label:'Email',type:'email',ph:'email@exemple.com'},{name:'phone',label:'Téléphone',type:'tel',ph:'+212 6 00 00 00 00'},{name:'date',label:'Date',type:'date',min:today}].map(({name,label,type,ph,min})=>(
                <div key={name} className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant font-body">{label}</label>
                  <input name={name} type={type} value={form[name]} onChange={handleChange} placeholder={ph} min={min} required className="w-full rounded-2xl border border-outline-variant/10 bg-surface px-4 py-3 text-sm text-on-surface outline-none transition focus:border-primary-container dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100" />
                </div>
              ))}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant font-body">Créneau</label>
                <select name="time" value={form.time} onChange={handleChange} className="w-full rounded-2xl border border-outline-variant/10 bg-surface px-4 py-3 text-sm text-on-surface outline-none focus:border-primary-container dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100">
                  {TIME_SLOTS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant font-body">Description</label>
                <textarea name="description" rows="4" value={form.description} onChange={handleChange} placeholder="Précisez vos besoins..." className="w-full rounded-2xl border border-outline-variant/10 bg-surface px-4 py-3 text-sm text-on-surface outline-none focus:border-primary-container dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100" />
              </div>
              <div className="md:col-span-2">
                <button type="submit" className="w-full rounded-2xl bg-primary px-6 py-4 font-headline text-xl font-black uppercase tracking-tight text-white transition hover:bg-primary-container active:scale-[0.99]">Envoyer la Réservation</button>
              </div>
            </form>
          </section>

          <aside className="space-y-8">
            <div className="overflow-hidden rounded-[2rem] border border-outline-variant/10 bg-surface-container-lowest shadow-sm dark:border-stone-800 dark:bg-stone-900">
              <div className="space-y-4 p-6">
                <span className="rounded-full bg-primary-container px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white font-headline">{club.sport}</span>
                <h3 className="font-headline text-3xl font-black uppercase tracking-tight text-on-surface dark:text-stone-100">{club.name}</h3>
                <p className="text-sm leading-relaxed text-on-surface-variant dark:text-stone-400 font-body line-clamp-3">{club.description}</p>
              </div>
            </div>

            <div className="rounded-[2rem] border border-outline-variant/10 bg-surface-container-low p-8 dark:border-stone-800 dark:bg-stone-900">
              <h3 className="font-headline text-2xl font-black uppercase tracking-tight text-on-surface dark:text-stone-100 mb-6">Avis ({revs.length})</h3>
              <div className="space-y-6">
                {revs.slice(0,3).map(r => (
                  <article key={r.id} className="rounded-2xl bg-surface-container-lowest p-5 dark:bg-stone-800">
                    <div className="mb-3 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary-container/20 flex items-center justify-center"><Icon name="person" size={20} className="text-primary-container" /></div>
                      <div>
                        <p className="font-bold text-on-surface dark:text-stone-100 font-body">{r.user?.name||'Utilisateur'}</p>
                        <div className="flex gap-0.5 text-secondary-container">{Array.from({length:5}).map((_,i)=><Icon key={i} name="star" fill={i<(r.rating||0)?1:0} size={14} />)}</div>
                      </div>
                    </div>
                    <p className="text-sm italic text-on-surface-variant font-body">"{r.comment}"</p>
                  </article>
                ))}
                {revs.length === 0 && <p className="text-on-surface-variant text-sm font-body">Aucun avis.</p>}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}
