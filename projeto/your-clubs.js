//Função ativada sempre que o botão de lupa é clicado. Nota: descobrir porque o enter está reiniciando a página.

function buscar() {
    let livros = document.getElementById('searchbar_input').value;
    console.clear();
    //Caso não haja nada na barra de pesquisa, a mensagem parece
    if (livros == '') { 
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
                    let livro_autor = e.author_name;
                    console.log(titulo_livro);
                    console.log(livro_autor);
                    
                    //adiciona os cards de resultados a barra de pesquisa
                    let div = document.createElement('div')
                    div.classList.add('club_card')
                    let h3 = document.createElement('h3')
                    h3.classList.add('titulo_club')
                    h3.textContent = titulo_livro
                    h3.setAttribute('onclick', 'adicionar_clube()')
                    let p = document.createElement('p')
                    p.classList.add('autor')
                    p.textContent = livro_autor
                    div.appendChild(h3)
                    div.appendChild(p)
                    document.getElementById('area_resultados').append(div)


                    
                    }) 
            })
            //caso dé erro, exibe a mensagem no console, ainda não descobri como fazer isso funcionar, na verdade
        .catch(error => {
            console.log('Arquivo não encontrado')
            console.log(error.status)
            }
    );
}
 //função respon´savel por exibir a página de resultados
function mostrar_lista_pesquisa() {
    document.getElementById('sem_pesquisa').classList.add('div_oculta')
    document.getElementById('sem_clubes').classList.add('div_oculta')
    document.getElementById('pesquisa_clubs').classList.remove('div_oculta')
}

function adicionar_clube() {
    console.log('pronto para adicionar')
}