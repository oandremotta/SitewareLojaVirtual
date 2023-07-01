using AutoMapper;
using Loja.Domain.Application.Interface;
using Loja.Domain.Entities;
using LojaVirtual.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace LojaVirtual.Controllers
{
    public class ProdutoController : Controller
    {
        private readonly IProdutoAppService _produtoAppService;
        private readonly IMapper _mapper;

        public ProdutoController(IProdutoAppService produtoAppService, IMapper mapper)
        {
            _produtoAppService = produtoAppService;
            _mapper = mapper;
        }

        // GET: ProdutoController
        public ActionResult Index(string nome)
        {
            IEnumerable<Produto> produtos;

            if (!string.IsNullOrEmpty(nome))
            {
                produtos = _produtoAppService.BuscarPorNome(nome);
            }
            else
            {
                produtos = _produtoAppService.GetAll();
            }

            var produtoViewModel = _mapper.Map<IEnumerable<ProdutoViewModel>>(produtos);
            return View(produtoViewModel);
        }

        // GET: ProdutoController/Details/5
        public ActionResult Details(int id)
        {
            var produto = _produtoAppService.GetById(id);
            var produtoViewModel = _mapper.Map<ProdutoViewModel>(produto);
            return View(produtoViewModel);
        }

        // GET: ProdutoController/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: ProdutoController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(ProdutoViewModel produtoViewModel)
        {
            if (ModelState.IsValid)
            {
                var produto = _mapper.Map<Produto>(produtoViewModel);
                _produtoAppService.Add(produto);
                return RedirectToAction(nameof(Index));
            }
            return View(produtoViewModel);
        }

        // GET: ProdutoController/Edit/5
        public ActionResult Edit(int id)
        {
            var produto = _produtoAppService.GetById(id);
            var produtoViewModel = _mapper.Map<ProdutoViewModel>(produto);
            return View(produtoViewModel);
        }

        // POST: ProdutoController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, ProdutoViewModel produtoViewModel)
        {
            if (ModelState.IsValid)
            {
                var produto = _mapper.Map<Produto>(produtoViewModel);
                _produtoAppService.Update(produto);
                return RedirectToAction(nameof(Index));
            }
            return View(produtoViewModel);
        }

        // GET: ProdutoController/Delete/5
        public ActionResult Delete(int id)
        {
            var produto = _produtoAppService.GetById(id);
            var produtoViewModel = _mapper.Map<ProdutoViewModel>(produto);
            return View(produtoViewModel);
        }

        // POST: ProdutoController/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            var produto = _produtoAppService.GetById(id);
            if (produto != null)
            {
                _produtoAppService.Remove(produto);
            }
            return RedirectToAction(nameof(Index));
        }
    }
}
