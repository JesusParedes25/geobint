import { Mail, Phone } from 'lucide-react'

// Facebook icon (lucide-react doesn't have it)
const FacebookIcon = ({ size = 16, className = '' }) => (
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

const quickLinks = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Cursos', href: '#cursos' },
  { label: 'Contacto', href: '#contacto' },
]

export default function Footer() {
  return (
    <footer className="bg-ink-900 py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Col 1: Brand */}
          <div>
            <a href="#" className="inline-flex items-center gap-2">
              <img
                src="/images/logo_con_fondo_blanco.png"
                alt="GeoBInt"
                className="h-20 w-auto"
              />
            </a>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              Inteligencia geoespacial para decisiones que transforman territorios.
            </p>
            <p className="mt-4 text-xs text-white/40">
              © 2026 GeoBInt. Todos los derechos reservados.
            </p>
          </div>

          {/* Col 2: Quick links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/80">
              Navegación
            </h4>
            <ul className="mt-4 space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contact + socials */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/80">
              Contacto
            </h4>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href="https://wa.me/525539781961"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
                >
                  <Phone size={16} aria-hidden="true" />
                  55 3978 1961
                </a>
              </li>
              <li>
                <a
                  href="mailto:jeparedes25@gmail.com"
                  className="flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
                >
                  <Mail size={16} aria-hidden="true" />
                  jeparedes25@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://web.facebook.com/people/GeobInt/100086411589673/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
                >
                  <FacebookIcon size={16} />
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
