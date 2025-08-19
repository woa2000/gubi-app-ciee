# DESIGN_DECISIONS

## Contexto

As decisões técnicas do Gubi App são baseadas em requisitos explícitos do PRD e necessidades práticas do projeto.

## Decisões Críticas
- **TypeScript**: escolhido para garantir tipagem forte e evitar erros em tempo de execução (PRD 3.2).
- **Next.js**: facilita SSR, performance e acessibilidade (PRD 6).
- **Componentização**: uso extensivo de componentes para reuso e manutenção.
- **Acessibilidade**: foco em WCAG 2.2 AA, contraste, navegação por teclado (PRD 6).

## Alternativas Avaliadas
- React puro: descartado por não oferecer SSR nativo.
- JavaScript puro: descartado por não garantir tipagem e escalabilidade.

## Referência
- PRD: seções 3, 5, 6, 11
- Arquivos-fonte: estrutura de componentes, uso de TypeScript
