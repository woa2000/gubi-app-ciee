# Debug de Registro - Guia de Troubleshooting

## Problemas Resolvidos

### 1. Error 500 no Endpoint de Registro

**Sintoma**: Erro 500 Internal Server Error ao fazer POST para `/api/v1/auth/register`

**Possíveis Causas**:
- Campos obrigatórios em branco sendo enviados como strings vazias
- Formato de dados inconsistente com o esperado pelo servidor
- Valores `null` ou `undefined` sendo enviados

**Solução Implementada**:
- Função `sanitizeRegisterForm()` que filtra e limpa dados antes do envio
- Remove campos vazios e valores inválidos
- Converte dados para formatos esperados pelo servidor
- Logs detalhados para debug

### 2. Validações Melhoradas

**Implementações**:
- Validação mais robusta no step final
- Verificação de campos obrigatórios mínimos
- Mensagens de erro mais específicas
- Logs detalhados para troubleshooting

## Como Debugar Problemas de Registro

### 1. Verificar Logs do Console

```javascript
// Logs implementados:
console.log('[Register] Iniciando registro com dados:', { ... });
console.log('[AUTH] Enviando dados sanitizados:', { ... });
console.error('[AUTH] Erro no registro:', { ... });
```

### 2. Dados Enviados vs Recebidos

**Campos Obrigatórios Mínimos**:
- `fullName` (string, não vazia)
- `email` (string, formato válido)
- `password` (string, não vazia)
- `acceptsTerms` (boolean, true)
- `acceptsDataUsage` (boolean, true)
- `userInterests` (array, não vazio)
- `userSkills` (array, não vazio)

**Campos Opcionais** (enviados apenas se preenchidos):
- `phone`, `birthDate`, `gender`, `location`, `country`
- `workPreference`, `workEnvironment`, `companyType`
- Todos os outros campos do formulário

### 3. Troubleshooting Common Issues

**Email já existe**:
- Erro: "duplicate" ou "exists" na mensagem
- Solução: Verificar se email já está cadastrado

**Dados inválidos**:
- Erro: "validation" na mensagem
- Solução: Verificar formato dos dados obrigatórios

**Erro de servidor**:
- Erro: 500 Internal Server Error
- Solução: Verificar logs do servidor backend

## Próximos Passos

1. Testar o registro com os dados corrigidos
2. Monitorar logs no console do browser
3. Verificar se servidor backend está funcionando
4. Se persistir erro 500, investigar logs do servidor backend

## Campos do Formulário de Registro

```typescript
interface RegisterForm {
  // Obrigatórios
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  acceptsTerms: boolean;
  acceptsDataUsage: boolean;
  userInterests: string[];
  userSkills: string[];
  workPreference: string;

  // Opcionais (enviados apenas se preenchidos)
  phone?: string;
  birthDate?: string;
  location?: string;
  country?: string;
  // ... outros campos opcionais
}
```