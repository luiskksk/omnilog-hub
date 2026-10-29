# OmniLog Hub — Documento de Requisitos

**Projeto:** OmniLog Hub
**Versão:** 1.0
**Curso:** Técnico em Desenvolvimento de Sistemas — Senac
**Unidade curricular:** UC1 — Planejamento de soluções computacionais

## 1. Objetivo

O OmniLog Hub tem como objetivo centralizar o gerenciamento de produtos, estoque, clientes, pedidos e entregas em um único sistema, facilitando o controle das operações logísticas.

## 2. Requisitos funcionais (RF)

| Código | Requisito |
|---|---|
| RF01 | O sistema deve permitir o cadastro, a consulta, a edição e a exclusão de produtos. |
| RF02 | O sistema deve permitir o cadastro, a consulta, a edição e a exclusão de clientes. |
| RF03 | O sistema deve permitir o cadastro e o gerenciamento de funcionários. |
| RF04 | O sistema deve permitir o cadastro e o gerenciamento de armazéns. |
| RF05 | O sistema deve registrar entradas e saídas de estoque. |
| RF06 | O sistema deve permitir consultar a quantidade disponível de cada produto. |
| RF07 | O sistema deve permitir criar e consultar pedidos. |
| RF08 | O sistema deve registrar as etapas de entrega de cada pedido. |
| RF09 | O sistema deve permitir consultar o status de um pedido. |
| RF10 | O sistema deve gerar relatórios de estoque, pedidos e entregas. |
| RF11 | O sistema deve permitir autenticação de usuários. |
| RF12 | O sistema deve controlar as permissões de acesso conforme o perfil do usuário. |
| RF13 | O sistema deve calcular rotas e estimativas de custos logísticos com base nos dados cadastrados. |
| RF14 | O sistema deve registrar informações relevantes para auditoria das operações. |

## 3. Requisitos não funcionais (RNF)

| Código | Requisito |
|---|---|
| RNF01 | A interface web deve se adaptar a computadores, tablets e celulares. |
| RNF02 | O sistema deve validar os dados antes de salvar informações. |
| RNF03 | As senhas devem ser armazenadas usando técnicas seguras de hash. |
| RNF04 | O sistema deve utilizar consultas parametrizadas para reduzir riscos de SQL Injection. |
| RNF05 | As funcionalidades devem apresentar mensagens claras de sucesso e erro. |
| RNF06 | O código deve ser organizado em módulos e camadas para facilitar a manutenção. |
| RNF07 | O banco de dados deve possuir relacionamentos e restrições de integridade. |
| RNF08 | O projeto deve utilizar Git e GitHub para controle de versão. |
| RNF09 | O sistema deve possuir testes documentados para suas principais funcionalidades. |
| RNF10 | O sistema deve respeitar princípios de acessibilidade e proteção de dados pessoais, considerando a LGPD. |
| RNF11 | As operações principais devem apresentar desempenho adequado para o volume de dados do projeto acadêmico. |
| RNF12 | O projeto deve possuir documentação técnica para orientar sua instalação e utilização. |

## 4. Regras de negócio

| Código | Regra |
|---|---|
| RN01 | Um pedido deve estar associado a um cliente cadastrado. |
| RN02 | A quantidade de produtos em estoque não pode ser negativa. |
| RN03 | Uma saída de estoque não pode ultrapassar a quantidade disponível. |
| RN04 | Cada pedido deve possuir um status de acompanhamento. |
| RN05 | Somente usuários autorizados podem executar operações administrativas. |
| RN06 | Os produtos devem possuir identificação única no sistema. |
| RN07 | A alocação de cargas deve respeitar limites de peso e restrições de segurança. |
| RN08 | As alterações importantes devem manter registros para consulta e auditoria. |

## 5. Critérios de aceitação

- Os cadastros devem permitir incluir, consultar, alterar e excluir registros conforme as permissões.
- O sistema deve impedir o registro de dados inválidos.
- O estoque deve ser atualizado corretamente após entradas e saídas.
- Os pedidos devem permitir acompanhar seu status.
- Os relatórios devem apresentar informações consistentes com o banco de dados.
- As funcionalidades principais devem possuir testes documentados.
- O projeto deve ter código versionado e documentação atualizada.

## 6. Observações

Este documento representa os requisitos iniciais do projeto acadêmico. Os requisitos poderão ser refinados durante o desenvolvimento, conforme os testes, as validações e as orientações do professor.
