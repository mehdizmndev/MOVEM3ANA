import { Link } from 'react-router-dom'
import Icon from '../components/Icon'

export default function ForgotPasswordPage() {
  return (
    <main className="flex-1 pb-16 px-4 relative flex items-center justify-center overflow-hidden min-h-screen bg-surface dark:bg-stone-950">
      {/* Background blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[60%] h-[70%] bg-primary-container opacity-5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[60%] bg-secondary-container opacity-10 blur-[120px] rounded-full" />
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-lg">
        <div className="bg-surface-container-lowest dark:bg-stone-900 rounded-xl shadow-2xl shadow-on-surface/5 border-t-8 border-primary-container overflow-hidden p-8 md:p-10">
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h1 className="font-body font-black text-3xl tracking-tight text-on-surface dark:text-stone-100 uppercase mb-2">Reset Password</h1>
              <p className="text-stone-500 text-sm font-body">Enter your email to receive a password reset link.</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label htmlFor="reset-email" className="text-xs font-bold uppercase tracking-widest text-stone-500 px-1 font-body">Email Address</label>
                <input
                  id="reset-email"
                  className="w-full bg-surface-container-high dark:bg-stone-800 border-0 border-b-2 border-outline-variant/30 focus:border-primary-container focus:ring-0 px-4 py-3 rounded-t-lg transition-all text-on-surface dark:text-stone-100 placeholder:text-stone-400 font-body"
                  placeholder="athlete@movem3ana.com"
                  type="email"
                />
              </div>
            </div>

            <button className="w-full bg-primary-container hover:bg-primary text-white font-headline uppercase tracking-wider text-xl font-black py-4 rounded-xl transition-all active:scale-[0.98] transform shadow-lg shadow-primary-container/20">
              Send Reset Link
            </button>

            <div className="text-center pt-4">
              <Link to="/auth?tab=login" className="text-sm font-semibold text-primary-container hover:underline font-body flex items-center justify-center gap-2">
                <Icon name="arrow_back" size={16} />
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
