async function addLobo(){
  let nomeLobo = document.querySelector(".texto").value;
  let anosLobo = parseInt(document.querySelector(".numero").value);
  let urlLobo = document.querySelector(".url").value;
  let descricaoLobo = document.querySelector("#descricao").value;
  if(nomeLobo ==="" || anosLobo === "" || urlLobo ==="" || descricaoLobo ===""){
    alert("Dados incompletos para o cadastro")
    return;
  }
  const resposta =  await fetch("http://localhost:3000/lobos",{
    method:"GET",
    headers: {
        'Content-type': 'application/json',
    },
  })

  const lobos = await resposta.json()
  console.log(lobos)
  let idfinal=0;
  for ( i = 1; i <= lobos.length+1; i++) { 
    if (lobos.find(item => Number(item.id) === i)) { 
        continue;
    }else{
        idfinal = i;
        break;
    }
  }
  if(idfinal===0){
    alert("erro")
    return;
  }
  fetch('http://localhost:3000/lobos', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      id: idfinal.toString(),
      nome: nomeLobo,
      idade: anosLobo,
      descricao: descricaoLobo,
      imagem: urlLobo,
      adotado: false,
      nomeDono: null,
      idadeDono: null,
      emailDono: null,
    })
  })
  .then(response => response.json())
    .then(json => console.log(json))
  .catch(err => console.log(err))
  let nomereset = document.querySelector(".texto")
  let anosLoboreset = document.querySelector(".numero")
  let urlLoboreset= document.querySelector(".url")
  let descricaoLoboreset = document.querySelector("#descricao")
  nomereset.value = ""
  anosLoboreset.value = ""
  urlLoboreset.value = ""
  descricaoLoboreset.value = ""
  alert("Lobo adicionado!")
}
let salvar = document.querySelector("#salvar");
salvar.addEventListener("click", addLobo);

