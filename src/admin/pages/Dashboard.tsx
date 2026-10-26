import { Link } from 'react-router-dom';
import { Building2, FileText, Image, MessageSquare, Package, Unlock } from 'lucide-react';
import { useAsyncData } from '../useAsyncData';
import { listMessages, listPages, listServices, listMedia, listPortfolio } from '../api';
import { Badge, Panel } from '../components/ui';

export default function Dashboard() {
  const pages = useAsyncData(listPages);
  const services = useAsyncData(listServices);
  const messages = useAsyncData(listMessages);
  const media = useAsyncData(listMedia);
  const portfolio = useAsyncData(listPortfolio);

  const unread = (messages.data ?? []).filter((message) => !message.read).length;

  const cards = [
    { label: 'Páginas', value: pages.data?.length ?? 0, icon: FileText, to: '/admin/paginas', tone: 'text-[#9a171c]' },
    { label: 'Servicios', value: services.data?.length ?? 0, icon: Package, to: '/admin/servicios', tone: 'text-[#b24940]' },
    { label: 'Portafolio', value: portfolio.data?.length ?? 0, icon: Image, to: '/admin/portafolio', tone: 'text-[#9a171c]' },
    { label: 'Imágenes', value: media.data?.length ?? 0, icon: Image, to: '/admin/imagenes', tone: 'text-[#b24940]' },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Resumen</h1>
        <p className="text-sm text-gray-500">Contenido del sitio y actividad reciente.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(({ label, value, icon: Icon, to, tone }) => (
          <Link key={label} to={to}>
            <Panel className="transition hover:-translate-y-0.5 hover:shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">{label}</span>
                <Icon className={`h-5 w-5 ${tone}`} />
              </div>
              <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
            </Panel>
          </Link>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel>
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-[#9a171c]" />
              <h2 className="font-semibold text-gray-900">Mensajes recientes</h2>
            </div>
            {unread > 0 && <Badge tone="red">{unread} sin leer</Badge>}
          </div>

          {(messages.data ?? []).slice(0, 5).map((message) => (
            <div key={message.id} className="border-t border-gray-100 py-2 text-sm">
              <div className="flex items-center justify-between gap-2">
                <span className="font-medium text-gray-800">{message.name}</span>
                {!message.read && <Badge tone="amber">Nuevo</Badge>}
              </div>
              <p className="text-gray-500">{message.subject}</p>
            </div>
          ))}

          {messages.data?.length === 0 && <p className="text-sm text-gray-500">Sin mensajes todavía.</p>}

          <Link to="/admin/mensajes" className="mt-3 inline-block text-sm font-semibold text-[#9a171c]">
            Ver todos
          </Link>
        </Panel>

        <Panel>
          <div className="mb-3 flex items-center gap-2">
            <Unlock className="h-5 w-5 text-[#9a171c]" />
            <h2 className="font-semibold text-gray-900">Accesos rápidos</h2>
          </div>

          <div className="grid gap-2 sm:grid-cols-2">
            <Link to="/admin/paginas" className="rounded-lg bg-gray-50 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
              Editar secciones
            </Link>
            <Link to="/admin/servicios" className="rounded-lg bg-gray-50 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
              Agregar producto
            </Link>
            <Link to="/admin/imagenes" className="rounded-lg bg-gray-50 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
              Subir imágenes
            </Link>
            <Link to="/admin/clientes" className="rounded-lg bg-gray-50 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
              <Building2 className="mr-1 inline h-4 w-4" /> Clientes
            </Link>
          </div>
        </Panel>
      </div>
    </div>
  );
}
