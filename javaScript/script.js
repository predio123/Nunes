var total = 0;
var items = 0;
var lista = [];
var vendas = 0;
var nega = true;
var state = 0;

/** New Match object Creator**/
function product(name, price) {
    this.nome = name;
    this.preco = price;
    this.acumulado = 0;
    this.total = 0;
    this.stock = 0;
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
    for (i = 1; i < items; i++) {
        aux = '#nome' + (i).toString();
        noy = $(aux).val();
        lista[i - 1].nome = noy;
        aux = '#preco' + (i).toString();
        precy = $(aux).val();
        lista[i - 1].preco = Number(precy);
    }
    var newdiv = "<div><input id='nome" + (items + 1).toString() + "' placeholder='Nome'><input id='preco" + (items + 1).toString() + "' placeholder='Preço'></div><button id='bu" + (items + 1).toString() + "' onclick='dEntrada()'>Enter</button>"
    $("#entradas").append(newdiv);
    aux = "#nome" + (items + 1).toString();
    $(aux).focus();
}

function tablet() {
    for (i = 1; i < (items + 1); i++) {
        aux = '#nome' + (i).toString();
        noy = $(aux).val();
        lista[i - 1].nome = noy;
        aux = '#preco' + (i).toString();
        precy = $(aux).val();
        lista[i - 1].preco = Number(precy);
    }
    // See if more items have been added
    aux = '#nome' + (items + 1).toString();
    noy = $(aux).val();
    if (noy.length > 0) {
        items = items + 1;
        var aux = '#nome' + items.toString();
        var noy = $(aux).val();
        aux = '#preco' + items.toString();
        var precy = $(aux).val();
        var newyou = new product(noy, Number(precy));
        lista.push(newyou);
    }

    for (i in lista) {
        var ready = "<ul class='ass'><div class='item'><div class='name'>" + lista[i].nome + "   (" + lista[i].preco.toFixed(2) + "€)" + "</div><div class='plus' onclick='subir(" + i + ")'>+</div><div class='num' id='num" + i + "'>0</div><div class='minus' onclick='descer(" + i + ")'>-</div></div></ul>"
        $("#rede").append(ready);
        ready = "<div id='produ" + i.toString() + "' class='y'></div>";
        $("#resultsp").append(ready);
    }
    $('#page1').toggle();
    $('#page3').hide();
    state = 0;
    upDateTotal();
}

function phone() {
    for (i = 1; i < (items + 1); i++) {
        aux = '#nome' + (i).toString();
        noy = $(aux).val();
        lista[i - 1].nome = noy;
        aux = '#preco' + (i).toString();
        precy = $(aux).val();
        lista[i - 1].preco = Number(precy);
    }
    // See if more items have been added
    aux = '#nome' + (items + 1).toString();
    noy = $(aux).val();
    if (noy.length > 0) {
        items = items + 1;
        var aux = '#nome' + items.toString();
        var noy = $(aux).val();
        aux = '#preco' + items.toString();
        var precy = $(aux).val();
        var newyou = new product(noy, Number(precy));
        lista.push(newyou);
    }

    for (i in lista) {
        var ready = "<ul class='tits' onclick='subir(" + i + ")'><div class='item1'><div class='name1'>" + lista[i].nome + "</div><div class='num1' id='num" + i + "'>0</div><div class='minus1' onclick='descer(" + i + "); event.stopPropagation(); '>-</div></div></ul>";
        $("#rede1").append(ready);
            ready = "<div id='produ" + i.toString() + "' class='t'></div>";
            $("#resultsp1").append(ready);
    }
    $('#page1').toggle();
    $('#page2').hide();
    state = 1;
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
    if (nega == false) {
        if (qtd < 0) {
            qtd = 0;
        }
    }
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
    if (state == 0) {
        $('#target').text(texto);
    } else {
        $('#target1').text(texto);
    }
}

function neworder() {
    if (state == 0) {
        for (i in lista) {
            lista[i].total = lista[i].total + lista[i].acumulado;
            vendas = vendas + lista[i].acumulado * lista[i].preco;
            lista[i].acumulado = 0;
            aux = '#num' + i.toString();
            $(aux).text("0");
        }
        $("#pago").val("");
        $("#resto").text("");
        upDateTotal();
        console.log(vendas);
    } else {
        for (i in lista) {
            lista[i].total = lista[i].total + lista[i].acumulado;
            vendas = vendas + lista[i].acumulado * lista[i].preco;
            lista[i].acumulado = 0;
            aux = '#num' + i.toString();
            $(aux).text("0");
        }
        upDateTotal();
        console.log(vendas);
    }
}

function cancel() {
    for (i in lista) {
        lista[i].acumulado = 0;
        aux = '#num' + i.toString();
        $(aux).text("0");  
    }
    upDateTotal();
        console.log('Compra Cancelada...');
}

function troco() {
    var dado = Number($("#pago").val());
    dinheiro = dado - total;
    aux = dinheiro.toFixed(2) + "€";
    $('#resto').text(aux);
}

function resultados() {
    if (state == 0) {
        var text = "Vendas: " + vendas.toFixed(2) + "€";
        $("#ppreco").text(text);
        for (i in lista) {
            text = lista[i].nome + ": " + lista[i].total + " items.";
            aux = "#produ" + i.toString();
            $(aux).text(text);
        }
        $("#resultsp").show();
        $("#left-menu").hide();
    } else {
        var text = "Vendas: " + vendas.toFixed(2) + "€";
        $("#ppreco1").text(text);
        for (i in lista) {
            text = lista[i].nome + ": " + lista[i].total + " items.";
            aux = "#produ" + i.toString();
            $(aux).text(text);
        }
        $("#resultsp1").show();
        $("#left-menu1").hide();
    }

}

function colorup() {
    if (nega == true) {
        $("#rail").css({
            backgroundColor: 'green'
        });
        $("#rail1").css({
            backgroundColor: 'green'
        });
    } else {
        $("#rail").css({
            backgroundColor: 'red'
        });
        $("#rail1").css({
            backgroundColor: 'red'
        });
    }
}

function nas() {
    if (nega == false) {
        nega = true;
        $("#rail").css({
            backgroundColor: 'green'
        });
        $("#rail1").css({
            backgroundColor: 'green'
        });
    } else {
        nega = false;
        $("#rail").css({
            backgroundColor: 'red'
        });
        $("#rail1").css({
            backgroundColor: 'red'
        });
    }
}
function evento() {
    if (state == 0) {
        var agreg = Number($("#event").val());
        vendas = vendas + agreg;
        agreg = 0;
        $("#event").val(agreg);
    } else {
        var agreg = Number($("#event1").val());
        vendas = vendas + agreg;
        agreg = 0;
        $("#event1").val(agreg);
    }
}