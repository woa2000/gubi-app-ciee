import { 
  UserProfile, 
  EditableProfileFields,
  ProfileApiResponse,
  ProfileUpdateApiResponse,
  ProfileValidation 
} from '@/types/profile';

/**
 * Mock service para desenvolvimento e demonstração
 * Remove este arquivo quando a API real estiver implementada
 */
export class MockProfileService {
  private static STORAGE_KEY = 'gubi_mock_profile';

  /**
   * Dados mock para o usuário
   */
  private static getMockProfile(): UserProfile {
    return {
      id: '1',
      email: 'user@gubi.com.br',
      fullName: 'João Silva Santos',
      phone: '(11) 99999-9999',
      birthDate: '1998-05-15',
      gender: 'Masculino',
      customGender: '',
      country: 'Brasil',
      location: 'São Paulo, SP',
      profileImage: undefined,
      
      // Interesses e Objetivos
      userInterests: ['Tecnologia', 'Marketing', 'Empreendedorismo'],
      workPreference: 'Híbrido',
      workEnvironment: 'Startup',
      companyType: 'Fintech',
      userSkills: ['Comunicação', 'Excel', 'Inglês', 'Trabalho em equipe'],
      
      // Educação
      grade: 'Ensino Superior',
      wantsFaculty: 'Sim',
      currentInstitution: 'Universidade de São Paulo',
      institution: 'USP',
      courseName: 'Administração',
      startCourseDate: '2020-01-01',
      endCourseDate: '2023-12-01',
      studyFormat: 'Presencial',
      needsFinancialSupport: 'Não',
      
      // Objetivos Profissionais
      twoYearGoals: ['Conseguir primeiro emprego', 'Desenvolver liderança'],
      workWhileStudying: 'Sim',
      hasInternshipExperience: 'Não',
      
      // Habilidades
      softSkills: ['Comunicação', 'Liderança', 'Criatividade'],
      skillsToImprove: ['Apresentação', 'Negociação'],
      hardSkills: ['Excel', 'PowerPoint', 'Inglês'],
      learningPreference: 'Prático (fazendo, experimentando)',
      studyFrequency: 'Diariamente',
      
      // Desafios
      currentDifficulties: ['Falta de experiência', 'Networking'],
      thoughtAboutQuitting: 'Não',
      internetAccess: 'Excelente (fibra ótica)',
      availableDevices: ['Smartphone', 'Notebook/Laptop'],
      
      // Dados Socioeconômicos (sensíveis - opcional)
      participatesInSocialProgram: 'Não',
      socialProgram: '',
      householdSize: '4',
      peopleWithIncome: '2',
      
      // Metadados
      createdAt: '2024-01-15T08:00:00Z',
      updatedAt: '2024-08-15T10:30:00Z',
      lastLoginAt: '2024-08-18T09:15:00Z',
      isProfileComplete: true,
    };
  }

  /**
   * Carrega perfil do localStorage ou retorna mock
   */
  private static loadProfile(): UserProfile {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return { ...this.getMockProfile(), ...parsed };
      }
    } catch (error) {
      console.warn('Erro ao carregar perfil mock do localStorage:', error);
    }
    return this.getMockProfile();
  }

  /**
   * Salva perfil no localStorage
   */
  private static saveProfile(profile: UserProfile): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(profile));
    } catch (error) {
      console.warn('Erro ao salvar perfil mock no localStorage:', error);
    }
  }

  /**
   * Simula delay de rede
   */
  private static async delay(ms: number = 1000): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Busca perfil do usuário (mock)
   */
  async getUserProfile(token: string): Promise<ProfileApiResponse> {
    await MockProfileService.delay(800); // Simula delay de rede

    if (!token) {
      throw new Error('Token de autorização necessário');
    }

    const profile = MockProfileService.loadProfile();

    return {
      success: true,
      data: profile,
      message: 'Perfil carregado com sucesso (Mock)'
    };
  }

  /**
   * Atualiza perfil do usuário (mock)
   */
  async updateProfile(
    token: string, 
    updates: EditableProfileFields
  ): Promise<ProfileUpdateApiResponse> {
    await MockProfileService.delay(1200); // Simula delay de rede

    if (!token) {
      throw new Error('Token de autorização necessário');
    }

    // Simular erro ocasional para testes
    if (Math.random() < 0.1) { // 10% de chance de erro
      throw new Error('Erro de rede simulado. Tente novamente.');
    }

    const currentProfile = MockProfileService.loadProfile();
    const updatedProfile = {
      ...currentProfile,
      ...updates,
      updatedAt: new Date().toISOString(),
      isProfileComplete: ProfileValidation.isProfileComplete({
        ...currentProfile,
        ...updates
      })
    };

    MockProfileService.saveProfile(updatedProfile);

    const changesApplied = Object.keys(updates).filter(key => {
      const oldValue = currentProfile[key as keyof UserProfile];
      const newValue = updates[key as keyof EditableProfileFields];
      return JSON.stringify(oldValue) !== JSON.stringify(newValue);
    });

    return {
      success: true,
      data: {
        updatedProfile,
        changesApplied
      },
      message: `Perfil atualizado com sucesso! ${changesApplied.length} campo(s) modificado(s).`
    };
  }

  /**
   * Upload de imagem de perfil (mock)
   */
  async uploadProfileImage(
    token: string, 
    file: File
  ): Promise<{ success: boolean; imageUrl: string; message: string }> {
    await MockProfileService.delay(2000); // Simula upload

    if (!token) {
      throw new Error('Token de autorização necessário');
    }

    // Validações básicas
    if (!file.type.startsWith('image/')) {
      throw new Error('Arquivo deve ser uma imagem');
    }

    if (file.size > 2 * 1024 * 1024) {
      throw new Error('Arquivo muito grande. Máximo 2MB.');
    }

    // Simular erro ocasional
    if (Math.random() < 0.05) { // 5% de chance de erro
      throw new Error('Falha no upload. Tente novamente.');
    }

    // Gerar URL mock da imagem
    const mockImageUrl = `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face&auto=format`;

    // Atualizar perfil com nova imagem
    const currentProfile = MockProfileService.loadProfile();
    const updatedProfile = {
      ...currentProfile,
      profileImage: mockImageUrl,
      updatedAt: new Date().toISOString()
    };
    
    MockProfileService.saveProfile(updatedProfile);

    return {
      success: true,
      imageUrl: mockImageUrl,
      message: 'Foto atualizada com sucesso!'
    };
  }

  /**
   * Remove imagem de perfil (mock)
   */
  async removeProfileImage(token: string): Promise<{ success: boolean; message: string }> {
    await MockProfileService.delay(500); // Simula remoção

    if (!token) {
      throw new Error('Token de autorização necessário');
    }

    const currentProfile = MockProfileService.loadProfile();
    const updatedProfile = {
      ...currentProfile,
      profileImage: undefined,
      updatedAt: new Date().toISOString()
    };
    
    MockProfileService.saveProfile(updatedProfile);

    return {
      success: true,
      message: 'Foto removida com sucesso!'
    };
  }

  /**
   * Busca histórico de alterações (mock)
   */
  async getProfileHistory(
    token: string, 
    limit = 50
  ): Promise<{
    success: boolean;
    data: Array<{
      id: string;
      field: string;
      oldValue: string | number | boolean | null | string[];
      newValue: string | number | boolean | null | string[];
      timestamp: string;
      userAgent?: string;
      ipAddress?: string;
    }>;
  }> {
    await MockProfileService.delay(600);

    if (!token) {
      throw new Error('Token de autorização necessário');
    }

    // Dados mock de histórico
    const mockHistory = [
      {
        id: '1',
        field: 'fullName',
        oldValue: 'João Silva',
        newValue: 'João Silva Santos',
        timestamp: '2024-08-18T09:15:00Z',
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
        ipAddress: '192.168.1.100'
      },
      {
        id: '2',
        field: 'userInterests',
        oldValue: ['Tecnologia', 'Marketing'],
        newValue: ['Tecnologia', 'Marketing', 'Empreendedorismo'],
        timestamp: '2024-08-17T14:30:00Z',
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
        ipAddress: '192.168.1.100'
      }
    ].slice(0, limit);

    return {
      success: true,
      data: mockHistory
    };
  }
}

// Instância singleton do mock service
export const mockProfileService = new MockProfileService();
