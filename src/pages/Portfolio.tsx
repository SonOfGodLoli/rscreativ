/**
 * Página Portfolio - Portafolio de RS Creativ
 * 
 * Página que muestra el portafolio de trabajos realizados por RS Creativ.
 * 
 * Funcionalidades:
 * - Grid de estilo masonry para mostrar proyectos
 * - Filtro de categorías (Todos, Branding, Impresión, Digital, Eventos)
 * - Efecto hover con overlay mostrando detalles del proyecto
 * - Modal/Lightbox para ver detalles ampliados de cada proyecto
 * - Animaciones de scroll con Framer Motion
 * - Diseño completamente responsive
 * 
 * Los datos del portafolio se muestran de forma estática con placeholder images.
 * En producción, estos datos se obtendrían del API endpoint /portfolio.
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Eye, 
  X, 
  User, 
  Tag,
  Filter,
  ArrowRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Variantes de animación
import {
  containerVariants,
  itemVariants,
  viewportConfig,
} from '@/animations/variants';

// Componentes UI reutilizables
import Button from '@/components/ui/Button';
import PageTransition from '@/components/ui/PageTransition';

/**
 * Categorías de filtro del portafolio.
 */
const categories = [
  { id: 'all', name: 'Todos' },
  { id: 'branding', name: 'Branding' },
  { id: 'impresion', name: 'Impresión' },
  { id: 'digital', name: 'Digital' },
  { id: 'eventos', name: 'Eventos' },
];

/**
 * Datos del portafolio con proyectos de ejemplo.
 * Cada proyecto tiene título, descripción, categoría, cliente,
 * URL de imagen (placeholder) y si es destacado.
 */
const portfolioItems = [
  {
    id: 1,
    title: 'Identidad Visual - Café Aroma',
    description: 'Diseño completo de identidad visual para cadena de cafeterías premium. Incluye logo, tarjetas, menu y papelería.',
    category: 'branding',
    client: 'Café Aroma',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
    featured: true,
    color: 'bg-amber-900/30',
  },
  {
    id: 2,
    title: 'Banner Publicitario - TechStore',
    description: 'Diseño e impresión de banners para lanzamiento de tienda de tecnología.',
    category: 'impresion',
    client: 'TechStore',
    image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&h=600&fit=crop',
    featured: false,
    color: 'bg-blue-900/30',
  },
  {
    id: 3,
    title: 'Redes Sociales - FitnessPlus',
    description: 'Diseño de plantillas para Instagram y Facebook para gimnasio premium.',
    category: 'digital',
    client: 'FitnessPlus',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop',
    featured: true,
    color: 'bg-green-900/30',
  },
  {
    id: 4,
    title: 'Decoración - Boda Real',
    description: 'Elementos decorativos personalizados para boda de ensueño.',
    category: 'eventos',
    client: 'Boda Real',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop',
    featured: false,
    color: 'bg-pink-900/30',
  },
  {
    id: 5,
    title: 'Packaging - Organic Beauty',
    description: 'Diseño de empaques para línea de productos naturales y orgánicos.',
    category: 'branding',
    client: 'Organic Beauty',
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&h=600&fit=crop',
    featured: true,
    color: 'bg-emerald-900/30',
  },
  {
    id: 6,
    title: 'Volantes Promocionales',
    description: 'Campaña de volantes para restaurantes y servicios locales.',
    category: 'impresion',
    client: 'MultiCliente',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
    featured: false,
    color: 'bg-purple-900/30',
  },
  {
    id: 7,
    title: 'App Mobile - QuickDelivery',
    description: 'Diseño de interfaz de usuario para aplicación de delivery.',
    category: 'digital',
    client: 'QuickDelivery',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop',
    featured: false,
    color: 'bg-orange-900/30',
  },
  {
    id: 8,
    title: 'Fiesta Infantil - Mundo Mágico',
    description: 'Decoración completa para fiesta infantil temática.',
    category: 'eventos',
    client: 'Mundo Mágico',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&h=600&fit=crop',
    featured: true,
    color: 'bg-yellow-900/30',
  },
];

/**
 * Interfaz para los items del portafolio.
 * Define la estructura de cada proyecto.
 */
interface PortfolioItemData {
  id: number;
  title: string;
  description: string;
  category: string;
  client: string;
  image: string;
  featured: boolean;
  color: string;
}

/**
 * Componente principal de la página de Portafolio.
 */
export default function Portfolio() {
  /** Categoría activa para filtrar proyectos */
  const [activeCategory, setActiveCategory] = useState('all');
  
  /** Item seleccionado para el lightbox/modal */
  const [selectedItem, setSelectedItem] = useState<PortfolioItemData | null>(null);

  /**
   * Filtra los items del portafolio según la categoría seleccionada.
   */
  const filteredItems = activeCategory === 'all'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeCategory);

  /**
   * Abre el modal con los detalles del proyecto seleccionado.
   */
  const openModal = (item: PortfolioItemData) => {
    setSelectedItem(item);
    // Bloquear scroll del body cuando el modal está abierto
    document.body.style.overflow = 'hidden';
  };

  /**
   * Cierra el modal y restaura el scroll del body.
   */
  const closeModal = () => {
    setSelectedItem(null);
    document.body.style.overflow = 'unset';
  };

  /**
   * Obtiene el nombre de la categoría por su ID.
   */
  const getCategoryName = (categoryId: string) => {
    return categories.find(c => c.id === categoryId)?.name || categoryId;
  };

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
              Nuestro Trabajo
            </span>
            
            {/* Título principal */}
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mt-4 mb-6">
              Portafolio de{' '}
              <span className="text-white">Proyectos</span>
            </h1>
            
            {/* Subtítulo */}
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Explora nuestra colección de trabajos y descubre cómo hemos ayudado
              a nuestros clientes a alcanzar sus objetivos.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ==================== FILTROS DE CATEGORÍA ==================== */}
      <section className="py-8 bg-white sticky top-20 z-40 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => {
              const isActive = activeCategory === category.id;
              
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
                  <Filter className="w-4 h-4" />
                  {category.name}
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== GRID DE PORTAFOLIO ==================== */}
      <section className="py-16 bg-white min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Contador de proyectos */}
          <motion.p
            className="text-text-secondary text-sm mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Mostrando {filteredItems.length} proyecto{filteredItems.length !== 1 ? 's' : ''}
          </motion.p>

          {/* Grid de portafolio con layout masonry simulado */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
              variants={containerVariants(0.1)}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
            >
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  layout
                  className="break-inside-avoid"
                >
                  <div 
                    className={`
                      relative group rounded-xl overflow-hidden cursor-pointer
                      border border-border hover:border-accent/30
                      transition-all duration-300
                      ${item.color}
                    `}
                    onClick={() => openModal(item)}
                  >
                    {/* Imagen del proyecto */}
                    <div className="relative overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                      
                      {/* Overlay con información al hacer hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                        
                        {/* Badge de categoría */}
                        <span className="inline-flex items-center gap-1 text-accent text-xs font-medium mb-2">
                          <Tag className="w-3 h-3" />
                          {getCategoryName(item.category)}
                        </span>
                        
                        {/* Título del proyecto */}
                        <h3 className="text-lg font-heading font-bold text-white mb-1">
                          {item.title}
                        </h3>
                        
                        {/* Cliente */}
                        <div className="flex items-center gap-1 text-white/70 text-sm">
                          <User className="w-3 h-3" />
                          {item.client}
                        </div>
                        
                        {/* Botón de vista previa */}
                        <div className="mt-4">
                          <span className="inline-flex items-center gap-2 text-accent text-sm font-medium">
                            <Eye className="w-4 h-4" />
                            Ver Proyecto
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Badge de destacado */}
                    {item.featured && (
                      <div className="absolute top-4 right-4 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full">
                        Destacado
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ==================== MODAL/LIGHTBOX ==================== */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Overlay de fondo oscuro */}
            <div 
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
              onClick={closeModal}
            />
            
            {/* Contenido del modal */}
            <motion.div
              className="relative z-10 bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-border"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              {/* Botón cerrar */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-bg-gray flex items-center justify-center text-text hover:bg-accent/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              
              {/* Imagen del proyecto */}
              <div className="relative h-64 sm:h-80 overflow-hidden rounded-t-2xl">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="w-full h-full object-cover"
                />
                {/* Gradiente sobre la imagen */}
                <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent" />
              </div>
              
              {/* Información del proyecto */}
              <div className="p-6 sm:p-8">
                {/* Categoría */}
                <span className="inline-flex items-center gap-1 text-accent text-sm font-medium mb-3">
                  <Tag className="w-4 h-4" />
                  {getCategoryName(selectedItem.category)}
                </span>
                
                {/* Título */}
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-text mb-4">
                  {selectedItem.title}
                </h2>
                
                {/* Cliente */}
                <div className="flex items-center gap-2 text-text-secondary mb-6">
                  <User className="w-4 h-4 text-accent" />
                  <span>Cliente: <span className="text-text">{selectedItem.client}</span></span>
                </div>
                
                {/* Descripción */}
                <p className="text-text-secondary leading-relaxed mb-8">
                  {selectedItem.description}
                </p>
                
                {/* Acciones */}
                <div className="flex flex-wrap gap-4">
                  <Link to="/contacto" onClick={closeModal}>
                    <Button variant="primary" size="md">
                      Proyecto Similar
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                  <Button variant="secondary" size="md" onClick={closeModal}>
                    Cerrar
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==================== CTA SECTION ==================== */}
      <section className="py-16 bg-secondary">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
              ¿Tienes un proyecto en mente?
            </h2>
            
            <p className="text-white/70 text-lg mb-8">
              Cuéntanos tu idea y la haremos realidad con la más alta calidad.
            </p>
            
            <Link to="/contacto">
              <Button variant="primary" size="lg">
                Comenzar Proyecto
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}
