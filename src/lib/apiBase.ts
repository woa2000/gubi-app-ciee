export const getApiBaseUrl = () => {
  // Usar API real do Gubi Server quando configurado
  const useRealAPI = process.env.NEXT_PUBLIC_USE_REAL_API === 'true';
  
  if (useRealAPI) {
    return 'https://gubi-server.onrender.com/api';
  }
  
  // Fallback para configuração original
  const devMode = process.env.NEXT_PUBLIC_DEV_MODE === "true";
  return devMode ? process.env.NEXT_PUBLIC_API_URL_DEV! : process.env.NEXT_PUBLIC_API_URL_PROD!;
};

/**
 * Gera headers padrão para requisições da API Gubi Server
 */
export const getDefaultHeaders = (token?: string): Record<string, string> => ({
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  ...(token && { 'Authorization': `Bearer ${token}` })
});

/**
 * Gera headers específicos para upload de arquivos (FormData)
 */
export const getUploadHeaders = (token?: string): Record<string, string> => ({
  // Não definir Content-Type para FormData - o browser define automaticamente
  'Accept': 'application/json',
  ...(token && { 'Authorization': `Bearer ${token}` })
});