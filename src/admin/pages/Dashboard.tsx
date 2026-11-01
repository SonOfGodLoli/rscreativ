import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ExternalLink,
  FileText,
  Image as ImageIcon,
  Images,
  Layers,
  MessageSquare,
  Package,
  Settings,
  Sparkles,
  Star,
  Upload,
  Users,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useAuth } from '../AuthContext';
import { useAsyncData } from '../useAsyncData';
import {
  listClients,
  listMedia,
  listMessages,
  listPages,
  listPortfolio,
  listServices,
  listTeam,
  listUsers,
  mediaUrl,
} from '../api';
import type { AdminUser } from '../api';
import { Badge, Button, EmptyState, Panel } from '../components/ui';

interface StatCardProps {
  label: string;
  value: number | string;
  hint: string;
  icon: LucideIcon;
  to: string;
}

function StatCard({ label, value, hint, icon: Icon, to }: StatCardProps) {
  return (
    <Link to={to} className="group min-w-0">
      <Panel className="h-full transition duration-200 group-hover:-translate-y-0.5 group-hover:border-[#9a171c]/20 group-hover:shadow-md">
        <div className="flex items-start justify-between gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#9a171c]/[0.08] text-[#9a171c] transition group-hover:bg-[#9a171c] group-hover:text-white">
            <Icon className="h-6 w-6" />
          </span>
          <ArrowRight className="mt-1.5 h-4 w-4 shrink-0 text-gray-300 transition group-hover:translate-x-0.5 group-hover:text-[#9a171c]" />
        </div>
        <p className="mt-5 text-4xl font-bold tracking-tight text-gray-900">{value}</p>
        <p className="mt-2 text-base font-medium text-gray-700">{label}</p>
        <p className="mt-1 truncate text-sm text-gray-400">{hint}</p>
      </Panel>
    </Link>
  );
}

export default function Dashboard() {
  const { user } = useAuth();
  const pages = useAsyncData(listPages);
  const services = useAsyncData(listServices);
  const messages = useAsyncData(listMessages);
  const media = useAsyncData(listMedia);
  const portfolio = useAsyncData(listPortfolio);
  const team = useAsyncData(listTeam);
  const clients = useAsyncData(listClients);
  const users = useAsyncData<AdminUser[]>(() =>
    user?.role === 'ADMIN' ? listUsers() : Promise.resolve({ data: [] as AdminUser[] })
  );

  const unread = (messages.data ?? []).filter((message) => !message.read).length;
  const publishedPages = (pages.data ?? []).filter((page) => page.published).length;
  const totalSections = (pages.data ?? []).reduce((total, page) => total + (page._count?.sections ?? 0), 0);
  const products = (services.data ?? []).reduce((total, service) => total + (service.subsections?.length ?? 0), 0);
  const featuredProjects = (portfolio.data ?? []).filter((item) => item.featured).length;
  const activeUsers = (users.data ?? []).filter((account) => account.active).length;

  const firstName = user?.name?.split(' ')[0] ?? 'equipo';
  const today = new Date().toLocaleDateString('es-PE', { weekday: 'long', day: 'numeric', month: 'long' });

  const stats: StatCardProps[] = [
    { label: 'Páginas', value: pages.data?.length ?? 0, hint: `${publishedPages} publicadas`, icon: FileText, to: '/admin/paginas' },
    { label: 'Servicios', value: services.data?.length ?? 0, hint: `${products} productos`, icon: Package, to: '/admin/servicios' },
    { label: 'Portafolio', value: portfolio.data?.length ?? 0, hint: `${featuredProjects} destacados`, icon: Images, to: '/admin/portafolio' },
    { label: 'Imágenes', value: media.data?.length ?? 0, hint: 'Biblioteca multimedia', icon: ImageIcon, to: '/admin/imagenes' },
    { label: 'Mensajes', value: unread, hint: unread > 0 ? 'Sin leer' : 'Todo al día', icon: MessageSquare, to: '/admin/mensajes' },
    { label: 'Equipo', value: team.data?.length ?? 0, hint: `${clients.data?.length ?? 0} clientes`, icon: Users, to: '/admin/equipo' },
  ];

  const quickActions = [
    { to: '/admin/paginas', label: 'Crear una página', description: 'Añade páginas y secciones nuevas.', icon: FileText },
    { to: '/admin/servicios', label: 'Publicar un servicio', description: 'Gestiona productos y precios.', icon: Package },
    { to: '/admin/portafolio', label: 'Subir un trabajo', description: 'Muestra tus últimos proyectos.', icon: Images },
    { to: '/admin/imagenes', label: 'Abrir biblioteca', description: 'Sube y reutiliza imágenes.', icon: Upload },
    { to: '/admin/mensajes', label: 'Revisar mensajes', description: 'Responde a tus clientes.', icon: MessageSquare },
    { to: '/admin/configuracion', label: 'Datos del sitio', description: 'Contacto, horarios y redes.', icon: Settings },
  ];

  const statusRows = [
    { label: 'Páginas publicadas', value: `${publishedPages} / ${pages.data?.length ?? 0}`, icon: CheckCircle2 },
    { label: 'Secciones creadas', value: totalSections, icon: Layers },
    { label: 'Proyectos destacados', value: featuredProjects, icon: Star },
    { label: 'Miembros del equipo', value: team.data?.length ?? 0, icon: Users },
    { label: 'Clientes registrados', value: clients.data?.length ?? 0, icon: Building2 },
    ...(user?.role === 'ADMIN'
      ? [{ label: 'Usuarios activos', value: activeUsers, icon: Sparkles }]
      : []),
  ];

  return (
    <div className="mx-auto min-w-0 w-full max-w-[1400px] space-y-8">
      <section className="relative overflow-hidden rounded-2xl border border-[#9a171c]/10 bg-white p-7 shadow-[0_1px_2px_rgba(16,24,40,0.03),0_16px_40px_-28px_rgba(16,24,40,0.3)] sm:p-9">
        <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-[#eb9192]/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 right-28 h-48 w-48 rounded-full bg-[#9a171c]/10 blur-3xl" />

        <div className="relative flex flex-wrap items-end justify-between gap-8">
          <div className="min-w-0">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#fbe9e9] px-3 py-1 text-xs font-semibold text-[#9a171c]">
              <Sparkles className="h-3.5 w-3.5" /> Panel de contenido
            </span>
            <h1 className="mt-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Hola, {firstName}</h1>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-gray-500">Resumen de tu contenido · {today}</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link to="/admin/imagenes">
              <Button>
                <Upload className="h-4 w-4" /> Subir imágenes
              </Button>
            </Link>
            <Link to="/" target="_blank">
              <Button variant="outline">
                Ver sitio <ExternalLink className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <Panel className="xl:col-span-2">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-semibold text-gray-900">Accesos rápidos</h2>
              <p className="text-sm text-gray-500">Lo que más se usa en el día a día.</p>
            </div>
            <Badge tone="brand">Atajos</Badge>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {quickActions.map(({ to, label, description, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className="group flex min-w-0 items-start gap-3.5 rounded-xl border border-gray-100 bg-gray-50/70 p-5 transition hover:border-[#9a171c]/20 hover:bg-white hover:shadow-sm"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white text-[#9a171c] shadow-sm ring-1 ring-gray-100 transition group-hover:bg-[#9a171c] group-hover:text-white">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-gray-800">{label}</span>
                  <span className="mt-1 block text-xs leading-relaxed text-gray-500">{description}</span>
                </span>
              </Link>
            ))}
          </div>
        </Panel>

        <Panel>
          <h2 className="font-semibold text-gray-900">Estado del sitio</h2>
          <p className="mb-5 text-sm text-gray-500">Contenido activo en este momento.</p>

          <ul className="space-y-3">
            {statusRows.map(({ label, value, icon: Icon }) => (
              <li
                key={label}
                className="flex items-center justify-between gap-3 rounded-xl bg-gray-50/80 px-4 py-3"
              >
                <span className="flex min-w-0 items-center gap-2 text-sm text-gray-600">
                  <Icon className="h-4 w-4 shrink-0 text-[#b24940]" />
                  <span className="truncate">{label}</span>
                </span>
                <span className="shrink-0 text-sm font-bold text-gray-900">{value}</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
            <div className="flex min-w-0 items-center gap-2">
              <MessageSquare className="h-5 w-5 shrink-0 text-[#9a171c]" />
              <h2 className="truncate font-semibold text-gray-900">Mensajes recientes</h2>
            </div>
            {unread > 0 ? <Badge tone="red">{unread} sin leer</Badge> : <Badge tone="green">Al día</Badge>}
          </div>

          <div className="divide-y divide-gray-100">
            {(messages.data ?? []).slice(0, 5).map((message) => (
              <div key={message.id} className="flex min-w-0 items-center justify-between gap-3 py-3.5">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-gray-800">{message.name}</p>
                  <p className="truncate text-sm text-gray-500">{message.subject}</p>
                </div>
                {!message.read && <Badge tone="amber">Nuevo</Badge>}
              </div>
            ))}
          </div>

          {messages.data?.length === 0 && (
            <EmptyState
              icon={MessageSquare}
              title="Sin mensajes todavía"
              description="Los mensajes del formulario aparecerán aquí."
            />
          )}

          <Link
            to="/admin/mensajes"
            className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[#9a171c] hover:underline"
          >
            Ver todos <ArrowRight className="h-4 w-4" />
          </Link>
        </Panel>

        <Panel>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
            <div className="flex min-w-0 items-center gap-2">
              <ImageIcon className="h-5 w-5 shrink-0 text-[#9a171c]" />
              <h2 className="truncate font-semibold text-gray-900">Últimas imágenes</h2>
            </div>
            <Link to="/admin/imagenes" className="text-sm font-semibold text-[#9a171c] hover:underline">
              Biblioteca
            </Link>
          </div>

          {(media.data ?? []).length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {(media.data ?? []).slice(0, 6).map((item) => (
                <div key={item.id} className="min-w-0 overflow-hidden rounded-xl border border-gray-100 bg-gray-50">
                  <img
                    src={mediaUrl(item.id)}
                    alt={item.filename}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover"
                  />
                  <p className="truncate px-2.5 py-1.5 text-[11px] text-gray-500" title={item.filename}>
                    {item.filename}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              icon={ImageIcon}
              title="Aún no hay imágenes"
              description="Sube tu primera imagen desde la biblioteca."
            />
          )}

          <Link
            to="/admin/imagenes"
            className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[#9a171c] hover:underline"
          >
            Gestionar imágenes <ArrowRight className="h-4 w-4" />
          </Link>
        </Panel>
      </div>
    </div>
  );
}
