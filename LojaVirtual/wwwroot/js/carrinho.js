var carrinho = [];

$(document).ready(function () {
    // Recuperar carrinho do localStorage
    var carrinhoSalvo = localStorage.getItem('carrinho');
    if (carrinhoSalvo) {
        carrinho = JSON.parse(carrinhoSalvo);
        atualizarModal();
        atualizarTotalCarrinho();
    } else {
        carrinho = [];
    }
});

function adicionarProduto(id, nome, preco, promocao) {
    var quantidade = parseInt($('#quantidade-' + id).val(), 10);
    var produtoExistente = carrinho.find(function (produto) {
        return produto.nome === nome && produto.id === id;
    });

    // Verificar se o produto existe no carrinho
    if (produtoExistente) {
        produtoExistente.quantidade += quantidade;
    } else {
        var produto = { nome: nome, id: id, quantidade: quantidade, preco: Number(preco.replace(',', '.')), promocao: promocao };
        carrinho.push(produto);
    }

    console.log('adicionar produto: ' + promocao + ' (ID: ' + id + ')' + ' Preço: ' + preco);

    aplicarPromocao(produto);

    atualizarModal();
    atualizarTotalCarrinho();

    // Armazenar carrinho no localStorage
    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    showNotification('Produto adicionado ao carrinho!');
}

function aplicarPromocao(produto) {
    switch (produto.promocao) {
        case 'Leve2Pague1':
            if (produto.quantidade >= 2) {
                var quantidadePromocional = Math.floor(produto.quantidade / 2);
                var quantidadeNaoPromocional = produto.quantidade % 2;

                var precoPromocional = produto.preco * quantidadePromocional;
                var precoNaoPromocional = produto.preco * quantidadeNaoPromocional;

                produto.precoTotal = precoPromocional + precoNaoPromocional;
                produto.valorDesconto = produto.preco * quantidadePromocional;
                produto.textoPromocao = '<span class="textoPromocao"><br/> (Promoção: Leve 2, Pague 1)</span>';
            } else {
                produto.precoTotal = produto.quantidade * produto.preco;
                produto.valorDesconto = 0;
                produto.textoPromocao = '';
            }
            break;
        case 'TresPorDez':
            if (produto.quantidade >= 3) {
                var quantidadeGrupos = Math.floor(produto.quantidade / 3);
                var quantidadePromocional = quantidadeGrupos * 3;
                var quantidadeNaoPromocional = produto.quantidade % 3;

                var precoPromocional = 10 * quantidadeGrupos;
                var precoNaoPromocional = produto.preco * quantidadeNaoPromocional;

                produto.precoTotal = precoPromocional + precoNaoPromocional;
                produto.valorDesconto = produto.preco * quantidadeGrupos;
                produto.textoPromocao = '<span class="textoPromocao"><br/>  (Promoção: 3 por R$10)</span>';
            } else {
                produto.precoTotal = produto.quantidade * produto.preco;
                produto.valorDesconto = 0;
                produto.textoPromocao = '';
            }
            break;
        default:
            break;
    }
}

function atualizarTotalCarrinho() {
    var total = 0;
    var totalDesconto = 0;

    carrinho.forEach(function (produto) {
        total += produto.precoTotal || produto.quantidade * produto.preco;
        totalDesconto += produto.valorDesconto || 0;
    });

    var cartTotalDiv = $('#cartTotal');
    if (cartTotalDiv.length) {
        cartTotalDiv.html('Desconto total: ' + formatCurrencyValue(totalDesconto) + '<br/>Total: ' + formatCurrencyValue(total));
    }
}

function removerProduto(id) {
    carrinho = carrinho.filter(function (produto) {
        return produto.id !== id;
    });

    atualizarModal();
    atualizarTotalCarrinho();

    // Armazenar carrinho no localStorage
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

function diminuirQuantidade(id) {
    var produto = carrinho.find(function (produto) {
        return produto.id === id;
    });

    if (produto) {
        produto.quantidade--;

        if (produto.quantidade === 0) {
            removerProduto(id);
        } else {
            aplicarPromocao(produto);
            atualizarModal();
            atualizarTotalCarrinho();

            // Armazenar carrinho no localStorage
            localStorage.setItem('carrinho', JSON.stringify(carrinho));
        }
    }
}

function aumentarQuantidade(id) {
    var produto = carrinho.find(function (produto) {
        return produto.id === id;
    });

    if (produto) {
        produto.quantidade++;
        aplicarPromocao(produto);
        atualizarModal();
        atualizarTotalCarrinho();

        // Armazenar carrinho no localStorage
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
    }
}

function formatCurrencyValue(value) {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function atualizarModal() {
    var cartItemsDiv = $('#cartItems');
    var cartEmptyMessage = $('#cartEmptyMessage');
    var limparCarrinhoBtn = $('#limparCarrinho');
    var finalizarCompraBtn = $('#finalizarCompra');
    var cartTotalDiv = $('#cartTotal');

    if (cartItemsDiv.length && cartEmptyMessage.length && cartTotalDiv.length) {
        if (carrinho.length > 0) {
            cartItemsDiv.empty();

            var total = 0;

            carrinho.forEach(function (produto) {
                var itemDiv = $('<div></div>');
                itemDiv.attr('data-id', produto.id);

                var valorProduto = produto.textoPromocao ? formatCurrencyValue(produto.precoTotal) + produto.textoPromocao : formatCurrencyValue(produto.preco * produto.quantidade);
                itemDiv.html(produto.nome + ' <small>(un: ' + formatCurrencyValue(produto.preco) + ')</small> - Valor: ' + valorProduto);

                var quantidadeDiv = $('<div></div>');
                quantidadeDiv.addClass('quantity');
                var decreaseBtn = $('<button>-</button>');
                var increaseBtn = $('<button>+</button>');
                var quantidadeSpan = $('<span></span>');
                quantidadeSpan.text(produto.quantidade);

                decreaseBtn.addClass('btn btn-sm btn-secondary');
                increaseBtn.addClass('btn btn-sm btn-secondary ms-1');
                quantidadeSpan.addClass('ms-1');

                decreaseBtn.on('click', function () {
                    diminuirQuantidade(produto.id);
                });

                increaseBtn.on('click', function () {
                    aumentarQuantidade(produto.id);
                });

                quantidadeDiv.append(decreaseBtn);
                quantidadeDiv.append(quantidadeSpan);
                quantidadeDiv.append(increaseBtn);

                itemDiv.append(quantidadeDiv);

                var descontoSpan = $('<span></span>');
                descontoSpan.addClass('ms-1 text-danger');
                itemDiv.append(descontoSpan);

                cartItemsDiv.append(itemDiv);

                total += produto.precoTotal || produto.quantidade * produto.preco;
            });

            limparCarrinhoBtn.css('display', 'block');
            finalizarCompraBtn.css('display', 'block');
            cartTotalDiv.css('display', 'block');
            cartTotalDiv.html('Total: ' + formatCurrencyValue(total));

            cartItemsDiv.css('display', 'block');
            cartEmptyMessage.css('display', 'none');
        } else {
            limparCarrinhoBtn.css('display', 'none');
            finalizarCompraBtn.css('display', 'none');
            cartTotalDiv.css('display', 'none');
            cartItemsDiv.css('display', 'none');
            cartEmptyMessage.css('display', 'block');
        }
    }
}

function limparCarrinho() {
    carrinho = [];
    atualizarModal();

    // Armazenar carrinho vazio no localStorage
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    console.log("Limpando carrinho");
}

function finalizarCompra() {
    limparCarrinho();
    $('#cartModal').modal('hide');
    showNotification("Pedido efetuado com sucesso.");

    // Remover carrinho do localStorage após a finalização da compra
    localStorage.removeItem('carrinho');
}

function showNotification(message) {
    var notificationDiv = $('#notification');
    notificationDiv.text(message);
    notificationDiv.show();

    setTimeout(function () {
        notificationDiv.hide();
    }, 5000);
}

$(document).ready(function () {
    // Carregar carrinho do localStorage ao carregar a página
    var carrinhoStorage = localStorage.getItem('carrinho');
    if (carrinhoStorage) {
        carrinho = JSON.parse(carrinhoStorage);
        atualizarModal();
        atualizarTotalCarrinho();
    }
});
