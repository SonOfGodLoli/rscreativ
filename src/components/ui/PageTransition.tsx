/**
 * Componente PageTransition - Wrapper de transición de páginas
 * 
 * Envuelve cada página con una animación de entrada/salida
 * cuando el usuario navega entre rutas.
 * 
 * Utiliza AnimatePresence de Framer Motion con mode="wait"
 * para que la animación de salida termine antes de iniciar la de entrada.
 * 
 * @example
 * ```tsx
 * <PageTransition>
 *   <MiPagina />
 * </PageTransition>
 * ```
 */

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

/** Props del wrapper de transición */
interface PageTransitionProps {
  children: ReactNode;
}

/**
 * Configuración de la animación de entrada.
 * La página comienza invisible y desplazada 20px hacia abajo,
 * luego se anima a su posición final con opacidad completa.
 */
const pageVariants = {
  initial: {
    opacity: 0,       // Comienza transparente
    y: 20,            // Desplazada 20px hacia abajo
  },
  animate: {
    opacity: 1,       // Termina completamente visible
    y: 0,             // En su posición original
  },
  exit: {
    opacity: 0,       // Se desvanece al salir
    y: -20,           // Se desplaza hacia arriba al salir
  },
};

/**
 * Configuración de la transición.
 * Duración de 0.4 segundos con easing suave.
 */
const pageTransition = {
  type: 'tween' as const,
  ease: [0.25, 0.46, 0.45, 0.94] as const,
  duration: 0.4,
};

/**
 * Componente wrapper que aplica animación de transición a sus hijos.
 */
export default function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
    >
      {children}
    </motion.div>
  );
}
