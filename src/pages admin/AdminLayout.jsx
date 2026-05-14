import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  Newspaper, 
  UserPlus, 
  Users, 
  Wrench, 
  Settings, 
  LogOut,
  Menu,
  X,
  Bell
} from 'lucide-react';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { name: 'Tableau de bord', icon: LayoutDashboard, path: '/admin' },
    { name: 'Formations', icon: BookOpen, path: '/admin/formations' },
    { name: 'Inscriptions', icon: UserPlus, path: '/admin/inscriptions' },
    { name: 'Étudiants', icon: Users, path: '/admin/etudiants' },
    { name: 'Actualités', icon: Newspaper, path: '/admin/actualites' },
    { name: 'Services', icon: Wrench, path: '/admin/services' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-72 bg-slate-900 text-slate-300
          transform transition-transform duration-300 ease-in-out shadow-xl
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          flex flex-col
        `}
      >
        <div className="h-20 flex items-center px-6 bg-slate-950/50 border-b border-slate-800">
          <Link to="/admin" className="text-2xl font-bold text-white flex items-center gap-2">
            <span className="text-[var(--color-brand-orange)]">IBK</span> ADMIN
          </Link>
          <button 
            className="ml-auto lg:hidden p-2 bg-slate-800 text-slate-300 hover:text-white rounded-lg"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Menu Principal</p>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`
                  flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200
                  ${isActive 
                    ? 'bg-gradient-to-r from-[var(--color-brand-blue)] to-blue-600 text-white shadow-lg shadow-blue-900/20' 
                    : 'hover:bg-slate-800 hover:text-white'}
                `}
                onClick={() => setIsSidebarOpen(false)}
              >
                <item.icon size={20} className={isActive ? "text-white" : "text-slate-400"} />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </div>

        <div className="p-4 border-t border-slate-800 bg-slate-950/30">
          <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 hover:text-white transition-colors mb-2">
            <Settings size={20} className="text-slate-400" />
            <span className="font-medium">Retour au site</span>
          </Link>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors">
            <LogOut size={20} />
            <span className="font-medium">Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* TopBar */}
        <header className="h-20 bg-white border-b border-slate-200 shadow-sm flex items-center justify-between px-4 sm:px-8 shrink-0 z-10 sticky top-0">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden p-2.5 bg-slate-100 text-slate-600 hover:bg-slate-200 rounded-xl transition-colors"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <h2 className="text-xl font-bold text-slate-800 hidden sm:block">Espace de Gestion</h2>
          </div>

          <div className="flex items-center gap-5 ml-auto">
            <button className="relative p-2.5 text-slate-500 hover:bg-slate-100 hover:text-slate-700 rounded-full transition-colors">
              <Bell size={22} />
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-px bg-slate-200 mx-1"></div>
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[var(--color-brand-orange)] to-orange-400 flex items-center justify-center text-white font-bold shadow-md group-hover:scale-105 transition-transform">
                AD
              </div>
              <div className="hidden md:block text-sm">
                <p className="font-bold text-slate-900 group-hover:text-[var(--color-brand-blue)] transition-colors">Administrateur</p>
                <p className="text-slate-500 text-xs">admin@ibktech.com</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
