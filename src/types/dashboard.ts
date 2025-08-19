import { UserProgress, DailyMission, Notification, UserBadge, UserStats } from './gamification';

export interface DashboardData {
  user: DashboardUser;
  progress: UserProgress;
  dailyMissions: DailyMission[];
  recentNotifications: Notification[];
  recentBadges: UserBadge[];
  stats: UserStats;
  recommendations: ActivityRecommendation[];
}

export interface DashboardUser {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
  isFirstLogin: boolean;
  preferences: UserPreferences;
  createdAt: string;
}

export interface UserPreferences {
  accessibility: {
    highContrast: boolean;
    largeText: boolean;
    reduceAnimations: boolean;
    screenReaderMode: boolean;
  };
  notifications: {
    dailyMissions: boolean;
    achievements: boolean;
    streaks: boolean;
    recommendations: boolean;
  };
  gamification: {
    showXP: boolean;
    showLevel: boolean;
    showBadges: boolean;
    showLeaderboard: boolean;
  };
}

export interface ActivityRecommendation {
  id: string;
  activityId: string;
  title: string;
  description: string;
  reason: string; // Por que foi recomendado
  estimatedDuration: number;
  xpReward: number;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  priority: number; // 1-10
  personaMatch: 'explorador' | 'transicao' | 'neurodivergente' | 'geral';
}

export interface MenuSection {
  id: string;
  title: string;
  icon: string;
  path: string;
  isActive: boolean;
  badge?: number; // Para notificações
  children?: MenuSection[];
}

// API Response Types
export interface DashboardApiResponse {
  success: boolean;
  data: DashboardData;
  message?: string;
}

export interface NotificationApiResponse {
  success: boolean;
  data: {
    notifications: Notification[];
    unreadCount: number;
    hasMore: boolean;
  };
  message?: string;
}

export interface ProgressApiResponse {
  success: boolean;
  data: UserProgress;
  message?: string;
}

// API Request Types
export interface UpdatePreferencesRequest {
  accessibility?: Partial<UserPreferences['accessibility']>;
  notifications?: Partial<UserPreferences['notifications']>;
  gamification?: Partial<UserPreferences['gamification']>;
}

export interface MarkNotificationReadRequest {
  notificationIds: string[];
}

export interface CompleteMissionRequest {
  missionId: string;
  timeSpent: number; // em segundos
  answers?: Record<string, unknown>; // Respostas específicas da missão
}
