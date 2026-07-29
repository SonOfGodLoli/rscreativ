import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Printer, 
  Palette, 
  PartyPopper, 
  Sparkles, 
  Filter,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';
import { Link } from 'react-router-dom';

import {
  containerVariants,
  itemVariants,
  viewportConfig,
} from '@/animations/variants';

import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import PageTransition from '@/components/ui/PageTransition';

const categories = [
  { id: 'all', name: 'Todos', icon: Filter },
  { id: 'impresion', name: 'Impresión', icon: Printer },
  { id: 'diseno', name: 'Diseño', icon: Palette },
  { id: 'celebraciones', name: 'Celebraciones', icon: PartyPopper },
  { id: 'personalizados', name: 'Personalizados', icon: Sparkles },
];

const mainCategories = [
  {
    id: 'impresion',
    icon: Printer,
    title: 'Impresión',
    description: 'Impresión de alta calidad para todos tus materiales publicitarios.',
    color: 'from-blue-500 to-blue-600',
    features: ['Banner', 'Volante', 'Tarjetas', 'Stickers', 'Vinil', 'Vinil sobre Foam'],
  },
  {
    id: 'diseno',
    icon: Palette,
    title: 'Diseño',
    description: 'Diseños profesionales que comunican la esencia de tu marca.',
    color: 'from-purple-500 to-purple-600',
    features: ['Tarjetas', 'Hang Tags', 'Volantes', 'Logos', 'Post para Redes', 'Banner', 'Invitaciones Video', 'Invitaciones Web'],
  },
  {
    id: 'celebraciones',
    icon: PartyPopper,
    title: 'Celebraciones',
    description: 'Acabados especiales para tus eventos más importantes.',
    color: 'from-pink-500 to-pink-600',
    features: ['Puertas', 'Circulares', 'Cilindros', 'Torteros', 'Troquelado'],
  },
  {
    id: 'personalizados',
    icon: Sparkles,
    title: 'Personalizados',
    description: 'Productos personalizados con técnicas especializadas.',
    color: 'from-amber-500 to-amber-600',
    features: ['Estampado DTF', 'Sublimación', 'Llaveros', 'Imanes', 'Serigrafía', 'Lanyard', 'Tarjetas PVC'],
  },
];

const subServices: Record<string, { title: string; description: string }[]> = {
  impresion: [
    { title: 'Impresión de Banner', description: 'Banners publicitarios de alta calidad para eventos y campañas.' },
    { title: 'Impresión de Volante', description: 'Volantes promocionales con acabado profesional.' },
    { title: 'Impresión de Tarjetas', description: 'Tarjetas de presentación y comerciales premium.' },
    { title: 'Impresión de Stickers', description: 'Stickers personalizados en diversos materiales.' },
    { title: 'Impresión en Vinil', description: 'Vinil de alta resistencia para rotulación exterior.' },
    { title: 'Vinil sobre Foam', description: 'Vinil montado sobre foam para señalización.' },
  ],
  diseno: [
    { title: 'Diseño de Tarjetas', description: 'Tarjetas de presentación con identidad de marca.' },
    { title: 'Diseño de Hang Tags', description: 'Etiquetas y hang tags para productos y ropa.' },
    { title: 'Diseño de Volantes', description: 'Volantes promocionales atractivos y efectivos.' },
    { title: 'Diseño de Logos', description: 'Logotipos únicos y profesionales.' },
    { title: 'Post para Redes', description: 'Publicaciones para Instagram, Facebook y más.' },
    { title: 'Banner Publicitario', description: 'Banners para eventos y campañas.' },
    { title: 'Invitaciones de Video', description: 'Invitaciones animadas en formato video.' },
    { title: 'Invitaciones Web', description: 'Invitaciones digitales interactivas.' },
  ],
  celebraciones: [
    { title: 'Diseño de Puertas', description: 'Puertas decorativas personalizadas.' },
    { title: 'Circulares', description: 'Circulares decorativos para fiestas.' },
    { title: 'Cilindros', description: 'Cilindros decorativos personalizados.' },
    { title: 'Torteros', description: 'Torteros decorativos para celebraciones.' },
    { title: 'Troquelado en Vinil', description: 'Troquelado decorativo en vinil.' },
  ],
  personalizados: [
    { title: 'Estampado DTF', description: 'Estampado directo a film de alta calidad.' },
    { title: 'Sublimación', description: 'Impresión por sublimación en diversos productos.' },
    { title: 'Llaveros Metálicos', description: 'Llaveros metálicos con grabado de precisión.' },
    { title: 'Imanes Metálicos', description: 'Imanes metálicos para promoción de marca.' },
    { title: 'Llaveros en Acrílico', description: 'Llaveros de acrílico coloridos y personalizados.' },
    { title: 'Serigrafía en Bolsos Notex', description: 'Serigrafía profesional en bolsos.' },
    { title: 'Lanyard', description: 'Lanyards personalizados con logo.' },
    { title: 'Tarjetas PVC', description: 'Tarjetas PVC para membresías y credenciales.' },
  ],
};

export default function Services() {
  const [activeCategory, setActiveCategory] = useState('all');

  return (
    <PageTransition>
      <section className="pt-32 pb-16 bg-gradient-to-b from-accent to-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-white text-sm font-medium tracking-widest uppercase">
              Nuestros Servicios
            </span>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mt-4 mb-6">
              Soluciones Creativas{' '}
              <span className="text-white">Completas</span>
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Desde el diseño hasta la impresión, ofrecemos todo lo que necesitas
              para dar vida a tus proyectos.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-8 bg-white sticky top-20 z-40 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

      <section className="py-16 bg-white min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {activeCategory === 'all' ? (
              <motion.div
                key="all"
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
                variants={containerVariants(0.15)}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
              >
                {mainCategories.map((cat) => {
                  const Icon = cat.icon;
                  
                  return (
                    <motion.div key={cat.id} variants={itemVariants}>
                      <div 
                        className="cursor-pointer"
                        onClick={() => setActiveCategory(cat.id)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => { if (e.key === 'Enter') setActiveCategory(cat.id); }}
                      >
                      <Card 
                        className="h-full group" 
                        hover 
                        padding="lg"
                      >
                        <div className="flex items-start gap-4 mb-4">
                          <div className={`
                            w-16 h-16 rounded-2xl bg-gradient-to-br ${cat.color} 
                            flex items-center justify-center flex-shrink-0
                            group-hover:scale-110 transition-transform duration-300
                          `}>
                            <Icon className="w-8 h-8 text-white" />
                          </div>
                          <div>
                            <h3 className="text-xl font-heading font-bold text-text mb-2">
                              Servicio de {cat.title}
                            </h3>
                            <p className="text-text-secondary text-sm leading-relaxed">
                              {cat.description}
                            </p>
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          <h4 className="text-text font-medium text-xs mb-3 uppercase tracking-wider">
                            Incluye:
                          </h4>
                          <div className="grid grid-cols-2 gap-2">
                            {cat.features.map((feature, fIndex) => (
                              <div key={fIndex} className="flex items-center gap-2 text-sm text-text-secondary">
                                <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                                {feature}
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="mt-6 pt-4 border-t border-border">
                          <span className="inline-flex items-center gap-2 text-accent text-sm font-medium group-hover:gap-3 transition-all">
                            Ver servicios
                            <ArrowRight className="w-4 h-4" />
                          </span>
                        </div>
                      </Card>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            ) : (
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
              >
                <div className="mb-8">
                  <button
                    onClick={() => setActiveCategory('all')}
                    className="inline-flex items-center gap-2 text-accent hover:text-accent-hover transition-colors text-sm font-medium cursor-pointer"
                  >
                    ← Volver a todos los servicios
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {subServices[activeCategory]?.map((service, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card className="h-full group" hover padding="md">
                        <div className={`
                          w-10 h-10 rounded-xl bg-gradient-to-br ${mainCategories.find(c => c.id === activeCategory)?.color} 
                          flex items-center justify-center mb-4
                          group-hover:scale-110 transition-transform duration-300
                        `}>
                          {(() => {
                            const cat = mainCategories.find(c => c.id === activeCategory);
                            if (!cat) return null;
                            const Icon = cat.icon;
                            return <Icon className="w-5 h-5 text-white" />;
                          })()}
                        </div>
                        
                        <h3 className="text-lg font-heading font-bold text-text mb-2">
                          {service.title}
                        </h3>
                        
                        <p className="text-text-secondary text-sm leading-relaxed flex-1">
                          {service.description}
                        </p>
                        
                        <div className="mt-4 pt-4 border-t border-border">
                          <Link 
                            to="/contacto"
                            className="inline-flex items-center gap-2 text-accent text-sm font-medium hover:text-accent-hover transition-colors"
                          >
                            Solicitar
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

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
