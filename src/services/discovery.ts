import { getDefaultHeaders, getApiBaseUrl } from '@/lib/apiBase';
import { DiscoveryResumeRequest, DiscoveryResumeResponse } from '@/types/discovery';

/**
 * Envia dados para o endpoint de resume do discovery
 * @param data - Dados a serem enviados (deve conter o campo 'number')
 * @param token - Token de autenticação
 * @returns Promise com a resposta contendo o resume
 */
export const sendDiscoveryResume = async (
  data: DiscoveryResumeRequest,
  token?: string
): Promise<DiscoveryResumeResponse> => {
  try {
    // Usar a mesma URL base dos outros serviços
    const baseUrl = getApiBaseUrl();
    const headers = getDefaultHeaders(token);

    console.log('📤 Discovery API Request:', {
      url: `${baseUrl}/v1/discovery/resume/send`,
      method: 'POST',
      headers: headers,
      data: data
    });

    if (!data.number) {
      throw new Error('Campo "number" é obrigatório');
    }

    const response = await fetch(`${baseUrl}/v1/discovery/resume/send`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ number: data.number }),
    });

    console.log(`📡 Response status: ${response.status} ${response.statusText}`);

    if (!response.ok) {
      // Tentar obter detalhes do erro da resposta
      let errorDetails = `HTTP error! status: ${response.status}`;
      try {
        const errorBody = await response.text();
        console.error('❌ Detalhes do erro da API:', errorBody);
        errorDetails += ` - ${errorBody}`;
      } catch {
        console.error('Não foi possível ler o corpo da resposta de erro');
      }
      throw new Error(errorDetails);
    }

    const result = await response.json();
    console.log('✅ Discovery API Response:', result);
    
    // A API retorna: { type: "success", status: "Email enviado e resumo atualizado com sucesso." }
    // O resume fica salvo no banco e precisamos buscá-lo via outro endpoint ou usar o number enviado
    return {
      type: result.type || 'success',
      status: result.status || 'Processado com sucesso',
      success: result.type === 'success',
      message: result.status,
      resume: data.number // Usar o number como resume, já que é o identificador do PDF
    };
  } catch (error) {
    console.error('🚨 Erro ao enviar dados do discovery:', error);
    return {
      type: 'error',
      status: error instanceof Error ? error.message : 'Erro desconhecido',
      success: false,
      message: error instanceof Error ? error.message : 'Erro desconhecido'
    };
  }
};

/**
 * Gera o caminho do PDF baseado no resume
 * @param resume - String resume retornada da API
 * @returns Caminho do PDF
 */
export const generatePdfReportPath = (resume: string): string => {
  if (!resume) {
    return '';
  }
  return `${resume}.pdf`;
};