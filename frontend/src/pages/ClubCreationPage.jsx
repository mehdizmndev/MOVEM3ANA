import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from '../components/Icon'
import { clubs as clubsApi } from '../services/api'
import { useAuth } from '../context/AuthContext'

export default function ClubCreationPage() {
  const navigate = useNavigate()
  const { user, setUser } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    name: '',
    sport: 'Fitness',
    description: '',
    address: '',
    city: 'Tanger',
    phone: '',
    email: user?.email || '',
    tarifs: '',
    horaires: '',
    facebook: '',
    instagram: '',
    website: '',
    latitude: '',
    longitude: '',
  })

  const sports = ['Fitness', 'Natation', 'Tennis', 'Basketball', 'Yoga', 'Football', 'Boxe', 'Arts Martiaux']

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const data = new FormData()
      
      // Base fields
      const baseFields = ['name', 'sport', 'description', 'address', 'city', 'phone', 'email', 'tarifs', 'horaires', 'latitude', 'longitude']
      baseFields.forEach(key => {
        if (formData[key] !== '') {
          data.append(key, formData[key])
        }
      })

      // Social links - only append if not empty to avoid empty array elements
      if (formData.facebook) data.append('social_links[facebook]', formData.facebook)
      if (formData.instagram) data.append('social_links[instagram]', formData.instagram)
      if (formData.website) data.append('social_links[website]', formData.website)
      
      const logoFile = e.target.logo.files[0]
      if (logoFile) data.append('logo', logoFile)

      const imageFiles = e.target.images.files
      if (imageFiles && imageFiles.length > 0) {
        for (let i = 0; i < imageFiles.length; i++) {
          data.append('images[]', imageFiles[i])
        }
      }

      const res = await clubsApi.store(data)
      
      if (res.data.success) {
        // Update local user with the new club info
        const newClub = res.data.data
        const updatedUser = { ...user, club: newClub }
        setUser(updatedUser)
        
        // Wait a bit for state to propagate
        setTimeout(() => {
          navigate('/club-portal')
        }, 100)
      } else {
        throw new Error(res.data.message || 'Erreur inconnue')
      }
    } catch (err) {
      console.error('Club creation error:', err)
      setError(err.response?.data?.message || err.message || 'Erreur lors de la création du club.')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen pb-16 bg-surface dark:bg-stone-950 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-6xl font-black italic tracking-tighter font-headline uppercase leading-none mb-4">Créez votre Arena</h1>
          <p className="text-stone-500 font-body max-w-xl mx-auto">Complétez les détails de votre club pour rejoindre la communauté MOVE M3ANA et commencer à attirer des sportifs.</p>
        </header>

        {error && (
          <div className="mb-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded-2xl flex items-center gap-3 font-body">
            <Icon name="error" size={20} /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-surface-container-low dark:bg-stone-900 rounded-3xl p-8 md:p-12 border border-stone-100 dark:border-stone-800 shadow-2xl shadow-stone-900/5 space-y-10">
          {/* Section 1: Base */}
          <section className="space-y-6">
            <h2 className="text-2xl font-black italic uppercase tracking-tight font-headline flex items-center gap-2">
              <span className="w-8 h-8 bg-primary-container text-white rounded-full flex items-center justify-center text-sm not-italic">1</span>
              Informations de base
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-widest text-stone-500 px-1 font-body">Nom du Club</label>
                <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-stone-50 dark:bg-stone-800 border-b-2 border-stone-200 dark:border-stone-700 focus:border-primary-container p-3 rounded-t-lg transition-all font-body text-on-surface dark:text-stone-100" placeholder="Ex: Tanger Fitness Pro" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-widest text-stone-500 px-1 font-body">Discipline principale</label>
                <select value={formData.sport} onChange={e => setFormData({...formData, sport: e.target.value})} className="w-full bg-stone-50 dark:bg-stone-800 border-b-2 border-stone-200 dark:border-stone-700 focus:border-primary-container p-3 rounded-t-lg transition-all font-body text-on-surface dark:text-stone-100">
                  {sports.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="md:col-span-2 space-y-1">
                <label className="text-xs font-bold uppercase tracking-widest text-stone-500 px-1 font-body">Description</label>
                <textarea rows={4} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-stone-50 dark:bg-stone-800 border-b-2 border-stone-200 dark:border-stone-700 focus:border-primary-container p-3 rounded-t-lg transition-all font-body text-on-surface dark:text-stone-100" placeholder="Décrivez l'ambiance, les équipements, votre mission..." />
              </div>
            </div>
          </section>

          {/* Section 2: Contact & Location */}
          <section className="space-y-6">
            <h2 className="text-2xl font-black italic uppercase tracking-tight font-headline flex items-center gap-2">
              <span className="w-8 h-8 bg-primary-container text-white rounded-full flex items-center justify-center text-sm not-italic">2</span>
              Contact & Emplacement
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-widest text-stone-500 px-1 font-body">Adresse</label>
                <input required value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full bg-stone-50 dark:bg-stone-800 border-b-2 border-stone-200 dark:border-stone-700 focus:border-primary-container p-3 rounded-t-lg transition-all font-body text-on-surface dark:text-stone-100" placeholder="Ex: 12 Rue de la Liberté" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-widest text-stone-500 px-1 font-body">Ville</label>
                <input required value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} className="w-full bg-stone-50 dark:bg-stone-800 border-b-2 border-stone-200 dark:border-stone-700 focus:border-primary-container p-3 rounded-t-lg transition-all font-body text-on-surface dark:text-stone-100" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-widest text-stone-500 px-1 font-body">Téléphone</label>
                <input required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-stone-50 dark:bg-stone-800 border-b-2 border-stone-200 dark:border-stone-700 focus:border-primary-container p-3 rounded-t-lg transition-all font-body text-on-surface dark:text-stone-100" placeholder="05XXXXXXXX" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-widest text-stone-500 px-1 font-body">Email public</label>
                <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-stone-50 dark:bg-stone-800 border-b-2 border-stone-200 dark:border-stone-700 focus:border-primary-container p-3 rounded-t-lg transition-all font-body text-on-surface dark:text-stone-100" placeholder="contact@votreclub.ma" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-widest text-stone-500 px-1 font-body">Latitude (Optionnel)</label>
                <input type="number" step="any" value={formData.latitude} onChange={e => setFormData({...formData, latitude: e.target.value})} className="w-full bg-stone-50 dark:bg-stone-800 border-b-2 border-stone-200 dark:border-stone-700 focus:border-primary-container p-3 rounded-t-lg transition-all font-body text-on-surface dark:text-stone-100" placeholder="35.7595" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-widest text-stone-500 px-1 font-body">Longitude (Optionnel)</label>
                <input type="number" step="any" value={formData.longitude} onChange={e => setFormData({...formData, longitude: e.target.value})} className="w-full bg-stone-50 dark:bg-stone-800 border-b-2 border-stone-200 dark:border-stone-700 focus:border-primary-container p-3 rounded-t-lg transition-all font-body text-on-surface dark:text-stone-100" placeholder="-5.8340" />
              </div>
            </div>
          </section>

          {/* Section 3: Details */}
          <section className="space-y-6">
            <h2 className="text-2xl font-black italic uppercase tracking-tight font-headline flex items-center gap-2">
              <span className="w-8 h-8 bg-primary-container text-white rounded-full flex items-center justify-center text-sm not-italic">3</span>
              Tarifs & Horaires
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-widest text-stone-500 px-1 font-body">Tarifs (Ex: 300 DH / mois)</label>
                <input value={formData.tarifs} onChange={e => setFormData({...formData, tarifs: e.target.value})} className="w-full bg-stone-50 dark:bg-stone-800 border-b-2 border-stone-200 dark:border-stone-700 focus:border-primary-container p-3 rounded-t-lg transition-all font-body text-on-surface dark:text-stone-100" placeholder="Indiquez vos prix principaux" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-widest text-stone-500 px-1 font-body">Horaires (Ex: 08:00 - 22:00)</label>
                <input value={formData.horaires} onChange={e => setFormData({...formData, horaires: e.target.value})} className="w-full bg-stone-50 dark:bg-stone-800 border-b-2 border-stone-200 dark:border-stone-700 focus:border-primary-container p-3 rounded-t-lg transition-all font-body text-on-surface dark:text-stone-100" placeholder="Horaires d'ouverture" />
              </div>
            </div>
          </section>

          {/* Section 4: Social */}
          <section className="space-y-6">
            <h2 className="text-2xl font-black italic uppercase tracking-tight font-headline flex items-center gap-2">
              <span className="w-8 h-8 bg-primary-container text-white rounded-full flex items-center justify-center text-sm not-italic">4</span>
              Réseaux Sociaux
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-widest text-stone-500 px-1 font-body">Facebook</label>
                <input value={formData.facebook} onChange={e => setFormData({...formData, facebook: e.target.value})} className="w-full bg-stone-50 dark:bg-stone-800 border-b-2 border-stone-200 dark:border-stone-700 focus:border-primary-container p-3 rounded-t-lg transition-all font-body text-on-surface dark:text-stone-100" placeholder="URL Facebook" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-widest text-stone-500 px-1 font-body">Instagram</label>
                <input value={formData.instagram} onChange={e => setFormData({...formData, instagram: e.target.value})} className="w-full bg-stone-50 dark:bg-stone-800 border-b-2 border-stone-200 dark:border-stone-700 focus:border-primary-container p-3 rounded-t-lg transition-all font-body text-on-surface dark:text-stone-100" placeholder="URL Instagram" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-widest text-stone-500 px-1 font-body">Site Web</label>
                <input value={formData.website} onChange={e => setFormData({...formData, website: e.target.value})} className="w-full bg-stone-50 dark:bg-stone-800 border-b-2 border-stone-200 dark:border-stone-700 focus:border-primary-container p-3 rounded-t-lg transition-all font-body text-on-surface dark:text-stone-100" placeholder="https://votreclub.ma" />
              </div>
            </div>
          </section>

          {/* Section 5: Media */}
          <section className="space-y-6">
            <h2 className="text-2xl font-black italic uppercase tracking-tight font-headline flex items-center gap-2">
              <span className="w-8 h-8 bg-primary-container text-white rounded-full flex items-center justify-center text-sm not-italic">5</span>
              Identité Visuelle
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-stone-500 px-1 font-body">Logo du Club</label>
                <div className="border-2 border-dashed border-stone-200 dark:border-stone-700 rounded-2xl p-6 text-center hover:border-primary-container transition-colors">
                  <Icon name="upload" className="mx-auto mb-2 text-stone-400" />
                  <p className="text-xs text-stone-500 font-body">Cliquez pour ajouter un logo</p>
                  <input type="file" name="logo" className="mt-4 text-xs font-body" accept="image/*" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-stone-500 px-1 font-body">Galerie Photos (Plusieurs)</label>
                <div className="border-2 border-dashed border-stone-200 dark:border-stone-700 rounded-2xl p-6 text-center hover:border-primary-container transition-colors">
                  <Icon name="collections" className="mx-auto mb-2 text-stone-400" />
                  <p className="text-xs text-stone-500 font-body">Photos de vos salles, coachs, équipements...</p>
                  <input type="file" name="images" multiple className="mt-4 text-xs font-body" accept="image/*" />
                </div>
              </div>
            </div>
          </section>

          <div className="pt-8">
            <button type="submit" disabled={loading} className="w-full bg-primary-container text-white py-5 rounded-2xl font-headline font-black uppercase tracking-widest text-2xl shadow-xl shadow-primary-container/20 hover:bg-primary transition-all active:scale-[0.98] transform disabled:opacity-50">
              {loading ? 'Création en cours...' : 'Lancer mon Club'}
            </button>
            <p className="text-center text-xs text-stone-500 mt-6 font-body">En créant ce club, vous acceptez nos conditions d'utilisation pour les partenaires.</p>
          </div>
        </form>
      </div>
    </main>
  )
}
