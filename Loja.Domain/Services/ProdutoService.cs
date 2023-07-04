using Loja.Domain.Entities;
using Loja.Domain.Interfaces.Repositories;
using Loja.Domain.Interfaces.Services;

namespace Loja.Domain.Services
{
    public class ProdutoService : ServiceBase<Produto>, IProdutoService
    {
        private readonly IProductRepository _repository;

        public ProdutoService(IProductRepository repository) :base(repository) 
        {
            _repository = repository;
        }

        public IEnumerable<Produto> BuscarPorNome(string nome)
        {
            return _repository.BuscarPorNome(nome);
        }

        public IEnumerable<Produto> GetProdutosAtivo()
        {
            return _repository.GetProdutosAtivo();
        }
    }
}
