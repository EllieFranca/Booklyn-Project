let livrosCarregados = [];

window.addEventListener('load', function() {
    const imagens = document.querySelectorAll('.card img');
    
    fetch('https://openlibrary.org/search.json?q=fiction&limit=50')
        .then(resposta => resposta.json())
        .then(dados => {
            const capas = dados.docs.filter(livro => livro.cover_i);
            
            imagens.forEach(function(img, index) {
                const livroAleatorio = capas[Math.floor(Math.random() * capas.length)];
                img.src = `https://covers.openlibrary.org/b/id/${livroAleatorio.cover_i}-M.jpg`;
                
                livrosCarregados[index] = livroAleatorio;
            });
        });
});

function mostrarInfoLivro(cardClicado) {
    const cards = document.querySelectorAll('.card');
    let indiceCard = 0;
    
    for(let i = 0; i < cards.length; i++) {
        if(cards[i] === cardClicado) {
            indiceCard = i;
            break;
        }
    }
    
    const livro = livrosCarregados[indiceCard];
    
    document.getElementById('tituloLivro').textContent = livro.title;
    document.getElementById('autorLivro').textContent = 'Autor: ' + (livro.author_name);
    document.getElementById('anoLivro').textContent = 'Ano: ' + (livro.first_publish_year);
    document.getElementById('modalLivro').style.display = 'block';
}

function fecharModal() {
    document.getElementById('modalLivro').style.display = 'none';
}

function mostrar_modal(event) {
    event.preventDefault()
    document.getElementById('modal_minha_conta').removeAttribute('style', 'display:none;')
}
function fechar_modal(event) {
    event.preventDefault()
    document.getElementById('modal_minha_conta').setAttribute('style', 'display:none;')
}