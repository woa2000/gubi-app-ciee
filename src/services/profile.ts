import { getApiBaseUrl } from '@/lib/apiBase';
import { 
  UserProfile, 
  EditableProfileFields,
  ProfileApiResponse,
  ProfileUpdateApiResponse 
} from '@/types/profile';
import { mockProfileService } from './mockProfile';
import { GubiServerProfileService } from './gubiServerProfile';

/**
 * Serviço para gerenciar operações de perfil do usuário
 * Segue os padrões de código definidos em CODE_GUIDELINES.md
 */
export class ProfileService {
  private baseUrl = getApiBaseUrl();
  private gubiServerService = new GubiServerProfileService();
  private useMockService = process.env.NEXT_PUBLIC_USE_REAL_API !== 'true';

  constructor() {
    // Log de debugging para configuração
    console.log('🔧 [ProfileService] Configuração:', {
      NEXT_PUBLIC_USE_REAL_API: process.env.NEXT_PUBLIC_USE_REAL_API,
      NEXT_PUBLIC_DEV_MODE: process.env.NEXT_PUBLIC_DEV_MODE,
      NEXT_PUBLIC_API_URL_PROD: process.env.NEXT_PUBLIC_API_URL_PROD,
      useMockService: this.useMockService,
      baseUrl: this.baseUrl
    });
  }

  /**
   * Busca o perfil completo do usuário autenticado
   * @param token Token de autenticação JWT
   * @returns Dados completos do perfil do usuário
   */
  async getUserProfile(token: string): Promise<ProfileApiResponse> {
    if (this.useMockService) {
      console.log('🔄 Usando serviço mock para perfil');
      return mockProfileService.getUserProfile(token);
    }

    console.log('🌐 Usando API real Gubi Server para perfil');
    return this.gubiServerService.getUserProfile(token);
  }

  /**
   * Atualiza campos específicos do perfil do usuário
   * @param token Token de autenticação JWT
   * @param updates Campos a serem atualizados
   * @returns Perfil atualizado e log de mudanças
   */
  async updateProfile(
    token: string, 
    updates: EditableProfileFields
  ): Promise<ProfileUpdateApiResponse> {
    if (this.useMockService) {
      console.log('🔄 Usando serviço mock para atualização');
      return mockProfileService.updateProfile(token, updates);
    }

    console.log('🌐 Usando API real Gubi Server para atualização');
    return this.gubiServerService.updateProfile(token, updates);
  }

  /**
   * Upload de foto de perfil
   * @param token Token de autenticação JWT
   * @param file Arquivo de imagem
   * @returns URL da nova foto de perfil
   */
  async uploadProfileImage(
    token: string, 
    file: File
  ): Promise<{ success: boolean; imageUrl: string; message: string }> {
    if (this.useMockService) {
      console.log('🔄 Usando serviço mock para upload');
      return mockProfileService.uploadProfileImage(token, file);
    }

    console.log('🌐 Usando API real Gubi Server para upload');
    return this.gubiServerService.uploadProfileImage(token, file);
  }

  /**
   * Remove a foto de perfil atual
   * @param token Token de autenticação JWT
   * @returns Confirmação de remoção
   */
  async removeProfileImage(token: string): Promise<{ success: boolean; message: string }> {
    if (this.useMockService) {
      console.log('🔄 Usando serviço mock para remoção');
      return mockProfileService.removeProfileImage(token);
    }

    console.log('🌐 Usando API real Gubi Server para remoção');
    return this.gubiServerService.removeProfileImage(token);
  }

  /**
   * Busca histórico de alterações do perfil (auditoria)
   * @param token Token de autenticação JWT
   * @param limit Número máximo de registros
   * @returns Histórico de mudanças
   */
  async getProfileHistory(
    token: string, 
    limit = 50
  ): Promise<{
    success: boolean;
    data: Array<{
      id: string;
      field: string;
      oldValue: unknown;
      newValue: unknown;
      timestamp: string;
      userAgent?: string;
      ipAddress?: string;
    }>;
  }> {
    if (this.useMockService) {
      console.log('🔄 Usando serviço mock para histórico');
      return mockProfileService.getProfileHistory(token, limit);
    }

    // Para API real, histórico não está disponível no Gubi Server
    console.log('⚠️  Histórico não disponível na API Gubi Server');
    return {
      success: true,
      data: []
    };
  }

  /**
   * Validações e utilitários privados
   */
  private isValidImageFile(file: File): boolean {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const maxSizeInMB = 2;
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

    return (
      allowedTypes.includes(file.type) && 
      file.size <= maxSizeInBytes
    );
  }

  private generateChangeLog(updates: EditableProfileFields) {
    const timestamp = new Date().toISOString();
    const changeLog = [];

    for (const [field, newValue] of Object.entries(updates)) {
      changeLog.push({
        field,
        oldValue: null, // O backend preencherá com o valor atual
        newValue,
        timestamp
      });
    }

    return changeLog;
  }
}

/**
 * Cache local para perfil (offline-first)
 */
export class ProfileCache {
  private static CACHE_KEY = 'gubi_profile_cache';
  private static CACHE_DURATION = 10 * 60 * 1000; // 10 minutos

  /**
   * Salva perfil no cache local
   */
  static saveProfile(userId: string, profile: UserProfile): void {
    try {
      const cacheData = {
        profile,
        userId,
        timestamp: Date.now()
      };
      
      localStorage.setItem(
        `${this.CACHE_KEY}_${userId}`, 
        JSON.stringify(cacheData)
      );
    } catch (error) {
      console.warn('Erro ao salvar perfil no cache:', error);
    }
  }

  /**
   * Recupera perfil do cache local se válido
   */
  static getProfile(userId: string): UserProfile | null {
    try {
      const cached = localStorage.getItem(`${this.CACHE_KEY}_${userId}`);
      if (!cached) return null;

      const cacheData = JSON.parse(cached);
      const isExpired = Date.now() - cacheData.timestamp > this.CACHE_DURATION;
      
      if (isExpired) {
        this.clearProfile(userId);
        return null;
      }

      return cacheData.profile;
    } catch (error) {
      console.warn('Erro ao recuperar perfil do cache:', error);
      return null;
    }
  }

  /**
   * Remove perfil do cache
   */
  static clearProfile(userId: string): void {
    try {
      localStorage.removeItem(`${this.CACHE_KEY}_${userId}`);
    } catch (error) {
      console.warn('Erro ao limpar cache do perfil:', error);
    }
  }

  /**
   * Limpa todo o cache de perfis
   */
  static clearAllProfiles(): void {
    try {
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith(this.CACHE_KEY)) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.warn('Erro ao limpar todos os perfis do cache:', error);
    }
  }
}

// Instância singleton do serviço
export const profileService = new ProfileService();