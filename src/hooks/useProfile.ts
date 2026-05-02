import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { useAuth } from './useAuth';
import { profileService, ProfileCache } from '@/services/profile';
import { getApiBaseUrl } from '@/lib/apiBase';
import { 
  UserProfile, 
  EditableProfileFields,
  ProfileValidation 
} from '@/types/profile';

interface UseProfileReturn {
  // Estado
  profile: UserProfile | null;
  loading: boolean;
  saving: boolean;
  uploading: boolean;
  error: string | null;
  apiError: string | null;
  
  // Ações
  refreshProfile: () => Promise<void>;
  updateProfile: (updates: EditableProfileFields) => Promise<boolean>;
  uploadImage: (file: File) => Promise<boolean>;
  removeImage: () => Promise<boolean>;
  
  // Utilidades
  isProfileComplete: boolean;
  hasUnsavedChanges: boolean;
  validateField: (field: string, value: string | number | boolean | null | undefined | string[]) => string | null;
}

/**
 * Hook para gerenciar perfil do usuário com integração da Gubi Server API
 * Inclui cache local, validações e tratamento de erros avançado
 */
export const useProfile = (): UseProfileReturn => {
  const { getAuthToken, getCurrentUser } = useAuth();
  const currentUser = getCurrentUser();
  const token = getAuthToken();
  const currentUserId = currentUser?.id;
  
  // Estado do hook
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Log de debugging para integração da API
  useEffect(() => {
    const useRealApi = process.env.NEXT_PUBLIC_USE_REAL_API === 'true';
    console.log('[useProfile] 🔧 Configuração da integração:', {
      useRealApi,
      hasUser: !!currentUser,
      hasToken: !!token,
      userId: currentUserId,
      apiBaseUrl: useRealApi ? getApiBaseUrl() : 'mock',
      NEXT_PUBLIC_USE_REAL_API: process.env.NEXT_PUBLIC_USE_REAL_API
    });
  }, [currentUserId, token]);

  /**
   * Busca perfil do usuário (com cache offline-first)
   */
  const refreshProfile = useCallback(async (): Promise<void> => {
    const user = getCurrentUser();
    const authToken = getAuthToken();
    
    if (!user || !authToken) {
      setError('Usuário não autenticado');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Tentar cache primeiro
      const cachedProfile = ProfileCache.getProfile(user.id.toString());
      if (cachedProfile) {
        setProfile(cachedProfile);
        setLoading(false);
        
        // Buscar atualização em background
        profileService.getUserProfile(authToken)
          .then(response => {
            if (response.success) {
              setProfile(response.data);
              ProfileCache.saveProfile(user.id.toString(), response.data);
            }
          })
          .catch(error => {
            console.warn('Erro ao atualizar perfil em background:', error);
          });
        
        return;
      }

      // Buscar do servidor
      console.log('[useProfile] 📡 Buscando perfil do servidor...');
      const response = await profileService.getUserProfile(authToken);
      console.log('[useProfile] 📦 Resposta da API:', { 
        success: response.success, 
        hasData: !!response.data,
        dataKeys: response.data ? Object.keys(response.data) : []
      });
      
      if (response.success) {
        console.log('[useProfile] ✅ Perfil carregado com sucesso:', response.data);
        setProfile(response.data);
        ProfileCache.saveProfile(user.id.toString(), response.data);
      } else {
        throw new Error(response.message || 'Erro ao carregar perfil');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      console.error('Erro ao carregar perfil:', error);
      
      // Tratamento específico de erros de API
      if (error instanceof Error) {
        if (error.message.includes('Sessão expirada')) {
          setApiError('Sua sessão expirou. Por favor, faça login novamente.');
          setError('Sessão expirada');
        } else if (error.message.includes('conexão') || error.message.includes('fetch')) {
          setApiError('Problema de conexão. Tentando usar dados salvos...');
          setError('Erro de conexão');
          
          // Tentar usar cache como fallback
          const cachedProfile = user ? ProfileCache.getProfile(user.id.toString()) : null;
          if (cachedProfile) {
            console.log('📦 Usando perfil do cache offline');
            setProfile(cachedProfile);
          }
        } else if (error.message.includes('não encontrado')) {
          setApiError('Perfil não encontrado. Entre em contato com o suporte.');
          setError('Perfil não encontrado');
        } else {
          setApiError(errorMessage);
          setError(errorMessage);
        }
      } else {
        setApiError('Erro desconhecido ao carregar perfil');
        setError(errorMessage);
      }
      
      toast.error('Erro ao carregar perfil. Verifique sua conexão.');
    } finally {
      setLoading(false);
    }
  }, [getCurrentUser, getAuthToken]);

  /**
   * Atualiza campos do perfil
   */
  const updateProfile = useCallback(async (updates: EditableProfileFields): Promise<boolean> => {
    const user = getCurrentUser();
    const authToken = getAuthToken();
    
    if (!user || !authToken) {
      setApiError('Usuário não está autenticado');
      toast.error('Usuário não autenticado');
      return false;
    }

    try {
      setSaving(true);
      setError(null);
      setApiError(null);

      // Validar campos antes de enviar
      const validationErrors = validateUpdates(updates);
      if (validationErrors.length > 0) {
        toast.error(`Erro de validação: ${validationErrors.join(', ')}`);
        return false;
      }

      const response = await profileService.updateProfile(authToken, updates);
      
      if (response.success) {
        setProfile(response.data.updatedProfile);
        ProfileCache.saveProfile(user.id.toString(), response.data.updatedProfile);
        setHasUnsavedChanges(false);
        
        toast.success('Perfil atualizado com sucesso!');
        return true;
      } else {
        throw new Error(response.message || 'Erro ao atualizar perfil');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      console.error('Erro ao atualizar perfil:', error);
      
      // Tratamento específico de erros da API
      if (error instanceof Error) {
        if (error.message.includes('401') || error.message.includes('Unauthorized')) {
          setApiError('Sessão expirada. Faça login novamente.');
          toast.error('Sessão expirada. Redirecionando para login...');
          // Possível redirecionamento para login aqui
        } else if (error.message.includes('403') || error.message.includes('Forbidden')) {
          setApiError('Acesso negado para atualizar o perfil');
          toast.error('Sem permissão para atualizar o perfil');
        } else if (error.message.includes('422') || error.message.includes('validation')) {
          setApiError('Dados inválidos. Verifique os campos preenchidos');
          toast.error('Dados inválidos. Verifique os campos');
        } else if (error.message.includes('network') || error.message.includes('fetch')) {
          setApiError('Problema de conexão. Tente novamente');
          toast.error('Erro de conexão. Verifique sua internet');
          setError(errorMessage);
        } else {
          setApiError('Erro no servidor. Tente novamente mais tarde');
          setError(errorMessage);
        }
      } else {
        setApiError('Erro desconhecido ao atualizar perfil');
        setError(errorMessage);
      }
      
      return false;
    } finally {
      setSaving(false);
    }
  }, [getCurrentUser, getAuthToken]);

  /**
   * Upload de imagem de perfil
   */
  const uploadImage = useCallback(async (file: File): Promise<boolean> => {
    const authToken = getAuthToken();
    const user = getCurrentUser();
    
    if (!authToken) {
      setApiError('Usuário não está autenticado');
      toast.error('Usuário não autenticado');
      return false;
    }

    try {
      setUploading(true);
      setError(null);
      setApiError(null);

      const response = await profileService.uploadProfileImage(authToken, file);
      
      if (response.success && profile) {
        const updatedProfile = { ...profile, profileImage: response.imageUrl };
        setProfile(updatedProfile);
        
        if (user) {
          ProfileCache.saveProfile(user.id.toString(), updatedProfile);
        }
        
        toast.success('Foto atualizada com sucesso!');
        return true;
      } else {
        throw new Error(response.message || 'Erro ao fazer upload da imagem');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      console.error('Erro no upload da imagem:', error);
      
      // Tratamento específico de erros da API
      if (error instanceof Error) {
        if (error.message.includes('401') || error.message.includes('Unauthorized')) {
          setApiError('Sessão expirada. Faça login novamente.');
          toast.error('Sessão expirada. Redirecionando para login...');
        } else if (error.message.includes('413') || error.message.includes('too large')) {
          setApiError('Arquivo muito grande. Máximo 5MB');
          toast.error('Arquivo muito grande. Escolha uma imagem menor');
        } else if (error.message.includes('415') || error.message.includes('unsupported')) {
          setApiError('Formato de imagem não suportado');
          toast.error('Formato não suportado. Use JPG, PNG ou WebP');
        } else if (error.message.includes('network') || error.message.includes('fetch')) {
          setApiError('Problema de conexão. Tente novamente');
          toast.error('Erro de conexão. Verifique sua internet');
          setError(errorMessage);
        } else {
          setApiError('Erro no servidor ao fazer upload');
          setError(errorMessage);
        }
      } else {
        setApiError('Erro desconhecido no upload da imagem');
        setError(errorMessage);
      }
      
      return false;
    } finally {
      setUploading(false);
    }
  }, [getAuthToken, getCurrentUser, profile]);

  /**
   * Remove imagem de perfil
   */
  const removeImage = useCallback(async (): Promise<boolean> => {
    const authToken = getAuthToken();
    const user = getCurrentUser();
    
    if (!authToken) {
      setApiError('Usuário não está autenticado');
      toast.error('Usuário não autenticado');
      return false;
    }

    try {
      setUploading(true);
      setError(null);
      setApiError(null);

      const response = await profileService.removeProfileImage(authToken);
      
      if (response.success && profile) {
        const updatedProfile = { ...profile, profileImage: undefined };
        setProfile(updatedProfile);
        
        if (user) {
          ProfileCache.saveProfile(user.id.toString(), updatedProfile);
        }
        
        toast.success('Foto removida com sucesso!');
        return true;
      } else {
        throw new Error(response.message || 'Erro ao remover imagem');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      console.error('Erro ao remover imagem:', error);
      
      // Tratamento específico de erros da API
      if (error instanceof Error) {
        if (error.message.includes('401') || error.message.includes('Unauthorized')) {
          setApiError('Sessão expirada. Faça login novamente.');
          toast.error('Sessão expirada. Redirecionando para login...');
        } else if (error.message.includes('404') || error.message.includes('not found')) {
          setApiError('Nenhuma imagem encontrada para remover');
          toast.error('Nenhuma imagem encontrada');
        } else if (error.message.includes('network') || error.message.includes('fetch')) {
          setApiError('Problema de conexão. Tente novamente');
          toast.error('Erro de conexão. Verifique sua internet');
          setError(errorMessage);
        } else {
          setApiError('Erro no servidor ao remover imagem');
          setError(errorMessage);
        }
      } else {
        setApiError('Erro desconhecido ao remover imagem');
        setError(errorMessage);
      }
      
      return false;
    } finally {
      setUploading(false);
    }
  }, [getAuthToken, getCurrentUser, profile]);

  /**
   * Validador de campo individual
   */
  const validateField = useCallback((field: string, value: unknown): string | null => {
    switch (field) {
      case 'fullName':
        if (!value || typeof value !== 'string' || value.trim().length < 2) {
          return 'Nome deve ter pelo menos 2 caracteres';
        }
        if (value.length > 100) {
          return 'Nome não pode ter mais de 100 caracteres';
        }
        break;
        
      case 'email':
        if (!value || typeof value !== 'string' || !ProfileValidation.isValidEmail(value)) {
          return 'E-mail inválido';
        }
        break;
        
      case 'phone':
        if (value && typeof value === 'string' && !ProfileValidation.isValidPhone(value)) {
          return 'Telefone inválido';
        }
        break;
        
      case 'birthDate':
        if (value && typeof value === 'string' && !ProfileValidation.isValidBirthDate(value)) {
          return 'Data de nascimento inválida (mínimo 16 anos)';
        }
        break;
        
      default:
        return null;
    }
    
    return null;
  }, []);

  // Carregar perfil na inicialização
  useEffect(() => {
    const loadProfile = async () => {
      if (!currentUser || !token) {
        setLoading(false);
        setProfile(null);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Tentar cache primeiro
        const cachedProfile = ProfileCache.getProfile(currentUser.id.toString());
        if (cachedProfile) {
          setProfile(cachedProfile);
          setLoading(false);
          
          // Buscar atualização em background
          profileService.getUserProfile(token)
            .then(response => {
              if (response.success) {
                setProfile(response.data);
                ProfileCache.saveProfile(currentUser.id.toString(), response.data);
              }
            })
            .catch(error => {
              console.warn('Erro ao atualizar perfil em background:', error);
            });
          
          return;
        }

        // Buscar do servidor
        const response = await profileService.getUserProfile(token);
        
        if (response.success) {
          setProfile(response.data);
          ProfileCache.saveProfile(currentUser.id.toString(), response.data);
        } else {
          throw new Error(response.message || 'Erro ao carregar perfil');
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
        setError(errorMessage);
        console.error('Erro ao carregar perfil:', error);
        
        toast.error('Erro ao carregar perfil. Verifique sua conexão.');
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [currentUserId, token]);

  // Utilitários computados
  const isProfileComplete = profile ? ProfileValidation.isProfileComplete(profile) : false;

  return {
    // Estado
    profile,
    loading,
    saving,
    uploading,
    error,
    apiError,
    
    // Ações
    refreshProfile,
    updateProfile,
    uploadImage,
    removeImage,
    
    // Utilidades
    isProfileComplete,
    hasUnsavedChanges,
    validateField
  };
};

/**
 * Função auxiliar para validar atualizações
 */
function validateUpdates(updates: EditableProfileFields): string[] {
  const errors: string[] = [];
  
  if (updates.fullName !== undefined) {
    if (!updates.fullName || updates.fullName.trim().length < 2) {
      errors.push('Nome inválido');
    }
  }
  
  if (updates.phone !== undefined && updates.phone) {
    if (!ProfileValidation.isValidPhone(updates.phone)) {
      errors.push('Telefone inválido');
    }
  }
  
  if (updates.birthDate !== undefined && updates.birthDate) {
    if (!ProfileValidation.isValidBirthDate(updates.birthDate)) {
      errors.push('Data de nascimento inválida');
    }
  }
  
  return errors;
}
