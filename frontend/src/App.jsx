import { Routes, Route, useLocation } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
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

const NO_FOOTER = ['/admin', '/map', '/auth', '/forgot-password']

function Layout() {
  const { pathname } = useLocation()
  const showFooter = !NO_FOOTER.includes(pathname)

  return (
    <div className="min-h-screen flex flex-col bg-surface dark:bg-stone-950 text-on-surface dark:text-stone-100">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/"        element={<HomePage />} />
          <Route path="/club"    element={<ClubPage />} />
          <Route path="/auth"    element={<AuthPage />} />
          <Route path="/admin"   element={<AdminPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/map"     element={<MapPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/club/book" element={<BookingPage />} />
          <Route path="/club/events" element={<ClubEventsPage />} />
        </Routes>
      </main>
      {showFooter && <Footer />}
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <Layout />
    </ThemeProvider>
  )
}
