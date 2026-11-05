# OmniLog Hub

Sistema integrado de gestão logística, estoque e e-commerce.
Projeto Integrador individual do curso Técnico em Desenvolvimento de Sistemas - Senac.

## Tecnologias

- HTML5, CSS3 e JavaScript
- Node.js e Express
- MySQL
- C# e .NET
- Git e GitHub

## Estrutura

- `algoritmos/`: algoritmos de alocação e rotas.
- `backend/`: API REST e conexão com MySQL.
- `database/`: estrutura, dados, consultas e procedures SQL.
- `desktop/`: exemplos de orientação a objetos e testes em C#.
- `docs/`: requisitos, planejamento, diagramas e documentação.
- `frontend/`: painel web.

## Requisitos

- Node.js e npm
- MySQL Server
- .NET SDK 10 ou compatível

## Configuração

1. Clone o repositório.
2. Entre na pasta `backend`.
3. Instale as dependências:

   `npm install`

4. Configure o arquivo `backend/.env` com os dados locais do MySQL.
5. Execute os scripts SQL de `database/scripts/` na ordem numérica.
6. Inicie a API:

   `node src/server.js`

7. Acesse `http://localhost:3000`.

## Endpoints disponíveis

- `GET /api/health`: verifica API e banco.
- `GET /api/produtos`: lista produtos.
- `GET /api/produtos/:id`: consulta produto.
- `POST /api/produtos`: cadastra produto.
- `PUT /api/produtos/:id`: atualiza produto.
- `DELETE /api/produtos/:id`: desativa produto.
- `GET /api/usuarios`: consulta usuários.
- `POST /api/usuarios`: cadastra usuário.

## Testes

Backend:

`cd backend && npm test`

Algoritmos:

`node algoritmos/tests/teste-algoritmos.js`

C#:

`dotnet run --project desktop/OmniLogHub.Testes`

Execução do exemplo C#:

`dotnet run --project desktop/OmniLogHub.POO`

## Observações

O projeto possui módulos implementados em diferentes níveis de conclusão.
O painel web está integrado à API de produtos. O cadastro de usuários possui
validação e proteção de senha por hash.

A aplicação desktop atual contém demonstrações em console de orientação a
objetos, pagamentos, veículos e estruturas de dados; não representa ainda
uma interface gráfica desktop completa.

Autenticação com sessão, clientes, pedidos e rastreamento integrado são
funcionalidades que precisam de implementação complementar.

O rastreamento real depende de integração com serviços externos.
