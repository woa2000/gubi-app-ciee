# CONTRIBUTING

## Contexto

Contribuir para o Gubi App é simples e segue um fluxo padronizado para garantir qualidade e rastreabilidade, conforme práticas do PRD (seção 6, 8).

## Regras
1. Crie um branch a partir de `main`.
2. Siga as [Diretrizes de Código](CODE_GUIDELINES.md).
3. Atualize ou crie testes relevantes e execute `npm test`.
4. Preencha o template de Pull Request e envie seu PR.

## Checklist para Pull Requests
- [ ] Código segue as [Diretrizes de Código](CODE_GUIDELINES.md)
- [ ] Testes cobrem novas funcionalidades
- [ ] Documentação atualizada
- [ ] Não há warnings/lints pendentes
- [ ] PRD referenciado quando aplicável

## Exemplo de commit
```sh
git checkout -b feat/nome-da-feature
# Faça as alterações
npm test
# Commit
npm run lint && git add .
git commit -m "feat: descrição objetiva da feature (refs PRD seção X)"
git push origin feat/nome-da-feature
```

## Referência
- PRD: seção 6 (Não Funcionais), seção 8 (Regras de Negócio)
