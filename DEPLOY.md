# Despliegue en VPS Rocky Linux — geobint.com

## Requisitos previos

- VPS con Rocky Linux 8/9
- Acceso root o sudo
- Dominio `geobint.com` apuntando a la IP de tu VPS

---

## 1. Configurar DNS

En tu proveedor de dominio (donde compraste geobint.com), configura los registros DNS:

```
Tipo    Nombre    Valor                TTL
A       @         [IP_DE_TU_VPS]       3600
A       www       [IP_DE_TU_VPS]       3600
```

**Ejemplo:** Si tu VPS tiene IP `123.45.67.89`:
- `A` → `@` → `123.45.67.89`
- `A` → `www` → `123.45.67.89`

Los cambios de DNS pueden tardar hasta 24-48 horas en propagarse, aunque usualmente es más rápido (minutos a pocas horas).

---

## 2. Preparar el servidor

Conéctate a tu VPS por SSH:

```bash
ssh root@[IP_DE_TU_VPS]
```

### Actualizar el sistema

```bash
dnf update -y
```

### Instalar Nginx

```bash
dnf install nginx -y
systemctl enable nginx
systemctl start nginx
```

### Instalar Certbot (SSL gratuito con Let's Encrypt)

```bash
dnf install epel-release -y
dnf install certbot python3-certbot-nginx -y
```

### Abrir puertos en el firewall

```bash
firewall-cmd --permanent --add-service=http
firewall-cmd --permanent --add-service=https
firewall-cmd --reload
```

---

## 3. Subir los archivos del sitio

### Opción A: Desde tu máquina local (recomendado)

Primero, genera el build de producción en tu máquina:

```bash
npm run build
```

Esto crea la carpeta `dist/` con los archivos estáticos.

Sube la carpeta `dist/` a tu servidor:

```bash
scp -r dist/* root@[IP_DE_TU_VPS]:/var/www/geobint.com/
```

### Opción B: Clonar y compilar en el servidor

Si prefieres compilar en el servidor:

```bash
# Instalar Node.js
dnf module install nodejs:18 -y

# Crear directorio
mkdir -p /var/www/geobint.com

# Clonar tu repositorio (si lo tienes en Git)
cd /tmp
git clone [TU_REPO_URL] geobint-web
cd geobint-web

# Instalar dependencias y compilar
npm install
npm run build

# Copiar archivos
cp -r dist/* /var/www/geobint.com/
```

---

## 4. Configurar Nginx

Crea el archivo de configuración:

```bash
nano /etc/nginx/conf.d/geobint.com.conf
```

Pega este contenido:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name geobint.com www.geobint.com;
    root /var/www/geobint.com;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/json application/xml image/svg+xml;

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # SPA routing - redirect all requests to index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

Guarda el archivo (Ctrl+O, Enter, Ctrl+X).

### Verificar configuración y reiniciar Nginx

```bash
nginx -t
systemctl restart nginx
```

---

## 5. Configurar SSL (HTTPS)

Ejecuta Certbot para obtener certificado SSL gratuito:

```bash
certbot --nginx -d geobint.com -d www.geobint.com
```

Sigue las instrucciones:
1. Ingresa tu email
2. Acepta los términos
3. Elige si quieres redirigir HTTP a HTTPS (recomendado: sí)

Certbot modificará automáticamente tu configuración de Nginx para usar HTTPS.

### Renovación automática

Certbot configura renovación automática. Puedes verificarlo:

```bash
certbot renew --dry-run
```

---

## 6. Permisos y SELinux

```bash
# Establecer permisos correctos
chown -R nginx:nginx /var/www/geobint.com
chmod -R 755 /var/www/geobint.com

# Si SELinux está activo (Rocky Linux lo tiene por defecto)
semanage fcontext -a -t httpd_sys_content_t "/var/www/geobint.com(/.*)?"
restorecon -Rv /var/www/geobint.com
```

---

## 7. Verificar

1. Abre `https://geobint.com` en tu navegador
2. Verifica que el candado SSL aparezca
3. Prueba la navegación entre secciones
4. Prueba el panel de admin: `https://geobint.com/#/admin`

---

## Actualizar el sitio

Cuando hagas cambios:

```bash
# En tu máquina local
npm run build

# Subir nuevos archivos
scp -r dist/* root@[IP_DE_TU_VPS]:/var/www/geobint.com/
```

---

## Panel de Administración

- **URL:** `https://geobint.com/#/admin`
- **Contraseña por defecto:** `geobint2024`

⚠️ **IMPORTANTE:** Cambia la contraseña en `src/data/courses.js` antes de subir a producción:

```javascript
const ADMIN_PASSWORD = 'tu_nueva_contraseña_segura'
```

Luego recompila y sube de nuevo.

---

## Notas sobre el almacenamiento de cursos

Actualmente los cursos se guardan en `localStorage` del navegador. Esto significa:
- Los cursos que agregues solo se ven en TU navegador
- Si limpias el caché, se pierden

Para una solución más robusta en el futuro, considera:
1. Usar un archivo JSON en el servidor que se lea/escriba
2. Implementar un backend simple con Node.js + SQLite
3. Usar un servicio como Firebase o Supabase

Por ahora, para agregar cursos que todos vean, puedes editar directamente el archivo `src/data/courses.js` y agregar cursos hardcodeados, luego recompilar.

---

## Troubleshooting

### El sitio no carga
```bash
# Verificar Nginx
systemctl status nginx
nginx -t

# Ver logs
tail -f /var/log/nginx/error.log
```

### Error de permisos
```bash
# Verificar SELinux
getenforce
# Si dice "Enforcing", asegúrate de haber ejecutado los comandos de semanage
```

### DNS no resuelve
```bash
# Verificar propagación DNS
dig geobint.com
nslookup geobint.com
```

### Certificado SSL no funciona
```bash
# Renovar manualmente
certbot renew --force-renewal
systemctl restart nginx
```
