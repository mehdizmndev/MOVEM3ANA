import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Map as PigeonMap, Overlay } from 'pigeon-maps'
import Icon from '../components/Icon'

const defaultCenter = [35.7595, -5.8340]

const CHIPS = ['Tennis', 'Padel', 'Basketball', 'Swimming', 'Yoga']

const RESULTS = [
  {
    id: 1,
    name: 'Vantage Tennis Club',
    dist: '1.2 km',
    area: 'Tangier City Center',
    rating: '4.9',
    price: '$45',
    tags: ['Indoor', 'Clay'],
    top: true,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5Lrm9jJVB6fc-5X_BhTJlsKyEOKy-JyISk_H20PkWnMU4kV2F3Eh8wuLihFtDno5Jh-A3vKYMNDcU3lip5dJpNg12IEloO9rUIQbNR5wBneaGQvF2sftRuoOAAMXY7IVEjeHDY9mbXxx-sd7DjerL7OYiiBd7hA8WsF_D92f09HvMZdukfdqBcr4vWqpmxWGURP97mg8T3PBsI3_Zh1nnS-46az2uFXAykJDjcuLTnWQCh-Li3ob_7jkxNUGYhl4ty1zgDsct35Q',
    sports: ['Tennis', 'Yoga'],
    lat: 35.7600,
    lng: -5.8000
  },
  {
    id: 2,
    name: 'Grand Slam Arena',
    dist: '3.5 km',
    area: 'Malabata',
    rating: '4.7',
    price: '$30',
    tags: ['Outdoor', 'Hard Court'],
    top: false,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzdKAaMVhqUOc8sinNfDbIKz40llBjUIIklO4eZYBRvksLuZzX9Om_FOxmF0cLM0wMWkCtiBIr3j7DFZZJegZyPRScVMjjmgcDg4Zp_QTrTHAuSx3ZSEvzcyY9dceLDYafP1HosEbYZXMBkeWZFEozG-T4_U53DRR57NfR82smwroEeIRgl5sv5ldduezEpIaPf0cq6j6o-oevCqhV1JHbX289d1E-8uoMgrwB_cAQhzi0jPcfgfF078v4cNSsr7TkJwG1GIEDpAE',
    sports: ['Tennis', 'Basketball'],
    lat: 35.7750,
    lng: -5.7800
  },
  {
    id: 3,
    name: 'Padel Point',
    dist: '4.1 km',
    area: 'Boubana',
    rating: '4.8',
    price: '$25',
    tags: ['Padel', 'Social Hub'],
    top: false,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC640T0Ed-W9LLs17UExv_7aYE5Mr2y1FErbfcZxy7HSg0dBkGf3E7WDdaJhbPovfX9Fbu-na96-y3L8oNKvvJCaTUDP-4URsemuOVIsOD4rNfQ4MKOiQw3iB2GgncCreguUArDyAOtM3YYyJRtpW-HhnMtWxLV9MPMsl6STcKo5wJdRSsRC-MUjbZdV-e3u4o1hQw3dFqnS1QvrMlYi1Nm4XcvEZX31Ib5OTC61d8pGVpv_zP9dpy2WjxGYDwfn6-S1M11pfC6sKg',
    sports: ['Padel', 'Swimming'],
    lat: 35.7500,
    lng: -5.8450
  },
  {
    id: 4,
    name: 'Harbor Courts Club',
    dist: '2.8 km',
    area: 'Tangier Marina',
    rating: '3.2',
    price: '$18',
    tags: ['Outdoor', 'Budget Friendly'],
    top: false,
    img: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=1200&q=80',
    sports: ['Tennis', 'Yoga'],
    lat: 35.7890,
    lng: -5.8120
  },
]

function ResultCard({ result }) {
  const { name, dist, area, rating, price, tags, top, img } = result
  const [hov, setHov] = useState(false)

  return (
    <div
      className={`group relative flex flex-col bg-surface-container-lowest dark:bg-stone-800 rounded-2xl overflow-hidden transition-all duration-300 border ${hov ? 'border-primary-container/40 shadow-2xl shadow-primary/5' : 'border-transparent dark:border-stone-700'}`}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div className="h-32 w-full overflow-hidden relative">
        <img
          src={img}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        {top && (
          <div className="absolute top-3 left-3 px-3 py-1 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-full font-headline">
            Top Rated
          </div>
        )}
      </div>
      <div className="p-4 space-y-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg leading-tight text-on-surface dark:text-stone-100 font-body">{name}</h3>
            <p className="text-xs text-on-surface-variant dark:text-stone-400 flex items-center gap-1 font-body">
              <Icon name="location_on" size={12} />
              {dist} away • {area}
            </p>
          </div>
          <div className="flex items-center gap-1 bg-secondary-container/20 px-2 py-1 rounded-lg">
            <Icon name="star" fill={1} size={12} className="text-secondary dark:text-yellow-400" />
            <span className="text-xs font-bold text-secondary dark:text-yellow-400 font-body">{rating}</span>
          </div>
        </div>
        <div className="flex gap-2 py-1">
          {tags.map(tag => (
            <span key={tag} className="text-[10px] px-2 py-0.5 rounded-md bg-surface-container-high dark:bg-stone-700 text-on-surface-variant dark:text-stone-400 font-bold uppercase font-body">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-surface-container dark:border-stone-700">
          <span className="text-sm font-bold text-primary font-body">{price} / hr</span>
          <Link
            to="/club"
            className="px-4 py-1.5 bg-on-surface dark:bg-stone-200 text-surface dark:text-stone-900 text-xs font-bold rounded-lg hover:bg-primary-container hover:text-white transition-colors active:scale-95 font-body"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function MapPage() {
  const [activeChip, setActiveChip] = useState('Tennis')
  const [mobileView, setMobileView] = useState('list')
  const [distance, setDistance] = useState(12)
  const [minRating, setMinRating] = useState(0)
  const [selectedPinId, setSelectedPinId] = useState(1)

  const filteredResults = RESULTS.filter(r => {
    const matchSport = activeChip ? r.sports.includes(activeChip) : true;
    const matchRating = parseFloat(r.rating) >= minRating;
    return matchSport && matchRating;
  });

  const mapZoom = 15 - Math.floor(distance / 5);

  const selectedClub = RESULTS.find(r => r.id === selectedPinId);

  return (
    <div className="pt-[60px] flex h-screen overflow-hidden bg-surface dark:bg-stone-950 font-body">

      {/* ── Left panel ── */}
      <aside className={`${mobileView === 'map' ? 'hidden md:flex' : 'flex'} w-full md:w-[420px] lg:w-[480px] h-full flex-col bg-surface-container-low dark:bg-stone-900 border-r border-outline-variant/10 dark:border-stone-800 z-10 shadow-xl overflow-hidden`}>
        {/* Filters */}
        <div className="p-6 space-y-6 bg-surface-container dark:bg-stone-800 shadow-sm">
          {/* Search */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant dark:text-stone-400">Location Search</label>
            <div className="relative group">
              <Icon name="my_location" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" />
              <input
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-surface-container-lowest dark:bg-stone-700 border-none focus:ring-2 focus:ring-primary/20 text-sm placeholder:text-stone-400 shadow-sm transition-all text-on-surface dark:text-stone-100"
                placeholder="Enter city or zip code..."
                type="text"
              />
            </div>
          </div>

          {/* Sport chips */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant dark:text-stone-400">Activity Type</label>
            <div className="flex flex-wrap gap-2">
              {CHIPS.map(c => (
                <button
                  key={c}
                  onClick={() => setActiveChip(activeChip === c ? null : c)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                    activeChip === c
                      ? 'bg-primary-container text-white border border-primary/20'
                      : 'bg-surface-container-high dark:bg-stone-700 text-on-surface-variant dark:text-stone-400 hover:bg-surface-container-highest dark:hover:bg-stone-600 border border-transparent'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Distance & rating */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant dark:text-stone-400">Distance: {distance}km</label>
              <input 
                className="w-full accent-primary-container h-1.5 bg-surface-container-highest dark:bg-stone-600 rounded-full appearance-none cursor-pointer" 
                type="range" 
                min="1" 
                max="25" 
                value={distance} 
                onChange={e => setDistance(Number(e.target.value))} 
              />
              <div className="flex justify-between text-[10px] font-bold text-stone-500">
                <span>1km</span><span>25km</span>
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant dark:text-stone-400">Min. Rating</label>
              <div className="flex items-center gap-0.5">
                {[1,2,3,4,5].map(i => (
                  <button 
                    key={i} 
                    onClick={() => setMinRating(minRating === i ? 0 : i)} 
                    className="transition-transform hover:scale-125 active:scale-95 outline-none"
                    aria-label={`Minimum rating ${i} stars`}
                  >
                    <Icon 
                      name="star" 
                      fill={i <= (minRating || 4) && minRating !== 0 ? 1 : (minRating === 0 && i <= 4 ? 1 : 0)} 
                      size={20}
                      className={i <= minRating ? 'text-yellow-400' : (minRating === 0 && i <= 4 ? 'text-yellow-400/50' : 'text-outline-variant dark:text-stone-700')} 
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results list */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 hide-scrollbar">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-headline font-extrabold text-xl tracking-tight uppercase text-on-surface dark:text-stone-100">
              {filteredResults.length} Results Near You
            </h2>
            <span className="text-xs text-primary font-bold">Sort by: Relevance</span>
          </div>
          {filteredResults.length > 0 ? (
            filteredResults.map(r => <ResultCard key={r.id} result={r} />)
          ) : (
            <div className="py-8 text-center text-on-surface-variant font-headline">
              No results found for {activeChip}.
            </div>
          )}
        </div>
      </aside>

      {/* ── Map panel ── */}
      <section className={`${mobileView === 'list' ? 'hidden md:block' : 'block'} flex-1 relative bg-stone-200 dark:bg-stone-900`}>
        <PigeonMap
          defaultCenter={defaultCenter}
          zoom={mapZoom}
          provider={(x, y, z) => `https://mt1.google.com/vt/lyrs=m&x=${x}&y=${y}&z=${z}`}
        >
          {filteredResults.map(({ id, lat, lng, name }) => {
            const active = id === selectedPinId;
            return (
              <Overlay key={id} anchor={[lat, lng]} offset={[0, 0]}>
                <div 
                  onClick={() => setSelectedPinId(id)}
                  className="absolute flex flex-col items-center group cursor-pointer z-20 transition-all duration-300" 
                  style={{ transform: 'translate(-50%, -100%)' }}
                >
                  <div className={`relative flex items-center justify-center w-12 h-12 shadow-2xl transition-all duration-300 rounded-[50%_50%_50%_0] -rotate-45 group-hover:-translate-y-2 group-hover:scale-110 border-[3px] ${
                    active 
                      ? 'bg-primary text-white border-white scale-110 z-10 shadow-primary/40' 
                      : 'bg-surface dark:bg-stone-800 text-on-surface dark:text-stone-300 hover:bg-primary hover:text-white hover:border-white border-primary shadow-black/20'
                    }`}
                  >
                    <div className="rotate-45">
                      <Icon name="sports_tennis" fill={1} size={24} />
                    </div>
                  </div>
                  {active && (
                    <div className="absolute top-[56px] bg-on-surface dark:bg-stone-800 text-white text-xs px-4 py-2 rounded-xl font-bold shadow-2xl whitespace-nowrap z-30">
                      {name}
                    </div>
                  )}
                </div>
              </Overlay>
            );
          })}
        </PigeonMap>

        {/* Map controls */}
        <div className="absolute top-6 right-6 flex flex-col gap-3">
          {['add', 'remove', 'layers'].map(ic => (
            <button
              key={ic}
              className="w-12 h-12 bg-surface-container-lowest dark:bg-stone-800 rounded-xl shadow-xl flex items-center justify-center text-on-surface dark:text-stone-100 hover:text-primary-container transition-colors border border-stone-100 dark:border-stone-700"
            >
              <Icon name={ic} size={22} />
            </button>
          ))}
        </div>

        {/* Summary card */}
        {selectedClub && (
          <div className="absolute bottom-12 right-12 bg-surface-container-lowest/90 dark:bg-stone-800/90 backdrop-blur-xl p-6 rounded-3xl shadow-2xl max-w-sm border border-white/40 dark:border-stone-700">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl overflow-hidden bg-primary-container/20 flex flex-shrink-0 items-center justify-center text-primary-container">
                  <img src={selectedClub.img} alt={selectedClub.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-headline font-black text-xl uppercase italic leading-none text-on-surface dark:text-stone-100">{selectedClub.name}</h4>
                  <p className="text-[10px] text-stone-500 font-bold uppercase tracking-widest mt-1 font-body">
                    {selectedClub.rating} ★ • {selectedClub.price}/hr
                  </p>
                </div>
              </div>
              <p className="text-xs text-on-surface-variant dark:text-stone-400 leading-relaxed font-body">
                Located in {selectedClub.area}. {selectedClub.dist} away. Known for {selectedClub.tags.join(' and ')}.
              </p>
              <Link
                to="/club"
                className="block w-full py-3 bg-primary text-white font-black uppercase tracking-tighter rounded-xl hover:bg-primary-container transition-colors shadow-lg shadow-primary/30 text-center font-headline"
              >
                Book Now
              </Link>
            </div>
          </div>
        )}
      </section>

      {/* Mobile toggle */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] flex items-center bg-on-surface dark:bg-stone-800 text-white rounded-full p-1 shadow-2xl border border-white/10">
        {['list', 'map'].map(v => (
          <button
            key={v}
            onClick={() => setMobileView(v)}
            className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all font-body ${mobileView === v ? 'bg-primary-container' : ''}`}
          >
            {v.charAt(0).toUpperCase() + v.slice(1)}
          </button>
        ))}
      </div>
    </div>
  )
}
