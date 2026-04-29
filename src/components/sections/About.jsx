import { motion } from 'framer-motion'
import { Clock, Briefcase, Layers, GraduationCap } from 'lucide-react'

const stats = [
  {
    icon: Clock,
    value: '7+',
    label: 'años de experiencia en SIG aplicado',
  },
  {
    icon: Briefcase,
    value: 'Múltiples sectores',
    label: 'Proyectos en gobierno y sector privado',
  },
  {
    icon: Layers,
    value: 'Stack moderno',
    label: 'React, PostGIS, Python, ML',
  },
  {
    icon: GraduationCap,
    value: 'Maestría en IA',
    label: '+ especialidad en geoinformática',
  },
]

export default function About() {
  return (
    <section id="nosotros" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-extrabold text-ink-900 sm:text-4xl">Sobre nosotros</h2>
            <p className="mt-6 text-lg leading-relaxed text-ink-700">
              GeoBInt nace de la convicción de que los datos espaciales son el activo más subestimado en la toma de decisiones. Combinamos formación académica avanzada, amplia experiencia profesional y dominio del estado del arte en SIG, ciencia de datos e inteligencia artificial geoespacial.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-ink-700">
              Trabajamos con instituciones de gobierno, desarrolladores inmobiliarios, consultoras y centros de investigación que necesitan respuestas rigurosas a preguntas territoriales complejas.
            </p>
          </motion.div>

          {/* Stats grid */}
          <motion.div
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <div
                  key={stat.label}
                  className="flex flex-col items-start rounded-xl border border-ink-100 bg-ink-100 p-5"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-green/10">
                    <Icon size={20} className="text-brand-green" aria-hidden="true" />
                  </div>
                  <p className="mt-3 text-lg font-bold text-ink-900">{stat.value}</p>
                  <p className="mt-1 text-sm text-ink-500">{stat.label}</p>
                </div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
