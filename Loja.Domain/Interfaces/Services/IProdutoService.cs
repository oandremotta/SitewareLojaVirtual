using Loja.Domain.Entities;

namespace Loja.Domain.Interfaces.Services
{
    public interface IProdutoService : IServiceBase<Produto>
    {
        IEnumerable<Produto> BuscarPorNome(string nome);
        IEnumerable<Produto> GetProdutosAtivo();
    }
}
