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
              ? 'bg-white font-semibold text-[#7a1216] shadow-sm'
              : 'text-white/75 hover:bg-white/10 hover:text-white'
          }`
        }
      >
        {({ isActive }) => (
          <>
            <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-[#9a171c]' : 'text-white/60 group-hover:text-white'}`} />
            <span className="truncate">{label}</span>
          </>
        )}
      </NavLink>
    );
  }

  return (
    <div className="admin-shell flex min-h-screen flex-col lg:flex-row">
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
        className={`brand-gradient fixed inset-y-0 left-0 z-40 flex w-72 max-w-[85vw] flex-col overflow-y-auto text-white shadow-2xl transition-transform duration-300 lg:sticky lg:top-0 lg:z-auto lg:h-screen lg:w-64 lg:translate-x-0 lg:shadow-none ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-5 py-5">
          <Link to="/admin" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-sm font-extrabold ring-1 ring-white/25">
              RS
            </span>
            <span>
              <span className="block text-base font-bold tracking-tight">RS Creativ</span>
              <span className="block text-[10px] uppercase tracking-[0.22em] text-white/60">Contenido</span>
            </span>
          </Link>

          <button
            type="button"
            aria-label="Cerrar menú"
            onClick={() => setOpen(false)}
            className="rounded-lg p-2 text-white/80 transition hover:bg-white/10 hover:text-white lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-5 px-3 pb-4">
          {visibleGroups.map((group) => (
            <div key={group.title}>
              <p className="px-3 pb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/45">
                {group.title}
              </p>
              <div className="space-y-1">{group.links.map(renderLink)}</div>
            </div>
          ))}
        </nav>

        <div className="border-t border-white/15 p-3">
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm text-white/75 transition hover:bg-white/10 hover:text-white"
          >
            Ver sitio público
            <ExternalLink className="h-4 w-4" />
          </Link>
          <p className="px-3 pt-2 text-[11px] text-white/45">© RS Creativ · Panel</p>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 border-b border-[#9a171c]/10 bg-white/85 backdrop-blur">
          <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6">
            <div className="flex min-w-0 items-center gap-3">
              <button
                type="button"
                aria-label="Abrir menú"
                onClick={() => setOpen(true)}
                className="rounded-lg border border-[#9a171c]/15 p-2 text-[#9a171c] transition hover:bg-[#9a171c]/5 lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>

              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#b24940]">Panel</p>
                <h2 className="truncate text-sm font-semibold text-gray-900 sm:text-base">{current.label}</h2>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                to="/"
                target="_blank"
                className="hidden items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-gray-600 transition hover:bg-[#9a171c]/5 hover:text-[#9a171c] sm:inline-flex"
              >
                Ver sitio <ExternalLink className="h-3.5 w-3.5" />
              </Link>

              <div className="hidden items-center gap-2 md:flex">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#9a171c] text-xs font-bold text-white">
                  {initials(user?.name)}
                </span>
                <div className="leading-tight">
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

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
