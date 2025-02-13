
let idremover = 0;
async function aparecerlobo() {
    const respostashow = await fetch('http://localhost:3000/lobosExtras', {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      })
      const lobosArray = await respostashow.json();
      const lobodalista = lobosArray.length > 0 ? lobosArray[0] : null;
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
          const respostalink2 = await fetch('http://localhost:3000/lobosExtras', {
              method: 'POST',
              headers: {
                'Content-type': 'application/json',
              },
              body: JSON.stringify({
                id: lobodalista.id,
                nome: lobodalista.nome,
                idade: lobodalista.idade,
                descricao: lobodalista.descricao,
                imagem: lobodalista.imagem,
                adotado: lobodalista.adotado,
                nomeDono: lobodalista.nomeDono,
                idadeDono: lobodalista.idadeDono,
                emailDono: lobodalista.emailDono,
              })
            })
            const data = await respostalink2.json()
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
            alert(`Lobo com ID ${idRemove} removido.`);
            window.location.href = "../ListaDeLobos/ListaDeLobos.html";
        } else {
            alert("Ação cancelada.");
            return;
        }
    });
    console.log(lobodalista)
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
window.addEventListener("unload",async function () {
  await fetch(`http://localhost:3000/lobosExtras/${idremover}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
    });
  navigator.sendBeacon(url, JSON.stringify({}));
});
window.addEventListener("beforeunload", async function () {
  await fetch(`http://localhost:3000/lobosExtras/${idremover}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
  });
});
document.addEventListener("DOMContentLoaded", function () {
    aparecerlobo();
});
