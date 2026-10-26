/**
 * Componente principal de la aplicación RS Creativ.
 *
 * Incluye:
 * - Sitio público con BrowserRouter (dominio propio)
 * - Panel de administración en /admin (login + dashboard)
 * - Páginas creadas desde el panel en /p/:slug
 */

import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

// Componentes de layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import FloatingButtons from './components/ui/FloatingButtons';

// Páginas públicas
import Home from './pages/Home';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import Terminos from './pages/Terminos';
import CmsPage from './pages/CmsPage';

// Panel de administración
import { AuthProvider } from './admin/AuthContext';
import RequireAuth from './admin/components/RequireAuth';
import AdminLayout from './admin/components/AdminLayout';
import Login from './admin/pages/Login';
import Dashboard from './admin/pages/Dashboard';
import PagesList from './admin/pages/PagesList';
import PageEditor from './admin/pages/PageEditor';
import ServicesAdmin from './admin/pages/ServicesAdmin';
import PortfolioAdmin from './admin/pages/PortfolioAdmin';
import TeamAdmin from './admin/pages/TeamAdmin';
import ClientsAdmin from './admin/pages/ClientsAdmin';
import MessagesAdmin from './admin/pages/MessagesAdmin';
import MediaLibrary from './admin/pages/MediaLibrary';
import SettingsAdmin from './admin/pages/SettingsAdmin';
import UsersAdmin from './admin/pages/UsersAdmin';
import AccountAdmin from './admin/pages/AccountAdmin';

/**
 * Componente que maneja el scroll al inicio al cambiar de ruta.
 */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

/**
 * Redirige enlaces antiguos con hash (/#/servicios) a rutas limpias.
 */
function LegacyHashRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.hash.startsWith('#/')) {
      navigate(window.location.hash.slice(1), { replace: true });
    }
  }, [navigate]);

  return null;
}

/**
 * Rutas públicas con transiciones animadas entre páginas.
 */
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/servicios" element={<Services />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/terminos-y-condiciones" element={<Terminos />} />
        <Route path="/p/:slug" element={<CmsPage />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </AnimatePresence>
  );
}

function PublicLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <AnimatedRoutes />
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
}

/**
 * Componente raíz de la aplicación.
 */
function App() {
  return (
    <Router>
      <AuthProvider>
        <ScrollToTop />
        <LegacyHashRedirect />
        <Routes>
          <Route path="/admin/login" element={<Login />} />

          <Route
            path="/admin"
            element={
              <RequireAuth>
                <AdminLayout />
              </RequireAuth>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="paginas" element={<PagesList />} />
            <Route path="paginas/:id" element={<PageEditor />} />
            <Route path="servicios" element={<ServicesAdmin />} />
            <Route path="portafolio" element={<PortfolioAdmin />} />
            <Route path="equipo" element={<TeamAdmin />} />
            <Route path="clientes" element={<ClientsAdmin />} />
            <Route path="mensajes" element={<MessagesAdmin />} />
            <Route path="imagenes" element={<MediaLibrary />} />
            <Route path="configuracion" element={<SettingsAdmin />} />
            <Route path="usuarios" element={<UsersAdmin />} />
            <Route path="cuenta" element={<AccountAdmin />} />
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Route>

          <Route path="*" element={<PublicLayout />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
