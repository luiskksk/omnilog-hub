namespace OmniLogHub.POO;

public abstract class Veiculo
{
    public string Modelo { get; set; }
    public double CapacidadeKg { get; set; }

    protected Veiculo(string modelo, double capacidadeKg)
    {
        Modelo = modelo;
        CapacidadeKg = capacidadeKg;
    }

    public abstract double CalcularFrete(double distanciaKm);
}

public class Caminhao : Veiculo
{
    public Caminhao(string modelo, double capacidadeKg)
        : base(modelo, capacidadeKg) { }

    public override double CalcularFrete(double distanciaKm)
        => distanciaKm * 4.50;
}

public class Van : Veiculo
{
    public Van(string modelo, double capacidadeKg)
        : base(modelo, capacidadeKg) { }

    public override double CalcularFrete(double distanciaKm)
        => distanciaKm * 2.20;
}

public class Moto : Veiculo
{
    public Moto(string modelo, double capacidadeKg)
        : base(modelo, capacidadeKg) { }

    public override double CalcularFrete(double distanciaKm)
        => distanciaKm * 1.10;
}