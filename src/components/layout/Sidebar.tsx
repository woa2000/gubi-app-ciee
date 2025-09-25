import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import Image from 'next/image';
import { 
  Home, 
  Target, 
  User, 
  Settings, 
  Bell,
  HelpCircle,
  LogOut,
  Menu,
  X
} from 'lucide-react';

interface SidebarProps {
  user: {
    id: string;
    name: string;
    email: string;
    profileImage?: string;
  };
}

const menuItems = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    icon: Home,
    path: '/dashboard',
    badge: 0
  },
  {
    id: 'activities',
    title: 'Atividades',
    icon: Target,
    path: '/dashboard/activities',
    badge: 0
  }
];

const bottomMenuItems = [
  {
    id: 'profile',
    title: 'Meu Perfil',
    icon: User,
    path: '/dashboard/profile',
    badge: 0
  },
  // {
  //   id: 'notifications',
  //   title: 'Notificações',
  //   icon: Bell,
  //   path: '/dashboard/notifications',
  //   badge: 3
  // },
  // {
  //   id: 'help',
  //   title: 'Ajuda',
  //   icon: HelpCircle,
  //   path: '/dashboard/help',
  //   badge: 0
  // },
  // {
  //   id: 'settings',
  //   title: 'Configurações',
  //   icon: Settings,
  //   path: '/dashboard/settings',
  //   badge: 0
  // }
];

export function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();

  const toggleMobileSidebar = () => {
    const sidebar = document.getElementById('mobile-sidebar');
    const backdrop = document.getElementById('sidebar-backdrop');
    
    if (sidebar?.classList.contains('-translate-x-full')) {
      sidebar.classList.remove('-translate-x-full');
      backdrop?.classList.remove('hidden');
    } else {
      sidebar?.classList.add('-translate-x-full');
      backdrop?.classList.add('hidden');
    }
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md hover:shadow-lg transition-shadow"
        aria-label="Abrir menu"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block fixed left-0 top-0 h-full w-64 bg-white shadow-lg z-30">
        <SidebarContent 
          user={user} 
          pathname={pathname} 
          menuItems={menuItems}
          bottomMenuItems={bottomMenuItems}
          onItemClick={() => {}}
        />
      </aside>

      {/* Mobile Sidebar */}
      <aside 
        id="mobile-sidebar"
        className="lg:hidden fixed left-0 top-0 h-full w-64 bg-white shadow-lg z-50 transform -translate-x-full transition-transform duration-300 ease-in-out"
      >
        <div className="flex justify-between items-center p-4 border-b">
          <div className="flex items-end space-x-3">
            <Image 
              src="/gubi-logo.png" 
              alt="Gubi Logo" 
              width={40}
              height={40}
              className="object-contain"
            />
            <Image 
              src="/ciee/logo-expo-ciee-color.png" 
              alt="CIEE Logo" 
              width={60}
              height={30}
              className="object-contain"
            />
          </div>
          <button
            onClick={toggleMobileSidebar}
            className="p-2 hover:bg-gray-100 rounded-md"
            aria-label="Fechar menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <SidebarContent 
          user={user} 
          pathname={pathname} 
          menuItems={menuItems}
          bottomMenuItems={bottomMenuItems}
          onItemClick={toggleMobileSidebar}
        />
      </aside>
    </>
  );
}

interface SidebarContentProps {
  user: SidebarProps['user'];
  pathname: string;
  menuItems: typeof menuItems;
  bottomMenuItems: typeof bottomMenuItems;
  onItemClick: () => void;
}

function SidebarContent({ user, pathname, menuItems, bottomMenuItems, onItemClick }: SidebarContentProps) {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      onItemClick(); // Close mobile sidebar if open
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Logo - Hidden on mobile as it's in the header */}
      <div className="hidden lg:flex items-end justify-center space-x-3 p-6 border-b">
        <Image 
          src="/gubi-logo.png" 
          alt="Gubi Logo" 
          width={48}
          height={48}
          className="object-contain"
        />
        <Image 
          src="/ciee/logo-expo-ciee-color.png" 
          alt="CIEE Logo" 
          width={72}
          height={36}
          className="object-contain"
        />
      </div>

      {/* User Profile */}
      <div className="p-4 border-b">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
            {user.profileImage ? (
              <img 
                src={user.profileImage} 
                alt={user.name}
                className="w-full h-full rounded-full object-cover" 
              />
            ) : (
              <span>{user.name.charAt(0).toUpperCase()}</span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user.name}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {user.email}
            </p>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;
          
          return (
            <Link
              key={item.id}
              href={item.path}
              onClick={onItemClick}
              className={`
                flex items-center space-x-3 px-3 py-2 rounded-md transition-colors
                ${isActive 
                  ? 'bg-purple-100 text-purple-700 font-medium' 
                  : 'text-gray-700 hover:bg-gray-100'
                }
              `}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span className="flex-1">{item.title}</span>
              {item.badge > 0 && (
                <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] h-5 flex items-center justify-center">
                  {item.badge > 99 ? '99+' : item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Navigation */}
      <div className="p-4 border-t space-y-2">
        {bottomMenuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;
          
          return (
            <Link
              key={item.id}
              href={item.path}
              onClick={onItemClick}
              className={`
                flex items-center space-x-3 px-3 py-2 rounded-md transition-colors
                ${isActive 
                  ? 'bg-purple-100 text-purple-700 font-medium' 
                  : 'text-gray-700 hover:bg-gray-100'
                }
              `}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span className="flex-1">{item.title}</span>
              {item.badge > 0 && (
                <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] h-5 flex items-center justify-center">
                  {item.badge > 99 ? '99+' : item.badge}
                </span>
              )}
            </Link>
          );
        })}
        
        {/* Logout Button */}
        <button
          className="flex items-center space-x-3 px-3 py-2 rounded-md transition-colors text-gray-700 hover:bg-gray-100 w-full text-left"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          <span>Sair</span>
        </button>
      </div>
    </div>
  );
}
