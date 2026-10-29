namespace OmniLogHub.POO;

public interface IPagamento
{
    bool Pagar(double valor);
}

public class PagamentoPix : IPagamento
{
    public bool Pagar(double valor)
    {
        Console.WriteLine($"Pagamento via Pix: R$ {valor:F2}");
        return valor > 0;
    }
}

public class PagamentoCartao : IPagamento
{
    public bool Pagar(double valor)
    {
        Console.WriteLine($"Pagamento via cartão: R$ {valor:F2}");
        return valor > 0;
    }
}

public class PagamentoDinheiro : IPagamento
{
    public bool Pagar(double valor)
    {
        Console.WriteLine($"Pagamento em dinheiro: R$ {valor:F2}");
        return valor > 0;
    }
}