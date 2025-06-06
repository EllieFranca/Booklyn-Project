
//definição da lista de clubes no local storage
let lista_clubes = []
localStorage.setItem('lista_clubes', JSON.stringify(lista_clubes));
if (localStorage.getItem('lista_clubes')) {
    lista_clubes = JSON.parse(localStorage.get.getItem('lista_clubes'))
}

//Função ativada sempre que o botão de lupa é clicado
function buscar() {
    let livros = document.getElementById('searchbar_input').value;
    console.clear();
    //Caso não haja nada na barra de pesquisa, a mensagem parece
    if (livros.trim() == '') { 
        document.getElementById('sem_pesquisa').classList.remove('div_oculta')
        document.getElementById('sem_clubes').classList.add('div_oculta')
        document.getElementById('pesquisa_clubs').classList.add('div_oculta');

    } else {
        mostrar_lista_pesquisa()
    }
//pesquisa o valor na api
    fetch('https://openlibrary.org/search.json?q=' + livros) 
//transforma os documentos da api pro formato json
        .then(
            response => {
                return response.json()
            } 
        )
        .then(
            //pesquisa do json atributos específicos utilizados, com o slice limitando a pesquisa a 5 elementos
            
            data => {
                data.docs.slice(0, 5).forEach((e) => {
                    //transforma os valores pesquisados em variáveis. consertar o erro que só faz mostrar um resultado
                    let titulo_livro = e.title;
                    console.log(titulo_livro);

                    
                    //adiciona os cards de resultados a barra de pesquisa nota: descobrir como tirar resultados anteriores da tela
                    let div = document.createElement('div')
                    div.classList.add('club_card')
                    let h3 = document.createElement('h3')
                    h3.classList.add('club_nome')
                    h3.textContent = titulo_livro
                    h3.setAttribute('onclick', 'adicionar_clube()')
                    div.appendChild(h3)
                    document.getElementById('area_resultados').append(div)


                    }) 
            })
            //caso dé erro, exibe a mensagem no console,e na página do site
        .catch(error => {
            document.getElementById('sem_pesquisa').classList.add('div_oculta')
            document.getElementById('sem_clubes').classList.add('div_oculta')
            document.getElementById('pesquisa_clubs').classList.add('div_oculta')
            document.getElementById('mensagem_erro').classList.remove('div_oculta')

            console.log('Arquivo não encontrado')
            console.log(error.status)
            }
    );
}
 //função responsavel por exibir a página de resultados
function mostrar_lista_pesquisa() {
    document.getElementById('mensagem_erro').classList.add('div_oculta')
    document.getElementById('sem_pesquisa').classList.add('div_oculta')
    document.getElementById('sem_clubes').classList.add('div_oculta')
    document.getElementById('pesquisa_clubs').classList.remove('div_oculta')
}

function adicionar_clube() {
    let club_nome = document.querySelector('.club_nome')
    let clube = {
        nome: club_nome.value,
    }

    lista_clubes.push(clube)

    localStorage.setItem('lista_clubes', JSON.stringify(lista_clubes))

    console.log(lista_clubes)
}