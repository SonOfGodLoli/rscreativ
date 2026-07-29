import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Printer, 
  Palette, 
  PartyPopper, 
  Sparkles, 
  Filter,
  ArrowRight,
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

const allServices = [
  {
    id: 1,
    category: 'impresion',
    icon: Printer,
    title: 'Impresión de Banner',
    description: 'Impresión de alta calidad en banners publicitarios para todo tipo de eventos y campañas.',
    color: 'from-blue-500 to-blue-600',
  },
  {
    id: 2,
    category: 'impresion',
    icon: Printer,
    title: 'Impresión de Volante',
    description: 'Volantes promocionales con acabado profesional para difusión de tu marca.',
    color: 'from-blue-500 to-blue-600',
  },
  {
    id: 3,
    category: 'impresion',
    icon: Printer,
    title: 'Impresión de Tarjetas',
    description: 'Tarjetas de presentación y comerciales con diseño y acabado premium.',
    color: 'from-blue-500 to-blue-600',
  },
  {
    id: 4,
    category: 'impresion',
    icon: Printer,
    title: 'Impresión de Stickers',
    description: 'Stickers personalizados en diversos materiales y tamaños para tu marca.',
    color: 'from-blue-500 to-blue-600',
  },
  {
    id: 5,
    category: 'impresion',
    icon: Printer,
    title: 'Impresión en Vinil',
    description: 'Impresión en vinil de alta resistencia para rotulación y publicidad exterior.',
    color: 'from-blue-500 to-blue-600',
  },
  {
    id: 6,
    category: 'impresion',
    icon: Printer,
    title: 'Vinil sobre Foam',
    description: 'Impresión de vinil montado sobre foam para señalización y displays.',
    color: 'from-blue-500 to-blue-600',
  },
  {
    id: 7,
    category: 'diseno',
    icon: Palette,
    title: 'Diseño de Tarjetas',
    description: 'Diseño profesional de tarjetas de presentación que reflejan tu identidad.',
    color: 'from-purple-500 to-purple-600',
  },
  {
    id: 8,
    category: 'diseno',
    icon: Palette,
    title: 'Diseño de Hang Tags',
    description: 'Etiquetas y hang tags con diseño único para productos y ropa.',
    color: 'from-purple-500 to-purple-600',
  },
  {
    id: 9,
    category: 'diseno',
    icon: Palette,
    title: 'Diseño de Volantes',
    description: 'Volantes promocionales con diseños atractivos y efectivos.',
    color: 'from-purple-500 to-purple-600',
  },
  {
    id: 10,
    category: 'diseno',
    icon: Palette,
    title: 'Diseño de Logos',
    description: 'Creación de logotipos únicos y profesionales para tu marca.',
    color: 'from-purple-500 to-purple-600',
  },
  {
    id: 11,
    category: 'diseno',
    icon: Palette,
    title: 'Post para Redes',
    description: 'Diseño de publicaciones para Instagram, Facebook y otras redes sociales.',
    color: 'from-purple-500 to-purple-600',
  },
  {
    id: 12,
    category: 'diseno',
    icon: Palette,
    title: 'Banner Publicitario',
    description: 'Diseño de banners para eventos, ferias y campañas publicitarias.',
    color: 'from-purple-500 to-purple-600',
  },
  {
    id: 13,
    category: 'diseno',
    icon: Palette,
    title: 'Invitaciones de Video',
    description: 'Diseño de invitaciones animadas en formato video para eventos.',
    color: 'from-purple-500 to-purple-600',
  },
  {
    id: 14,
    category: 'diseno',
    icon: Palette,
    title: 'Invitaciones Web',
    description: 'Invitaciones digitales interactivas para compartir en línea.',
    color: 'from-purple-500 to-purple-600',
  },
  {
    id: 15,
    category: 'celebraciones',
    icon: PartyPopper,
    title: 'Diseño de Puertas',
    description: 'Puertas decorativas personalizadas para celebraciones y eventos.',
    color: 'from-pink-500 to-pink-600',
  },
  {
    id: 16,
    category: 'celebraciones',
    icon: PartyPopper,
    title: 'Circulares',
    description: 'Circulares decorativos para fiestas y eventos especiales.',
    color: 'from-pink-500 to-pink-600',
  },
  {
    id: 17,
    category: 'celebraciones',
    icon: PartyPopper,
    title: 'Cilindros',
    description: 'Cilindros decorativos con diseños personalizados para celebraciones.',
    color: 'from-pink-500 to-pink-600',
  },
  {
    id: 18,
    category: 'celebraciones',
    icon: PartyPopper,
    title: 'Torteros',
    description: 'Torteros decorativos para fiestas de cumpleaños y eventos.',
    color: 'from-pink-500 to-pink-600',
  },
  {
    id: 19,
    category: 'celebraciones',
    icon: PartyPopper,
    title: 'Troquelado en Vinil',
    description: 'Troquelado decorativo en vinil para elementos de celebración.',
    color: 'from-pink-500 to-pink-600',
  },
  {
    id: 20,
    category: 'personalizados',
    icon: Sparkles,
    title: 'Estampado DTF',
    description: 'Estampado directo a film de alta calidad en prendas textiles.',
    color: 'from-amber-500 to-amber-600',
  },
  {
    id: 21,
    category: 'personalizados',
    icon: Sparkles,
    title: 'Sublimación',
    description: 'Impresión por sublimación en diversos productos personalizados.',
    color: 'from-amber-500 to-amber-600',
  },
  {
    id: 22,
    category: 'personalizados',
    icon: Sparkles,
    title: 'Llaveros Metálicos',
    description: 'Llaveros metálicos personalizados con grabado de alta precisión.',
    color: 'from-amber-500 to-amber-600',
  },
  {
    id: 23,
    category: 'personalizados',
    icon: Sparkles,
    title: 'Imanes Metálicos',
    description: 'Imanes metálicos personalizados para promoción de tu marca.',
    color: 'from-amber-500 to-amber-600',
  },
  {
    id: 24,
    category: 'personalizados',
    icon: Sparkles,
    title: 'Llaveros en Acrílico',
    description: 'Llaveros de acrílico con diseños personalizados y coloridos.',
    color: 'from-amber-500 to-amber-600',
  },
  {
    id: 25,
    category: 'personalizados',
    icon: Sparkles,
    title: 'Serigrafía en Bolsos Notex',
    description: 'Serigrafía profesional en bolsos notex para tu empresa o evento.',
    color: 'from-amber-500 to-amber-600',
  },
  {
    id: 26,
    category: 'personalizados',
    icon: Sparkles,
    title: 'Lanyard',
    description: 'Lanyards personalizados con logo para eventos y empresas.',
    color: 'from-amber-500 to-amber-600',
  },
  {
    id: 27,
    category: 'personalizados',
    icon: Sparkles,
    title: 'Tarjetas PVC',
    description: 'Tarjetas PVC personalizadas para membresías, credenciales y más.',
    color: 'from-amber-500 to-amber-600',
  },
];

export default function Services() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredServices = activeCategory === 'all' 
    ? allServices 
    : allServices.filter(service => service.category === activeCategory);

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
          <motion.p
            className="text-text-secondary text-sm mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Mostrando {filteredServices.length} servicio{filteredServices.length !== 1 ? 's' : ''}
          </motion.p>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants(0.1)}
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
                    <Card className="h-full group" hover padding="md">
                      <div className="flex flex-col h-full">
                        <div className={`
                          w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} 
                          flex items-center justify-center flex-shrink-0 mb-4
                          group-hover:scale-110 transition-transform duration-300
                        `}>
                          <Icon className="w-6 h-6 text-white" />
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
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
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
