var total = 0;
var items = 0;
var lista = [];

/** New Match object Creator**/
function product(name, price) {
    this.nome = name;
    this.preco = price;
    this.acumulado = 0;
    this.total = 0;
}

function dEntrada() {
    items = items + 1;
    var aux = '#nome' + items.toString();
    var noy = $(aux).val();
    aux = '#preco' + items.toString();
    var precy = $(aux).val();
    aux = '#bu' + items.toString();
    $(aux).hide();
    var newyou = new product(noy, Number(precy));
    lista.push(newyou);
    var newdiv = "<div><input id='nome" + (items + 1).toString() + "' placeholder='Nome'><input id='preco" + (items + 1).toString() + "' placeholder='Preço'></div><button id='bu" + (items + 1).toString() + "' onclick='dEntrada()'>Enter</button>"
    $("#entradas").append(newdiv);
    aux = "#nome" + (items + 1).toString();
    $(aux).focus();
}

function tablet() {
    $('#page1').toggle();
    for (i in lista) {
        var ready = "<ul><div class='item'><div class='name'>" + lista[i].nome + "   (" + lista[i].preco.toFixed(2) + "€)" + "</div><div class='plus' onclick='subir(" + i + ")'>+</div><div class='num' id='num" + i + "'>0</div><div class='minus' onclick='descer(" + i + ")'>-</div></div></ul>"
        $("#rede").append(ready);
    }
    upDateTotal();
}

function subir(i) {
    var aux = '#num' + i.toString();
    var qtd = Number($(aux).text());
    qtd = qtd + 1;
    lista[i].acumulado = qtd;
    $(aux).text(qtd.toString());
    upDateTotal();
}

function descer(i) {
    var aux = '#num' + i.toString();
    var qtd = Number($(aux).text());
    qtd = qtd - 1;
    lista[i].acumulado = qtd;
    $(aux).text(qtd.toString());
    upDateTotal();
}

function upDateTotal() {
    total = 0;
    for (i in lista) {
        total = total + lista[i].preco * lista[i].acumulado;
    }
    var texto = total.toFixed(2) + '€';
    $('#target').text(texto);
}

function neworder() {
    for (i in lista) {
        lista[i].acumulado = 0;
        aux = '#num' + i.toString();
        $(aux).text("0");
    }
    $("#pago").val("");
    $("#resto").text("");
    upDateTotal();
}

function troco() {
    var dado =Number($("#pago").val());
    dinheiro = dado - total;
    aux =dinheiro.toFixed(2)+"€";
    $('#resto').text(aux);
}