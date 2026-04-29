import { useState } from 'react'
import { Lock } from 'lucide-react'
import { verifyAdmin } from '../../data/courses.js'

export default function AdminLogin({ onLogin }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (verifyAdmin(password)) {
      localStorage.setItem('geobint_admin_token', 'authenticated')
      onLogin()
    } else {
      setError('Contraseña incorrecta')
      setPassword('')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink-100 px-4">
      <div className="w-full max-w-sm">
        <div className="rounded-2xl bg-white p-8 shadow-lg">
          <div className="flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-teal/10">
              <Lock size={28} className="text-brand-teal" />
            </div>
          </div>
          
          <h1 className="mt-6 text-center text-2xl font-bold text-ink-900">
            Panel de Administración
          </h1>
          <p className="mt-2 text-center text-sm text-ink-500">
            GeoBInt — Gestión de Cursos
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-ink-900">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-lg border border-ink-100 bg-ink-100 px-4 py-3 text-sm text-ink-900 outline-none transition-colors focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20"
                placeholder="Ingresa tu contraseña"
              />
            </div>

            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}

            <button
              type="submit"
              className="w-full rounded-lg bg-brand-teal px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-brand-teal-dark"
            >
              Ingresar
            </button>
          </form>

          <div className="mt-6 text-center">
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); window.location.hash = '' }}
              className="text-sm text-ink-500 hover:text-brand-teal"
            >
              ← Volver al sitio
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
