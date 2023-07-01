using Loja.Domain.Entities;

namespace Loja.Domain.Interfaces.Services
{
    public interface ICarrinhoService : IServiceBase<Carrinho>
    {
        void AdicionarItem(int carrinhoId, int produtoId, int quantidade);
        void RemoverItem(int carrinhoId, int itemId);
        void AtualizarQuantidade(int carrinhoId, int itemId, int novaQuantidade);
        void LimparCarrinho(int carrinhoId);
        decimal CalcularTotal(int carrinhoId);
        bool FinalizarCompra(int carrinhoId);
    }
}
