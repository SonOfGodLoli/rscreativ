/**
 * Componente Card reutilizable - Tema claro
 * 
 * Tarjeta con fondo blanco y borde sutil.
 * Hover: sombra rosa con color #eb9192.
 */

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
}

export default function Card({
  children,
  className = '',
  hover = true,
  padding = 'md',
}: CardProps) {
  const paddingStyles = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <motion.div
      className={`
        bg-white 
        rounded-xl 
        border border-border
        shadow-sm
        ${paddingStyles[padding]}
        ${className}
      `}
      whileHover={hover ? { 
        y: -8, 
        boxShadow: '0 20px 40px rgba(235, 145, 146, 0.15)',
      } : undefined}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}
