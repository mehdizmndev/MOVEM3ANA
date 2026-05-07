import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Map as PigeonMap, Overlay } from 'pigeon-maps'
import Icon from '../components/Icon'
import { clubs as clubsApi } from '../services/api'

const defaultCenter = [35.7595, -5.8340]
const CHIPS = ['Football', 'Tennis', 'Fitness', 'Natation', 'Yoga', 'Basketball']
const PH_IMG = 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop'

function ResultCard({ club }) {
  const img = club.logo || PH_IMG
  return (
    <div className="group relative flex flex-col bg-surface-container-lowest dark:bg-stone-800 rounded-2xl overflow-hidden transition-all duration-300 border border-transparent hover:border-primary-container/40 hover:shadow-2xl hover:shadow-primary/5 dark:border-stone-700">
      <div className="h-32 w-full overflow-hidden relative">
        <img src={img} alt={club.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" onError={e=>{e.target.src=PH_IMG}} />
        {club.average_rating >= 4.5 && <div className="absolute top-3 left-3 px-3 py-1 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-full font-headline">Top Rated</div>}
      </div>
      <div className="p-4 space-y-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg leading-tight text-on-surface dark:text-stone-100 font-body">{club.name}</h3>
            <p className="text-xs text-on-surface-variant dark:text-stone-400 flex items-center gap-1 font-body">
              <Icon name="location_on" size={12} />{club.city || 'Tanger'} • {club.sport}
            </p>
          </div>
          <div className="flex items-center gap-1 bg-secondary-container/20 px-2 py-1 rounded-lg">
            <Icon name="star" fill={1} size={12} className="text-secondary dark:text-yellow-400" />
            <span className="text-xs font-bold text-secondary dark:text-yellow-400 font-body">{club.average_rating > 0 ? club.average_rating.toFixed(1) : '—'}</span>
          </div>
        </div>
        <div className="flex gap-2 py-1">
          <span className="text-[10px] px-2 py-0.5 rounded-md bg-surface-container-high dark:bg-stone-700 text-on-surface-variant font-bold uppercase font-body">{club.sport}</span>
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-surface-container dark:border-stone-700">
          <span className="text-sm font-bold text-primary font-body">{club.tarifs || 'Gratuit'}</span>
          <Link to={`/club/${club.id}`} className="px-4 py-1.5 bg-on-surface dark:bg-stone-200 text-surface dark:text-stone-900 text-xs font-bold rounded-lg hover:bg-primary-container hover:text-white transition-colors active:scale-95 font-body">Voir</Link>
        </div>
      </div>
    </div>
  )
}

export default function MapPage() {
  const [activeChip, setActiveChip] = useState(null)
  const [mobileView, setMobileView] = useState('list')
  const [distance, setDistance] = useState(12)
  const [minRating, setMinRating] = useState(0)
  const [selectedPinId, setSelectedPinId] = useState(null)
  const [allClubs, setAllClubs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    clubsApi.index().then(res => {
      const data = res.data?.data || res.data || []
      setAllClubs(Array.isArray(data) ? data : [])
      if (data.length > 0) setSelectedPinId(data[0].id)
    }).catch(() => setAllClubs([])).finally(() => setLoading(false))
  }, [])

  const filtered = allClubs.filter(c => {
    const matchSport = activeChip ? c.sport?.toLowerCase().includes(activeChip.toLowerCase()) : true
    const matchRating = (c.average_rating || 0) >= minRating
    return matchSport && matchRating
  })

  const mapZoom = 15 - Math.floor(distance / 5)
  const selected = allClubs.find(c => c.id === selectedPinId)

  return (
    <div className="flex h-[calc(100vh-72px)] overflow-hidden bg-surface dark:bg-stone-950 font-body">
      {/* Left panel */}
      <aside className={`${mobileView === 'map' ? 'hidden md:flex' : 'flex'} w-full md:w-[420px] lg:w-[480px] h-full flex-col bg-surface-container-low dark:bg-stone-900 border-r border-outline-variant/10 dark:border-stone-800 z-10 shadow-xl overflow-hidden`}>
        <div className="p-6 space-y-6 bg-surface-container dark:bg-stone-800 shadow-sm">
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant dark:text-stone-400">Recherche</label>
            <div className="relative"><Icon name="my_location" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" /><input className="w-full pl-12 pr-4 py-3 rounded-xl bg-surface-container-lowest dark:bg-stone-700 border-none focus:ring-2 focus:ring-primary/20 text-sm placeholder:text-stone-400 shadow-sm text-on-surface dark:text-stone-100" placeholder="Ville ou code postal..." type="text" /></div>
          </div>
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant dark:text-stone-400">Type de Sport</label>
            <div className="flex flex-wrap gap-2">
              {CHIPS.map(c => (
                <button key={c} onClick={() => setActiveChip(activeChip === c ? null : c)} className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${activeChip === c ? 'bg-primary-container text-white border border-primary/20' : 'bg-surface-container-high dark:bg-stone-700 text-on-surface-variant dark:text-stone-400 hover:bg-surface-container-highest border border-transparent'}`}>{c}</button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant dark:text-stone-400">Distance: {distance}km</label>
              <input className="w-full accent-primary-container h-1.5 bg-surface-container-highest dark:bg-stone-600 rounded-full appearance-none cursor-pointer" type="range" min="1" max="25" value={distance} onChange={e => setDistance(Number(e.target.value))} />
            </div>
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant dark:text-stone-400">Note Min.</label>
              <div className="flex items-center gap-0.5">
                {[1,2,3,4,5].map(i => (
                  <button key={i} onClick={() => setMinRating(minRating === i ? 0 : i)} className="transition-transform hover:scale-125 active:scale-95 outline-none">
                    <Icon name="star" fill={i <= minRating ? 1 : 0} size={20} className={i <= minRating ? 'text-yellow-400' : 'text-outline-variant dark:text-stone-700'} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 hide-scrollbar">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-headline font-extrabold text-xl tracking-tight uppercase text-on-surface dark:text-stone-100">
              {loading ? 'Chargement...' : `${filtered.length} Résultats`}
            </h2>
          </div>
          {loading ? Array.from({length:3}).map((_,i)=><div key={i} className="h-48 bg-stone-200 dark:bg-stone-700 rounded-2xl animate-pulse" />) : filtered.length > 0 ? filtered.map(c => <ResultCard key={c.id} club={c} />) : <div className="py-8 text-center text-on-surface-variant font-headline">Aucun résultat trouvé.</div>}
        </div>
      </aside>

      {/* Map */}
      <section className={`${mobileView === 'list' ? 'hidden md:block' : 'block'} flex-1 relative bg-stone-200 dark:bg-stone-900`}>
        <PigeonMap defaultCenter={defaultCenter} zoom={mapZoom} provider={(x,y,z) => `https://mt1.google.com/vt/lyrs=m&x=${x}&y=${y}&z=${z}`}>
          {filtered.filter(c => c.latitude && c.longitude).map(({ id, latitude, longitude, name }) => {
            const active = id === selectedPinId
            return (
              <Overlay key={id} anchor={[parseFloat(latitude), parseFloat(longitude)]} offset={[0, 0]}>
                <div onClick={() => setSelectedPinId(id)} className="absolute flex flex-col items-center group cursor-pointer z-20 transition-all duration-300" style={{ transform: 'translate(-50%, -100%)' }}>
                  <div className={`relative flex items-center justify-center w-12 h-12 shadow-2xl transition-all duration-300 rounded-[50%_50%_50%_0] -rotate-45 group-hover:-translate-y-2 group-hover:scale-110 border-[3px] ${active ? 'bg-primary text-white border-white scale-110 z-10 shadow-primary/40' : 'bg-surface dark:bg-stone-800 text-on-surface hover:bg-primary hover:text-white hover:border-white border-primary shadow-black/20'}`}>
                    <div className="rotate-45"><Icon name="sports_tennis" fill={1} size={24} /></div>
                  </div>
                  {active && <div className="absolute top-[56px] bg-on-surface dark:bg-stone-800 text-white text-xs px-4 py-2 rounded-xl font-bold shadow-2xl whitespace-nowrap z-30">{name}</div>}
                </div>
              </Overlay>
            )
          })}
        </PigeonMap>

        {selected && (
          <div className="absolute bottom-12 right-12 bg-surface-container-lowest/90 dark:bg-stone-800/90 backdrop-blur-xl p-6 rounded-3xl shadow-2xl max-w-sm border border-white/40 dark:border-stone-700">
            <div className="space-y-4">
              <div>
                <h4 className="font-headline font-black text-xl uppercase italic leading-none text-on-surface dark:text-stone-100">{selected.name}</h4>
                <p className="text-[10px] text-stone-500 font-bold uppercase tracking-widest mt-1 font-body">{selected.average_rating > 0 ? `${selected.average_rating.toFixed(1)} ★` : ''} • {selected.tarifs || 'Gratuit'}</p>
              </div>
              <p className="text-xs text-on-surface-variant dark:text-stone-400 leading-relaxed font-body">{selected.address || selected.city || 'Tanger'}. {selected.sport}.</p>
              <Link to={`/club/${selected.id}`} className="block w-full py-3 bg-primary text-white font-black uppercase tracking-tighter rounded-xl hover:bg-primary-container transition-colors shadow-lg shadow-primary/30 text-center font-headline">Voir le Club</Link>
            </div>
          </div>
        )}
      </section>

      {/* Mobile toggle */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] flex items-center bg-on-surface dark:bg-stone-800 text-white rounded-full p-1 shadow-2xl border border-white/10">
        {['list', 'map'].map(v => (
          <button key={v} onClick={() => setMobileView(v)} className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all font-body ${mobileView === v ? 'bg-primary-container' : ''}`}>{v === 'list' ? 'Liste' : 'Carte'}</button>
        ))}
      </div>
    </div>
  )
}
