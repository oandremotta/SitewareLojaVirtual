namespace Loja.Domain.Entities
{
    public class Carrinho : Entity
    {
        public List<ItemCarrinho> Itens { get; private set; }
        public int Status { get; set; }
        public DateTime CriadoEm { get; set; }
        public DateTime AtualizadoEm { get; set; }
        public decimal Total { get; set; }

        public Carrinho()
        {
            Itens = new List<ItemCarrinho>();
        }

    }
}
