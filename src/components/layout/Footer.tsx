/**
 * Componente Footer - Pie de página
 * 
 * Footer con fondo rojo profundo (#9a171c) - color oficial de marca.
 * Contiene: Logo, horarios, contacto, redes sociales y copyright.
 */

import { motion } from 'framer-motion';
import { Phone, Mail, Clock, MapPin, Palette } from 'lucide-react';
import { Link } from 'react-router-dom';
import { containerVariants, itemVariants } from '@/animations/variants';

const schedule = [
  { day: 'Lun - Vie', hours: '10:00 - 20:00' },
  { day: 'Sábado', hours: '11:00 - 17:00' },
  { day: 'Domingo', hours: '10:00 - 12:00 (Recepción de pedidos)' },
];

const socialLinks = [
  { name: 'WhatsApp', url: 'https://web.whatsapp.com/', icon: '💬' },
  { name: 'Facebook', url: 'https://www.facebook.com/profile.php?id=61562236591988', icon: '📘' },
  { name: 'Instagram', url: 'https://www.instagram.com/rs.creativ', icon: '📷' },
];

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
              <Palette className="w-8 h-8 text-white" />
              <span className="text-xl font-heading font-bold text-white">
                RS CREATIV
              </span>
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
            <h3 className="text-white font-heading font-bold text-lg mb-4 flex items-center gap-2">
              <Phone className="w-5 h-5 text-accent" />
              CONTÁCTANOS
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-white/70 text-sm">
                <Phone className="w-4 h-4 text-accent" />
                +51 933 866 156
              </li>
              <li className="flex items-center gap-2 text-white/70 text-sm">
                <Mail className="w-4 h-4 text-accent" />
                rs.creativ.oficial@gmail.com
              </li>
              <li className="flex items-center gap-2 text-white/70 text-sm">
                <MapPin className="w-4 h-4 text-accent" />
                Perú
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
                  className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-xl hover:bg-white/20 transition-colors"
                  whileHover={{ scale: 1.1, y: -4 }}
                  title={social.name}
                >
                  {social.icon}
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
        </div>
      </div>
    </footer>
  );
}
