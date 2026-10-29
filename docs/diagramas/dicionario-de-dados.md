# OmniLog Hub — Dicionário de Dados

## Objetivo
Descrever as tabelas e os principais campos do banco de dados relacional do OmniLog Hub.

## Entidades

| Tabela | Finalidade | Chave primária | Relacionamentos principais |
|---|---|---|---|
| usuarios | Contas e permissões de acesso | id | Funcionários, pedidos, movimentações e eventos |
| clientes | Dados dos clientes | id | Pedidos |
| armazens | Unidades de armazenamento | id | Funcionários, estoque |
| funcionarios | Funcionários associados a contas | id | Usuários e armazéns |
| categorias | Classificação de produtos | id | Produtos |
| produtos | Catálogo de produtos | id | Categorias, estoque, itens de pedidos |
| estoque | Quantidade por produto e armazém | armazem_id + produto_id | Armazéns e produtos |
| movimentacoes_estoque | Histórico de entradas e saídas | id | Estoque e usuários |
| pedidos | Pedidos realizados | id | Clientes, usuários, itens, pagamentos e entrega |
| itens_pedido | Produtos e quantidades de cada pedido | id | Pedidos e produtos |
| pagamentos | Registros de pagamentos | id | Pedidos |
| transportadoras | Empresas de transporte | id | Veículos e entregas |
| veiculos | Veículos usados nas entregas | id | Transportadoras e entregas |
| entregas | Dados de transporte de cada pedido | id | Pedidos, transportadoras e veículos |
| eventos_entrega | Histórico de acompanhamento | id | Entregas e usuários |

## Campos importantes

### usuarios
- `id`: identificador único.
- `nome`: nome do usuário.
- `email`: e-mail único para acesso.
- `senha_hash`: hash seguro da senha, nunca a senha em texto puro.
- `perfil`: administrador, gerente ou operador.
- `ativo`: indica se a conta está habilitada.
- `criado_em`: data e hora do cadastro.

### clientes
- `id`: identificador único.
- `nome`: nome do cliente.
- `email`: e-mail opcional e único quando informado.
- `telefone`: contato telefônico.
- `documento`: documento opcional e único quando informado.
- `criado_em`: data e hora do cadastro.

### armazens
- `id`: identificador único.
- `nome`: nome do armazém.
- `endereco`: endereço da unidade.
- `capacidade_kg`: capacidade máxima planejada em quilogramas.
- `ativo`: indica se a unidade está ativa.

### funcionarios
- `id`: identificador único.
- `usuario_id`: conta associada ao funcionário.
- `armazem_id`: armazém de trabalho, quando definido.
- `cargo`: função exercida.
- `data_admissao`: data de admissão.
- `ativo`: situação do funcionário.

### categorias
- `id`: identificador único.
- `nome`: nome único da categoria.
- `descricao`: descrição opcional.

### produtos
- `id`: identificador único.
- `categoria_id`: categoria do produto.
- `nome`: nome do produto.
- `descricao`: detalhes opcionais.
- `sku`: código único de identificação.
- `preco`: preço unitário.
- `peso_kg`: peso unitário em quilogramas.
- `ativo`: indica se o produto pode ser comercializado.

### estoque
- `armazem_id`: armazém onde o produto está guardado.
- `produto_id`: produto armazenado.
- `quantidade`: unidades disponíveis.
- `atualizado_em`: última atualização do registro.
- Chave composta: `armazem_id` + `produto_id`.

### movimentacoes_estoque
- `id`: identificador único.
- `armazem_id` e `produto_id`: produto e local da movimentação.
- `usuario_id`: usuário responsável, quando identificado.
- `tipo`: entrada ou saída.
- `quantidade`: quantidade movimentada, sempre positiva.
- `motivo`: justificativa da movimentação.
- `criado_em`: data e hora do registro.

### pedidos
- `id`: identificador único.
- `cliente_id`: cliente responsável pelo pedido.
- `usuario_id`: usuário que registrou o pedido, quando aplicável.
- `status`: situação atual do pedido.
- `valor_total`: valor total do pedido.
- `criado_em`: data e hora de criação.

### itens_pedido
- `id`: identificador único.
- `pedido_id`: pedido relacionado.
- `produto_id`: produto incluído.
- `quantidade`: unidades solicitadas.
- `preco_unitario`: preço registrado no momento do pedido.

### pagamentos
- `id`: identificador único.
- `pedido_id`: pedido relacionado.
- `valor`: valor do pagamento.
- `metodo`: método utilizado.
- `status`: situação do pagamento.
- `pago_em`: data e hora da confirmação, quando houver.

### transportadoras
- `id`: identificador único.
- `nome`: nome da transportadora.
- `documento`: documento opcional.
- `telefone` e `email`: contatos.

### veiculos
- `id`: identificador único.
- `transportadora_id`: transportadora responsável, quando definida.
- `placa`: placa única.
- `modelo`: modelo do veículo.
- `capacidade_kg`: capacidade de carga em quilogramas.
- `ativo`: indica se o veículo está disponível.

### entregas
- `id`: identificador único.
- `pedido_id`: pedido relacionado; cada pedido possui no máximo uma entrega nesta versão.
- `transportadora_id`: transportadora responsável, quando definida.
- `veiculo_id`: veículo escolhido, quando definido.
- `endereco_destino`: endereço de destino.
- `status`: situação da entrega.
- `previsao_entrega`: data prevista.
- `entregue_em`: data e hora da conclusão.

### eventos_entrega
- `id`: identificador único.
- `entrega_id`: entrega relacionada.
- `usuario_id`: responsável pelo registro, quando identificado.
- `status`: etapa registrada.
- `descricao`: informação sobre o evento.
- `localizacao`: local informado, quando disponível.
- `ocorrido_em`: data e hora do evento.

## Integridade e normalização
- As tabelas possuem chaves primárias.
- As chaves estrangeiras estabelecem os relacionamentos entre entidades.
- Campos únicos evitam duplicação de identificadores importantes.
- Restrições CHECK validam quantidades, preços, pesos e status permitidos.
- O estoque utiliza chave primária composta por armazém e produto.
- A estrutura separa entidades e evita repetir os dados de produtos dentro de cada item de pedido.

## Observações
Este é o modelo inicial do projeto. A normalização formal até a terceira forma normal (3FN), o DER visual, os testes das restrições e a validação das regras devem ser conferidos antes da entrega final.
