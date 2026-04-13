import { useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../components/Icon'

const NAV = [
  { id: 'dashboard',  icon: 'dashboard',     label: 'Dashboard' },
  { id: 'club',       icon: 'groups',         label: 'My Club' },
  { id: 'activities', icon: 'fitness_center', label: 'Activities' },
  { id: 'promotions', icon: 'campaign',       label: 'Promotions' },
  { id: 'analytics',  icon: 'analytics',      label: 'Analytics' },
  { id: 'settings',   icon: 'settings',       label: 'Settings' },
]

const BARS = [
  { h: 'h-32', highlight: false },
  { h: 'h-48', highlight: false },
  { h: 'h-56', highlight: true  },
  { h: 'h-36', highlight: false },
  { h: 'h-44', highlight: false },
  { h: 'h-64', highlight: false, yellow: true },
  { h: 'h-40', highlight: false },
  { h: 'h-52', highlight: true  },
]

const ALERTS = [
  { title: 'New Member Registration', sub: 'Marcus Thorne joined Pro Tier', time: '2 mins ago',  border: 'border-l-orange-500' },
  { title: 'Class Capacity Reached',  sub: 'Crossfit 5PM session is now full', time: '45 mins ago', border: 'border-l-yellow-500' },
  { title: 'Payout Processed',        sub: 'Weekly revenue transfer complete',  time: '1 hour ago',  border: 'border-l-stone-300 dark:border-l-stone-700' },
]

export default function AdminPage() {
  const [active, setActive] = useState('dashboard')

  return (
    <div className="flex min-h-screen bg-surface dark:bg-stone-950 text-on-surface dark:text-stone-100 pt-[60px]">

      {/* ── Sidebar ── */}
      <aside className="h-[calc(100vh-60px)] w-64 fixed left-0 top-[60px] bg-stone-50/90 dark:bg-stone-900/95 backdrop-blur-2xl flex flex-col py-8 gap-2 z-30 shadow-2xl shadow-stone-900/5 border-r border-stone-200/20 dark:border-stone-800/30">
        <div className="px-8 mb-8">
          <h1 className="text-xl font-black text-stone-900 dark:text-stone-100 font-headline uppercase tracking-tight">Admin Portal</h1>
          <p className="text-xs text-stone-500 font-medium tracking-widest uppercase font-body">Kinetic Management</p>
        </div>

        <nav className="flex-1 space-y-1 pr-4">
          {NAV.map(({ id, icon, label }) => (
            <button
              key={id}
              onClick={() => setActive(id)}
              className={`w-full px-8 py-3 flex items-center gap-3 rounded-r-full font-body text-sm font-medium transition-all active:translate-x-1 ${
                active === id
                  ? 'bg-orange-600 text-white'
                  : 'text-stone-500 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-800'
              }`}
            >
              <Icon name={icon} fill={active === id ? 1 : 0} size={20} />
              {label}
            </button>
          ))}
        </nav>

        <div className="px-8 mt-auto pt-8 border-t border-stone-200/50 dark:border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-stone-200 dark:bg-stone-700 overflow-hidden ring-2 ring-orange-500 ring-offset-2 ring-offset-stone-50 dark:ring-offset-stone-900">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgVCjVaBWyCP7fJ2DQzlGQ-6kNitkDF3SlF60Hp02GYTjIrRuhoKpftswQAEip4PoB07klWJaLv11Y9L9bM_6MgcEj6E1uz21eExAW0AVG4vgm2YyEX5uHa_wl8lrP0XdxkUGdnzMDy2iQQy8bPor3TI5IBmayLfh29UJUhYIItVSZ4M1kTOk9NRS7qZkXuh9AlAj57V5CWpewDWYHN3goFm0PX75vwKxVIAZ9L6tye7XUWOCBKiKcywVd_SuFKOh4OHDNuQRkUmI"
                alt="Admin"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-bold text-stone-900 dark:text-stone-100 font-body">Alex Rivera</p>
              <p className="text-xs text-stone-500 font-body">Club Director</p>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="ml-64 flex-1 relative">
        {/* Inner topbar */}
        <header className="fixed top-[60px] right-0 left-64 z-20 bg-stone-50/80 dark:bg-stone-950/80 backdrop-blur-xl px-8 py-4 flex justify-between items-center border-b border-stone-200/20 dark:border-stone-800/20">
          <div className="relative">
            <Icon name="search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              className="pl-10 pr-4 py-2 bg-stone-100 dark:bg-stone-800 border-none rounded-xl text-sm text-on-surface dark:text-stone-100 focus:ring-2 focus:ring-orange-500 w-64 transition-all placeholder:text-stone-400 font-body"
              placeholder="Search members or activities..."
              type="text"
            />
          </div>
          <div className="flex items-center gap-6">
            <Link to="/map" className="font-headline uppercase tracking-tighter font-bold text-stone-900 dark:text-stone-100 hover:text-orange-600 transition-colors">
              Explore Map
            </Link>
            <div className="flex items-center gap-3">
              <button className="bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 p-2 rounded-xl transition-all active:scale-95">
                <Icon name="notifications" size={20} className="text-stone-600 dark:text-stone-300" />
              </button>
              <Link
                to="/auth?tab=signup"
                className="bg-orange-600 text-white px-6 py-2 rounded-xl font-bold font-headline uppercase tracking-tight text-sm active:scale-95 transition-transform shadow-lg shadow-orange-600/20"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </header>

        <div className="pt-24 pb-12 px-10 space-y-12">
          {/* Stats */}
          <section>
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="font-headline text-5xl font-black uppercase tracking-tighter leading-none text-on-surface dark:text-stone-100">Overview</h2>
                <p className="text-stone-500 mt-2 font-medium font-body">Real-time performance metrics</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-stone-400 uppercase tracking-widest font-body">Last Updated</p>
                <p className="text-sm font-bold text-orange-600 font-body">Today, 09:42 AM</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { n: '01', icon: 'calendar_today', label: 'Total Bookings', value: '2,842', badge: '+12%', badgeClass: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20', iconBg: 'bg-orange-100 dark:bg-orange-900/20', iconClass: 'text-orange-600' },
                { n: '02', icon: 'groups',         label: 'Active Members', value: '1,120', badge: '+4%',  badgeClass: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20', iconBg: 'bg-yellow-100 dark:bg-yellow-900/20', iconClass: 'text-yellow-600' },
                { n: '03', icon: 'payments',       label: 'Revenue',        value: '$68,240', badge: '$84k Target', badgeClass: 'text-orange-300 dark:text-orange-300', iconBg: 'bg-orange-600', iconClass: 'text-white', dark: true },
                { n: '04', icon: 'campaign',       label: 'Active Promos',  value: '08',     badge: 'Running',    badgeClass: 'text-stone-400',                               iconBg: 'bg-stone-100 dark:bg-stone-700', iconClass: 'text-stone-600 dark:text-stone-300' },
              ].map(({ n, icon, label, value, badge, badgeClass, iconBg, iconClass, dark: dk }) => (
                <div
                  key={n}
                  className={`p-6 rounded-xl relative overflow-hidden group ${dk ? 'bg-stone-900 dark:bg-stone-100 shadow-xl' : 'bg-surface-container-lowest dark:bg-stone-800 border border-stone-100 dark:border-stone-700'}`}
                >
                  <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <span className={`font-headline text-8xl font-black italic ${dk ? 'text-white dark:text-stone-900' : ''}`}>{n}</span>
                  </div>
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 ${iconBg} rounded-lg`}>
                      <Icon name={icon} fill={1} size={22} className={iconClass} />
                    </div>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${badgeClass}`}>{badge}</span>
                  </div>
                  <h3 className={`text-sm font-semibold uppercase tracking-wider font-body ${dk ? 'text-stone-400 dark:text-stone-600' : 'text-stone-500 dark:text-stone-400'}`}>{label}</h3>
                  <p className={`text-4xl font-headline font-black mt-1 ${dk ? 'text-white dark:text-stone-900' : 'text-stone-900 dark:text-stone-100'}`}>{value}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Bento grid */}
          <div className="grid grid-cols-12 gap-8">
            {/* Left col */}
            <div className="col-span-12 lg:col-span-8 space-y-8">
              {/* Chart */}
              <div className="bg-surface-container-low dark:bg-stone-800 rounded-2xl p-8 border border-stone-100 dark:border-stone-700">
                <div className="flex items-center justify-between mb-10">
                  <div>
                    <h3 className="font-headline text-3xl font-bold uppercase tracking-tight text-on-surface dark:text-stone-100">Growth Analytics</h3>
                    <p className="text-stone-500 text-sm font-body">Monthly booking vs revenue trends</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 rounded-lg text-xs font-bold shadow-sm font-body">Monthly</button>
                    <button className="px-4 py-2 text-stone-400 rounded-lg text-xs font-bold hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors font-body">Weekly</button>
                  </div>
                </div>

                {/* Bar chart */}
                <div className="h-64 flex items-end justify-between gap-4 px-4 relative">
                  {/* Grid lines */}
                  <div className="absolute inset-x-0 bottom-0 top-0 flex flex-col justify-between pointer-events-none opacity-20">
                    {[1,2,3,4].map(i => <div key={i} className="border-t border-stone-400 w-full" />)}
                  </div>
                  {BARS.map(({ h, highlight, yellow }, i) => (
                    <div
                      key={i}
                      className={`flex-1 ${h} rounded-t-lg transition-all duration-500 relative group cursor-pointer ${
                        yellow ? 'bg-yellow-400' : highlight ? 'bg-primary-container' : 'bg-stone-200 dark:bg-stone-600 hover:bg-primary-container'
                      }`}
                    >
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 px-2 py-1 rounded text-[10px] font-bold opacity-0 group-hover:opacity-100 whitespace-nowrap shadow-xl font-body">
                        {[420,560,640,460,520,760,500,620][i]}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-6 px-4">
                  {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug'].map(m => (
                    <span key={m} className="text-[10px] font-bold text-stone-400 uppercase tracking-widest font-body">{m}</span>
                  ))}
                </div>
              </div>

              {/* Club settings form */}
              <div className="bg-surface-container-lowest dark:bg-stone-800 rounded-2xl p-8 border border-stone-100 dark:border-stone-700">
                <h3 className="font-headline text-3xl font-bold uppercase tracking-tight mb-6 text-on-surface dark:text-stone-100">My Club Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    {[
                      { label: 'Club Name', val: 'MOVE M3ANA Downtown', type: 'text' },
                      { label: 'Facility Capacity', val: '250', type: 'number' },
                      { label: 'Business Email', val: 'contact@movem3ana.com', type: 'email' },
                    ].map(({ label, val, type }) => (
                      <div key={label}>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-stone-400 mb-1 font-body">{label}</label>
                        <input
                          className="w-full bg-surface-container-low dark:bg-stone-700 border-b-2 border-transparent border-b-stone-200 dark:border-b-stone-600 focus:border-b-primary-container focus:ring-0 p-3 text-sm font-semibold transition-all text-on-surface dark:text-stone-100 font-body"
                          type={type}
                          defaultValue={val}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="space-y-4">
                    <label className="block text-[10px] font-black uppercase tracking-widest text-stone-400 mb-1 font-body">Club Logo</label>
                    <div className="border-2 border-dashed border-stone-200 dark:border-stone-600 rounded-xl p-8 flex flex-col items-center justify-center bg-stone-50 dark:bg-stone-700/50 group hover:border-orange-500 transition-colors cursor-pointer">
                      <Icon name="add_photo_alternate" size={40} className="text-stone-300 group-hover:text-orange-500 transition-colors" />
                      <p className="text-xs text-stone-400 mt-2 font-body">Upload Branding PNG/SVG</p>
                    </div>
                    <button className="w-full bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 py-4 rounded-xl font-headline font-bold uppercase tracking-widest text-sm hover:bg-orange-600 hover:!text-white transition-all active:scale-[0.98]">
                      Save Club Details
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right col */}
            <div className="col-span-12 lg:col-span-4 space-y-8">
              {/* Quick add */}
              <div className="bg-primary-container/10 dark:bg-orange-900/10 rounded-2xl p-8 relative overflow-hidden border border-primary-container/10">
                <div className="absolute -top-6 -right-6">
                  <Icon name="fitness_center" size={80} className="text-primary-container/20" />
                </div>
                <h3 className="font-headline text-3xl font-bold uppercase tracking-tight mb-6 text-on-primary-container dark:text-orange-400">Quick Add Activity</h3>
                <div className="space-y-4 relative">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-orange-800/60 dark:text-orange-400/60 mb-1 font-body">Activity Title</label>
                    <input className="w-full bg-white dark:bg-stone-800 border-none rounded-xl p-3 text-sm text-on-surface dark:text-stone-100 focus:ring-2 focus:ring-orange-600 font-body" placeholder="e.g. Morning Yoga Blast" type="text" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-orange-800/60 dark:text-orange-400/60 mb-1 font-body">Category</label>
                      <select className="w-full bg-white dark:bg-stone-800 border-none rounded-xl p-3 text-sm text-on-surface dark:text-stone-100 focus:ring-2 focus:ring-orange-600 font-body">
                        <option>HIIT</option>
                        <option>Yoga</option>
                        <option>Cycling</option>
                        <option>Padel</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-orange-800/60 dark:text-orange-400/60 mb-1 font-body">Price ($)</label>
                      <input className="w-full bg-white dark:bg-stone-800 border-none rounded-xl p-3 text-sm text-on-surface dark:text-stone-100 focus:ring-2 focus:ring-orange-600 font-body" placeholder="25.00" type="number" />
                    </div>
                  </div>
                  <button className="w-full bg-orange-600 text-white py-4 rounded-xl font-headline font-bold uppercase tracking-widest text-sm shadow-lg shadow-orange-600/20 active:scale-[0.98] transition-transform">
                    Create Activity
                  </button>
                </div>
              </div>

              {/* Alerts */}
              <div className="bg-surface-container-low dark:bg-stone-800 rounded-2xl p-8 border border-stone-100 dark:border-stone-700">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-headline text-xl font-bold uppercase tracking-tight text-on-surface dark:text-stone-100">Recent Activity</h3>
                  <Link to="/" className="text-[10px] font-bold uppercase tracking-widest text-orange-600 hover:underline font-body">View All</Link>
                </div>
                <div className="space-y-6">
                  {ALERTS.map(({ title, sub, time, border }) => (
                    <div key={title} className={`flex gap-4 items-start border-l-2 ${border} pl-4 py-1`}>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-stone-900 dark:text-stone-100 leading-tight font-body">{title}</p>
                        <p className="text-xs text-stone-500 mt-1 font-body">{sub}</p>
                        <p className="text-[10px] text-stone-400 mt-2 font-medium font-body">{time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Promo spotlight */}
              <div className="rounded-2xl p-6 bg-yellow-400 relative overflow-hidden group">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJ0glUi-qJpMdZycxDxqLI5CyPFIgdwLBbYZd-KYIonh9C2Ao9UueurvBZ3DbUQQ88T1RNTyHFI2RhaTr0zYUryf6XCBT6-aAIHyF3ELwbIxMNWyjK0eKdW-rD0Wmh1qG9nVUeTIL6vSNOTN0acMYMLdWm88LT5CxlQ2JsL0vDBTS3nIAZhfYbqHLuq9qBXAurRyh5IY7RV2DK7hb8tCPHAU67KqUz1HImKCTRfQleukAK0Nc65y0gq-_CnlPXd4K2ougzwHzcUdk"
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover opacity-20 scale-110 group-hover:scale-100 transition-transform duration-700"
                />
                <div className="relative z-10">
                  <span className="inline-block bg-black text-white text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded mb-4 font-body">Trending Promo</span>
                  <h4 className="font-headline text-2xl font-black uppercase tracking-tighter leading-none mb-2 text-stone-900">Summer Kinetic Pass</h4>
                  <p className="text-sm font-medium text-black/70 mb-4 font-body">45% increase in conversions this week.</p>
                  <button className="text-xs font-bold uppercase border-b-2 border-black pb-1 hover:border-orange-600 transition-colors font-body">Optimize Campaign</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer inside admin */}
        <footer className="w-full mt-auto bg-stone-100 dark:bg-stone-900 border-t border-stone-200/20 dark:border-stone-800/20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-12 py-16 max-w-screen-2xl mx-auto">
            <div>
              <h5 className="text-lg font-bold text-stone-900 dark:text-stone-100 mb-4 font-body">MOVE M3ANA</h5>
              <p className="font-body text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                Pushing the boundaries of athletic management through the Kinetic Velocity Engine.
              </p>
            </div>
            {[
              { title: 'Quick Links', links: ['About Us', 'Find Activities'] },
              { title: 'Resources',   links: ['Privacy Policy', 'Newsletter'] },
              { title: 'Support',     links: ['Contact Support'] },
            ].map(({ title, links }) => (
              <div key={title}>
                <h6 className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-6 font-body">{title}</h6>
                <ul className="space-y-3">
                  {links.map(l => (
                    <li key={l}>
                      <Link to="/" className="text-stone-500 hover:text-orange-500 font-body text-sm transition-all duration-200 hover:underline decoration-orange-500 underline-offset-4">{l}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </footer>
      </main>
    </div>
  )
}
