import { getApiBaseUrl } from '@/lib/apiBase';
import { 
  DashboardApiResponse, 
  NotificationApiResponse, 
  ProgressApiResponse,
  UpdatePreferencesRequest,
  MarkNotificationReadRequest,
  CompleteMissionRequest 
} from '@/types/dashboard';

// Dashboard API Service
export class DashboardService {
  private baseUrl = getApiBaseUrl();

  /**
   * Busca dados completos do dashboard do usuário
   */
  async getDashboardData(token: string): Promise<DashboardApiResponse> {
    const response = await fetch(`${this.baseUrl}/v1/dashboard`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Erro ao carregar dashboard');
    }

    return data;
  }

  /**
   * Busca notificações do usuário com paginação
   */
  async getNotifications(
    token: string, 
    page = 1, 
    limit = 20, 
    unreadOnly = false
  ): Promise<NotificationApiResponse> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      unreadOnly: unreadOnly.toString(),
    });

    const response = await fetch(`${this.baseUrl}/v1/dashboard/notifications?${params}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Erro ao carregar notificações');
    }

    return data;
  }

  /**
   * Marca notificações como lidas
   */
  async markNotificationsAsRead(
    token: string, 
    request: MarkNotificationReadRequest
  ): Promise<{ success: boolean; message: string }> {
    const response = await fetch(`${this.baseUrl}/v1/dashboard/notifications/mark-read`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Erro ao marcar notificações');
    }

    return data;
  }

  /**
   * Atualiza progresso do usuário
   */
  async getProgress(token: string): Promise<ProgressApiResponse> {
    const response = await fetch(`${this.baseUrl}/v1/dashboard/progress`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Erro ao carregar progresso');
    }

    return data;
  }

  /**
   * Completa uma missão diária
   */
  async completeMission(
    token: string, 
    request: CompleteMissionRequest
  ): Promise<{ 
    success: boolean; 
    message: string; 
    xpGained: number; 
    levelUp?: boolean;
    newBadges?: string[];
  }> {
    const response = await fetch(`${this.baseUrl}/v1/dashboard/missions/complete`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Erro ao completar missão');
    }

    return data;
  }

  /**
   * Atualiza preferências do usuário
   */
  async updatePreferences(
    token: string, 
    request: UpdatePreferencesRequest
  ): Promise<{ success: boolean; message: string }> {
    const response = await fetch(`${this.baseUrl}/v1/dashboard/preferences`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Erro ao atualizar preferências');
    }

    return data;
  }

  /**
   * Busca recomendações personalizadas
   */
  async getRecommendations(
    token: string,
    limit = 5
  ): Promise<{
    success: boolean;
    data: Array<{
      id: string;
      activityId: string;
      title: string;
      description: string;
      reason: string;
      estimatedDuration: number;
      xpReward: number;
      difficulty: 'easy' | 'medium' | 'hard';
      category: string;
      priority: number;
    }>;
  }> {
    const response = await fetch(`${this.baseUrl}/v1/dashboard/recommendations?limit=${limit}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Erro ao carregar recomendações');
    }

    return data;
  }

  /**
   * Registra evento de analytics comportamental
   */
  async trackEvent(
    token: string,
    eventType: string,
    eventData: Record<string, any>,
    timestamp = new Date().toISOString()
  ): Promise<{ success: boolean }> {
    try {
      const response = await fetch(`${this.baseUrl}/v1/analytics/track`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventType,
          eventData,
          timestamp,
        }),
      });

      if (!response.ok) {
        // Analytics não deve bloquear o fluxo principal
        console.warn('Failed to track event:', eventType, response.status);
        return { success: false };
      }

      return { success: true };
    } catch (error) {
      // Analytics não deve bloquear o fluxo principal
      console.warn('Failed to track event:', eventType, error);
      return { success: false };
    }
  }
}

// Singleton instance
export const dashboardService = new DashboardService();

// Utility functions for local storage management
export const DashboardStorage = {
  /**
   * Salva dados do dashboard no localStorage para cache offline
   */
  saveDashboardCache(userId: string, data: any) {
    try {
      const cacheData = {
        data,
        timestamp: Date.now(),
        userId
      };
      localStorage.setItem(`dashboard_cache_${userId}`, JSON.stringify(cacheData));
    } catch (error) {
      console.warn('Failed to save dashboard cache:', error);
    }
  },

  /**
   * Recupera dados do dashboard do cache (máximo 5 minutos)
   */
  getDashboardCache(userId: string) {
    try {
      const cached = localStorage.getItem(`dashboard_cache_${userId}`);
      if (!cached) return null;

      const cacheData = JSON.parse(cached);
      const fiveMinutes = 5 * 60 * 1000;
      
      if (Date.now() - cacheData.timestamp > fiveMinutes) {
        localStorage.removeItem(`dashboard_cache_${userId}`);
        return null;
      }

      return cacheData.data;
    } catch (error) {
      console.warn('Failed to get dashboard cache:', error);
      return null;
    }
  },

  /**
   * Salva token de autenticação
   */
  saveAuthToken(token: string) {
    try {
      localStorage.setItem('auth_token', token);
    } catch (error) {
      console.warn('Failed to save auth token:', error);
    }
  },

  /**
   * Recupera token de autenticação
   */
  getAuthToken(): string | null {
    try {
      return localStorage.getItem('auth_token');
    } catch (error) {
      console.warn('Failed to get auth token:', error);
      return null;
    }
  },

  /**
   * Remove token de autenticação
   */
  removeAuthToken() {
    try {
      localStorage.removeItem('auth_token');
    } catch (error) {
      console.warn('Failed to remove auth token:', error);
    }
  },

  /**
   * Limpa todo o cache do dashboard
   */
  clearDashboardCache(userId?: string) {
    try {
      if (userId) {
        localStorage.removeItem(`dashboard_cache_${userId}`);
      } else {
        // Remove todos os caches de dashboard
        Object.keys(localStorage).forEach(key => {
          if (key.startsWith('dashboard_cache_')) {
            localStorage.removeItem(key);
          }
        });
      }
    } catch (error) {
      console.warn('Failed to clear dashboard cache:', error);
    }
  }
};
