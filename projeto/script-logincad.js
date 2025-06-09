// Alternar divs
// mostrar div de loguin
function mostrarLogin() {
    document.getElementById('div-cadastro').classList.add('divOculta');
    document.getElementById('div-login').classList.remove('divOculta');
    document.getElementById('div-esqueciSenha').classList.add('divOculta');
    limparCampos()
}
// troca de div através do link "faça login"
document.getElementById('login-link1').addEventListener('click', function (event1) {
    event1.preventDefault(); // Previne o comportamento padrão do link
    mostrarLogin();
});

// mostrar div de cadastro
function mostrarCadastro() {
    document.getElementById('div-login').classList.add('divOculta');
    document.getElementById('div-cadastro').classList.remove('divOculta');
    limparCampos()
}
// troca de div do link "fazer cadastro"
document.getElementById('cadastro-link1').addEventListener('click', function (event2) {
    event2.preventDefault();
    mostrarCadastro();
});

//mostrar div "esqueci senha"
function esqueciSenha() {
    document.getElementById('div-esqueciSenha').classList.remove('divOculta');
    document.getElementById('div-login').classList.add('divOculta');
    limparCampos()
}
//troca de div através do link "esqueci a minha senha"
document.getElementById('cadastro-link2').addEventListener('click', function (event3) {
    event3.preventDefault();
    esqueciSenha();
});

//mostrar div cadastro, dentro da div recuperar senha
function mostrarCadastro2() {
    document.getElementById('div-esqueciSenha').classList.add('divOculta');
    document.getElementById('div-cadastro').classList.remove('divOculta');
}
// troca de div do link "fazer cadastro"
document.getElementById('esqueciSenha-link1').addEventListener('click', function (event4) {
    event4.preventDefault();
    mostrarCadastro2();
});

// ................................... //
// Validação
let nome = document.getElementById('nome1');
let labelNome = document.getElementById('label-nome');
let email = document.getElementById('email1');
let labelEmail = document.getElementById('label-email');
let senha = document.getElementById('password1');
let labelSenha = document.getElementById('label-senha');
let idade = document.getElementById('idade');
let labelIdade =document.getElementById('label-idade');
let telefone = document.getElementById('telefone');
let labelTel = document.getElementById('label-tel');
let validEmail = false;
let validSenha = false;
let validNome = false;
let validIdade = false;
let validTel = false;
let msgErro = document.getElementById('msgErro');
let msgSucesso = document.getElementById('msgSucesso');
let msgErroLog = document.getElementById('msgErroLog');
let msgSucessoLog = document.getElementById('msgSucessoLog');

//evento de keyup (ao começar a digitar, o campo já começa a ser validado, ou seja, executa a função)
nome.addEventListener('keyup', () => {
    if (nome.value.length <= 4) {
        labelNome.innerHTML = 'Nome: * Insira no mínimo 5 caracteres'
        validNome = false
    } else {
        labelNome.innerHTML = 'Nome:'
        validNome = true
    }
});

email.addEventListener("keyup", () => {
    if (autenticarEmail(email.value) !== true) {
        labelEmail.innerHTML = 'E-mail: Digite um e-mail válido. Ex: nome@gmail.com'
        validEmail = false
    } else {
        labelEmail.innerHTML = 'E-mail:'
        validEmail = true
    }
});
// Criando uma função para validar o e-mail
function autenticarEmail(email1) {
    let functionEmailValid = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
    return functionEmailValid.test(email1);
}

senha.addEventListener('keyup', () => {
    if (senha.value.length <= 5) {
        labelSenha.innerHTML = 'Senha: * Insira no mínimo 6 caracteres'
        validSenha = false
    } else {
        labelSenha.innerHTML = 'Senha:'
        validSenha = true
    }
});

idade.addEventListener('keyup', () => {
    let valor = parseInt(idade.value);
    if (valor < 10) {
        labelIdade.innerHTML = 'Idade: * Você deve ter pelo menos 10 anos';
        validIdade = false
    } else {
        labelIdade.innerHTML = 'Idade:'
        validIdade = true
    }
});

telefone.addEventListener('keyup', () => {
    let valor = telefone.value;

    // Remove caracter 
    valor = valor.replace(/\D/g, '');
    // Limita a 11 dígitos
    valor = valor.slice(0, 11);

    // Aplica a máscara: (XX) XXXXX-XXXX
    if (valor.length > 1) {
        valor = '(' + valor.substring(0, 2) + ') ' + valor.substring(2);
    }
    if (valor.length > 7) {
        valor = valor.substring(0, 10) + '-' + valor.substring(10, 14);
    }

    telefone.value = valor;

    // Validação final
    let regexTelefone = /^\(\d{2}\) \d{5}-\d{4}$/;
    if (!regexTelefone.test(telefone.value)) {
        labelTel.innerHTML = 'Telefone: * <br>Formato inválido. Exemplo: (XX) XXXXX-XXXX';
        validTel = false;
    } else {
        labelTel.innerHTML = 'Telefone:';
        validTel = true;
    }
});


// ................................... //
//Função limpar campos
function limparCampos() {
    //Limpa os campos de cadastro
    if (nome) {
        nome.value = '';
        nome.removeAttribute('style');
    }
    if (email) {
        email.value = '';
        email.removeAttribute('style');
    }
    if (senha) {
        senha.value = '';
        senha.removeAttribute('style');
    }
    if (idade) {
        idade.value = '';
        idade.removeAttribute('style');
    }
    if (telefone) {
        telefone.value = '';
        telefone.removeAttribute('style');
    }
    // Limpa os campos de login
    let emailLogin = document.getElementById('email2');
    let senhaLogin = document.getElementById('password2');
    if (emailLogin) {
        emailLogin.value = '';
        emailLogin.removeAttribute('style');
    }
    if (senhaLogin) {
        senhaLogin.value = '';
        senhaLogin.removeAttribute('style');
    }
    //limpa os campos de recuperar senha
    let email3 = document.getElementById('email3');
    if (email3) {
        email3.value = '';
        email3.removeAttribute('style');
    }
    // Esconde as div de erros/sucesso
    let msgErro = document.getElementById('msgErro');
    let msgSucesso = document.getElementById('msgSucesso');
    let msgErroLog = document.getElementById('msgErroLog');
    let msgSenhRecup = document.getElementById('msgSenhRecup')
    if (msgErro) {
        msgErro.setAttribute('style', 'display: none');
    }
    if (msgSucesso) {
        msgSucesso.setAttribute('style', 'display: none');
    }
    if (msgErroLog) {
        msgErroLog.setAttribute('style', 'display: none');
    }
    if (msgSenhRecup) {
        msgSenhRecup.setAttribute('style', 'display: none');
    }
}

// ................................... //
//TELA DE CADASTRO
function cadastrar(event) {
    event.preventDefault(); //Garante que o formulário seja enviado
    if (validEmail && validSenha && validNome && validIdade && validTel) {
        //Buscar lista de usuários cadastrados e transformar em objeto para a manipulação 
        //ou adciona ao array que já existe ou cria um vazio 
        let ListaUser = JSON.parse(localStorage.getItem('ListaUser') || '[]');

        //garante a não duplicidade de cadastro através do e-mail
        const emailExiste = ListaUser.some(user => user.emailCad === email.value);
        if (emailExiste) {
            msgErro.setAttribute('style', 'display: block');
            msgErro.innerHTML = 'Este e-mail já está cadastrado. Use outro ou faça login.';
            msgSucesso.setAttribute('style', 'display: none');
            email.setAttribute('style', 'box-shadow: 0 0 0 1px red; border-color: red;');
            email.focus()
            scrollbar(msgErro);
            return;
        }

        // Adiciona o novo usuário
        ListaUser.push({
            nomeCad: nome.value,
            emailCad: email.value,
            senhaCad: senha.value,
            idadeCad: idade.value,
            telCad: telefone.value
        });

        // Armazena a lista
        localStorage.setItem('ListaUser', JSON.stringify(ListaUser));

        msgSucesso.setAttribute('style', 'display: block');
        msgSucesso.innerHTML = 'Cadastrando usuário...';
        msgErro.innerHTML = '';
        msgErro.setAttribute('style', 'display: none');
        email.removeAttribute('style');
        scrollbar(msgSucesso);

        setTimeout(() => {
            mostrarLogin();
        }, 2000);

    } else {
        msgErro.setAttribute('style', 'display: block');
        msgErro.innerHTML = 'Preencha todos os campos corretamente para proseguir.';
        msgSucesso.innerHTML = '';
        msgSucesso.setAttribute('style', 'display: none');
        nome.focus()
        scrollbar(msgErro);
    }
}
function scrollbar(elemento) {
    elemento.scrollIntoView({
        behavior: 'smooth'
    });
}

// ................................... //
//TELA DE LOGIN
function logar(event) {
    event.preventDefault()
    let email2 = document.getElementById('email2');
    let password2 = document.getElementById('password2');

    // Verifica se os inputs estão vazios
    if (email2.value.trim() === '' || password2.value.trim() === '') {
        msgErroLog.setAttribute('style', 'display: block');
        msgErroLog.innerHTML = 'Por favor, preencha todos os campos corretamente.';
        email2.focus();
        return; //mostra a mensagem de erro e interrompe a função se estiver vazio
    }

    let listaUserLogar = []
    //validação do objeto
    let userValid = {
        nomeLog: '',
        emailLog: '',
        senhaLog: '',
        idadeLog: '',
        telLog: ''
    }

    listaUserLogar = JSON.parse(localStorage.getItem('ListaUser'))
    //varre a lista item por item
    listaUserLogar.forEach((item) => {
        if (email2.value == item.emailCad && password2.value == item.senhaCad) {

            // preenchimento do objeto
            userValid = {
                nomeLog: item.nomeCad,
                emailLog: item.emailCad,
                senhaLog: item.senhaCad,
                idadeLog: item.idadeCad,
                telLog: item.telCad
            }
        }
    });

    //verificar se a senha e o usuário estão corretos
    if (email2.value == userValid.emailLog && password2.value == userValid.senhaLog) {
        msgSucessoLog.setAttribute('style', 'display: block');
        msgSucessoLog.innerHTML = 'Logando... Seja bem-vindo!';
        setTimeout(() => {
            // redireciona para a página Home
            window.location.href = 'index-homepage.html';
        }, 1000);d
        limparCampos()
    } else {
        //buscar o cadastro dos usuários no localStorage
        const ListaUser = JSON.parse(localStorage.getItem('ListaUser') || '[]');
        //confere se o e-mail existe 
        const EmailDetec = ListaUser.some(user => user.emailCad === email2.value);

        //Para e-mail detectado e senha errada
        if (EmailDetec && password2.value !== '') {
            msgErroLog.innerHTML = 'Senha incorreta. Por favor, verifique e tente novamente.'
            password2.setAttribute('style', 'box-shadow: 0 0 0 1px red; border-color: red;')
            email2.removeAttribute('style')
            password2.focus()
        } else {
            //Para email inexistente (usuário não encontrado)
            if (email2.value.trim() !== '' && password2.value.trim() !== '') {
                msgErroLog.innerHTML = 'Usuário ou senha incorretos, verifique os dados e tente novamente.';
                email2.setAttribute('style', 'box-shadow: 0 0 0 1px red; border-color: red;');
                password2.setAttribute('style', 'box-shadow: 0 0 0 1px red; border-color: red;');
                email2.focus()
            }
        }
        msgErroLog.setAttribute('style', 'display: block');
    }
}

// ................................... //
//Tela de recuperar senha
function recuperarSenha(event) {
    event.preventDefault();
    let email3 = document.getElementById('email3');
    let msgSenhRecup = document.getElementById('msgSenhRecup')

    // Verifica se os inputs estão vazios
    if (email3.value.trim() === '') {
        msgSenhRecup.setAttribute('style', 'display: block');

        msgSenhRecup.innerHTML = '<span style="color: brown;">Por favor, informe o seu e-mail utilizado no cadastro.</span>';

        email3.focus();
        return; //mostra a mensagem de erro e interrompe a função se estiver vazio
    }
    // Busca os usuários no localStorage
    const ListaUser = JSON.parse(localStorage.getItem('ListaUser') || '[]');
    const usuarioEmail = ListaUser.find(user => user.emailCad === email3.value);

    if (usuarioEmail) {
        // Mostra a senha e o link para fazer login
        msgSenhRecup.innerHTML = `Sua senha é: <i>${usuarioEmail.senhaCad}</i><br><a href="#"; return false;" style="color: #315db9;">Fazer login</a>`;
        msgSenhRecup.style.display = 'block';
    } else {
        // E-mail não encontrado
        msgSenhRecup.innerHTML = 'E-mail não cadastrado. Verifique ou faça cadastro.';
        msgSenhRecup.style.display = 'block';
        email3.focus();
    }
}

// ................................... //
//icone ver senha
//Função para visualizar em ambas as div (cadastro e login)
function verSenha(eyeIcon, inputSenha) {
    eyeIcon.addEventListener('click', () => {
        let tipo = inputSenha.getAttribute('type') === 'password' ? 'text' : 'password'; //verifica o tipo do campo input
        inputSenha.setAttribute('type', tipo);

        // muda para o olho aberto e fechado
        eyeIcon.classList.toggle('fa-eye');
        eyeIcon.classList.toggle('fa-eye-slash');
    });
}
// div de cadastro
let btneyeCad = document.querySelector('#password-icon-cad .fa-eye');
let inputSenhaCad = document.getElementById('password1');
if (btneyeCad && inputSenhaCad) {
    verSenha(btneyeCad, inputSenhaCad);
}
// div de login
let btneyeLog = document.querySelector('#password-icon-log .fa-eye');
let inputSenhaLog = document.getElementById('password2');
if (btneyeLog && inputSenhaLog) {
    verSenha(btneyeLog, inputSenhaLog);
}
