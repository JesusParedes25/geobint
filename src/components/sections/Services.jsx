import { motion } from 'framer-motion'
import { Map, Target, BarChart3, Cpu, Code2, Building2 } from 'lucide-react'

const services = [
  {
    icon: Map,
    title: 'Cartografía interactiva',
    description: 'Visores web personalizados, mapas dinámicos y dashboards geoespaciales con tecnología WebGIS de última generación.',
  },
  {
    icon: Target,
    title: 'Geomarketing',
    description: 'Análisis de mercado con componente espacial: localización óptima, segmentación territorial y áreas de influencia.',
  },
  {
    icon: BarChart3,
    title: 'Geoestadística',
    description: 'Modelos espaciales rigurosos: interpolación, autocorrelación, análisis de patrones y predicción geográfica.',
  },
  {
    icon: Cpu,
    title: 'Modelación numérica',
    description: 'Modelos de aptitud, simulación de cambio de uso de suelo, autómatas celulares y machine learning espacial.',
  },
  {
    icon: Code2,
    title: 'Desarrollo web',
    description: 'Aplicaciones web a medida con stack moderno (React, Node.js, PostGIS, GeoServer) para gestión territorial.',
  },
  {
    icon: Building2,
    title: 'Ordenamiento territorial',
    description: 'Especialistas en instrumentos: PGS, PTO, atlas de riesgos y planes municipales.',
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export default function Services() {
  return (
    <section id="servicios" className="bg-ink-100 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-extrabold text-ink-900 sm:text-4xl">Lo que hacemos</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-ink-500">
            Seis líneas de servicio respaldadas por experiencia técnica y proyectos entregados.
          </p>
        </motion.div>

        <motion.div
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {services.map((service) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                variants={cardVariants}
                className="group relative overflow-hidden rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                {/* Top border accent on hover */}
                <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-brand-green transition-transform duration-300 group-hover:scale-x-100" />
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-teal/10">
                  <Icon size={24} className="text-brand-teal" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-ink-900">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-700">{service.description}</p>
                <a
                  href="#contacto"
                  className="mt-4 inline-flex items-center text-sm font-medium text-brand-teal transition-colors hover:text-brand-teal-dark"
                >
                  Saber más <span className="ml-1" aria-hidden="true">→</span>
                </a>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
