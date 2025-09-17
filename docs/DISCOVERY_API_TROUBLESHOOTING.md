# Troubleshooting: Discovery API 400 Bad Request

## Problema
Erro `400 Bad Request` ao chamar o endpoint `POST /api/v1/discovery/resume/send`.

## Análise do Problema

O erro 400 indica que os dados enviados não estão no formato esperado pela API. Possíveis causas:

1. **Estrutura dos dados incorreta**: A API pode esperar uma estrutura diferente de `{ userId: number }`
2. **Nomenclatura dos campos**: A API pode usar `user_id` em vez de `userId`
3. **Campos obrigatórios faltando**: Pode ser necessário enviar campos adicionais
4. **Endpoint não existe**: O endpoint pode não estar implementado ou ter uma URL diferente

## Soluções Implementadas

### 1. Logs Detalhados
- Adicionados logs para capturar a resposta completa de erro
- Log dos dados sendo enviados para debugging

### 2. Múltiplas Variações de Requisição
O serviço agora tenta diferentes estruturas de dados automaticamente:

```typescript
const requestVariations = [
  { userId: 123 },                    // Original
  { user_id: 123 },                   // Variação com user_id
  { userId: 123, action: 'get_resume' }, // Com action
  { id: 123 }                         // Apenas id
];
```

### 3. Teste de Endpoint
- Função `testDiscoveryEndpoint()` para verificar se o endpoint existe
- Teste com GET antes do POST

### 4. Tratamento Robusto de Resposta
- Múltiplas formas de extrair o `resume` da resposta
- Suporte para diferentes estruturas de resposta da API

## Como Usar

1. **Verificar Logs**: Abra o console do navegador e veja os logs detalhados
2. **Análise de Variações**: O sistema tentará automaticamente diferentes estruturas
3. **Resposta de Erro**: O corpo da resposta de erro será logado para análise

## Próximos Passos

Se o problema persistir, verifique:

1. **Documentação da API**: Confirme a estrutura exata esperada pelo endpoint
2. **Autenticação**: Verifique se o token está sendo enviado corretamente
3. **Endpoint Alternativo**: Pode ser necessário usar um endpoint diferente
4. **Dados do Usuário**: Verifique se o `userId` está correto e existe no sistema

## Exemplo de Debug

No console do navegador você verá:

```
🔍 Testando se endpoint de discovery existe...
Endpoint de discovery existe: true/false
Discovery API Request Variations: [...]
Tentando variação 1: { userId: 123 }
Variação 1 - Response status: 400 Bad Request
Variação 1 - Detalhes do erro: [corpo da resposta]
Tentando variação 2: { user_id: 123 }
...
```

## Fallback

Se todas as tentativas falharem, o sistema:
- Mantém a funcionalidade básica (botão "Abrir")
- Não exibe o botão "Ver Resultado"
- Log do erro para debugging posterior