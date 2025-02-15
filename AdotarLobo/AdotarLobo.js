

const lobolocal = localStorage.getItem("lobotemp"); // Pega o ID do lobo salvo na página anterior
let donos = 0;
let lobousado = Number(lobolocal);
let lobodalista = null; // Inicialmente, o lobo ainda não foi carregado

async function buscarLobo() {
    try {
        let resposta = await fetch(`http://localhost:3000/lobos/${lobousado}`);
        if (!resposta.ok) throw new Error("Erro ao buscar lobo.");
        
        lobodalista = await resposta.json();
        mostrarlobo();
    } catch (erro) {
        console.error("Erro ao carregar lobo:", erro);
    }
}

document.addEventListener("DOMContentLoaded", buscarLobo);

function mostrarlobo() {
    if (!lobodalista) {
        console.error("Erro: lobodalista está indefinido.");
        return;
    }

    let divmaior = document.createElement("div");
    let imagem = document.createElement("img");
    let texto = document.createElement("div");

    let nomelobo = document.createElement("h1");
    let id = document.createElement("p");

    imagem.src = (lobodalista.id % 2 !== 0) ? "../images/loboexemplo_menor.png" : "../images/loboexemplomenor2.png";
    imagem.alt = "lobo na floresta";
    
    nomelobo.innerText = lobodalista.nome;
    id.innerText = `ID:${lobodalista.id}`;

    divmaior.classList.add("divmaior");
    imagem.classList.add("imagem");
    texto.classList.add("texto");
    nomelobo.classList.add("nomelobo");
    id.classList.add("id");

    texto.append(nomelobo);
    texto.append(id);
    divmaior.append(texto);
    divmaior.append(imagem);

    let adote = document.querySelector(".adote");
    adote.append(divmaior);
}

async function adotarlobo() {
    let nomeinput = document.querySelector(".nome");
    let idadeinput = document.querySelector(".idade");
    let emailinput = document.querySelector(".e-mail");

    let nome = nomeinput.value;
    let idade = idadeinput.value;
    let email = emailinput.value;

    if (nome === "" || idade === "" || email === "") {
        alert("Digite todos os campos, por favor.");
        return;
    }

    lobodalista.nomeDono = nome;
    lobodalista.idadeDono = Number(idade);
    lobodalista.emailDono = email;
    lobodalista.adotado = true;

    try {
        let resposta = await fetch(`http://localhost:3000/lobos/${lobodalista.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(lobodalista)
        });

        if (!resposta.ok) throw new Error("Erro ao salvar a adoção.");

        alert(`Meus parabéns! O lobinho ${lobodalista.nome} será seu companheiro :)`);
        window.location.href = "../ListaDeLobos/ListaDeLobos.html";
    } catch (erro) {
        console.error("Erro ao adotar lobo:", erro);
    }
}

document.getElementById("botao_adota").addEventListener("click", adotarlobo);
