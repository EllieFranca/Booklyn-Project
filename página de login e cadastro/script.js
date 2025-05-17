// mostra e esconde as divs
function mostrarLogin() {
    document.getElementById('div-cadastro').classList.add('divOculta');
    document.getElementById('div-login').classList.remove('divOculta');
}

// verifica se os inputs estão preenchidos
function camposPreenchidos() {
    const email = document.getElementById('email1').value;
    const password = document.getElementById('password1').value;
    return email.trim() !== '' && password.trim() !== '';
}

// troca de div do link "faça login"
document.getElementById('login-link1').addEventListener('click', function(event) {
    event.preventDefault(); // Previne o comportamento padrão do link
    mostrarLogin();
});

// troca de div no botão "Cadastrar"
document.getElementById('submit-button1').addEventListener('click', function(event) {
    event.preventDefault(); // Previne o envio do formulário
    if (camposPreenchidos()) {
        mostrarLogin();
    } else {
        alert('Por favor, preencha todos os campos corretamente para proceguir.');
    }
});
