import { UserProfile, EditableProfileFields } from './profile';
import { 
  GubiServerProfileData, 
  GubiServerUpdateRequest
} from './gubiServerApi';

/**
 * Utilitários para mapear dados entre API Gubi Server e tipos do frontend
 */

/**
 * Mapeia dados do Gubi Server para o tipo UserProfile do frontend
 */
export const mapGubiServerToUserProfile = (gubiData: GubiServerProfileData): UserProfile => {
  return {
    // Campos básicos mapeados corretamente
    id: gubiData.id.toString(),
    email: gubiData.email,
    fullName: `${gubiData.name} ${gubiData.lastName}`.trim(),
    phone: gubiData.phoneNumber || undefined,
    birthDate: gubiData.birthDate ? gubiData.birthDate.split('T')[0] : undefined, // Converter ISO para YYYY-MM-DD
    gender: gubiData.gender || undefined,
    customGender: gubiData.customGender || undefined,
    country: gubiData.country || 'BR',
    location: gubiData.location || undefined,
    profileImage: gubiData.profileImageUrl || undefined,
    
    // Interesses (mapeados do objeto interests)
    userInterests: gubiData.interests?.userInterests || [],
    workPreference: gubiData.interests?.workPreference || undefined,
    workEnvironment: gubiData.interests?.workEnvironment || undefined,
    companyType: gubiData.interests?.companyType || undefined,
    userSkills: gubiData.interests?.userSkills || [],
    
    // Educação (mapeados do objeto education)
    grade: gubiData.education?.grade || undefined,
    wantsFaculty: gubiData.education?.wantsFaculty || undefined,
    currentInstitution: gubiData.education?.currentInstitution || undefined,
    institution: gubiData.education?.institution || undefined,
    courseName: gubiData.education?.courseName || undefined,
    startCourseDate: gubiData.education?.startCourseDate || undefined,
    endCourseDate: gubiData.education?.endCourseDate || undefined,
    studyFormat: gubiData.education?.studyFormat || undefined,
    needsFinancialSupport: gubiData.education?.needsFinancialSupport || undefined,
    
    // Objetivos profissionais (mapeados do objeto employment)
    twoYearGoals: gubiData.employment?.twoYearGoals || [],
    workWhileStudying: gubiData.employment?.workWhileStudying || undefined,
    hasInternshipExperience: gubiData.employment?.hasInternshipExperience || undefined,
    
    // Habilidades (mapeados do objeto skills)
    softSkills: gubiData.skills?.softSkills || [],
    skillsToImprove: gubiData.skills?.skillsToImprove || [],
    hardSkills: gubiData.skills?.hardSkills || [],
    learningPreference: gubiData.skills?.learningPreference || undefined,
    studyFrequency: gubiData.skills?.studyFrequency || undefined,
    
    // Desafios (mapeados do objeto challenges)
    currentDifficulties: gubiData.challenges?.currentDifficulties || [],
    thoughtAboutQuitting: gubiData.challenges?.thoughtAboutQuitting || undefined,
    internetAccess: gubiData.challenges?.internetAccess || undefined,
    availableDevices: gubiData.challenges?.availableDevices || [],
    
    // Dados socioeconômicos (mapeados do objeto socioeconomic)
    participatesInSocialProgram: gubiData.socioeconomic?.participatesInSocialProgram || undefined,
    socialProgram: gubiData.socioeconomic?.socialProgram || undefined,
    householdSize: gubiData.socioeconomic?.householdSize || undefined,
    peopleWithIncome: gubiData.socioeconomic?.peopleWithIncome || undefined,
    
    // Progress do Discovery
    discoveryProgress: gubiData.discoveryProgress || undefined,
    
    // Metadados
    createdAt: gubiData.createdAt,
    updatedAt: gubiData.createdAt, // API não tem updatedAt, usar createdAt
    lastLoginAt: undefined, // API não fornece este campo
    
    // Calcular se perfil está completo baseado nos campos obrigatórios
    isProfileComplete: !!(
      gubiData.name && 
      gubiData.lastName && 
      gubiData.email && 
      gubiData.phoneNumber && 
      gubiData.birthDate
    )
  };
};

/**
 * Mapeia campos editáveis do frontend para formato da API Gubi Server
 */
export const mapFrontendToGubiServerUpdate = (updates: EditableProfileFields): GubiServerUpdateRequest => {
  const apiPayload: GubiServerUpdateRequest = {};
  
  // Mapear dados básicos
  if (updates.fullName !== undefined) {
    const nameParts = updates.fullName.trim().split(' ');
    apiPayload.name = nameParts[0];
    apiPayload.lastName = nameParts.slice(1).join(' ') || nameParts[0];
  }
  
  if (updates.phone !== undefined) {
    apiPayload.phoneNumber = updates.phone;
  }
  
  if (updates.birthDate !== undefined) {
    apiPayload.birthDate = updates.birthDate;
  }
  
  if (updates.gender !== undefined) {
    apiPayload.gender = updates.gender;
  }
  
  if (updates.customGender !== undefined) {
    apiPayload.customGender = updates.customGender;
  }
  
  if (updates.location !== undefined) {
    apiPayload.location = updates.location;
  }
  
  // Mapear interesses
  if (updates.userInterests || updates.workPreference || updates.workEnvironment || updates.companyType || updates.userSkills) {
    apiPayload.interests = {};
    if (updates.userInterests) apiPayload.interests.userInterests = updates.userInterests;
    if (updates.workPreference) apiPayload.interests.workPreference = updates.workPreference;
    if (updates.workEnvironment) apiPayload.interests.workEnvironment = updates.workEnvironment;
    if (updates.companyType) apiPayload.interests.companyType = updates.companyType;
    if (updates.userSkills) apiPayload.interests.userSkills = updates.userSkills;
  }
  
  // Mapear educação
  if (updates.grade || updates.wantsFaculty || updates.currentInstitution || updates.institution || 
      updates.courseName || updates.startCourseDate || updates.endCourseDate || updates.studyFormat || 
      updates.needsFinancialSupport) {
    apiPayload.education = {};
    if (updates.grade) apiPayload.education.grade = updates.grade;
    if (updates.wantsFaculty) apiPayload.education.wantsFaculty = updates.wantsFaculty;
    if (updates.currentInstitution) apiPayload.education.currentInstitution = updates.currentInstitution;
    if (updates.institution) apiPayload.education.institution = updates.institution;
    if (updates.courseName) apiPayload.education.courseName = updates.courseName;
    if (updates.startCourseDate) apiPayload.education.startCourseDate = updates.startCourseDate;
    if (updates.endCourseDate) apiPayload.education.endCourseDate = updates.endCourseDate;
    if (updates.studyFormat) apiPayload.education.studyFormat = updates.studyFormat;
    if (updates.needsFinancialSupport) apiPayload.education.needsFinancialSupport = updates.needsFinancialSupport;
  }
  
  // Mapear emprego
  if (updates.twoYearGoals || updates.workWhileStudying || updates.hasInternshipExperience) {
    apiPayload.employment = {};
    if (updates.twoYearGoals) apiPayload.employment.twoYearGoals = updates.twoYearGoals;
    if (updates.workWhileStudying) apiPayload.employment.workWhileStudying = updates.workWhileStudying;
    if (updates.hasInternshipExperience) apiPayload.employment.hasInternshipExperience = updates.hasInternshipExperience;
  }
  
  // Mapear habilidades
  if (updates.softSkills || updates.skillsToImprove || updates.hardSkills || 
      updates.learningPreference || updates.studyFrequency) {
    apiPayload.skills = {};
    if (updates.softSkills) apiPayload.skills.softSkills = updates.softSkills;
    if (updates.skillsToImprove) apiPayload.skills.skillsToImprove = updates.skillsToImprove;
    if (updates.hardSkills) apiPayload.skills.hardSkills = updates.hardSkills;
    if (updates.learningPreference) apiPayload.skills.learningPreference = updates.learningPreference;
    if (updates.studyFrequency) apiPayload.skills.studyFrequency = updates.studyFrequency;
  }
  
  // Mapear desafios
  if (updates.currentDifficulties || updates.thoughtAboutQuitting || 
      updates.internetAccess || updates.availableDevices) {
    apiPayload.challenges = {};
    if (updates.currentDifficulties) apiPayload.challenges.currentDifficulties = updates.currentDifficulties;
    if (updates.thoughtAboutQuitting) apiPayload.challenges.thoughtAboutQuitting = updates.thoughtAboutQuitting;
    if (updates.internetAccess) apiPayload.challenges.internetAccess = updates.internetAccess;
    if (updates.availableDevices) apiPayload.challenges.availableDevices = updates.availableDevices;
  }
  
  // Mapear dados socioeconômicos
  if (updates.participatesInSocialProgram || updates.socialProgram || 
      updates.householdSize || updates.peopleWithIncome) {
    apiPayload.socioeconomic = {};
    if (updates.participatesInSocialProgram) apiPayload.socioeconomic.participatesInSocialProgram = updates.participatesInSocialProgram;
    if (updates.socialProgram) apiPayload.socioeconomic.socialProgram = updates.socialProgram;
    if (updates.householdSize) apiPayload.socioeconomic.householdSize = updates.householdSize;
    if (updates.peopleWithIncome) apiPayload.socioeconomic.peopleWithIncome = updates.peopleWithIncome;
  }
  
  return apiPayload;
};

/**
 * Valida se todos os campos obrigatórios estão preenchidos
 */
export const validateRequiredFields = (data: GubiServerProfileData): { isValid: boolean; missingFields: string[] } => {
  const requiredFields = ['fullName', 'email'];
  const missingFields: string[] = [];
  
  requiredFields.forEach(field => {
    if (!data[field as keyof GubiServerProfileData]) {
      missingFields.push(field);
    }
  });
  
  return {
    isValid: missingFields.length === 0,
    missingFields
  };
};

/**
 * Formatar dados para log de depuração (remove campos sensíveis)
 */
export const sanitizeForLog = (data: unknown): Record<string, unknown> => {
  if (!data || typeof data !== 'object') {
    return { value: data };
  }
  
  const obj = data as Record<string, unknown>;
  const { email, phone, ...sanitized } = obj;
  
  return {
    ...sanitized,
    email: email && typeof email === 'string' ? `${email.substring(0, 3)}***` : undefined,
    phone: phone && typeof phone === 'string' ? `***${phone.slice(-4)}` : undefined
  };
};
