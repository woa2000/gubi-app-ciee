'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { 
  WelcomeCard,
  DailyMissionsCard, 
  ProgressCard
} from '@/components/dashboard/DashboardCards';
import { useDashboard } from '@/hooks/useDashboard';
import { useAuth } from '@/hooks/useAuth';
import { Loader2, AlertCircle } from 'lucide-react';

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

  // Estabilizar funções para usar no useEffect
  const getCurrentUserStable = useCallback(() => getCurrentUser(), [getCurrentUser]);
  const isAuthenticatedStable = useCallback(() => isAuthenticated(), [isAuthenticated]);

  // Carregar dados do usuário
  useEffect(() => {
    const loadUser = async () => {
      try {
        if (isAuthenticatedStable()) {
          const userData = getCurrentUserStable();
          setUser(userData);
        }
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
      } finally {
        setUserLoading(false);
      }
    };

    loadUser();
  }, [getCurrentUserStable, isAuthenticatedStable]);

  const {
    data: dashboardData,
    loading,
    error,
    refresh
  } = useDashboard(user?.id?.toString() || '');

  // Handler para iniciar uma missão
  const handleStartMission = async (missionId: string) => {
    try {
      // Navigate to mission page - in a real app, you'd use Next.js router
      window.location.href = `/dashboard/activities/${missionId}`;
    } catch (error) {
      console.error('Error starting mission:', error);
    }
  };

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
          currentStreak={1}
          currentLevel={1}
        />
        {/* <WelcomeCard
          userName={user.name}
          isFirstLogin={dashboardData.user.isFirstLogin}
          currentStreak={dashboardData.progress.currentStreak}
          currentLevel={dashboardData.progress.currentLevel}
        /> */}

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Daily Missions */}
          <div className="lg:col-span-1">
            {/* <DailyMissionsCard
              missions={dashboardData.dailyMissions}
              onStartMission={handleStartMission}
            /> */}
          </div>

          {/* Progress Card */}
          <div className="lg:col-span-1">
            {/* <ProgressCard
              currentLevel={dashboardData.progress.currentLevel}
              currentXP={dashboardData.progress.currentXP}
              xpToNextLevel={dashboardData.progress.xpToNextLevel}
              currentStreak={dashboardData.progress.currentStreak}
              longestStreak={dashboardData.progress.longestStreak}
            /> */}
          </div>
        </div>

        {/* Recent Activity & Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Notifications */}
          {/* <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Atividade Recente</h2>
            <div className="space-y-3">
              {dashboardData.recentNotifications.slice(0, 3).map((notification) => (
                <div key={notification.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50">
                  <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                    notification.type === 'achievement' ? 'bg-green-500' :
                    notification.type === 'streak' ? 'bg-yellow-500' :
                    notification.type === 'mission' ? 'bg-blue-500' : 'bg-gray-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                    <p className="text-sm text-gray-600">{notification.message}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(notification.createdAt).toLocaleDateString('pt-BR', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <button className="text-purple-600 hover:text-purple-800 font-medium text-sm">
                Ver todas as notificações
              </button>
            </div>
          </div> */}

          {/* Recommendations */}
          {/* <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recomendado para Você</h2>
            <div className="space-y-3">
              {dashboardData.recommendations.slice(0, 3).map((recommendation) => (
                <div key={recommendation.id} className="p-3 border border-gray-200 rounded-lg hover:border-purple-200 hover:bg-purple-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900 mb-1">
                        {recommendation.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {recommendation.reason}
                      </p>
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <span>{recommendation.estimatedDuration} min</span>
                        <span>•</span>
                        <span>+{recommendation.xpReward} XP</span>
                        <span>•</span>
                        <span className="capitalize">{recommendation.difficulty}</span>
                      </div>
                    </div>
                    <button className="ml-3 px-3 py-1 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors text-sm">
                      Iniciar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div> */}
        </div>

      </div>
    </DashboardLayout>
  );
}
