# Plano Estratégico: Controller e Endpoints para Gestão do Perfil do Usuário com Upload de Imagens

## 📋 Visão Geral

**Objetivo**: Criar a infraestrutura backend completa para gestão de perfis de usuário, incluindo endpoints RESTful, controllers, validações e sistema de upload de imagens seguindo os padrões LGPD e requisitos de performance definidos no PRD.

**Contexto**: Atualmente o frontend possui componentes de perfil (ProfileImageUploader, ProfileBasicInfoForm) e serviços mock (profile.ts, mockProfile.ts), mas necessita da implementação real do backend para persistência e gestão de dados.

**Alinhamento com PRD**: RF-01 a RF-05 (contas e perfis), RF-12 (relatório de potencial), requisitos de segurança LGPD e performance para inclusão digital.

---

## 🎯 Agente Principal: Database Specialist

**Justificativa**: Esta tarefa envolve principalmente modelagem de dados, criação de schemas, endpoints de persistência e conformidade LGPD - competências centrais do Database Specialist.

**Responsabilidades Principais**:
- Desenhar schema completo para entidades de perfil
- Implementar controllers com validações de negócio
- Configurar sistema de upload seguro de imagens
- Garantir conformidade LGPD (auditoria, consentimentos)
- Otimizar queries para performance em dispositivos modestos

---

## 👥 Agentes Secundários

### 🛠️ DevOps Specialist
**Quando**: Etapas 3, 6 e 7
**Responsabilidades**:
- Configurar storage seguro para imagens (AWS S3/Azure Blob)
- Implementar pipeline de validação de arquivos
- Configurar variáveis de ambiente e secrets
- Monitorar métricas de upload e performance

### 🎨 Frontend Developer  
**Quando**: Etapas 5 e 8
**Responsabilidades**:
- Adaptar serviços frontend para novos endpoints
- Implementar tratamento de erros aprimorado
- Validar integração end-to-end
- Testes de acessibilidade com upload de imagens

### 🧪 QA Engineer
**Quando**: Etapas 6, 7 e 8
**Responsabilidades**:
- Testes de segurança em uploads
- Validação de conformidade LGPD
- Testes de performance (≤ 3s/6s conforme PRD)
- Testes de edge cases e validações

---

## 📊 Fluxo de Desenvolvimento

### **Etapa 1: Modelagem e Schema** (Database Specialist)
**Duração**: 1-2 dias
**Objetivo**: Criar estrutura de dados completa

**Entradas**:
- PRD seção 9 (Estrutura de Dados)
- Tipos TypeScript existentes (`src/types/user.ts`, `src/types/profile.ts`)
- Requisitos LGPD do PRD seção 6

**Atividades**:
```sql
-- Criar tabelas principais
CREATE TABLE usuarios (
  id UUID PRIMARY KEY,
  email VARCHAR UNIQUE NOT NULL,
  password_hash VARCHAR NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE perfis_usuario (
  id UUID PRIMARY KEY,
  usuario_id UUID REFERENCES usuarios(id),
  full_name VARCHAR(200),
  profile_image_url VARCHAR(500),
  birth_date DATE,
  phone VARCHAR(20),
  location TEXT,
  -- Campos de gamificação
  points INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  streak INTEGER DEFAULT 0,
  -- Campos de auditoria LGPD
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  consent_version VARCHAR(10),
  consent_date TIMESTAMP
);

CREATE TABLE profile_images (
  id UUID PRIMARY KEY,
  usuario_id UUID REFERENCES usuarios(id),
  original_filename VARCHAR(255),
  stored_filename VARCHAR(255),
  file_size INTEGER,
  mime_type VARCHAR(100),
  upload_date TIMESTAMP DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE profile_audit_log (
  id UUID PRIMARY KEY,
  usuario_id UUID REFERENCES usuarios(id),
  field_name VARCHAR(100),
  old_value TEXT,
  new_value TEXT,
  changed_at TIMESTAMP DEFAULT NOW(),
  ip_address INET,
  user_agent TEXT
);
```

**Saídas**:
- Script SQL de migração
- Documentação do schema
- Índices otimizados para consultas de perfil

**Critérios de Validação**:
- ✅ Todas as entidades do PRD seção 9 mapeadas
- ✅ Relacionamentos com integridade referencial
- ✅ Campos de auditoria LGPD implementados
- ✅ Índices para otimização de consultas (≤ 3s)

---

### **Etapa 2: Controllers Base** (Database Specialist)
**Duração**: 2-3 dias  
**Objetivo**: Implementar controllers REST para operações CRUD

**Entradas**:
- Schema validado da Etapa 1
- Interfaces TypeScript existentes
- Padrões de código em `docs/CODE_GUIDELINES.md`

**Atividades**:
```typescript
// controllers/ProfileController.ts
import { Request, Response } from 'express';
import { ProfileService } from '../services/ProfileService';
import { validateProfileUpdate } from '../validators/profileValidators';
import { auditLogger } from '../utils/auditLogger';

export class ProfileController {
  constructor(private profileService: ProfileService) {}

  async getUserProfile(req: Request, res: Response) {
    try {
      const userId = req.user.id;
      const profile = await this.profileService.getUserProfile(userId);
      
      auditLogger.logAccess(userId, 'profile_view', req.ip, req.get('User-Agent'));
      
      res.json({ success: true, data: profile });
    } catch (error) {
      console.error('Erro ao buscar perfil:', error);
      res.status(500).json({ success: false, error: 'Erro interno do servidor' });
    }
  }

  async updateProfile(req: Request, res: Response) {
    try {
      const userId = req.user.id;
      const updates = req.body;

      // Validação de entrada
      const validation = await validateProfileUpdate(updates);
      if (!validation.isValid) {
        return res.status(400).json({ 
          success: false, 
          error: 'Dados inválidos', 
          details: validation.errors 
        });
      }

      // Buscar valores antigos para auditoria
      const oldProfile = await this.profileService.getUserProfile(userId);
      
      // Atualizar perfil
      const updatedProfile = await this.profileService.updateProfile(userId, updates);
      
      // Log de auditoria LGPD
      await this.logProfileChanges(userId, oldProfile, updates, req);
      
      res.json({ success: true, data: updatedProfile });
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      res.status(500).json({ success: false, error: 'Erro ao atualizar perfil' });
    }
  }

  private async logProfileChanges(userId: string, oldProfile: any, updates: any, req: Request) {
    for (const [field, newValue] of Object.entries(updates)) {
      if (oldProfile[field] !== newValue) {
        await auditLogger.logChange(
          userId,
          field,
          oldProfile[field],
          newValue,
          req.ip,
          req.get('User-Agent')
        );
      }
    }
  }
}
```

**Saídas**:
- Controllers para operações CRUD de perfil
- Sistema de validação de entrada
- Middleware de auditoria LGPD
- Tratamento padronizado de erros

**Critérios de Validação**:
- ✅ Endpoints seguem padrões REST
- ✅ Validação de entrada implementada
- ✅ Logs de auditoria LGPD funcionais
- ✅ Tratamento de erros padronizado

---

### **Etapa 3: Sistema de Upload de Imagens** (Database Specialist + DevOps Specialist)
**Duração**: 2-3 dias
**Objetivo**: Implementar upload seguro de imagens de perfil

**Entradas**:
- Controllers base validados
- Requisitos de segurança do PRD
- Especificações de performance (≤ 3s/6s)

**Atividades** (Database Specialist):
```typescript
// services/ImageUploadService.ts
import multer from 'multer';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import { ProfileImageRepository } from '../repositories/ProfileImageRepository';

export class ImageUploadService {
  private allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];
  private maxFileSize = 2 * 1024 * 1024; // 2MB
  private maxDimensions = { width: 1024, height: 1024 };

  constructor(private imageRepository: ProfileImageRepository) {}

  async uploadProfileImage(userId: string, file: Express.Multer.File): Promise<string> {
    // Validação de arquivo
    this.validateImageFile(file);

    // Processar imagem (redimensionar, otimizar)
    const processedBuffer = await this.processImage(file.buffer);
    
    // Gerar nome único
    const filename = `profile_${userId}_${uuidv4()}.webp`;
    
    // Salvar no storage (S3/Azure Blob)
    const imageUrl = await this.saveToStorage(filename, processedBuffer);
    
    // Registrar no banco
    await this.imageRepository.saveImageRecord({
      userId,
      originalFilename: file.originalname,
      storedFilename: filename,
      fileSize: processedBuffer.length,
      mimeType: 'image/webp',
      imageUrl
    });
    
    // Remover imagem anterior
    await this.removeOldProfileImage(userId);
    
    return imageUrl;
  }

  private validateImageFile(file: Express.Multer.File): void {
    if (!this.allowedMimeTypes.includes(file.mimetype)) {
      throw new Error('Tipo de arquivo não suportado. Use JPG, PNG ou WebP.');
    }
    
    if (file.size > this.maxFileSize) {
      throw new Error('Arquivo muito grande. Máximo 2MB.');
    }
  }

  private async processImage(buffer: Buffer): Promise<Buffer> {
    return sharp(buffer)
      .resize(this.maxDimensions.width, this.maxDimensions.height, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .webp({ quality: 80 })
      .toBuffer();
  }
}
```

**Atividades** (DevOps Specialist):
- Configurar AWS S3 ou Azure Blob Storage
- Implementar CDN para servir imagens
- Configurar políticas de segurança (CORS, bucket policies)
- Variáveis de ambiente para credenciais

**Saídas**:
- Serviço de upload completo e seguro
- Storage em nuvem configurado
- Processamento de imagens otimizado
- CDN para performance global

**Critérios de Validação**:
- ✅ Upload funciona em ≤ 3s (rede boa)
- ✅ Validações de segurança implementadas
- ✅ Imagens otimizadas para dispositivos modestos
- ✅ Storage seguro configurado

---

### **Etapa 4: Endpoints RESTful Completos** (Database Specialist)
**Duração**: 1-2 dias
**Objetivo**: Implementar todos os endpoints de perfil

**Entradas**:
- Controllers e serviços validados
- Sistema de upload funcionando
- Documentação de API

**Atividades**:
```typescript
// routes/profileRoutes.ts
import { Router } from 'express';
import { ProfileController } from '../controllers/ProfileController';
import { ImageUploadController } from '../controllers/ImageUploadController';
import { authMiddleware } from '../middleware/authMiddleware';
import { uploadMiddleware } from '../middleware/uploadMiddleware';

const router = Router();
const profileController = new ProfileController();
const imageController = new ImageUploadController();

// Todas as rotas requerem autenticação
router.use(authMiddleware);

// GET /api/v1/profile - Buscar perfil do usuário
router.get('/', profileController.getUserProfile.bind(profileController));

// PATCH /api/v1/profile - Atualizar perfil
router.patch('/', profileController.updateProfile.bind(profileController));

// POST /api/v1/profile/image - Upload de imagem de perfil
router.post('/image', 
  uploadMiddleware.single('profileImage'),
  imageController.uploadImage.bind(imageController)
);

// DELETE /api/v1/profile/image - Remover imagem de perfil
router.delete('/image', imageController.removeImage.bind(imageController));

// GET /api/v1/profile/history - Histórico de alterações (LGPD)
router.get('/history', profileController.getProfileHistory.bind(profileController));

export default router;
```

**Saídas**:
- Endpoints REST completos e documentados
- Middlewares de autenticação e validação
- Documentação OpenAPI/Swagger
- Testes unitários dos endpoints

**Critérios de Validação**:
- ✅ Todos os endpoints do service frontend cobertos
- ✅ Documentação OpenAPI gerada
- ✅ Middlewares de segurança implementados
- ✅ Testes unitários passando

---

### **Etapa 5: Integração Frontend** (Frontend Developer)
**Duração**: 1 dia
**Objetivo**: Conectar componentes frontend aos endpoints reais

**Entradas**:
- Endpoints funcionando e documentados
- Componentes frontend existentes
- Service layer atual (profile.ts)

**Atividades**:
```typescript
// Atualizar src/services/profile.ts
export class ProfileService {
  private baseUrl = getApiBaseUrl();

  async getUserProfile(token: string): Promise<ProfileApiResponse> {
    // Remover lógica de mock, usar endpoints reais
    const response = await fetch(`${this.baseUrl}/v1/profile`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erro ao carregar perfil');
    }

    return response.json();
  }

  async uploadProfileImage(token: string, file: File): Promise<UploadResponse> {
    const formData = new FormData();
    formData.append('profileImage', file);

    const response = await fetch(`${this.baseUrl}/v1/profile/image`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erro no upload');
    }

    return response.json();
  }
}
```

**Saídas**:
- Service layer atualizado para APIs reais
- Remoção da lógica mock
- Tratamento de erros aprimorado
- Cache atualizado com dados reais

**Critérios de Validação**:
- ✅ Componentes funcionando com APIs reais
- ✅ Tratamento de erros melhorado
- ✅ Performance mantida (≤ 3s/6s)
- ✅ Mock removido completamente

---

### **Etapa 6: Testes de Segurança e LGPD** (QA Engineer + DevOps Specialist)
**Duração**: 2 dias
**Objetivo**: Validar conformidade LGPD e segurança

**Entradas**:
- Sistema completo integrado
- Requisitos LGPD do PRD
- Checklist de segurança

**Atividades** (QA Engineer):
```typescript
// tests/security/profileSecurity.test.ts
describe('Profile Security Tests', () => {
  test('should not allow unauthorized access to profile', async () => {
    const response = await request(app)
      .get('/api/v1/profile')
      .expect(401);
    
    expect(response.body).toHaveProperty('error');
  });

  test('should validate file types in upload', async () => {
    const response = await request(app)
      .post('/api/v1/profile/image')
      .set('Authorization', `Bearer ${validToken}`)
      .attach('profileImage', 'tests/fixtures/malicious.exe')
      .expect(400);
    
    expect(response.body.error).toContain('Tipo de arquivo não suportado');
  });

  test('should log profile changes for LGPD audit', async () => {
    await request(app)
      .patch('/api/v1/profile')
      .set('Authorization', `Bearer ${validToken}`)
      .send({ fullName: 'Nome Atualizado' })
      .expect(200);
    
    const auditLogs = await getAuditLogs(userId);
    expect(auditLogs).toHaveLength(1);
    expect(auditLogs[0]).toHaveProperty('fieldName', 'fullName');
  });
});
```

**Atividades** (DevOps Specialist):
- Scan de vulnerabilidades em dependências
- Testes de penetração em endpoints de upload
- Validação de configurações de storage
- Verificação de logs de auditoria

**Saídas**:
- Relatório de segurança completo
- Testes automatizados de segurança
- Conformidade LGPD validada
- Configurações de produção seguras

**Critérios de Validação**:
- ✅ Zero vulnerabilidades críticas
- ✅ Uploads seguros validados
- ✅ Auditoria LGPD funcionando
- ✅ Configurações de produção validadas

---

### **Etapa 7: Testes de Performance** (QA Engineer + DevOps Specialist)
**Duração**: 1-2 dias
**Objetivo**: Garantir performance conforme PRD (≤ 3s/6s)

**Entradas**:
- Sistema seguro e validado
- Requisitos de performance do PRD
- Métricas de inclusão digital

**Atividades**:
```javascript
// tests/performance/profilePerformance.test.js
import { check } from 'k6';
import http from 'k6/http';

export let options = {
  stages: [
    { duration: '2m', target: 100 }, // ramp up
    { duration: '5m', target: 100 }, // stay at 100 users
    { duration: '2m', target: 0 },   // ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<3000'], // 95% requests under 3s
    http_req_failed: ['rate<0.1'],     // error rate under 10%
  },
};

export default function () {
  // Test profile loading
  let profileRes = http.get(`${BASE_URL}/v1/profile`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
  
  check(profileRes, {
    'profile loads in under 3s': (r) => r.timings.duration < 3000,
    'profile returns successfully': (r) => r.status === 200,
  });

  // Test image upload (smaller file for load testing)
  let imageData = open('../fixtures/test-profile.jpg', 'b');
  let uploadRes = http.post(`${BASE_URL}/v1/profile/image`, 
    { profileImage: http.file(imageData, 'test-profile.jpg') },
    { headers: { Authorization: `Bearer ${TOKEN}` } }
  );
  
  check(uploadRes, {
    'upload completes in under 6s': (r) => r.timings.duration < 6000,
    'upload succeeds': (r) => r.status === 200,
  });
}
```

**Saídas**:
- Relatório de performance detalhado
- Métricas de carga validadas
- Otimizações implementadas
- Dashboard de monitoramento

**Critérios de Validação**:
- ✅ P95 de requests ≤ 3s (rede boa)
- ✅ Uploads ≤ 6s (rede fraca)
- ✅ Zero erros em carga normal
- ✅ Métricas de monitoramento ativas

---

### **Etapa 8: Testes End-to-End** (Frontend Developer + QA Engineer)
**Duração**: 1-2 dias
**Objetivo**: Validar jornada completa do usuário

**Entradas**:
- Sistema completo e performante
- Componentes frontend integrados
- Personas do PRD para testes

**Atividades**:
```typescript
// tests/e2e/profileJourney.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Profile Management Journey', () => {
  test('Young Explorer can complete profile setup', async ({ page }) => {
    // Login como Jovem Explorador
    await page.goto('/dashboard/profile');
    await page.waitForLoadState('networkidle');

    // Upload de foto de perfil
    await page.locator('[data-testid="upload-area"]').click();
    await page.setInputFiles('input[type="file"]', 'tests/fixtures/profile.jpg');
    
    // Verificar upload bem-sucedido
    await expect(page.locator('[data-testid="profile-image"]')).toBeVisible();
    
    // Preencher formulário básico
    await page.fill('[data-testid="full-name"]', 'João Explorador');
    await page.fill('[data-testid="phone"]', '11999999999');
    await page.selectOption('[data-testid="location"]', 'São Paulo - SP');
    
    // Salvar alterações
    await page.click('[data-testid="save-button"]');
    
    // Verificar sucesso
    await expect(page.locator('.toast-success')).toBeVisible();
    await expect(page.locator('.toast-success')).toContainText('Perfil atualizado com sucesso');
  });

  test('Profile is accessible via keyboard navigation', async ({ page }) => {
    await page.goto('/dashboard/profile');
    
    // Navegar apenas com Tab
    await page.keyboard.press('Tab');
    await expect(page.locator('[data-testid="upload-area"]')).toBeFocused();
    
    await page.keyboard.press('Tab');
    await expect(page.locator('[data-testid="full-name"]')).toBeFocused();
    
    // Verificar que todos os elementos são acessíveis
    const focusableElements = await page.locator('[tabindex]:not([tabindex="-1"])').count();
    expect(focusableElements).toBeGreaterThan(0);
  });
});
```

**Saídas**:
- Suite completa de testes E2E
- Cobertura de todas as personas
- Validação de acessibilidade
- Documentação de casos de uso

**Critérios de Validação**:
- ✅ Jornada completa funciona para 3 personas
- ✅ Acessibilidade WCAG 2.2 AA validada
- ✅ Performance ≤ 3s/6s confirmada
- ✅ Casos de erro bem tratados

---

## 📋 Pontos de Coordenação Entre Agentes

### **Checkpoint 1** (Após Etapa 1)
**Participantes**: Database Specialist → DevOps Specialist
**Objetivo**: Validar estratégia de storage e infraestrutura
**Artefatos**: Schema SQL, plano de storage, configurações

### **Checkpoint 2** (Após Etapa 3)
**Participantes**: Database Specialist → Frontend Developer  
**Objetivo**: Alinhar interfaces de API com componentes
**Artefatos**: Documentação OpenAPI, contratos de API

### **Checkpoint 3** (Após Etapa 5)
**Participantes**: Todos os agentes
**Objetivo**: Review completo antes dos testes finais
**Artefatos**: Sistema integrado, planos de teste

### **Checkpoint 4** (Após Etapa 8)
**Participantes**: Database Specialist → Project Manager
**Objetivo**: Aprovação para produção
**Artefatos**: Relatórios de teste, métricas de performance

---

## 🎯 Artefatos Finais

### **Código**
- Controllers REST completos com validações
- Serviços de upload seguros e otimizados
- Migrações de banco de dados
- Middleware de auditoria LGPD
- Testes unitários e de integração

### **Documentação**
- Documentação OpenAPI completa
- Schema de banco de dados comentado
- Guia de configuração de ambiente
- Runbook de operações

### **Infraestrutura**
- Storage em nuvem configurado
- Pipeline CI/CD atualizado
- Monitoramento e alertas
- Configurações de segurança

### **Validação**
- Relatório de conformidade LGPD
- Métricas de performance validadas
- Cobertura de testes > 80%
- Aprovação de segurança

---

## ⚠️ Riscos e Mitigações

| Risco | Probabilidade | Impacto | Mitigação |
|-------|---------------|---------|-----------|
| Problemas de performance em upload | Média | Alto | Etapa 3 inclui otimização de imagens e CDN |
| Falhas de conformidade LGPD | Baixa | Crítico | Etapa 6 dedicada exclusivamente à validação |
| Integração frontend complexa | Média | Médio | Checkpoint 2 para alinhamento antecipado |
| Vulnerabilidades de segurança | Baixa | Crítico | Etapa 6 inclui testes de penetração |

---

## 📈 Métricas de Sucesso

### **Técnicas**
- ✅ Cobertura de testes > 80%
- ✅ Performance ≤ 3s (rede boa) / ≤ 6s (rede fraca)
- ✅ Zero vulnerabilidades críticas
- ✅ 100% conformidade LGPD

### **Funcionais**
- ✅ Upload de imagem funcional
- ✅ CRUD de perfil completo
- ✅ Auditoria de mudanças
- ✅ Acessibilidade WCAG 2.2 AA

### **Operacionais**
- ✅ API documentada (OpenAPI)
- ✅ Monitoramento ativo
- ✅ Deploy automatizado
- ✅ Rollback funcional

---

**Prazo Estimado Total**: 12-15 dias úteis
**Esforço**: ~80-100 horas de desenvolvimento
**Prioridade**: Alta (bloqueante para funcionalidades de perfil)
