import { getDefaultHeaders, getUploadHeaders, getApiBaseUrl } from '@/lib/apiBase';
import {
  GubiServerProfileData,
  GubiServerProfileResponse,
  GubiServerImageUploadResponse,
  GubiServerImageDeleteResponse,
  GubiServerError,
} from '@/types/gubiServerApi';
import {
  mapGubiServerToUserProfile,
  mapFrontendToGubiServerUpdate,
  sanitizeForLog,
} from '@/types/gubiServerMapper';
import {
  EditableProfileFields,
  ProfileApiResponse,
  ProfileUpdateApiResponse,
} from '@/types/profile';

/**
 * Serviço para integração com a API do Gubi Server
 */
export class GubiServerProfileService {
  private baseUrl = getApiBaseUrl();

  /**
   * Busca o perfil completo do usuário
   * Endpoint: GET /v1/profile
   */
  async getUserProfile(token: string): Promise<ProfileApiResponse> {
    try {
      console.log('🔍 Buscando perfil no Gubi Server...');
      
      const response = await fetch(`${this.baseUrl}/v1/profile`, {
        method: 'GET',
        headers: getDefaultHeaders(token)
      });

      // Log da resposta para debug
      console.log(`📡 Response status: ${response.status} ${response.statusText}`);

      if (!response.ok) {
        let errorData: GubiServerError;
        
        try {
          errorData = await response.json();
        } catch {
          // Se não conseguir fazer parse do JSON, criar erro genérico
          errorData = {
            success: false,
            error: `HTTP ${response.status}: ${response.statusText}`,
            message: 'Erro de comunicação com o servidor'
          };
        }

        console.error('❌ Erro na API Gubi Server:', sanitizeForLog(errorData));
        
        // Tratamento específico por código de status
        if (response.status === 401) {
          throw new Error('Sessão expirada. Faça login novamente.');
        } else if (response.status === 404) {
          throw new Error('Perfil não encontrado.');
        } else if (response.status >= 500) {
          throw new Error('Erro interno do servidor. Tente novamente mais tarde.');
        }
        
        throw new Error(errorData.message || errorData.error || 'Erro ao buscar perfil');
      }

      const rawResponse = await response.json();
      console.log('✅ Resposta bruta da API:', JSON.stringify(rawResponse, null, 2));

      let profileData: GubiServerProfileData;

      // A API pode retornar diretamente o objeto do perfil OU em uma estrutura wrapper
      if (rawResponse.success !== undefined) {
        // Formato wrapper: { success: true, data: {...} }
        const gubiResponse = rawResponse as GubiServerProfileResponse;
        if (!gubiResponse.success || !gubiResponse.data) {
          console.error('❌ Estrutura wrapper inválida:', {
            success: gubiResponse.success,
            hasData: !!gubiResponse.data,
            responseKeys: Object.keys(gubiResponse)
          });
          throw new Error('Resposta inválida do servidor');
        }
        profileData = gubiResponse.data;
      } else if (rawResponse.id && rawResponse.email) {
        // Formato direto: o próprio objeto do perfil
        console.log('📦 API retorna objeto direto do perfil');
        profileData = rawResponse as GubiServerProfileData;
      } else {
        console.error('❌ Formato de resposta não reconhecido:', {
          hasSuccess: 'success' in rawResponse,
          hasId: 'id' in rawResponse,
          hasEmail: 'email' in rawResponse,
          responseKeys: Object.keys(rawResponse)
        });
        throw new Error('Formato de resposta não reconhecido');
      }

      // Mapear dados para estrutura do frontend
      const mappedProfile = mapGubiServerToUserProfile(profileData);
      
      return {
        success: true,
        data: mappedProfile,
        message: 'Perfil carregado com sucesso'
      };

    } catch (error) {
      console.error('🚨 Erro ao buscar perfil no Gubi Server:', error);
      
      // Tratamento específico para erros de rede
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Erro de conexão com o servidor. Verifique sua internet e tente novamente.');
      }
      
      // Re-throw outros erros
      throw error;
    }
  }

  /**
   * Atualiza dados do perfil
   * Endpoint: PUT /v1/profile
   */
  async updateProfile(token: string, updates: EditableProfileFields): Promise<ProfileUpdateApiResponse> {
    try {
      console.log('💾 Atualizando perfil no Gubi Server...', sanitizeForLog(updates));

      // Mapear campos do frontend para formato da API
      const apiPayload = mapFrontendToGubiServerUpdate(updates);
      
      if (Object.keys(apiPayload).length === 0) {
        throw new Error('Nenhum campo válido para atualização');
      }

      const response = await fetch(`${this.baseUrl}/v1/profile`, {
        method: 'PUT',
        headers: getDefaultHeaders(token),
        body: JSON.stringify(apiPayload)
      });

      console.log(`📡 Update response status: ${response.status} ${response.statusText}`);

      if (!response.ok) {
        let errorData: GubiServerError;
        
        try {
          errorData = await response.json();
        } catch {
          errorData = {
            success: false,
            error: `HTTP ${response.status}: ${response.statusText}`,
            message: 'Erro de comunicação com o servidor'
          };
        }

        console.error('❌ Erro na atualização:', sanitizeForLog(errorData));

        // Tratamento específico de erros
        if (response.status === 400) {
          throw new Error(`Dados inválidos: ${errorData.message || errorData.error}`);
        } else if (response.status === 401) {
          throw new Error('Sessão expirada. Faça login novamente.');
        } else if (response.status === 422) {
          throw new Error(`Erro de validação: ${errorData.message || errorData.error}`);
        } else if (response.status >= 500) {
          throw new Error('Erro interno do servidor. Tente novamente mais tarde.');
        }
        
        throw new Error(errorData.message || errorData.error || 'Erro ao atualizar perfil');
      }

      const rawResponse = await response.json();
      console.log('✅ Resposta da atualização:', JSON.stringify(rawResponse, null, 2));

      let updatedProfileData: GubiServerProfileData;

      // A API pode retornar diretamente o objeto do perfil OU em uma estrutura wrapper
      if (rawResponse.success !== undefined) {
        // Formato wrapper: { success: true, data: {...} }
        const gubiResponse = rawResponse as GubiServerProfileResponse;
        if (!gubiResponse.success || !gubiResponse.data) {
          console.error('❌ Estrutura wrapper inválida na atualização');
          throw new Error('Resposta inválida do servidor na atualização');
        }
        updatedProfileData = gubiResponse.data;
      } else if (rawResponse.id && rawResponse.email) {
        // Formato direto: o próprio objeto do perfil
        console.log('📦 API retorna objeto direto do perfil atualizado');
        updatedProfileData = rawResponse as GubiServerProfileData;
      } else {
        console.error('❌ Formato de resposta de atualização não reconhecido');
        throw new Error('Formato de resposta não reconhecido na atualização');
      }

      const updatedProfile = mapGubiServerToUserProfile(updatedProfileData);
      
      return {
        success: true,
        data: {
          updatedProfile: updatedProfile,
          changesApplied: Object.keys(apiPayload) // Campos que foram enviados para API
        },
        message: 'Perfil atualizado com sucesso'
      };

    } catch (error) {
      console.error('🚨 Erro ao atualizar perfil:', error);
      throw error;
    }
  }

  /**
   * Upload de imagem de perfil
   * Endpoint: POST /v1/profile/image
   */
  async uploadProfileImage(token: string, file: File): Promise<{success: boolean; imageUrl: string; message: string}> {
    try {
      console.log(`🖼️  Fazendo upload de imagem: ${file.name} (${file.size} bytes)`);

      // Validações no cliente
      if (!this.isValidImageFile(file)) {
        throw new Error('Arquivo inválido. Use apenas JPG, PNG ou WebP até 2MB.');
      }

      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch(`${this.baseUrl}/v1/profile/image`, {
        method: 'POST',
        headers: getUploadHeaders(token),
        body: formData
      });

      console.log(`📡 Upload response status: ${response.status} ${response.statusText}`);

      if (!response.ok) {
        let errorData: GubiServerError;
        
        try {
          errorData = await response.json();
        } catch {
          errorData = {
            success: false,
            error: `HTTP ${response.status}: ${response.statusText}`,
            message: 'Erro de comunicação com o servidor'
          };
        }

        console.error('❌ Erro no upload:', errorData);

        // Tratamento específico por código de status
        if (response.status === 413) {
          throw new Error('Arquivo muito grande. Máximo 2MB.');
        } else if (response.status === 415) {
          throw new Error('Tipo de arquivo não suportado. Use JPG, PNG ou WebP.');
        } else if (response.status === 401) {
          throw new Error('Sessão expirada. Faça login novamente.');
        } else if (response.status >= 500) {
          throw new Error('Erro interno do servidor. Tente novamente mais tarde.');
        }
        
        throw new Error(errorData.message || errorData.error || 'Erro no upload da imagem');
      }

      const result: GubiServerImageUploadResponse = await response.json();
      console.log('✅ Upload concluído com sucesso');

      if (!result.success || !result.data?.imageUrl) {
        throw new Error('Resposta inválida do servidor');
      }
      
      return {
        success: true,
        imageUrl: result.data.imageUrl,
        message: result.message || 'Imagem enviada com sucesso'
      };

    } catch (error) {
      console.error('🚨 Erro no upload de imagem:', error);
      throw error;
    }
  }

  /**
   * Remove imagem de perfil
   * Endpoint: DELETE /v1/profile/image
   */
  async removeProfileImage(token: string): Promise<{success: boolean; message: string}> {
    try {
      console.log('🗑️  Removendo imagem de perfil...');

      const response = await fetch(`${this.baseUrl}/v1/profile/image`, {
        method: 'DELETE',
        headers: getDefaultHeaders(token)
      });

      console.log(`📡 Delete response status: ${response.status} ${response.statusText}`);

      if (!response.ok) {
        let errorData: GubiServerError;
        
        try {
          errorData = await response.json();
        } catch {
          errorData = {
            success: false,
            error: `HTTP ${response.status}: ${response.statusText}`,
            message: 'Erro de comunicação com o servidor'
          };
        }

        console.error('❌ Erro na remoção:', errorData);

        if (response.status === 401) {
          throw new Error('Sessão expirada. Faça login novamente.');
        } else if (response.status === 404) {
          throw new Error('Imagem não encontrada.');
        } else if (response.status >= 500) {
          throw new Error('Erro interno do servidor. Tente novamente mais tarde.');
        }
        
        throw new Error(errorData.message || errorData.error || 'Erro ao remover imagem');
      }

      const result: GubiServerImageDeleteResponse = await response.json();
      console.log('✅ Imagem removida com sucesso');
      
      return {
        success: true,
        message: result.message || 'Imagem removida com sucesso'
      };

    } catch (error) {
      console.error('🚨 Erro ao remover imagem:', error);
      throw error;
    }
  }

  /**
   * Valida se o arquivo de imagem é válido
   */
  private isValidImageFile(file: File): boolean {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const maxSizeInMB = 2;
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

    return allowedTypes.includes(file.type) && file.size <= maxSizeInBytes;
  }
}
