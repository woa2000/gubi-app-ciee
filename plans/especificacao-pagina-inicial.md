# Especificação Funcional: Página Inicial com Login

## 📋 Visão Geral
Página inicial responsiva com duas colunas para promover a Gubi e facilitar o acesso dos usuários existentes.

## 🎯 Layout e Estrutura

### Desktop/Tablet (≥768px):
```
┌─────────────────────────────────────────────────┐
│                Header (Logo)                     │
├─────────────────────┬───────────────────────────┤
│                     │                           │
│   Seção Promocional │    Formulário de Login    │
│                     │                           │
│   - Hero text       │   - Email field           │
│   - Benefícios      │   - Password field        │
│   - Imagens         │   - Login button          │
│   - CTA cadastro    │   - Forgot password       │
│                     │   - Register link         │
│                     │                           │
└─────────────────────┴───────────────────────────┘
│                Footer                            │
└─────────────────────────────────────────────────┘
```

### Mobile (<768px):
```
┌─────────────────────────────────────┐
│           Header (Logo)             │
├─────────────────────────────────────┤
│                                     │
│       Formulário de Login           │
│                                     │
├─────────────────────────────────────┤
│                                     │
│       Seção Promocional             │
│                                     │
└─────────────────────────────────────┘
│            Footer                   │
└─────────────────────────────────────┘
```

## 📝 Conteúdo Especificado

### Seção Promocional:
- **Headline**: "Descubra seu potencial através de jogos!"
- **Subheadline**: "A única plataforma gamificada que conecta jovens ao mercado de trabalho através de autoconhecimento e capacitação."
- **Benefícios**:
  - 🎮 Atividades gamificadas baseadas em psicologia
  - 📊 Relatório personalizado de potencial
  - 🚀 Desenvolvimento de soft e hard skills
  - 🎯 Trilhas personalizadas por interesse
- **CTA**: "Começar Jornada Gratuita"

### Formulário de Login:
- **Título**: "Entrar na Gubi"
- **Campos**: Email, Senha
- **Ações**: Login, Esqueci minha senha, Não tem conta? Cadastrar

## 🎨 Assets Necessários
- Logo Gubi (existente: `/public/gubi-logo.png`)
- Imagem hero (jovens usando computador/celular)
- Ícones de benefícios (Lucide React)

## ⚡ Critérios de Performance
- Primeira pintura: ≤ 1.5s
- Carregamento total: ≤ 3s (rede boa) / ≤ 6s (rede fraca)
- Imagens: lazy loading, WebP format

## 🔒 Funcionalidades de Login
- Validação de email em tempo real
- Feedback de erro/sucesso
- Loading states
- Integração com `/src/services/auth.ts`
- Redirecionamento pós-login para dashboard/onboarding

## ♿ Acessibilidade
- Navegação por teclado completa
- Labels adequados nos campos
- Contraste WCAG 2.2 AA
- Foco visível
- Compatibilidade com leitores de tela

✅ **Especificação aprovada pelo Project Manager**
