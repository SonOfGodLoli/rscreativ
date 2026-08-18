import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { viewportConfig } from '@/animations/variants';
import PageTransition from '@/components/ui/PageTransition';

const sections = [
  {
    title: '1. COTIZACIONES Y PEDIDOS',
    items: [
      'Toda cotización tiene una vigencia determinada según lo indicado por RS Creativ.',
      'Los precios, cantidades, materiales, medidas, acabados y características del pedido serán los establecidos en la cotización aprobada por el cliente.',
      'Cualquier modificación posterior a la cotización podrá generar un costo adicional.',
      'El trabajo se considera confirmado únicamente después de recibir el adelanto correspondiente.',
    ],
  },
  {
    title: '2. FORMA DE PAGO',
    items: [
      'Para iniciar cualquier trabajo se requiere un 50% de adelanto del valor total del pedido.',
      'El 50% restante deberá ser cancelado antes o al momento de la entrega del trabajo.',
      'RS Creativ no iniciará la producción, impresión, personalización o desarrollo del pedido hasta recibir el adelanto correspondiente.',
    ],
  },
  {
    title: '3. DISEÑO Y APROBACIÓN',
    items: [
      'El cliente deberá proporcionar correctamente textos, nombres, fechas, fotografías, logotipos, colores y demás información necesaria para realizar el trabajo.',
      'RS Creativ no se responsabiliza por errores ocasionados por información incorrecta proporcionada por el cliente.',
      'Antes de pasar a producción, el cliente deberá revisar y aprobar el diseño final.',
      'Una vez aprobado el diseño y enviado a producción, cualquier modificación podrá generar un costo adicional y, dependiendo del estado del trabajo, podría no ser posible realizar cambios.',
      'La aprobación del diseño implica la conformidad del cliente con textos, medidas, colores, distribución y demás elementos visibles en la propuesta aprobada.',
    ],
  },
  {
    title: '4. CAMBIOS Y MODIFICACIONES',
    items: [
      'Los cambios incluidos en el servicio serán los previamente acordados en la cotización.',
      'Cambios adicionales, rediseños completos o modificaciones solicitadas después de la aprobación podrán tener un costo adicional.',
      'Si el cliente proporciona nueva información después de haber iniciado el trabajo, esto puede modificar el tiempo y costo originalmente cotizados.',
    ],
  },
  {
    title: '5. TIEMPOS DE ENTREGA',
    items: [
      'El tiempo de entrega será comunicado al cliente al momento de confirmar el pedido.',
      'Los tiempos empiezan a contar desde la confirmación del pedido y la recepción de toda la información necesaria para realizarlo.',
      'Los retrasos ocasionados por falta de información, cambios solicitados por el cliente, falta de aprobación o pagos pendientes no serán considerados responsabilidad de RS Creativ.',
      'Los trabajos urgentes estarán sujetos a disponibilidad y podrán tener un costo adicional.',
    ],
  },
  {
    title: '6. PRODUCCIÓN E IMPRESIÓN',
    items: [
      'En productos impresos y personalizados pueden existir pequeñas variaciones de color, tonalidad, corte, acabado o posición propias de los procesos de impresión y producción.',
      'Los colores visualizados en una pantalla pueden variar respecto al resultado físico debido a diferencias entre monitores, dispositivos y sistemas de impresión.',
    ],
  },
  {
    title: '7. ENTREGA',
    items: [
      'El cliente deberá verificar el estado y cantidad de los productos al momento de recibirlos.',
      'Una vez realizada la entrega y aceptado el pedido, cualquier reclamo relacionado con daños visibles o faltantes deberá comunicarse a RS Creativ dentro del plazo establecido para cada pedido.',
      'Los gastos de envío o delivery, cuando correspondan, serán asumidos por el cliente, salvo que se indique lo contrario en la cotización.',
    ],
  },
  {
    title: '8. CANCELACIONES',
    items: [
      'Una vez iniciado el trabajo, diseño, producción o compra de materiales, el adelanto podrá no ser reembolsable debido a los costos y recursos ya utilizados.',
      'Si el pedido ya se encuentra en producción, no podrá cancelarse cuando ello implique que RS Creativ deba asumir costos de producción, materiales o servicios de terceros.',
      'Cualquier solicitud de cancelación será evaluada según el estado en el que se encuentre el pedido.',
    ],
  },
  {
    title: '9. ARCHIVOS Y DISEÑOS',
    items: [
      'Los archivos editables o archivos fuente de los diseños no están incluidos salvo que hayan sido expresamente cotizados.',
      'Los archivos finales que correspondan al servicio contratado serán entregados según lo acordado con el cliente.',
      'RS Creativ podrá conservar una copia de los trabajos realizados para fines de respaldo y portafolio, salvo que el cliente solicite expresamente lo contrario cuando corresponda.',
    ],
  },
  {
    title: '10. RESPONSABILIDAD DEL CLIENTE',
    items: [
      'El cliente es responsable de verificar que la información proporcionada a RS Creativ sea correcta y que cuenta con los derechos o autorizaciones necesarios sobre logotipos, fotografías, textos, personajes, marcas y demás elementos proporcionados para el trabajo.',
      'RS Creativ no será responsable por reclamos relacionados con contenido proporcionado directamente por el cliente.',
    ],
  },
  {
    title: '11. TRABAJOS PERSONALIZADOS',
    items: [
      'Los productos personalizados o fabricados específicamente según las indicaciones del cliente no podrán ser cambiados por otro producto ni devueltos por motivos de cambio de opinión, salvo que exista un defecto atribuible a RS Creativ y corresponda aplicar una solución.',
    ],
  },
  {
    title: '12. RECLAMOS',
    items: [
      'Cualquier inconveniente deberá ser comunicado a RS Creativ lo antes posible, proporcionando fotografías, videos o información que permita evaluar el caso.',
      'Cada reclamo será revisado individualmente según el tipo de producto, servicio contratado y circunstancias del inconveniente.',
    ],
  },
  {
    title: '13. ACEPTACIÓN',
    items: [
      'Al realizar el pago del adelanto, aprobar un diseño o confirmar un pedido, el cliente declara haber leído, comprendido y aceptado estos términos y condiciones.',
    ],
  },
];

export default function Terminos() {
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
              Legal
            </span>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mt-4 mb-6">
              Términos y Condiciones
            </h1>
            <p className="text-white/70 text-sm">
              Última actualización: Agosto 2026
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <p className="text-text-secondary leading-relaxed text-base">
              Estos términos y condiciones regulan la contratación de los servicios de diseño, impresión, publicidad, personalización y demás servicios ofrecidos por <span className="font-semibold text-text">RS Creativ SAC</span>. Al realizar un pedido o aceptar una cotización, el cliente declara haber leído y aceptado las siguientes condiciones.
            </p>

            {sections.map((section, sIndex) => (
              <motion.div
                key={sIndex}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportConfig}
                transition={{ delay: sIndex * 0.03 }}
                className="bg-bg-gray rounded-2xl p-6 md:p-8 border border-border"
              >
                <h2 className="text-lg md:text-xl font-heading font-bold text-text mb-4">
                  {section.title}
                </h2>
                <ul className="space-y-3">
                  {section.items.map((item, iIndex) => (
                    <li key={iIndex} className="flex items-start gap-3 text-text-secondary leading-relaxed text-sm md:text-base">
                      <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}

            <div className="text-center pt-6 border-t border-border">
              <p className="font-heading font-bold text-text text-lg mb-1">RS CREATIV SAC</p>
              <p className="text-text-secondary text-sm">Diseño · Impresión · Personalización · Publicidad</p>
              <p className="text-accent font-medium text-sm mt-2">Gracias por confiar en RS Creativ.</p>
            </div>

            <motion.div
              className="text-center pt-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={viewportConfig}
            >
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-accent hover:text-accent-hover transition-colors font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                Volver al Inicio
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}
