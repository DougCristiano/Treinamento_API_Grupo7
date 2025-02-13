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
    document.querySelector(".lobo_exemplo").innerHTML = ""; 
    index_lobosvalidos = 0;
    listadelobos();
});

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
    let lobovalido = listaSelecionada[index_lobosvalidos];
    index_lobosvalidos++;
    
    return lobovalido;
}

async function listadelobos(){
    for(i=0;i<4;i++){
        
        let lobo1=0;
        let lobo2=0;
        if(i%2==0){   
            
            let lobodalista = await pegarid();
            

            lobo1 =document.createElement("div");
            let imagem_exemplo = document.createElement("div");
            let fundo_azul = document.createElement("div");
            let link_foto = document.createElement("a")
            link_foto.href = "../ShowLobo/ShowLobo.html";
            link_foto.addEventListener("click", async function() {
                
                const respotalink = await fetch('http://localhost:3000/lobosExtras', {
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
                  const data = await respotalink.json();
                  alert(data)
                window.location.href = "ShowLobo.html"; 
                
            })           
            let foto = document.createElement("img")
            foto.src = "../images/loboexemplo.png"
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
        }else{
            let lobodalista2 = await pegarid();

           

            lobo2 =document.createElement("div");

            let imagem_exemplo2 = document.createElement("div");

            let fundo_azul2 = document.createElement("div");

            let link_foto2 = document.createElement("a")
            link_foto2.href = "../ShowLobo/ShowLobo.html";
            link_foto2.addEventListener("click", async function() {
                const respostalink2 = await fetch('http://localhost:3000/lobosExtras', {
                    method: 'POST',
                    headers: {
                      'Content-type': 'application/json',
                    },
                    body: JSON.stringify({
                      id: lobodalista.id,
                      nome: lobodalista2.nome,
                      idade: lobodalista2.idade,
                      descricao: lobodalista2.descricao,
                      imagem: lobodalista2.i,imagem,
                      adotado: lobodalista2.adotado,
                      nomeDono: lobodalista2.nomeDono,
                      idadeDono: lobodalista2.idadeDono,
                      emailDono: lobodalista2.emailDono,
                    })
                  })
                  const data = await respostalink2.json()
                window.location.href = "ShowLobo.html"; 
            })
            
            
            let foto2 = document.createElement("img")
            foto2.src = "../images/loboexemplo2.png"
            foto2.alt = "Lobo na floresta"

            let texto_exemplo2 = document.createElement("div");

            let texto2 = document.createElement("div");

            let textodiv2 = document.createElement("div");

            let nome2 = document.createElement("h2");
            nome2.innerText = lobodalista2.nome;

            let idade2 = document.createElement("p");
            idade2.innerText = `Idade:${lobodalista2.idade}`;

            let botao2 = document.createElement("button");

            if( opcaoAtivada===true){
                botao2.innerText = "Adotado";
                botao2.addEventListener("click", function() {
                alert("Lobo já foi adotado!");
                });

            }else{
                botao2.innerText = "Adotar";
                botao2.addEventListener("click", function() {
                    localStorage.setItem("lobotemp", lobodalista2.id);
                    window.location.href = "../AdotarLobo/AdotarLobo.html"; 

                });
            }
            let descricao2 = document.createElement("p");
            descricao2.innerText = lobodalista2.descricao;

            lobo2.classList.add("lobo2");
            imagem_exemplo2.classList.add("imagem_exemplo2");
            fundo_azul2.classList.add("fundo_azul2");
            foto2.classList.add("imagem2");
            texto_exemplo2.classList.add("texto_exemplo2");
            texto2.classList.add("texto2");
            nome2.classList.add("nome2");
            idade2.classList.add("idade2");
            if( opcaoAtivada===true){
                botao2.classList.add("adotado_botao");
            }else{
                botao2.classList.add("adotar_botao2");
            }

            
            descricao2.classList.add("desc2")

            link_foto2.append(foto2);
            imagem_exemplo2.append(fundo_azul2);
            imagem_exemplo2.append(link_foto2);
            
            textodiv2.append(nome2);
            textodiv2.append(idade2);
            texto2.append(textodiv2);
            texto2.append(botao2);
            texto_exemplo2.append(texto2);
            texto_exemplo2.append(descricao2);

            lobo2.append(imagem_exemplo2);
            lobo2.append(texto_exemplo2);

        }
        if(i%2==0){
            let divexiste = document.querySelector(".lobo_exemplo");
            divexiste.appendChild(lobo1);
        }else{
            let divexiste = document.querySelector(".lobo_exemplo");
            divexiste.appendChild(lobo2);
        }

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
            //localStorage.setItem("lobotemp", loboatualid);
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
                //localStorage.setItem("lobotemp", loboescolhido.id);
                
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
    
    listapaginas();
    listadelobos();
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

