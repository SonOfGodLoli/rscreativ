/**
 * Componente SectionTitle reutilizable - Tema claro
 * 
 * Título de sección con línea decorativa rosa/salmón.
 */

import { motion } from 'framer-motion';
import { fadeInUp, viewportConfig } from '@/animations/variants';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionTitle({ 
  title, 
  subtitle, 
  centered = true,
  light = false 
}: SectionTitleProps) {
  return (
    <motion.div
      className={`mb-12 ${centered ? 'text-center' : ''}`}
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
    >
      <h2 
        className={`text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4 ${
          light ? 'text-white' : 'text-text'
        }`}
      >
        {title}
      </h2>
      
      {/* Línea decorativa rosa */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <div className="h-1 w-12 bg-accent rounded-full" />
        <div className="h-1 w-6 bg-accent/60 rounded-full" />
        <div className="h-1 w-3 bg-accent/40 rounded-full" />
      </div>
      
      {subtitle && (
        <p className={`text-lg max-w-2xl ${centered ? 'mx-auto' : ''} ${
          light ? 'text-white/70' : 'text-text-secondary'
        }`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
