/**
 * Página Home - Inicio de RS Creativ
 * 
 * Página principal con los colores oficiales de marca:
 * - #9a171c (rojo profundo) → footer, secciones oscuras
 * - #b24940 (rojo medio) → gradientes, acentos
 * - #eb9192 (rosa claro) → highlights, botones
 * - #040a33 (navy oscuro) → hero section
 */

import { motion } from 'framer-motion';
import { 
  Palette, 
  Printer, 
  Sparkles, 
  PartyPopper, 
  ArrowRight,
  Award,
  Heart,
  Target,
  Eye,
} from 'lucide-react';
import { Link } from 'react-router-dom';

import {
  containerVariants,
  itemVariants,
  viewportConfig,
} from '@/animations/variants';

import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import SectionTitle from '@/components/ui/SectionTitle';
import PageTransition from '@/components/ui/PageTransition';

const BASE = import.meta.env.BASE_URL;

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
    image: `${BASE}Ricardo.png`,
  },
  {
    name: 'Sarai',
    role: 'Administradora y Diseñadora',
    description: 'La mente organizativa detrás de RS Creativ. Combina creatividad con gestión eficiente.',
    image: `${BASE}Sarai.png`,
  },
];

export default function Home() {
  return (
    <PageTransition>
      {/* ==================== HERO ==================== */}
      {/* Hero con imagen de fondo a pantalla completa y texto encima */}
      <section className="relative min-h-screen overflow-hidden">
        {/* ========== DESKTOP (>=1024px) - Fondo deskot modificado ========== */}
        <div className="hidden lg:block absolute inset-0">
          <img 
            src={`${BASE}deskot modificado5web 1.png`} 
            alt="RS Creativ" 
            className="w-full h-full object-cover object-left"
          />
          <div className="absolute inset-0 flex items-center justify-end">
            <div className="pr-16 xl:pr-24 2xl:pr-32">
              <div className="text-left">
                <motion.h1
                  className="text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-heading font-bold text-text mb-2 leading-tight"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
                  Creatividad que se
                </motion.h1>
                <motion.h1
                  className="text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-heading font-bold text-text mb-8 leading-tight"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  Diseña e Imprime
                </motion.h1>
                <motion.div
                  className="flex justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <Link to="/contacto">
                    <button className="bg-[#9a171c] hover:bg-[#7a1216] text-white font-bold py-3 lg:py-4 px-8 lg:px-10 rounded-lg text-base lg:text-lg transition-colors cursor-pointer inline-flex items-center gap-2">
                      Contáctanos
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* ========== TABLET HORIZONTAL (768px - 1023px) - Fondo TABLET HORIZONTAL ========== */}
        <div className="hidden md:block lg:hidden absolute inset-0">
          <img 
            src={`${BASE}TABLET HORIZONTAL.png`} 
            alt="RS Creativ" 
            className="w-full h-full object-cover object-left"
          />
          <div className="absolute inset-0 flex items-center justify-end">
            <div className="pr-10 md:pr-16">
              <div className="text-left">
                <motion.h1
                  className="text-3xl md:text-4xl font-heading font-bold text-text mb-2 leading-tight"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
                  Creatividad que se
                </motion.h1>
                <motion.h1
                  className="text-3xl md:text-4xl font-heading font-bold text-text mb-6 leading-tight"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  Diseña e Imprime
                </motion.h1>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <Link to="/contacto">
                    <button className="bg-[#9a171c] hover:bg-[#7a1216] text-white font-bold py-3 px-8 rounded-lg text-base transition-colors cursor-pointer inline-flex items-center gap-2">
                      Contáctanos
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* ========== TABLET VERTICAL (640px - 767px) - Fondo TABLET VERTICAL ========== */}
        <div className="hidden sm:block md:hidden absolute inset-0">
          <img 
            src={`${BASE}TABLET VERTICAL.png`} 
            alt="RS Creativ" 
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 flex items-start justify-center pt-20">
            <div className="text-center px-6">
              <motion.h1
                className="text-2xl sm:text-3xl font-heading font-bold text-text mb-1 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                Creatividad que se
              </motion.h1>
              <motion.h1
                className="text-2xl sm:text-3xl font-heading font-bold text-text mb-6 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                Diseña e Imprime
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Link to="/contacto">
                  <button className="bg-[#9a171c] hover:bg-[#7a1216] text-white font-bold py-3 px-8 rounded-lg text-base transition-colors cursor-pointer inline-flex items-center gap-2">
                    Contáctanos
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>

        {/* ========== CELULAR (<640px) - Fondo CELULAR ========== */}
        <div className="sm:hidden block absolute inset-0">
          <img 
            src={`${BASE}CELULAR.png`} 
            alt="RS Creativ" 
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 flex items-start justify-center pt-16">
            <div className="text-center px-4">
              <motion.h1
                className="text-xl sm:text-2xl font-heading font-bold text-text mb-1 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                Creatividad que se
              </motion.h1>
              <motion.h1
                className="text-xl sm:text-2xl font-heading font-bold text-text mb-5 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                Diseña e Imprime
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Link to="/contacto">
                  <button className="bg-[#9a171c] hover:bg-[#7a1216] text-white font-bold py-2.5 px-6 rounded-lg text-sm transition-colors cursor-pointer inline-flex items-center gap-2">
                    Contáctanos
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== ABOUT - ¿QUIÉNES SOMOS? ==================== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
          >
            <span className="text-accent text-sm font-bold tracking-widest uppercase">
              ACERCA DE
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-text mt-4 mb-6">
              ¿QUIENES SOMOS?
            </h2>
            <p className="text-text-secondary leading-relaxed mb-4 text-lg">
              Somos RS Creativ, especialistas en diseño gráfico y soluciones creativas.
              Nos apasiona transformar tus ideas en diseños únicos, desde contenido para
              redes sociales hasta identidad visual y material publicitario.
            </p>
            <p className="text-text-secondary leading-relaxed mb-6 text-lg">
              Ofrecemos servicios de impresión y soluciones digitales, adaptadas a cada necesidad.
              Además, contamos con una línea de productos personalizados, perfectos para regalar
              o impulsar tu marca.
            </p>
            <p className="text-accent font-heading font-bold text-lg italic">
              En RS Creativ, hacemos realidad tus ideas con creatividad, dedicación y estilo.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mt-8 max-w-md mx-auto">
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
        </div>
      </section>

      {/* ==================== MISIÓN Y VISIÓN ==================== */}
      <section className="py-20 bg-bg-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
          >
            <span className="text-accent text-sm font-bold tracking-widest uppercase">
              Nuestro Propósito
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-text mt-4">
              Misión y Visión
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewportConfig}
            >
              <div className="bg-white rounded-2xl p-8 border border-border h-full">
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                  <Target className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-xl font-heading font-bold text-text mb-4">
                  Nuestra Misión
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  Nuestra misión es brindar un servicio de calidad a nuestros clientes,
                  transformando ideas creativas en piezas gráficas funcionales y atractivas,
                  que comuniquen de manera efectiva y aporten valor a sus proyectos.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewportConfig}
            >
              <div className="bg-white rounded-2xl p-8 border border-border h-full">
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                  <Eye className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-xl font-heading font-bold text-text mb-4">
                  Nuestra Visión
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  Nuestra visión es consolidarnos como una agencia en el mercado,
                  destacando por ofrecer soluciones integrales en diseño gráfico,
                  impresión, y merchandising con altos estándares de calidad y
                  atención personalizada.
                </p>
              </div>
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 [grid-auto-rows:1fr]"
            variants={containerVariants(0.15)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            {services.map((service, index) => (
              <motion.div key={index} variants={itemVariants}>
                <div className="h-full flex flex-col">
                <Card className="flex-1 group" hover padding="lg">
                  <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors">
                    <service.icon className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-text mb-3">
                    Servicio de {service.title}
                  </h3>
                  <p className="text-text-secondary text-sm mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                    {service.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center gap-2 text-sm text-text-secondary">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </Card>
                </div>
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
                <Card className="text-center group h-full" hover padding="lg">
                  <motion.div
                    className="w-24 h-24 rounded-full bg-accent/10 border-2 border-accent/20 flex items-center justify-center mx-auto mb-6 group-hover:border-accent/50 transition-colors overflow-hidden"
                    whileHover={{ scale: 1.1 }}
                  >
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
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
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ==================== CLIENTS ==================== */}
      <section className="py-20 bg-bg-gray overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle 
            title="Ellos Confiaron en Nosotros" 
            subtitle="Marcas y personas que eligieron RS Creativ para sus proyectos."
          />
        </div>

        <div className="mt-12 relative">
          {/* Degradado izquierdo para efecto de desvanecimiento */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-bg-gray to-transparent z-10 pointer-events-none" />
          {/* Degradado derecho para efecto de desvanecimiento */}
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-bg-gray to-transparent z-10 pointer-events-none" />
          
          {/* Contenedor del carrusel */}
          <div className="flex overflow-hidden">
            <div className="flex animate-marquee gap-6">
              {/* Primera serie de logos */}
              {[
                { name: 'Sazón Criollo', logo: `${BASE}SAZON-CRIOLLO-LOGO.png` },
                { name: 'C&G Asociados', logo: `${BASE}LOGO-CG-ASOCIADOS.png` },
                { name: 'Dentica', logo: `${BASE}DENTICA.png` },
                { name: 'Agrobel', logo: `${BASE}AGROBEL.png` },
                { name: 'Caji Fiestas', logo: `${BASE}CAJI-FIESTAS.png` },
                { name: 'Recurso 20', logo: `${BASE}Recurso-20.png` },
              ].map((client, i) => (
                <div 
                  key={`a-${i}`} 
                  className="flex-shrink-0 w-48 h-32 bg-white rounded-xl flex items-center justify-center border border-border shadow-sm p-4 hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  <img 
                    src={client.logo} 
                    alt={client.name} 
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              ))}
              {/* Segunda serie de logos (duplicado para efecto infinito) */}
              {[
                { name: 'Sazón Criollo', logo: `${BASE}SAZON-CRIOLLO-LOGO.png` },
                { name: 'C&G Asociados', logo: `${BASE}LOGO-CG-ASOCIADOS.png` },
                { name: 'Dentica', logo: `${BASE}DENTICA.png` },
                { name: 'Agrobel', logo: `${BASE}AGROBEL.png` },
                { name: 'Caji Fiestas', logo: `${BASE}CAJI-FIESTAS.png` },
                { name: 'Recurso 20', logo: `${BASE}Recurso-20.png` },
              ].map((client, i) => (
                <div 
                  key={`b-${i}`} 
                  className="flex-shrink-0 w-48 h-32 bg-white rounded-xl flex items-center justify-center border border-border shadow-sm p-4 hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  <img 
                    src={client.logo} 
                    alt={client.name} 
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
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
