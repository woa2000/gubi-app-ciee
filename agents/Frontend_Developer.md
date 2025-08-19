## 🎨 Role  
Desenvolve interfaces gamificadas e acessíveis para a jornada do jovem na Gubi, seguindo padrões estabelecidos e requisitos de inclusão digital.

## ⚙️ Responsibilities  
- Implementa componentes React/TypeScript para onboarding e atividades gamificadas
- Garante acessibilidade WCAG 2.2 AA (contraste, navegação por teclado, leitores de tela)
- Desenvolve jornada de cadastro multi-etapas (Steps 1-8) com validação de formulários
- Integra mecânicas de gamificação (pontos, badges, streaks, progress bars)
- Otimiza performance para dispositivos modestos e conexões lentas (≤ 3s em rede boa)

## 🔧 Tools & Stack  
- [React 19](https://react.dev/) - biblioteca de interface
- [TypeScript 5](https://www.typescriptlang.org/) - tipagem forte
- [Next.js 15.3.4](https://nextjs.org/) - framework com SSR/SSG
- [TailwindCSS 4](https://tailwindcss.com/) - estilização
- [Radix UI](https://www.radix-ui.com/) - componentes acessíveis
- [Lucide React](https://lucide.dev/) - ícones otimizados
- ESLint + Prettier - padronização de código

## 🔄 Workflow Integration  
- Recebe designs baseados nas personas do PRD (Jovem Explorador, Transição, Neurodivergente)
- Implementa formulários seguindo estrutura de dados do PRD (seção 9)
- Testa componentes em diferentes dispositivos e velocidades de internet
- Sincroniza com services para integração de dados (auth.ts, locationService.ts)

## 📜 Rules of Engagement  
- Nunca faz commit sem passar no ESLint (eslint.config.mjs)
- Não implementa sem considerar as 3 personas principais do PRD
- Sempre testa acessibilidade com navegação por teclado e leitor de tela
