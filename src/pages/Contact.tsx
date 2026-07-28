/**
 * Página Contact - Formulario de Contacto de RS Creativ
 * 
 * Página de contacto con formulario validado y información de la empresa.
 * 
 * Funcionalidades:
 * - Formulario con React Hook Form para manejo de estado
 * - Validación con Zod para reglas de negocio
 * - Mensajes de error inline en cada campo
 * - Estados de éxito y error al enviar el formulario
 * - Información de contacto lateral (teléfono, email, dirección, horarios)
 * - Links a redes sociales
 * - Animaciones de scroll con Framer Motion
 * - Diseño completamente responsive
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
  MessageSquare,
  User,
  FileText,
  Loader2,
  ExternalLink,
} from 'lucide-react';

// Variantes de animacion para scroll
import {
  fadeInLeft,
  fadeInRight,
  viewportConfig,
  itemVariants,
} from '@/animations/variants';

// Componentes UI reutilizables
import Card from '@/components/ui/Card';
import PageTransition from '@/components/ui/PageTransition';

/**
 * Esquema de validacion con Zod para el formulario de contacto.
 * Define las reglas de validacion para cada campo.
 */
const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres'),
  email: z
    .string()
    .email('Por favor, ingresa un correo electronico valido'),
  phone: z
    .string()
    .min(9, 'El telefono debe tener al menos 9 digitos')
    .max(15, 'El telefono no puede exceder 15 caracteres')
    .optional()
    .or(z.literal('')),
  subject: z
    .string()
    .min(5, 'El asunto debe tener al menos 5 caracteres')
    .max(200, 'El asunto no puede exceder 200 caracteres'),
  message: z
    .string()
    .min(10, 'El mensaje debe tener al menos 10 caracteres')
    .max(2000, 'El mensaje no puede exceder 2000 caracteres'),
});

/** Tipo inferido del esquema de validacion */
type ContactFormData = z.infer<typeof contactSchema>;

/** Datos de informacion de contacto de la empresa */
const contactInfo = [
  {
    icon: Phone,
    label: 'Telefono',
    value: '+51 933 866 156',
    link: 'https://wa.me/51933866156',
    description: 'Llamanos o envia un WhatsApp',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'rs.creativ.oficial@gmail.com',
    link: 'mailto:rs.creativ.oficial@gmail.com',
    description: 'Respuesta en menos de 24 horas',
  },
  {
    icon: MapPin,
    label: 'Ubicacion',
    value: 'Peru',
    link: null,
    description: 'Atencion presencial con cita previa',
  },
  {
    icon: Clock,
    label: 'Horario',
    value: 'Lun - Vie: 10:00 - 20:00',
    link: null,
    description: 'Sabado: 11:00 - 17:00',
  },
];

/** Redes sociales de RS Creativ */
const socialLinks = [
  { name: 'WhatsApp', url: 'https://web.whatsapp.com/', emoji: '💬', color: 'hover:bg-green-500/20' },
  { name: 'Facebook', url: 'https://www.facebook.com/profile.php?id=61562236591988', emoji: '📘', color: 'hover:bg-blue-500/20' },
  { name: 'Instagram', url: 'https://www.instagram.com/rs.creativ', emoji: '📷', color: 'hover:bg-pink-500/20' },
];

/**
 * Componente principal de la pagina de Contacto.
 */
export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  /**
   * Configuracion de React Hook Form con validacion Zod.
   */
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    },
  });

  /**
   * Funcion que se ejecuta al enviar el formulario correctamente.
   */
  const onSubmit = async (data: ContactFormData) => {
    try {
      setIsSubmitting(true);
      setSubmitError(null);
      // Simular delay de red
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('Datos del formulario:', data);
      setSubmitSuccess(true);
      reset();
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch {
      setSubmitError('Hubo un error al enviar el mensaje. Por favor, intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Renderiza un campo de formulario con label, input y mensaje de error.
   */
  const renderField = (
    name: keyof ContactFormData,
    label: string,
    type: string,
    placeholder: string,
    icon: React.ReactNode,
    required = true,
    isTextarea = false
  ) => {
    const error = errors[name];
    const fieldId = `field-${name}`;

    return (
      <div className="space-y-2">
        <label htmlFor={fieldId} className="block text-text text-sm font-medium">
          {label} {required && <span className="text-accent">*</span>}
        </label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary">
            {icon}
          </div>
          {isTextarea ? (
            <textarea
              id={fieldId}
              {...register(name)}
              placeholder={placeholder}
              rows={5}
              className={`w-full pl-10 pr-4 py-3 bg-bg-gray border rounded-lg text-text placeholder-text-secondary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors resize-none ${error ? 'border-red-500' : 'border-border'}`}
            />
          ) : (
            <input
              id={fieldId}
              type={type}
              {...register(name)}
              placeholder={placeholder}
              className={`w-full pl-10 pr-4 py-3 bg-bg-gray border rounded-lg text-text placeholder-text-secondary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors ${error ? 'border-red-500' : 'border-border'}`}
            />
          )}
        </div>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-400 text-sm flex items-center gap-1"
          >
            <AlertCircle className="w-4 h-4" />
            {error.message}
          </motion.p>
        )}
      </div>
    );
  };

  return (
    <PageTransition>
      {/* HEADER DE LA PAGINA */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-accent to-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-white text-sm font-medium tracking-widest uppercase">
              Contactanos
            </span>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mt-4 mb-6">
              Hablemos de tu{' '}
              <span className="text-white">Proyecto</span>
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Estamos aqui para ayudarte. Cuentanos tu idea y te responderemos
              con una propuesta personalizada.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CONTENIDO PRINCIPAL */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* COLUMNA IZQUIERDA: FORMULARIO */}
            <motion.div
              className="lg:col-span-2"
              variants={fadeInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
            >
              <Card padding="lg">
                <div className="mb-8">
                  <h2 className="text-2xl font-heading font-bold text-text mb-2">
                    Envianos un Mensaje
                  </h2>
                  <p className="text-text-secondary">
                    Completa el formulario y te responderemos lo antes posible.
                  </p>
                </div>

                {submitSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="text-green-400 font-medium">Mensaje enviado!</p>
                      <p className="text-green-400/70 text-sm">
                        Te responderemos en menos de 24 horas.
                      </p>
                    </div>
                  </motion.div>
                )}

                {submitError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3"
                  >
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    <div>
                      <p className="text-red-400 font-medium">Error al enviar</p>
                      <p className="text-red-400/70 text-sm">{submitError}</p>
                    </div>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {renderField('name', 'Nombre Completo', 'text', 'Tu nombre', <User className="w-4 h-4" />)}
                    {renderField('email', 'Correo Electronico', 'email', 'tu@email.com', <Mail className="w-4 h-4" />)}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {renderField('phone', 'Telefono (Opcional)', 'tel', '+51 933 866 156', <Phone className="w-4 h-4" />, false)}
                    {renderField('subject', 'Asunto', 'text', 'En que podemos ayudarte?', <FileText className="w-4 h-4" />)}
                  </div>
                  {renderField('message', 'Mensaje', 'text', 'Cuentanos sobre tu proyecto...', <MessageSquare className="w-4 h-4" />, true, true)}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-semibold transition-all duration-300 cursor-pointer ${isSubmitting ? 'bg-accent/50 text-white/70 cursor-not-allowed' : 'bg-accent hover:bg-accent-hover text-white'}`}
                    whileHover={!isSubmitting ? { scale: 1.02 } : undefined}
                    whileTap={!isSubmitting ? { scale: 0.98 } : undefined}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Enviar Mensaje
                      </>
                    )}
                  </motion.button>
                </form>
              </Card>
            </motion.div>

            {/* COLUMNA DERECHA: INFORMACION */}
            <motion.div
              className="space-y-6"
              variants={fadeInRight}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
            >
              <Card padding="lg">
                <h3 className="text-xl font-heading font-bold text-text mb-6">
                  Informacion de Contacto
                </h3>
                <div className="space-y-5">
                  {contactInfo.map((info, index) => {
                    const Icon = info.icon;
                    return (
                      <motion.div
                        key={index}
                        variants={itemVariants}
                        className="flex items-start gap-4 group"
                      >
                        <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                          <Icon className="w-5 h-5 text-accent" />
                        </div>
                        <div className="flex-1">
                          <p className="text-text-secondary text-xs uppercase tracking-wider mb-1">
                            {info.label}
                          </p>
                          {info.link ? (
                            <a
                              href={info.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-text font-medium hover:text-accent transition-colors flex items-center gap-1"
                            >
                              {info.value}
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          ) : (
                            <p className="text-text font-medium">{info.value}</p>
                          )}
                          <p className="text-text-secondary text-xs mt-1">{info.description}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </Card>

              {/* Tarjeta de redes sociales */}
              <Card padding="lg">
                <h3 className="text-xl font-heading font-bold text-text mb-4">
                  Redes Sociales
                </h3>
                <p className="text-text-secondary text-sm mb-6">
                  Siguenos en nuestras redes para ver nuestro trabajo.
                </p>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg bg-bg-gray text-text text-sm font-medium transition-colors ${social.color}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="text-lg">{social.emoji}</span>
                      <span className="hidden sm:inline">{social.name}</span>
                    </motion.a>
                  ))}
                </div>
              </Card>

              {/* Tarjeta de horarios */}
              <Card padding="lg">
                <h3 className="text-xl font-heading font-bold text-text mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-accent" />
                  Horario de Atencion
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Lunes - Viernes</span>
                    <span className="text-text font-medium">10:00 - 20:00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Sabado</span>
                    <span className="text-text font-medium">11:00 - 17:00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Domingo</span>
                    <span className="text-text font-medium">10:00 - 12:00</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
