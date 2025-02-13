


let donos=0


let lobousado = Number(lobolocal)
lobodalista = lobos.find(item => item.id === lobousado);

function mostrarlobo() {

    
    let divmaior = document.createElement("div")
    let imagem = document.createElement("img");
    let texto = document.createElement("div");

    let nomelobo = document.createElement("h1");
    let id = document.createElement("p");
    let idlegal = Number(lobodalista.id)
    if (idlegal % 2 !== 0) {
        imagem.src = "../images/loboexemplo_menor.png";
    } else {
        imagem.src = "../images/loboexemplomenor2.png";
    }

    imagem.alt = "lobo na floresta";
    nomelobo.innerText = lobodalista.nome;
    id.innerText = `ID:${lobodalista.id}`;

    divmaior.classList.add("divmaior")
    imagem.classList.add("imagem");
    texto.classList.add("texto");
    nomelobo.classList.add("nomelobo");
    id.classList.add("id");

    texto.append(nomelobo)
    texto.append(id)

    divmaior.append(texto)
    divmaior.append(imagem)

    let adote = document.querySelector(".adote");
    adote.append(divmaior)


}

function adotarlobo() {
    let nomeinput = document.querySelector(".nome");
    let idadeinput = document.querySelector(".idade");
    let emailinput = document.querySelector(".e-mail");

    let nome = nomeinput.value;
    let idade = idadeinput.value;
    let email = emailinput.value;
    if (nome === "" || idade === "" || email === "") {
        alert("Digite todos os campos,por favor.")
        return;
    }

    let loboadotado = lobos.findIndex(item => item.id === lobousado);
    console.log(loboadotado)

    lobos[loboadotado].nomeDono = nome;

    lobos[loboadotado].idadeDono = Number(idade);
    lobos[loboadotado].emailDono = email;
    lobos[loboadotado].adotado = true;

    donos.push({
        loboadotado: lobos[loboadotado],
        nomeDono: nome,
        idadeDono:  Number(idade),
        emailDono: email,
      });

    alert(`Meus parabéns! O lobinho ${lobos[loboadotado].nome} será seu comapnheiro :)`)

    window.location.href = "../ListaDeLobos/ListaDeLobos.html";


}

document.getElementById("botao_adota").addEventListener("click", adotarlobo);
document.addEventListener("DOMContentLoaded", function () {
    mostrarlobo();
});