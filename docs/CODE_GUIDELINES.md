# CODE_GUIDELINES

## Contexto

O projeto Gubi App utiliza TypeScript (superset tipado do JavaScript), Next.js e segue padrões de qualidade para garantir legibilidade, manutenção e segurança, conforme requisitos do PRD (ex: requisitos 3.2, 5.1, 6).

## Regras
- Sempre use ESLint e Prettier para padronizar o código (ver configuração em `eslint.config.mjs`).
- Nomeie variáveis, funções e arquivos em inglês, no padrão camelCase para variáveis/funções e PascalCase para componentes React.
- Todas as funções devem ter tipagem explícita em TypeScript. (Conforme requisito 3.2 do PRD)
- Trate erros sempre logando e nunca silencie exceções.
- Use hooks e componentes funcionais no React.
- Valide todos os inputs do usuário (ex: com Zod ou lógica própria).

## Exemplo

```diff
- // NUNCA faça isso:
- if (error) throw error;
+ // Sempre logue erros:
+ if (error) {
+   logger.error("Falha na API", error);
+   throw error;
+ }
```

```ts
// Certo:
function getUser(id: string): Promise<User> { ... }

// Errado:
function getUser(id) { ... }
```

## Referências
- PRD: requisitos 3.2, 5.1, 6
- Arquivo: `eslint.config.mjs`, `tsconfig.json`
