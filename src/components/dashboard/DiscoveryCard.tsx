'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, ExternalLink, Brain, CheckCircle2, Sparkles, Award } from 'lucide-react';
import Image from 'next/image';

interface DiscoveryCardProps {
  resume?: string | null;
  onViewReport?: () => void;
}

export const DiscoveryCard: React.FC<DiscoveryCardProps> = ({
  resume,
  onViewReport
}) => {
  // Função para abrir o relatório PDF
  const handleViewReport = () => {
    if (resume) {
      const reportPath = `/relatorio/${resume}.pdf`;
      window.open(reportPath, '_blank');
    }
  };

  const openReport = onViewReport || handleViewReport;

  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-purple-500 via-purple-600 to-blue-600 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 right-4 w-32 h-32 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-4 left-4 w-24 h-24 bg-yellow-300 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-blue-300 rounded-full blur-3xl"></div>
      </div>

      {/* Character Image - positioned on the right side */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-purple-600/20 to-purple-600/40"></div>
        <Image
          src="/img-plataforma/gubi-personagens.png"
          alt="Gubi Characters"
          width={300}
          height={400}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 scale-110 opacity-30 hover:opacity-40 hover:scale-115 transition-all duration-500"
          priority
        />
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-6 left-6 w-2 h-2 bg-yellow-300 rounded-full animate-pulse"></div>
        <div className="absolute top-12 right-8 w-1 h-1 bg-white rounded-full animate-ping"></div>
        <div className="absolute bottom-8 left-12 w-1.5 h-1.5 bg-blue-200 rounded-full animate-pulse delay-300"></div>
        <div className="absolute bottom-12 right-12 w-1 h-1 bg-purple-200 rounded-full animate-ping delay-500"></div>
      </div>

      <CardHeader className="relative pb-3 pt-6 z-10">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3 text-xl font-bold text-white drop-shadow-lg">
            <div className="relative">
              <Brain className="w-7 h-7 text-yellow-300" />
              <Sparkles className="w-3 h-3 text-yellow-200 absolute -top-1 -right-1 animate-pulse" />
            </div>
            Discovery Completo
          </CardTitle>
          <div className="flex items-center gap-1 px-3 py-1 bg-green-500/20 backdrop-blur-sm rounded-full border border-green-400/30">
            <CheckCircle2 className="w-4 h-4 text-green-300" />
            <span className="text-xs font-medium text-green-200">Concluído</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="relative space-y-6 pb-6 z-10">
        <div className="space-y-3">
          <div className="flex items-start gap-3 max-w-[60%]">
            <Award className="w-5 h-5 text-yellow-300 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-white font-semibold text-sm mb-1 drop-shadow-md">
                Parabéns! Autoconhecimento concluído
              </h3>
              <p className="text-purple-100 text-sm leading-relaxed drop-shadow-sm">
                Você completou seu processo de discovery com sucesso. Seu relatório personalizado 
                está pronto com insights únicos sobre seu perfil profissional.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3 max-w-[70%]">
          <button
            onClick={openReport}
            className="group w-full relative overflow-hidden bg-white/95 hover:bg-white text-purple-700 font-semibold rounded-xl p-4 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl backdrop-blur-sm"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center justify-center gap-3">
              <FileText className="w-5 h-5 text-purple-600 group-hover:scale-110 transition-transform duration-200" />
              <span className="text-base">Ver Meu Relatório</span>
              <ExternalLink className="w-4 h-4 text-purple-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200" />
            </div>
          </button>
        </div>

        {/* Success indicators */}
        <div className="grid grid-cols-3 gap-3 pt-2 max-w-[70%]">
          <div className="text-center">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-1 backdrop-blur-sm">
              <CheckCircle2 className="w-4 h-4 text-green-300" />
            </div>
            <span className="text-xs text-purple-100 drop-shadow-sm">Perfil</span>
          </div>
          <div className="text-center">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-1 backdrop-blur-sm">
              <CheckCircle2 className="w-4 h-4 text-green-300" />
            </div>
            <span className="text-xs text-purple-100 drop-shadow-sm">Habilidades</span>
          </div>
          <div className="text-center">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-1 backdrop-blur-sm">
              <CheckCircle2 className="w-4 h-4 text-green-300" />
            </div>
            <span className="text-xs text-purple-100 drop-shadow-sm">Objetivos</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};