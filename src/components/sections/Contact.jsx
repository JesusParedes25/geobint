import { motion } from 'framer-motion'
import { Mail, Phone, MapPin } from 'lucide-react'

// Facebook icon (lucide-react doesn't have it)
const FacebookIcon = ({ size = 24, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
)

export default function Contact() {
  return (
    <section id="contacto" className="bg-ink-100 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-extrabold text-ink-900 sm:text-4xl">Hablemos de tu proyecto</h2>
          <p className="mt-4 text-lg text-ink-700">
            Cotizaciones a medida. Contáctanos por cualquiera de estos medios.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {/* Phone */}
            <a
              href="https://wa.me/525539781961"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 rounded-xl bg-white p-6 shadow-sm transition-all hover:shadow-md hover:scale-[1.02]"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-green/10">
                <Phone size={24} className="text-brand-green" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-medium text-ink-500">WhatsApp</p>
                <p className="mt-1 text-lg font-bold text-ink-900">55 3978 1961</p>
              </div>
            </a>

            {/* Email */}
            <a
              href="mailto:jeparedes25@gmail.com"
              className="flex flex-col items-center gap-3 rounded-xl bg-white p-6 shadow-sm transition-all hover:shadow-md hover:scale-[1.02]"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-teal/10">
                <Mail size={24} className="text-brand-teal" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-medium text-ink-500">Email</p>
                <p className="mt-1 text-lg font-bold text-ink-900">jeparedes25@gmail.com</p>
              </div>
            </a>

            {/* Facebook */}
            <a
              href="https://web.facebook.com/people/GeobInt/100086411589673/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 rounded-xl bg-white p-6 shadow-sm transition-all hover:shadow-md hover:scale-[1.02]"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-500/10">
                <FacebookIcon size={24} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-ink-500">Facebook</p>
                <p className="mt-1 text-lg font-bold text-ink-900">GeobInt</p>
              </div>
            </a>

            {/* Location */}
            <div className="flex flex-col items-center gap-3 rounded-xl bg-white p-6 shadow-sm">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-teal/10">
                <MapPin size={24} className="text-brand-teal" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-medium text-ink-500">Ubicación</p>
                <p className="mt-1 text-lg font-bold text-ink-900">Ciudad de México</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
