export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  birthDate?: string;
  gender?: string;
  customGender?: string;
  country: string;
  location?: string;
  profileImage?: string;
  
  // Interesses e Objetivos
  userInterests: string[];
  workPreference?: string;
  workEnvironment?: string;
  companyType?: string;
  userSkills: string[];
  
  // Educação
  grade?: string;
  wantsFaculty?: string;
  currentInstitution?: string;
  institution?: string;
  courseName?: string;
  startCourseDate?: string;
  endCourseDate?: string;
  studyFormat?: string;
  needsFinancialSupport?: string;
  
  // Objetivos Profissionais
  twoYearGoals: string[];
  workWhileStudying?: string;
  hasInternshipExperience?: string;
  
  // Habilidades
  softSkills: string[];
  skillsToImprove: string[];
  hardSkills: string[];
  learningPreference?: string;
  studyFrequency?: string;
  
  // Desafios
  currentDifficulties: string[];
  thoughtAboutQuitting?: string;
  internetAccess?: string;
  availableDevices: string[];
  
  // Dados Socioeconômicos (sensíveis - opcional)
  participatesInSocialProgram?: string;
  socialProgram?: string;
  householdSize?: string;
  peopleWithIncome?: string;
  
  // Metadados
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
  isProfileComplete: boolean;
}

export interface EditableProfileFields {
  fullName?: string;
  phone?: string;
  birthDate?: string;
  gender?: string;
  customGender?: string;
  location?: string;
  profileImage?: string;
  
  // Campos que podem ser atualizados pelo usuário
  userInterests?: string[];
  workPreference?: string;
  workEnvironment?: string;
  companyType?: string;
  userSkills?: string[];
  
  // Educação editável
  grade?: string;
  wantsFaculty?: string;
  currentInstitution?: string;
  institution?: string;
  courseName?: string;
  startCourseDate?: string;
  endCourseDate?: string;
  studyFormat?: string;
  needsFinancialSupport?: string;
  
  // Objetivos Profissionais
  twoYearGoals?: string[];
  workWhileStudying?: string;
  hasInternshipExperience?: string;
  
  // Habilidades
  softSkills?: string[];
  skillsToImprove?: string[];
  hardSkills?: string[];
  learningPreference?: string;
  studyFrequency?: string;
  
  // Desafios
  currentDifficulties?: string[];
  thoughtAboutQuitting?: string;
  internetAccess?: string;
  availableDevices?: string[];
  
  // Dados Socioeconômicos (editáveis)
  participatesInSocialProgram?: string;
  socialProgram?: string;
  householdSize?: string;
  peopleWithIncome?: string;
}

export interface ProfileUpdateRequest {
  profileData: EditableProfileFields;
  changeLog?: {
    field: string;
    oldValue: any;
    newValue: any;
    timestamp: string;
  }[];
}

export interface ProfileApiResponse {
  success: boolean;
  data: UserProfile;
  message?: string;
}

export interface ProfileUpdateApiResponse {
  success: boolean;
  data: {
    updatedProfile: UserProfile;
    changesApplied: string[];
  };
  message: string;
}

// Opções para campos de seleção
export const GENDER_OPTIONS = [
  'Masculino',
  'Feminino', 
  'Não-binário',
  'Prefiro não informar',
  'Outro'
] as const;

export const WORK_PREFERENCE_OPTIONS = [
  'Presencial',
  'Remoto',
  'Híbrido',
  'Flexível'
] as const;

export const WORK_ENVIRONMENT_OPTIONS = [
  'Startup',
  'Empresa consolidada',
  'Governo',
  'ONGs',
  'Empresa familiar',
  'Freelancer/Autônomo'
] as const;

export const STUDY_FORMAT_OPTIONS = [
  'Presencial',
  'EAD',
  'Semipresencial'
] as const;

export const LEARNING_PREFERENCE_OPTIONS = [
  'Visual (vídeos, gráficos)',
  'Auditivo (podcasts, explicações)',
  'Prático (fazendo, experimentando)',
  'Leitura (textos, artigos)',
  'Misto'
] as const;

export const STUDY_FREQUENCY_OPTIONS = [
  'Diariamente',
  '3-4 vezes por semana',
  '1-2 vezes por semana',
  'Finais de semana',
  'Quando tenho tempo'
] as const;

export const INTERNET_ACCESS_OPTIONS = [
  'Excelente (fibra ótica)',
  'Boa (banda larga)',
  'Regular (3G/4G)',
  'Limitada (dados móveis)',
  'Instável'
] as const;

export const AVAILABLE_DEVICES_OPTIONS = [
  'Smartphone',
  'Notebook/Laptop',
  'Desktop',
  'Tablet',
  'Chromebook'
] as const;

// Validações
export const ProfileValidation = {
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  isValidPhone(phone: string): boolean {
    const phoneRegex = /^(\+55\s?)?(\(?\d{2}\)?[\s-]?)?9?\d{4}[\s-]?\d{4}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  },

  isValidBirthDate(birthDate: string): boolean {
    const date = new Date(birthDate);
    const now = new Date();
    const age = now.getFullYear() - date.getFullYear();
    return age >= 16 && age <= 100;
  },

  isProfileComplete(profile: Partial<UserProfile>): boolean {
    const requiredFields = [
      'fullName',
      'email',
      'country',
      'userInterests',
      'userSkills'
    ];
    
    return requiredFields.every(field => {
      const value = profile[field as keyof UserProfile];
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      return Boolean(value);
    });
  }
};
