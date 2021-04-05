$("#botao-placar").click(mostraPlacar);
$("#botao-frase-id").click(buscaFrase);
$("#botao-sync").click(sincronizaPlacar);

function inserePlacar() {
    var corpoTabela = $(".placar").find("tbody");
    var usuario = "Douglas"
    var numPalavras = $("#contador-palavras").text();

    var linha = novaLinha(usuario, numPalavras);
    linha.find(".botao-remover").click(removeLinha);

    corpoTabela.append(linha);
    $(".placar").slideDown(500);
    scrollPlacar();
}

function scrollPlacar() {
    let positionPlacar = $(".placar").offset().top;
    $("body").animate({
        scrollTop: positionPlacar+"px"
    }, 1000);
}

function novaLinha(usuario, palavras) {
    var linha = $("<tr>");
    var colunaUsuario = $("<td>").text(usuario);
    var colunaPalavras = $("<td>").text(palavras);
    var colunaRemover = $("<td>");

    var link = $("<a>").addClass("botao-remover").attr("href", "#");
    var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

    link.append(icone);

    colunaRemover.append(link);

    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);

    return linha;
}

function removeLinha() {
    event.preventDefault();
    let linha = $(this).parent().parent();
    linha.fadeOut(800);
    setTimeout(function() {
        linha.remove();
    }, 800);
}

function mostraPlacar () {
    $(".placar").stop().slideToggle(800);
}

function buscaFrase() {
    $("#spinner").toggle();
    let fraseId = $("#frase-id").val();
    let dados = {id : fraseId}; 

    $.get("http://localhost:3000/frases", dados, trocaFrase)
    .fail(function(){
        $("#erro").toggle();
        setTimeout(function(){
            $("#erro").toggle();
    },2000);
    })
    .always(function(){
        $("#spinner").toggle();
    });
}

function trocaFrase(data) {

    console.log(data);

    let frase = $(".frase");
    frase.text(data.texto);
    atualizaTamanhoFrase();
    atualizaTempoInicial(data.tempo);
}

function sincronizaPlacar(){
    let placar = [];
    let linhas = $("tbody>tr");

    linhas.each(function(){
        let usuario = $(this).find("td:nth-child(1)").text();
        let palavras = $(this).find("td:nth-child(2)").text();

        let score = {
            usuario: usuario,
            pontos: palavras            
        };

        placar.push(score); 
    });
    let dados = {
        placar: placar
    };

    $.post("http://localhost:3000/placar", dados, function(){
        console.log("Placar sincronizado com sucesso");
    });
}

function atualizaPlacar(){
    $.get("http://localhost:3000/placar",function(data){
        $(data).each(function(){
            let linha = novaLinha(this.usuario, this.pontos);

            linha.find(".botao-remover").click(removeLinha);

            $("tbody").append(linha);
        });
    });
}