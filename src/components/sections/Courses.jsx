import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, Monitor, Award, DollarSign, BookOpen } from 'lucide-react'
import { getCourses } from '../../data/courses.js'

export default function Courses() {
  const [courses, setCourses] = useState([])

  useEffect(() => {
    setCourses(getCourses())
    
    // Listen for storage changes (when admin updates courses)
    const handleStorage = () => setCourses(getCourses())
    window.addEventListener('storage', handleStorage)
    window.addEventListener('coursesUpdated', handleStorage)
    return () => {
      window.removeEventListener('storage', handleStorage)
      window.removeEventListener('coursesUpdated', handleStorage)
    }
  }, [])

  // No courses available
  if (courses.length === 0) {
    return (
      <section id="cursos" className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="overflow-hidden rounded-2xl bg-gradient-to-br from-brand-teal to-brand-teal-dark px-6 py-14 text-center text-white sm:px-12 md:py-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest">
              Cursos
            </span>
            <h2 className="mt-6 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
              Próximamente
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-white/80">
              Estamos preparando nuevos cursos de capacitación en SIG, análisis geoespacial e inteligencia territorial. ¡Mantente atento!
            </p>
            <div className="mt-8">
              <a
                href="#contacto"
                className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 text-base font-bold text-brand-teal shadow-lg transition-all hover:bg-ink-100 hover:scale-[1.02]"
              >
                Contáctanos para más información
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section id="cursos" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-extrabold text-ink-900 sm:text-4xl">Cursos disponibles</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-ink-500">
            Capacitación especializada en sistemas de información geográfica e inteligencia territorial.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              className="overflow-hidden rounded-2xl bg-ink-100 shadow-sm"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Course image */}
              {course.image && (
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}

              <div className="p-6 sm:p-8">
                <h3 className="text-xl font-bold text-ink-900 sm:text-2xl">{course.title}</h3>
                
                {course.description && (
                  <p className="mt-3 text-ink-700">{course.description}</p>
                )}

                {/* Course details */}
                <div className="mt-6 flex flex-wrap gap-3">
                  {course.price && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-green/10 px-3 py-1.5 text-sm font-medium text-brand-green">
                      <DollarSign size={14} aria-hidden="true" />
                      {course.price}
                    </span>
                  )}
                  {course.date && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-teal/10 px-3 py-1.5 text-sm font-medium text-brand-teal">
                      <Calendar size={14} aria-hidden="true" />
                      {course.date}
                    </span>
                  )}
                  {course.schedule && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-teal/10 px-3 py-1.5 text-sm font-medium text-brand-teal">
                      <Clock size={14} aria-hidden="true" />
                      {course.schedule}
                    </span>
                  )}
                  {course.duration && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-teal/10 px-3 py-1.5 text-sm font-medium text-brand-teal">
                      <BookOpen size={14} aria-hidden="true" />
                      {course.duration}
                    </span>
                  )}
                  {course.modality && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-teal/10 px-3 py-1.5 text-sm font-medium text-brand-teal">
                      <Monitor size={14} aria-hidden="true" />
                      {course.modality}
                    </span>
                  )}
                  {course.certificate && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-teal/10 px-3 py-1.5 text-sm font-medium text-brand-teal">
                      <Award size={14} aria-hidden="true" />
                      Certificado incluido
                    </span>
                  )}
                </div>

                {/* Syllabus */}
                {course.syllabus && (
                  <div className="mt-6">
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-ink-500">Temario</h4>
                    <div className="mt-2 text-sm text-ink-700 whitespace-pre-line">{course.syllabus}</div>
                  </div>
                )}

                {/* Secondary image */}
                {course.image2 && (
                  <div className="mt-6 overflow-hidden rounded-lg">
                    <img
                      src={course.image2}
                      alt={`${course.title} - imagen adicional`}
                      className="w-full object-cover"
                    />
                  </div>
                )}

                {/* CTA */}
                <div className="mt-6">
                  <a
                    href="#contacto"
                    className="inline-flex w-full items-center justify-center rounded-lg bg-brand-teal px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-brand-teal-dark hover:scale-[1.02] sm:w-auto"
                  >
                    Inscribirme
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
