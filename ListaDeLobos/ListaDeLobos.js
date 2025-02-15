let paginaatual=0;
let opcaoAtivada = false; 
let index_lobosvalidos = 0;

async function getlobos(){
    const resposta = await fetch("http://localhost:3000/lobos",{
        method:"GET",
        headers: {
            'Content-type': 'application/json',
        },
    })
    
    const lobos = await resposta.json()
    
    return lobos;
}

document.getElementById("checkbox").addEventListener("change", function() {
    opcaoAtivada = this.checked; 
    loboatual = 0
    document.querySelector(".lobo_exemplo").innerHTML = ""; 
    index_lobosvalidos = 0;
    listadelobos();
});
let loboatual = 0
async function pegarid() {
    let lobos = await getlobos(); 

    if (!lobos || lobos.length === 0) {
        console.warn("Nenhum lobo encontrado.");
        return null;
    }
    let lobosadotados = lobos.filter(lobo => lobo.adotado === true);
    let lobosnaoadotados = lobos.filter(lobo => lobo.adotado === false);
    let listaSelecionada = opcaoAtivada ? lobosadotados : lobosnaoadotados;
    if (index_lobosvalidos >= listaSelecionada.length) {
        console.warn("Não há mais lobos disponíveis na categoria selecionada.");
        return null;
    } 
    let listadelobos = [];
    let indexsaida=0
    let i=loboatual
    while(indexsaida<4 && i<listaSelecionada.length){
        let idvalido = listaSelecionada[i].id;
        let lobovalido = listaSelecionada.find(lobo => lobo.id === idvalido);
        if(lobovalido!=null || lobovalido!=undefined){
            index_lobosvalidos++;
            listadelobos.push(lobovalido)
            indexsaida++
            i++
        }else{
            i++
            continue;
        }
        loboatual=i
    }
    

    return listadelobos;
}
//NAO MEXER! ela fez mudar as imagens do banco de dados
//  async function criarimagens(){
//      try {
//          let totalLobos = await getlobos(); // Certifique-se de que essa função retorna um número válido

//          let promessas = []; // Array para armazenar as requisições
//          console.log(totalLobos.length)
//          for (let i = 1; i <=totalLobos.length; i++) {
//              let src = i % 2 === 0 ? "../images/loboexemplo2.png" : "../images/loboexemplo.png";

//              // Criando uma requisição fetch e armazenando no array
//              let promessa = fetch(`http://localhost:3000/lobos/${i}`, {
//                  method: "PATCH",
//                  headers: {
//                      "Content-type": "application/json",
//                  },
//                  body: JSON.stringify({ imagem: src }),
//              }).then(resposta => {
//                  if (!resposta.ok) {
//                      throw new Error(`Erro ao atualizar lobo ${i}: ${resposta.status}`);
//                  }
//                  return resposta.json();
//              });

//              promessas.push(promessa);
//          }

//          // Aguarda todas as requisições finalizarem
//          await Promise.all(promessas);
//          console.log("Todas as imagens foram atualizadas com sucesso!");
//      } catch (erro) {
//          console.error("Erro ao atualizar as imagens dos lobos:", erro);
//      }
    
//  }
async function listadelobos(){
    let listadelobos = await pegarid();
    for(i=0;i<4;i++){
        
        let lobodalista = listadelobos[i]
        console.log(lobodalista)

        let lobo =document.createElement("div");
        let imagem_exemplo = document.createElement("div");
        let fundo_azul = document.createElement("div");
        let link_foto = document.createElement("a")
        let src = lobodalista.imagem
        
        let foto = document.createElement("img")
        foto.src = src
        
        link_foto.href = "../ShowLobo/ShowLobo.html"
        link_foto.addEventListener("click",  function() {
            let loboatualid = lobodalista.id;
            localStorage.setItem("lobotemp", loboatualid);
         
            window.location.href ="../ShowLobo/ShowLobo.html"; 
        })           
        
        
        foto.alt = "Lobo na floresta"
        let texto_exemplo = document.createElement("div");
        let texto = document.createElement("div");
        let textodiv = document.createElement("div");
        let nome = document.createElement("h2");
        nome.innerText = lobodalista.nome;
        let idade = document.createElement("p");
        idade.innerText = `Idade:${lobodalista.idade}`;
        let botao = document.createElement("button");
        if( opcaoAtivada===true){
            botao.innerText = "Adotado";
            botao.addEventListener("click", function() {
            alert("Lobo já foi adotado!");
            });
        }else{
            botao.innerText = "Adotar";
            botao.addEventListener("click", function() {
                localStorage.setItem("lobotemp", lobodalista.id);
                window.location.href = "../AdotarLobo/AdotarLobo.html"; 
            });
        }
        let descricao = document.createElement("p");
        descricao.innerText = lobodalista.descricao;
        
        i%2===0? lobo.classList.add("lobo1"):lobo.classList.add("lobo2")
        i%2===0? imagem_exemplo.classList.add("imagem_exemplo"):imagem_exemplo.classList.add("imagem_exemplo2")
        i%2===0? fundo_azul.classList.add("fundo_azul"): fundo_azul.classList.add("fundo_azul2")
        i%2===0? foto.classList.add("imagem"):foto.classList.add("imagem2")
        i%2===0? texto_exemplo.classList.add("texto_exemplo"): texto_exemplo.classList.add("texto_exemplo2")
        i%2===0? texto.classList.add("texto"):texto.classList.add("texto2")
        i%2===0? nome.classList.add("nome"):nome.classList.add("nome2")
        i%2===0? idade.classList.add("idade"):idade.classList.add("idade2")
        i%2===0? descricao.classList.add("desc"):descricao.classList.add("desc2")
        if( opcaoAtivada===true){
            botao.classList.add("adotado_botao");
        }else{
            botao.classList.add("adotar_botao2");
        }
        
        link_foto.append(foto);
        imagem_exemplo.append(fundo_azul);
        imagem_exemplo.append(link_foto);           
        textodiv.append(nome);
        textodiv.append(idade);
        texto.append(textodiv);
        texto.append(botao);
        texto_exemplo.append(texto);
        texto_exemplo.append(descricao);
        lobo.append(imagem_exemplo);
        lobo.append(texto_exemplo);         
    
        let divexiste = document.querySelector(".lobo_exemplo");
        divexiste.appendChild(lobo);
    }
}

function avançar(){
    if(paginaatual<=250){
        
        paginaatual+=1;
        document.querySelector(".lobo_exemplo").innerHTML = "";
        listapaginas();
        listadelobos();
        
    }
}
function voltar(){
    if(paginaatual>0){
        index_lobosvalidos-=8
        paginaatual-=1;
        listapaginas();
        document.querySelector(".lobo_exemplo").innerHTML = "";
        listadelobos();
        
    }
    
}
function listapaginas(){
    document.querySelector(".listabotao").innerHTML = "";
    if(paginaatual>=0 && paginaatual<=2 ){
        for(i=0;i<5;i++){
        
            let listadebotao = document.querySelector(".listabotao");
            let botao = document.createElement("button");
            botao.innerText = i+1;
            let numbotao=i;
            botao.setAttribute("data-numero", 4*i);
            
            botao.addEventListener("click", function() {
                window.scrollTo({top:0,behavior:"smooth"})
                paginaatual=numbotao;
                let indexbotao = this.getAttribute("data-numero");
                index_lobosvalidos = Number(indexbotao)
                document.querySelector(".lobo_exemplo").innerHTML = "";
                listapaginas()
                listadelobos();
                
            })
            botao.classList.add("botaofinal");
            botao.classList.add("botaofinalhover");
            if(paginaatual===i){
                botao.classList.add("botaoatual");
            }
            
            listadebotao.append(botao);
            
        }
    }else{
        for(i=paginaatual-2;i<paginaatual+3;i++){
        
            let listadebotao = document.querySelector(".listabotao");
            let botao = document.createElement("button");
            botao.innerText = i+1;
            let numbotao=i;
            botao.setAttribute("data-numero", 4*i);
            botao.addEventListener("click", function() {
                paginaatual=numbotao;
                window.scrollTo({top:0,behavior:"smooth"})
                let indexbotao = this.getAttribute("data-numero");
                index_lobosvalidos = Number(indexbotao)
                document.querySelector(".lobo_exemplo").innerHTML = "";
                listapaginas()
                listadelobos();
                
            })
            botao.classList.add("botaofinal");
            botao.classList.add("botaofinalhover");
            if(paginaatual===i){
                botao.classList.add("botaoatual");
            }
            
            listadebotao.append(botao);
            
        }
    }
    
    
}

async function buscar(){
    let pesquisainput = document.querySelector(".pesquisa");
    let pesquisa = pesquisainput.value
    document.querySelector(".lobo_exemplo").innerHTML = "";
    let nomeminusculo = pesquisa.toLowerCase()
    let loboescolhido=0
    let lobodalistabusca = await getlobos();
    
    let lobosadotados = lobodalistabusca.filter(lobo => lobo.adotado === true);
    let lobosnaoadotados = lobodalistabusca.filter(lobo => lobo.adotado === false);

    if(opcaoAtivada===true){
        loboescolhido = lobosadotados.find(item => item.nome.toLowerCase() == nomeminusculo)
    }else{
         loboescolhido = lobosnaoadotados.find(item => item.nome.toLowerCase() == nomeminusculo)
    }
    
    if (loboescolhido === undefined){
        if(opcaoAtivada===true){
            alert(`O lobo ${pesquisa} não está no banco de dados ou ele não foi adotado ainda`)
        }else{
            alert(`O lobo ${pesquisa} não está no banco de dados ou ele já foi adotado `)
        }
        
        let pesquisainputreset = document.querySelector(".pesquisa");
        pesquisainputreset.value = ""
        index_lobosvalidos = 0
        listadelobos()
    }else{
        let lobo1 =document.createElement("div");

        let imagem_exemplo = document.createElement("div");
    
        let fundo_azul = document.createElement("div");
    
        let link_foto = document.createElement("a")
        link_foto.href = "../ShowLobo/ShowLobo.html";
        link_foto.addEventListener("click", function() {
            let loboatualid = loboescolhido.id;
            localStorage.setItem("lobotemp", loboatualid);
            window.location.href = "ShowLobo.html"; 
        })
        
        let foto = document.createElement("img")
        if(loboescolhido.id%2===0){
            foto.src = "../images/loboexemplo2.png"  
        }else{
            foto.src = "../images/loboexemplo.png"
        }
        
        foto.alt = "Lobo na floresta"
    
        let texto_exemplo = document.createElement("div");
    
        let texto = document.createElement("div");
    
        let textodiv = document.createElement("div");
    
        let nome = document.createElement("h2");
        nome.innerText = loboescolhido.nome;
    
        let idade = document.createElement("p");
        idade.innerText = `Idade:${loboescolhido.idade}`;
    
        let botao = document.createElement("button");
        if( opcaoAtivada===true){
            botao.innerText = "Adotado";
            botao.addEventListener("click", function() {
                alert("Lobo já foi adotado!");
            });
    
        }else{
            botao.innerText = "Adotar";
            botao.addEventListener("click", function() {
                localStorage.setItem("lobotemp", loboescolhido.id);
                
                window.location.href = "../AdotarLobo/AdotarLobo.html"; 
            });
        }
        
    
        let descricao = document.createElement("p");
        descricao.innerText = loboescolhido.descricao;
    
        lobo1.classList.add("lobo1");
        imagem_exemplo.classList.add("imagem_exemplo");
        fundo_azul.classList.add("fundo_azul");
        foto.classList.add("imagem");
        texto_exemplo.classList.add("texto_exemplo");
        texto.classList.add("texto");
        nome.classList.add("nome");
        idade.classList.add("idade");
        if( opcaoAtivada===true){
            botao.classList.add("adotado_botao");
        }else{
            botao.classList.add("adotar_botao2");
        }
        descricao.classList.add("desc")
    
        link_foto.append(foto);
        imagem_exemplo.append(fundo_azul);
        imagem_exemplo.append(link_foto);
        
        textodiv.append(nome);
        textodiv.append(idade);
        texto.append(textodiv);
        texto.append(botao);
        texto_exemplo.append(texto);
        texto_exemplo.append(descricao);
    
        lobo1.append(imagem_exemplo);
        lobo1.append(texto_exemplo);
        let divexiste = document.querySelector(".lobo_exemplo");
        divexiste.appendChild(lobo1);
    
        let pesquisainputreset = document.querySelector(".pesquisa");
        pesquisainputreset.value = ""
    }
    
   

}

document.addEventListener("DOMContentLoaded", function() {
    listadelobos()
    listapaginas()
    //criarimagens()
});
document.getElementById("busca_botao").addEventListener("click", buscar);
document.getElementById("pesquisainput").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault(); 
        buscar()
    }
});
document.getElementById("avancar").addEventListener("click", avançar);
document.getElementById("voltar").addEventListener("click", voltar);


