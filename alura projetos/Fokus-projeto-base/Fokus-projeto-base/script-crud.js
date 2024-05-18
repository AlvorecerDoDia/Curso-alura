// encontrar o botão adicionar tarefa

const btnAdicionarTarefa = document.querySelector('.app__button--add-task')
const btnCancelarTarefa = document.querySelector('.app__form-footer__button--cancel')
const formAdicionarTarefa = document.querySelector('.app__form-add-task')
const textarea = document.querySelector('.app__form-textarea')
const ulTarefas = document.querySelector('.app__section-task-list')
const paragrafoDescriçãoTarefa = document.querySelector('.app__section-active-task-description')
const btnRemoverConcluidas = document.querySelector('#btn-remover-concluidas')
const btnRemoverTodas = document.querySelector('#btn-remover-todas')


let tarefas = JSON.parse(localStorage.getItem('tarefas')) || []
let tarefaSelecionada = null;
let liTarefaSelecionada = null;

//função responsável em adicionar as tarefas no locaStorage e mudar o formato para String
function atualizarTarefas() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
}

//função responsável em criar os elementos de uma lista adicionar as informações providas do local storage
function criarElementoTarefa(tarefa) {
    const li = document.createElement('li')
    li.classList.add('app__section-task-list-item')

    const svg = document.createElement('svg')
    svg.innerHTML = `
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>
    `
    const p = document.createElement('p')
    p.classList.add('app__section-task-list-item-description')
    p.textContent = tarefa.descricao

    const botao = document.createElement('button')
    botao.classList.add('app_button-edit')
    const imgBotao = document.createElement('img')
    imgBotao.setAttribute('src', '/imagens/edit.png')

//função ativada pelo botão que é responsável em alterar o texto da tarefa já criada
    botao.onclick = () => {
        const novaDescricao = prompt("Qual é a nova descrição?")
        if (novaDescricao) {
            p.textContent = novaDescricao
            tarefa.descricao = novaDescricao
            atualizarTarefas()
        } else {
            return alert("---NOVA DESCRIÇÃO INVÁLIDA---")
        }
    }

    botao.append(imgBotao)
    li.append(svg)
    li.append(p)
    li.append(botao)

//condicional que verifica se a tarefa selecionada já foi completa e faz as mudanças visuais
    if (tarefa.completa) {
        li.classList.add('app__section-task-list-item-complete')
        botao.setAttribute('disabled', 'disabled')
    } else {
        li.onclick = () => {
            document.querySelectorAll('.app__section-task-list-item-active')
                .forEach(elemento => {
                    elemento.classList.remove('app__section-task-list-item-active')
                })

//condicional que verifica se uma tarefa foi clicada duas vezes, assim tirando a seleção da tarefa 
            if (tarefaSelecionada === tarefa) {
                paragrafoDescriçãoTarefa.textContent = ''
                tarefaSelecionada = null
                liTarefaSelecionada = null
                return
            }
            tarefaSelecionada = tarefa
            liTarefaSelecionada = li
            paragrafoDescriçãoTarefa.textContent = tarefa.descricao
            li.classList.add('app__section-task-list-item-active')
        }
    }

    return li
}


btnAdicionarTarefa.addEventListener('click', () => {
    formAdicionarTarefa.classList.remove('hidden')
})

btnCancelarTarefa.addEventListener('click', () => {
    formAdicionarTarefa.classList.add('hidden')
    textarea.value = ''
})

//evento escutador responsável em transformar o texto do textArea em um objeto, e mandar ele para um array que vai ser armazenada no localStorage
formAdicionarTarefa.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const tarefa = {
        descricao: textarea.value, 
        completa: false
    }
    tarefas.push(tarefa)
    const elementoTarefa = criarElementoTarefa(tarefa)
    ulTarefas.append(elementoTarefa)
    atualizarTarefas()
    textarea.value = ''
    formAdicionarTarefa.classList.add('hidden')
})

//metodo que vai transformar todos os objetos da array em elementos da lista
tarefas.forEach(tarefa => {
    const elementoTarefa = criarElementoTarefa(tarefa)
    ulTarefas.append(elementoTarefa)
})

//evento escutador que que chama a função customizada e modifica os valores da tarefa e o estilo da lista da tarefa
document.addEventListener('focoFinalizado', () => {
    if (tarefaSelecionada && liTarefaSelecionada) {

        liTarefaSelecionada.classList.remove('app__section-task-list-item-active')
        liTarefaSelecionada.classList.add('app__section-task-list-item-complete')
        liTarefaSelecionada.querySelector('button').setAttribute('disabled', 'disabled')
        tarefaSelecionada.completa = true;
        atualizarTarefas()
    }
}
)

btnRemoverConcluidas.addEventListener('click', ()=>{
    const seletor = '.app__section-task-list-item-complete'
    document.querySelectorAll(seletor).forEach(tarefa =>{
        tarefa.remove(seletor)
    })
    tarefas = tarefas.filter(tarefa => !tarefa.completa)    
    atualizarTarefas()
})

btnRemoverTodas.addEventListener('click', ()=>{
    
    const seletorTodas = '.app__section-task-list-item'
    document.querySelectorAll(seletorTodas).forEach(tarefa =>
        tarefa.remove(seletorTodas)
    )
    tarefas = []
    atualizarTarefas()
})