import Icon from './Icon'

export default function Footer() {
  return (
    <footer className="bg-stone-100 dark:bg-stone-900 w-full mt-auto border-t border-stone-200/20 dark:border-stone-800/20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-12 py-16 w-full max-w-screen-2xl mx-auto">
        {/* Brand */}
        <div className="flex flex-col gap-4">
          <span className="text-lg font-bold text-stone-900 dark:text-stone-100 font-headline uppercase italic">MOVE M3ANA</span>
          <p className="font-body text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
            The premier engine for kinetic energy and athletic pursuit. Find your rhythm, dominate your field.
          </p>
        </div>

        {/* Platform */}
        <div className="flex flex-col gap-4">
          <h4 className="font-bold text-stone-900 dark:text-stone-100 uppercase tracking-widest text-xs">Platform</h4>
          <ul className="flex flex-col gap-2">
            {['About Us', 'Find Activities', 'Newsletter'].map(l => (
              <li key={l}>
                <a href="#" className="font-body text-sm text-stone-500 hover:text-orange-500 hover:underline decoration-orange-500 underline-offset-4 transition-all duration-200">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div className="flex flex-col gap-4">
          <h4 className="font-bold text-stone-900 dark:text-stone-100 uppercase tracking-widest text-xs">Support</h4>
          <ul className="flex flex-col gap-2">
            {['Contact Support', 'Privacy Policy'].map(l => (
              <li key={l}>
                <a href="#" className="font-body text-sm text-stone-500 hover:text-orange-500 hover:underline decoration-orange-500 underline-offset-4 transition-all duration-200">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Connect */}
        <div className="flex flex-col gap-4">
          <h4 className="font-bold text-stone-900 dark:text-stone-100 uppercase tracking-widest text-xs">Connect</h4>
          <div className="flex gap-4">
            {['share', 'public', 'rss_feed'].map(ic => (
              <button
                key={ic}
                className="w-10 h-10 rounded-full bg-stone-200 dark:bg-stone-800 flex items-center justify-center hover:bg-orange-600 hover:text-white transition-all"
              >
                <Icon name={ic} size={18} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-screen-2xl mx-auto px-12 py-8 border-t border-stone-200/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <span className="font-body text-sm text-stone-500">© 2024 MOVE M3ANA. Kinetic Velocity Engine.</span>
        <div className="flex gap-6">
          <span className="text-xs text-stone-500 uppercase font-bold tracking-tighter">Velocity Performance Grid</span>
          <span className="text-xs text-stone-500 uppercase font-bold tracking-tighter">System Status: Optimal</span>
        </div>
      </div>
    </footer>
  )
}
