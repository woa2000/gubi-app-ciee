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
