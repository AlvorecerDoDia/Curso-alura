const elementoChute = document.querySelector('#chute')

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.lang = 'pt-Br'
recognition.start()

recognition.addEventListener('result', onSpeak)
function onSpeak(e) {
  const chute = e.results[0][0].transcript
  exibirChuteNaTela(chute)
 possuiUmValorValido(chute)
}

function exibirChuteNaTela(chute) {
  elementoChute.innerHTML = `
  <div>Você disse: </div>
        <span id="box">${chute}</span><br>
  `
}

recognition.addEventListener('end', ()=> recognition.start())
