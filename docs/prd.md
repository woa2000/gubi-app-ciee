# PRD — Plataforma Gubi (Visão do Jovem)

## 1) Contexto e Visão do Produto

A Gubi é apresentada como **“a única plataforma gamificada que conecta jovens ao mercado de trabalho através de autoconhecimento, capacitação e dados estruturados”**, com uma jornada que inclui **cadastro/interesses → jogos/avaliações → relatório de potencial** (e dados consolidados para parceiros). ([gubi.com.br][1])

**Propósito (lado do jovem)**
Ajudar o jovem a **se conhecer**, **desenvolver competências** (soft e hard skills) e **avançar na carreira** por meio de uma **jornada gamificada** baseada em psicologia e dados. ([gubi.com.br][1])

**Resultados esperados para o jovem**

* Entendimento de perfis e potenciais (autoconhecimento). ([gubi.com.br][1])
* Desenvolvimento de competências via desafios práticos e simulações. ([gubi.com.br][1])
* **Relatório de Potencial** personalizado com indicadores comportamentais, socioemocionais e profissionais. ([gubi.com.br][1])

## 2) Personas (foco na persona “Jovem”)

* **Jovem Explorador (16–24)**: Estudante do ensino médio/graduação buscando primeiro emprego ou clareza de carreira. Dor: incerteza vocacional. Ganho: mapa de talentos + atividades gamificadas para ganhar confiança.
* **Jovem Transição (20–28)**: Universitário ou recém-formado repensando caminho profissional. Dor: gap de experiência/competências. Ganho: simulações e trilhas para desenvolver habilidades ligadas ao trabalho.
* **Jovem em Vulnerabilidade/Neurodivergente**: Necessita **acessibilidade, linguagem clara e baixa exigência de hardware/conectividade**; inclusão é pilar da plataforma. ([gubi.com.br][1])

## 3) Escopo do MVP (lado do jovem)

**Inclui**

1. **Cadastro & Onboarding de Interesses** (passo 1 da jornada do site). ([gubi.com.br][1])
2. **Jornada Gamificada**: jogos/atividades que avaliam psicologia, soft e hard skills; simulações de trabalho. ([gubi.com.br][1])
3. **Relatório de Potencial**: devolutiva clara ao jovem com indicadores-chave e próximos passos. ([gubi.com.br][1])
4. **Gamificação**: pontos, badges, níveis, streaks e “missões do dia/semana”.
5. **Acessibilidade & Inclusão**: design acessível e robustez para dispositivos modestos e internet lenta. ([gubi.com.br][1])

**Fica fora do MVP (roadmap)**

* Matching com vagas e marketplace de oportunidades (pode aparecer apenas como “Coming soon”). ([gubi.com.br][1])
* Dashboards para empresas/escolas (visão não-jovem). ([gubi.com.br][1])

## 4) Jornada do Usuário (Jovem)

### 4.1 Cadastro e Onboarding

1. **Criar conta**: e-mail + senha e/ou login social (Google/Apple); consentimentos LGPD; termos e idade mínima.
2. **Perfil inicial**: nome, escola/faculdade (opcional), cidade/estado, objetivos (ex.: “me conhecer melhor”, “testar carreiras”, “melhorar soft skills”).
3. **Interesses**: áreas macro (ex.: tecnologia, saúde, negócios …); preferências de estilo de atividade (quizzes, simulações, micro-desafios).
4. **Checklist de acessibilidade** (opcional): preferências de contraste, tamanho de fonte, redução de animações.

**Critérios de Aceite**

* CA-01: Usuário consegue criar conta, aceitar termos e concluir onboarding em ≤ 3 min.
* CA-02: Após onboarding, o jovem visualiza **Home da Jornada** com missão inicial sugerida pelo sistema.
* CA-03: Fluxo funciona bem em 3G e em aparelhos de entrada (tempo de primeira tela ≤ 3s em rede boa; ≤ 6s em rede fraca). ([gubi.com.br][1])

### 4.2 Home da Jornada

* **Card “Missão do Dia”** (micro-atividade de 3–5 min).
* **Trilha de Autoconhecimento (obrigatória no MVP)** — alinhada à premissa de “games baseados em psicologia” para revelar potenciais do jovem. ([gubi.com.br][1])
* **Progresso**: nível atual, pontos, streak, próximos badges.
* **CTA** claro: “Começar” a próxima missão recomendada.

**Critérios de Aceite**

* CA-04: Algoritmo simples recomenda próxima missão com base no progresso e interesses.
* CA-05: Home exibe componentes essenciais com leitura em voz alta (compatível com leitores de tela) e foco de teclado.

### 4.3 Atividades Gamificadas (MVP)

**Tipos no MVP**

1. **Quiz de Autoconhecimento** (5–10 min): decisões e tempos de resposta mapeados para indicadores comportamentais. ([gubi.com.br][1])
2. **Micro-simulação de trabalho** (5–8 min): desafio prático (p. ex., priorizar tarefas em uma equipe). ([gubi.com.br][1])
3. **Desafio de Soft Skill** (4–6 min): colaboração, criatividade, resolução de problemas; métricas extraídas de escolhas do jogador. ([gubi.com.br][1])

**Mecânicas de Jogo**

* **Pontos** por conclusão, **bônus** por acerto/tempo/consistência (streak).
* **Badges** (ex.: “Explorador”, “Resolução Criativa”);
* **Níveis** (XP acumulado → desbloqueio de trilhas curtas e skins temáticas);
* **Feedback imediato** ao fim de cada atividade com **insights** ligados aos indicadores medidos. ([gubi.com.br][1])

**Critérios de Aceite**

* CA-06: Cada atividade exibe duração estimada, objetivos e recompensa (pontos/badge).
* CA-07: Ao concluir, o jovem vê **feedback prático** (o que foi bem, onde melhorar) + botão “Próximo passo”.
* CA-08: Atividades funcionam offline leve (cache estático) por até 15 min e sincronizam resultados ao reconectar.

### 4.4 Relatório de Potencial (Devolutiva ao jovem)

* **Visão Resumo**: indicadores comportamentais/socioemocionais/profissionais do jovem (cards com ícones e descrição simples). ([gubi.com.br][1])
* **Recomendações**: próximas atividades, micro-hábitos/soft skills a treinar e trilhas sugeridas.
* **Histórico**: linha do tempo das atividades e evolução dos indicadores.
* **Compartilhável**: link/arquivo para baixar (PDF leve).

**Critérios de Aceite**

* CA-09: Geração do **Relatório de Potencial** após completar a trilha mínima do MVP. ([gubi.com.br][1])
* CA-10: Linguagem clara (nível B1) e acessível (contraste AA, tamanho de fonte ajustável).

## 5) Requisitos Funcionais (MVP)

1. **Conta & Perfis**

   * RF-01: Criar/entrar com e-mail/senha; RF-02: login social; RF-03: redefinição de senha.
   * RF-04: Consentimentos (LGPD) + registro de data/versão do termo.
   * RF-05: Preferências de acessibilidade salvas por usuário. ([gubi.com.br][1])

2. **Onboarding & Interesses**

   * RF-06: Seleção de objetivos e áreas de interesse.
   * RF-07: Recomendações iniciais de atividades (engine simples por regras).

3. **Atividades Gamificadas**

   * RF-08: Módulo de atividades (estado: disponível, em andamento, concluída).
   * RF-09: Coleta de **eventos de jogo** (escolhas, tempo de resposta) para cálculo de métricas (soft/hard). ([gubi.com.br][1])
   * RF-10: Atribuição de pontos, XP, badges e níveis.
   * RF-11: Feedback pós-atividade com insights e próximos passos.

4. **Relatório de Potencial**

   * RF-12: Consolidação de indicadores em painel do jovem + versão exportável. ([gubi.com.br][1])

5. **Gamificação Live**

   * RF-13: Streaks, missões diárias/semanais e notificações (web push/e-mail).

## 6) Requisitos Não Funcionais

* **Acessibilidade**: conformidade **WCAG 2.2 AA** (foco, contraste, leitura por teclado/leitor de tela).
* **Desempenho & Inclusão Digital**: carregar em dispositivos modestos e conexões lentas; otimizar imagens/assets; **TBT** baixo; páginas-chave ≤ 3s (rede boa) / ≤ 6s (rede fraca). O foco em inclusão e bom funcionamento em hardware/Internet limitados é um pilar declarado. ([gubi.com.br][1])
* **Segurança & Privacidade**: LGPD (consentimento, finalidade, revogação, portabilidade, exclusão); criptografia em trânsito e repouso; segregação de dados.
* **Observabilidade**: logs de eventos de jogo; métricas de engajamento; trilhas de auditoria para consentimento/relatórios.

## 7) Métricas de Sucesso (lado do jovem)

* **Ativação D0/D1**: % que completa onboarding e 1ª atividade.
* **Conclusão da Trilha Base**: % que gera o **Relatório de Potencial**. ([gubi.com.br][1])
* **Retenção D7/D30** e **Streak médio**.
* **Tempo médio por sessão**; **NPS** pós-relatório.
* **Acessibilidade efetiva**: taxa de uso de recursos de acessibilidade e redução de abandono nesses segmentos. ([gubi.com.br][1])

## 8) Regras de Negócio (MVP)

* RN-01: O **Relatório de Potencial** só é emitido após completar a trilha mínima (ex.: 3 atividades núcleo). ([gubi.com.br][1])
* RN-02: Badges têm critérios claros (ex.: 3 dias seguidos concluindo missão de soft skills).
* RN-03: Streak não quebra se o jovem concluir qualquer atividade diária válida.
* RN-04: O algoritmo inicial de recomendação é por regras (interesses + lacunas de indicadores); em versões futuras, evoluir para modelo ML.

## 9) Estrutura de Dados (alto nível)

* **UsuárioJovem**(id, nome, email, consentimentos, acessibilidadePrefs)
* **PerfilInicial**(objetivos, interesses)
* **Atividade**(id, tipo, duraçãoEstimada, requisitos, recompensa)
* **TentativaAtividade**(eventos\[tempo, escolha], score, data)
* **Gamificação**(pontos, xp, nivel, streak, badges\[])
* **Indicadores**(comportamentais, socioemocionais, profissionais)
* **Relatorio**(snapshotIndicadores, data, recomendações)

## 10) Conteúdo do MVP

* **Trilha Base** (3 atividades):

  1. Quiz de Autoconhecimento;
  2. Desafio de Soft Skill (p. ex., resolução de problemas);
  3. Micro-simulação de ambiente de trabalho.
     → Gera **Relatório de Potencial** ao final. ([gubi.com.br][1])

## 11) Requisitos de UX/UI

* **Tom**: positivo e encorajador, linguagem clara (nível B1).
* **Design**: cards grandes, ícones e microtextos; feedback imediato ao concluir atividades; **progress bar** sempre visível.
* **Acessibilidade**: alternar tamanho de fonte; alto contraste; legendas/transcrições; navegar por teclado.
* **Inclusão**: considerar painéis e jogos com baixo custo cognitivo e sinalização de tempo/dificuldade. ([gubi.com.br][1])

## 12) Roadmap (alto nível)

* **V1 (MVP – 6 a 8 semanas)**

  * Cadastro + Onboarding + Home da Jornada
  * 3 atividades núcleo + gamificação básica
  * Relatório de Potencial (versão resumo)
  * Exportação de relatório (PDF)
* **V2**

  * Mais trilhas/atividades temáticas
  * Gamificação avançada (rankings, temporadas)
  * Recomendações mais inteligentes
* **V3**

  * **Matching com vagas** para o jovem (quando visão B2B/B2G estiver pronta). ([gubi.com.br][1])

## 13) Riscos & Mitigações

* **Coleta de eventos de jogo sensível** → anonimização/agregação em analytics; consentimentos explícitos.
* **Dispositivos modestos** → testes em aparelhos de entrada e otimização contínua. ([gubi.com.br][1])
* **Aderência pedagógica** → curadoria com especialistas/psicólogos (o site afirma base psicológica/validação). ([gubi.com.br][1])



