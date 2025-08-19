'use client';

import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { 
  WelcomeCard, 
  DailyMissionsCard, 
  ProgressCard 
} from '@/components/dashboard/DashboardCards';
import { useDashboard } from '@/hooks/useDashboard';
import { useAuth } from '@/hooks/useAuth';
import { Loader2, AlertCircle, RefreshCw } from 'lucide-react';

interface DashboardUser {
  id: number | string;
  name: string;
  email: string;
  profileImage?: string;
}

export default function DashboardPage() {
  const { getCurrentUser, isAuthenticated } = useAuth();
  const [user, setUser] = useState<DashboardUser | null>(null);
  const [userLoading, setUserLoading] = useState(true);

  // Carregar dados do usuário - usando useEffect sem dependências problemáticas
  useEffect(() => {
    const loadUser = async () => {
      try {
        if (isAuthenticated()) {
          const userData = getCurrentUser();
          setUser(userData);
        }
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
      } finally {
        setUserLoading(false);
      }
    };

    loadUser();
  }, []); // Removidas dependências instáveis

  const {
    data: dashboardData,
    loading,
    error,
    refreshing,
    refresh,
    completeMission
  } = useDashboard(user?.id?.toString() || '');

  // Mostrar loading se estiver carregando o usuário
  if (userLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-purple-600" />
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  // Se não há usuário logado, não renderizar
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-500" />
          <p className="text-gray-600">Usuário não encontrado</p>
        </div>
      </div>
    );
  }

  const handleStartMission = async (missionId: string) => {
    try {
      // Navigate to mission page - in a real app, you'd use Next.js router
      window.location.href = `/dashboard/activities/${missionId}`;
    } catch (error) {
      console.error('Error starting mission:', error);
    }
  };

  if (loading) {
    return (
      <DashboardLayout user={{
        id: user.id.toString(),
        name: user.name,
        email: user.email,
        profileImage: user.profileImage
      }}>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-purple-600" />
            <p className="text-gray-600">Carregando seu dashboard...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (error && !dashboardData) {
    return (
      <DashboardLayout user={{
        id: user.id.toString(),
        name: user.name,
        email: user.email,
        profileImage: user.profileImage
      }}>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center max-w-md">
            <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-500" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Ops! Algo deu errado
            </h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={refresh}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Tentar novamente
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!dashboardData) {
    return (
      <DashboardLayout user={{
        id: user.id.toString(),
        name: user.name,
        email: user.email,
        profileImage: user.profileImage
      }}>
        <div className="text-center">
          <p>Nenhum dado disponível</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout user={{
      id: user.id.toString(),
      name: user.name,
      email: user.email,
      profileImage: user.profileImage
    }}>
      <div className="space-y-6">
        {/* Welcome Card */}
        <WelcomeCard
          userName={user.name}
          isFirstLogin={dashboardData.user.isFirstLogin}
          currentStreak={dashboardData.progress.currentStreak}
          currentLevel={dashboardData.progress.currentLevel}
        />
      </div>
    </DashboardLayout>
  );
}
