using Loja.Domain.Application.Interface;
using Loja.Domain.Entities;
using Loja.Domain.Interfaces.Services;

namespace Loja.Domain.Application
{
    public class ProdutoAppService : AppServiceBase<Produto>, IProdutoAppService
    {
        private readonly IProdutoService _produtoService;

        public ProdutoAppService(IProdutoService produtoService) : base(produtoService)
        {
            _produtoService = produtoService;
        }

        public IEnumerable<Produto> BuscarPorNome(string nome)
        {
            return _produtoService.BuscarPorNome(nome);
        }

        public IEnumerable<Produto> GetProdutosAtivo()
        {
            var produtosAtivos = _produtoService.GetProdutosAtivo();
            return produtosAtivos ?? Enumerable.Empty<Produto>();
        }


    }
}
