'use client';

import React from 'react';
import { Clock, Star, ArrowRight, Target, TrendingUp } from 'lucide-react';

interface DailyMission {
  id: string;
  title: string;
  description: string;
  estimatedDuration: number;
  xpReward: number;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  isCompleted: boolean;
}

interface WelcomeCardProps {
  userName: string;
  isFirstLogin: boolean;
  currentStreak: number;
  currentLevel: number;
}

export function WelcomeCard({ userName, isFirstLogin, currentStreak, currentLevel }: WelcomeCardProps) {
  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-2">
            {getTimeBasedGreeting()}, {userName}! 👋
          </h1>
          
          {isFirstLogin ? (
            <p className="text-purple-100 mb-4">
              Seja bem-vindo à Gubi! Estamos animados para começar esta jornada de descoberta e crescimento com você.
            </p>
          ) : (
            <p className="text-purple-100 mb-4">
              Continue sua jornada de autoconhecimento e desenvolvimento. Você está indo muito bem!
            </p>
          )}

          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-purple-200" />
              <span className="text-sm">
                <span className="font-semibold">Nível {currentLevel}</span>
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-300" />
              <span className="text-sm">
                <span className="font-semibold">{currentStreak} dias</span> de sequência
              </span>
            </div>
          </div>
        </div>

        <div className="hidden md:block">
          <div className="w-32 h-32 bg-white bg-opacity-10 rounded-full flex items-center justify-center">
            <div className="text-4xl">🎯</div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface DailyMissionsCardProps {
  missions: DailyMission[];
  onStartMission: (missionId: string) => void;
}

export function DailyMissionsCard({ missions, onStartMission }: DailyMissionsCardProps) {
  const completedMissions = missions.filter(m => m.isCompleted).length;
  const completionPercentage = missions.length > 0 ? (completedMissions / missions.length) * 100 : 0;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'Fácil';
      case 'medium': return 'Médio';
      case 'hard': return 'Difícil';
      default: return difficulty;
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Missões do Dia</h2>
          <p className="text-gray-600 text-sm">
            {completedMissions} de {missions.length} concluídas
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="w-16 h-16 relative">
            <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
              <circle
                cx="32"
                cy="32"
                r="28"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="6"
              />
              <circle
                cx="32"
                cy="32"
                r="28"
                fill="none"
                stroke="#8b5cf6"
                strokeWidth="6"
                strokeDasharray={`${completionPercentage * 1.76} 176`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-semibold text-gray-700">
                {Math.round(completionPercentage)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {missions.slice(0, 3).map((mission) => (
          <div
            key={mission.id}
            className={`p-4 rounded-lg border-2 transition-all ${
              mission.isCompleted 
                ? 'border-green-200 bg-green-50' 
                : 'border-gray-200 bg-gray-50 hover:border-purple-200 hover:bg-purple-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className={`font-medium ${
                    mission.isCompleted ? 'text-green-800' : 'text-gray-900'
                  }`}>
                    {mission.title}
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    getDifficultyColor(mission.difficulty)
                  }`}>
                    {getDifficultyText(mission.difficulty)}
                  </span>
                </div>
                
                <p className={`text-sm mb-2 ${
                  mission.isCompleted ? 'text-green-600' : 'text-gray-600'
                }`}>
                  {mission.description}
                </p>
                
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{mission.estimatedDuration} min</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4" />
                    <span>+{mission.xpReward} XP</span>
                  </div>
                  <span className="text-purple-600 font-medium">#{mission.category}</span>
                </div>
              </div>

              <div className="ml-4">
                {mission.isCompleted ? (
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                ) : (
                  <button
                    onClick={() => onStartMission(mission.id)}
                    className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
                  >
                    <span>Começar</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {missions.length > 3 && (
        <div className="mt-4 text-center">
          <button className="text-purple-600 hover:text-purple-800 font-medium text-sm">
            Ver todas as missões ({missions.length - 3} restantes)
          </button>
        </div>
      )}
    </div>
  );
}

interface ProgressCardProps {
  currentLevel: number;
  currentXP: number;
  xpToNextLevel: number;
  currentStreak: number;
  longestStreak: number;
}

export function ProgressCard({ 
  currentLevel, 
  currentXP, 
  xpToNextLevel, 
  currentStreak, 
  longestStreak 
}: ProgressCardProps) {
  const progressPercentage = xpToNextLevel > 0 ? ((currentXP / (currentXP + xpToNextLevel)) * 100) : 100;

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Seu Progresso</h2>
      
      <div className="space-y-6">
        {/* Level Progress */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Nível {currentLevel}</span>
            <span className="text-sm text-gray-500">{currentXP} / {currentXP + xpToNextLevel} XP</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Streak */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-700">Sequência Atual</p>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-orange-500" />
              <span className="text-2xl font-bold text-gray-900">{currentStreak}</span>
              <span className="text-gray-500">dias</span>
            </div>
          </div>
          
          <div className="text-right">
            <p className="text-sm font-medium text-gray-700">Melhor Sequência</p>
            <div className="flex items-center justify-end space-x-2">
              <span className="text-lg font-semibold text-gray-900">{longestStreak}</span>
              <span className="text-gray-500 text-sm">dias</span>
            </div>
          </div>
        </div>

        {/* Achievement Progress */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
              🏆
            </div>
            <div>
              <p className="font-medium text-gray-900">Próxima conquista</p>
              <p className="text-sm text-gray-600">Complete 5 atividades para desbloquear &quot;Persistente&quot;</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
