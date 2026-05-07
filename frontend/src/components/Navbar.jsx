import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'
import BrandLogo from './BrandLogo'
import Icon from './Icon'

const LINKS = [
  { label: 'Explorer', to: '/map' },
  { label: 'Tarifs', to: '/pricing' },
  { label: 'Contact', to: '/contact' },
]

export default function Navbar() {
  const { dark, toggle } = useTheme()
  const { pathname } = useLocation()
  const { user, logout } = useAuth()

  const handleLogout = async () => {
    await logout()
    window.location.href = '/'
  }

  return (
    <nav className="fixed top-0 w-full z-[100] bg-stone-50/80 dark:bg-stone-950/80 backdrop-blur-xl border-b border-stone-200/20 dark:border-stone-800/20">
      <div className="flex justify-between items-center px-8 py-3 w-full max-w-screen-2xl mx-auto">
        {/* Logo + nav */}
        <div className="flex items-center gap-8">
          <Link
            to="/"
            className="flex items-center"
            aria-label="MOVE M3ANA home"
          >
            <BrandLogo
              className="gap-2"
              iconClassName="h-10 w-10 md:h-12 md:w-12"
              textClassName="scale-[0.72] origin-left md:scale-[0.82]"
            />
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {LINKS.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                className={`font-headline uppercase tracking-tighter font-bold transition-all duration-300 active:scale-95 transform
                  ${pathname === to
                    ? 'text-orange-600 dark:text-orange-500 border-b-2 border-orange-600 pb-1'
                    : 'text-stone-600 dark:text-stone-400 hover:text-orange-600'
                  }`}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Search bar — desktop */}
        <div className="flex-1 max-w-md px-8 hidden lg:block">
          <div className="relative group">
            <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
            <input
              className="w-full bg-surface-container-high dark:bg-stone-800 border-none rounded-full py-2 pl-10 pr-4 focus:ring-2 focus:ring-primary-container transition-all text-on-surface dark:text-stone-100 placeholder:text-stone-400"
              placeholder="Search sports, clubs, or locations..."
              type="text"
            />
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggle}
            className="hidden sm:flex items-center gap-1 px-3 py-2 rounded-lg bg-surface-container-high dark:bg-stone-800 text-stone-600 dark:text-stone-300 text-sm font-bold font-body transition hover:bg-stone-200 dark:hover:bg-stone-700"
          >
            <Icon name={dark ? 'light_mode' : 'dark_mode'} size={18} />
            <span className="hidden lg:inline">{dark ? 'Light' : 'Dark'}</span>
          </button>

          {user ? (
            <div className="relative group">
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-container-high dark:bg-stone-800 text-on-surface dark:text-stone-100 font-body text-sm font-bold transition-all hover:bg-stone-200 dark:hover:bg-stone-700">
                <div className="w-8 h-8 rounded-full bg-primary-container/20 flex items-center justify-center text-primary-container">
                  <Icon name="person" size={18} />
                </div>
                <span className="max-w-[120px] truncate">{user.name || user.email}</span>
                <Icon name="expand_more" size={16} className="text-stone-400 group-hover:rotate-180 transition-transform" />
              </button>

              {/* Dropdown Menu */}
              <div className="absolute right-0 top-full pt-2 w-56 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-[110]">
                <div className="bg-surface-container-lowest dark:bg-stone-900 rounded-2xl shadow-2xl border border-stone-200/20 dark:border-stone-800/50 overflow-hidden backdrop-blur-xl">
                  <div className="p-4 border-b border-stone-100 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/50">
                    <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-1">Account</p>
                    <p className="text-sm font-black text-on-surface dark:text-stone-100 truncate">{user.name}</p>
                    <p className="text-[10px] text-stone-500 font-bold uppercase">{user.role}</p>
                  </div>
                  
                  <div className="p-2">
                    {user.role === 'admin' && (
                      <Link to="/admin" className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-bold text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-orange-600 transition-all">
                        <Icon name="dashboard" size={18} /> Admin Dashboard
                      </Link>
                    )}
                    {user.role === 'club' && (
                      <>
                        <Link to="/club-portal" className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-bold text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-orange-600 transition-all">
                          <Icon name="storefront" size={18} /> Club Dashboard
                        </Link>
                        <Link to="/club-events" className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-bold text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-orange-600 transition-all">
                          <Icon name="event" size={18} /> My Events
                        </Link>
                      </>
                    )}
                    <Link to="/profile" className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-bold text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-orange-600 transition-all">
                      <Icon name="settings" size={18} /> My Profile
                    </Link>
                  </div>

                  <div className="p-2 border-t border-stone-100 dark:border-stone-800">
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                    >
                      <Icon name="logout" size={18} /> Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <Link
                to="/auth"
                className="font-headline uppercase tracking-tighter font-bold text-stone-600 dark:text-stone-400 hover:text-orange-600 dark:hover:text-orange-500 transition-all duration-300 px-4 py-2 rounded-lg hover:bg-stone-200/50 dark:hover:bg-stone-800/50 active:scale-95 transform"
              >
                Login
              </Link>

              <Link
                to="/auth?tab=signup"
                className="font-headline uppercase tracking-tighter font-bold bg-primary-container text-white hover:bg-primary transition-all duration-300 px-6 py-2 rounded-full active:scale-95 transform"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
