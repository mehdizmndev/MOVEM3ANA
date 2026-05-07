import { useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../components/Icon'

const PLANS = [
  {
    name: 'Découverte',
    price: '0 DH',
    sub: 'Parfait pour explorer les clubs de Tanger',
    features: ['Accès à la carte interactive', 'Consultation des avis clients', 'Réservation de 2 séances / mois'],
    locked: ['Accès prioritaire', 'Support premium'],
    featured: false,
    cardClass: 'bg-surface-container-low dark:bg-stone-800 border border-outline-variant/10 dark:border-stone-700',
    btnLabel: 'Commencer Gratuitement',
    btnClass: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
    priceClass: 'text-on-background dark:text-stone-100',
  },
  {
    name: 'Passion',
    price: '199 DH',
    period: '/MOIS',
    sub: 'Pour les sportifs réguliers et passionnés',
    features: ['Réservations illimitées', 'Accès aux événements exclusifs', 'Statistiques de performance', 'Support standard'],
    locked: ['Coaching 1-on-1'],
    featured: true,
    cardClass: 'bg-primary-container text-white shadow-2xl shadow-primary/20 scale-105 z-10',
    btnLabel: 'Choisir le Pass Passion',
    btnClass: 'bg-white text-primary shadow-xl',
    priceClass: 'text-white',
  },
  {
    name: 'Elite',
    price: '499 DH',
    period: '/MOIS',
    sub: 'L\'expérience ultime pour les athlètes exigeants',
    features: ['Tout du Pass Passion', 'Sessions de coaching privées', 'Accès aux Lounges VIP', 'Support Prioritaire 24/7'],
    locked: [],
    featured: false,
    cardClass: 'bg-surface-container-low dark:bg-stone-800 border border-outline-variant/10 dark:border-stone-700',
    btnLabel: 'Devenir Elite',
    btnClass: 'border-2 border-on-background dark:border-stone-100 text-on-background dark:text-stone-100 hover:bg-on-background dark:hover:bg-stone-100 hover:text-surface dark:hover:text-stone-900',
    priceClass: 'text-on-background dark:text-stone-100',
  },
]

const TABLE = [
  { label: 'Global Activity Map',    s: true,       p: true,         e: true },
  { label: 'Monthly Training Limits',s: '3 Slots',  p: 'Unlimited',  e: 'Unlimited' },
  { label: 'Live Group Classes',     s: false,      p: true,         e: true },
  { label: 'Personal Coaching',      s: false,      p: false,        e: true },
  { label: 'Advanced Data Analytics',s: false,      p: true,         e: true },
]

const FAQS = [
  { q: 'Can I cancel my subscription at any time?', a: "Yes, you can cancel at any time. You'll maintain access until the end of your current billing cycle." },
  { q: 'Is there a discount for annual billing?',   a: 'Yes! Choose annual billing at checkout to save 20% compared to monthly rates.' },
  { q: 'What sports are included in the pass?',     a: 'All activities listed in our network: tennis, swimming, CrossFit, yoga, padel, climbing, and more.' },
]

function TableCell({ v, isPro }) {
  if (v === true)  return <Icon name="check"  size={20} className="text-primary mx-auto block" />
  if (v === false) return <Icon name="remove" size={20} className="text-outline-variant mx-auto block" />
  return <span className={`text-xs font-bold uppercase font-body ${isPro ? 'text-primary-container' : 'text-tertiary dark:text-stone-400'}`}>{v}</span>
}

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState(0)

  return (
    <main className="pb-20 bg-background dark:bg-stone-950 min-h-screen">
      {/* ── Hero ── */}
      <section className="max-w-screen-2xl mx-auto px-6 py-12 md:py-20 text-center">
        <h1 className="font-headline text-6xl md:text-8xl font-black uppercase tracking-tighter text-on-background dark:text-stone-100 leading-[0.9] mb-4">
          Choisissez votre <span className="text-primary italic">Pass MOVE M3ANA</span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-tertiary dark:text-stone-400 font-medium font-body">
          Libérez votre potentiel avec des forfaits flexibles adaptés à chaque sportif, du débutant à l'athlète de haut niveau.
        </p>
      </section>

      {/* ── Pricing Cards ── */}
      <section className="max-w-screen-xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 items-center">
        {PLANS.map(({ name, price, period, sub, features, locked, featured, cardClass, btnLabel, btnClass, priceClass }) => (
          <div
            key={name}
            className={`${cardClass} p-8 rounded-xl flex flex-col h-full relative overflow-hidden`}
          >
            {featured && (
              <div className="absolute top-4 right-[-35px] bg-secondary-container text-on-secondary-container font-headline font-black px-12 py-1 rotate-45 uppercase text-xs tracking-widest shadow-lg">
                Populaire
              </div>
            )}
            <div className="mb-8">
              <h3 className={`font-headline text-3xl font-bold uppercase tracking-tighter mb-1 ${featured ? 'text-white' : 'text-on-background dark:text-stone-100'}`}>{name}</h3>
              <p className={`text-sm font-body ${featured ? 'text-white/80' : 'text-tertiary dark:text-stone-400'}`}>{sub}</p>
            </div>
            <div className="mb-8">
              <div className="flex items-baseline gap-1">
                <span className={`font-headline text-5xl font-black ${priceClass}`}>{price}</span>
                {period && <span className={`font-bold font-body ${featured ? 'text-white/80' : 'text-tertiary dark:text-stone-400'}`}>{period}</span>}
              </div>
            </div>
            <ul className="space-y-4 mb-10 flex-grow">
              {features.map(f => (
                <li key={f} className={`flex items-center gap-3 text-sm font-medium font-body ${featured ? 'font-bold text-white' : 'text-on-background dark:text-stone-200'}`}>
                  <Icon name="check_circle" fill={featured ? 1 : 0} size={20} className={featured ? 'text-white' : 'text-primary'} />
                  {f}
                </li>
              ))}
              {locked.map(f => (
                <li key={f} className="flex items-center gap-3 text-sm font-medium text-tertiary dark:text-stone-500 font-body">
                  <Icon name="cancel" size={20} className="text-outline-variant" />
                  {f}
                </li>
              ))}
            </ul>
            <Link to="/auth?tab=signup" className={`w-full py-4 rounded-xl font-headline font-bold uppercase tracking-wider transition-all active:scale-95 text-center ${btnClass}`}>
              {btnLabel}
            </Link>
          </div>
        ))}
      </section>

      {/* ── Feature Table ── */}
      <section className="max-w-screen-lg mx-auto px-6 mb-24">
        <h2 className="font-headline text-4xl font-black uppercase tracking-tighter text-center mb-12 text-on-background dark:text-stone-100">Comparez les Avantages</h2>
        <div className="bg-surface-container-lowest dark:bg-stone-800 rounded-xl overflow-hidden shadow-sm border border-outline-variant/10 dark:border-stone-700">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-high dark:bg-stone-700">
                {['Fonctionnalités', 'Découverte', 'Passion', 'Elite'].map((h, i) => (
                  <th key={h} className={`p-6 font-headline text-lg uppercase tracking-wider text-on-surface dark:text-stone-100 ${i > 0 ? 'text-center' : ''} ${i === 2 ? '!text-primary-container' : ''}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-high dark:divide-stone-700">
              {[
                { label: 'Carte Interactive Globale',    s: true,       p: true,         e: true },
                { label: 'Limites de Réservation',        s: '2 / mois',  p: 'Illimité',  e: 'Illimité' },
                { label: 'Cours Collectifs Live',         s: false,      p: true,         e: true },
                { label: 'Coaching Personnalisé',         s: false,      p: false,        e: true },
                { label: 'Analyses de Performance',       s: false,      p: true,         e: true },
              ].map(({ label, s, p, e }) => (
                <tr key={label}>
                  <td className="p-6 text-sm font-medium text-on-surface dark:text-stone-200 font-body">{label}</td>
                  <td className="p-6 text-center"><TableCell v={s} /></td>
                  <td className="p-6 text-center"><TableCell v={p} isPro /></td>
                  <td className="p-6 text-center"><TableCell v={e} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="max-w-3xl mx-auto px-6 mb-24">
        <h2 className="font-headline text-4xl font-black uppercase tracking-tighter text-center mb-12 text-on-background dark:text-stone-100">
          Questions Fréquemment Posées
        </h2>
        <div className="space-y-4">
          {[
            { q: 'Puis-je annuler mon abonnement à tout moment ?', a: "Oui, vous pouvez annuler à tout moment. Vous conserverez l'accès jusqu'à la fin de votre période de facturation en cours." },
            { q: 'Y a-t-il une réduction pour le paiement annuel ?',   a: 'Oui ! Choisissez la facturation annuelle lors du paiement pour économiser 20% par rapport au tarif mensuel.' },
            { q: 'Quels sports sont inclus dans le pass ?',     a: 'Toutes les activités listées dans notre réseau : tennis, natation, fitness, yoga, basket-ball et bien plus encore.' },
          ].map(({ q, a }, i) => (
            <div key={q} className="bg-surface-container-low dark:bg-stone-800 rounded-xl overflow-hidden border border-outline-variant/10 dark:border-stone-700">
              <button
                onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                className="flex justify-between items-center w-full text-left p-6"
              >
                <span className="font-bold text-lg text-on-surface dark:text-stone-100 font-body">{q}</span>
                <Icon
                  name="expand_more"
                  size={24}
                  className={`text-primary transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`}
                />
              </button>
              {openFaq === i && (
                <div className="px-6 pb-6 text-tertiary dark:text-stone-400 text-sm leading-relaxed font-body">{a}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="max-w-screen-xl mx-auto px-6 mb-12">
        <div className="relative overflow-hidden bg-on-background dark:bg-stone-900 rounded-[2rem] p-12 md:p-20 text-center">
          <div className="absolute inset-0 opacity-20">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEFc7kvrLcUj4hD4MbWYm4s_zhYEjSRtA-MqpavKQBubaVRmmjMZ_IDSXSDBrCjAFGYbr-q2oZlBTJY47gaLGUUihdZ_PtGdswIMW0LRMkjk24ZNitmZQoo3NXa5zQvt53kUWZDXRjtBpykclpW44aKCb7lWr1UJ9xMAD7BnslsG0w_AZeayi7HCBNgYVCE83RyZJWgjboeNcjddCII-JISgLWY9GWBJTXbPsHHi4rcZuoDkNE0pE5n4jntKg29uz5xPWNayuC_VA"
              alt=""
              className="w-full h-full object-cover grayscale"
            />
          </div>
          <div className="relative z-10">
            <h2 className="font-headline text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-6">
              Commencez Gratuitement, Jouez Plus
            </h2>
            <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto font-medium font-body">
              Rejoignez plus de 50 000 sportifs aujourd'hui. Aucune carte de crédit requise pour le plan Découverte.
            </p>
            <Link
              to="/auth?tab=signup"
              className="inline-block bg-primary text-white font-headline text-2xl font-bold uppercase tracking-widest px-12 py-5 rounded-full shadow-2xl shadow-primary/40 hover:bg-primary-container transition-all active:scale-95"
            >
              Inscrivez-vous maintenant
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
