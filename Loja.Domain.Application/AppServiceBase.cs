using Loja.Domain.Application.Interface;
using Loja.Domain.Interfaces.Services;

namespace Loja.Domain.Application
{
    public class AppServiceBase<T> : IDisposable, IAppServiceBase<T> where T : class
    {
        private readonly IServiceBase<T> _serviceBase;

        public AppServiceBase(IServiceBase<T> appService)
        {
            _serviceBase = appService;
        }

        public void Add(T app)
        {
            _serviceBase.Add(app);
        }

        public void Dispose()
        {
            _serviceBase.Dispose();
        }

        public IEnumerable<T> GetAll()
        {
            return _serviceBase.GetAll();
        }

        public T GetById(int id)
        {
            return _serviceBase.GetById(id);
        }

        public void Remove(T app)
        {
            _serviceBase.Delete(app);
        }

        public void Update(T app)
        {
            _serviceBase.Update(app);
        }
    }
}
