import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import { useAuth } from '../context/AuthContext'
import { stats as statsApi, admin as adminApi } from '../services/api'

const NAV = [
  { id: 'dashboard',  icon: 'dashboard',     label: 'Dashboard' },
  { id: 'clubs',      icon: 'groups',         label: 'All Clubs' },
  { id: 'events',     icon: 'event',          label: 'All Events' },
  { id: 'promotions', icon: 'campaign',       label: 'Promotions' },
  { id: 'analytics',  icon: 'analytics',      label: 'Analytics' },
  { id: 'settings',   icon: 'settings',       label: 'Settings' },
]

export default function AdminPage() {
  const [active, setActive] = useState('dashboard')
  const { user } = useAuth()
  const [dashData, setDashData] = useState(null)
  const [loadingStats, setLoadingStats] = useState(true)

  // Sub-page states
  const [clubs, setClubs] = useState([])
  const [events, setEvents] = useState([])
  const [promos, setPromos] = useState([])
  const [loadingItems, setLoadingItems] = useState(false)
  const [clubFilter, setClubFilter] = useState('all')
  const [eventFilter, setEventFilter] = useState('all')

  useEffect(() => {
    if (active === 'dashboard') {
      setLoadingStats(true)
      statsApi.dashboard()
        .then(res => setDashData(res.data?.data || null))
        .catch(() => setDashData(null))
        .finally(() => setLoadingStats(false))
    } else if (active === 'clubs') {
      fetchClubs()
    } else if (active === 'events') {
      fetchEvents()
    } else if (active === 'promotions') {
      fetchPromos()
    }
  }, [active, clubFilter, eventFilter])

  const fetchClubs = async () => {
    setLoadingItems(true)
    try {
      const res = await adminApi.allClubs(clubFilter === 'all' ? '' : clubFilter)
      setClubs(res.data.data || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoadingItems(false)
    }
  }

  const fetchEvents = async () => {
    setLoadingItems(true)
    try {
      const res = await adminApi.allEvents(eventFilter === 'all' ? '' : eventFilter)
      setEvents(res.data.data?.data || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoadingItems(false)
    }
  }

  const fetchPromos = async () => {
    setLoadingItems(true)
    try {
      const res = await adminApi.allPromotions()
      setPromos(res.data.data?.data || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoadingItems(false)
    }
  }

  const handleUpdateClubStatus = async (id, data) => {
    try {
      await adminApi.updateClubStatus(id, data)
      fetchClubs()
    } catch (err) {
      alert('Erreur lors de la mise à jour')
    }
  }

  const statCards = dashData ? [
    { n: '01', icon: 'groups', label: 'Total Utilisateurs', value: String(dashData.total_users || 0), badge: `${dashData.suspended_users || 0} suspendus`, badgeClass: 'text-stone-400', iconBg: 'bg-orange-100 dark:bg-orange-900/20', iconClass: 'text-orange-600' },
    { n: '02', icon: 'sports', label: 'Total Clubs', value: String(dashData.total_clubs || 0), badge: `${dashData.pending_clubs || 0} en attente`, badgeClass: 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20', iconBg: 'bg-yellow-100 dark:bg-yellow-900/20', iconClass: 'text-yellow-600' },
    { n: '03', icon: 'event', label: 'Événements', value: String(dashData.total_events || 0), badge: `${dashData.upcoming_events || 0} à venir`, badgeClass: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20', iconBg: 'bg-emerald-100 dark:bg-emerald-900/20', iconClass: 'text-emerald-600' },
    { n: '04', icon: 'star', label: 'Avis', value: String(dashData.total_reviews || 0), badge: `${dashData.total_subscriptions || 0} abonnements`, badgeClass: 'text-stone-400', iconBg: 'bg-stone-100 dark:bg-stone-700', iconClass: 'text-stone-600 dark:text-stone-300' },
  ] : []

  return (
    <div className="flex min-h-screen bg-surface dark:bg-stone-950 text-on-surface dark:text-stone-100">
      {/* Sidebar */}
      <aside className="h-[calc(100vh-72px)] w-64 fixed left-0 top-[72px] bg-stone-50/90 dark:bg-stone-900/95 backdrop-blur-2xl flex flex-col py-8 gap-2 z-30 shadow-2xl border-r border-stone-200/20 dark:border-stone-800/30">
        <div className="px-8 mb-8">
          <h1 className="text-xl font-black text-stone-900 dark:text-stone-100 font-headline uppercase tracking-tight">Admin Portal</h1>
          <p className="text-xs text-stone-500 font-medium tracking-widest uppercase font-body">MOVE M3ANA</p>
        </div>
        <nav className="flex-1 space-y-1 pr-4">
          {NAV.map(({ id: navId, icon, label }) => (
            <button key={navId} onClick={() => setActive(navId)} className={`w-full px-8 py-3 flex items-center gap-3 rounded-r-full font-body text-sm font-medium transition-all active:translate-x-1 ${active === navId ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/20' : 'text-stone-500 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-800'}`}>
              <Icon name={icon} fill={active === navId ? 1 : 0} size={20} />{label}
            </button>
          ))}
        </nav>
        <div className="px-8 mt-auto pt-8 border-t border-stone-200/50 dark:border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-stone-700 flex items-center justify-center ring-2 ring-orange-500 ring-offset-2 ring-offset-stone-50 dark:ring-offset-stone-900">
              <Icon name="person" size={20} className="text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-stone-900 dark:text-stone-100 font-body">{user?.name || 'Admin'}</p>
              <p className="text-[10px] text-stone-500 font-black uppercase tracking-tighter">{user?.role || 'admin'}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="ml-64 flex-1 relative">
        <header className="fixed top-[72px] right-0 left-64 z-20 bg-stone-50/80 dark:bg-stone-950/80 backdrop-blur-xl px-8 py-4 flex justify-between items-center border-b border-stone-200/20 dark:border-stone-800/20">
          <div className="relative">
            <Icon name="search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input className="pl-10 pr-4 py-2 bg-stone-100 dark:bg-stone-800 border-none rounded-xl text-sm text-on-surface dark:text-stone-100 focus:ring-2 focus:ring-orange-500 w-64 placeholder:text-stone-400 font-body" placeholder="Rechercher..." type="text" />
          </div>
          <div className="flex items-center gap-6">
            <Link to="/map" className="font-headline uppercase tracking-tighter font-bold text-stone-900 dark:text-stone-100 hover:text-orange-600 transition-colors">Explorer</Link>
          </div>
        </header>

        <div className="pt-24 pb-12 px-10">
          {/* ── DASHBOARD ── */}
          {active === 'dashboard' && (
            <div className="space-y-12">
              <section>
                <div className="flex items-end justify-between mb-8">
                  <div>
                    <h2 className="font-headline text-5xl font-black uppercase tracking-tighter leading-none">Overview</h2>
                    <p className="text-stone-500 mt-2 font-medium font-body">{loadingStats ? 'Chargement...' : 'Statistiques en temps réel'}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {statCards.map(({ n, icon, label, value, badge, badgeClass, iconBg, iconClass }) => (
                    <div key={n} className={`p-6 rounded-xl relative overflow-hidden group bg-surface-container-lowest dark:bg-stone-800 border border-stone-100 dark:border-stone-700 ${loadingStats ? 'animate-pulse' : ''}`}>
                      <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity"><span className="font-headline text-8xl font-black italic">{n}</span></div>
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-3 ${iconBg} rounded-lg`}><Icon name={icon} fill={1} size={22} className={iconClass} /></div>
                        <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-full ${badgeClass}`}>{badge}</span>
                      </div>
                      <h3 className="text-sm font-semibold uppercase tracking-wider font-body text-stone-500 dark:text-stone-400">{label}</h3>
                      <p className="text-4xl font-headline font-black mt-1 text-stone-900 dark:text-stone-100">{value}</p>
                    </div>
                  ))}
                </div>
              </section>

              {dashData && (
                <div className="grid grid-cols-12 gap-8">
                  <div className="col-span-12 lg:col-span-6">
                    <div className="bg-surface-container-low dark:bg-stone-800 rounded-2xl p-8 border border-stone-100 dark:border-stone-700">
                      <h3 className="font-headline text-2xl font-bold uppercase tracking-tight mb-6">Derniers Utilisateurs</h3>
                      <div className="space-y-4">
                        {(dashData.recent_users || []).map(u => (
                          <div key={u.id} className="flex items-center justify-between py-3 border-b border-stone-100 dark:border-stone-700 last:border-0">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center"><Icon name="person" size={16} className="text-orange-600" /></div>
                              <div>
                                <p className="text-sm font-bold font-body">{u.name}</p>
                                <p className="text-xs text-stone-400 font-body">{u.email}</p>
                              </div>
                            </div>
                            <span className="text-xs font-bold uppercase px-2 py-1 rounded bg-stone-100 dark:bg-stone-700 font-body">{u.role}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="col-span-12 lg:col-span-6">
                    <div className="bg-surface-container-low dark:bg-stone-800 rounded-2xl p-8 border border-stone-100 dark:border-stone-700">
                      <h3 className="font-headline text-2xl font-bold uppercase tracking-tight mb-6">Derniers Clubs</h3>
                      <div className="space-y-4">
                        {(dashData.recent_clubs || []).map(c => (
                          <div key={c.id} className="flex items-center justify-between py-3 border-b border-stone-100 dark:border-stone-700 last:border-0">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-yellow-100 dark:bg-yellow-900/20 flex items-center justify-center"><Icon name="sports" size={16} className="text-yellow-600" /></div>
                              <div>
                                <p className="text-sm font-bold font-body">{c.name}</p>
                                <p className="text-xs text-stone-400 font-body">{c.sport} • {c.city}</p>
                              </div>
                            </div>
                            <span className={`text-xs font-bold uppercase px-2 py-1 rounded font-body ${c.is_approved ? 'bg-green-100 text-green-700 dark:bg-green-900/20' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20'}`}>{c.is_approved ? 'Approuvé' : 'En attente'}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── CLUBS MANAGEMENT ── */}
          {active === 'clubs' && (
            <div className="space-y-8">
              <div className="flex justify-between items-end">
                <div>
                  <h2 className="font-headline text-5xl font-black uppercase tracking-tighter leading-none">Clubs</h2>
                  <p className="text-stone-500 mt-2 font-medium font-body">Gérez les inscriptions et la visibilité des clubs.</p>
                </div>
                <div className="flex bg-stone-100 dark:bg-stone-800 p-1 rounded-xl">
                  {['all', 'pending', 'active', 'disabled'].map(f => (
                    <button key={f} onClick={() => setClubFilter(f)} className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${clubFilter === f ? 'bg-white dark:bg-stone-700 shadow-sm text-orange-600' : 'text-stone-500'}`}>
                      {f === 'all' ? 'Tous' : f === 'pending' ? 'En attente' : f === 'active' ? 'Actifs' : 'Désactivés'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-surface-container-low dark:bg-stone-900 rounded-3xl overflow-hidden border border-stone-100 dark:border-stone-800 shadow-2xl shadow-stone-900/5">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-stone-50/50 dark:bg-stone-800/50 border-b border-stone-100 dark:border-stone-800">
                      <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-stone-400">Club</th>
                      <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-stone-400">Propriétaire</th>
                      <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-stone-400">Sport</th>
                      <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-stone-400">Statut</th>
                      <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-stone-400 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                    {loadingItems ? (
                      <tr><td colSpan="5" className="px-6 py-12 text-center text-stone-400 font-body italic">Chargement des clubs...</td></tr>
                    ) : clubs.length > 0 ? clubs.map(c => (
                      <tr key={c.id} className="hover:bg-stone-50/50 dark:hover:bg-stone-800/30 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center overflow-hidden">
                              {c.logo ? <img src={c.logo} className="w-full h-full object-cover" /> : <Icon name="sports" className="text-stone-400" />}
                            </div>
                            <div>
                              <p className="text-sm font-black text-on-surface dark:text-stone-100">{c.name}</p>
                              <p className="text-[10px] text-stone-400 font-body">{c.city}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm font-bold text-on-surface dark:text-stone-100">{c.user?.name}</p>
                          <p className="text-[10px] text-stone-400 font-body">{c.user?.email}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 bg-orange-100 dark:bg-orange-900/20 text-orange-600 rounded text-[10px] font-black uppercase tracking-widest">{c.sport}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-1">
                            <span className={`text-[10px] font-black uppercase tracking-widest ${c.is_approved ? 'text-green-500' : 'text-yellow-500'}`}>
                              {c.is_approved ? '✓ Approuvé' : '⏳ En attente'}
                            </span>
                            {!c.is_active && <span className="text-[10px] font-black uppercase tracking-widest text-red-500">⚠ Désactivé</span>}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            {!c.is_approved && (
                              <button onClick={() => handleUpdateClubStatus(c.id, { is_approved: true })} className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors shadow-lg shadow-green-500/20" title="Approuver">
                                <Icon name="check" size={18} />
                              </button>
                            )}
                            <button onClick={() => handleUpdateClubStatus(c.id, { is_active: !c.is_active })} className={`p-2 rounded-lg transition-colors shadow-lg ${c.is_active ? 'bg-stone-200 text-stone-600 hover:bg-stone-300' : 'bg-blue-500 text-white hover:bg-blue-600 shadow-blue-500/20'}`} title={c.is_active ? 'Désactiver' : 'Activer'}>
                              <Icon name={c.is_active ? 'block' : 'undo'} size={18} />
                            </button>
                            <Link to={`/club/${c.id}`} className="p-2 bg-stone-100 dark:bg-stone-800 text-stone-500 hover:text-orange-600 rounded-lg transition-colors">
                              <Icon name="visibility" size={18} />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    )) : (
                      <tr><td colSpan="5" className="px-6 py-12 text-center text-stone-400 font-body italic">Aucun club trouvé.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── EVENTS MANAGEMENT ── */}
          {active === 'events' && (
            <div className="space-y-8">
              <div className="flex justify-between items-end">
                <div>
                  <h2 className="font-headline text-5xl font-black uppercase tracking-tighter leading-none">Événements</h2>
                  <p className="text-stone-500 mt-2 font-medium font-body">Supervision de tous les événements de la plateforme.</p>
                </div>
                <div className="flex bg-stone-100 dark:bg-stone-800 p-1 rounded-xl">
                  {['all', 'upcoming', 'past'].map(f => (
                    <button key={f} onClick={() => setEventFilter(f)} className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${eventFilter === f ? 'bg-white dark:bg-stone-700 shadow-sm text-orange-600' : 'text-stone-500'}`}>
                      {f === 'all' ? 'Tous' : f === 'upcoming' ? 'À venir' : 'Passés'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-surface-container-low dark:bg-stone-900 rounded-3xl overflow-hidden border border-stone-100 dark:border-stone-800 shadow-2xl shadow-stone-900/5">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-stone-50/50 dark:bg-stone-800/50 border-b border-stone-100 dark:border-stone-800">
                      <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-stone-400">Événement</th>
                      <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-stone-400">Club Organisateur</th>
                      <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-stone-400">Date</th>
                      <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-stone-400 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                    {loadingItems ? (
                      <tr><td colSpan="4" className="px-6 py-12 text-center text-stone-400 font-body italic">Chargement...</td></tr>
                    ) : events.length > 0 ? events.map(e => (
                      <tr key={e.id} className="hover:bg-stone-50/50 dark:hover:bg-stone-800/30 transition-colors">
                        <td className="px-6 py-4">
                          <p className="text-sm font-black text-on-surface dark:text-stone-100">{e.title}</p>
                          <p className="text-[10px] text-stone-400 font-body truncate max-w-xs">{e.location}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm font-bold text-on-surface dark:text-stone-100">{e.club?.name}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm font-bold text-on-surface dark:text-stone-100">{new Date(e.date).toLocaleDateString()}</p>
                          <p className="text-[10px] text-stone-400 font-body">{e.time}</p>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button className="p-2 text-stone-400 hover:text-red-500 transition-colors"><Icon name="delete" size={18} /></button>
                          </div>
                        </td>
                      </tr>
                    )) : (
                      <tr><td colSpan="4" className="px-6 py-12 text-center text-stone-400 font-body italic">Aucun événement.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── PROMOTIONS MANAGEMENT ── */}
          {active === 'promotions' && (
            <div className="space-y-8">
              <div>
                <h2 className="font-headline text-5xl font-black uppercase tracking-tighter leading-none">Promotions</h2>
                <p className="text-stone-500 mt-2 font-medium font-body">Gestion des offres promotionnelles actives sur MOVE M3ANA.</p>
              </div>

              <div className="bg-surface-container-low dark:bg-stone-900 rounded-3xl overflow-hidden border border-stone-100 dark:border-stone-800 shadow-2xl shadow-stone-900/5">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-stone-50/50 dark:bg-stone-800/50 border-b border-stone-100 dark:border-stone-800">
                      <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-stone-400">Offre</th>
                      <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-stone-400">Club</th>
                      <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-stone-400">Validité</th>
                      <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-stone-400 text-right">Statut</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                    {loadingItems ? (
                      <tr><td colSpan="4" className="px-6 py-12 text-center text-stone-400 font-body italic">Chargement...</td></tr>
                    ) : promos.length > 0 ? promos.map(p => (
                      <tr key={p.id} className="hover:bg-stone-50/50 dark:hover:bg-stone-800/30 transition-colors">
                        <td className="px-6 py-4">
                          <p className="text-sm font-black text-on-surface dark:text-stone-100">{p.title}</p>
                          <p className="text-xs text-orange-600 font-black uppercase">{p.discount_percent}% de réduction</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm font-bold text-on-surface dark:text-stone-100">{p.club?.name}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-xs text-stone-400 font-body">Du {new Date(p.start_date).toLocaleDateString()} au {new Date(p.end_date).toLocaleDateString()}</p>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className={`px-2 py-1 rounded text-[10px] font-black uppercase ${new Date(p.end_date) > new Date() ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {new Date(p.end_date) > new Date() ? 'Active' : 'Expirée'}
                          </span>
                        </td>
                      </tr>
                    )) : (
                      <tr><td colSpan="4" className="px-6 py-12 text-center text-stone-400 font-body italic">Aucune promotion.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Placeholder for other sections */}
          {active !== 'dashboard' && active !== 'clubs' && active !== 'events' && active !== 'promotions' && (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-4">
              <div className="w-20 h-20 bg-stone-100 dark:bg-stone-800 rounded-full flex items-center justify-center">
                <Icon name="construction" size={32} className="text-stone-400" />
              </div>
              <h3 className="text-2xl font-headline font-black uppercase tracking-tight">Prochainement</h3>
              <p className="text-stone-500 font-body max-w-sm">La section {NAV.find(n => n.id === active)?.label} arrive bientôt pour compléter votre arsenal de gestion.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
