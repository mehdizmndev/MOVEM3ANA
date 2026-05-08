import { useState } from 'react'
import Icon from '../components/Icon'
import { useAuth } from '../context/AuthContext'
import { profile as profileApi } from '../services/api'

export default function ProfilePage() {
  const { user, setUser } = useAuth()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const [passData, setPassData] = useState({
    current_password: '',
    password: '',
    password_confirmation: '',
  })

  const handleUpdateProfile = async (e) => {
    e.preventDefault()
    setLoading(true)
    setSuccess('')
    setError('')
    const formData = new FormData(e.target)
    try {
      const res = await profileApi.update(formData)
      setUser(res.data.data)
      setSuccess('Profil mis à jour avec succès !')
    } catch (err) {
      console.error('Update error:', err.response?.data)
      const errorMsg = err.response?.data?.errors 
        ? Object.values(err.response.data.errors).flat().join(' ')
        : (err.response?.data?.message || 'Erreur lors de la mise à jour.')
      setError(errorMsg)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdatePassword = async (e) => {
    e.preventDefault()
    setLoading(true)
    setSuccess('')
    setError('')
    try {
      await profileApi.updatePassword(passData)
      setSuccess('Mot de passe mis à jour !')
      setPassData({ current_password: '', password: '', password_confirmation: '' })
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors du changement de mot de passe.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="pb-16 px-8 max-w-5xl mx-auto">
      <header className="mb-12">
        <h1 className="text-6xl font-black italic tracking-tighter font-headline uppercase leading-none mb-2">Mon Profil</h1>
        <p className="text-stone-500 font-body">Gérez vos informations personnelles et votre sécurité.</p>
      </header>

      {success && (
        <div className="mb-8 p-4 bg-green-100 border border-green-400 text-green-700 rounded-xl flex items-center gap-3">
          <Icon name="check_circle" size={20} /> {success}
        </div>
      )}
      {error && (
        <div className="mb-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded-xl flex items-center gap-3">
          <Icon name="error" size={20} /> {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Profile Info */}
        <div className="lg:col-span-2 space-y-12">
          <section className="bg-surface-container-low dark:bg-stone-900 p-8 rounded-3xl border border-stone-100 dark:border-stone-800 shadow-xl shadow-stone-900/5">
            <h2 className="text-2xl font-black italic tracking-tighter font-headline uppercase mb-8 flex items-center gap-3">
              <Icon name="person" className="text-primary-container" /> Informations Personnelles
            </h2>
            <form onSubmit={handleUpdateProfile} className="space-y-6">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="relative group cursor-pointer">
                  <div className="w-24 h-24 rounded-full bg-stone-200 dark:bg-stone-800 flex items-center justify-center overflow-hidden border-4 border-white dark:border-stone-700 shadow-lg">
                    {user?.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                      <Icon name="person" size={40} className="text-stone-400" />
                    )}
                  </div>
                  <label className="absolute inset-0 flex items-center justify-center bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity rounded-full cursor-pointer">
                    <Icon name="photo_camera" />
                    <input type="file" name="avatar" className="hidden" />
                  </label>
                </div>
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-widest text-stone-500 font-body">Prénom</label>
                    <input name="first_name" defaultValue={user?.name?.split(' ')[0]} className="w-full bg-stone-50 dark:bg-stone-800 border-b-2 border-stone-200 dark:border-stone-700 focus:border-primary-container p-3 rounded-t-lg transition-all font-body text-on-surface dark:text-stone-100" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-widest text-stone-500 font-body">Nom</label>
                    <input name="last_name" defaultValue={user?.name?.split(' ').slice(1).join(' ')} className="w-full bg-stone-50 dark:bg-stone-800 border-b-2 border-stone-200 dark:border-stone-700 focus:border-primary-container p-3 rounded-t-lg transition-all font-body text-on-surface dark:text-stone-100" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-widest text-stone-500 font-body">Email</label>
                    <input name="email" defaultValue={user?.email} disabled className="w-full bg-stone-100 dark:bg-stone-900 border-b-2 border-stone-200 dark:border-stone-800 p-3 rounded-t-lg font-body text-stone-400 italic" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-widest text-stone-500 font-body">Téléphone</label>
                    <input name="phone" defaultValue={user?.phone} className="w-full bg-stone-50 dark:bg-stone-800 border-b-2 border-stone-200 dark:border-stone-700 focus:border-primary-container p-3 rounded-t-lg transition-all font-body text-on-surface dark:text-stone-100" />
                  </div>
                </div>
              </div>
              <div className="flex justify-end pt-4">
                <button disabled={loading} className="bg-primary-container text-white px-8 py-3 rounded-xl font-headline font-bold uppercase tracking-widest hover:bg-primary transition-all disabled:opacity-50">
                  {loading ? 'Enregistrement...' : 'Enregistrer'}
                </button>
              </div>
            </form>
          </section>

          <section className="bg-surface-container-low dark:bg-stone-900 p-8 rounded-3xl border border-stone-100 dark:border-stone-800 shadow-xl shadow-stone-900/5">
            <h2 className="text-2xl font-black italic tracking-tighter font-headline uppercase mb-8 flex items-center gap-3">
              <Icon name="lock" className="text-primary-container" /> Sécurité
            </h2>
            <form onSubmit={handleUpdatePassword} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2 space-y-1">
                  <label className="text-xs font-bold uppercase tracking-widest text-stone-500 font-body">Mot de passe actuel</label>
                  <input 
                    type="password" 
                    value={passData.current_password}
                    onChange={e => setPassData({...passData, current_password: e.target.value})}
                    className="w-full bg-stone-50 dark:bg-stone-800 border-b-2 border-stone-200 dark:border-stone-700 focus:border-primary-container p-3 rounded-t-lg transition-all font-body text-on-surface dark:text-stone-100" 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-widest text-stone-500 font-body">Nouveau mot de passe</label>
                  <input 
                    type="password" 
                    value={passData.password}
                    onChange={e => setPassData({...passData, password: e.target.value})}
                    className="w-full bg-stone-50 dark:bg-stone-800 border-b-2 border-stone-200 dark:border-stone-700 focus:border-primary-container p-3 rounded-t-lg transition-all font-body text-on-surface dark:text-stone-100" 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-widest text-stone-500 font-body">Confirmer le mot de passe</label>
                  <input 
                    type="password" 
                    value={passData.password_confirmation}
                    onChange={e => setPassData({...passData, password_confirmation: e.target.value})}
                    className="w-full bg-stone-50 dark:bg-stone-800 border-b-2 border-stone-200 dark:border-stone-700 focus:border-primary-container p-3 rounded-t-lg transition-all font-body text-on-surface dark:text-stone-100" 
                  />
                </div>
              </div>
              <div className="flex justify-end pt-4">
                <button disabled={loading} className="bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 px-8 py-3 rounded-xl font-headline font-bold uppercase tracking-widest hover:bg-orange-600 dark:hover:bg-orange-600 hover:text-white transition-all disabled:opacity-50">
                  Modifier le mot de passe
                </button>
              </div>
            </form>
          </section>
        </div>

        {/* Sidebar Info */}
        <aside className="space-y-8">
          <div className="bg-primary-container text-white p-8 rounded-3xl shadow-xl shadow-primary-container/20">
            <h3 className="text-xl font-black italic tracking-tighter font-headline uppercase mb-4">Statut du Compte</h3>
            <div className="flex items-center gap-2 mb-6">
              <span className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm font-bold uppercase tracking-widest">{user?.is_active ? 'Actif' : 'Inactif'}</span>
            </div>
            <div className="space-y-2 opacity-80 text-sm font-body">
              <p>Membre depuis : {user?.created_at ? new Date(user.created_at).toLocaleDateString() : '—'}</p>
              <p>Rôle : <span className="font-bold uppercase">{user?.role}</span></p>
            </div>
          </div>

          <div className="bg-surface-container-high dark:bg-stone-800 p-8 rounded-3xl border border-stone-100 dark:border-stone-700">
            <h3 className="text-xl font-black italic tracking-tighter font-headline uppercase mb-6">Préférences</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold font-body">Newsletter</span>
                <div className="w-10 h-6 bg-primary-container rounded-full relative"><div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" /></div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold font-body">Notifications</span>
                <div className="w-10 h-6 bg-stone-300 dark:bg-stone-600 rounded-full relative"><div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" /></div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  )
}
