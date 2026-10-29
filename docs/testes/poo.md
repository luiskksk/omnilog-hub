# OmniLog Hub — Programação Orientada a Objetos (UC4)

## 1. Classes e herança
O arquivo `backend/src/poo/veiculos.js` contém a classe base `Veiculo` e as classes `Caminhao`, `Van` e `Moto`.

As classes filhas herdam placa e capacidade da classe base, mas implementam seus próprios cálculos de custo por quilômetro.

## 2. Polimorfismo
O método `calcularCusto()` possui comportamentos diferentes conforme o tipo de veículo:
- Caminhão: R$ 4,50 por quilômetro.
- Van: R$ 2,20 por quilômetro.
- Moto: R$ 1,10 por quilômetro.

Os valores são fictícios e utilizados apenas para demonstrar o conceito.

## 3. Pagamentos
O arquivo `backend/src/poo/pagamentos.js` define uma classe base e três formas de pagamento: PIX, cartão e dinheiro.

Os pagamentos são simulados para fins acadêmicos. Nenhuma transação bancária real é realizada.

## 4. Estruturas de dados
O arquivo `backend/src/poo/estruturas.js` implementa:
- **Pilha (LIFO):** o último elemento adicionado é o primeiro removido.
- **Fila (FIFO):** o primeiro elemento adicionado é o primeiro removido.

Essas estruturas podem representar histórico de operações e processamento de tarefas, respectivamente.

## 5. Testes
Executar no terminal:

`node backend/tests/teste-poo.js`

O arquivo verifica herança, polimorfismo, validações, formas de pagamento, pilha e fila.

Registrar os resultados observados antes da entrega.
