import { useEffect, useState } from 'react';
import { NavLink, Outlet, Link, useLocation } from 'react-router-dom';
import {
  Building2,
  ExternalLink,
  FileText,
  Image,
  Images,
  KeyRound,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Package,
  Settings,
  Shield,
  Users,
  X,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useAuth } from '../AuthContext';
import { Button } from './ui';
import Seo from '@/components/Seo';

interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
  end?: boolean;
}

interface NavGroup {
  title: string;
  links: NavItem[];
}

const groups: NavGroup[] = [
  {
    title: 'Principal',
    links: [{ to: '/admin', label: 'Resumen', icon: LayoutDashboard, end: true }],
  },
  {
    title: 'Contenido',
    links: [
      { to: '/admin/paginas', label: 'Páginas', icon: FileText },
      { to: '/admin/servicios', label: 'Servicios y productos', icon: Package },
      { to: '/admin/portafolio', label: 'Portafolio', icon: Images },
      { to: '/admin/equipo', label: 'Equipo', icon: Users },
      { to: '/admin/clientes', label: 'Clientes', icon: Building2 },
      { to: '/admin/imagenes', label: 'Imágenes', icon: Image },
    ],
  },
  {
    title: 'Comunicación',
    links: [{ to: '/admin/mensajes', label: 'Mensajes', icon: MessageSquare }],
  },
  {
    title: 'Sistema',
    links: [
      { to: '/admin/configuracion', label: 'Configuración', icon: Settings },
      { to: '/admin/cuenta', label: 'Mi cuenta', icon: KeyRound },
    ],
  },
];

const adminGroup: NavGroup = {
  title: 'Administración',
  links: [{ to: '/admin/usuarios', label: 'Usuarios', icon: Shield }],
};

function initials(name?: string) {
  if (!name) return 'RS';

  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

export default function AdminLayout() {
  const { user, signOut } = useAuth();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const allLinks = [...groups.flatMap((group) => group.links), ...adminGroup.links];
  const current =
    allLinks
      .filter((link) => (link.end ? pathname === link.to : pathname.startsWith(link.to)))
      .sort((a, b) => b.to.length - a.to.length)[0] ?? allLinks[0];

  const visibleGroups = user?.role === 'ADMIN' ? [...groups, adminGroup] : groups;

  function renderLink({ to, label, icon: Icon, end }: NavItem) {
    return (
      <NavLink
        key={to}
        to={to}
        end={end}
        onClick={() => setOpen(false)}
        className={({ isActive }) =>
          `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
            isActive
              ? 'bg-[#fbe9e9] font-semibold text-[#9a171c]'
              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
          }`
        }
      >
        {({ isActive }) => (
          <>
            <Icon
              className={`h-4 w-4 shrink-0 ${
                isActive ? 'text-[#9a171c]' : 'text-gray-400 group-hover:text-gray-600'
              }`}
            />
            <span className="truncate">{label}</span>
          </>
        )}
      </NavLink>
    );
  }

  return (
    <div className="admin-shell flex min-h-screen flex-col overflow-x-clip lg:flex-row">
      <Seo title="Panel | RS Creativ" description="Panel de administración de contenido." noindex />

      {open && (
        <button
          type="button"
          aria-label="Cerrar menú"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-[2px] lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 max-w-[85vw] flex-col overflow-y-auto border-r border-gray-200 bg-white shadow-2xl transition-transform duration-300 lg:sticky lg:top-0 lg:z-auto lg:h-screen lg:w-64 lg:translate-x-0 lg:shadow-none ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-5 py-5">
          <Link to="/admin" className="flex min-w-0 items-center gap-3">
            <span className="brand-gradient flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-extrabold text-white shadow-sm">
              RS
            </span>
            <span className="min-w-0">
              <span className="block truncate text-base font-bold tracking-tight text-gray-900">RS Creativ</span>
              <span className="block text-[10px] uppercase tracking-[0.22em] text-gray-400">Contenido</span>
            </span>
          </Link>

          <button
            type="button"
            aria-label="Cerrar menú"
            onClick={() => setOpen(false)}
            className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-6 px-3 pb-6 pt-2">
          {visibleGroups.map((group) => (
            <div key={group.title}>
              <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-400">
                {group.title}
              </p>
              <div className="space-y-1">{group.links.map(renderLink)}</div>
            </div>
          ))}
        </nav>

        <div className="border-t border-gray-200 p-3">
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm text-gray-500 transition hover:bg-gray-100 hover:text-[#9a171c]"
          >
            Ver sitio público
            <ExternalLink className="h-4 w-4" />
          </Link>
          <p className="px-3 pt-2 text-[11px] text-gray-400">© RS Creativ · Panel</p>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 border-b border-gray-200/80 bg-white/80 backdrop-blur">
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
            <div className="flex min-w-0 items-center gap-3">
              <button
                type="button"
                aria-label="Abrir menú"
                onClick={() => setOpen(true)}
                className="rounded-lg border border-gray-200 p-2 text-gray-600 transition hover:bg-gray-100 lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>

              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#b24940]">Panel</p>
                <h2 className="truncate text-sm font-semibold text-gray-900 sm:text-base">{current.label}</h2>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
              <Link
                to="/"
                target="_blank"
                className="hidden items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-gray-500 transition hover:bg-gray-100 hover:text-[#9a171c] lg:inline-flex"
              >
                Ver sitio <ExternalLink className="h-3.5 w-3.5" />
              </Link>

              <div className="hidden items-center gap-2.5 lg:flex">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#9a171c] text-xs font-bold text-white">
                  {initials(user?.name)}
                </span>
                <div className="min-w-0 leading-tight">
                  <p className="max-w-32 truncate text-sm font-semibold text-gray-800">{user?.name}</p>
                  <p className="text-[11px] font-medium uppercase tracking-wide text-[#b24940]">{user?.role}</p>
                </div>
              </div>

              <Button variant="secondary" onClick={signOut} title="Cerrar sesión">
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Salir</span>
              </Button>
            </div>
          </div>
        </header>

        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8 xl:px-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
