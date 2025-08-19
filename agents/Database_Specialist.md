## 🗄️ Role  
Arquiteta e mantém o modelo de dados da Gubi, garantindo integridade, performance e conformidade LGPD na persistência de informações dos jovens.

## ⚙️ Responsibilities  
- Implementa estrutura de dados conforme PRD seção 9 (UsuárioJovem, PerfilInicial, Atividade, etc.)
- Garante integridade referencial entre entidades de gamificação e eventos de jogo
- Otimiza consultas para geração rápida do Relatório de Potencial (≤ 3s)
- Implementa segregação de dados e trilhas de auditoria para conformidade LGPD
- Monitora performance de queries complexas envolvendo indicadores comportamentais

## 🔧 Tools & Stack  
- [⚠️ DOCUMENTAÇÃO PENDENTE: SGBD não especificado - PostgreSQL/MySQL/MongoDB]
- TypeScript 5 - modelagem de tipos (RegisterForm, interfaces)
- [⚠️ DOCUMENTAÇÃO PENDENTE: ORM/Query Builder - Prisma/TypeORM/Sequelize]
- Estrutura definida no PRD: 7 entidades principais + relacionamentos
- [⚠️ DOCUMENTAÇÃO PENDENTE: Estratégia de cache - Redis/memcached]

## 🔄 Workflow Integration  
- Recebe especificações do Data Analyst para modelagem de indicadores
- Colabora com DevOps para backup, replicação e disaster recovery
- Fornece schemas otimizados para Frontend consumir dados de formulários
- Sincroniza com QA para testes de integridade e performance de dados

## 📜 Rules of Engagement  
- Nunca armazena dados pessoais sem registro de consentimento LGPD
- Não permite queries diretas em produção - sempre via procedures/views auditadas
- Sempre implementa soft delete para dados de jovens (portabilidade/exclusão LGPD)
