using AutoMapper;
using Loja.Domain.Application.Interface;
using LojaVirtual.Models;
using LojaVirtual.ViewModels;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace LojaVirtual.Controllers
{
    public class HomeController : Controller
    {

        private readonly IProdutoAppService _produtoAppService;
        private readonly IMapper _mapper;

        public HomeController(IProdutoAppService produtoAppService, IMapper mapper)
        {
            _produtoAppService = produtoAppService;
            _mapper = mapper;
        }

        public IActionResult Index()
        {
            var produtos = _produtoAppService.GetAll();
            var produtosViewModel = _mapper.Map<List<ProdutoViewModel>>(produtos);
            return View(produtosViewModel);
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}