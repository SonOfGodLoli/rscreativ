/**
 * Componente Footer - Pie de página
 * 
 * Footer con fondo rojo profundo (#9a171c) - color oficial de marca.
 * Contiene: Logo, horarios, contacto, redes sociales y copyright.
 */

import { motion } from 'framer-motion';
import { Mail, Clock, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { containerVariants, itemVariants } from '@/animations/variants';

const schedule = [
  { day: 'Lun - Vie', hours: '10:00 - 20:00' },
  { day: 'Sábado', hours: '11:00 - 17:00' },
  { day: 'Domingo', hours: '10:00 - 12:00 (Recepción de pedidos)' },
];

const socialLinks = [
  { name: 'Facebook', url: 'https://www.facebook.com/profile.php?id=61562236591988' },
  { name: 'Instagram', url: 'https://www.instagram.com/rs.creativ' },
  { name: 'TikTok', url: 'https://www.tiktok.com/@rs.creativ' },
];

function SocialIcon({ name }: { name: string }) {
  switch (name) {
    case 'Facebook':
      return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      );
    case 'Instagram':
      return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
        </svg>
      );
    case 'TikTok':
      return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white">
          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.51a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.46v-7.23a8.16 8.16 0 005.58 2.19v-3.45a4.85 4.85 0 01-3.77-1.53V6.69h3.77z"/>
        </svg>
      );
    default:
      return null;
  }
}

export default function Footer() {
  return (
    <footer className="bg-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Logo y descripción */}
          <motion.div variants={itemVariants}>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src={`${import.meta.env.BASE_URL}rs-logo.svg`} alt="RS Creativ" className="h-8 w-auto object-contain brightness-0 invert" />
            </Link>
            <p className="text-white/70 text-sm leading-relaxed">
              Especialistas en diseño gráfico y soluciones creativas.
              Transformamos tus ideas en diseños únicos.
            </p>
          </motion.div>

          {/* Horarios */}
          <motion.div variants={itemVariants}>
            <h3 className="text-white font-heading font-bold text-lg mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-accent" />
              HORARIO
            </h3>
            <ul className="space-y-2">
              {schedule.map((item, index) => (
                <li key={index} className="text-white/70 text-sm">
                  <span className="text-white font-medium">{item.day}:</span>{' '}
                  {item.hours}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contacto */}
          <motion.div variants={itemVariants}>
            <h3 className="text-white font-heading font-bold text-lg mb-4">
              CONTÁCTANOS
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-white/70 text-sm">
                +51 933 866 156
              </li>
              <li className="flex items-center gap-2 text-white/70 text-sm">
                <Mail className="w-4 h-4 text-accent" />
                rs.creativ.oficial@gmail.com
              </li>
              <li className="flex items-center gap-2 text-white/70 text-sm">
                <MapPin className="w-4 h-4 text-accent" />
                Lima - Perú
              </li>
            </ul>
          </motion.div>

          {/* Redes sociales */}
          <motion.div variants={itemVariants}>
            <h3 className="text-white font-heading font-bold text-lg mb-4">
              SÍGUENOS
            </h3>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                  whileHover={{ scale: 1.1, y: -4 }}
                  title={social.name}
                >
                  <SocialIcon name={social.name} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Copyright */}
        <div className="border-t border-white/20 mt-12 pt-8 text-center">
          <p className="text-white/50 text-sm">
            © {new Date().getFullYear()} RS CREATIV. Todos los derechos reservados.
          </p>
          <Link to="/terminos-y-condiciones" className="text-white/40 text-xs hover:text-white/60 transition-colors mt-2 inline-block">
            Términos y Condiciones
          </Link>
        </div>
      </div>
    </footer>
  );
}
