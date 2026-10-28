# OmniLog Hub — Documento de Visão

**Projeto:** OmniLog Hub  
**Empresa fictícia:** OmniLog Solutions S.A.  
**Curso:** Técnico em Desenvolvimento de Sistemas — Senac  
**Modalidade:** Projeto individual  
**Versão:** 1.0  
**Status:** Em desenvolvimento

## 1. Introdução

O OmniLog Hub é um sistema integrado de gestão logística desenvolvido para centralizar as operações de estoque, pedidos, entregas e comércio eletrônico da empresa fictícia OmniLog Solutions S.A.

A plataforma será composta por um aplicativo desktop para operações internas, um portal web para clientes e uma API responsável pelas regras de negócio e pela comunicação com o banco de dados.

## 2. Problema identificado

A utilização de sistemas separados pode dificultar o controle de estoque, o acompanhamento de pedidos e a comunicação entre os setores da empresa. Isso pode gerar inconsistências nas informações, atrasos operacionais e dificuldades no rastreamento de entregas.

## 3. Objetivo geral

Desenvolver uma plataforma integrada que permita administrar informações logísticas, controlar estoques, processar pedidos e acompanhar entregas por meio de aplicações conectadas a um banco de dados relacional.

## 4. Objetivos específicos

- Centralizar os cadastros de clientes, produtos e funcionários.
- Controlar a disponibilidade e a localização de mercadorias no armazém.
- Gerenciar pedidos e acompanhar seus respectivos status.
- Implementar algoritmos para apoiar a alocação de pallets e a otimização de rotas.
- Disponibilizar um portal web para consultas e compras.
- Desenvolver um aplicativo desktop para as operações internas.
- Aplicar práticas de segurança, testes, versionamento e documentação técnica.

## 5. Público-alvo

O sistema será utilizado pelos seguintes perfis:

- **Clientes:** realizam cadastros, consultam produtos, fazem pedidos e acompanham entregas.
- **Operadores de armazém:** administram o estoque e registram movimentações.
- **Gerentes logísticos:** acompanham pedidos, entregas, rotas e indicadores operacionais.
- **Administradores:** gerenciam usuários, permissões e configurações do sistema.

## 6. Escopo do projeto

### 6.1 Funcionalidades incluídas

- Cadastro, consulta, alteração e exclusão controlada de registros.
- Autenticação e controle de acesso por perfil.
- Gerenciamento de produtos, clientes, funcionários e armazéns.
- Controle de estoque e localização de pallets.
- Gestão de pedidos, pagamentos e entregas.
- Consulta do status de rastreamento.
- Cálculo de rotas e custos estimados de transporte.
- Relatórios, registros de auditoria e operações de backup.
- Testes, documentação técnica e versionamento do código.

### 6.2 Limites do projeto

A primeira versão será desenvolvida para fins educacionais. Integrações com transportadoras internacionais, gateways de pagamento reais e serviços externos de rastreamento poderão ser simuladas quando não houver acesso a APIs ou credenciais apropriadas.

O rastreamento será atualizado conforme os eventos registrados no sistema, não sendo considerado rastreamento GPS real sem integração específica.

## 7. Arquitetura proposta

A solução será organizada em três módulos principais:

1. **Front-end web:** interface desenvolvida com HTML, CSS e JavaScript.
2. **Back-end:** API desenvolvida com Node.js e Express, responsável pelas regras de negócio e pela comunicação com o banco de dados.
3. **Aplicação desktop:** interface corporativa para operações internas, com tecnologia a definir.

O banco de dados MySQL armazenará as informações compartilhadas. O acesso aos dados deverá respeitar as regras de segurança e integridade definidas para o sistema.

## 8. Tecnologias previstas

- HTML5 e CSS3.
- JavaScript ES6+.
- Node.js e Express.
- MySQL.
- C# com Windows Forms ou Java com Swing/JavaFX para desktop.
- Git e GitHub.
- Ferramentas de testes compatíveis com cada módulo.

A tecnologia definitiva do aplicativo desktop será confirmada antes do início de sua implementação.

## 9. Segurança e privacidade

O sistema deverá aplicar controle de acesso, armazenamento seguro de senhas, validação de dados, consultas SQL parametrizadas e proteção contra vulnerabilidades comuns.

Os dados pessoais deverão ser tratados conforme os princípios aplicáveis da Lei Geral de Proteção de Dados (LGPD), com coleta limitada ao necessário e acesso restrito às informações conforme as permissões de cada usuário.

## 10. Resultados esperados

Espera-se entregar uma plataforma funcional, organizada e documentada, demonstrando a integração entre banco de dados, algoritmos, orientação a objetos, aplicações desktop e web, versionamento e testes de software.

## 11. Critérios gerais de aceitação

- Os módulos devem executar suas funcionalidades previstas.
- Os dados devem manter integridade entre as operações.
- Os acessos devem respeitar as permissões dos usuários.
- Os formulários devem validar entradas e apresentar mensagens adequadas.
- Os testes devem ser documentados e seus resultados registrados.
- O código e a documentação devem estar versionados no repositório.
- As entregas devem ser verificadas conforme os indicadores oficiais das unidades curriculares.

## 12. Próximas etapas

1. Elaborar os requisitos funcionais e não funcionais detalhados.
2. Modelar os casos de uso e seus fluxos.
3. Planejar o Product Backlog e as quatro Sprints.
4. Elaborar o modelo conceitual e lógico do banco de dados.
5. Implementar e testar os módulos progressivamente.