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
      {/* Hero con fondo navy oscuro (#040a33) */}
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
          {/* Título principal */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-white mb-2 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Creatividad que se
          </motion.h1>
          
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-white mb-6 leading-tight italic"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            diseña e imprime
          </motion.h1>

          {/* Logo RS Creativ en el hero */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex justify-center mb-8"
          >
            <img src={`${BASE}rs-logo.svg`} alt="RS Creativ" className="w-32 h-32 object-contain" />
          </motion.div>

          {/* Botones CTA */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Link to="/contacto">
              <button className="bg-[#9a171c] hover:bg-[#7a1216] text-white font-bold py-4 px-10 rounded-lg text-lg transition-colors cursor-pointer inline-flex items-center gap-2">
                Contáctanos
                <ArrowRight className="w-5 h-5" />
              </button>
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch"
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
                  <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                    {service.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center gap-2 text-sm text-text-secondary">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
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
      <section className="py-20 bg-bg-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle 
            title="Ellos Confiaron en Nosotros" 
            subtitle="Marcas y personas que eligieron RS Creativ para sus proyectos."
          />

          <motion.div
            className="flex flex-wrap justify-center items-center gap-8 mt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
          >
            {[
              { name: 'Sazón Criollo', logo: `${BASE}SAZON-CRIOLLO-LOGO.png` },
              { name: 'C&G Asociados', logo: `${BASE}LOGO-CG-ASOCIADOS.png` },
              { name: 'Dentica', logo: `${BASE}DENTICA.png` },
              { name: 'Agrobel', logo: `${BASE}AGROBEL.png` },
              { name: 'Caji Fiestas', logo: `${BASE}CAJI-FIESTAS.png` },
              { name: 'Recurso 20', logo: `${BASE}Recurso-20.png` },
            ].map((client, i) => (
              <motion.div 
                key={i} 
                className="w-48 h-32 bg-white rounded-xl flex items-center justify-center border border-border shadow-sm p-4 hover:shadow-lg transition-shadow"
                whileHover={{ scale: 1.05, y: -4 }}
              >
                <img 
                  src={client.logo} 
                  alt={client.name} 
                  className="max-w-full max-h-full object-contain"
                />
              </motion.div>
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
