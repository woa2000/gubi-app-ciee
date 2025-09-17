"use client";

import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ActivityCard } from '@/components/dashboard/ActivityCard';
import { Activity } from '@/types/activity';
import { useAuth } from '@/hooks/useAuth';
import { AlertCircle } from 'lucide-react';

// Mock temporário - substituir futuramente por chamada de API
const mockActivities: Activity[] = [
  {
    id: 'act-1',
    title: 'Game de Autoconhecimento: Quem Sou Eu?',
    description: 'Responda perguntas rápidas sobre seus interesses, pontos fortes e preferências para gerar um mini perfil personalizado e ganhar XP inicial.',
    imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=60',
    difficulty: 'easy',
    estimatedDuration: 6
  }
];

export default function ActivitiesPage() {
  const { getCurrentUser, isAuthenticated } = useAuth();
  const isAuth = isAuthenticated();
  const user = isAuth ? getCurrentUser() : null;
  
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-500" />
          <p className="text-gray-600">Usuário não autenticado</p>
        </div>
      </div>
    );
  }

  const handleStart = () => {
    // Mantido para compatibilidade / possíveis métricas futuras
    window.open('https://discovery.gubi.com.br', '_blank', 'noopener,noreferrer');
  };

  return (
    <DashboardLayout user={{
      id: user.id.toString(),
      name: user.name,
      email: user.email,
      // profileImage não está presente no objeto retornado por useAuth atualmente
      profileImage: undefined
    }}>
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Atividades</h1>
            <p className="text-sm text-gray-600 mt-1">Escolha uma atividade para começar e ganhar experiência.</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="text-sm px-3 py-2 rounded-md border border-gray-300 hover:bg-gray-100 transition-colors">Filtrar</button>
            <button className="text-sm px-3 py-2 rounded-md border border-purple-600 text-purple-600 hover:bg-purple-50 transition-colors">Minhas Atividades</button>
          </div>
        </div>

        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {mockActivities.map(activity => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              onStart={handleStart}
              externalUrl="https://discovery.gubi.com.br"
            />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
