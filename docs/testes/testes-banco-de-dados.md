# OmniLog Hub — Plano de Testes do Banco de Dados

## Objetivo
Verificar a estrutura, os relacionamentos e as principais regras de integridade do banco.

## Casos de teste

| ID | Teste | Resultado esperado |
|---|---|---|
| BD01 | Consultar as tabelas do banco | As 15 tabelas são listadas |
| BD02 | Inserir produto com SKU novo e válido | Produto cadastrado |
| BD03 | Inserir produto com SKU duplicado | Banco rejeita a duplicação |
| BD04 | Inserir produto com preço negativo | Restrição CHECK rejeita o registro |
| BD05 | Inserir estoque com quantidade negativa | Restrição CHECK rejeita o registro |
| BD06 | Inserir produto com categoria inexistente | Chave estrangeira rejeita o registro |
| BD07 | Executar consultas de relatórios | Consultas são executadas sem erro |
| BD08 | Registrar entrada de estoque pela procedure | Quantidade aumenta e movimentação é registrada |
| BD09 | Registrar saída dentro do saldo | Quantidade diminui e movimentação é registrada |
| BD10 | Tentar saída maior que o saldo | Operação falha e saldo permanece igual |
| BD11 | Tentar movimentação com quantidade zero | Procedure rejeita a operação |
| BD12 | Consultar eventos de entrega | Eventos existentes são listados |

## Registro dos resultados

Preencher durante a execução:

| ID | Resultado obtido | Situação | Observações |
|---|---|---|---|
| BD01 | A preencher | Pendente | |
| BD02 | A preencher | Pendente | |
| BD03 | A preencher | Pendente | |
| BD04 | A preencher | Pendente | |
| BD05 | A preencher | Pendente | |
| BD06 | A preencher | Pendente | |
| BD07 | A preencher | Pendente | |
| BD08 | A preencher | Pendente | |
| BD09 | A preencher | Pendente | |
| BD10 | A preencher | Pendente | |
| BD11 | A preencher | Pendente | |
| BD12 | A preencher | Pendente | |

## Critérios de aprovação
Um teste é aprovado quando o resultado observado corresponde ao resultado esperado. Falhas devem ser registradas, corrigidas e testadas novamente.
