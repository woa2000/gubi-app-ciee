# PROJECT_STRUCTURE

## Contexto

A estrutura do projeto foi desenhada para separar responsabilidades e facilitar a escalabilidade, conforme o PRD (seção 9).

## Regras
- Adicione novos componentes em `src/components/`.
- Serviços de API e lógica de negócio ficam em `src/services/`.
- Tipos e interfaces em `src/types/`.
- Páginas e rotas em `src/app/`.

## Diagrama ASCII

```
/ (raiz)
├── src/
│   ├── app/           # Páginas, rotas e layouts
│   ├── components/    # Componentes reutilizáveis
│   ├── lib/           # Funções utilitárias
│   ├── services/      # Serviços (API, localização, autenticação)
│   └── types/         # Tipos e interfaces TypeScript
├── public/            # Assets estáticos (imagens, ícones)
├── docs/              # Documentação
├── package.json       # Dependências e scripts
└── ...
```

## Responsabilidades
- `app/`: Fluxo de páginas, onboarding, cadastro, etc.
- `components/`: Botões, inputs, cards, etc.
- `lib/`: Funções auxiliares (ex: apiBase.ts, utils.ts)
- `services/`: Comunicação com APIs, autenticação, localização.
- `types/`: Definições de tipos (ex: user.ts)

## Exemplos e Links
- Veja [auth.ts](../src/services/auth.ts)
- Veja [user.ts](../src/types/user.ts)

## Referência
- PRD: seção 9 (Estrutura de Dados)
- Arquivos-fonte: estrutura de pastas
