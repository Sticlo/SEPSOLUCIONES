# Imágenes — SEP Soluciones

Todas las imágenes del sitio van aquí. Se sirven desde la raíz en producción.

## Estructura

```
public/images/
│
├── hero/                  # Imágenes del hero de la landing page
│   ├── hero-tecnico.webp  # Foto del técnico trabajando (lado derecho del hero)
│   └── hero-bg.webp       # Fondo opcional o textura
│
├── servicios/             # Una imagen representativa por servicio
│   ├── deteccion-de-fugas.webp
│   ├── destape-de-tuberias.webp
│   ├── inspeccion-de-tuberias.webp
│   └── mantenimiento-para-empresas.webp
│
├── equipo/                # Fotos del equipo / técnicos
│   └── equipo-sep.webp
│
└── og/                    # Open Graph / compartir en redes
    └── sep-soluciones-og.jpg   (1200×630 px)
```

## Convenciones

- Formato preferido: **WebP** (mejor compresión, soporte moderno). JPG como fallback para OG.
- Tamaño máximo: **200 KB** por imagen.
- Nombrar en **kebab-case**, sin espacios ni caracteres especiales.
- Las imágenes se referencian en el código como `/images/hero/hero-tecnico.webp`.
