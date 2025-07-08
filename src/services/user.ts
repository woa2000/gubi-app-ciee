import { getApiBaseUrl } from "@/lib/apiBase";
import { RegisterForm } from "@/types/user";

export async function registerUser(form: RegisterForm) {
  const { confirmPassword, ...formFormatted } = form;
  const baseUrl = getApiBaseUrl();

  const response = await fetch(`${baseUrl}/v1/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formFormatted),
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