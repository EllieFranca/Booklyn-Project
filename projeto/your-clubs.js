//Função ativada sempre que o botão de lupa é clicado. Nota: descobrir porque o enter está reiniciando a página.


function buscar() {
    let livros = document.getElementById('searchbar_input').value;
    console.clear();

    if(livros == ''){ //Caso não haja nada na barra de pesquisa, a mensagem parece, 
            document.getElementById('sem_pesquisa').classList.remove('div_oculta')
            document.getElementById('sem_clubes').classList.add('div_oculta')

    } else {
        mostrar_lista_pesquisa()
    }

    fetch('https://openlibrary.org/search.json?q='+livros) //pesquisa o valor na api
    .then(
        response => {
            return response.json()
        } //transforma os documentos da api pro formato json
    )
    .then( 
        data => {
            data.docs.slice(0,7).forEach((e) =>{
                console.log(e.title)
                console.log(e.author_name)
            }) //pesquisa do json atributos específicos utilizados, com o slice limitando a pesquisa a 5 elementos

        })
        .catch(() => {
            console.log('Arquivo não encontrado')
        }
    );
}

function mostrar_lista_pesquisa() {
    document.getElementById('sem_clubes').classList.add('div_oculta')
    document.getElementById('pesquisa_clubs').classList.remove('div_oculta');
}