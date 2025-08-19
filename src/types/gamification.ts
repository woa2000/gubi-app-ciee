export interface UserProgress {
  id: string;
  userId: string;
  currentLevel: number;
  totalXP: number;
  currentXP: number;
  xpToNextLevel: number;
  currentStreak: number;
  longestStreak: number;
  lastActivityDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'exploration' | 'consistency' | 'achievement' | 'social' | 'skill';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  requirements: BadgeRequirement[];
  xpReward: number;
  createdAt: string;
}

export interface BadgeRequirement {
  type: 'activities_completed' | 'streak_days' | 'level_reached' | 'skill_improved' | 'custom';
  value: number;
  description: string;
}

export interface UserBadge {
  id: string;
  userId: string;
  badgeId: string;
  earnedAt: string;
  badge: Badge;
}

export interface DailyMission {
  id: string;
  title: string;
  description: string;
  type: 'quiz' | 'simulation' | 'soft_skill' | 'reading' | 'reflection';
  estimatedDuration: number; // em minutos
  xpReward: number;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  isCompleted: boolean;
  completedAt?: string;
  expiresAt: string;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  type: 'quiz' | 'simulation' | 'soft_skill' | 'reading' | 'reflection';
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedDuration: number;
  xpReward: number;
  badgeRewards?: string[];
  prerequisites?: string[];
  isUnlocked: boolean;
  isCompleted: boolean;
  completedAt?: string;
  progress?: number; // 0-100
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'mission' | 'achievement' | 'streak' | 'level_up' | 'reminder' | 'welcome';
  title: string;
  message: string;
  icon?: string;
  priority: 'low' | 'medium' | 'high';
  isRead: boolean;
  actionUrl?: string;
  actionText?: string;
  createdAt: string;
  expiresAt?: string;
}

export interface UserStats {
  totalActivitiesCompleted: number;
  totalTimeSpent: number; // em minutos
  averageSessionTime: number; // em minutos
  favoriteCategoryId: string;
  weakestSkillArea: string;
  strongestSkillArea: string;
  completionRate: number; // 0-100
  lastLoginAt: string;
  joinedAt: string;
}

// Enums para facilitar o desenvolvimento
export const BADGE_CATEGORIES = {
  EXPLORATION: 'exploration',
  CONSISTENCY: 'consistency', 
  ACHIEVEMENT: 'achievement',
  SOCIAL: 'social',
  SKILL: 'skill'
} as const;

export const ACTIVITY_TYPES = {
  QUIZ: 'quiz',
  SIMULATION: 'simulation',
  SOFT_SKILL: 'soft_skill',
  READING: 'reading',
  REFLECTION: 'reflection'
} as const;

export const NOTIFICATION_TYPES = {
  MISSION: 'mission',
  ACHIEVEMENT: 'achievement',
  STREAK: 'streak',
  LEVEL_UP: 'level_up',
  REMINDER: 'reminder',
  WELCOME: 'welcome'
} as const;

export const DIFFICULTY_LEVELS = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard'
} as const;

export const PRIORITIES = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high'
} as const;
