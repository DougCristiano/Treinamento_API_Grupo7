async function getLobos() {
  const resposta = await fetch("http://localhost:3000/lobos", {
      method: "GET",
      headers: { 'Content-type': 'application/json' },
  });
  return await resposta.json();
}
console.log(getLobos())

function escolherIndiceImpar(lobos) {
  const lobosImpares = lobos.filter((_, index) => index % 2 !== 0);
  return lobosImpares[Math.floor(Math.random() * lobosImpares.length)];
}

function escolherIndicePar(lobos) {
  const lobosPares = lobos.filter((_, index) => index % 2 === 0);
  return lobosPares[Math.floor(Math.random() * lobosPares.length)];
}

async function listadelobos() {
  const lobos = await getLobos();
  if (!lobos.length) {
      console.error("Nenhum lobo encontrado!");
      return;
  }

  const primeirolobo = escolherIndicePar(lobos);
  const segundolobo = escolherIndiceImpar(lobos);

  console.log(primeirolobo, segundolobo);

  function criarElementoLobo1(lobo, containerSelector, imagemSrc) {
      let engloba = document.createElement("div");
      let imagemExemplo = document.createElement("div");
      let fundoAzul = document.createElement("div");
      let linkFoto = document.createElement("a");
      let foto = document.createElement("img");
      let textoExemplo = document.createElement("div");
      let nome = document.createElement("h2");
      let idade = document.createElement("p");
      let descricao = document.createElement("p");

      linkFoto.href = "../ShowLobo/ShowLobo.html";
      linkFoto.addEventListener("click", async function (event) {
          event.preventDefault();
          await fetch('http://localhost:3000/lobosExtras', {
              method: 'POST',
              headers: { 'Content-type': 'application/json' },
              body: JSON.stringify(lobo),
          });
          window.location.href = "../ShowLobo/ShowLobo.html";
      });

      foto.src = imagemSrc;
      foto.alt = "Foto do Lobo";
      nome.innerText = lobo.nome;
      idade.innerText = `Idade: ${lobo.idade}`;
      descricao.innerText = lobo.descricao;

      engloba.classList.add("engloba");
      imagemExemplo.classList.add("imagem_exemplo");
      fundoAzul.classList.add("fundo_azul");
      foto.classList.add("imagem");
      textoExemplo.classList.add("texto_exemplo");
      nome.classList.add("nome");
      idade.classList.add("idade");
      descricao.classList.add("descricao");

      linkFoto.append(foto);
      imagemExemplo.append(fundoAzul, linkFoto);
      textoExemplo.append(nome, idade, descricao);
      engloba.append(imagemExemplo, textoExemplo);

      let container = document.querySelector(containerSelector);
      container.innerHTML = "";
      container.append(engloba);
  }
  function criarElementoLobo2(lobo, containerSelector, imagemSrc) {
    let engloba = document.createElement("div");
    let imagemExemplo = document.createElement("div");
    let fundoAzul = document.createElement("div");
    let linkFoto = document.createElement("a");
    let foto = document.createElement("img");
    let textoExemplo = document.createElement("div");
    let nome = document.createElement("h2");
    let idade = document.createElement("p");
    let descricao = document.createElement("p");

    linkFoto.href = "../ShowLobo/ShowLobo.html";
    linkFoto.addEventListener("click", async function (event) {
        event.preventDefault();
        await fetch('http://localhost:3000/lobosExtras', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(lobo),
        });
        window.location.href = "../ShowLobo/ShowLobo.html";
    });

    foto.src = imagemSrc;
    foto.alt = "Foto do Lobo";
    nome.innerText = lobo.nome;
    idade.innerText = `Idade: ${lobo.idade}`;
    descricao.innerText = lobo.descricao;

    engloba.classList.add("engloba2");
    imagemExemplo.classList.add("imagem_exemplo2");
    fundoAzul.classList.add("fundo_azul2");
    foto.classList.add("imagem2");
    textoExemplo.classList.add("texto_exemplo2");
    nome.classList.add("nome2");
    idade.classList.add("idade2");
    descricao.classList.add("descricao2");

    linkFoto.append(foto);
    imagemExemplo.append(fundoAzul, linkFoto);
    textoExemplo.append(nome, idade, descricao);
    engloba.append(imagemExemplo, textoExemplo);

    let container = document.querySelector(containerSelector);
    container.innerHTML = "";
    container.append(engloba);
}
  criarElementoLobo1(primeirolobo, ".lobo_exemplo1", "../images/loboexemplo.png");
  criarElementoLobo2(segundolobo, ".lobo_exemplo2", "../images/loboexemplo2.png");
}

document.addEventListener("DOMContentLoaded", listadelobos);