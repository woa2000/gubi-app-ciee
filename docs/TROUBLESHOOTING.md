# TROUBLESHOOTING

## Contexto

Problemas comuns podem ser resolvidos rapidamente seguindo as dicas abaixo, baseadas em erros recorrentes do projeto e requisitos do PRD (seção 6).

## Erros Comuns e Soluções
- **Erro 500 ao iniciar o servidor**
  - Verifique se o arquivo `.env` está presente e configurado corretamente.
  - Confira variáveis obrigatórias em `src/lib/apiBase.ts`.
- **Problemas de lint**
  - Execute `npm run lint` para ver detalhes e corrigir.
- **Falha de build**
  - Rode `npm install` para garantir dependências.
  - Verifique se o Node.js está na versão recomendada (ver `package.json`).

## Comandos Úteis
- `npm run lint` — verifica padrões de código
- `npm test` — executa testes
- `npm run dev` — inicia o servidor local

## Referência
- PRD: seção 6 (Não Funcionais)
- Arquivos-fonte: scripts em `package.json`
