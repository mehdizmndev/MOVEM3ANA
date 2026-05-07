import { useState } from 'react'
import Icon from '../components/Icon'
import { general } from '../services/api'
import { useAuth } from '../context/AuthContext'

export default function ContactPage() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    subject: '',
    message: ''
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await general.contact(form)
      setSuccess(true)
      setForm({ ...form, subject: '', message: '' })
    } catch (err) {
      setError(err.response?.data?.message || 'Une erreur est survenue lors de l\'envoi.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="pb-20 min-h-screen bg-surface dark:bg-stone-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="font-headline text-5xl md:text-7xl font-black uppercase tracking-tighter text-on-surface dark:text-stone-100 mb-4">Contactez-nous</h1>
          <p className="font-body text-on-surface-variant dark:text-stone-400 text-lg max-w-2xl mx-auto">
            Une question, une suggestion ou un problème ? L'équipe de MOVE M3ANA est là pour vous répondre.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Info Section */}
          <div className="flex flex-col gap-8">
            <div className="bg-surface-container-low dark:bg-stone-900 p-8 rounded-[2rem] border border-outline-variant/10 dark:border-stone-800">
              <h2 className="font-headline text-3xl font-black uppercase tracking-tight text-on-surface dark:text-stone-100 mb-6">Nos Coordonnées</h2>
              <div className="space-y-6">
                {[
                  { icon: 'location_on', title: 'Adresse', desc: 'Tangier Sports City, Maroc' },
                  { icon: 'email', title: 'Email', desc: 'contact@movem3ana.ma' },
                  { icon: 'call', title: 'Téléphone', desc: '+212 5 39 00 00 00' },
                ].map(({ icon, title, desc }) => (
                  <div key={title} className="flex items-start gap-4">
                    <div className="bg-primary-container/10 p-3 rounded-2xl">
                      <Icon name={icon} size={24} className="text-primary-container" />
                    </div>
                    <div>
                      <h3 className="font-bold uppercase tracking-widest text-xs text-on-surface-variant font-body mb-1">{title}</h3>
                      <p className="font-headline font-bold text-lg text-on-surface dark:text-stone-100">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-primary-container p-8 rounded-[2rem] text-white">
              <h2 className="font-headline text-2xl font-black uppercase tracking-tight mb-4">Support Clubs</h2>
              <p className="font-body text-white/80 mb-6">
                Vous êtes un club partenaire ou souhaitez le devenir ? Notre équipe dédiée est à votre disposition.
              </p>
              <a href="mailto:partners@movem3ana.ma" className="inline-flex items-center gap-2 font-bold uppercase underline underline-offset-4 font-body">
                <Icon name="email" size={18} /> partners@movem3ana.ma
              </a>
            </div>
          </div>

          {/* Form Section */}
          <div className="bg-surface-container-lowest dark:bg-stone-900 p-8 md:p-10 rounded-[2rem] border border-outline-variant/10 dark:border-stone-800 shadow-sm">
            <h2 className="font-headline text-3xl font-black uppercase tracking-tight text-on-surface dark:text-stone-100 mb-8">Envoyer un Message</h2>
            
            {success ? (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-300 p-6 rounded-2xl flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-800/50 rounded-full flex items-center justify-center">
                  <Icon name="check" size={32} />
                </div>
                <div>
                  <h3 className="font-headline text-xl font-bold uppercase mb-2">Message Envoyé !</h3>
                  <p className="font-body text-sm opacity-90">Merci de nous avoir contactés. Notre équipe vous répondra dans les plus brefs délais.</p>
                </div>
                <button onClick={() => setSuccess(false)} className="mt-4 text-xs font-bold uppercase tracking-widest underline decoration-2 underline-offset-4 hover:text-green-600 transition-colors">
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-bold font-body">
                    {error}
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant font-body">Nom Complet</label>
                    <input name="name" value={form.name} onChange={handleChange} required className="w-full bg-surface dark:bg-stone-950 border border-outline-variant/20 dark:border-stone-800 focus:border-primary-container px-4 py-3 rounded-xl outline-none transition-all text-on-surface dark:text-stone-100 font-body" placeholder="Votre nom" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant font-body">Email</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} required className="w-full bg-surface dark:bg-stone-950 border border-outline-variant/20 dark:border-stone-800 focus:border-primary-container px-4 py-3 rounded-xl outline-none transition-all text-on-surface dark:text-stone-100 font-body" placeholder="votre@email.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant font-body">Sujet</label>
                  <input name="subject" value={form.subject} onChange={handleChange} required className="w-full bg-surface dark:bg-stone-950 border border-outline-variant/20 dark:border-stone-800 focus:border-primary-container px-4 py-3 rounded-xl outline-none transition-all text-on-surface dark:text-stone-100 font-body" placeholder="De quoi s'agit-il ?" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant font-body">Message</label>
                  <textarea name="message" value={form.message} onChange={handleChange} required rows={5} className="w-full bg-surface dark:bg-stone-950 border border-outline-variant/20 dark:border-stone-800 focus:border-primary-container px-4 py-3 rounded-xl outline-none transition-all text-on-surface dark:text-stone-100 font-body" placeholder="Votre message détaillé..." />
                </div>
                <button disabled={loading} type="submit" className="w-full bg-primary hover:bg-primary-container text-white font-headline text-xl font-black uppercase tracking-tight py-4 rounded-xl transition-all active:scale-[0.98] disabled:opacity-50">
                  {loading ? 'Envoi en cours...' : 'Envoyer le Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
