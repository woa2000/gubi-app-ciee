import { getApiBaseUrl } from "@/lib/apiBase";
import { RegisterForm } from "@/types/user";

export async function registerUser(form: RegisterForm) {
  const baseUrl = getApiBaseUrl();

  const response = await fetch(`${baseUrl}/v1/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  });

  const data = await response.json();

  if (!response.ok)
    throw new Error(data.error || "Erro desconhecido");

  return data as {
    id: number;
    name: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    token: string;
  };
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
