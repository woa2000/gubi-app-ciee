import React, { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface DashboardLayoutProps {
  children: ReactNode;
  user: {
    id: string;
    name: string;
    email: string;
    profileImage?: string;
  };
}

export function DashboardLayout({ children, user }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar user={user} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-64">
        {/* Header */}
        <Header user={user} />
        
        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
      
      {/* Mobile Sidebar Overlay */}
      <div 
        id="sidebar-backdrop"
        className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden hidden"
        onClick={() => {
          document.getElementById('mobile-sidebar')?.classList.add('-translate-x-full');
          document.getElementById('sidebar-backdrop')?.classList.add('hidden');
        }}
      />
    </div>
  );
}
