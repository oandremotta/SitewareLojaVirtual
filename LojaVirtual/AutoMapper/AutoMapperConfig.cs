using AutoMapper;
using Loja.Domain.Entities;
using LojaVirtual.ViewModels;

namespace LojaVirtual.AutoMapper
{
    public class AutoMapperConfig : Profile
    {   
        public AutoMapperConfig() {
            CreateMap<ProdutoViewModel, Produto>().ReverseMap();
        }
    }
}
