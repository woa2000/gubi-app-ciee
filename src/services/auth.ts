import { getApiBaseUrl } from "@/lib/apiBase";
import { RegisterForm } from "@/types/user";

export async function registerUser(form: RegisterForm) {
  const baseUrl = getApiBaseUrl();

  // Filtrar e sanitizar os dados antes de enviar
  const sanitizedForm = sanitizeRegisterForm(form);
  
  console.log('[AUTH] Enviando dados sanitizados:', JSON.stringify(sanitizedForm, null, 2));

  const response = await fetch(`${baseUrl}/v1/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(sanitizedForm),
  });

  const data = await response.json();

  if (!response.ok) {
    console.error('[AUTH] Erro no registro:', {
      status: response.status,
      statusText: response.statusText,
      error: data
    });
    throw new Error(data.error || data.message || "Erro no servidor");
  }

  return data as {
    id: number;
    name: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    token: string;
  };
}

/**
 * Sanitiza e formata os dados do formulário para envio ao servidor
 */
function sanitizeRegisterForm(form: RegisterForm): Record<string, unknown> {
  const sanitized: Record<string, unknown> = {};

  // Campos obrigatórios básicos
  sanitized.fullName = form.fullName?.trim();
  sanitized.email = form.email?.toLowerCase()?.trim();
  sanitized.password = form.password;
  
  // Campos pessoais
  if (form.phone?.trim()) {
    sanitized.phone = form.phone.trim();
  }
  
  if (form.birthDate?.trim()) {
    sanitized.birthDate = form.birthDate.trim();
  }
  
  if (form.gender?.trim()) {
    sanitized.gender = form.gender.trim();
  }
  
  if (form.customGender?.trim()) {
    sanitized.customGender = form.customGender.trim();
  }
  
  if (form.location?.trim()) {
    sanitized.location = form.location.trim();
  }
  
  if (form.country?.trim()) {
    sanitized.country = form.country.trim();
  }

  // Arrays - apenas se não estiverem vazios
  if (form.userInterests && form.userInterests.length > 0) {
    sanitized.userInterests = form.userInterests.filter(item => item?.trim());
  }
  
  if (form.userSkills && form.userSkills.length > 0) {
    sanitized.userSkills = form.userSkills.filter(item => item?.trim());
  }

  // Preferências de trabalho
  if (form.workPreference?.trim()) {
    sanitized.workPreference = form.workPreference.trim();
  }
  
  if (form.workEnvironment?.trim()) {
    sanitized.workEnvironment = form.workEnvironment.trim();
  }
  
  if (form.companyType?.trim()) {
    sanitized.companyType = form.companyType.trim();
  }

  // Educação
  if (form.grade?.trim()) {
    sanitized.grade = form.grade.trim();
  }
  
  if (form.wantsFaculty?.trim()) {
    sanitized.wantsFaculty = form.wantsFaculty.trim();
  }

  // Campos de aceite (sempre incluir)
  sanitized.acceptsTerms = Boolean(form.acceptsTerms);
  sanitized.acceptsDataUsage = Boolean(form.acceptsDataUsage);

  // Interesses customizados
  if (form.customInterest?.trim()) {
    sanitized.customInterest = form.customInterest.trim();
  }
  
  if (form.customSkill?.trim()) {
    sanitized.customSkill = form.customSkill.trim();
  }

  // Outros campos apenas se preenchidos
  const optionalStringFields = [
    'currentInstitution', 'institution', 'courseName', 'startCourseDate', 
    'endCourseDate', 'studyFormat', 'needsFinancialSupport', 'wantsFinancialInfo',
    'workWhileStudying', 'hasInternshipExperience', 'learningPreference', 
    'studyFrequency', 'thoughtAboutQuitting', 'internetAccess',
    'participatesInSocialProgram', 'socialProgram', 'householdSize', 
    'peopleWithIncome', 'howFoundUs', 'customHowFoundUs'
  ];

  optionalStringFields.forEach(field => {
    if (form[field as keyof RegisterForm] && 
        typeof form[field as keyof RegisterForm] === 'string' && 
        (form[field as keyof RegisterForm] as string).trim()) {
      sanitized[field] = (form[field as keyof RegisterForm] as string).trim();
    }
  });

  // Arrays opcionais
  const optionalArrayFields = [
    'twoYearGoals', 'softSkills', 'skillsToImprove', 'hardSkills',
    'currentDifficulties', 'availableDevices'
  ];

  optionalArrayFields.forEach(field => {
    const value = form[field as keyof RegisterForm] as string[];
    if (value && Array.isArray(value) && value.length > 0) {
      const filtered = value.filter(item => item?.trim());
      if (filtered.length > 0) {
        sanitized[field] = filtered;
      }
    }
  });

  return sanitized;
}

export async function checkEmailExists(email: string) {
  const baseUrl = getApiBaseUrl();

  const response = await fetch(`${baseUrl}/v1/auth/check-email`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  const data = await response.json();

  if (!response.ok)
    throw new Error(data.error || "Erro desconhecido");

  return data as {
    exists: boolean;
    message: string;
  };
}

export async function loginUser(email: string, password: string) {
  const baseUrl = getApiBaseUrl();

  const response = await fetch(`${baseUrl}/v1/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok)
    throw new Error(data.error || "Credenciais inválidas");

  return data as {
    id: number;
    name: string;
    email: string;
    token: string;
    isFirstLogin?: boolean;
  };
}

export const sendRecoveryCode = async (email: string) => {
  const baseUrl = getApiBaseUrl();

  const response = await fetch(`${baseUrl}/v1/auth/recovery/send`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  const data = await response.json();

  if (!response.ok)
    throw new Error(data.error || "Erro desconhecido");

  return data as {
    message: string;
  };
};

export const verifyRecoveryCode = async (email: string, code: string) => {
  const baseUrl = getApiBaseUrl();

  const response = await fetch(`${baseUrl}/v1/auth/recovery/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, code }),
  });

  const data = await response.json();

  if (!response.ok)
    throw new Error(data.error || "Erro desconhecido");

  return data as {
    message: string;
  };
};

export const resetPassword = async (email: string, code: string, newPassword: string) => {
  const baseUrl = getApiBaseUrl();

  const response = await fetch(`${baseUrl}/v1/auth/recovery/reset`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, code, newPassword }),
  });

  const data = await response.json();

  if (!response.ok)
    throw new Error(data.error || "Erro desconhecido");

  return data as {
    message: string;
  };
};

export const logoutUser = async (token: string) => {
  const baseUrl = getApiBaseUrl();

  try {
    const response = await fetch(`${baseUrl}/v1/auth/logout`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });

    if (!response.ok) {
      console.warn('Logout API call failed, but continuing with local cleanup');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // Even if API call fails, we should continue with local cleanup
    console.warn('Logout API call failed:', error);
    return { message: 'Logout local executado' };
  }
};
