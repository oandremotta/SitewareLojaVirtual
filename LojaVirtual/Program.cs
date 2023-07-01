using Loja.Domain.Application;
using Loja.Domain.Application.Interface;
using Loja.Domain.Infra.Contexts;
using Loja.Domain.Infra.Repositories;
using Loja.Domain.Interfaces.Repositories;
using Loja.Domain.Interfaces.Services;
using Loja.Domain.Services;
using LojaVirtual.AutoMapper;
using Microsoft.EntityFrameworkCore;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();
builder.Services.AddDbContext<LojaContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnections")));
builder.Services.AddScoped<IProductRepository, ProdutoRepository>();
builder.Services.AddScoped<IProdutoService, ProdutoService>();
builder.Services.AddScoped<IProdutoAppService, ProdutoAppService>();
builder.Services.AddAutoMapper(typeof(AutoMapperConfig));
var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
