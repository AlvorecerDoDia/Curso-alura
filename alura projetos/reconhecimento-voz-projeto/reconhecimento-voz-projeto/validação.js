let Tentativas = 11;
const elementoTentativas = document.querySelector('#tentativas')
const qtTentativas = document.querySelector('.quantidadeTentativas')
function possuiUmValorValido(chute) {
    const numero = +chute
    if (chuteForInvalido(numero)) {
        elementoChute.innerHTML = "<div id='chuteErrado'> <strong> Valor invalido </strong> </div>"
        return
    }

    if (numeroForMaiorOuMenorQueOValorPermitido(numero)) {
        elementoChute.innerHTML = `<div id='chuteErrado'> <strong> Valor invalido:</strong> </div> O numero precisa estar entre ${menorValor} e ${maiorValor}`
        return
    } else if (numero === numeroSecreto) {
        document.body.innerHTML = `<h2>Parabéns! Você acertou o número secreto</h2><br> <h3>O número secreto era:  ${numeroSecreto}</h3><br> 
        <button id="recomecar">Recomeçar</button>
        `
    } else if (numero > numeroSecreto) {
        elementoChute.innerHTML = `<div>Você disse: </div>
        <span id="box">${chute}</span><br>
        <div>O número secreto é menor <span class="material-symbols-outlined">
            arrow_downward
            </span></div>`
        diminuirTentativas()
    } else {
        elementoChute.innerHTML = `<div>Você disse: </div>
        <span id="box">${chute}</span><br>
        <div>O número secreto é maior <span class="material-symbols-outlined">
            arrow_upward
            </span></div>`
        diminuirTentativas()
    }


}

function chuteForInvalido(numero) {
    return Number.isNaN(numero)
}

function numeroForMaiorOuMenorQueOValorPermitido(numero) {
    return numero > maiorValor || numero < menorValor
}

document.body.addEventListener('click', e => {
    if (e.target.id === 'recomecar') {
        window.location.reload()
    }
})

function diminuirTentativas() {
    Tentativas--
    if (qtTentativas.style.display = "none") {
        qtTentativas.style.display = "block"
    }
    if (Tentativas == 5) {
        elementoTentativas.style.color = "red";
    } else if (Tentativas == 0) {
        document.body.innerHTML = `<<h1>GAME OVER!</h1><br><h3>O número secreto era:  ${numeroSecreto}</h3><br> 
        <button id="recomecar">Recomeçar</button>`
    }
    return elementoTentativas.innerHTML = Tentativas
}