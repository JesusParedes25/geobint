import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, LogOut, X, Save, Image } from 'lucide-react'
import { getCourses, addCourse, updateCourse, deleteCourse } from '../../data/courses.js'

const emptyCourse = {
  title: '',
  description: '',
  price: '',
  date: '',
  schedule: '',
  duration: '',
  modality: 'En línea',
  certificate: true,
  syllabus: '',
  image: '',
  image2: '',
}

export default function AdminDashboard({ onLogout }) {
  const [courses, setCourses] = useState([])
  const [editing, setEditing] = useState(null) // null = list view, 'new' = new course, or course id
  const [form, setForm] = useState(emptyCourse)

  useEffect(() => {
    loadCourses()
  }, [])

  const loadCourses = () => {
    setCourses(getCourses())
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleImageUpload = async (e, field) => {
    const file = e.target.files[0]
    if (!file) return

    // Convert to base64 for localStorage storage
    // In production, you'd upload to a server/CDN
    const reader = new FileReader()
    reader.onloadend = () => {
      setForm(prev => ({ ...prev, [field]: reader.result }))
    }
    reader.readAsDataURL(file)
  }

  const handleSave = () => {
    if (!form.title.trim()) {
      alert('El título es requerido')
      return
    }

    if (editing === 'new') {
      addCourse(form)
    } else {
      updateCourse(editing, form)
    }

    loadCourses()
    setEditing(null)
    setForm(emptyCourse)
    
    // Dispatch event to notify public site
    window.dispatchEvent(new Event('coursesUpdated'))
  }

  const handleEdit = (course) => {
    setForm(course)
    setEditing(course.id)
  }

  const handleDelete = (id) => {
    if (confirm('¿Estás seguro de eliminar este curso?')) {
      deleteCourse(id)
      loadCourses()
      window.dispatchEvent(new Event('coursesUpdated'))
    }
  }

  const handleCancel = () => {
    setEditing(null)
    setForm(emptyCourse)
  }

  // Course form view
  if (editing !== null) {
    return (
      <div className="min-h-screen bg-ink-100">
        <header className="bg-white shadow-sm">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
            <h1 className="text-lg font-bold text-ink-900">
              {editing === 'new' ? 'Nuevo Curso' : 'Editar Curso'}
            </h1>
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-ink-500 hover:bg-ink-100"
            >
              <X size={18} />
              Cancelar
            </button>
          </div>
        </header>

        <main className="mx-auto max-w-3xl px-4 py-8">
          <div className="rounded-xl bg-white p-6 shadow-sm sm:p-8">
            <div className="space-y-6">
              {/* Title */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink-900">
                  Título del curso *
                </label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-ink-100 bg-ink-100 px-4 py-2.5 text-sm text-ink-900 outline-none focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20"
                  placeholder="Ej: Introducción a QGIS"
                />
              </div>

              {/* Description */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink-900">
                  Descripción
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full rounded-lg border border-ink-100 bg-ink-100 px-4 py-2.5 text-sm text-ink-900 outline-none focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20 resize-none"
                  placeholder="Descripción breve del curso"
                />
              </div>

              {/* Price & Date */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-ink-900">
                    Precio
                  </label>
                  <input
                    type="text"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-ink-100 bg-ink-100 px-4 py-2.5 text-sm text-ink-900 outline-none focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20"
                    placeholder="Ej: $2,500 MXN"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-ink-900">
                    Fecha de inicio
                  </label>
                  <input
                    type="text"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-ink-100 bg-ink-100 px-4 py-2.5 text-sm text-ink-900 outline-none focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20"
                    placeholder="Ej: 15 de Mayo, 2026"
                  />
                </div>
              </div>

              {/* Schedule & Duration */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-ink-900">
                    Horario
                  </label>
                  <input
                    type="text"
                    name="schedule"
                    value={form.schedule}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-ink-100 bg-ink-100 px-4 py-2.5 text-sm text-ink-900 outline-none focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20"
                    placeholder="Ej: Lunes y Miércoles 18:00-20:00"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-ink-900">
                    Duración
                  </label>
                  <input
                    type="text"
                    name="duration"
                    value={form.duration}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-ink-100 bg-ink-100 px-4 py-2.5 text-sm text-ink-900 outline-none focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20"
                    placeholder="Ej: 4 semanas (16 horas)"
                  />
                </div>
              </div>

              {/* Modality & Certificate */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-ink-900">
                    Modalidad
                  </label>
                  <select
                    name="modality"
                    value={form.modality}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-ink-100 bg-ink-100 px-4 py-2.5 text-sm text-ink-900 outline-none focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20"
                  >
                    <option value="En línea">En línea</option>
                    <option value="Presencial">Presencial</option>
                    <option value="Híbrido">Híbrido</option>
                  </select>
                </div>
                <div className="flex items-center">
                  <label className="flex cursor-pointer items-center gap-3">
                    <input
                      type="checkbox"
                      name="certificate"
                      checked={form.certificate}
                      onChange={handleChange}
                      className="h-5 w-5 rounded border-ink-100 text-brand-teal focus:ring-brand-teal/20"
                    />
                    <span className="text-sm font-medium text-ink-900">Incluye certificado</span>
                  </label>
                </div>
              </div>

              {/* Syllabus */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink-900">
                  Temario
                </label>
                <textarea
                  name="syllabus"
                  value={form.syllabus}
                  onChange={handleChange}
                  rows={6}
                  className="w-full rounded-lg border border-ink-100 bg-ink-100 px-4 py-2.5 text-sm text-ink-900 outline-none focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20 resize-none"
                  placeholder="1. Introducción a los SIG&#10;2. Manejo de datos vectoriales&#10;3. Análisis espacial básico&#10;..."
                />
              </div>

              {/* Image 1 */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink-900">
                  Imagen principal
                </label>
                <div className="flex items-center gap-4">
                  <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-ink-500/30 px-4 py-3 text-sm text-ink-500 hover:border-brand-teal hover:text-brand-teal">
                    <Image size={18} />
                    Subir imagen
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'image')}
                      className="hidden"
                    />
                  </label>
                  {form.image && (
                    <div className="relative">
                      <img src={form.image} alt="Preview" className="h-16 w-24 rounded object-cover" />
                      <button
                        type="button"
                        onClick={() => setForm(prev => ({ ...prev, image: '' }))}
                        className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Image 2 */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink-900">
                  Imagen secundaria (opcional)
                </label>
                <div className="flex items-center gap-4">
                  <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-ink-500/30 px-4 py-3 text-sm text-ink-500 hover:border-brand-teal hover:text-brand-teal">
                    <Image size={18} />
                    Subir imagen
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'image2')}
                      className="hidden"
                    />
                  </label>
                  {form.image2 && (
                    <div className="relative">
                      <img src={form.image2} alt="Preview" className="h-16 w-24 rounded object-cover" />
                      <button
                        type="button"
                        onClick={() => setForm(prev => ({ ...prev, image2: '' }))}
                        className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Save button */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="rounded-lg px-6 py-2.5 text-sm font-medium text-ink-500 hover:bg-ink-100"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="flex items-center gap-2 rounded-lg bg-brand-teal px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-teal-dark"
                >
                  <Save size={18} />
                  Guardar curso
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  // Course list view
  return (
    <div className="min-h-screen bg-ink-100">
      <header className="bg-white shadow-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <div>
            <h1 className="text-lg font-bold text-ink-900">Panel de Administración</h1>
            <p className="text-sm text-ink-500">GeoBInt — Gestión de Cursos</p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); window.location.hash = '' }}
              className="text-sm text-ink-500 hover:text-brand-teal"
            >
              Ver sitio
            </a>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-ink-500 hover:bg-ink-100"
            >
              <LogOut size={18} />
              Salir
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-ink-900">Cursos ({courses.length})</h2>
          <button
            onClick={() => setEditing('new')}
            className="flex items-center gap-2 rounded-lg bg-brand-teal px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-teal-dark"
          >
            <Plus size={18} />
            Nuevo curso
          </button>
        </div>

        {courses.length === 0 ? (
          <div className="rounded-xl bg-white p-12 text-center shadow-sm">
            <p className="text-ink-500">No hay cursos registrados.</p>
            <button
              onClick={() => setEditing('new')}
              className="mt-4 text-sm font-medium text-brand-teal hover:text-brand-teal-dark"
            >
              Crear el primer curso →
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {courses.map((course) => (
              <div
                key={course.id}
                className="flex items-center gap-4 rounded-xl bg-white p-4 shadow-sm"
              >
                {course.image ? (
                  <img
                    src={course.image}
                    alt={course.title}
                    className="h-20 w-28 rounded-lg object-cover"
                  />
                ) : (
                  <div className="flex h-20 w-28 items-center justify-center rounded-lg bg-ink-100">
                    <Image size={24} className="text-ink-500" />
                  </div>
                )}
                
                <div className="flex-1">
                  <h3 className="font-bold text-ink-900">{course.title}</h3>
                  <p className="mt-1 text-sm text-ink-500">
                    {course.price && <span className="mr-3">{course.price}</span>}
                    {course.date && <span>{course.date}</span>}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(course)}
                    className="rounded-lg p-2 text-ink-500 hover:bg-ink-100 hover:text-brand-teal"
                    title="Editar"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(course.id)}
                    className="rounded-lg p-2 text-ink-500 hover:bg-red-50 hover:text-red-500"
                    title="Eliminar"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
