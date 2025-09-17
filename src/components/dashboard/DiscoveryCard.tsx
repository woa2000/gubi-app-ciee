'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, ExternalLink, Brain, CheckCircle2 } from 'lucide-react';

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
    <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Brain className="w-5 h-5 text-purple-600" />
          Discovery Completo
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 text-green-700">
          <CheckCircle2 className="w-4 h-4" />
          <span className="text-sm font-medium">Autoconhecimento concluído</span>
        </div>
        
        <p className="text-sm text-gray-600">
          Parabéns! Você completou seu processo de discovery. Seu relatório personalizado 
          está disponível com insights sobre seu perfil profissional.
        </p>

        <div className="space-y-2">
          <button
            onClick={openReport}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
          >
            <FileText className="w-4 h-4" />
            <span>Ver Meu Relatório</span>
            <ExternalLink className="w-3 h-3" />
          </button>
          
          <p className="text-xs text-gray-500 text-center">
            Relatório #{resume} • PDF Personalizado
          </p>
        </div>
      </CardContent>
    </Card>
  );
};