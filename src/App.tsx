/**
 * Componente principal de la aplicación RS Creativ
 * 
 * Este archivo configura el enrutamiento de la aplicación
 * utilizando React Router DOM para la navegación entre páginas.
 * 
 * Funcionalidades:
 * - Rutas para las 4 páginas principales (Inicio, Servicios, Portafolio, Contacto)
 * - Layout común (Navbar + Footer) en todas las páginas
 * - Scroll al inicio al cambiar de página
 */

import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

// Componentes de layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Páginas
import Home from './pages/Home';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';

/**
 * Componente que maneja el scroll al inicio al cambiar de ruta.
 * Se ejecuta cada vez que la ubicación cambia.
 */
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

/**
 * Componente que maneja las transiciones animadas entre páginas.
 * Utiliza AnimatePresence de Framer Motion para animar la entrada/salida.
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
      </Routes>
    </AnimatePresence>
  );
}

/**
 * Componente raíz de la aplicación.
 * Envuelve todo en Router para habilitar la navegación.
 */
function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;