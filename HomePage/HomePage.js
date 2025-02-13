async function getLobos() {
  const resposta = await fetch("http://localhost:3000/lobos", {
      method: "GET",
      headers: { 'Content-type': 'application/json' },
  });
  return await resposta.json();
}


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

  const primeirolobo = escolherIndiceImpar(lobos);
  const segundolobo = escolherIndicePar(lobos);

  console.log(primeirolobo, segundolobo);

  function criarElementoLobo1(lobo) {
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
      linkFoto.addEventListener("click", function () {
          
          let loboatualid = lobo.id;
          localStorage.setItem("lobotemp", loboatualid);
          window.location.href ="../ShowLobo/ShowLobo.html"; 
      });

      foto.src = lobo.imagem;
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

      let container = document.querySelector(".lobo_exemplo1");
      
      container.append(engloba);
  }
  function criarElementoLobo2(lobo) {
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
    linkFoto.addEventListener("click",  function () {
      let loboatualid = lobo.id;
      localStorage.setItem("lobotemp", loboatualid);
      window.location.href ="../ShowLobo/ShowLobo.html"; 
    });

    foto.src = lobo.imagem;
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

    let container = document.querySelector(".lobo_exemplo1");
    
    container.append(engloba);
}
  criarElementoLobo1(primeirolobo);
  criarElementoLobo2(segundolobo);
}

document.addEventListener("DOMContentLoaded", listadelobos);