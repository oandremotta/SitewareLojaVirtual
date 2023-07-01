namespace Loja.Domain.Interfaces.Repositories
{
    public interface IRepositoryBase<T> where T : class
    {
        void Add(T entity);
        T GetById(int id);
        IEnumerable<T> GetAll();
        void Update(T entity);
        void Delete(T entity);
        void Dispose();
    }
}
