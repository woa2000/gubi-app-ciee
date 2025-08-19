'use client';

import React, { useState } from 'react';
import { Bell, Search, ChevronDown, Settings } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface HeaderProps {
  user: {
    id: string;
    name: string;
    email: string;
    profileImage?: string;
  };
}

export function Header({ user }: HeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      setShowUserMenu(false); // Close dropdown
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 lg:px-6">
      <div className="flex items-center justify-between">
        {/* Left side - Search */}
        <div className="flex items-center flex-1 max-w-md">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
              placeholder="Buscar atividades, missões..."
            />
          </div>
        </div>

        {/* Right side - Notifications and User Menu */}
        <div className="flex items-center space-x-4 ml-4">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors relative"
              aria-label="Notificações"
            >
              <Bell className="w-6 h-6" />
              {/* Notification badge */}
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Notificações</h3>
                    <button className="text-sm text-purple-600 hover:text-purple-800">
                      Marcar todas como lidas
                    </button>
                  </div>
                </div>
                
                <div className="max-h-64 overflow-y-auto">
                  {/* Mock notifications */}
                  <div className="p-4 border-b border-gray-100 hover:bg-gray-50">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Nova missão disponível!</p>
                        <p className="text-sm text-gray-600">Complete o quiz de autoconhecimento</p>
                        <p className="text-xs text-gray-400 mt-1">Há 5 minutos</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border-b border-gray-100 hover:bg-gray-50">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Conquista desbloqueada!</p>
                        <p className="text-sm text-gray-600">Você ganhou o badge &quot;Explorador&quot;</p>
                        <p className="text-xs text-gray-400 mt-1">Há 2 horas</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 hover:bg-gray-50">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Streak em risco!</p>
                        <p className="text-sm text-gray-600">Complete uma atividade hoje para manter sua sequência</p>
                        <p className="text-xs text-gray-400 mt-1">Há 4 horas</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border-t border-gray-200">
                  <button className="w-full text-center text-sm text-purple-600 hover:text-purple-800 font-medium">
                    Ver todas as notificações
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 transition-colors"
            >
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
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
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>

            {/* User Dropdown */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                <div className="p-3 border-b border-gray-200">
                  <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>
                
                <div className="py-1">
                  <a
                    href="/dashboard/profile"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <Settings className="w-4 h-4 mr-3" />
                    Meu Perfil
                  </a>
                  
                  <a
                    href="/dashboard/settings"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <Settings className="w-4 h-4 mr-3" />
                    Configurações
                  </a>
                  
                  <div className="border-t border-gray-100"></div>
                  
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                  >
                    Sair
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

// Close dropdowns when clicking outside
if (typeof window !== 'undefined') {
  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    if (!target.closest('[data-dropdown]')) {
      // Close all dropdowns
      const dropdowns = document.querySelectorAll('[data-dropdown-content]');
      dropdowns.forEach((dropdown) => {
        (dropdown as HTMLElement).style.display = 'none';
      });
    }
  });
}
