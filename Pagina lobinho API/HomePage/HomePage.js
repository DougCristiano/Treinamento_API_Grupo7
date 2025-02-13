
function escolherIndiceImpar() {
  let indicealeatorio = 0;
  while (indicealeatorio % 2 === 0) {
    indicealeatorio = Math.floor(Math.random() * lobos.length);
  }
  let lobodalista = undefined;
  while (lobodalista === undefined) {
    lobodalista = lobos.find((item) => item.id === indicealeatorio);
  }
  return lobodalista;
}

function escolherIndicePar() {
  let indicealeatorio = 1;
  while (indicealeatorio % 2 !== 0) {
    indicealeatorio = Math.floor(Math.random() * lobos.length);
  }
  let lobodalistapar = undefined;
  while (lobodalistapar === undefined) {
    lobodalistapar = lobos.find((item) => item.id === indicealeatorio);
  }
  return lobodalistapar;
}

function listadelobos() {
  let primeirolobo = escolherIndiceImpar();
  console.log(primeirolobo);
  let segundolobo = escolherIndicePar();
  console.log(segundolobo);

  let engloba = document.createElement("div");

  let imagem_exemplo = document.createElement("div");

  let fundo_azul = document.createElement("div");

  let link_foto = document.createElement("a");
  link_foto.href = "../ShowLobo/ShowLobo.html";
  link_foto.addEventListener("click", function () {
    
    window.location.href = "ShowLobo.html";
  });

  let foto = document.createElement("img");
  foto.src = "../images/loboexemplo.png";
  foto.alt = "Foto do Lobo";

  let texto_exemplo = document.createElement("div");

  let nome = document.createElement("h2");
  nome.innerText = primeirolobo.nome;

  let idade = document.createElement("p");
  idade.innerText = "Idade: " + primeirolobo.idade;
  let descricao = document.createElement("p");
  descricao.innerText = primeirolobo.descricao;

  engloba.classList.add("engloba");
  imagem_exemplo.classList.add("imagem_exemplo");
  fundo_azul.classList.add("fundo_azul");
  foto.classList.add("imagem");
  texto_exemplo.classList.add("texto_exemplo");
  nome.classList.add("nome");
  idade.classList.add("idade");
  descricao.classList.add("descricao");

  link_foto.append(foto);

  imagem_exemplo.append(fundo_azul);
  imagem_exemplo.append(link_foto);

  texto_exemplo.append(nome);
  texto_exemplo.append(idade);
  texto_exemplo.append(descricao);

  engloba.append(imagem_exemplo);
  engloba.append(texto_exemplo);

  let lobo1 = document.querySelector(".lobo_exemplo1");
  lobo1.append(engloba);

  let engloba2 = document.createElement("div");

  let imagem_exemplo2 = document.createElement("div");

  let fundo_azul2 = document.createElement("div");

  let link_foto2 = document.createElement("a");
    link_foto2.href = "../ShowLobo/ShowLobo.html";
    link_foto2.addEventListener("click", function () {
      window.location.href = "ShowLobo.html";
  });

  let foto2 = document.createElement("img");
    foto2.src = "../images/loboexemplo2.png";
    foto2.alt = "Imagem do Lobo";

  let texto_exemplo2 = document.createElement("div");

  let nome2 = document.createElement("h2");
  nome2.innerText = segundolobo.nome;

  let idade2 = document.createElement("p");
  idade2.innerText = "Idade: " + segundolobo.idade;

  let descricao2 = document.createElement("p");
  descricao2.innerText = segundolobo.descricao;

  engloba2.classList.add("engloba2");
  imagem_exemplo2.classList.add("imagem_exemplo2");
  fundo_azul2.classList.add("fundo_azul2");
  foto2.classList.add("imagem2");
  texto_exemplo2.classList.add("texto_exemplo2");
  nome2.classList.add("nome2");
  idade2.classList.add("idade2");
  descricao2.classList.add("descricao2");

  link_foto2.append(foto2);
  imagem_exemplo2.append(fundo_azul2);
  imagem_exemplo2.append(link_foto2);
  texto_exemplo2.append(nome2);
  texto_exemplo2.append(idade2);
  texto_exemplo2.append(descricao2);

  engloba2.append(imagem_exemplo2);
  engloba2.append(texto_exemplo2);

  let lobo2 = document.querySelector(".lobo_exemplo2")
  lobo2.append(engloba2)
}

document.addEventListener("DOMContentLoaded", listadelobos());
