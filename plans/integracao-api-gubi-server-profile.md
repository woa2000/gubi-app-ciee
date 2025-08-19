# Plano Estratégico: Integração da API Gubi Server para Dashboard/Profile

## 📋 Visão Geral

**Objetivo**: Integrar a página dashboard/profile com a API real do Gubi Server (https://gubi-server.onrender.com), substituindo o sistema mock atual e implementando as operações de busca, edição, upload e exclusão de imagem de perfil.

**Contexto**: Atualmente a rota dashboard/profile utiliza serviços mock (mockProfile.ts) e precisa ser migrada para consumir a API real do Gubi Server conforme documentação disponível.

**Alinhamento com Diretrizes**: Segue CODE_GUIDELINES.md, PROJECT_STRUCTURE.md e requisitos de acessibilidade WCAG 2.2 AA definidos no PRD.

---

## 🎯 Agente Principal: Frontend Developer

**Justificativa**: Esta tarefa é principalmente de integração frontend, envolvendo modificação de serviços cliente, componentes React, tratamento de estados e validações de interface - competências centrais do Frontend Developer.

**Responsabilidades Principais**:
- Adaptar serviços para consumir API real
- Modificar componentes de perfil para novos contratos de API
- Implementar tratamento de erros específicos da API
- Garantir acessibilidade e performance na integração
- Validar funcionamento end-to-end da interface

---

## 👥 Agentes Secundários

### 🧪 QA Engineer
**Quando**: Etapas 4, 5 e 6
**Responsabilidades**:
- Validar integração com cenários de teste reais
- Testar upload de imagens com diferentes formatos/tamanhos
- Verificar tratamento de erros de API
- Garantir acessibilidade WCAG 2.2 AA

### 🛠️ DevOps Specialist  
**Quando**: Etapas 2 e 6
**Responsabilidades**:
- Configurar variáveis de ambiente para API real
- Monitorar performance da integração
- Configurar CORS se necessário
- Validar segurança nas requisições

### 📊 Data Analyst
**Quando**: Etapa 6
**Responsabilidades**:
- Analisar métricas de uso da nova integração
- Validar conformidade com personas do PRD
- Monitorar tempos de resposta (≤ 3s/6s)

---

## 🔍 Análise da API Gubi Server

### **Endpoints Identificados**:
- **GET /api/v1/profile** - Buscar perfil completo
- **PUT /api/v1/profile** - Atualizar dados do perfil  
- **POST /api/v1/profile/image** - Upload de imagem
- **DELETE /api/v1/profile/image** - Remover imagem

### **Autenticação**: Bearer Token (Authorization header)
### **Base URL**: https://gubi-server.onrender.com

---

## 📊 Fluxo de Desenvolvimento

### **Etapa 1: Análise e Mapeamento de Contratos** (Frontend Developer)
**Duração**: 1 dia
**Objetivo**: Mapear contratos da API real vs estrutura atual

**Entradas**:
- Documentação API Gubi Server
- Tipos TypeScript atuais (`src/types/profile.ts`)
- Serviços mock existentes (`src/services/mockProfile.ts`)

**Atividades**:
```typescript
// Criar tipos específicos para API Gubi Server
interface GubiServerProfileResponse {
  success: boolean;
  data: {
    id: string;
    email: string;
    fullName: string;
    phone?: string;
    birthDate?: string;
    profileImage?: string;
    // Mapear outros campos conforme API real
  };
  message?: string;
}

interface GubiServerUpdateRequest {
  fullName?: string;
  phone?: string;
  birthDate?: string;
  location?: string;
  // Outros campos editáveis
}

// Função de mapeamento entre tipos
const mapGubiServerToUserProfile = (response: GubiServerProfileResponse): UserProfile => {
  return {
    id: response.data.id,
    email: response.data.email,
    fullName: response.data.fullName,
    phone: response.data.phone,
    birthDate: response.data.birthDate,
    profileImage: response.data.profileImage,
    // Mapear demais campos
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isProfileComplete: false, // Calcular baseado nos dados
    // Campos padrão que podem não existir na API
    userInterests: [],
    userSkills: [],
    twoYearGoals: [],
    softSkills: [],
    skillsToImprove: [],
    hardSkills: [],
    currentDifficulties: [],
    availableDevices: [],
    country: 'BR'
  };
};
```

**Saídas**:
- Mapeamento completo de tipos API → Frontend
- Identificação de campos obrigatórios vs opcionais
- Estratégia de migração de dados
- Documentação de diferenças entre mock e API real

**Critérios de Validação**:
- ✅ Todos os endpoints da API mapeados
- ✅ Tipos TypeScript criados para responses
- ✅ Função de mapeamento implementada
- ✅ Campos obrigatórios identificados

---

### **Etapa 2: Configuração de Ambiente e Base URL** (Frontend Developer + DevOps Specialist)
**Duração**: 0.5 dias
**Objetivo**: Configurar ambiente para consumir API real

**Entradas**:
- URL base da API Gubi Server
- Estrutura atual de configuração (`src/lib/apiBase.ts`)
- Variáveis de ambiente atuais

**Atividades** (Frontend Developer):
```typescript
// Atualizar src/lib/apiBase.ts
export const getApiBaseUrl = () => {
  // Usar API real em produção e desenvolvimento
  const useRealAPI = process.env.NEXT_PUBLIC_USE_REAL_API === 'true';
  
  if (useRealAPI) {
    return 'https://gubi-server.onrender.com/api';
  }
  
  // Fallback para desenvolvimento local se necessário
  const devMode = process.env.NEXT_PUBLIC_DEV_MODE === "true";
  return devMode ? process.env.NEXT_PUBLIC_API_URL_DEV! : process.env.NEXT_PUBLIC_API_URL_PROD!;
};

// Criar função para headers padrão
export const getDefaultHeaders = (token?: string) => ({
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  ...(token && { 'Authorization': `Bearer ${token}` })
});
```

**Atividades** (DevOps Specialist):
- Adicionar `NEXT_PUBLIC_USE_REAL_API=true` no ambiente
- Verificar configurações de CORS se necessário
- Testar conectividade com API Gubi Server

**Saídas**:
- Configuração de ambiente atualizada
- Headers padrão para requisições
- Teste de conectividade com API
- Variáveis de ambiente configuradas

**Critérios de Validação**:
- ✅ API Gubi Server acessível
- ✅ Headers de autenticação funcionais
- ✅ Ambiente configurado corretamente
- ✅ Fallback para mock implementado

---

### **Etapa 3: Implementação dos Serviços de API** (Frontend Developer)
**Duração**: 2 dias
**Objetivo**: Implementar serviços reais substituindo mocks

**Entradas**:
- Mapeamento de tipos da Etapa 1
- Configuração de ambiente da Etapa 2
- Service atual (`src/services/profile.ts`)

**Atividades**:
```typescript
// Implementar GubiServerProfileService
export class GubiServerProfileService {
  private baseUrl = 'https://gubi-server.onrender.com/api';

  async getUserProfile(token: string): Promise<ProfileApiResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/v1/profile`, {
        method: 'GET',
        headers: getDefaultHeaders(token)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP ${response.status}: Erro ao buscar perfil`);
      }

      const gubiData: GubiServerProfileResponse = await response.json();
      
      // Mapear para estrutura esperada pelo frontend
      const mappedProfile = mapGubiServerToUserProfile(gubiData);
      
      return {
        success: true,
        data: mappedProfile,
        message: gubiData.message
      };
    } catch (error) {
      console.error('Erro na API Gubi Server - getUserProfile:', error);
      
      // Tratamento específico por tipo de erro
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Erro de conexão com o servidor. Verifique sua internet.');
      }
      
      throw error;
    }
  }

  async updateProfile(token: string, updates: EditableProfileFields): Promise<ProfileUpdateApiResponse> {
    try {
      // Mapear campos do frontend para formato da API
      const apiPayload: GubiServerUpdateRequest = {
        fullName: updates.fullName,
        phone: updates.phone,
        birthDate: updates.birthDate,
        location: updates.location
      };

      const response = await fetch(`${this.baseUrl}/v1/profile`, {
        method: 'PUT',
        headers: getDefaultHeaders(token),
        body: JSON.stringify(apiPayload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        
        // Tratamento específico para erros de validação
        if (response.status === 400) {
          throw new Error(`Dados inválidos: ${errorData.message}`);
        }
        
        if (response.status === 401) {
          throw new Error('Sessão expirada. Faça login novamente.');
        }
        
        throw new Error(errorData.message || 'Erro ao atualizar perfil');
      }

      const gubiData: GubiServerProfileResponse = await response.json();
      const updatedProfile = mapGubiServerToUserProfile(gubiData);
      
      return {
        success: true,
        data: updatedProfile,
        message: gubiData.message || 'Perfil atualizado com sucesso',
        changeLog: [] // API não retorna changeLog, usar array vazio
      };
    } catch (error) {
      console.error('Erro na API Gubi Server - updateProfile:', error);
      throw error;
    }
  }

  async uploadProfileImage(token: string, file: File): Promise<{success: boolean; imageUrl: string; message: string}> {
    try {
      // Validações cliente
      if (!this.isValidImageFile(file)) {
        throw new Error('Arquivo inválido. Use apenas JPG, PNG ou WebP até 2MB.');
      }

      const formData = new FormData();
      formData.append('image', file); // Verificar nome do campo na API

      const response = await fetch(`${this.baseUrl}/v1/profile/image`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
          // Não definir Content-Type para FormData (browser define automaticamente)
        },
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        
        if (response.status === 413) {
          throw new Error('Arquivo muito grande. Máximo 2MB.');
        }
        
        if (response.status === 415) {
          throw new Error('Tipo de arquivo não suportado. Use JPG, PNG ou WebP.');
        }
        
        throw new Error(errorData.message || 'Erro no upload da imagem');
      }

      const result = await response.json();
      
      return {
        success: true,
        imageUrl: result.data?.imageUrl || result.imageUrl,
        message: result.message || 'Imagem enviada com sucesso'
      };
    } catch (error) {
      console.error('Erro na API Gubi Server - uploadImage:', error);
      throw error;
    }
  }

  async removeProfileImage(token: string): Promise<{success: boolean; message: string}> {
    try {
      const response = await fetch(`${this.baseUrl}/v1/profile/image`, {
        method: 'DELETE',
        headers: getDefaultHeaders(token)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao remover imagem');
      }

      const result = await response.json();
      
      return {
        success: true,
        message: result.message || 'Imagem removida com sucesso'
      };
    } catch (error) {
      console.error('Erro na API Gubi Server - removeImage:', error);
      throw error;
    }
  }

  private isValidImageFile(file: File): boolean {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const maxSizeInMB = 2;
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

    return allowedTypes.includes(file.type) && file.size <= maxSizeInBytes;
  }
}

// Atualizar ProfileService para usar Gubi Server
export class ProfileService {
  private gubiService = new GubiServerProfileService();
  private useMockService = process.env.NEXT_PUBLIC_USE_REAL_API !== 'true';

  async getUserProfile(token: string): Promise<ProfileApiResponse> {
    if (this.useMockService) {
      return mockProfileService.getUserProfile(token);
    }
    
    return this.gubiService.getUserProfile(token);
  }

  async updateProfile(token: string, updates: EditableProfileFields): Promise<ProfileUpdateApiResponse> {
    if (this.useMockService) {
      return mockProfileService.updateProfile(token, updates);
    }
    
    return this.gubiService.updateProfile(token, updates);
  }

  async uploadProfileImage(token: string, file: File): Promise<{success: boolean; imageUrl: string; message: string}> {
    if (this.useMockService) {
      return mockProfileService.uploadProfileImage(token, file);
    }
    
    return this.gubiService.uploadProfileImage(token, file);
  }

  async removeProfileImage(token: string): Promise<{success: boolean; message: string}> {
    if (this.useMockService) {
      return mockProfileService.removeProfileImage(token);
    }
    
    return this.gubiService.removeProfileImage(token);
  }
}
```

**Saídas**:
- GubiServerProfileService implementado
- Mapeamento de dados funcionando
- Tratamento de erros específicos da API
- Validações no cliente implementadas

**Critérios de Validação**:
- ✅ Todos os endpoints implementados
- ✅ Mapeamento de dados funcionando
- ✅ Tratamento de erros robusto
- ✅ Validações de entrada implementadas

---

### **Etapa 4: Adaptação dos Components e Hooks** (Frontend Developer)
**Duração**: 1 dia
**Objetivo**: Adaptar componentes para trabalhar com nova estrutura de API

**Entradas**:
- Serviços API implementados
- Componentes atuais (`src/components/profile/`)
- Hook useProfile (`src/hooks/useProfile.ts`)

**Atividades**:
```typescript
// Atualizar useProfile para melhor tratamento de erros
export const useProfile = (): UseProfileReturn => {
  // Estados existentes...
  const [apiError, setApiError] = useState<string | null>(null);

  const refreshProfile = useCallback(async (): Promise<void> => {
    // Implementação existente...
    
    try {
      setLoading(true);
      setError(null);
      setApiError(null);

      const response = await profileService.getUserProfile(token);
      
      if (response.success && response.data) {
        setProfile(response.data);
        
        // Cache offline para melhor UX
        if (user?.id) {
          ProfileCache.saveProfile(user.id, response.data);
        }
      }
    } catch (error) {
      console.error('Erro ao buscar perfil:', error);
      
      // Tratar diferentes tipos de erro
      if (error instanceof Error) {
        if (error.message.includes('Sessão expirada')) {
          setApiError('Sua sessão expirou. Por favor, faça login novamente.');
          // Trigger logout se necessário
        } else if (error.message.includes('conexão')) {
          setApiError('Problema de conexão. Tentando usar dados salvos...');
          // Tentar usar cache
          const cachedProfile = user?.id ? ProfileCache.getProfile(user.id) : null;
          if (cachedProfile) {
            setProfile(cachedProfile);
          }
        } else {
          setApiError(error.message);
        }
      }
      
      setError(error instanceof Error ? error.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  }, [token, user?.id]);

  const updateProfile = useCallback(async (updates: EditableProfileFields): Promise<boolean> => {
    if (!token || !profile) return false;

    try {
      setSaving(true);
      setError(null);
      setApiError(null);

      const response = await profileService.updateProfile(token, updates);
      
      if (response.success && response.data) {
        setProfile(response.data);
        
        // Atualizar cache
        if (user?.id) {
          ProfileCache.saveProfile(user.id, response.data);
        }
        
        toast.success(response.message || 'Perfil atualizado com sucesso!');
        setHasUnsavedChanges(false);
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      
      const errorMessage = error instanceof Error ? error.message : 'Erro ao atualizar perfil';
      setError(errorMessage);
      setApiError(errorMessage);
      
      toast.error(errorMessage);
      return false;
    } finally {
      setSaving(false);
    }
  }, [token, profile, user?.id]);

  const uploadImage = useCallback(async (file: File): Promise<boolean> => {
    if (!token) return false;

    try {
      setUploading(true);
      setError(null);
      setApiError(null);

      const response = await profileService.uploadProfileImage(token, file);
      
      if (response.success) {
        // Atualizar profile com nova URL da imagem
        if (profile) {
          const updatedProfile = {
            ...profile,
            profileImage: response.imageUrl,
            updatedAt: new Date().toISOString()
          };
          
          setProfile(updatedProfile);
          
          if (user?.id) {
            ProfileCache.saveProfile(user.id, updatedProfile);
          }
        }
        
        toast.success(response.message || 'Imagem enviada com sucesso!');
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Erro no upload:', error);
      
      const errorMessage = error instanceof Error ? error.message : 'Erro no upload da imagem';
      setError(errorMessage);
      setApiError(errorMessage);
      
      toast.error(errorMessage);
      return false;
    } finally {
      setUploading(false);
    }
  }, [token, profile, user?.id]);

  // Return com novo campo de erro da API
  return {
    // Estados existentes...
    apiError,
    // Ações existentes...
  };
};
```

**Saídas**:
- Hook useProfile adaptado para API real
- Tratamento de erros melhorado
- Cache offline mantido
- Toast notifications específicas

**Critérios de Validação**:
- ✅ Hook funcionando com API real
- ✅ Estados de loading corretos
- ✅ Tratamento de erros específicos
- ✅ Cache offline funcional

---

### **Etapa 5: Testes de Integração** (QA Engineer + Frontend Developer)
**Duração**: 1.5 dias
**Objetivo**: Validar funcionamento completo da integração

**Entradas**:
- Sistema integrado com API real
- Componentes adaptados
- Cenários de teste das personas

**Atividades** (QA Engineer):
```typescript
// tests/integration/profileIntegration.test.ts
describe('Profile Integration with Gubi Server API', () => {
  test('should load real profile data successfully', async () => {
    const { result } = renderHook(() => useProfile(), {
      wrapper: ({ children }) => (
        <AuthProvider>
          <ToastProvider>{children}</ToastProvider>
        </AuthProvider>
      ),
    });

    // Aguardar carregamento
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Verificar se dados foram carregados
    expect(result.current.profile).toBeTruthy();
    expect(result.current.error).toBeNull();
  });

  test('should handle API errors gracefully', async () => {
    // Mock API failure
    jest.spyOn(global, 'fetch').mockRejectedValueOnce(
      new Error('Network error')
    );

    const { result } = renderHook(() => useProfile());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBeTruthy();
    expect(result.current.apiError).toContain('conexão');
  });

  test('should upload image successfully', async () => {
    const { result } = renderHook(() => useProfile());
    const mockFile = new File(['test'], 'profile.jpg', { type: 'image/jpeg' });

    act(() => {
      result.current.uploadImage(mockFile);
    });

    await waitFor(() => {
      expect(result.current.uploading).toBe(false);
    });

    expect(result.current.profile?.profileImage).toBeTruthy();
  });
});
```

**Atividades** (Frontend Developer):
- Testes manuais de upload de diferentes tipos de arquivo
- Validação de responsividade com dados reais
- Teste de performance com API real
- Verificação de tratamento de erros na UI

**Saídas**:
- Suite de testes de integração
- Relatório de bugs encontrados
- Validação de performance
- Documentação de casos edge

**Critérios de Validação**:
- ✅ Todos os cenários de teste passando
- ✅ Performance ≤ 3s para carregamento
- ✅ Upload funcional com diferentes tipos de arquivo
- ✅ Tratamento de erros visível na UI

---

### **Etapa 6: Validação Final e Monitoramento** (Todos os Agentes)
**Duração**: 1 dia
**Objetivo**: Validação completa e setup de monitoramento

**Entradas**:
- Sistema integrado e testado
- Métricas de performance
- Feedback de testes de integração

**Atividades** (QA Engineer):
```typescript
// tests/e2e/profileE2E.spec.ts
test('Complete profile management flow with real API', async ({ page }) => {
  // Login
  await page.goto('/dashboard/profile');
  
  // Aguardar carregamento dos dados reais
  await page.waitForSelector('[data-testid="profile-form"]', { timeout: 10000 });
  
  // Verificar se dados reais foram carregados
  const nameField = await page.locator('[data-testid="full-name"]');
  const nameValue = await nameField.inputValue();
  expect(nameValue).toBeTruthy(); // Deve ter valor real da API
  
  // Testar edição
  await nameField.fill('Nome Atualizado via API');
  await page.click('[data-testid="save-button"]');
  
  // Aguardar confirmação
  await expect(page.locator('.toast-success')).toBeVisible();
  
  // Testar upload de imagem
  const fileInput = page.locator('input[type="file"]');
  await fileInput.setInputFiles('tests/fixtures/profile-test.jpg');
  
  // Aguardar upload
  await expect(page.locator('[data-testid="profile-image"]')).toBeVisible();
  
  // Verificar acessibilidade
  await page.keyboard.press('Tab');
  await expect(page.locator('[data-testid="upload-area"]')).toBeFocused();
});
```

**Atividades** (DevOps Specialist):
- Configurar monitoramento de API calls
- Setup de alertas para falhas de API
- Validar logs de erro estruturados
- Verificar performance em produção

**Atividades** (Data Analyst):
- Analisar métricas de uso da nova integração
- Validar tempos de resposta da API
- Monitorar taxa de erro vs sucesso
- Comparar performance mock vs API real

**Saídas**:
- Sistema validado em produção
- Monitoramento configurado
- Métricas baseline estabelecidas
- Documentação de troubleshooting

**Critérios de Validação**:
- ✅ E2E tests passando com API real
- ✅ Performance dentro dos requisitos (≤ 3s/6s)
- ✅ Monitoramento ativo
- ✅ Zero regressões de funcionalidade
- ✅ Acessibilidade WCAG 2.2 AA mantida

---

## 📋 Pontos de Coordenação Entre Agentes

### **Checkpoint 1** (Após Etapa 1)
**Participantes**: Frontend Developer → QA Engineer
**Objetivo**: Validar mapeamento de dados e estratégia de testes
**Artefatos**: Tipos TypeScript, função de mapeamento, plano de testes

### **Checkpoint 2** (Após Etapa 3)
**Participantes**: Frontend Developer → DevOps Specialist
**Objetivo**: Validar integração e configuração de ambiente
**Artefatos**: Serviços implementados, configuração de API, testes de conectividade

### **Checkpoint 3** (Após Etapa 5)
**Participantes**: Todos os agentes
**Objetivo**: Review completo antes da validação final
**Artefatos**: Sistema integrado, testes passando, planos de monitoramento

### **Checkpoint 4** (Após Etapa 6)
**Participantes**: Frontend Developer → Project Manager
**Objetivo**: Aprovação para produção
**Artefatos**: Relatórios de teste, métricas de performance, sistema validado

---

## 🎯 Artefatos Finais

### **Código**
- GubiServerProfileService implementado
- Tipos TypeScript para API Gubi Server
- Hook useProfile adaptado para API real
- Tratamento de erros específicos implementado
- Testes de integração e E2E

### **Configuração**
- Variáveis de ambiente atualizadas
- Headers padrão para API configurados
- Fallback para mock mantido
- Monitoramento de API configurado

### **Documentação**
- Mapeamento de API documentado
- Guia de troubleshooting de integração
- Casos de erro e soluções
- Métricas de performance

### **Validação**
- Suite de testes integrada
- Performance validada (≤ 3s/6s)
- Acessibilidade WCAG 2.2 AA mantida
- Monitoramento ativo

---

## ⚠️ Riscos e Mitigações

| Risco | Probabilidade | Impacto | Mitigação |
|-------|---------------|---------|-----------|
| API Gubi Server instável | Média | Alto | Manter fallback para mock + cache offline |
| Campos da API diferentes do esperado | Alta | Médio | Mapeamento flexível + validação robusta |
| Performance degradada | Média | Médio | Monitoramento + otimização de requisições |
| Erros de CORS | Baixa | Alto | Coordenação com DevOps + teste antecipado |
| Autenticação falhando | Baixa | Crítico | Tratamento de sessão expirada + refresh token |

---

## 📈 Métricas de Sucesso

### **Funcionais**
- ✅ 100% das operações CRUD funcionando
- ✅ Upload de imagem operacional
- ✅ Tratamento de erros visível ao usuário
- ✅ Cache offline funcionando

### **Técnicas**
- ✅ Performance ≤ 3s (rede boa) / ≤ 6s (rede fraca)
- ✅ Taxa de erro < 5% em operações normais
- ✅ Cobertura de testes > 85%
- ✅ Zero regressões de acessibilidade

### **Operacionais**
- ✅ Monitoramento de API ativo
- ✅ Logs estruturados funcionando
- ✅ Alertas configurados
- ✅ Rollback funcional

---

**Prazo Estimado Total**: 6-7 dias úteis  
**Esforço**: ~45-55 horas de desenvolvimento  
**Prioridade**: Alta (desbloqueio de funcionalidades de produção)

**Dependências Externas**: 
- API Gubi Server estável e acessível
- Documentação da API atualizada
- Credenciais de acesso válidas
