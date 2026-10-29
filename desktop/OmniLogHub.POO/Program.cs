
using System;
using System.Collections.Generic;

// HERANÇA E POLIMORFISMO
abstract class Veiculo
{
    public string Modelo { get; set; }
    public double CapacidadeKg { get; set; }

    public Veiculo(string modelo, double capacidadeKg)
    {
        Modelo = modelo;
        CapacidadeKg = capacidadeKg;
    }

    public abstract double CalcularFrete(double distanciaKm);
}

class Caminhao : Veiculo
{
    public Caminhao(string modelo, double capacidadeKg)
        : base(modelo, capacidadeKg) { }

    public override double CalcularFrete(double distanciaKm)
        => distanciaKm * 4.50;
}

class Van : Veiculo
{
    public Van(string modelo, double capacidadeKg)
        : base(modelo, capacidadeKg) { }

    public override double CalcularFrete(double distanciaKm)
        => distanciaKm * 2.20;
}

class Moto : Veiculo
{
    public Moto(string modelo, double capacidadeKg)
        : base(modelo, capacidadeKg) { }

    public override double CalcularFrete(double distanciaKm)
        => distanciaKm * 1.10;
}

// INTERFACE E FORMAS DE PAGAMENTO
interface IPagamento
{
    bool Pagar(double valor);
}

class PagamentoPix : IPagamento
{
    public bool Pagar(double valor)
    {
        Console.WriteLine($"Pagamento via Pix: R$ {valor:F2}");
        return valor > 0;
    }
}

class PagamentoCartao : IPagamento
{
    public bool Pagar(double valor)
    {
        Console.WriteLine($"Pagamento via cartão: R$ {valor:F2}");
        return valor > 0;
    }
}

class PagamentoDinheiro : IPagamento
{
    public bool Pagar(double valor)
    {
        Console.WriteLine($"Pagamento em dinheiro: R$ {valor:F2}");
        return valor > 0;
    }
}

// PILHA: ÚLTIMO A ENTRAR, PRIMEIRO A SAIR
class Pilha<T>
{
    private Stack<T> itens = new Stack<T>();

    public void Adicionar(T item) => itens.Push(item);

    public T Remover() => itens.Pop();

    public int Quantidade => itens.Count;
}

// FILA: PRIMEIRO A ENTRAR, PRIMEIRO A SAIR
class Fila<T>
{
    private Queue<T> itens = new Queue<T>();

    public void Adicionar(T item) => itens.Enqueue(item);

    public T Remover() => itens.Dequeue();

    public int Quantidade => itens.Count;
}

// EXECUÇÃO E TESTES
class Program
{
    static void Main()
    {
        Console.WriteLine("=== OMNILOG HUB ===\n");

        // Testando polimorfismo
        List<Veiculo> veiculos = new List<Veiculo>
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

        IPagamento pagamento = new PagamentoPix();
        bool aprovado = pagamento.Pagar(150);

        Console.WriteLine($"Aprovado: {aprovado}");

        Console.WriteLine("\n=== PILHA ===");

        Pilha<string> pilha = new Pilha<string>();
        pilha.Adicionar("Pedido 1");
        pilha.Adicionar("Pedido 2");

        Console.WriteLine($"Removido: {pilha.Remover()}");

        Console.WriteLine("\n=== FILA ===");

        Fila<string> fila = new Fila<string>();
        fila.Adicionar("Pedido 1");
        fila.Adicionar("Pedido 2");

        Console.WriteLine($"Removido: {fila.Remover()}");

        Console.WriteLine("\nTestes básicos concluídos!");
    }
}
