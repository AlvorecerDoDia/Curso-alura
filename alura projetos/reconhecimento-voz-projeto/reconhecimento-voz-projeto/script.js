const menorValor = 0;
const maiorValor = 1000;
const numeroSecreto = gerarNumAleatorio()
const elementoMenorValor = document.getElementById('menor-valor').innerText = menorValor
const elementoMaiorValor = document.getElementById('maior-valor').innerText = maiorValor
const btRecomecar = document.querySelector('#recomecar')

function gerarNumAleatorio() {
    return parseInt(Math.random() * (maiorValor + 1))
}
 
console.log(numeroSecreto)


