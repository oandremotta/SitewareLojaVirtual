var carrinho = [];

$(document).ready(function () {
    atualizarModal();
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
                produto.valorDesconto = produto.preco * quantidadePromocional; // Alterado para calcular corretamente o valor do desconto
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
                produto.valorDesconto = produto.preco * quantidadeGrupos; // Alterado para calcular corretamente o valor do desconto
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
    var totalDesconto = 0; // Variável para armazenar o valor total do desconto

    carrinho.forEach(function (produto) {
        total += produto.precoTotal || produto.quantidade * produto.preco;
        totalDesconto += produto.valorDesconto || 0; // Somar o valor do desconto
    });

    var cartTotalDiv = $('#cartTotal');
    if (cartTotalDiv.length) {
        cartTotalDiv.html('Desconto total: ' + formatCurrencyValue(totalDesconto) + '<br/>Total: ' + formatCurrencyValue(total)); // Exibir o valor total do desconto
    }
}

function removerProduto(id) {
    carrinho = carrinho.filter(function (produto) {
        return produto.id !== id;
    });

    atualizarModal();
    atualizarTotalCarrinho();
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
                itemDiv.attr('data-id', produto.id); // Adicione o atributo data-id com o ID do produto

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

                var descontoSpan = $('<span></span>'); // Elemento para exibir o valor do desconto
                descontoSpan.addClass('ms-1 text-danger'); // Classe para estilizar o elemento de desconto
                itemDiv.append(descontoSpan); // Adicione o elemento de desconto ao item do carrinho

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
    console.log("Limpando carrinho");
}

function finalizarCompra() {
    limparCarrinho();
    $('#cartModal').modal('hide');
    showNotification("Pedido efetuado com sucesso.");
}

function showNotification(message) {
    var notificationDiv = $('#notification');
    notificationDiv.text(message);
    notificationDiv.show();

    // Esconder a notificação após alguns segundos (opcional)
    setTimeout(function () {
        notificationDiv.hide();
    }, 5000); // Esconder a notificação após 3 segundos (3000 milissegundos)
}
