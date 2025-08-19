# Plano: Página Inicial com Login - Gubi App

## 📋 Visão Geral
**Objetivo**: Criar uma página inicial (home/landing page) com duas colunas: (1) conteúdo promocional sobre a Gubi com imagens e (2) formulário de login na plataforma.

**Prioridade**: Alta  
**Estimativa**: 3-5 dias  
**Impacto**: Primeira impressão dos usuários, conversão de cadastros para logins

## 🎯 Contexto e Alinhamento
- **Referência PRD**: Seção 4.1 (Cadastro e Onboarding) e RF-01 (login com e-mail/senha)
- **Personas-alvo**: Jovem Explorador, Transição e Neurodivergente
- **Critérios de aceite relacionados**: CA-01 (≤ 3 min), CA-03 (≤ 3s rede boa / ≤ 6s rede fraca)

## 👥 Agentes Envolvidos

### 🧑‍💼 **Agente Principal**: Project Manager
**Responsabilidade**: Coordenação geral, validação de escopo e aprovação final

### 🎨 **Agente Secundário Crítico**: Frontend Developer  
**Responsabilidade**: Implementação da interface, componentes de login, acessibilidade

### 🧪 **Agente Secundário**: QA Engineer
**Responsabilidade**: Validação funcional, testes de acessibilidade e performance

### 🛠️ **Agente Secundário**: DevOps Specialist  
**Responsabilidade**: Deploy, configuração de ambiente, monitoramento

### 🗄️ **Agente de Apoio**: Database Specialist
**Responsabilidade**: Validação de queries de autenticação existentes

## 🔄 Fluxo de Trabalho Sequencial

### **Etapa 1: Planejamento e Especificação**
**Responsável**: 🧑‍💼 Project Manager  
**Duração**: 4-6 horas

#### Entradas:
- PRD atual (seção 4.1, RF-01)
- Diretrizes de acessibilidade WCAG 2.2 AA
- Personas das 3 categorias de jovens

#### Atividades:
- [ ] Definir wireframe da página (duas colunas)
- [ ] Especificar conteúdo da seção promocional
- [ ] Validar fluxo de login com sistema de autenticação existente
- [ ] Priorizar funcionalidades (login social vs. apenas e-mail/senha)

#### Saídas:
- Documento de especificação funcional
- Critérios de aceite específicos para a página
- Lista de assets necessários (imagens, textos)

#### Pontos de Validação:
- ✅ Alinhamento com personas do PRD
- ✅ Conformidade com tempo de carregamento (CA-03)
- ✅ Especificação clara de responsividade

---

### **Etapa 2: Implementação da Interface**
**Responsável**: 🎨 Frontend Developer  
**Duração**: 12-16 horas

#### Entradas:
- Especificação funcional da Etapa 1
- Design system existente (Radix UI + TailwindCSS)
- Componentes de autenticação já implementados (`/src/services/auth.ts`)

#### Atividades:
- [ ] Criar layout responsivo de duas colunas
- [ ] Implementar seção promocional com imagens otimizadas
- [ ] Desenvolver formulário de login reutilizando componentes existentes
- [ ] Integrar com serviço de autenticação (`auth.ts`)
- [ ] Garantir acessibilidade (navegação por teclado, leitores de tela)
- [ ] Implementar estados de loading, erro e sucesso

#### Saídas:
- Componente `HomePage.tsx` implementado
- Formulário `LoginForm.tsx` componentizado
- Assets otimizados (imagens WebP, tamanhos responsivos)
- Integração com rota `/login` ou página inicial

#### Pontos de Validação:
- ✅ Responsividade em mobile/tablet/desktop
- ✅ Performance ≤ 3s (rede boa) / ≤ 6s (rede fraca)
- ✅ Navegação por teclado funcional
- ✅ Integração com sistema de auth existente

---

### **Etapa 3: Validação de Dados**
**Responsável**: 🗄️ Database Specialist  
**Duração**: 2-3 horas

#### Entradas:
- Implementação do formulário de login
- Serviços de autenticação existentes
- Estrutura de dados de UsuárioJovem (PRD seção 9)

#### Atividades:
- [ ] Validar queries de autenticação existentes
- [ ] Verificar índices para performance de login
- [ ] Confirmar conformidade LGPD (logs de acesso)
- [ ] Testar cenários de sobrecarga

#### Saídas:
- Relatório de performance de queries
- Validação de conformidade LGPD
- Recomendações de otimização (se necessário)

#### Pontos de Validação:
- ✅ Tempo de resposta da autenticação ≤ 500ms
- ✅ Logs de acesso implementados para auditoria
- ✅ Tratamento seguro de credenciais

---

### **Etapa 4: Testes e Validação**
**Responsável**: 🧪 QA Engineer  
**Duração**: 8-10 horas

#### Entradas:
- Página inicial implementada
- Formulário de login integrado
- Critérios de aceite da Etapa 1

#### Atividades:
- [ ] Testar fluxo completo de login para as 3 personas
- [ ] Validar acessibilidade com ferramentas automatizadas (axe-core)
- [ ] Testar performance em dispositivos modestos
- [ ] Verificar tratamento de erros (credenciais inválidas, rede offline)
- [ ] Testar responsividade em diferentes resoluções
- [ ] Auditar navegação por teclado e leitores de tela

#### Saídas:
- Relatório de testes funcionais
- Relatório de acessibilidade
- Métricas de performance validadas
- Lista de bugs encontrados (se houver)

#### Pontos de Validação:
- ✅ 100% dos cenários de teste passaram
- ✅ Score de acessibilidade ≥ 95%
- ✅ Performance atende critérios CA-03
- ✅ Compatibilidade com navegadores principais

---

### **Etapa 5: Deploy e Monitoramento**
**Responsável**: 🛠️ DevOps Specialist  
**Duração**: 3-4 horas

#### Entradas:
- Código validado pelo QA
- Assets otimizados
- Configurações de ambiente necessárias

#### Atividades:
- [ ] Deploy em ambiente de staging
- [ ] Validação final em ambiente similar à produção
- [ ] Deploy em produção
- [ ] Configurar monitoramento de métricas (tempo de carregamento, taxa de login)
- [ ] Implementar logs estruturados para analytics

#### Saídas:
- Página inicial live em produção
- Dashboard de monitoramento configurado
- Logs de acesso e performance ativos

#### Pontos de Validação:
- ✅ Deploy sem erros
- ✅ Monitoramento de métricas ativo
- ✅ Rollback preparado (se necessário)

---

## 🎯 Critérios de Aceite Específicos

### Funcionais:
- [ ] **LOGIN-01**: Usuário consegue fazer login com e-mail e senha válidos
- [ ] **LOGIN-02**: Sistema exibe erro claro para credenciais inválidas  
- [ ] **LOGIN-03**: Formulário funciona offline por até 15min (cache)
- [ ] **LOGIN-04**: Redirecionamento correto após login bem-sucedido

### Não-Funcionais:
- [ ] **PERF-01**: Carregamento inicial ≤ 3s (rede boa) / ≤ 6s (rede fraca)
- [ ] **ACCESS-01**: Navegação completa por teclado
- [ ] **ACCESS-02**: Compatibilidade com leitores de tela
- [ ] **RESP-01**: Layout responsivo em mobile/tablet/desktop

### Conteúdo:
- [ ] **COPY-01**: Seção promocional comunica valor da Gubi claramente
- [ ] **COPY-02**: Call-to-actions direcionam para cadastro se usuário não tem conta
- [ ] **IMG-01**: Imagens otimizadas (WebP, lazy loading)

## 📦 Artefatos Produzidos

### Código:
- `src/app/page.tsx` - Página inicial principal
- `src/components/LoginForm.tsx` - Formulário de login componentizado  
- `src/components/PromoSection.tsx` - Seção promocional
- Assets otimizados em `public/images/`

### Documentação:
- Especificação funcional (Etapa 1)
- Relatório de testes (Etapa 4)
- Guia de monitoramento (Etapa 5)

### Testes:
- Testes unitários do formulário de login
- Testes de integração com serviço de auth
- Testes de acessibilidade automatizados

## 🔄 Coordenação Entre Agentes

### **Project Manager ↔ Frontend Developer**
- **Frequência**: Daily (durante implementação)
- **Formato**: Status updates + bloqueadores
- **Entregáveis**: Demo funcional a cada 2 dias

### **Frontend Developer ↔ Database Specialist**  
- **Frequência**: Início da Etapa 2 + consultas pontuais
- **Formato**: Validação técnica de integração
- **Entregáveis**: Confirmação de queries otimizadas

### **Frontend Developer ↔ QA Engineer**
- **Frequência**: Handoff da Etapa 2 → 4
- **Formato**: Walkthrough de funcionalidades
- **Entregáveis**: Build estável para testes

### **QA Engineer ↔ DevOps Specialist**
- **Frequência**: Fim da Etapa 4 → início da 5  
- **Formato**: Aprovação para deploy
- **Entregáveis**: Sign-off de qualidade

## ⚠️ Riscos e Mitigações

| Risco | Probabilidade | Impacto | Mitigação |
|-------|--------------|---------|-----------|
| Performance em dispositivos modestos | Média | Alto | Testes antecipados + otimização de assets |
| Integração com auth existente | Baixa | Alto | Validação técnica na Etapa 1 |
| Acessibilidade não conforme | Média | Médio | Testes automatizados + review manual |
| Conteúdo promocional indefinido | Alta | Médio | Placeholder + iteração com stakeholders |

## 🎯 Métricas de Sucesso

### Imediatas (primeira semana):
- Taxa de conversão login ≥ 75%
- Tempo médio de carregamento ≤ 2.5s
- Score acessibilidade ≥ 95%
- Zero bugs críticos reportados

### Médio prazo (primeira quinzena):
- Redução de 20% em abandono na página inicial
- Aumento de 15% em tentativas de login
- Feedback positivo de usuários das 3 personas

---

**Próximos passos**: Aprovação do Project Manager + início da Etapa 1
