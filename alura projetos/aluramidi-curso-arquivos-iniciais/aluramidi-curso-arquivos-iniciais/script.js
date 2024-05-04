/*Rotina:
acessar o atributo de cada elemento e adicionar uma função para que saia som
*/


//função que acessa os atributos dos elementos da lista e executa uma  função em cima deles
function tocarSom(idElementAudio){
   const elemento = document.querySelector(idElementAudio);
    
   if(elemento === null){
    console.log("Elemento não encontrado")
   }
   if(elemento != null && elemento.localName === "audio"){
     elemento.play();
   }
}

//referência que guarda todos os elementos das teclas em uma lista
    const listaDeTeclas = document.querySelectorAll('.tecla')
//looping para para adicionar a função 'tocarSom' em cada um dos elementos da listaDeTeclas
 for(let contador = 0; contador < listaDeTeclas.length; contador++){
    const tecla = listaDeTeclas[contador]
//referência para acessar a class do elemento[tecla], para poder  usar a função 'tocarSom' nela
    const instrumento = tecla.classList[1]
//referência usada para concatenar a class do tecla com o nome  do instrumento,para criar o id do elemento audio correspondente
    
const nomeDaNota = `#som_${instrumento}`
    tecla.onclick = ()=>tocarSom(nomeDaNota);

    tecla.onkeydown = function(evento){
        if(evento.key == 'space' ||  evento.key == 'Enter'){
        tecla.classList.add('ativa')
    } 
    tecla.onkeyup = ()=> tecla.classList.remove('ativa');
   }
 }
/*function tocarSomPom(){
document.querySelector('#som_tecla_pom').play();
}

//JEITO CERTO:
document.querySelector('.tecla_pom').onclick = tocarSomPom;*/

//JEITO ERRADO:
//document.querySelector('.tecla_pom').onclick = tocarSomPom();
/*
Isso se deve ao fato de que no momento em que o "onclick" é definido, a função atribuída a ele vai ser executada imediatamente devido os parenteses. Por isso que nessas ocasiões, onde se deseja que uma função seja guardada em um atributo "onclick" devemos retirar os parentes da mesma.
*/ 