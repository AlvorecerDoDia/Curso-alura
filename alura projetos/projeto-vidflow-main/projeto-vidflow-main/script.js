const containerVideos = document.querySelector('.videos__container')
const barraDePesquisa = document.querySelector('.pesquisar__input')
const botaoCategoria = document.querySelectorAll('.superior__item')

async function buscarEMostrarVideos() {
    try {
        const busca = await fetch("http://localhost:3000/videos");
        const videos = await busca.json()
        videos.forEach(videos => {
            containerVideos.innerHTML += `
        <li class="videos__item">
        <iframe src="${videos.url}" title="${videos.titulo}" frameborder="0" allowfullscreen></iframe>
            <div class="descricao-video">
            <img class="img-canal" src="${videos.imagem}" alt="Logo alura"></img>
            <h3 class="titulo-video">${videos.titulo}</h3>
            <p class="titulo-canal">${videos.descricao}</p>
            <p class="categoria" hidden> ${videos.categoria}</P>
            </div>
        </li>    
        `
        });
    } catch (error) {
        console.log(`Houve um erro ao carregar os videos: ${error}`)
    }
}
buscarEMostrarVideos()

barraDePesquisa.addEventListener("input", filtrarPesquisa);

function filtrarPesquisa() {
    const videos = document.querySelectorAll('.videos__item');

    if (barraDePesquisa.value != "") {
        for (let video of videos) {
            let valorFiltro = barraDePesquisa.value.toLowerCase();
            let titulo = video.querySelector(".titulo-video").textContent.toLowerCase();

            if (!titulo.includes(valorFiltro)) {
                video.style.display = "none";
            } else {
                video.style.display = "block";
            }
        }
    } else {
        video.style.display = "block";
    }
}

botaoCategoria.forEach(botao => {
    let nomeCategoria = botao.getAttribute("name");
    botao.addEventListener('click', ()=> filtrarPorCategoria(nomeCategoria))
})


function filtrarPorCategoria(filtro){
    const videos = document.querySelectorAll('.videos__item');
    for(let video of videos){
        let categoria = document.querySelectorAll('.categoria').textContent.toLowerCase()
        let valorFiltro = filtro.toLowerCase()
        if(!categoria.includes(valorFiltro) && valorFiltro != "tudo"){
            video.style.diplay = "none";
        }else{
            video.style.display = "block";
        }
    }
}
