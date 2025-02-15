
let idremover = 0;
async function aparecerlobo() {
    const respostashow = await fetch('http://localhost:3000/lobos', {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      })
      const lobosArray = await respostashow.json();
      const lobolocal = localStorage.getItem("lobotemp"); 
      const lobodalista = lobosArray.find(item => item.id === lobolocal);
      console.log(lobodalista)

    let lobo1 = document.createElement("div");
    let lobo_exemplo = document.createElement("div");
    let imagem_exemplo = document.createElement("div");
    let fundo_azul = document.createElement("div");
    let imagem = document.createElement("img");
    
    imagem.src = lobodalista.imagem
    imagem.alt = "Lobo na floresta";
    let botao_adocao = document.createElement("div");
    let adota = document.createElement("div");
    adota.innerText = "Adotar";
    adota.addEventListener("click", async function () {
      if(lobodalista.adotado === false){
        let loboatualid = lobodalista.id;
        localStorage.setItem("lobotemp", loboatualid);
     
        window.location.href = "../AdotarLobo/AdotarLobo.html";}
      else{
          alert("Esse lobo já está adotado!")
      }
    });
    let excluir = document.createElement("div");
    excluir.innerText = "Excluir";
    excluir.addEventListener("click", async function () {
        let idRemove = lobodalista.id;

        if (confirm("Tem certeza que deseja excluir?")) {
            const respostadeletarlobo = await fetch(`http://localhost:3000/lobos/${idRemove}`,{
                method: 'DELETE',
                headers: {
                'Content-type': 'application/json',
                },
            })
            const data = await respostadeletarlobo.json()
            console.log(data)
            window.location.href = "../ListaDeLobos/ListaDeLobos.html";
            alert(`Lobo com ID ${idRemove} removido.`);
            
        } else {
            alert("Ação cancelada.");
            return;
        }
    });
 
    let texto_exemplo = document.createElement("p");
    texto_exemplo.innerText = lobodalista.descricao;

    lobo1.classList.add("lobo1");
    lobo_exemplo.classList.add("lobo_exemplo");
    imagem_exemplo.classList.add("imagem_exemplo");
    fundo_azul.classList.add("fundo_azul");

    texto_exemplo.classList.add("texto_exemplo");
    imagem.classList.add("imagem");
    botao_adocao.classList.add("botao_adocao");
    adota.classList.add("adota");
    adota.classList.add("adota:hover");

    excluir.classList.add("excluir");
    excluir.classList.add("excluir:hover");

    botao_adocao.append(adota);
    botao_adocao.append(excluir);

    imagem_exemplo.append(fundo_azul);
    imagem_exemplo.append(imagem);
    imagem_exemplo.append(botao_adocao);

    lobo_exemplo.append(imagem_exemplo);
    lobo_exemplo.append(texto_exemplo);

    lobo1.append(lobo_exemplo);

    let divexiste = document.querySelector(".lobo_final");
    divexiste.appendChild(lobo1);

    let nome = document.createElement("h2");
    nome.innerText = lobodalista.nome;

    let divnome = document.querySelector(".titulo_exemplo");
    divnome.append(nome);
    let idremove = Number(lobodalista.id);
    idremover = idremove
    
}

document.addEventListener("DOMContentLoaded", function () {
    aparecerlobo();
});
