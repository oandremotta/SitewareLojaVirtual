using Loja.Domain.Entities;

namespace Loja.Domain.Application.Interface
{
    public interface IProdutoAppService : IAppServiceBase<Produto>
    {
        IEnumerable<Produto> BuscarPorNome(string nome);
        IEnumerable<Produto> GetProdutosAtivo();
    }
}
