# Plano Estratégico: Correção do Redirecionamento Pós-Login

**Data**: 18 de agosto de 2025  
**Projeto**: Gubi App - Sistema de Autenticação  
**Versão**: 1.0  
**Status**: Pronto para Execução

---

## 📋 **Resumo Executivo**

### **Problema Identificado**
O sistema apresenta inconsistência no processo de autenticação: usuários fazem login com sucesso (mensagem de boas-vindas é exibida), mas não são redirecionados automaticamente para o dashboard devido à dessincronia entre a estratégia de armazenamento do token no frontend e a verificação no middleware.

### **Causa Raiz**
- **Frontend (page.tsx)**: Armazena token como `gubi_token` no `localStorage`
- **Middleware (middleware.ts)**: Procura por `auth_token` nos `cookies`
- **Resultado**: Middleware não encontra o token e impede o redirecionamento

### **Impacto**
- **Usuário**: Experiência frustrada - login aparenta falhar mesmo sendo bem-sucedido
- **Produto**: Barreira crítica no onboarding e retenção de usuários
- **Técnico**: Inconsistência arquitetural no sistema de autenticação

---

## 🎯 **Definição de Papéis e Responsabilidades**

### **Agente Principal**
**Frontend Developer** - Líder técnico para implementação completa
- Implementação das correções no código
- Criação de utilitários de autenticação
- Integração com middleware existente
- Validação técnica inicial

### **Agentes Secundários**

#### **DevOps Specialist**
- Configuração de ambiente para testes
- Validação de segurança dos cookies
- Deploy e monitoramento da solução
- Verificação de compatibilidade entre ambientes

#### **QA Engineer**
- Execução de testes funcionais completos
- Validação de casos edge e cenários de erro
- Testes de regressão do fluxo de autenticação
- Documentação de casos de teste

#### **Project Manager**
- Coordenação entre agentes
- Aprovação de checkpoints
- Gestão de riscos e cronograma
- Validação final da solução

---

## 🚀 **Plano de Execução Detalhado**

### **FASE 1: Diagnóstico e Planejamento** ⏱️ *30 minutos*

#### **Checkpoint 1.1: [Frontend Developer] Análise Técnica Completa**
**Tempo**: 15 min  
**Entradas**: Código atual (page.tsx, middleware.ts)  
**Saídas**: Relatório técnico de inconsistências

**Atividades**:
1. Mapear fluxo completo de autenticação atual
2. Identificar todos os pontos de falha
3. Documentar estratégias de armazenamento conflitantes
4. Avaliar impacto nos usuários já logados

**Critério Go/No-Go**: Confirmação técnica da causa raiz ✅

#### **Checkpoint 1.2: [Project Manager] Escolha da Estratégia**
**Tempo**: 15 min  
**Entradas**: Relatório técnico, requisitos de segurança  
**Saídas**: Decisão arquitetural aprovada

**Opções Avaliadas**:
| Estratégia | Prós | Contras | Recomendação |
|------------|------|---------|--------------|
| **A) Cookies seguros** | ✅ SSR nativo, ✅ Segurança, ✅ Middleware compatível | ⚠️ Config adicional | **APROVADA** |
| **B) LocalStorage** | ✅ Simples implementação | ❌ Não SSR, ❌ Menos seguro | Rejeitada |
| **C) Solução híbrida** | ✅ Flexibilidade | ❌ Complexidade desnecessária | Rejeitada |

**Critério Go/No-Go**: Estratégia definida e aprovada por todos os agentes ✅

---

### **FASE 2: Implementação Core** ⏱️ *45 minutos*

#### **Checkpoint 2.1: [Frontend Developer] Criação de Utilitários Base**
**Tempo**: 15 min  
**Arquivo**: `src/lib/cookies.ts` (novo)

```typescript
// src/lib/cookies.ts
interface CookieOptions {
  days?: number;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
  httpOnly?: boolean;
}

export const setCookie = (
  name: string, 
  value: string, 
  options: CookieOptions = {}
): void => {
  const {
    days = 7,
    secure = true,
    sameSite = 'strict',
    httpOnly = false
  } = options;

  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
  const cookieString = [
    `${name}=${value}`,
    `expires=${expires}`,
    'path=/',
    secure ? 'secure' : '',
    `samesite=${sameSite}`,
    httpOnly ? 'httponly' : ''
  ].filter(Boolean).join('; ');

  document.cookie = cookieString;
};

export const getCookie = (name: string): string | null => {
  if (typeof document === 'undefined') return null;
  
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null;
  }
  
  return null;
};

export const removeCookie = (name: string): void => {
  if (typeof document === 'undefined') return;
  
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; secure; samesite=strict`;
};

export const hasCookie = (name: string): boolean => {
  return getCookie(name) !== null;
};
```

**Validação**: Utilitário criado e testado em console do browser ✅

#### **Checkpoint 2.2: [Frontend Developer] Hook de Autenticação**
**Tempo**: 15 min  
**Arquivo**: `src/hooks/useAuth.ts` (novo)

```typescript
// src/hooks/useAuth.ts
import { useRouter } from 'next/navigation';
import { setCookie, getCookie, removeCookie } from '@/lib/cookies';
import { toast } from 'sonner';

interface User {
  id: number;
  name: string;
  email: string;
  isFirstLogin?: boolean;
}

interface AuthResult {
  id: number;
  name: string;
  email: string;
  token: string;
  isFirstLogin?: boolean;
}

export const useAuth = () => {
  const router = useRouter();

  const login = (authResult: AuthResult) => {
    try {
      // Define cookie de autenticação (compatível com middleware)
      setCookie('auth_token', authResult.token, {
        days: 7,
        secure: true,
        sameSite: 'strict'
      });

      // Define cookie com dados do usuário
      const userData = {
        id: authResult.id,
        name: authResult.name,
        email: authResult.email,
        isFirstLogin: authResult.isFirstLogin
      };
      
      setCookie('user_data', JSON.stringify(userData), {
        days: 7,
        secure: true,
        sameSite: 'strict'
      });

      // Migração suave: remove dados antigos do localStorage se existirem
      if (typeof window !== 'undefined') {
        localStorage.removeItem('gubi_token');
        localStorage.removeItem('gubi_user');
      }

      return true;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      toast.error('Erro interno. Tente novamente.');
      return false;
    }
  };

  const logout = () => {
    removeCookie('auth_token');
    removeCookie('user_data');
    
    // Limpeza adicional do localStorage (dados legados)
    if (typeof window !== 'undefined') {
      localStorage.removeItem('gubi_token');
      localStorage.removeItem('gubi_user');
    }
    
    router.push('/');
  };

  const getCurrentUser = (): User | null => {
    const userDataStr = getCookie('user_data');
    if (!userDataStr) return null;
    
    try {
      return JSON.parse(userDataStr);
    } catch {
      return null;
    }
  };

  const isAuthenticated = (): boolean => {
    return getCookie('auth_token') !== null;
  };

  return {
    login,
    logout,
    getCurrentUser,
    isAuthenticated
  };
};
```

**Validação**: Hook criado com tipagem TypeScript completa ✅

#### **Checkpoint 2.3: [Frontend Developer] Atualização da Página de Login**
**Tempo**: 15 min  
**Arquivo**: `src/app/page.tsx`

```typescript
// src/app/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import LoginForm from "@/components/LoginForm";
import PromoSection from "@/components/PromoSection";
import { loginUser } from "@/services/auth";
import { useAuth } from "@/hooks/useAuth";

export default function HomePage() {
  const router = useRouter();
  const { login, isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  // Verificar se usuário já está logado na inicialização
  useEffect(() => {
    if (isAuthenticated()) {
      router.push("/dashboard");
    }
  }, [router, isAuthenticated]);

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      const result = await loginUser(email, password);
      
      // Usar o novo sistema de autenticação com cookies
      const loginSuccess = login(result);
      
      if (!loginSuccess) {
        throw new Error("Falha ao processar login");
      }

      toast.success(`Bem-vindo(a) de volta, ${result.name}!`, {
        description: "Redirecionando para seu dashboard..."
      });

      // Pequeno delay para melhor UX (usuário vê a mensagem)
      setTimeout(() => {
        // Redirecionar baseado no estado do usuário
        if (result.isFirstLogin) {
          router.push("/onboarding");
        } else {
          router.push("/dashboard");
        }
      }, 1000);
      
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erro ao fazer login";
      toast.error(message, {
        description: "Verifique suas credenciais e tente novamente."
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="w-full py-6 px-4 border-b border-gray-100 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/gubi-logo.png"
              alt="Gubi"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
          </Link>

          <div className="flex items-center space-x-4">
            <Link 
              href="/cadastro"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Criar conta
            </Link>
            <Link
              href="/forgot-password"
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Esqueci minha senha
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex">
        {/* Left Side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Bem-vindo de volta!
              </h1>
              <p className="text-gray-600">
                Faça login para continuar sua jornada de crescimento
              </p>
            </div>

            <LoginForm onSubmit={handleLogin} isLoading={isLoading} />

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Não tem uma conta?{' '}
                <Link
                  href="/cadastro"
                  className="font-medium text-purple-600 hover:text-purple-500 transition-colors"
                >
                  Cadastre-se gratuitamente
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Promo Section */}
        <div className="hidden lg:block lg:w-1/2">
          <PromoSection />
        </div>
      </main>
    </div>
  );
}
```

**Validação**: Integração completa com novo sistema de cookies ✅

---

### **FASE 3: Testes e Validação** ⏱️ *30 minutos*

#### **Checkpoint 3.1: [QA Engineer] Testes Funcionais**
**Tempo**: 20 min

**Casos de Teste Obrigatórios**:

| ID | Cenário | Entrada | Resultado Esperado | Status |
|----|---------|---------|-------------------|---------|
| **CT-01** | Login válido (usuário comum) | Email/senha corretos, isFirstLogin=false | Redirecionamento para /dashboard | ⏳ |
| **CT-02** | Login válido (primeiro acesso) | Email/senha corretos, isFirstLogin=true | Redirecionamento para /onboarding | ⏳ |
| **CT-03** | Login inválido | Credenciais incorretas | Mensagem de erro, permanece na página | ⏳ |
| **CT-04** | Acesso direto ao dashboard (sem login) | URL /dashboard sem auth_token | Redirecionamento para / | ⏳ |
| **CT-05** | Usuário logado acessa página login | URL / com auth_token válido | Redirecionamento para /dashboard | ⏳ |
| **CT-06** | Persistência entre sessões | Login → fechar browser → abrir | Usuário continua logado | ⏳ |
| **CT-07** | Logout funcional | Clicar em logout | Cookies removidos + redirecionamento | ⏳ |
| **CT-08** | Migração de dados legados | localStorage com gubi_token → login novo | Dados migrados + localStorage limpo | ⏳ |

#### **Checkpoint 3.2: [DevOps Specialist] Testes Técnicos**
**Tempo**: 10 min

**Validações de Infraestrutura**:
- ✅ **Cookies definidos corretamente**: `auth_token` e `user_data` presentes
- ✅ **Flags de segurança**: `Secure`, `SameSite=Strict`, `Path=/`
- ✅ **Expiração apropriada**: 7 dias configurados
- ✅ **Middleware compatível**: Reconhece `auth_token` nos cookies
- ✅ **Headers de resposta**: No CORS issues
- ✅ **Performance**: Redirecionamento < 2 segundos

**Critério Go/No-Go**: Todos os testes passam ✅

---

### **FASE 4: Deploy e Monitoramento** ⏱️ *15 minutos*

#### **Checkpoint 4.1: [DevOps Specialist] Deploy Seguro**
**Tempo**: 10 min

**Procedimento de Deploy**:
1. **Deploy em desenvolvimento** → Validação completa
2. **Smoke tests** → Fluxo crítico funcionando
3. **Deploy em produção** → Rollback pronto se necessário
4. **Monitoramento** → Logs de autenticação + métricas de redirecionamento

#### **Checkpoint 4.2: [Project Manager] Validação Final**
**Tempo**: 5 min

**Checklist de Aprovação**:
- [ ] Todos os casos de teste passaram
- [ ] Performance dentro dos SLAs
- [ ] Nenhum erro crítico em produção
- [ ] Documentação atualizada
- [ ] Equipe treinada na nova implementação

**Critério Go/No-Go**: Aprovação formal para liberação ✅

---

## ⚠️ **Gestão de Riscos**

| Risco | Probabilidade | Impacto | Estratégia de Mitigação | Plano B |
|-------|---------------|---------|------------------------|---------|
| **Usuários logados perdem sessão** | Média | Alto | Migração automática de localStorage para cookies | Script de recuperação manual |
| **Incompatibilidade CORS** | Baixa | Alto | Configuração cuidadosa de SameSite e Secure | Fallback temporário para localStorage |
| **Problemas de performance** | Baixa | Médio | Testes de carga antes do deploy | Otimização de cookies |
| **Browsers antigos não suportam** | Baixa | Baixo | Feature detection + graceful degradation | Notificação para atualizar browser |

---

## 📦 **Artefatos de Entrega**

### **Código Fonte**
1. **`src/lib/cookies.ts`** - Utilitários de manipulação de cookies
2. **`src/hooks/useAuth.ts`** - Hook de autenticação centralizado  
3. **`src/app/page.tsx`** - Página de login atualizada
4. **`src/services/auth.ts`** - Função de logout (extensão)

### **Documentação**
1. **Guia de Migração** - Para desenvolvedores
2. **Casos de Teste Validados** - Para QA
3. **Checklist de Deploy** - Para DevOps
4. **Troubleshooting Guide** - Para suporte

### **Configuração**
1. **Middleware validado** - Compatibilidade garantida
2. **Environment variables** - Se necessárias
3. **Security headers** - Configuração otimizada

---

## ✅ **Critérios de Aceite Final**

### **Funcionais**
- **CA-F01**: Login com credenciais válidas redireciona automaticamente para dashboard
- **CA-F02**: Primeiro login redireciona para onboarding (quando aplicável)
- **CA-F03**: Dashboard é protegido e redireciona não-autenticados para login
- **CA-F04**: Logout remove todos os dados e redireciona corretamente
- **CA-F05**: Não existem loops infinitos de redirecionamento

### **Técnicos**
- **CA-T01**: Cookies de autenticação persistem entre sessões do browser
- **CA-T02**: Flags de segurança configuradas corretamente (Secure, SameSite)
- **CA-T03**: Middleware reconhece o token corretamente
- **CA-T04**: Performance de redirecionamento < 2 segundos
- **CA-T05**: Compatibilidade com Chrome, Firefox e Safari

### **Experiência do Usuário**
- **CA-UX01**: Mensagens de feedback claras durante o processo
- **CA-UX02**: Transição suave entre páginas
- **CA-UX03**: Usuários existentes não sofrem interrupção de serviço
- **CA-UX04**: Interface responsiva em todos os dispositivos

---

## ⏱️ **Cronograma Detalhado**

| Fase | Atividade | Responsável | Duração | Horário |
|------|-----------|-------------|---------|---------|
| **1** | Diagnóstico técnico | Frontend Dev | 15 min | 09:00-09:15 |
| **1** | Escolha de estratégia | Project Manager | 15 min | 09:15-09:30 |
| **2** | Utilitários base | Frontend Dev | 15 min | 09:30-09:45 |
| **2** | Hook de autenticação | Frontend Dev | 15 min | 09:45-10:00 |
| **2** | Página de login | Frontend Dev | 15 min | 10:00-10:15 |
| **3** | Testes funcionais | QA Engineer | 20 min | 10:15-10:35 |
| **3** | Testes técnicos | DevOps Specialist | 10 min | 10:35-10:45 |
| **4** | Deploy | DevOps Specialist | 10 min | 10:45-10:55 |
| **4** | Validação final | Project Manager | 5 min | 10:55-11:00 |

**⏰ Total: 2 horas exatas**

---

## 📊 **Métricas de Sucesso**

### **Métricas Técnicas**
- Taxa de erro de autenticação: < 1%
- Tempo de redirecionamento: < 2 segundos
- Uptime durante deploy: 100%
- Rollback necessário: 0%

### **Métricas de Negócio**
- Taxa de conversão login → dashboard: > 95%
- Tickets de suporte relacionados: Redução de 100%
- Satisfação do usuário: Sem reclamações de redirecionamento
- Retenção pós-login: Manter média atual

---

## 🔄 **Processo de Rollback**

### **Gatilhos para Rollback**
- Taxa de erro > 5%
- Redirecionamento falhando em > 10% dos casos
- Problemas críticos de segurança identificados
- Impacto negativo na experiência do usuário

### **Procedimento de Rollback** (< 5 minutos)
1. Reverter deploy via Git
2. Limpar cookies problemáticos via script
3. Reativar sistema anterior temporariamente
4. Comunicar usuários afetados
5. Análise post-mortem obrigatória

---

**🎯 Este plano está pronto para execução imediata e resolve definitivamente o problema de redirecionamento pós-login no Gubi App!**

---

*Plano criado por: AI Assistant*  
*Aprovado por: Aguardando validação do Project Manager*  
*Última atualização: 18/08/2025*