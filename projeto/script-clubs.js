
//definição da lista de clubes no local storage
let lista_clubes = []
if (localStorage.getItem('lista_clubes')) {
    lista_clubes = JSON.parse(localStorage.getItem('lista_clubes'))
}

if(localStorage.length > 0) {
    document.getElementById('sem_clubes').classList.add('div_oculta')
    document.getElementById('user_clubs').classList.remove('div_oculta')
    
    let div_fora = document.createElement('div')
    div_fora.classList.add('grupo_clubes')
        
    JSON.parse(localStorage.getItem('lista_clubes')).forEach((e) => {

        let div_clubes = document.createElement('div')
        div_clubes.classList.add('club_card_inicio')

        let h3 = document.createElement('h3')
        h3.textContent = e.nome_clube
        h3.addEventListener('click', function(event){
            
        })
        let p = document.createElement('p')
        p.textContent = e.membros

        div_clubes.appendChild(h3)
        div_clubes.appendChild(p)
        div_fora.appendChild(div_clubes)
    })
    document.getElementById('user_clubs').append(div_fora)


} else {
    document.getElementById('sem_pesquisa').classList.add('div_oculta')
    document.getElementById('sem_clubes').classList.remove('div_oculta')
    document.getElementById('mensagem_erro').classList.add('div_oculta')
    document.getElementById('user_clubs').classList.add('div_oculta')
    document.getElementById('pesquisa_clubs').classList.add('div_oculta');
}

//Função ativada sempre que o botão de lupa é clicado
function buscar() {
    let livros = document.getElementById('searchbar_input').value;
    console.clear();
    //Caso não haja nada na barra de pesquisa, a mensagem parece
    if (livros.trim() == '') { 
        document.getElementById('sem_pesquisa').classList.remove('div_oculta')
        document.getElementById('sem_clubes').classList.add('div_oculta')
        document.getElementById('mensagem_erro').classList.add('div_oculta')
        document.getElementById('user_clubs').classList.add('div_oculta')
        document.getElementById('pesquisa_clubs').classList.add('div_oculta');

    } else {
        mostrar_lista_pesquisa()
    }
//pesquisa o valor na api
    fetch(`https://openlibrary.org/search.json?q=${livros}&lang=pt-br`) 
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
                    let id_livro = e.lending_identifier_s;
                    let id_membros = e.key;

                    
                    // console.log(titulo_livro);
                    // console.log(id_livro)
                    
                    
                    //adiciona os cards de resultados a barra de pesquisa nota: descobrir como tirar resultados anteriores da tela
                    let div = document.createElement('div')
                    div.classList.add('club_card')

                    let h3 = document.createElement('h3')
                    h3.setAttribute('id', id_livro)
                    h3.addEventListener('click', function(event){
                        let nome_clube = document.getElementById(`${id_livro}`).innerText
                        let membros = document.getElementById(`${id_membros}`).innerText
                        let clube = {
                            nome_clube: nome_clube,
                            membros: membros
                        }
                        lista_clubes.push(clube)
                        localStorage.setItem('lista_clubes', JSON.stringify(lista_clubes))
                    })
                    h3.textContent = titulo_livro

                    let p = document.createElement('p')
                    p.setAttribute('id',id_membros)
                    p.textContent = e.edition_count + ' Membros'
                    
                    // console.log(p.textContent)
                    div.appendChild(h3)
                    div.appendChild(p)
                    document.getElementById('area_resultados').append(div)

                    }) 
            })
            //caso dé erro, exibe a mensagem no console,e na página do site
        .catch(error => {
            document.getElementById('sem_pesquisa').classList.add('div_oculta')
            document.getElementById('sem_clubes').classList.add('div_oculta')
            document.getElementById('pesquisa_clubs').classList.add('div_oculta')
            document.getElementById('user_clubs').classList.add('div_oculta')
            document.getElementById('mensagem_erro').classList.remove('div_oculta')

            console.log('Arquivo não encontrado')
            console.log(error.status)
            }
    );
}

//exibir página de resultados
function mostrar_lista_pesquisa() {
    document.getElementById('mensagem_erro').classList.add('div_oculta')
    document.getElementById('sem_pesquisa').classList.add('div_oculta')
    document.getElementById('sem_clubes').classList.add('div_oculta')
    document.getElementById('pesquisa_clubs').classList.remove('div_oculta')
    document.getElementById('user_clubs').classList.add('div_oculta')
}