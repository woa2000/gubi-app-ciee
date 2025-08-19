/**
 * Tipos específicos para integração com Gubi Server API
 * Baseados na documentação: https://gubi-server.onrender.com/api-docs
 */

// Response padrão da API Gubi Server
export interface GubiServerResponse<T = Record<string, unknown>> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

// Dados de perfil retornados pela API Gubi Server (estrutura real)
export interface GubiServerProfileData {
  id: number;
  name: string;
  lastName: string;
  email: string;
  country: string;
  phoneNumber: string;
  birthDate: string;
  gender: string;
  customGender: string;
  location: string;
  profileImageUrl?: string | null;
  createdAt: string;
  interests: {
    id: number;
    userId: number;
    userInterests: string[];
    customInterest: string;
    workPreference: string;
    workEnvironment: string;
    companyType: string;
    userSkills: string[];
    customSkill: string;
  };
  education: {
    id: number;
    userId: number;
    grade: string;
    wantsFaculty: string;
    currentInstitution: string;
    institution: string;
    courseName?: string | null;
    startCourseDate?: string | null;
    endCourseDate?: string | null;
    studyFormat: string;
    needsFinancialSupport: string;
    wantsFinancialInfo: string;
  };
  employment: {
    id: number;
    userId: number;
    twoYearGoals: string[];
    workWhileStudying: string;
    hasInternshipExperience: string;
  };
  skills: {
    id: number;
    userId: number;
    softSkills: string[];
    skillsToImprove: string[];
    hardSkills: string[];
    learningPreference: string;
    studyFrequency: string;
  };
  challenges: {
    id: number;
    userId: number;
    currentDifficulties: string[];
    thoughtAboutQuitting: string;
    internetAccess: string;
    availableDevices: string[];
  };
  socioeconomic: {
    id: number;
    userId: number;
    participatesInSocialProgram: string;
    socialProgram: string;
    householdSize: string;
    peopleWithIncome: string;
  };
  completion: {
    id: number;
    userId: number;
    howFoundUs: string;
    customHowFoundUs: string;
    acceptsTerms: boolean;
    acceptsDataUsage: boolean;
  };
  discoveryProgress: {
    id: number;
    userId: number;
    resume?: string | null;
    completedLevels: string[];
    answers: string[];
  };
}

// Response específica para busca de perfil
export type GubiServerProfileResponse = GubiServerResponse<GubiServerProfileData>;

// Request para atualização de perfil (estrutura que a API espera)
export interface GubiServerUpdateRequest {
  // Dados básicos
  name?: string;
  lastName?: string;
  phoneNumber?: string;
  birthDate?: string;
  gender?: string;
  customGender?: string;
  location?: string;
  country?: string;
  
  // Interesses
  interests?: {
    userInterests?: string[];
    customInterest?: string;
    workPreference?: string;
    workEnvironment?: string;
    companyType?: string;
    userSkills?: string[];
    customSkill?: string;
  };
  
  // Educação
  education?: {
    grade?: string;
    wantsFaculty?: string;
    currentInstitution?: string;
    institution?: string;
    courseName?: string;
    startCourseDate?: string;
    endCourseDate?: string;
    studyFormat?: string;
    needsFinancialSupport?: string;
    wantsFinancialInfo?: string;
  };
  
  // Emprego
  employment?: {
    twoYearGoals?: string[];
    workWhileStudying?: string;
    hasInternshipExperience?: string;
  };
  
  // Habilidades
  skills?: {
    softSkills?: string[];
    skillsToImprove?: string[];
    hardSkills?: string[];
    learningPreference?: string;
    studyFrequency?: string;
  };
  
  // Desafios
  challenges?: {
    currentDifficulties?: string[];
    thoughtAboutQuitting?: string;
    internetAccess?: string;
    availableDevices?: string[];
  };
  
  // Dados socioeconômicos
  socioeconomic?: {
    participatesInSocialProgram?: string;
    socialProgram?: string;
    householdSize?: string;
    peopleWithIncome?: string;
  };
}

// Response para upload de imagem
export type GubiServerImageUploadResponse = GubiServerResponse<{
  imageUrl: string;
  originalName?: string;
  size?: number;
}>;

// Response para remoção de imagem
export type GubiServerImageDeleteResponse = GubiServerResponse<{
  message: string;
}>;

// Tipos de erro da API
export interface GubiServerError {
  success: false;
  error: string;
  message?: string;
  code?: string;
  details?: Record<string, unknown>;
}

// Headers padrão para requisições
export interface GubiServerRequestHeaders {
  'Content-Type'?: string;
  'Accept': string;
  'Authorization'?: string;
}
