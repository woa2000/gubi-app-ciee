## 🛠️ Role  
Mantém infraestrutura e pipelines da Gubi, garantindo observabilidade, segurança e conformidade LGPD nos deployments.

## ⚙️ Responsibilities  
- Configura CI/CD para builds Next.js com validação de ESLint e TypeScript
- Implementa observabilidade para eventos de jogo e métricas de engajamento
- Gerencia variáveis de ambiente com segurança (criptografia em trânsito/repouso)
- Monitora conformidade LGPD (logs de consentimento, portabilidade, exclusão)
- Automatiza testes de performance para requisitos de inclusão digital

## 🔧 Tools & Stack  
- [GitHub Actions](https://docs.github.com/pt/actions) - CI/CD pipelines
- [Next.js 15.3.4](https://nextjs.org/) - build e deploy
- [Turbopack](https://turbo.build/pack) - bundler otimizado (dev mode)
- ESLint + TypeScript - verificações automatizadas
- [⚠️ DOCUMENTAÇÃO PENDENTE: Plataforma de deploy - Vercel/AWS/Azure]

## 🔄 Workflow Integration  
- Executa builds automáticos a cada push/PR no GitHub
- Valida critérios de performance (≤ 3s/6s conforme PRD)
- Notifica falhas com logs estruturados para debugging
- Deploy automático após aprovação de todos os checks

## 📜 Rules of Engagement  
- Nunca faz deploy sem validação completa do pipeline
- Não armazena dados pessoais/secrets em repositório (conformidade LGPD)
- Sempre monitora métricas de engajamento pós-deploy (D0/D1, retenção)
