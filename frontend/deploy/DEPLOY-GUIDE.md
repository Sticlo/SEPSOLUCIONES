# Guía de Deploy — Angular en Hostinger
## URL final: `https://sepsolucioneselite.com/plomero-bogota/`

---

## 1. Build de producción

```bash
cd frontend
npx ng build --configuration production
```

Los archivos generados estarán en: `frontend/dist/frontend/browser/`

---

## 2. Subir archivos a Hostinger

### Usando el File Manager de hPanel:

1. Ir a **hPanel → Files → File Manager**
2. Navegar a `/public_html/`
3. Crear la carpeta `plomero-bogota` (si no existe)
4. Subir **TODO el contenido** de `dist/frontend/browser/` dentro de `/public_html/plomero-bogota/`

La estructura final en el servidor debe ser:
```
/public_html/
├── index.php              ← WordPress
├── wp-content/            ← WordPress
├── .htaccess              ← WordPress (modificado)
└── plomero-bogota/
    ├── .htaccess           ← Angular (nuevo)
    ├── index.html          ← Home Angular
    ├── index.csr.html      ← Fallback CSR
    ├── sitemap.xml
    ├── robots.txt
    ├── main-*.js
    ├── styles-*.css
    ├── chunk-*.js
    ├── favicon.ico
    ├── fonts/
    │   └── inter-latin.woff2
    ├── images/
    │   ├── Blog/
    │   ├── equipo/
    │   ├── hero/
    │   ├── og/
    │   └── servicios/
    ├── servicios/
    │   ├── index.html
    │   ├── deteccion-de-fugas/index.html
    │   ├── destape-de-tuberias/index.html
    │   └── ...
    ├── zonas/
    │   ├── index.html
    │   ├── usaquen/index.html
    │   └── ...
    ├── blog/
    ├── nosotros/
    ├── contacto/
    └── preguntas-frecuentes/
```

---

## 3. Configurar .htaccess

### A. .htaccess de Angular (`/public_html/plomero-bogota/.htaccess`)
- Copiar el archivo de `deploy/plomero-bogota/.htaccess`
- Subir a `/public_html/plomero-bogota/.htaccess`

### B. .htaccess de WordPress (`/public_html/.htaccess`)
- Abrir el archivo existente
- **ANTES** de las reglas de WordPress (`# BEGIN WordPress`), agregar:

```apache
# --- Angular sub-sitio: /plomero-bogota/ ---
RewriteEngine On
RewriteRule ^plomero-bogota(/|$) - [L]

RewriteCond %{REQUEST_URI} ^/(images|fonts)/
RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} !-f
RewriteRule ^(.*)$ /plomero-bogota/$1 [L]
```

> Las reglas de redirección de `/images/` y `/fonts/` permiten que los backgrounds CSS
> (que usan rutas absolutas como `/images/...`) se sirvan correctamente desde la subcarpeta.

---

## 4. Google Search Console

1. Ir a [Google Search Console](https://search.google.com/search-console/)
2. Agregar propiedad: `https://sepsolucioneselite.com/plomero-bogota/`
3. Verificar propiedad (meta tag ya incluido en index.html — reemplazar `YOUR_VERIFICATION_CODE`)
4. Enviar sitemap: `https://sepsolucioneselite.com/plomero-bogota/sitemap.xml`

---

## 5. Verificación post-deploy

Comprobar estas URLs en el navegador:

| URL | Esperado |
|-----|----------|
| `/plomero-bogota/` | Home |
| `/plomero-bogota/servicios` | Lista de servicios |
| `/plomero-bogota/servicios/deteccion-de-fugas` | Detalle servicio |
| `/plomero-bogota/zonas` | Lista de zonas |
| `/plomero-bogota/zonas/usaquen` | Detalle zona |
| `/plomero-bogota/blog` | Blog |
| `/plomero-bogota/contacto` | Contacto |
| `/plomero-bogota/nosotros` | Nosotros |

### Herramientas de validación:
- **PageSpeed Insights**: https://pagespeed.web.dev/
- **Rich Results Test** (JSON-LD): https://search.google.com/test/rich-results
- **Mobile-Friendly Test**: https://search.google.com/test/mobile-friendly

---

## 6. Actualizar el código de verificación de Google

En `frontend/src/index.html`, reemplazar:
```html
<meta name="google-site-verification" content="YOUR_VERIFICATION_CODE">
```
Con el código real de Google Search Console. Luego re-build y re-deploy.

---

## Notas importantes

- **Sin Node.js requerido**: El sitio es 100% estático (HTML prerenderizado), no requiere Node.js en el servidor.
- **WordPress no se ve afectado**: Las reglas de `.htaccess` excluyen `/plomero-bogota/` del manejo de WordPress.
- **Actualizaciones**: Para cada cambio, ejecutar `ng build --configuration production` y subir el contenido de `dist/frontend/browser/` reemplazando los archivos existentes.
