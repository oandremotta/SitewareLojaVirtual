# Loja Virtual

O projeto é um sistema de cadastro de produtos e carrinho de compras desenvolvido usando a arquitetura DDD (Domain-Driven Design) com o padrão MVC (Model-View-Controller). Ele permite aos usuários visualizar uma lista de produtos disponíveis, adicionar produtos ao carrinho de compras, atualizar a quantidade de produtos no carrinho e finalizar a compra.

## Funcionalidades
- Visualização da lista de produtos disponíveis
- Adição de produtos ao carrinho de compras
- Atualização da quantidade de produtos no carrinho
- Finalização da compra


## Tecnologias Utilizadas

- .NET 6.0
- ASP.NET Core MVC
- Entity Framework Core
- Banco de dados SQL Server

## Installation

Siga as etapas abaixo para configurar o projeto em sua máquina local:

```bash
git clone https://github.com/seu-usuario/nome-do-repositorio.git
```
```bash
cd ProductsSiteware
```
Execute o comando dotnet restore para restaurar as dependências do projeto.

Configurando o banco de dados:

Certifique-se de ter uma instância do SQL Server em execução.
Abra o arquivo appsettings.json na camada de infraestrutura e atualize a string de conexão com os detalhes do seu banco de dados.
Execute as migrações do Entity Framework para criar as tabelas do banco de dados:

(obs. dentro da camada de infraestrutura execute o seguinte comando)
```bash
dotnet update-database
```

Execute o projeto

## Imagens do Projeto
![image](https://github.com/oandremotta/SitewareLojaVirtual/assets/40709857/c7d5faaf-3e87-4e23-bed8-1ab2b3c5fb50)
![image](https://github.com/oandremotta/SitewareLojaVirtual/assets/40709857/0452d25d-2715-4835-a77f-f31d3ab816a1)
![image](https://github.com/oandremotta/SitewareLojaVirtual/assets/40709857/f6741b37-056c-4f13-9b57-106a1549ead9)
![image](https://github.com/oandremotta/SitewareLojaVirtual/assets/40709857/0e844855-998d-4ae7-afdb-3b9edb33522b)



## License

[MIT](https://choosealicense.com/licenses/mit/)
