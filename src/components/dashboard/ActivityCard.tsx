import React from 'react';
import Image from 'next/image';
import { Activity } from '@/types/activity';

interface ActivityCardProps {
  activity: Activity;
  onStart?: (id: string) => void; // mantido para compatibilidade, mas agora abre URL externa
  externalUrl?: string; // opcional para sobrescrever a URL padrão
}

export function ActivityCard({ activity, onStart, externalUrl }: ActivityCardProps) {
  const coverSrc = '/img-plataforma/game-gubi.png'; // imagem fixa da pasta public
  const targetUrl = externalUrl || 'https://discovery.gubi.com.br';

  const openExternal = () => {
    // Prioriza chamada onStart se fornecida para rastreamento, depois abre
    if (onStart) onStart(activity.id);
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  };
  
  return (
    <div
      className="group relative bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col cursor-pointer"
      onClick={openExternal}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openExternal(); } }}
      aria-label={`Abrir ${activity.title} em nova aba`}
    >
      <div className="relative w-full h-40 bg-gray-100 overflow-hidden">
        {/* Capa fixa */}
        <Image
          src={coverSrc}
          alt={activity.title}
          fill
          priority
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        {activity.difficulty && (
          <span className="absolute top-2 left-2 text-xs px-2 py-1 rounded-full bg-black/60 text-white capitalize">
            {activity.difficulty === 'easy' ? 'Fácil' : activity.difficulty === 'medium' ? 'Médio' : 'Difícil'}
          </span>
        )}
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-2">{activity.title}</h3>
        {activity.description && (
          <p className="text-xs text-gray-600 line-clamp-3 mb-3 flex-1">{activity.description}</p>
        )}
        <div className="mt-auto flex items-center justify-between">
          {activity.estimatedDuration && (
            <span className="text-[11px] text-gray-500">{activity.estimatedDuration} min</span>
          )}          
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); openExternal(); }}
            className="text-xs px-3 py-1.5 rounded-md bg-purple-600 text-white hover:bg-purple-700 transition-colors"
          >
            Abrir
          </button>
        </div>
      </div>
    </div>
  );
}
