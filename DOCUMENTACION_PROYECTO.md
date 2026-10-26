# RS CREATIV - Documentación del Proyecto

## Resumen
Página web oficial de RS Creativ (empresa de diseño e impresión en Perú).
Stack: React + TypeScript + Vite + Tailwind CSS + Framer Motion
Deploy: GitHub Pages automático via GitHub Actions

---

## Colores de Marca Oficiales

| Color | HEX | Uso |
|---|---|---|
| Rojo profundo | `#9a171c` | Footer, secciones oscuras |
| Rojo medio | `#b24940` | Hover, gradientes secundarios |
| Rosa claro | `#eb9192` | Botones, highlights, acentos |
| Navy oscuro | `#040a33` | Hero section, texto principal |
| Blanco | `#ffffff` | Fondo principal |
| Negro | `#000000` | Texto primario |
| Gris | `#404040` | Texto secundario |

Referencia: Imagen "Colores Principales de Marca" del cliente.

---

## Estructura del Proyecto

```
D:\RS CREATIV\RSCREATIV.COM\
├── frontend/                    # Frontend React
│   ├── src/
│   │   ├── App.tsx             # Router principal (HashRouter)
│   │   ├── main.tsx            # Entry point
│   │   ├── index.css           # Tailwind + paleta de colores
│   │   ├── animations/
│   │   │   └── variants.ts     # Animaciones Framer Motion
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.tsx   # Navegación (gradiente → blanco en scroll)
│   │   │   │   └── Footer.tsx   # Pie de página (rojo profundo)
│   │   │   └── ui/
│   │   │       ├── Button.tsx   # 3 variantes: primary, secondary, dark
│   │   │       ├── Card.tsx     # Tarjeta con hover shadow rosa
│   │   │       ├── SectionTitle.tsx
│   │   │       ├── LoadingSpinner.tsx
│   │   │       └── PageTransition.tsx
│   │   ├── hooks/
│   │   │   └── useApi.ts       # Hook para llamadas API
│   │   ├── pages/
│   │   │   ├── Home.tsx        # Hero navy + about + servicios + equipo + clientes + CTA
│   │   │   ├── Services.tsx    # Filtro categorías + grid servicios + CTA
│   │   │   ├── Portfolio.tsx   # Grid masonry + modal/lightbox + CTA
│   │   │   └── Contact.tsx     # Formulario React Hook Form + info contacto
│   │   ├── services/
│   │   │   └── api.ts          # Cliente Axios + interfaces TypeScript
│   │   └── assets/
│   │       └── hero.png
│   ├── public/
│   │   └── impresion/             # Imágenes de servicios de impresión
│   │       ├── impresion banner.png
│   │       ├── impresion volantes.png
│   │       ├── impresion tarjetas.png
│   │       ├── impresion stickers.png
│   │       ├── impresion vinil.png
│   │       └── impresion vinil sobre foam.png
│   ├── .github/workflows/
│   │   └── deploy.yml          # GitHub Actions → GitHub Pages
│   ├── index.html
│   ├── vite.config.ts          # base: '/rscreativ/', proxy API
│   ├── tsconfig.app.json
│   ├── package.json
│   └── LINK_PAGINA.txt         # Link de la página publicada
│
└── backend/                     # Backend Express (pendiente de DB)
    ├── src/
    │   ├── index.ts            # Servidor Express
    │   └── routes/
    │       ├── services.ts
    │       ├── portfolio.ts
    │       ├── team.ts
    │       ├── clients.ts
    │       ├── contact.ts
    │       └── settings.ts
    ├── prisma/
    │   ├── schema.prisma       # 6 tablas: Service, Portfolio, Team, Client, ContactMessage, SiteSetting
    │   └── seed.ts
    ├── .env                    # DATABASE_URL (pendiente configurar)
    ├── package.json
    └── tsconfig.json
```

---

## Páginas (5 rutas)

| Página | Ruta | Descripción |
|---|---|---|
| Inicio | `#/` | Hero con fondo navy, sección About, servicios destacados, equipo, clientes, CTA |
| Servicios | `#/servicios` | Filtro por categorías (Todos, Impresión, Diseño, Celebraciones, Personalizados), grid de tarjetas con imágenes y lightbox |
| Portafolio | `#/portfolio` | Grid masonry con filtro, modal/lightbox para ver detalles de proyectos |
| Contacto | `#/contacto` | Formulario validado (Zod + React Hook Form), información de contacto, redes sociales |
| Términos | `#/terminos-y-condiciones` | Términos y condiciones |
| Panel | `#/admin` | Dashboard del equipo (login en `#/admin/login`) |
| Página CMS | `#/p/:slug` | Páginas creadas desde el panel |

---

## Imágenes de Servicios (Impresión)

Cada sub-servicio de la categoría "Impresión" tiene una imagen representativa con las siguientes características:
- **Ubicación**: `frontend/public/impresion/`
- **Formato**: PNG
- **Visualización**: Imagen completa sin recorte, con `shadow-md`
- **Interacción**: Lightbox al hacer clic (imagen ampliada con fondo oscuro)

| Servicio | Archivo |
|----------|---------|
| Impresión de Banner | `impresion banner.png` |
| Impresión de Volante | `impresion volantes.png` |
| Impresión de Tarjetas | `impresion tarjetas.png` |
| Impresión de Stickers | `impresion stickers.png` |
| Impresión en Vinil | `impresion vinil.png` |
| Vinil sobre Foam | `impresion vinil sobre foam.png` |

### Colores de Iconos de Categoría

Los iconos de las categorías de servicios usan los colores oficiales de marca:

| Categoría | Color |
|-----------|-------|
| Impresión | `#9a171c` (rojo profundo) |
| Diseño | `#b24940` (rojo medio) |
| Celebraciones | `#eb9192` (rosa claro) |
| Personalizados | Degradado `#9a171c` → `#b24940` |

---

## Dependencias Frontend

- **React 19** + TypeScript
- **Vite 8** (bundler)
- **Tailwind CSS v4** (estilos con @theme)
- **Framer Motion** (animaciones)
- **React Router DOM** (HashRouter para GitHub Pages)
- **Lucide React** (iconos)
- **React Hook Form** + **Zod** (formulario de contacto)
- **Axios** (cliente API)

---

## Navbar - Comportamiento

- **Top de página**: Gradiente `from-mid to-dark` (#b24940 → #9a171c), texto blanco, logo blanco
- **Al hacer scroll (>50px)**: Fondo blanco, sombra, texto negro, logo rojo profundo (#9a171c)
- **Mobile**: Menú hamburguesa con animación

---

## GitHub Pages - Deploy

- **URL**: https://sonofgodloli.github.io/rscreativ/
- **Repositorio**: https://github.com/SonOfGodLoli/rscreativ
- **Flujo**: Push a `main` → GitHub Actions build → Deploy automático
- **Importante**: Usa HashRouter (`#`) porque GitHub Pages no soporta rutas SPA directas

---

## Backend y despliegue

El backend usa **Prisma ORM 7** (ESM, driver adapter `@prisma/adapter-pg`) y requiere Node >= 20.19.
Repositorio privado: https://github.com/SonOfGodLoli/rscreativ-api

### Desarrollo local

1. Instalar PostgreSQL
2. Copiar `backend/.env.example` a `backend/.env` y configurar `DATABASE_URL`, `JWT_SECRET`
3. Ejecutar `npm install`
4. Ejecutar `npx prisma db push` (o `npx prisma migrate dev` si usas migraciones)
5. Ejecutar `npm run prisma:seed`
6. Ejecutar `npm run dev` en backend

La URL de la base de datos se configura en `backend/prisma.config.ts` y el cliente se genera en `backend/src/generated/prisma` (ignorado por Git).

### Producción (Render)

- `backend/render.yaml` define el servicio web `rscreativ-api` y la base `rscreativ-db`.
- Al crear el Blueprint en Render se piden `ADMIN_PASSWORD`; `JWT_SECRET` se genera solo.
- `startCommand` ejecuta `prisma db push` + seed idempotente antes de iniciar.
- URL esperada del API: `https://rscreativ-api.onrender.com`
- El frontend recibe `VITE_API_URL` como variable del repositorio en GitHub Actions.
- La base gratuita de Render caduca a los 30 días; para producción conviene un Postgres gestionado (Neon, Supabase) cambiando `DATABASE_URL`.

Variables de entorno del backend:

| Variable | Descripción |
|---|---|
| `PORT` | Puerto del servidor (por defecto 3001) |
| `NODE_ENV` | `development` o `production` |
| `DATABASE_URL` | Cadena de conexión de PostgreSQL |
| `CORS_ORIGINS` | Orígenes permitidos, separados por coma |
| `TRUST_PROXY` | `true` solo si hay nginx/Cloudflare/Render delante |
| `JWT_SECRET` | Secreto para firmar tokens del panel (mín. 32 caracteres) |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Administrador inicial creado por el seed |
| `MEDIA_BASE_URL` | URL pública para imágenes (opcional) |

Las rutas del API son:
- `GET /api/services` - Servicios con sus subsecciones
- `GET /api/portfolio` - Portafolio
- `GET /api/team` - Equipo
- `GET /api/clients` - Clientes
- `POST /api/contact` - Enviar mensaje de contacto (validado y con rate limit)
- `GET /api/contact` - Listar mensajes (requiere sesión de administrador)
- `GET /api/settings` - Configuración del sitio
- `GET /api/pages` / `GET /api/pages/:slug` - Páginas y secciones publicadas
- `GET /api/media/:id` - Imágenes subidas
- `POST /api/auth/login` - Inicio de sesión del panel
- `/api/admin/*` - CRUD protegido por JWT (páginas, secciones, servicios, subsecciones, portafolio, equipo, clientes, mensajes, imágenes, configuración, usuarios)

---

## Panel de administración (CMS)

Disponible en `#/admin` (login: `#/admin/login`).

- **Roles**: `ADMIN` (todo, incluida gestión de usuarios) y `EDITOR` (contenido).
- **Páginas**: crear páginas, publicarlas/ocultarlas y agregar secciones ordenables.
- **Secciones**: tipos `hero`, `text`, `gallery`, `cards`, `cta`; con imagen principal, galería, botón, tarjetas y visibilidad.
- **Servicios y productos**: CRUD de servicios y subsecciones (productos) con imagen, descripción y precio.
- **Portafolio, equipo, clientes y configuración**: CRUD completo.
- **Imágenes**: subida con compresión a WebP (Sharp) guardada en PostgreSQL y servida en `/api/media/:id`.
- **Mensajes**: bandeja con marcar leído/responder/eliminar.
- **Mi cuenta**: cambio de contraseña.

Las secciones creadas para `home`, `servicios`, `portfolio`, `contacto` y `terminos-y-condiciones` se renderizan al final de esas páginas públicas. Las páginas nuevas se ven en `#/p/:slug`.

---

## Seguridad

Medidas implementadas:

- **Secretos fuera del repositorio**: `backend/.env` está en `.gitignore` y se provee `.env.example`. Nunca versionar tokens ni claves.
- **Tokens de GitHub**: usar `gh auth login` o el Credential Manager. No incluir PATs en la URL del remoto ni tokens con permisos amplios.
- **Autenticación del panel**: contraseñas con `scrypt` y tokens JWT HS256 firmados con `JWT_SECRET` (expiran en 12 h).
- **Autorización por roles**: middleware `requireAuth` y `requireRole('ADMIN')` en rutas administrativas.
- **Cabeceras HTTP**: `helmet` y `x-powered-by` deshabilitado.
- **CORS**: lista de orígenes configurable con `CORS_ORIGINS`.
- **Límites**: body JSON de 256 KB, 300 peticiones/15 min por IP, 5 mensajes/15 min y 10 intentos de login/15 min.
- **Validación**: Zod valida payloads, categorías, slugs e IDs UUID.
- **Subidas**: solo imágenes JPG/PNG/WEBP/GIF/AVIF, máximo 8 MB, nombres y contenido procesados con Sharp.
- **Privacidad**: los mensajes solo se listan con sesión de administrador; los logs del frontend no incluyen datos personales.
- **Prisma**: v7.10.1 con driver adapter y cliente generado fuera de `node_modules`; una sola instancia por proceso.
- **CI de seguridad**: Dependabot y CodeQL en ambos repositorios.
- **0 vulnerabilidades** reportadas por `npm audit` en frontend y backend.

Pendiente recomendado:
- Revocar cualquier token de GitHub que haya estado expuesto y rotarlo.
- Añadir CAPTCHA/honeypot al formulario.
- Usar un Postgres gestionado con copias de seguridad y migraciones versionadas (`prisma migrate deploy`).
- Servir el sitio con cabeceras de seguridad (Cloudflare o hosting propio).

---

## Errores Resueltos

1. **Colores incorrectos**: Primero usamos colores extraídos del Wix, luego el cliente dio los 3 colores oficiales de marca (#9a171c, #b24940, #eb9192). Se actualizó toda la paleta.

2. **Logo invisible en navbar**: Cuando el navbar pasaba a blanco (scroll), el logo era blanco y desaparecía. Solución: logo cambia a `text-dark` (#9a171c) cuando `isScrolled`.

3. **Error 404 en GitHub Pages**: `BrowserRouter` no funciona con GitHub Pages porque no maneja rutas SPA. Solución: cambiar a `HashRouter`.

4. **Token sin permisos `workflow`**: El primer token no tenía el scope `workflow` para subir archivos de GitHub Actions. Se reemplazó usando autenticación de GitHub CLI; no se deben guardar PATs en el repositorio ni en la URL del remoto.

---

## Comandos Útiles

```bash
# Desarrollo frontend
cd "D:\RS CREATIV\RSCREATIV.COM\frontend"
npm run dev

# Build producción
npm run build

# Push a GitHub
git add -A
git commit -m "mensaje"
git push

# Ver estado del deploy
gh run list --repo SonOfGodLoli/rscreativ --limit 5
```

---

## Changelog

### 25/10/2026
- Backend: añadidos `helmet`, rate limiting y límites de tamaño de payload
- Backend: CORS configurable por `CORS_ORIGINS` y `TRUST_PROXY`
- Backend: validación con Zod de contacto, categorías e IDs UUID
- Backend: `GET /api/contact` protegido con sesión de administrador
- Backend: cliente Prisma singleton y manejo de errores sin filtrar detalles internos
- Backend: `.gitignore` y `.env.example` añadidos
- Frontend: formulario de contacto conectado al API y sin logs de datos personales
- Dependencias: eliminado `to-ico`, actualizados paquetes vulnerables y `zod` a v4
- Backend: migrado a Prisma ORM 7.10.1 (ESM, `prisma.config.ts`, `@prisma/adapter-pg`), 0 vulnerabilidades
- Seguridad: PAT eliminado de la URL del remoto de Git (requiere revocación manual)
- Backend: desplegado en Render (`render.yaml`, seed idempotente, `VITE_API_URL`)
- CMS: modelos `User`, `Page`, `Section`, `ServiceSubsection` y `Media`
- CMS: login JWT + scrypt, roles ADMIN/EDITOR y CRUD administrativo
- CMS: biblioteca de imágenes con subida, compresión WebP y servido en `/api/media/:id`
- Frontend: panel `#/admin` con páginas, secciones, productos/subsecciones, portafolio, equipo, clientes, mensajes, imágenes, configuración y usuarios
- Frontend: secciones CMS renderizadas en las páginas públicas y páginas nuevas en `#/p/:slug`
- Servicios: subsecciones administrables desde el panel con imagen y precio
- CI: Dependabot y CodeQL añadidos a ambos repositorios

### 06/09/2026
- Agregadas 6 imágenes de servicios de impresión en `public/impresion/`
- Implementado lightbox para ver imágenes ampliadas al hacer clic
- Aplicados colores oficiales de marca a los iconos de categorías de servicios
- Eliminados colores genéricos (azul, púrpura, rosa, ámbar) de categorías
- Cada imagen tiene `shadow-md` para delimitar bordes

---

*Documento generado automáticamente durante el desarrollo del proyecto.*
