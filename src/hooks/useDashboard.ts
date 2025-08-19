'use client';

import { useState, useEffect, useCallback } from 'react';
import { dashboardService, DashboardStorage } from '@/services/dashboard';
import { DashboardData } from '@/types/dashboard';

export interface UseDashboardResult {
  data: DashboardData | null;
  loading: boolean;
  error: string | null;
  refreshing: boolean;
  refresh: () => Promise<void>;
  markNotificationsAsRead: (notificationIds: string[]) => Promise<void>;
  completeMission: (missionId: string, timeSpent: number, answers?: Record<string, unknown>) => Promise<{
    success: boolean;
    xpGained?: number;
    levelUp?: boolean;
    newBadges?: string[];
  }>;
}

export function useDashboard(userId: string): UseDashboardResult {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  // Mock data for development/fallback - movida para cima para estabilizar
  const getMockDashboardData = useCallback((): DashboardData => {
    return {
      user: {
        id: userId,
        name: 'Maria Silva',
        email: 'maria@exemplo.com',
        isFirstLogin: false,
        preferences: {
          accessibility: {
            highContrast: false,
            largeText: false,
            reduceAnimations: false,
            screenReaderMode: false
          },
          notifications: {
            dailyMissions: true,
            achievements: true,
            streaks: true,
            recommendations: true
          },
          gamification: {
            showXP: true,
            showLevel: true,
            showBadges: true,
            showLeaderboard: true
          }
        },
        createdAt: '2025-08-01T00:00:00Z'
      },
      progress: {
        id: '1',
        userId: userId,
        currentLevel: 3,
        totalXP: 1250,
        currentXP: 250,
        xpToNextLevel: 250,
        currentStreak: 7,
        longestStreak: 12,
        lastActivityDate: '2025-08-18T10:00:00Z',
        createdAt: '2025-08-01T00:00:00Z',
        updatedAt: '2025-08-18T10:00:00Z'
      },
      dailyMissions: [
        {
          id: '1',
          title: 'Quiz de Autoconhecimento',
          description: 'Descubra mais sobre seu perfil profissional',
          type: 'quiz',
          estimatedDuration: 8,
          xpReward: 50,
          difficulty: 'medium',
          category: 'autoconhecimento',
          isCompleted: false,
          expiresAt: '2025-08-19T00:00:00Z'
        },
        {
          id: '2',
          title: 'Simulação de Trabalho em Equipe',
          description: 'Pratique suas habilidades de colaboração',
          type: 'simulation',
          estimatedDuration: 12,
          xpReward: 75,
          difficulty: 'hard',
          category: 'soft-skills',
          isCompleted: true,
          completedAt: '2025-08-18T09:00:00Z',
          expiresAt: '2025-08-19T00:00:00Z'
        },
        {
          id: '3',
          title: 'Reflexão sobre Objetivos',
          description: 'Pense sobre suas metas de curto prazo',
          type: 'reflection',
          estimatedDuration: 5,
          xpReward: 25,
          difficulty: 'easy',
          category: 'planejamento',
          isCompleted: false,
          expiresAt: '2025-08-19T00:00:00Z'
        }
      ],
      recentNotifications: [
        {
          id: '1',
          userId: userId,
          type: 'achievement',
          title: 'Nova conquista desbloqueada!',
          message: 'Você ganhou o badge "Colaborativo"',
          priority: 'medium',
          isRead: false,
          createdAt: '2025-08-18T09:30:00Z'
        },
        {
          id: '2',
          userId: userId,
          type: 'streak',
          title: 'Sequência mantida!',
          message: 'Parabéns! Você manteve sua sequência de 7 dias',
          priority: 'low',
          isRead: false,
          createdAt: '2025-08-18T08:00:00Z'
        },
        {
          id: '3',
          userId: userId,
          type: 'mission',
          title: 'Nova missão disponível',
          message: 'Um novo quiz de autoconhecimento está esperando por você',
          priority: 'high',
          isRead: true,
          createdAt: '2025-08-18T07:00:00Z'
        }
      ],
      recentBadges: [],
      stats: {
        totalActivitiesCompleted: 23,
        totalTimeSpent: 340,
        averageSessionTime: 15,
        favoriteCategoryId: 'autoconhecimento',
        weakestSkillArea: 'liderança',
        strongestSkillArea: 'colaboração',
        completionRate: 78,
        lastLoginAt: '2025-08-18T10:00:00Z',
        joinedAt: '2025-08-01T00:00:00Z'
      },
      recommendations: [
        {
          id: '1',
          activityId: 'act_1',
          title: 'Teste de Personalidade DISC',
          description: 'Entenda melhor seu perfil comportamental',
          reason: 'Baseado no seu interesse em autoconhecimento',
          estimatedDuration: 15,
          xpReward: 100,
          difficulty: 'medium',
          category: 'autoconhecimento',
          priority: 9,
          personaMatch: 'explorador'
        },
        {
          id: '2',
          activityId: 'act_2',
          title: 'Simulação: Entrevista de Emprego',
          description: 'Pratique suas respostas em uma entrevista virtual',
          reason: 'Melhore suas chances no mercado de trabalho',
          estimatedDuration: 20,
          xpReward: 120,
          difficulty: 'hard',
          category: 'carreira',
          priority: 8,
          personaMatch: 'transicao'
        }
      ]
    };
  }, [userId]);

  const loadDashboardData = useCallback(async (useCache = true) => {
    try {
      setError(null);
      
      // Try cache first if requested
      if (useCache) {
        const cachedData = DashboardStorage.getDashboardCache(userId);
        if (cachedData) {
          setData(cachedData);
          setLoading(false);
        }
      }

      // Get fresh data
      const token = DashboardStorage.getAuthToken();
      if (!token) {
        throw new Error('Token de autenticação não encontrado. Faça login novamente.');
      }

      const response = await dashboardService.getDashboardData(token);
      
      if (response.success) {
        setData(response.data);
        DashboardStorage.saveDashboardCache(userId, response.data);
        
        // Track dashboard view
        dashboardService.trackEvent(token, 'dashboard_view', {
          timestamp: new Date().toISOString(),
          isFirstLogin: response.data.user.isFirstLogin,
          userId: userId
        });
      } else {
        throw new Error(response.message || 'Erro ao carregar dashboard');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMessage);
      
      // If no cache and we have an error, show mock data for development
      setData(currentData => {
        if (!currentData) {
          return getMockDashboardData();
        }
        return currentData;
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [userId, getMockDashboardData]); // Adicionada dependência estável
  
  const refresh = useCallback(async () => {
    setRefreshing(true);
    await loadDashboardData(false);
  }, [loadDashboardData]);

  const markNotificationsAsRead = useCallback(async (notificationIds: string[]) => {
    try {
      const token = DashboardStorage.getAuthToken();
      if (!token) {
        throw new Error('Token de autenticação não encontrado');
      }

      await dashboardService.markNotificationsAsRead(token, { notificationIds });
      
      // Update local state usando callback para acessar estado atual
      setData(currentData => {
        if (!currentData) return currentData;
        
        const updatedNotifications = currentData.recentNotifications.map(notification => 
          notificationIds.includes(notification.id) 
            ? { ...notification, isRead: true }
            : notification
        );
        
        const updatedData = {
          ...currentData,
          recentNotifications: updatedNotifications
        };
        
        DashboardStorage.saveDashboardCache(userId, updatedData);
        return updatedData;
      });

      // Track event
      dashboardService.trackEvent(token, 'notifications_read', {
        notificationIds,
        count: notificationIds.length,
        timestamp: new Date().toISOString()
      });
    } catch (err) {
      console.error('Error marking notifications as read:', err);
      throw err;
    }
  }, [userId]); // Removida dependência instável 'data'

  const completeMission = useCallback(async (
    missionId: string, 
    timeSpent: number, 
    answers?: Record<string, unknown>
  ) => {
    try {
      const token = DashboardStorage.getAuthToken();
      if (!token) {
        throw new Error('Token de autenticação não encontrado');
      }

      const result = await dashboardService.completeMission(token, {
        missionId,
        timeSpent,
        answers
      });

      // Update local state usando callback para acessar estado atual
      if (result.success) {
        setData(currentData => {
          if (!currentData) return currentData;
          
          const updatedMissions = currentData.dailyMissions.map(mission =>
            mission.id === missionId
              ? { ...mission, isCompleted: true, completedAt: new Date().toISOString() }
              : mission
          );

          const updatedProgress = {
            ...currentData.progress,
            currentXP: currentData.progress.currentXP + (result.xpGained || 0),
            totalXP: currentData.progress.totalXP + (result.xpGained || 0),
            // Update level if level up occurred
            ...(result.levelUp && { currentLevel: currentData.progress.currentLevel + 1 })
          };

          const updatedData = {
            ...currentData,
            dailyMissions: updatedMissions,
            progress: updatedProgress
          };

          DashboardStorage.saveDashboardCache(userId, updatedData);
          return updatedData;
        });
      }

      // Track completion
      dashboardService.trackEvent(token, 'mission_completed', {
        missionId,
        timeSpent,
        xpGained: result.xpGained,
        levelUp: result.levelUp,
        newBadges: result.newBadges,
        timestamp: new Date().toISOString()
      });

      return result;
    } catch (err) {
      console.error('Error completing mission:', err);
      throw err;
    }
  }, [userId]); // Removida dependência instável 'data'

  // Load data on mount
  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  // Auto-refresh every 5 minutes if user is active
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        // User returned to tab, refresh data
        loadDashboardData(false);
      }
    };

    if (!loading && !error) {
      // Set up auto-refresh
      interval = setInterval(() => {
        if (document.visibilityState === 'visible') {
          loadDashboardData();
        }
      }, 5 * 60 * 1000); // 5 minutes

      // Listen for visibility changes
      document.addEventListener('visibilitychange', handleVisibilityChange);
    }

    return () => {
      if (interval) clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [loading, error, loadDashboardData]);

  return {
    data,
    loading,
    error,
    refreshing,
    refresh,
    markNotificationsAsRead,
    completeMission
  };
}

// Hook for managing user preferences
export function useUserPreferences() {
  const [preferences, setPreferences] = useState<Record<string, unknown> | null>(null);
  const [updating, setUpdating] = useState(false);

  const updatePreferences = useCallback(async (updates: Record<string, unknown>) => {
    try {
      setUpdating(true);
      const token = DashboardStorage.getAuthToken();
      if (!token) {
        throw new Error('Token de autenticação não encontrado');
      }

      await dashboardService.updatePreferences(token, updates);
      
      // Update local state
      setPreferences(prev => prev ? { ...prev, ...updates } : updates);
      
      // Track preferences change
      dashboardService.trackEvent(token, 'preferences_updated', {
        updates,
        timestamp: new Date().toISOString()
      });
    } catch (err) {
      console.error('Error updating preferences:', err);
      throw err;
    } finally {
      setUpdating(false);
    }
  }, []);

  return {
    preferences,
    updatePreferences,
    updating
  };
}
