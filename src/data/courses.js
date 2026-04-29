// Courses data store - this will be managed via localStorage for now
// In production, you'd want to use a proper database

const STORAGE_KEY = 'geobint_courses'

// Default empty courses array
const defaultCourses = []

export function getCourses() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (e) {
    console.error('Error reading courses:', e)
  }
  return defaultCourses
}

export function saveCourses(courses) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(courses))
    return true
  } catch (e) {
    console.error('Error saving courses:', e)
    return false
  }
}

export function addCourse(course) {
  const courses = getCourses()
  const newCourse = {
    ...course,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  }
  courses.push(newCourse)
  saveCourses(courses)
  return newCourse
}

export function updateCourse(id, updates) {
  const courses = getCourses()
  const index = courses.findIndex(c => c.id === id)
  if (index !== -1) {
    courses[index] = { ...courses[index], ...updates, updatedAt: new Date().toISOString() }
    saveCourses(courses)
    return courses[index]
  }
  return null
}

export function deleteCourse(id) {
  const courses = getCourses()
  const filtered = courses.filter(c => c.id !== id)
  saveCourses(filtered)
  return true
}

// Admin credentials - in production use proper auth!
const ADMIN_PASSWORD = 'geobint2024' // Change this!

export function verifyAdmin(password) {
  return password === ADMIN_PASSWORD
}
