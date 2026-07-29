import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { viewportConfig } from '@/animations/variants';
import PageTransition from '@/components/ui/PageTransition';

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
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-lg max-w-none"
          >
            <div className="bg-bg-gray rounded-2xl p-8 md:p-12 border border-border">
              <div className="space-y-6 text-text-secondary leading-relaxed">
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-accent mt-3 flex-shrink-0" />
                  <p>
                    <span className="font-semibold text-text">Adelanto del 50%:</span> Se debe realizar un adelanto del 50% para empezar el diseño.
                  </p>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-accent mt-3 flex-shrink-0" />
                  <p>
                    <span className="font-semibold text-text">Impresión:</span> Una vez aprobado el diseño no hay derecho a reclamo ni devolución.
                  </p>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-accent mt-3 flex-shrink-0" />
                  <p>
                    <span className="font-semibold text-text">Cambios:</span> Se permiten 3 cambios gratuitos. Superado ese límite se cobrará S/. 5.00 adicionales en base a la cantidad de cambios y su complejidad.
                  </p>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-accent mt-3 flex-shrink-0" />
                  <p>
                    <span className="font-semibold text-text">Diseño:</span> El cambio total del diseño tiene un costo adicional de S/. 10.00 (Excluye: Si el diseño se deshecha y ya hecho, cambio de formato y/o medida).
                  </p>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-accent mt-3 flex-shrink-0" />
                  <p>
                    Brindar toda la información completa desde el inicio.
                  </p>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-accent mt-3 flex-shrink-0" />
                  <p>
                    <span className="font-semibold text-text">Fotos:</span> Todas las fotos que se incluyen en un diseño tienen un costo adicional de S/. 5.00 (Se realiza retoque, color y mejora de calidad).
                  </p>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-accent mt-3 flex-shrink-0" />
                  <p>
                    <span className="font-semibold text-text">Fotomontaje:</span> En caso de fotomontaje el costo adicional es de S/. 5.00, una vez hecho el fotomontaje no hay derecho a reclamo ni devolución alguna.
                  </p>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-accent mt-3 flex-shrink-0" />
                  <p>
                    Consultar el tiempo de espera de trabajo.
                  </p>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-accent mt-3 flex-shrink-0" />
                  <p>
                    Consultar precio de delivery en caso lo requiera o punto de recojo.
                  </p>
                </div>
              </div>
            </div>

            <motion.div
              className="mt-12 text-center"
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
