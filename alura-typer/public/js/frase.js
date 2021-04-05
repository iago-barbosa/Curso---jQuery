$("#botao-frase").click(fraseAleatoria);

function fraseAleatoria() {
    $("#spinner").toggle();
    $.get("http://localhost:3000/frases", trocaFraseAleatoria).fail(
        function() {
            $("#erro").toggle();
            setTimeout(function() {
                $("#erro").toggle();
            }, 1500);
        }
    ).always(function() {
        $("#spinner").toggle();
    });
}

function trocaFraseAleatoria(data) {
    let frase = $(".frase");
    let numAleatorio = Math.floor(Math.random() * data.length);

    frase.text(data[numAleatorio].texto);
    atualizaTamanhoFrase();
    atualizaTempoInicial(data[numAleatorio].tempo);

}