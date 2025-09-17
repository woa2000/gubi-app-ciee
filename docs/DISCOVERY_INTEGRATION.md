# Integração Discovery Resume API

## Visão Geral

Esta funcionalidade implementa a integração com o endpoint `POST /api/v1/discovery/resume/send` para obter o valor `resume` e gerar automaticamente o `pdfReportPath` para exibição dos resultados das atividades.

## Arquivos Modificados/Criados

### 1. `/src/services/discovery.ts` (Novo)
- Serviço responsável pela comunicação com a API de discovery
- Função `sendDiscoveryResume()` para enviar dados e receber o resume
- Função `generatePdfReportPath()` para concatenar ".pdf" ao resume

### 2. `/src/types/discovery.ts` (Novo)
- Tipos TypeScript para as interfaces da API de discovery
- `DiscoveryResumeRequest` - estrutura da requisição
- `DiscoveryResumeResponse` - estrutura da resposta
- `DiscoveryData` - dados do discovery

### 3. `/src/app/dashboard/activities/page.tsx` (Modificado)
- Adicionado estado para gerenciar `pdfReportPath` e loading
- Implementada função `fetchDiscoveryResume()` com useCallback
- Integração com token de autenticação
- Chamada automática da API quando o componente monta

### 4. `/src/components/dashboard/ActivityCard.tsx` (Modificado)
- Suporte para estado de loading no botão "Ver Resultado"
- Validação do pdfReportPath antes de abrir o PDF
- Interface visual para indicar carregamento

## Como Funciona

1. **Carregamento da Página**: Quando a página de atividades é carregada e o usuário está autenticado, a função `fetchDiscoveryResume()` é automaticamente chamada.

2. **Chamada da API**: 
   ```typescript
   const requestData: DiscoveryResumeRequest = {
     userId: user.id,
     // outros campos conforme necessário
   };
   
   const response = await sendDiscoveryResume(requestData, token);
   ```

3. **Processamento da Resposta**: 
   - Se `response.success === true` e `response.resume` existe
   - O `pdfReportPath` é gerado: `resume + ".pdf"`
   - O estado é atualizado para exibir o botão "Ver Resultado"

4. **Exibição do Resultado**: 
   - Durante o carregamento: botão desabilitado com texto "Carregando..."
   - Após carregar: botão verde "Ver Resultado" que abre o PDF em nova aba
   - O PDF é acessado em `/relatorio/${pdfReportPath}`

## Configuração da API

A URL base da API é configurada em `/src/lib/apiBase.ts` através das variáveis de ambiente:
- `NEXT_PUBLIC_USE_REAL_API`: "true" para usar API real
- Se não estiver configurado, usa as URLs definidas em DEV/PROD

## Exemplo de Uso

```typescript
// A função é chamada automaticamente, mas pode ser chamada manualmente:
const fetchResume = async () => {
  const response = await sendDiscoveryResume({
    userId: 123
  }, "auth_token");
  
  if (response.success) {
    const pdfPath = generatePdfReportPath(response.resume);
    // pdfPath será algo como "resumo123.pdf"
  }
};
```

## Estados da Interface

- **Loading**: Botão cinza com "Carregando..." (desabilitado)
- **Sem Resume**: Botão "Ver Resultado" não é exibido
- **Com Resume**: Botão verde "Ver Resultado" (habilitado)

## Tratamento de Erros

- Erros de rede ou API são logados no console
- Interface continua funcional mesmo se a API falhar
- Botão "Abrir" sempre disponível para acessar a atividade externa

## Personalização

Para adaptar a funcionalidade:

1. **Modificar Dados da Requisição**: Edite `DiscoveryResumeRequest` em `/src/types/discovery.ts`
2. **Alterar Lógica de PDF**: Modifique `generatePdfReportPath()` em `/src/services/discovery.ts`
3. **Customizar Interface**: Ajuste o componente `ActivityCard` conforme necessário

## Dependências

- Hook `useAuth` para autenticação
- Biblioteca `fetch` nativa para requisições HTTP
- React hooks: `useState`, `useEffect`, `useCallback`