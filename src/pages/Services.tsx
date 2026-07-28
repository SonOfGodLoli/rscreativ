/**
 * Página Services - Servicios de RS Creativ
 * 
 * Página que muestra todos los servicios offered por la empresa.
 * 
 * Funcionalidades:
 * - Filtro de categorías con tabs (Todos, Impresión, Diseño, Celebraciones, Personalizados)
 * - Grid responsivo de tarjetas de servicios
 * - Cada servicio muestra su lista de productos/características
 * - Animaciones de scroll con Framer Motion
 * - Diseño mobile-first responsive
 * 
 * Los datos de servicios se cargan estáticamente ya que son conocidos
 * y no cambian frecuentemente. En producción, estos podrían obtenerse del API.
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Printer, 
  Palette, 
  PartyPopper, 
  Sparkles, 
  Filter,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Variantes de animación para scroll y transiciones
import {
  containerVariants,
  itemVariants,
  viewportConfig,
} from '@/animations/variants';

// Componentes UI reutilizables
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import PageTransition from '@/components/ui/PageTransition';

/**
 * Definición de categorías de filtro.
 * Cada categoría tiene un ID, nombre y icono asociado.
 */
const categories = [
  { id: 'all', name: 'Todos', icon: Filter },
  { id: 'impresion', name: 'Impresión', icon: Printer },
  { id: 'diseno', name: 'Diseño', icon: Palette },
  { id: 'celebraciones', name: 'Celebraciones', icon: PartyPopper },
  { id: 'personalizados', name: 'Personalizados', icon: Sparkles },
];

/**
 * Datos completos de servicios.
 * Incluye categoría, icono, descripción y lista de productos.
 * Cada servicio tiene un color asociado para el icono.
 */
const allServices = [
  {
    id: 1,
    category: 'impresion',
    icon: Printer,
    title: 'Servicio de Impresión',
    description: 'Impresión de alta calidad con tecnología moderna para todos tus materiales publicitarios y promocionales.',
    color: 'from-blue-500 to-blue-600',
    features: [
      'Impresión de Banner',
      'Volante',
      'Tarjetas',
      'Stickers',
      'Vinil',
    ],
  },
  {
    id: 2,
    category: 'diseno',
    icon: Palette,
    title: 'Servicio de Diseño',
    description: 'Diseños profesionales que comunican la esencia de tu marca de manera efectiva y atractiva.',
    color: 'from-purple-500 to-purple-600',
    features: [
      'Tarjetas',
      'Hang Tags',
      'Volantes',
      'Logos',
      'Post para Redes',
    ],
  },
  {
    id: 3,
    category: 'celebraciones',
    icon: PartyPopper,
    title: 'Diseño y Acabados para Celebraciones',
    description: 'Elementos decorativos y acabados especiales para hacer tus celebraciones inolvidables.',
    color: 'from-pink-500 to-pink-600',
    features: [
      'Puertas',
      'Circulares',
      'Cilindros',
      'Torteros',
      'Troquelado',
    ],
  },
  {
    id: 4,
    category: 'personalizados',
    icon: Sparkles,
    title: 'Personalizados',
    description: 'Productos únicos personalizados con técnicas de impresión especializadas y acabados premium.',
    color: 'from-amber-500 to-amber-600',
    features: [
      'Estampado DTF',
      'Sublimación',
      'Llaveros',
      'Imanes',
      'Serigrafía',
    ],
  },
];

/**
 * Componente principal de la página de Servicios.
 * Renderiza los filtros de categoría y el grid de servicios.
 */
export default function Services() {
  /** Estado para controlar la categoría activa de filtro */
  const [activeCategory, setActiveCategory] = useState('all');

  /**
   * Filtra los servicios según la categoría seleccionada.
   * Si es "all", muestra todos los servicios.
   */
  const filteredServices = activeCategory === 'all' 
    ? allServices 
    : allServices.filter(service => service.category === activeCategory);

  return (
    <PageTransition>
      {/* ==================== HEADER DE LA PÁGINA ==================== */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-accent to-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Etiqueta superior */}
            <span className="text-white text-sm font-medium tracking-widest uppercase">
              Nuestros Servicios
            </span>
            
            {/* Título principal */}
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mt-4 mb-6">
              Soluciones Creativas{' '}
              <span className="text-white">Completas</span>
            </h1>
            
            {/* Subtítulo */}
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Desde el diseño hasta la impresión, ofrecemos todo lo que necesitas
              para dar vida a tus proyectos.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ==================== FILTROS DE CATEGORÍA ==================== */}
      <section className="py-8 bg-white sticky top-20 z-40 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Contenedor de filtros con scroll horizontal en mobile */}
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => {
              const isActive = activeCategory === category.id;
              const Icon = category.icon;
              
              return (
                <motion.button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`
                    flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium
                    transition-all duration-300 cursor-pointer
                    ${isActive 
                      ? 'bg-accent text-white' 
                      : 'bg-bg-gray text-text-secondary hover:text-text hover:bg-accent/10'
                    }
                  `}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-4 h-4" />
                  {category.name}
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== GRID DE SERVICIOS ==================== */}
      <section className="py-16 bg-white min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Contador de resultados */}
          <motion.p
            className="text-text-secondary text-sm mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Mostrando {filteredServices.length} servicio{filteredServices.length !== 1 ? 's' : ''}
          </motion.p>

          {/* Grid responsivo de servicios */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
              variants={containerVariants(0.15)}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
            >
              {filteredServices.map((service) => {
                const Icon = service.icon;
                
                return (
                  <motion.div
                    key={service.id}
                    variants={itemVariants}
                    layout
                  >
                    <Card className="h-full group" hover padding="lg">
                      <div className="flex flex-col h-full">
                        
                        {/* Encabezado con icono y título */}
                        <div className="flex items-start gap-4 mb-6">
                          {/* Icono del servicio con gradiente */}
                          <div className={`
                            w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} 
                            flex items-center justify-center flex-shrink-0
                            group-hover:scale-110 transition-transform duration-300
                          `}>
                            <Icon className="w-8 h-8 text-white" />
                          </div>
                          
                          <div>
                            {/* Título del servicio */}
                            <h3 className="text-xl font-heading font-bold text-text mb-2">
                              {service.title}
                            </h3>
                            
                            {/* Categoría */}
                            <span className="text-accent text-xs font-medium uppercase tracking-wider">
                              {categories.find(c => c.id === service.category)?.name}
                            </span>
                          </div>
                        </div>
                        
                        {/* Descripción del servicio */}
                        <p className="text-text-secondary leading-relaxed mb-6">
                          {service.description}
                        </p>
                        
                        {/* Lista de productos/servicios incluidos */}
                        <div className="mt-auto">
                          <h4 className="text-text font-medium text-sm mb-3 uppercase tracking-wider">
                            Incluye:
                          </h4>
                          <div className="grid grid-cols-2 gap-2">
                            {service.features.map((feature, fIndex) => (
                              <div 
                                key={fIndex} 
                                className="flex items-center gap-2 text-sm text-text-secondary"
                              >
                                <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                                {feature}
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {/* Línea decorativa inferior */}
                        <div className="mt-6 pt-6 border-t border-border">
                          <Link 
                            to="/contacto"
                            className="inline-flex items-center gap-2 text-accent text-sm font-medium hover:text-accent-hover transition-colors"
                          >
                            Solicitar este servicio
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ==================== CTA SECTION ==================== */}
      <section className="py-16 bg-secondary">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
              ¿No encuentras lo que buscas?
            </h2>
            
            <p className="text-white/70 text-lg mb-8">
              Contáctanos y crearemos una solución personalizada para ti.
            </p>
            
            <Link to="/contacto">
              <Button variant="primary" size="lg">
                Hablar con Nosotros
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}
