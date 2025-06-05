//Função ativada sempre que o botão de lupa é clicado. Nota: descobrir porque o enter está reiniciando a página.


function buscar() {
    let livros = document.getElementById('searchbar_input').value;
    console.clear();

    if (livros == '') { //Caso não haja nada na barra de pesquisa, a mensagem parece
        document.getElementById('sem_pesquisa').classList.remove('div_oculta')
        document.getElementById('sem_clubes').classList.add('div_oculta')
        document.getElementById('pesquisa_clubs').classList.add('div_oculta');

    } else {
        mostrar_lista_pesquisa()
    }

    fetch('https://openlibrary.org/search.json?q=' + livros) //pesquisa o valor na api
        .then(
            response => {
                return response.json()
            } //transforma os documentos da api pro formato json
        )
        .then(
            data => {
                data.docs.slice(0, 7).forEach((e) => {
                    console.log(e.title)
                    console.log(e.author_name)
                    criar_club_card()

                }) //pesquisa do json atributos específicos utilizados, com o slice limitando a pesquisa a 5 elementos
                document.querySelector('.title').innerHTML = data.title
                document.querySelector('.authot_name').innerHTML = data.author_name


            })
        .catch(error => {
            console.log('Arquivo não encontrado')
            console.log(error.status)
        }
        );
}

function mostrar_lista_pesquisa() {
    document.getElementById('sem_pesquisa').classList.add('div_oculta')
    document.getElementById('sem_clubes').classList.add('div_oculta')
    document.getElementById('pesquisa_clubs').classList.remove('div_oculta')
}

function criar_club_card() {
    let div = document.createElement('div')
    div.className = 'club_card'
    div.id = 'livro_pesquisado'
    div.append(h3)
    div.append(p)
    let h3 = document.createElement('h3')
    h3.id = 'titulo_livro'
    h3.innerHTML = title
    let p = document.createElement('p')
    p.id = 'autor_livro'
    p.innerHTML = author_name
    document.body.main.getElementById('pesquisa-clubs').getElementById('area_resultados').append()
}