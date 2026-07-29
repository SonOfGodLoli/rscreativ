/**
 * Componente Navbar - Navegación principal
 * 
 * Barra de navegación responsive inspirada en el sitio Wix original de RS Creativ.
 * 
 * Colores de marca oficiales:
 * - #9a171c (rojo profundo)
 * - #b24940 (rojo medio)
 * - #eb9192 (rosa claro)
 * - Header gradient: linear-gradient(180deg, #b24940 87%, #9a171c 100%)
 */

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'INICIO', path: '/' },
  { name: 'SERVICIOS', path: '/servicios' },
  { name: 'PORTAFOLIO', path: '/portfolio' },
  { name: 'CONTACTO', path: '/contacto' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-lg shadow-black/10'
          : 'bg-gradient-to-b from-mid to-dark'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img 
              src="/rs logo.svg" 
              alt="RS Creativ" 
              className={`w-10 h-10 object-contain transition-transform group-hover:rotate-12 ${isScrolled ? 'brightness-0' : 'brightness-0 invert'}`}
            />
            <span className={`text-xl font-heading font-bold ${isScrolled ? 'text-dark' : 'text-white'}`}>
              RS <span className={isScrolled ? 'text-dark' : 'text-white'}>CREATIV</span>
            </span>
          </Link>

          {/* Enlaces de escritorio */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative text-sm font-bold tracking-wider transition-colors ${
                  isScrolled
                    ? location.pathname === link.path
                      ? 'text-accent'
                      : 'text-text hover:text-accent'
                    : location.pathname === link.path
                      ? 'text-white'
                      : 'text-white/90 hover:text-white'
                }`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-white"
                    layoutId="activeTab"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Botón hamburguesa para mobile */}
          <button
            className={`md:hidden p-2 ${isScrolled ? 'text-text' : 'text-white'}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Menú mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden bg-white shadow-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={link.path}
                    onClick={closeMenu}
                    className={`block py-2 text-lg font-medium ${
                      location.pathname === link.path
                        ? 'text-accent'
                        : 'text-text'
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
