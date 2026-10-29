# OmniLog Hub — Documentação dos Algoritmos (UC2)

## 1. Otimização de rotas

O arquivo `algoritmos/rotas.js` implementa o algoritmo de Dijkstra para encontrar a menor distância entre dois locais.

### Estrutura utilizada
- Matriz de adjacência: representa as distâncias entre locais.
- Vetor de distâncias: guarda a menor distância conhecida até cada local.
- Vetor de anteriores: permite reconstruir a rota encontrada.
- Vetor de visitados: identifica locais já processados.

### Complexidade
A implementação utiliza matriz de adjacência e busca linear pelo próximo local, com complexidade O(V²), em que V é o número de locais.

### Limitações
- As distâncias são fictícias para demonstração.
- Distâncias negativas não são aceitas.
- O algoritmo minimiza distância, não necessariamente tempo, custo ou trânsito.

## 2. Alocação 3D de cargas

O arquivo `algoritmos/alocacao-armazem.js` procura posições livres em uma grade tridimensional usando largura, profundidade e altura.

### Regras
- Cada posição comporta uma carga.
- O peso total não pode superar o limite definido.
- Cargas perigosas e incompatíveis não podem ocupar posições adjacentes.
- Se não houver posição válida, a carga é recusada.

### Limitações
- A versão inicial não considera dimensões físicas individuais, centro de gravidade ou distribuição de peso por prateleira.
- A regra de incompatibilidade é uma simplificação acadêmica e deve ser adaptada às regras reais de segurança.
- A alocação é feita pela primeira posição válida, não por uma otimização global.

## 3. Testes

Executar no terminal:

`node algoritmos/tests/teste-algoritmos.js`

Os testes verificam:
- Menor rota e distância total.
- Destino sem ligação.
- Índices inválidos.
- Limite de peso.
- Separação de cargas incompatíveis.
- Dimensões inválidas.

Registrar os resultados observados antes da entrega.
