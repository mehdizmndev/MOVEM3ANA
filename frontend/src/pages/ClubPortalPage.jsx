import { useState, useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import Icon from '../components/Icon'
import { useAuth } from '../context/AuthContext'
import { stats as statsApi } from '../services/api'

const NAV = [
  { id: 'dashboard',  icon: 'dashboard',     label: 'Tableau de bord' },
  { id: 'club',       icon: 'sports',        label: 'Mon Club' },
  { id: 'events',     icon: 'event',         label: 'Événements' },
  { id: 'activities', icon: 'fitness_center', label: 'Activités' },
  { id: 'promotions', icon: 'campaign',       label: 'Promotions' },
  { id: 'analytics',  icon: 'analytics',      label: 'Analyses' },
  { id: 'settings',   icon: 'settings',       label: 'Paramètres' },
]

export default function ClubPortalPage() {
  const [active, setActive] = useState('dashboard')
  const { user } = useAuth()
  const [dashData, setDashData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Note: This would normally fetch data specific to the club
    statsApi.dashboard() 
      .then(res => setDashData(res.data?.data || null))
      .finally(() => setLoading(false))
  }, [])

  if (!user || user.role !== 'club') {
    return <Navigate to="/auth" replace />
  }

  // Redirect to creation if no club exists
  if (!user.club && !loading) {
    return <Navigate to="/club-create" replace />
  }

  const statCards = [
    { n: '01', icon: 'event', label: 'Événements Actifs', value: '3', badge: '+1 cette semaine', badgeClass: 'text-emerald-600 bg-emerald-50', iconBg: 'bg-emerald-100', iconClass: 'text-emerald-600' },
    { n: '02', icon: 'groups', label: 'Abonnés', value: '124', badge: '12 en attente', badgeClass: 'text-orange-600 bg-orange-50', iconBg: 'bg-orange-100', iconClass: 'text-orange-600' },
    { n: '03', icon: 'star', label: 'Note Moyenne', value: '4.8', badge: '15 avis', badgeClass: 'text-yellow-600 bg-yellow-50', iconBg: 'bg-yellow-100', iconClass: 'text-yellow-600' },
    { n: '04', icon: 'visibility', label: 'Vues (30j)', value: '1.2k', badge: '+15%', badgeClass: 'text-blue-600 bg-blue-50', iconBg: 'bg-blue-100', iconClass: 'text-blue-600' },
  ]

  return (
    <div className="flex min-h-screen bg-surface dark:bg-stone-950 text-on-surface dark:text-stone-100">
      {/* Sidebar */}
      <aside className="h-[calc(100vh-72px)] w-64 fixed left-0 top-[72px] bg-stone-50/90 dark:bg-stone-900/95 backdrop-blur-2xl flex flex-col py-8 gap-2 z-30 shadow-2xl border-r border-stone-200/20 dark:border-stone-800/30">
        <div className="px-8 mb-8">
          <h1 className="text-xl font-black text-stone-900 dark:text-stone-100 font-headline uppercase tracking-tight">Club Portal</h1>
          <p className="text-xs text-stone-500 font-medium tracking-widest uppercase font-body">{user.club?.name || 'VOTRE CLUB'}</p>
        </div>
        <nav className="flex-1 space-y-1 pr-4">
          {NAV.map(({ id: navId, icon, label }) => (
            <button 
              key={navId} 
              onClick={() => {
                if (navId === 'events') {
                  window.location.href = '/club-events'
                } else {
                  setActive(navId)
                }
              }} 
              className={`w-full px-8 py-3 flex items-center gap-3 rounded-r-full font-body text-sm font-medium transition-all active:translate-x-1 ${active === navId ? 'bg-primary-container text-white shadow-lg shadow-primary-container/20' : 'text-stone-500 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-800'}`}
            >
              <Icon name={icon} fill={active === navId ? 1 : 0} size={20} />{label}
            </button>
          ))}
        </nav>
        <div className="px-8 mt-auto pt-8 border-t border-stone-200/50 dark:border-stone-800">
          <Link to={`/club/${user.club?.id}`} className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-stone-200 dark:bg-stone-800 flex items-center justify-center ring-2 ring-primary-container ring-offset-2 ring-offset-stone-50 dark:ring-offset-stone-900 group-hover:scale-110 transition-transform">
              {user.club?.logo ? <img src={user.club.logo} className="w-full h-full rounded-full object-cover" /> : <Icon name="sports" size={20} className="text-primary-container" />}
            </div>
            <div>
              <p className="text-sm font-bold text-stone-900 dark:text-stone-100 font-body truncate max-w-[120px]">Voir ma page</p>
              <p className="text-[10px] text-stone-500 font-bold uppercase tracking-tighter">Public View</p>
            </div>
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="ml-64 flex-1 relative">
        <header className="fixed top-[72px] right-0 left-64 z-20 bg-stone-50/80 dark:bg-stone-950/80 backdrop-blur-xl px-8 py-4 flex justify-between items-center border-b border-stone-200/20 dark:border-stone-800/20">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-black italic uppercase font-headline tracking-tight">{NAV.find(n => n.id === active)?.label}</h2>
          </div>
          <div className="flex items-center gap-6">
            <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${user.club?.is_approved ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700 animate-pulse'}`}>
              {user.club?.is_approved ? 'Club Validé' : 'En attente de validation'}
            </div>
          </div>
        </header>

        <div className="pt-24 pb-12 px-10">
          {active === 'dashboard' && (
            <div className="space-y-12">
              <section>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {statCards.map(({ n, icon, label, value, badge, badgeClass, iconBg, iconClass }) => (
                    <div key={n} className="p-6 rounded-2xl relative overflow-hidden group bg-surface-container-lowest dark:bg-stone-900 border border-stone-100 dark:border-stone-800 shadow-sm">
                      <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity"><span className="font-headline text-8xl font-black italic">{n}</span></div>
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-3 ${iconBg} rounded-xl shadow-inner`}><Icon name={icon} fill={1} size={22} className={iconClass} /></div>
                        <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-full ${badgeClass}`}>{badge}</span>
                      </div>
                      <h3 className="text-xs font-bold uppercase tracking-widest font-body text-stone-500 mb-1">{label}</h3>
                      <p className="text-4xl font-headline font-black text-stone-900 dark:text-stone-100">{value}</p>
                    </div>
                  ))}
                </div>
              </section>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-surface-container-low dark:bg-stone-900 rounded-3xl p-8 border border-stone-100 dark:border-stone-800 shadow-xl shadow-stone-900/5">
                  <h3 className="font-headline text-2xl font-black italic uppercase tracking-tight mb-6 flex justify-between items-center">
                    Prochains Événements
                    <Link to="/club-events" className="text-xs text-primary-container font-black uppercase tracking-widest hover:underline">Voir tout</Link>
                  </h3>
                  <div className="space-y-4 text-center py-12 text-stone-400">
                    <Icon name="event_busy" size={48} className="mx-auto mb-4 opacity-20" />
                    <p className="font-body italic text-sm">Organisez votre premier événement pour dynamiser votre communauté.</p>
                    <Link to="/club-events" className="mt-4 bg-primary-container text-white px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:scale-105 transition-transform inline-block">Créer un événement</Link>
                  </div>
                </div>

                <div className="bg-surface-container-low dark:bg-stone-900 rounded-3xl p-8 border border-stone-100 dark:border-stone-800 shadow-xl shadow-stone-900/5">
                  <h3 className="font-headline text-2xl font-black italic uppercase tracking-tight mb-6">Derniers Avis</h3>
                  <div className="space-y-4 text-center py-12 text-stone-400">
                    <Icon name="rate_review" size={48} className="mx-auto mb-4 opacity-20" />
                    <p className="font-body italic text-sm">Les avis de vos membres apparaîtront ici.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {active !== 'dashboard' && (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-4">
              <div className="w-20 h-20 bg-stone-100 dark:bg-stone-800 rounded-full flex items-center justify-center">
                <Icon name="construction" size={32} className="text-stone-400" />
              </div>
              <h3 className="text-2xl font-headline font-black uppercase tracking-tight">En cours de développement</h3>
              <p className="text-stone-500 font-body max-w-sm">La section {NAV.find(n => n.id === active)?.label} sera bientôt disponible pour optimiser la gestion de votre club.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
