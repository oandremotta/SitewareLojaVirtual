using Loja.Domain.Entities;
using Loja.Domain.Infra.Contexts;
using Loja.Domain.Infra.Repositories;
using Loja.Domain.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;

public class ProdutoRepository : RepositoryBase<Produto>, IProductRepository
{
    public ProdutoRepository(LojaContext context) : base(context)
    {
    }

    public IEnumerable<Produto> BuscarPorNome(string nome)
    {
        return _context.Produtos.Where(x => x.Nome.Contains(nome));
    }
}
