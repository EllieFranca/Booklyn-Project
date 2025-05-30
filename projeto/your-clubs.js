//Função ativada sempre que o botão de lupa é clicado. Nota: descobrir porque o enter está reiniciando a página.


function buscar() {
    let livros = document.getElementById('searchbar_input').value; //tira o valor escrito no index

    fetch('https://openlibrary.org/search.json?q='+livros) //pesquisa o valor na api
    .then(
        response => {
            return response.json()
        } //transforma os documentos da api pro formato json
    )
    .then( data => {
        data.docs.slice(0,5).forEach((e) =>{
            console.log(e.author_name)
            console.log(e.title) 
        })//pesquisa do jason atributos específicos utilizados, com o slice limitando a pesquisa a 5 elementos
    })
    .catch(() => {
        console.log('Arquivo não encontrado')
    }
    );
}
// alert('isso ainda funciona??') 