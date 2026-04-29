import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'

function GridBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Subtle grid */}
      <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="hero-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(30,110,126,0.07)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-grid)" />
      </svg>
      {/* Radial blob */}
      <div className="absolute -top-32 right-0 h-[600px] w-[600px] rounded-full bg-brand-teal/5 blur-3xl" />
    </div>
  )
}

function MapVisual() {
  return (
    <div className="relative flex h-full min-h-[340px] items-center justify-center lg:min-h-[480px]">
      <svg
        viewBox="0 0 400 400"
        className="h-full max-h-[420px] w-full max-w-[420px]"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Grid lines */}
        {Array.from({ length: 9 }).map((_, i) => (
          <g key={i}>
            <line
              x1={50 * (i + 1)} y1="0" x2={50 * (i + 1)} y2="400"
              stroke="rgba(30,110,126,0.1)" strokeWidth="1"
            />
            <line
              x1="0" y1={50 * (i + 1)} x2="400" y2={50 * (i + 1)}
              stroke="rgba(30,110,126,0.1)" strokeWidth="1"
            />
          </g>
        ))}
        {/* Polygons */}
        <polygon points="100,80 200,50 250,150 150,180" fill="rgba(45,154,78,0.08)" stroke="rgba(45,154,78,0.25)" strokeWidth="1.5" />
        <polygon points="200,200 320,170 350,300 230,320" fill="rgba(30,110,126,0.08)" stroke="rgba(30,110,126,0.25)" strokeWidth="1.5" />
        <polygon points="60,250 150,220 180,340 80,350" fill="rgba(45,154,78,0.06)" stroke="rgba(45,154,78,0.2)" strokeWidth="1.5" />
        <polygon points="250,50 340,30 360,120 280,130" fill="rgba(30,110,126,0.06)" stroke="rgba(30,110,126,0.2)" strokeWidth="1.5" />
      </svg>

      {/* Animated pins */}
      {[
        { top: '18%', left: '38%' },
        { top: '52%', left: '68%' },
        { top: '62%', left: '25%' },
      ].map((pos, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={pos}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.8 + i * 0.2, type: 'spring', stiffness: 200 }}
        >
          <span className="relative flex h-8 w-8 items-center justify-center">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-teal/30" />
            <span className="relative flex h-6 w-6 items-center justify-center rounded-full bg-brand-teal shadow-md">
              <MapPin size={14} className="text-white" aria-hidden="true" />
            </span>
          </span>
        </motion.div>
      ))}

      {/* Floating data card */}
      <motion.div
        className="absolute bottom-8 right-4 rounded-xl border border-ink-100 bg-white/90 px-4 py-3 shadow-lg backdrop-blur-sm lg:bottom-16 lg:right-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.5 }}
      >
        <p className="text-[11px] font-medium uppercase tracking-wider text-ink-500">Datos en tiempo real</p>
        <p className="mt-1 text-lg font-bold text-brand-teal">2,847 <span className="text-sm font-normal text-ink-500">registros</span></p>
        <div className="mt-1 flex gap-1">
          {[40, 65, 45, 80, 55, 70, 90].map((h, i) => (
            <div key={i} className="w-2 rounded-sm bg-brand-green/60" style={{ height: `${h * 0.2}px` }} />
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default function Hero() {
  return (
    <section id="inicio" className="relative min-h-[90vh] overflow-hidden bg-white">
      <GridBackground />
      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-12 px-4 pt-28 pb-16 sm:px-6 lg:flex-row lg:gap-16 lg:px-8 lg:pt-36 lg:pb-24">
        {/* Text side */}
        <motion.div
          className="flex-1 text-center lg:text-left"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block rounded-full bg-brand-teal/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-teal">
            Geo Business Intelligence
          </span>
          <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-ink-900 sm:text-5xl lg:text-6xl">
            Inteligencia geoespacial para decisiones que transforman{' '}
            <span className="text-brand-teal">territorios</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-700 lg:text-xl">
            Convertimos datos espaciales en estrategia. Diseñamos soluciones SIG, modelos territoriales e instrumentos de ordenamiento para gobierno y sector privado.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
            <a
              href="#servicios"
              className="inline-flex items-center justify-center rounded-lg bg-brand-teal px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-brand-teal-dark hover:scale-[1.02]"
            >
              Conoce nuestros servicios
            </a>
            <a
              href="#cursos"
              className="inline-flex items-center justify-center rounded-lg border-2 border-brand-teal px-6 py-3.5 text-sm font-semibold text-brand-teal transition-all hover:bg-brand-teal/5 hover:scale-[1.02]"
            >
              Ver próximo curso
            </a>
          </div>
        </motion.div>

        {/* Visual side */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <MapVisual />
        </motion.div>
      </div>
    </section>
  )
}
