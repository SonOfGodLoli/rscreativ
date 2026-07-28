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

## Páginas (4 rutas)

| Página | Ruta | Descripción |
|---|---|---|
| Inicio | `#/` | Hero con fondo navy, sección About, servicios destacados, equipo, clientes, CTA |
| Servicios | `#/servicios` | Filtro por categorías (Todos, Impresión, Diseño, Celebraciones, Personalizados), grid de tarjetas |
| Portafolio | `#/portfolio` | Grid masonry con filtro, modal/lightbox para ver detalles de proyectos |
| Contacto | `#/contacto` | Formulario validado (Zod + React Hook Form), información de contacto, redes sociales |

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

## Backend (Pendiente)

El backend está creado pero requiere:
1. Instalar PostgreSQL
2. Configurar `DATABASE_URL` en `backend/.env`
3. Ejecutar `npx prisma migrate dev`
4. Ejecutar `npx prisma db seed`
5. Ejecutar `npm run dev` en backend

Las rutas del API son:
- `GET /api/services` - Servicios
- `GET /api/portfolio` - Portafolio
- `GET /api/team` - Equipo
- `GET /api/clients` - Clientes
- `POST /api/contact` - Enviar mensaje de contacto
- `GET /api/settings` - Configuración del sitio

---

## Errores Resueltos

1. **Colores incorrectos**: Primero usamos colores extraídos del Wix, luego el cliente dio los 3 colores oficiales de marca (#9a171c, #b24940, #eb9192). Se actualizó toda la paleta.

2. **Logo invisible en navbar**: Cuando el navbar pasaba a blanco (scroll), el logo era blanco y desaparecía. Solución: logo cambia a `text-dark` (#9a171c) cuando `isScrolled`.

3. **Error 404 en GitHub Pages**: `BrowserRouter` no funciona con GitHub Pages porque no maneja rutas SPA. Solución: cambiar a `HashRouter`.

4. **Token sin permisos `workflow`**: El primer token no tenía el scope `workflow` para subir archivos de GitHub Actions. Se pidió un nuevo token con permisos completos.

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

*Documento generado automáticamente durante el desarrollo del proyecto.*
