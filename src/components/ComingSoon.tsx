'use client';

import React from 'react';
import { Clock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface ComingSoonProps {
  title: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
  backLink?: string;
  backText?: string;
}

export function ComingSoon({ 
  title, 
  description = "Esta funcionalidade está sendo desenvolvida e estará disponível em breve.",
  icon: Icon,
  backLink = "/dashboard",
  backText = "Voltar ao Dashboard"
}: ComingSoonProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          {/* Icon */}
          <div className="mb-6 flex justify-center">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center">
              {Icon ? (
                <Icon className="w-10 h-10 text-purple-600" />
              ) : (
                <Clock className="w-10 h-10 text-purple-600" />
              )}
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            {title}
          </h1>

          {/* Em Breve Badge */}
          <div className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 rounded-full text-sm font-medium mb-4">
            <Clock className="w-4 h-4 mr-2" />
            Em Breve
          </div>

          {/* Description */}
          <p className="text-gray-600 mb-8 leading-relaxed">
            {description}
          </p>

          {/* Actions */}
          <div className="space-y-3">
            <Link
              href={backLink}
              className="inline-flex items-center justify-center w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {backText}
            </Link>

            <button
              onClick={() => {
                // TODO: Implement notification subscription
                alert('Em breve você poderá se inscrever para receber notificações sobre esta funcionalidade!');
              }}
              className="w-full px-6 py-2 text-purple-600 font-medium rounded-lg hover:bg-purple-50 transition-colors duration-200 border border-purple-200"
            >
              Notificar quando estiver pronto
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="text-sm text-gray-500 mt-6">
          Estamos trabalhando para trazer as melhores funcionalidades para você! 🚀
        </p>
      </div>
    </div>
  );
}
