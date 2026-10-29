
using System;
using System.Collections.Generic;

namespace OmniLogHub.POO;

class Program
{
    static void Main()
    {
        Console.WriteLine("=== OMNILOG HUB ===\n");

        List<Veiculo> veiculos = new()
        {
            new Caminhao("Volvo", 10000),
            new Van("Fiat Ducato", 1500),
            new Moto("Honda", 20)
        };

        foreach (Veiculo veiculo in veiculos)
        {
            Console.WriteLine(
                $"{veiculo.Modelo}: frete de R$ " +
                $"{veiculo.CalcularFrete(100):F2} para 100 km"
            );
        }

        Console.WriteLine("\n=== PAGAMENTOS ===");

        IPagamento pix = new PagamentoPix();
        IPagamento cartao = new PagamentoCartao();
        IPagamento dinheiro = new PagamentoDinheiro();

        Console.WriteLine($"Pix aprovado: {pix.Pagar(150)}");
        Console.WriteLine($"Cartão aprovado: {cartao.Pagar(200)}");
        Console.WriteLine($"Dinheiro aprovado: {dinheiro.Pagar(80)}");

        Console.WriteLine("\n=== PILHA ===");

        Pilha<string> pilha = new();
        pilha.Adicionar("Pedido 1");
        pilha.Adicionar("Pedido 2");

        Console.WriteLine($"Removido: {pilha.Remover()}");
        Console.WriteLine($"Itens restantes: {pilha.Quantidade}");

        Console.WriteLine("\n=== FILA ===");

        Fila<string> fila = new();
        fila.Adicionar("Pedido 1");
        fila.Adicionar("Pedido 2");

        Console.WriteLine($"Removido: {fila.Remover()}");
        Console.WriteLine($"Itens restantes: {fila.Quantidade}");

        Console.WriteLine("\nExecução concluída!");
    }
}
