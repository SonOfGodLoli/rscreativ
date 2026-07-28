/**
 * Variantes de animación para Framer Motion
 * 
 * Este archivo contiene todas las variantes de animación utilizadas
 * en la aplicación. Las variantes son objetos que definen diferentes
 * estados de animación que los componentes pueden adoptar.
 * 
 * Conceptos clave:
 * - initial: Estado inicial del elemento (antes de animarse)
 * - animate: Estado final del elemento (después de animarse)
 * - exit: Estado de salida del elemento (al desmontarse)
 * - transition: Configuración de la transición (duración, easing, etc.)
 * - whileInView: Animación que se ejecuta cuando el elemento entra en el viewport
 * - viewport: Configuración del viewport para detectar visibilidad
 */

import type { Variants, Transition } from 'framer-motion';

/**
 * Transición predefinida con duración y easing suave.
 * Se reutiliza en múltiples animaciones para mantener consistencia.
 */
export const smoothTransition: Transition = {
  duration: 0.6,
  ease: [0.25, 0.46, 0.45, 0.94], // Ease personalizado para movimientos suaves
};

/**
 * Variante para fade in (aparecer gradualmente).
 * Útil para elementos que deben aparecer suavemente.
 */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: smoothTransition,
  },
};

/**
 * Variante para fade in hacia arriba.
 * Elemento aparece desde abajo con efecto de elevación.
 */
export const fadeInUp: Variants = {
  hidden: { 
    opacity: 0, 
    y: 60, // Se mueve 60px hacia abajo desde su posición final
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: smoothTransition,
  },
};

/**
 * Variante para fade in desde la izquierda.
 * Elemento aparece deslizándose desde la izquierda.
 */
export const fadeInLeft: Variants = {
  hidden: { 
    opacity: 0, 
    x: -60, // Se mueve 60px hacia la izquierda
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: smoothTransition,
  },
};

/**
 * Variante para fade in desde la derecha.
 * Elemento aparece deslizándose desde la derecha.
 */
export const fadeInRight: Variants = {
  hidden: { 
    opacity: 0, 
    x: 60, // Se mueve 60px hacia la derecha
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: smoothTransition,
  },
};

/**
 * Variante para escalar (zoom in).
 * Elemento crece desde una escala pequeña.
 */
export const scaleIn: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8, // Comienza al 80% de su tamaño
  },
  visible: { 
    opacity: 1, 
    scale: 1, // Crece al 100%
    transition: smoothTransition,
  },
};

/**
 * Variante para elementos en container (stagger effect).
 * Permite animar hijos de forma secuencial con delay incremental.
 * 
 * @param staggerChildren - Tiempo de delay entre cada hijo (en segundos)
 * @param delayChildren - Delay inicial antes de animar el primer hijo
 */
export const containerVariants = (staggerChildren = 0.1, delayChildren = 0): Variants => ({
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

/**
 * Variante para hijos dentro de un container con stagger.
 * Cada hijo aparece deslizándose hacia arriba con fade.
 */
export const itemVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 30,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: smoothTransition,
  },
};

/**
 * Variante para hover (al pasar el mouse).
 * Se usa en props de whileHover de Framer Motion.
 */
export const hoverScale = {
  scale: 1.05,
  transition: { duration: 0.3 },
};

/**
 * Variante para elementos que aparecen con rotación.
 */
export const rotateIn: Variants = {
  hidden: { 
    opacity: 0, 
    rotate: -10,
  },
  visible: { 
    opacity: 1, 
    rotate: 0,
    transition: smoothTransition,
  },
};

/**
 * Configuración de viewport para animaciones de scroll.
 * amount: 0.3 significa que el 30% del elemento debe ser visible
 * para que se active la animación.
 */
export const viewportConfig = {
  once: true, // La animación solo se ejecuta una vez
  amount: 0.3, // 30% del elemento debe ser visible
};
