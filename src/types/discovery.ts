export interface DiscoveryResumeRequest {
  number: string; // Campo obrigatório conforme API do servidor
  // Outros campos opcionais para possíveis expansões futuras
  userId?: number;
  user_id?: number;
  activityId?: string;
  activity_id?: string;
  sessionId?: string;
  session_id?: string;
  completedAt?: string;
  completed_at?: string;
  data?: unknown;
  responses?: unknown[];
}

export interface DiscoveryResumeResponse {
  type: 'success' | 'error';
  status: string;
  success: boolean;
  message?: string;
  resume?: string; // Resume será extraído do discoveryProgress
}

export interface DiscoveryData {
  // Defina a estrutura dos dados do discovery conforme necessário
  userId: number;
  activityId?: string;
  completedAt?: string;
  responses?: unknown[];
}