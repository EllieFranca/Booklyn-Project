// Referência ao botão de edição
const btn = document.getElementById('edit-btn');
let editing = false;

// Carrega dados salvos ao carregar a página
window.addEventListener('DOMContentLoaded', () => {
  const savedData = JSON.parse(localStorage.getItem('profileData'));
  if (savedData) {
    for (const key in savedData) {
      const element = document.querySelector(`[data-field="${key}"]`);
      if (element) element.textContent = savedData[key];
    }
  }
});

btn.addEventListener('click', () => {
  if (!editing) {
    // Entrando no modo edição
    document.querySelectorAll('[data-field]').forEach(field => {
      const text = field.textContent;
      const input = document.createElement('input');
      input.type = 'text';
      input.value = text;
      input.dataset.field = field.dataset.field;
      input.classList.add('input-edit');
      field.replaceWith(input);
    });

    btn.textContent = 'Salvar';
    editing = true;
  } else {
    // Salvando dados e saindo do modo edição
    const inputs = document.querySelectorAll('input[data-field]');
    const newData = {};

    inputs.forEach(input => {
      const value = input.value;
      const key = input.dataset.field;
      const p = document.createElement('p');
      p.textContent = value;
      p.dataset.field = key;
      p.className = key === 'nickname' ? 'nickname'
                  : key === 'username' ? 'username'
                  : 'description';
      input.replaceWith(p);
      newData[key] = value;
    });

    localStorage.setItem('profileData', JSON.stringify(newData));
    btn.textContent = 'Editar Perfil';
    editing = false;
  }
});

function mostrar_modal(event) {
    event.preventDefault()
    document.getElementById('modal_minha_conta').removeAttribute('style', 'display:none;')
}
function fechar_modal(event) {
    event.preventDefault()
    document.getElementById('modal_minha_conta').setAttribute('style', 'display:none;')
}