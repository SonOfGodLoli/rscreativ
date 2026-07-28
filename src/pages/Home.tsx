/**
 * Página Home - Inicio de RS Creativ
 * 
 * Página principal inspirada en el sitio Wix original.
 * 
 * Colores del Wix extraídos:
 * - color_11: 255,255,255 (fondo blanco)
 * - color_15: 0,0,0 (texto negro)
 * - color_18: 234,121,123 (acento rosa/salmón)
 * - color_20: 4,10,51 (navy oscuro hero)
 * - color_41: 139,25,19 (footer rojo oscuro)
 */

import { motion } from 'framer-motion';
import { 
  Palette, 
  Printer, 
  Sparkles, 
  PartyPopper, 
  ArrowRight,
  Star,
  Award,
  Heart,
  Quote,
} from 'lucide-react';
import { Link } from 'react-router-dom';

import {
  fadeInLeft,
  fadeInRight,
  containerVariants,
  itemVariants,
  viewportConfig,
} from '@/animations/variants';

import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import SectionTitle from '@/components/ui/SectionTitle';
import PageTransition from '@/components/ui/PageTransition';

const services = [
  {
    icon: Printer,
    title: 'Impresión',
    description: 'Servicio de impresión de alta calidad para todo tipo de materiales publicitarios.',
    features: ['Banner', 'Volante', 'Tarjetas', 'Stickers', 'Vinil'],
  },
  {
    icon: Palette,
    title: 'Diseño',
    description: 'Creamos diseños únicos que reflejan la identidad de tu marca.',
    features: ['Tarjetas', 'Hang Tags', 'Volantes', 'Logos', 'Post para Redes'],
  },
  {
    icon: PartyPopper,
    title: 'Celebraciones',
    description: 'Diseños y acabados especiales para tus eventos más importantes.',
    features: ['Puertas', 'Circulares', 'Cilindros', 'Torteros', 'Troquelado'],
  },
  {
    icon: Sparkles,
    title: 'Personalizados',
    description: 'Productos personalizados con técnicas de impresión especializadas.',
    features: ['Estampado DTF', 'Sublimación', 'Llaveros', 'Imanes', 'Serigrafía'],
  },
];

const teamMembers = [
  {
    name: 'Ricardo',
    role: 'Diseñador Gráfico y Encargado de Acabados',
    description: 'Apasionado por el diseño y los detalles. Transforma ideas en productos terminados con acabados perfectos.',
    initial: 'R',
  },
  {
    name: 'Sarai',
    role: 'Administradora y Diseñadora',
    description: 'La mente organizativa detrás de RS Creativ. Combina creatividad con gestión eficiente.',
    initial: 'S',
  },
];

export default function Home() {
  return (
    <PageTransition>
      {/* ==================== HERO ==================== */}
      {/* Hero con fondo navy oscuro (#040a33) como en el Wix */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Fondo navy oscuro con imagen de fondo */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-secondary" />
          {/* Gradiente sutil encima */}
          <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary/95 to-accent/10" />
          
          {/* Elementos decorativos animados */}
          <motion.div
            className="absolute top-20 right-20 w-72 h-72 bg-accent/5 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-20 left-20 w-96 h-96 bg-accent/3 rounded-full blur-3xl"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>

        {/* Contenido del Hero */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-8"
          >
            <Star className="w-4 h-4 text-accent" />
            <span className="text-white/90 text-sm font-medium">Diseño & Impresión en Perú</span>
          </motion.div>

          {/* Título principal */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-white mb-2 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Creatividad que se
          </motion.h1>
          
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-white mb-6 leading-tight italic"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            diseña e imprime
          </motion.h1>

          {/* Logo RS Creativ en el hero */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex justify-center mb-8"
          >
            <div className="w-40 h-40 rounded-full bg-white/10 flex items-center justify-center border-2 border-accent/30">
              <div className="text-center">
                <Palette className="w-12 h-12 text-accent mx-auto mb-2" />
                <span className="text-white font-heading font-bold text-lg">RS</span>
              </div>
            </div>
          </motion.div>

          {/* Botones CTA */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
          >
            <Link to="/contacto">
              <Button variant="primary" size="lg">
                Contáctanos
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <motion.div
              className="w-1.5 h-3 bg-white rounded-full mt-2"
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* ==================== ABOUT - ¿QUIÉNES SOMOS? ==================== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Texto */}
            <motion.div
              variants={fadeInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
            >
              <span className="text-accent text-sm font-bold tracking-widest uppercase">
                ACERCA DE
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-text mt-4 mb-6">
                ¿QUIENES SOMOS?
              </h2>
              <div className="flex gap-2 mb-6">
                <div className="h-1 w-12 bg-accent rounded-full" />
                <div className="h-1 w-6 bg-accent/60 rounded-full" />
                <div className="h-1 w-3 bg-accent/40 rounded-full" />
              </div>
              <p className="text-text-secondary leading-relaxed mb-4">
                Somos RS Creativ, especialistas en diseño gráfico y soluciones creativas.
                Nos apasiona transformar tus ideas en diseños únicos, desde contenido para
                redes sociales hasta identidad visual y material publicitario.
              </p>
              <p className="text-text-secondary leading-relaxed mb-6">
                Ofrecemos servicios de impresión y soluciones digitales, adaptadas a cada necesidad.
                Además, contamos con una línea de productos personalizados, perfectos para regalar
                o impulsar tu marca.
              </p>
              <p className="text-accent font-heading font-bold text-lg italic">
                En RS Creativ, hacemos realidad tus ideas con creatividad, dedicación y estilo.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Award className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="text-text font-medium text-sm">Calidad</div>
                    <div className="text-text-secondary text-xs">Premium</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Heart className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="text-text font-medium text-sm">Pasión</div>
                    <div className="text-text-secondary text-xs">Creativa</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Imagen decorativa */}
            <motion.div
              variants={fadeInRight}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="relative"
            >
              <Card className="relative overflow-hidden" padding="lg">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent/5 rounded-full translate-y-1/2 -translate-x-1/2" />
                <div className="relative z-10">
                  <div className="w-20 h-20 rounded-2xl bg-accent/10 flex items-center justify-center mb-6">
                    <Palette className="w-10 h-10 text-accent" />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-text mb-4">
                    Nuestra Misión
                  </h3>
                  <p className="text-text-secondary leading-relaxed mb-6">
                    Ofrecer soluciones creativas y de alta calidad que superen las
                    expectativas de nuestros clientes, combinando innovación, pasión
                    y compromiso en cada proyecto.
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white font-bold text-xs">R</div>
                      <div className="w-8 h-8 rounded-full bg-secondary border-2 border-accent flex items-center justify-center text-white font-bold text-xs">S</div>
                    </div>
                    <div>
                      <div className="text-text text-sm font-medium">Ricardo & Sarai</div>
                      <div className="text-text-secondary text-xs">Fundadores</div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== SERVICES ==================== */}
      <section className="py-20 bg-bg-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle 
            title="¿QUE SERVICIOS OFRECEMOS?" 
            subtitle="Ofrecemos soluciones completas de diseño e impresión para hacer realidad tus proyectos."
          />

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants(0.15)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            {services.map((service, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full group" hover padding="lg">
                  <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors">
                    <service.icon className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-text mb-3">
                    Servicio de {service.title}
                  </h3>
                  <p className="text-text-secondary text-sm mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center gap-2 text-sm text-text-secondary">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportConfig}
          >
            <Link to="/servicios">
              <Button variant="primary" size="lg">
                Ver Todos los Servicios
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ==================== TEAM ==================== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle 
            title="EL EQUIPO" 
            subtitle="Conoce a las personas detrás de RS Creativ."
          />

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
            variants={containerVariants(0.2)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            {teamMembers.map((member, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="text-center group" hover padding="lg">
                  <motion.div
                    className="w-24 h-24 rounded-full bg-accent/10 border-2 border-accent/20 flex items-center justify-center mx-auto mb-6 group-hover:border-accent/50 transition-colors"
                    whileHover={{ scale: 1.1 }}
                  >
                    <span className="text-3xl font-heading font-bold text-accent">
                      {member.initial}
                    </span>
                  </motion.div>
                  <h3 className="text-xl font-heading font-bold text-text mb-2 uppercase">
                    {member.name}
                  </h3>
                  <p className="text-accent text-sm font-medium mb-4">
                    {member.role}
                  </p>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {member.description}
                  </p>
                  <div className="flex justify-center gap-1 mt-6">
                    <div className="h-1 w-6 bg-accent/30 rounded-full" />
                    <div className="h-1 w-3 bg-accent/50 rounded-full" />
                    <div className="h-1 w-6 bg-accent/30 rounded-full" />
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ==================== CLIENTS ==================== */}
      <section className="py-20 bg-bg-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle 
            title="Ellos Confiaron en Nosotros" 
            subtitle="Marcas y personas que eligieron RS Creativ para sus proyectos."
          />

          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
          >
            <Card padding="lg" className="text-center relative overflow-hidden">
              <Quote className="w-12 h-12 text-accent/20 mx-auto mb-6" />
              <p className="text-xl md:text-2xl text-text-secondary italic leading-relaxed mb-8 font-heading">
                "RS Creativ transformó nuestra visión en realidad. Su atención al detalle
                y creatividad superaron nuestras expectativas. ¡Totalmente recomendados!"
              </p>
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                  <span className="text-accent font-bold">CL</span>
                </div>
                <div className="text-left">
                  <div className="text-text font-medium">Cliente Satisfecho</div>
                  <div className="text-text-secondary text-sm">RS Creativ</div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Logos de clientes */}
          <motion.div
            className="flex flex-wrap justify-center items-center gap-8 mt-12 opacity-50"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.5 }}
            viewport={viewportConfig}
          >
            {['Sazón Criollo', 'C&G Asociados', 'JPGE Dentica', 'Agrobel'].map((name, i) => (
              <div key={i} className="w-28 h-16 bg-white rounded-lg flex items-center justify-center border border-border shadow-sm">
                <span className="text-text-secondary text-xs font-medium text-center px-2">{name}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ==================== CTA ==================== */}
      <section className="py-20 bg-gradient-to-r from-accent/10 via-white to-accent/10 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-text mb-6">
              ¿Listo para crear algo{' '}
              <span className="text-accent">increíble</span>?
            </h2>
            <p className="text-text-secondary text-lg mb-8 max-w-2xl mx-auto">
              Contáctanos hoy mismo y hagamos realidad tu próximo proyecto.
            </p>
            <Link to="/contacto">
              <Button variant="primary" size="lg">
                Empezar Ahora
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}
