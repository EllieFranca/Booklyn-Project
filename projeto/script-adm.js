document.addEventListener("DOMContentLoaded", function() {
  const tableBody = document.querySelector("tbody");
  const searchInput = document.getElementById("searchbaruser-input");
  let dados = JSON.parse(localStorage.getItem("ListaUser")) || [];

  function renderTable(filtro = "") {
    tableBody.innerHTML = "";
    const dadosFiltrados = dados.filter(data =>
      data.nomeCad.toLowerCase().includes(filtro.toLowerCase()) ||
      data.emailCad.toLowerCase().includes(filtro.toLowerCase())
    );

    if (dadosFiltrados.length > 0) {
      dadosFiltrados.forEach((data, index) => {
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
          <td>${data.nomeCad}</td>
          <td>${data.emailCad}</td>
          <td>${data.senhaCad}</td>
          <td>${data.telCad || ""}</td>
          <td>${data.idadeCad || ""}</td>
          <td>
            <button class="editar-btn" data-index="${index}">Editar</button>
            <button class="excluir-btn" data-index="${index}">Excluir</button>
          </td>
        `;
        tableBody.appendChild(newRow);
      });
    } else {
      const newRow = document.createElement("tr");
      newRow.innerHTML = `
        <td colspan="6">Nenhum dado encontrado.</td>
      `;
      tableBody.appendChild(newRow);
    }

    // Adiciona eventos aos botões após renderizar a tabela
    document.querySelectorAll('.editar-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const index = this.getAttribute('data-index');
        editarCadastro(index);
      });
    });

    document.querySelectorAll('.excluir-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const index = this.getAttribute('data-index');
        excluirCadastro(index);
      });
    });
  }

  function editarCadastro(index) {
    const novoNome = prompt("Novo nome:", dados[index].nomeCad);
    const novoEmail = prompt("Novo email:", dados[index].emailCad);
    const novaSenha = prompt("Nova senha:", dados[index].senhaCad);
    const novoTel = prompt("Novo telefone:", dados[index].telCad || "");
    const novaIdade = prompt("Nova idade:", dados[index].idadeCad || "");
    if (novoNome && novoEmail && novaSenha && novoTel && novaIdade) {
      dados[index].nomeCad = novoNome;
      dados[index].emailCad = novoEmail;
      dados[index].senhaCad = novaSenha;
      dados[index].telCad = novoTel;
      dados[index].idadeCad = novaIdade;
      localStorage.setItem("ListaUser", JSON.stringify(dados));
      renderTable(searchInput.value);
    }
  }

  function excluirCadastro(index) {
    if (confirm("Tem certeza que deseja excluir este cadastro?")) {
      dados.splice(index, 1);
      localStorage.setItem("ListaUser", JSON.stringify(dados));
      renderTable(searchInput.value);
    }
  }

  // Evento para filtrar enquanto digita
  searchInput.addEventListener("input", function() {
    renderTable(this.value);
  });

  renderTable();
});

function mostrar_modal(event) {
    event.preventDefault()
    document.getElementById('modal_minha_conta').removeAttribute('style', 'display:none;')
}
function fechar_modal(event) {
    event.preventDefault()
    document.getElementById('modal_minha_conta').setAttribute('style', 'display:none;')
}
