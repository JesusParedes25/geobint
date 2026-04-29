# GeoBInt — Sitio Web Corporativo

Sitio web corporativo de **GeoBInt** (Geo Business Intelligence), empresa de consultoría en Sistemas de Información Geográfica (SIG) e inteligencia geoespacial.

## Stack

- React 18 + Vite
- Tailwind CSS v4
- Framer Motion
- Lucide React

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

## Build para producción

```bash
npm run build
```

Los archivos estáticos se generan en `dist/`.

## Panel de Administración

Accede al panel de administración de cursos en:

```
https://geobint.com/#/admin
```

**Contraseña por defecto:** `geobint2024`

⚠️ **Cambia la contraseña** en `src/data/courses.js` antes de subir a producción.

Desde el panel puedes:
- Agregar nuevos cursos con imagen, precio, horario, duración y temario
- Editar cursos existentes
- Eliminar cursos

## Deploy en VPS Rocky Linux

Consulta el archivo `DEPLOY.md` para instrucciones detalladas de despliegue en tu VPS con:
- Configuración de DNS para geobint.com
- Instalación de Nginx
- Certificado SSL con Let's Encrypt
- Configuración de SELinux

## Contacto configurado

- **WhatsApp:** 55 3978 1961
- **Email:** jeparedes25@gmail.com
- **Facebook:** [GeobInt](https://web.facebook.com/people/GeobInt/100086411589673/)
