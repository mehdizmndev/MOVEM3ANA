import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'
import Navbar   from './components/Navbar'
import Footer   from './components/Footer'
import HomePage    from './pages/HomePage'
import ClubPage    from './pages/ClubPage'
import AuthPage    from './pages/AuthPage'
import AdminPage   from './pages/AdminPage'
import PricingPage from './pages/PricingPage'
import MapPage     from './pages/MapPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import BookingPage from './pages/BookingPage'
import ClubEventsPage from './pages/ClubEventsPage'
import ContactPage from './pages/ContactPage'
import ProfilePage from './pages/ProfilePage'
import ClubPortalPage from './pages/ClubPortalPage'
import ClubCreationPage from './pages/ClubCreationPage'
import ClubEventsManagementPage from './pages/ClubEventsManagementPage'
import { useAuth } from './context/AuthContext'

const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = useAuth()
  if (loading) return null
  if (!user) return <Navigate to="/auth" replace />
  if (role && user.role !== role) return <Navigate to="/" replace />
  return children
}

const NO_FOOTER = ['/admin', '/club-portal', '/map', '/auth', '/forgot-password']

function Layout() {
  const { pathname } = useLocation()
  const showFooter = !NO_FOOTER.some(p => pathname.startsWith(p))

  return (
    <div className="min-h-screen flex flex-col bg-surface dark:bg-stone-950 text-on-surface dark:text-stone-100">
      <Navbar />
      <main className="flex-1 pt-[72px]">
        <Routes>
          <Route path="/"        element={<HomePage />} />
          <Route path="/club/:id"    element={<ClubPage />} />
          <Route path="/club"    element={<Navigate to="/map" replace />} />
          <Route path="/auth"    element={<AuthPage />} />
          <Route path="/admin"   element={<ProtectedRoute role="admin"><AdminPage /></ProtectedRoute>} />
          <Route path="/club-portal" element={<ProtectedRoute role="club"><ClubPortalPage /></ProtectedRoute>} />
          <Route path="/club-create" element={<ProtectedRoute role="club"><ClubCreationPage /></ProtectedRoute>} />
          <Route path="/club-events" element={<ProtectedRoute role="club"><ClubEventsManagementPage /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/map"     element={<MapPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/club/:id/book" element={<BookingPage />} />
          <Route path="/club/:id/events" element={<ClubEventsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      {showFooter && <Footer />}
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Layout />
      </AuthProvider>
    </ThemeProvider>
  )
}
