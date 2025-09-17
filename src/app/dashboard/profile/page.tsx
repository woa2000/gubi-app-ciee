'use client';

import React, { useState } from 'react';
import { 
  User, 
  Settings, 
  Shield, 
  Clock, 
  ChevronLeft,
  AlertCircle,
  CheckCircle2,
  Loader2,
  FileText,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ProfileImageUploader from '@/components/profile/ProfileImageUploader';
import { ProfileBasicInfoForm } from '@/components/profile/ProfileBasicInfoForm';
import { ProfileInterestsForm } from '@/components/profile/ProfileInterestsForm';
import { useProfile } from '@/hooks/useProfile';
import { useAuth } from '@/hooks/useAuth';

type TabType = 'basic' | 'interests' | 'privacy';

export default function ProfilePage() {
  const { getCurrentUser } = useAuth();
  const { 
    profile, 
    loading, 
    saving, 
    uploading, 
    error,
    updateProfile,
    uploadImage,
    removeImage,
    isProfileComplete,
    validateField
  } = useProfile();
  
  const [activeTab, setActiveTab] = useState<TabType>('basic');
  const currentUser = getCurrentUser();

  // Função para abrir o relatório PDF
  const openReport = () => {
    if (profile?.discoveryProgress?.resume) {
      const reportPath = `/relatorio/${profile.discoveryProgress.resume}.pdf`;
      window.open(reportPath, '_blank');
    }
  };

  // Estados de loading
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center p-4">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-purple-600" />
          <p className="text-gray-600">Carregando perfil...</p>
        </div>
      </div>
    );
  }

  // Estado de erro
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h1 className="text-xl font-bold text-gray-900 mb-2">Erro ao Carregar Perfil</h1>
            <p className="text-gray-600 mb-6">{error}</p>
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Voltar ao Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!profile || !currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h1 className="text-xl font-bold text-gray-900 mb-2">Perfil Não Encontrado</h1>
            <p className="text-gray-600 mb-6">Não foi possível carregar os dados do seu perfil.</p>
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Voltar ao Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'basic' as TabType, label: 'Informações Básicas', icon: User },
    { id: 'interests' as TabType, label: 'Interesses e Habilidades', icon: Settings },
    { id: 'privacy' as TabType, label: 'Privacidade', icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center text-sm text-gray-600 hover:text-purple-600 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Voltar ao Dashboard
                </Link>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Meu Perfil</h1>
              <p className="text-gray-600 mt-1">
                Gerencie suas informações pessoais e preferências
              </p>
            </div>
            
            {/* Status do perfil */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-white shadow-sm border">
              {isProfileComplete ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-700">Perfil Completo</span>
                </>
              ) : (
                <>
                  <Clock className="w-4 h-4 text-orange-600" />
                  <span className="text-sm font-medium text-orange-700">Perfil Incompleto</span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar com foto e navegação */}
          <div className="lg:col-span-1 space-y-4">
            {/* Upload de foto */}
            <ProfileImageUploader
              currentImage={profile.profileImage}
              userName={profile.fullName}
              onImageUpload={uploadImage}
              onImageRemove={removeImage}
              uploading={uploading}
              disabled={saving}
            />

            {/* Botão Meu Relatório */}
            {profile.discoveryProgress?.resume && (
              <Card>
                <CardContent className="p-4">
                  <button
                    onClick={openReport}
                    className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                  >
                    <FileText className="w-5 h-5" />
                    <span>Meu Relatório</span>
                    <ExternalLink className="w-4 h-4" />
                  </button>
                  <p className="text-xs text-gray-600 text-center mt-2">
                    Visualize seu relatório de discovery completo
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Navegação */}
            <Card>
              <CardContent className="p-4">
                <nav className="space-y-1">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`
                          w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all
                          ${activeTab === tab.id
                            ? 'bg-purple-100 text-purple-700'
                            : 'text-gray-600 hover:bg-gray-100'
                          }
                        `}
                      >
                        <Icon className="w-4 h-4" />
                        {tab.label}
                      </button>
                    );
                  })}
                </nav>
              </CardContent>
            </Card>

            {/* Informações do perfil */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Resumo do Perfil</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Membro desde:</span>
                  <span className="font-medium">
                    {new Date(profile.createdAt).toLocaleDateString('pt-BR')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Último acesso:</span>
                  <span className="font-medium">
                    {profile.lastLoginAt 
                      ? new Date(profile.lastLoginAt).toLocaleDateString('pt-BR')
                      : 'Nunca'
                    }
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Interesses:</span>
                  <span className="font-medium">{profile.userInterests.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Habilidades:</span>
                  <span className="font-medium">{profile.userSkills.length}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Conteúdo principal */}
          <div className="lg:col-span-3">
            {activeTab === 'basic' && (
              <ProfileBasicInfoForm
                profile={profile}
                onSave={updateProfile}
                saving={saving}
                disabled={uploading}
                validateField={validateField}
              />
            )}

            {activeTab === 'interests' && (
              <ProfileInterestsForm
                profile={profile}
                onSave={updateProfile}
                saving={saving}
                disabled={uploading}
              />
            )}

            {activeTab === 'privacy' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Privacidade e Segurança
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Em Breve</h3>
                    <p className="text-gray-600 max-w-md mx-auto">
                      Configurações de privacidade, gerenciamento de dados e preferências de segurança 
                      estarão disponíveis em breve.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
