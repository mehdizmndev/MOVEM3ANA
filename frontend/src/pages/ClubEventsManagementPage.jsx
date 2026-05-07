import React, { useState, useEffect } from 'react'
import { events as eventsApi } from '../services/api'
import Icon from '../components/Icon'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { useAuth } from '../context/AuthContext'

export default function ClubEventsManagementPage() {
  const { user } = useAuth()
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('upcoming') // upcoming, past
  const [showAddModal, setShowAddModal] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    capacity: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchEvents()
  }, [filter])

  const fetchEvents = async () => {
    try {
      setLoading(true)
      const res = await eventsApi.myEvents(filter)
      setEvents(res.data.data)
    } catch (err) {
      console.error('Error fetching events:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    
    const data = new FormData()
    data.append('club_id', user?.club?.id)
    Object.keys(formData).forEach(key => data.append(key, formData[key]))
    if (e.target.image.files[0]) {
      data.append('image', e.target.image.files[0])
    }

    try {
      await eventsApi.store(data)
      setShowAddModal(false)
      setFormData({ title: '', description: '', date: '', location: '', capacity: '' })
      fetchEvents()
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la création.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer cet événement ?')) return
    try {
      await eventsApi.delete(id)
      fetchEvents()
    } catch (err) {
      alert('Erreur lors de la suppression.')
    }
  }

  return (
    <div className="min-h-screen pb-12 bg-surface dark:bg-stone-950 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
          <div>
            <h1 className="text-5xl font-black italic uppercase tracking-tighter font-headline leading-none mb-2">Gestion des Événements</h1>
            <p className="text-stone-500 font-body">Créez et gérez les moments forts de votre club.</p>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-primary-container text-white px-6 py-3 rounded-2xl font-headline font-black uppercase tracking-widest flex items-center gap-2 hover:bg-primary transition-all shadow-xl shadow-primary-container/20"
          >
            <Icon name="add" size={20} /> Nouvel Événement
          </button>
        </header>

        {/* Filters */}
        <div className="flex gap-4 mb-8">
          {['upcoming', 'past'].map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-6 py-2 rounded-full font-headline font-bold uppercase tracking-tighter transition-all ${
                filter === s 
                  ? 'bg-stone-900 dark:bg-white text-white dark:text-stone-900 scale-105' 
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-500 hover:bg-stone-200'
              }`}
            >
              {s === 'upcoming' ? 'À venir' : 'Passés'}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3].map(i => <div key={i} className="h-64 bg-stone-100 dark:bg-stone-900 rounded-3xl animate-pulse" />)}
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-20 bg-stone-50 dark:bg-stone-900/50 rounded-3xl border-2 border-dashed border-stone-200 dark:border-stone-800">
            <Icon name="event_busy" size={48} className="text-stone-300 mx-auto mb-4" />
            <p className="text-stone-500 font-body">Aucun événement trouvé.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map(event => (
              <div key={event.id} className="group bg-surface-container-low dark:bg-stone-900 rounded-3xl overflow-hidden border border-stone-100 dark:border-stone-800 hover:shadow-2xl transition-all">
                <div className="h-48 relative">
                  <img 
                    src={event.image || 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80'} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                    alt={event.title} 
                  />
                  <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 dark:bg-stone-900/90 backdrop-blur rounded-full text-[10px] font-black uppercase tracking-widest">
                    {event.is_sold_out ? (
                      <span className="text-red-500">Sold Out</span>
                    ) : (
                      <span className="text-green-500">{event.available_slots} Places</span>
                    )}
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-[10px] font-black text-primary-container uppercase tracking-widest mb-1">
                    {format(new Date(event.date), 'EEEE d MMMM yyyy', { locale: fr })}
                  </p>
                  <h3 className="text-xl font-black italic uppercase tracking-tight font-headline mb-2">{event.title}</h3>
                  <p className="text-stone-500 text-sm font-body line-clamp-2 mb-4">{event.description}</p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-stone-100 dark:border-stone-800">
                    <div className="flex items-center gap-2 text-stone-400">
                      <Icon name="place" size={14} />
                      <span className="text-xs font-bold truncate max-w-[120px]">{event.location}</span>
                    </div>
                    <button 
                      onClick={() => handleDelete(event.id)}
                      className="p-2 text-stone-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all"
                    >
                      <Icon name="delete" size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm">
          <div className="bg-surface dark:bg-stone-900 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
            <header className="p-6 border-b border-stone-100 dark:border-stone-800 flex justify-between items-center">
              <h2 className="text-2xl font-black italic uppercase tracking-tight font-headline">Nouvel Événement</h2>
              <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-full transition-all">
                <Icon name="close" />
              </button>
            </header>
            
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              {error && <div className="p-3 bg-red-100 text-red-700 rounded-xl text-sm font-body">{error}</div>}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1 md:col-span-2">
                  <label className="text-[10px] font-black uppercase text-stone-400 tracking-widest px-1">Titre de l'événement</label>
                  <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-stone-50 dark:bg-stone-800 border-none p-3 rounded-xl focus:ring-2 focus:ring-primary-container transition-all font-body" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-stone-400 tracking-widest px-1">Date & Heure</label>
                  <input type="datetime-local" required value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full bg-stone-50 dark:bg-stone-800 border-none p-3 rounded-xl focus:ring-2 focus:ring-primary-container transition-all font-body" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-stone-400 tracking-widest px-1">Capacité (Optionnel)</label>
                  <input type="number" value={formData.capacity} onChange={e => setFormData({...formData, capacity: e.target.value})} className="w-full bg-stone-50 dark:bg-stone-800 border-none p-3 rounded-xl focus:ring-2 focus:ring-primary-container transition-all font-body" placeholder="Ex: 50" />
                </div>
                <div className="space-y-1 md:col-span-2">
                  <label className="text-[10px] font-black uppercase text-stone-400 tracking-widest px-1">Lieu</label>
                  <input required value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full bg-stone-50 dark:bg-stone-800 border-none p-3 rounded-xl focus:ring-2 focus:ring-primary-container transition-all font-body" placeholder="Ex: Salle Principale / Stade Municipal" />
                </div>
                <div className="space-y-1 md:col-span-2">
                  <label className="text-[10px] font-black uppercase text-stone-400 tracking-widest px-1">Description</label>
                  <textarea rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-stone-50 dark:bg-stone-800 border-none p-3 rounded-xl focus:ring-2 focus:ring-primary-container transition-all font-body" />
                </div>
                <div className="space-y-1 md:col-span-2">
                  <label className="text-[10px] font-black uppercase text-stone-400 tracking-widest px-1">Image de couverture</label>
                  <input type="file" name="image" className="w-full text-xs font-body" accept="image/*" />
                </div>
              </div>

              <div className="pt-4">
                <button 
                  disabled={submitting}
                  className="w-full bg-primary-container text-white py-4 rounded-2xl font-headline font-black uppercase tracking-widest shadow-xl shadow-primary-container/20 hover:bg-primary transition-all disabled:opacity-50"
                >
                  {submitting ? 'Création...' : 'Créer l\'événement'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
