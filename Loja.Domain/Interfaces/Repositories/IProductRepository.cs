using Loja.Domain.Entities;

namespace Loja.Domain.Interfaces.Repositories
{
    public interface IProductRepository : IRepositoryBase<Produto>
    {
        IEnumerable<Produto> BuscarPorNome(string nome);
    }
}
