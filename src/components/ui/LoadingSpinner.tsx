/**
 * Componente LoadingSpinner
 * 
 * Indicador de carga animado con el color accent dorado.
 * Se muestra mientras se cargan datos del API.
 */

import { motion } from 'framer-motion';

/** Props del spinner */
interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Spinner de carga animado con Framer Motion.
 */
export default function LoadingSpinner({ size = 'md' }: LoadingSpinnerProps) {
  const sizeStyles = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  return (
    <div className="flex justify-center items-center py-12">
      <motion.div
        className={`${sizeStyles[size]} border-4 border-secondary rounded-full border-t-accent`}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  );
}
