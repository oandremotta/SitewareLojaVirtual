namespace Loja.Domain.Entities
{
    public class ItemCarrinho : Entity
    {
        public Produto Produto { get; set; }
        public int Quantidade { get; set; }
    }
}
