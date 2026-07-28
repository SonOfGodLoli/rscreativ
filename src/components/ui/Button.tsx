/**
 * Componente Button reutilizable - Tema claro
 * 
 * Botón con color rosa/salmón (#ea797b) como en el sitio Wix original.
 * 
 * Variantes:
 * - primary: Fondo rosa/salmón, texto blanco
 * - secondary: Borde rosa, fondo transparente
 * - dark: Fondo rojo oscuro, texto blanco
 */

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  href?: string;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  href,
  className = '',
  onClick,
  type = 'button',
}: ButtonProps) {
  const variantStyles = {
    primary: 'bg-accent hover:bg-accent-hover text-white font-semibold',
    secondary: 'border-2 border-accent text-accent hover:bg-accent hover:text-white',
    dark: 'bg-dark hover:bg-dark-hover text-white font-semibold',
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const baseStyles = `
    inline-flex items-center justify-center
    rounded-lg font-medium
    transition-colors duration-300
    cursor-pointer
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `.trim();

  if (href) {
    return (
      <motion.a
        href={href}
        className={baseStyles}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      className={baseStyles}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      type={type}
    >
      {children}
    </motion.button>
  );
}
