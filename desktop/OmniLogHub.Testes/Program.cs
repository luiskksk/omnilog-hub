
using System;
using OmniLogHub.POO;

class Program
{
    static void Verificar(bool condicao, string nome)
    {
        if (!condicao)
            throw new Exception("FALHOU: " + nome);

        Console.WriteLine("PASSOU: " + nome);
    }

    static void Main()
    {
        var caminhao = new Caminhao("Volvo", 10000);
        var van = new Van("Fiat Ducato", 1500);
        var moto = new Moto("Honda", 20);

       Verificar(Math.Abs(caminhao.CalcularFrete(100) - 450) < 0.001,
    "Frete do caminhão");

Verificar(Math.Abs(van.CalcularFrete(100) - 220) < 0.001,
    "Frete da van");

Verificar(Math.Abs(moto.CalcularFrete(100) - 110) < 0.001,
    "Frete da moto");

        Verificar(new PagamentoPix().Pagar(150),
            "Pagamento Pix válido");

        Verificar(!new PagamentoCartao().Pagar(0),
            "Pagamento de valor zero rejeitado");

        var pilha = new Pilha<string>();
        pilha.Adicionar("Pedido 1");
        pilha.Adicionar("Pedido 2");

        Verificar(pilha.Remover() == "Pedido 2",
            "Pilha segue LIFO");

        var fila = new Fila<string>();
        fila.Adicionar("Pedido 1");
        fila.Adicionar("Pedido 2");

        Verificar(fila.Remover() == "Pedido 1",
            "Fila segue FIFO");

        Console.WriteLine("\nTodos os testes passaram!");
    }
}
