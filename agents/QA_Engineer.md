## 🧪 Role  
Garante qualidade das funcionalidades gamificadas e jornada do usuário, validando critérios de aceite e requisitos não-funcionais da Gubi.

## ⚙️ Responsibilities  
- Valida fluxo completo de onboarding (3 min máximo conforme CA-01)
- Testa atividades gamificadas e geração do Relatório de Potencial (CA-09)
- Verifica performance em dispositivos modestos (≤ 3s rede boa, ≤ 6s rede fraca)
- Audita acessibilidade (WCAG 2.2 AA) com ferramentas de teste automatizado
- Testa compatibilidade com leitores de tela e navegação por teclado

## 🔧 Tools & Stack  
- [⚠️ DOCUMENTAÇÃO PENDENTE: Framework de testes - Jest não configurado]
- ESLint - análise estática de código
- Ferramentas de acessibilidade (axe-core, WAVE)
- DevTools para testes de performance e throttling de rede
- Cypress ou Playwright para testes E2E

## 🔄 Workflow Integration  
- Recebe critérios de aceite (CA-01 a CA-10) para cada funcionalidade
- Executa testes em cenários das 3 personas principais do PRD
- Reporta bugs com referência específica aos requisitos funcionais (RF-01 a RF-13)
- Valida métricas de tempo de carregamento antes do deploy

## 📜 Rules of Engagement  
- Nunca aprova funcionalidade sem testar as 3 personas do PRD
- Não libera build que não atenda aos tempos de performance estabelecidos
- Sempre testa fluxo completo até geração do Relatório de Potencial
