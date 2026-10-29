# OmniLog Hub — Casos de Uso

## 1. Objetivo
Descrever as principais interações entre os usuários e o sistema OmniLog Hub.

## 2. Atores
- **Administrador:** gerencia usuários e configurações.
- **Funcionário de estoque:** administra produtos e movimentações.
- **Gerente logístico:** acompanha pedidos, entregas e relatórios.
- **Cliente:** consulta seus pedidos e o andamento das entregas.

## 3. Casos de uso

### UC01 — Autenticar usuário
**Ator:** todos os usuários com acesso ao sistema.
**Pré-condição:** possuir uma conta cadastrada.
**Fluxo principal:**
1. O usuário informa e-mail e senha.
2. O sistema valida as credenciais.
3. O sistema libera o acesso conforme as permissões.
**Exceção:** se os dados forem inválidos, o sistema informa que não foi possível entrar.

### UC02 — Gerenciar produtos
**Ator:** administrador ou funcionário autorizado.
**Pré-condição:** estar autenticado e possuir permissão.
**Fluxo principal:**
1. O usuário acessa o cadastro de produtos.
2. Escolhe cadastrar, consultar, editar ou excluir.
3. Informa ou seleciona os dados necessários.
4. O sistema valida e registra a operação.
**Exceção:** dados inválidos impedem o salvamento.

### UC03 — Gerenciar clientes
**Ator:** administrador ou funcionário autorizado.
**Fluxo principal:**
1. O usuário abre a área de clientes.
2. Informa os dados ou seleciona um cadastro existente.
3. O sistema valida e salva a operação.

### UC04 — Controlar estoque
**Ator:** funcionário de estoque.
**Pré-condição:** produto cadastrado.
**Fluxo principal:**
1. O funcionário seleciona o produto.
2. Informa uma entrada ou saída e a quantidade.
3. O sistema verifica as regras de estoque.
4. O sistema registra a movimentação e atualiza o saldo.
**Exceção:** uma saída maior que o saldo disponível é recusada.

### UC05 — Criar pedido
**Ator:** funcionário autorizado ou cliente, conforme as permissões definidas.
**Pré-condição:** cliente cadastrado e produtos disponíveis.
**Fluxo principal:**
1. O usuário seleciona o cliente e os produtos.
2. Informa as quantidades.
3. O sistema valida os dados e calcula o valor.
4. O sistema registra o pedido com seu status inicial.
**Exceção:** o pedido não é criado se os dados forem inválidos ou faltar estoque.

### UC06 — Acompanhar entrega
**Ator:** cliente ou gerente logístico.
**Pré-condição:** pedido registrado.
**Fluxo principal:**
1. O usuário consulta o pedido.
2. O sistema apresenta o status e os eventos registrados.
3. Um funcionário autorizado pode atualizar a etapa da entrega.

### UC07 — Consultar relatórios
**Ator:** gerente logístico ou administrador.
**Pré-condição:** possuir permissão de consulta.
**Fluxo principal:**
1. O usuário escolhe o tipo de relatório.
2. Informa os filtros disponíveis.
3. O sistema consulta os dados e apresenta os resultados.

## 4. Regras gerais
- Ações administrativas exigem permissão adequada.
- O estoque não pode ficar negativo.
- Os pedidos devem estar associados a um cliente.
- As alterações devem respeitar as regras de integridade dos dados.

## 5. Observação
Os fluxos poderão ser refinados durante o desenvolvimento e a validação com o professor.
