using System.Collections.Generic;

namespace OmniLogHub.POO;

public class Pilha<T>
{
    private readonly Stack<T> itens = new();

    public void Adicionar(T item) => itens.Push(item);

    public T Remover() => itens.Pop();

    public int Quantidade => itens.Count;
}

public class Fila<T>
{
    private readonly Queue<T> itens = new();

    public void Adicionar(T item) => itens.Enqueue(item);

    public T Remover() => itens.Dequeue();

    public int Quantidade => itens.Count;
}