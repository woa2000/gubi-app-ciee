# Implementação do Botão "Meu Relatório"

## Resumo das Alterações

Foi implementado um botão "Meu Relatório" na página de perfil do usuário que permite abrir arquivos PDF de relatórios baseados no progresso do discovery do usuário.

## Arquivos Modificados

### 1. `/src/types/profile.ts`
- **Adicionado**: Propriedade `discoveryProgress` ao tipo `UserProfile`
- **Estrutura**: 
  ```typescript
  discoveryProgress?: {
    id: number;
    userId: number;
    resume?: string | null;
    completedLevels: string[];
    answers: string[];
  };
  ```

### 2. `/src/types/gubiServerMapper.ts`
- **Adicionado**: Mapeamento da propriedade `discoveryProgress` do Gubi Server para o tipo frontend
- **Localização**: No método `mapGubiServerToUserProfile`

### 3. `/src/services/mockProfile.ts`
- **Adicionado**: Dados mock para `discoveryProgress` para testes
- **Valor de teste**: `resume: '1'` (corresponde ao arquivo `1.pdf`)

### 4. `/src/app/dashboard/profile/page.tsx`
- **Adicionados**: Novos imports (`FileText`, `ExternalLink`)
- **Adicionada**: Função `openReport()` para abrir PDFs em nova aba
- **Adicionado**: Botão "Meu Relatório" na sidebar entre upload de imagem e navegação

### 5. `/src/services/discovery.ts`
- **Corrigido**: Erro de ESLint removendo variável não utilizada `e`

## Funcionalidade

### Como Funciona
1. O botão só aparece se `profile.discoveryProgress?.resume` existir
2. O nome do arquivo PDF é construído como: `/relatorio/${resume}.pdf`
3. O arquivo é aberto em uma nova aba usando `window.open()`

### Estrutura do Botão
- **Localização**: Sidebar da página de perfil
- **Posição**: Entre o upload de imagem e a navegação de abas
- **Estilo**: Botão com gradiente purple-blue, ícones de arquivo e link externo
- **Comportamento**: Condicional (só aparece se há um resume disponível)

### Arquivos PDF
- **Localização**: `/public/relatorio/`
- **Arquivos Disponíveis**: `1.pdf` a `16.pdf`
- **Padrão de Nome**: `{discoveryProgress.resume}.pdf`

## Exemplo de Uso

```typescript
// Se o usuário tem discoveryProgress.resume = "5"
// O botão abrirá: /relatorio/5.pdf

const openReport = () => {
  if (profile?.discoveryProgress?.resume) {
    const reportPath = `/relatorio/${profile.discoveryProgress.resume}.pdf`;
    window.open(reportPath, '_blank');
  }
};
```

## Requisitos Atendidos

✅ Botão chamado "Meu Relatório"  
✅ Abre arquivo PDF da pasta `public/relatorio`  
✅ Nome do arquivo baseado em `discoveryProgress.resume + .pdf`  
✅ Abre em nova aba  
✅ Aparece somente quando há um resume disponível  

## Próximos Passos

1. Testar com dados reais da API Gubi Server
2. Adicionar tratamento de erro se o arquivo PDF não existir
3. Possivelmente adicionar loading state durante abertura do PDF
4. Considerar adicionar preview do PDF inline (opcional)

## Dependências

- React Icons (`lucide-react`): `FileText`, `ExternalLink`
- Estrutura existente de perfil e tipos
- Servidor Next.js para servir arquivos estáticos