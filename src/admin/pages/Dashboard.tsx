import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  FileText,
  Image as ImageIcon,
  Images,
  LayoutDashboard,
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
import { Badge, Button, EmptyState, PageHeader, Panel } from '../components/ui';

interface StatCardProps {
  label: string;
  value: number | string;
  hint: string;
  icon: LucideIcon;
  to: string;
}

function StatCard({ label, value, hint, icon: Icon, to }: StatCardProps) {
  return (
    <Link to={to} className="group">
      <Panel className="h-full transition duration-200 group-hover:-translate-y-0.5 group-hover:border-[#9a171c]/25 group-hover:shadow-lg">
        <div className="flex items-start justify-between gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#9a171c]/10 text-[#9a171c] transition group-hover:bg-[#9a171c] group-hover:text-white">
            <Icon className="h-5 w-5" />
          </span>
          <ArrowRight className="h-4 w-4 text-gray-300 transition group-hover:translate-x-0.5 group-hover:text-[#9a171c]" />
        </div>
        <p className="mt-3 text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-sm font-medium text-gray-700">{label}</p>
        <p className="text-xs text-gray-400">{hint}</p>
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
    <div className="mx-auto max-w-7xl space-y-6">
      <PageHeader
        icon={LayoutDashboard}
        title={`Hola, ${firstName}`}
        description={`Resumen de tu contenido · ${today}`}
        actions={
          <Link to="/admin/imagenes">
            <Button>
              <Upload className="h-4 w-4" /> Subir imágenes
            </Button>
          </Link>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Panel className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-gray-900">Accesos rápidos</h2>
              <p className="text-sm text-gray-500">Lo que más se usa en el día a día.</p>
            </div>
            <Badge tone="brand">Atajos</Badge>
          </div>

          <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
            {quickActions.map(({ to, label, description, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className="group flex items-start gap-3 rounded-xl border border-transparent bg-[#faf7f6] p-3 transition hover:border-[#9a171c]/20 hover:bg-white hover:shadow-sm"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-[#9a171c] shadow-sm transition group-hover:bg-[#9a171c] group-hover:text-white">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-gray-800">{label}</span>
                  <span className="block text-xs text-gray-500">{description}</span>
                </span>
              </Link>
            ))}
          </div>
        </Panel>

        <Panel>
          <h2 className="font-semibold text-gray-900">Estado del sitio</h2>
          <p className="mb-3 text-sm text-gray-500">Contenido activo en este momento.</p>

          <ul className="space-y-2">
            {statusRows.map(({ label, value, icon: Icon }) => (
              <li key={label} className="flex items-center justify-between gap-3 rounded-lg bg-[#faf7f6] px-3 py-2">
                <span className="flex items-center gap-2 text-sm text-gray-600">
                  <Icon className="h-4 w-4 text-[#b24940]" />
                  {label}
                </span>
                <span className="text-sm font-bold text-gray-900">{value}</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel>
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-[#9a171c]" />
              <h2 className="font-semibold text-gray-900">Mensajes recientes</h2>
            </div>
            {unread > 0 ? <Badge tone="red">{unread} sin leer</Badge> : <Badge tone="green">Al día</Badge>}
          </div>

          {(messages.data ?? []).slice(0, 5).map((message) => (
            <div key={message.id} className="border-t border-gray-100 py-2.5 text-sm first:border-t-0">
              <div className="flex items-center justify-between gap-2">
                <span className="font-medium text-gray-800">{message.name}</span>
                {!message.read && <Badge tone="amber">Nuevo</Badge>}
              </div>
              <p className="truncate text-gray-500">{message.subject}</p>
            </div>
          ))}

          {messages.data?.length === 0 && (
            <EmptyState icon={MessageSquare} title="Sin mensajes todavía" description="Los mensajes del formulario aparecerán aquí." />
          )}

          <Link to="/admin/mensajes" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#9a171c] hover:underline">
            Ver todos <ArrowRight className="h-4 w-4" />
          </Link>
        </Panel>

        <Panel>
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5 text-[#9a171c]" />
              <h2 className="font-semibold text-gray-900">Últimas imágenes</h2>
            </div>
            <Link to="/admin/imagenes" className="text-sm font-semibold text-[#9a171c] hover:underline">
              Biblioteca
            </Link>
          </div>

          {(media.data ?? []).length > 0 ? (
            <div className="grid grid-cols-3 gap-2">
              {(media.data ?? []).slice(0, 6).map((item) => (
                <div key={item.id} className="overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                  <img
                    src={mediaUrl(item.id)}
                    alt={item.filename}
                    loading="lazy"
                    className="h-24 w-full object-cover"
                  />
                  <p className="truncate px-2 py-1 text-[11px] text-gray-500" title={item.filename}>
                    {item.filename}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState icon={ImageIcon} title="Aún no hay imágenes" description="Sube tu primera imagen desde la biblioteca." />
          )}

          <Link
            to="/admin/imagenes"
            className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#9a171c] hover:underline"
          >
            Gestionar imágenes <ArrowRight className="h-4 w-4" />
          </Link>
        </Panel>
      </div>
    </div>
  );
}
