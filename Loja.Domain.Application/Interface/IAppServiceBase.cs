namespace Loja.Domain.Application.Interface
{
    public interface IAppServiceBase<T> where T : class
    {
        void Add(T app);
        T GetById(int id);
        IEnumerable<T> GetAll();
        void Update(T app);
        void Remove(T app);
        void Dispose();
    }
}
