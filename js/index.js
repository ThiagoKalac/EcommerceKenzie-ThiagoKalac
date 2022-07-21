// ---------------------------------------
//  ||seleção da minha Vitrine(todos)||
// ---------------------------------------
let sectionVitrine = document.querySelector('.sectionPrincipal')
let ulProdutos = document.createElement('ul')

sectionVitrine.appendChild(ulProdutos)

// ---------------------------------------
//   ||função de listagem na Vitrine||
// ---------------------------------------
function listagemVitrine(arrProduto) {

    // limpando sessão, antes de listar
    ulProdutos.innerHTML = ""
    
    for (let i = 0; i < arrProduto.length; i++){
        // criação dos componetes dos cards
        let li            = document.createElement('li')
        let figure        = document.createElement('figure')
        let img           = document.createElement('img')
        let pCategoria    = document.createElement('p')
        let h3            = document.createElement('h3')
        let pDescription  = document.createElement('p') 
        let pValueProduct = document.createElement('p')    
        let button        = document.createElement('button')

        // atribuindo classes 
        li.classList.add('card')
        pCategoria.classList.add('categoria')
        h3.classList.add('title')
        pDescription.classList.add('description')
        pValueProduct.classList.add('valueProduct')
        button.classList.add('compra')
        button.setAttribute('id',arrProduto[i].id)

        // atribuindo valores aos componentes
        img.src                 = arrProduto[i].img
        img.alt                 = arrProduto[i].imgAlt
        pCategoria.innerText    = arrProduto[i].categoria
        h3.innerText            = arrProduto[i].nameItem
        pDescription.innerText  = arrProduto[i].description
        // esse metodo de formatação, peguei desse site, eu achei ele enquanto buscava métodos para formatação de dinheiro, procurava algo como fazer isso com algum metodo já conhecido e me deparei com três metodos, e um deles foi esse, achei mais simples e resolvi colocar aqui. https://www.blogson.com.br/formatar-moeda-dinheiro-com-javascript-do-jeito-facil/
        pValueProduct.innerText = arrProduto[i].value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })  
        button.innerText        = arrProduto[i].addCart
        
        // adicionando ao elemento pai
        figure.appendChild(img)
        li.appendChild(figure)
        li.appendChild(pCategoria)
        li.appendChild(h3)
        li.appendChild(pDescription)
        li.appendChild(pValueProduct)
        li.appendChild(button)
        
        ulProdutos.appendChild(li)

    }
}

listagemVitrine(data)
// ---------------------------------------
//    ||Aréa do Header do menu NAV||
// ---------------------------------------
let sectionTodos         = document.querySelector('.todos')
let sectionActionFigures = document.querySelector('.actionFigure')
let sectionCamisetas     = document.querySelector('.camisetas')
let sectionDecoracao     = document.querySelector('.decoracao')

sectionTodos.addEventListener('click', function () {
    listagemVitrine(data)
})


sectionActionFigures.addEventListener('click', function () {
    let arrRetorno = []
    for (let i = 0; i < data.length; i++){
        
        if (data[i].categoria == 'Action Figure') {
            arrRetorno.push(data[i])
        }
    }
    listagemVitrine(arrRetorno)
})

sectionCamisetas.addEventListener('click', function () {
    let arrRetorno = []
    for (let i = 0; i < data.length; i++){
        
        if (data[i].categoria == 'Camisetas') {
            arrRetorno.push(data[i])
        }
    }
    listagemVitrine(arrRetorno)
})

sectionDecoracao.addEventListener('click', function () {
    let arrRetorno = []
    for (let i = 0; i < data.length; i++){
        
        if (data[i].categoria == 'Decoração') {
            arrRetorno.push(data[i])
        }
    }
    listagemVitrine(arrRetorno)
})
// --------------------------------------
//             ||ILUMINAÇÃO||
//       ||Modo Noturno--Modo Dia||
// --------------------------------------

let iluminação = document.querySelector('header nav li img')

iluminação.addEventListener('click', function () {
    document.querySelector('body').classList.toggle('lightOff')
})



// --------------------------------------
//           ||Área de Busca||
// --------------------------------------
let inputBusca  = document.querySelector('.campoBusca input')
let buttonBusca = document.querySelector('.campoBusca button')

//pesquisa pelo teclado 
inputBusca .addEventListener('keyup', function (event) {

    if (event.keyCode == 13) {

        let valorBusca = inputBusca.value
        let retornoBusca = busca(valorBusca)
        listagemVitrine(retornoBusca)
     }  
    
})

// pesquisa pelo click
buttonBusca.addEventListener('click', function () {
        let valorBusca = inputBusca.value
        let retornoBusca = busca(valorBusca)
        listagemVitrine(retornoBusca)
})

function busca(valorBusca) {
    let retorno = []
    for (let i = 0; i < data.length; i++){

        let busca = valorBusca.toLowerCase()
        let nomeProduto = data[i].nameItem.toLocaleLowerCase()   
        let categoria = data[i].categoria.toLocaleLowerCase()            

        if (nomeProduto.includes(busca) || categoria.includes(busca)){
            retorno.push(data[i])       
        }
    }
    return retorno
}



// --------------------------------------
//   ||área de adicionar ao carrinho||
// ---------------------------------------
ulProdutos.addEventListener('click', interceptandoIdProduto)
let arrCarrinho = []

function interceptandoIdProduto(evento) {
    
    // interceptando botão
    let comprar = evento.target
    if (comprar.tagName == 'BUTTON') {
    //  Buscando produto pelo ID
        let idProduto = comprar.id
        data.find(function (produto) {
            if (produto.id == idProduto) {
                return arrCarrinho.push(produto)
            }
        })
      
       addCarinhoCompra(arrCarrinho)
       quantidadeItens(arrCarrinho) 
       soma(arrCarrinho) 
    }
}

let ulCompras = document.querySelector('.cardCarrinhoCompra')

// condição para quando o carrinho estiver vazio
if (ulCompras !== undefined) {
    let div = document.createElement('div')
    let h3  = document.createElement('h3')
    let img = document.createElement('img')
    let p = document.createElement('p')
    
    div.classList.add('carrinhoNull')
    h3.classList.add('carrinhoVazio')
    p.classList.add('carrinhoVazioAdicionarItens')
    
    h3.innerText = 'Carrinho Vazio'
    img.src      = 'img/carrinhoVazio.png'
    p.innerText  = 'Adicione itens'
   
    div.append(h3 , img , p)
    ulCompras.appendChild(div)

    

}



function addCarinhoCompra(arrProduto) {
          
       
    ulCompras.innerHTML = ""

    for (let i = 0; i < arrProduto.length; i++) {
     
        let li = document.createElement('li')
        let figure = document.createElement('figure')
        let img = document.createElement('img')
        let div = document.createElement('div')
        let h5 = document.createElement('h5')
        let p = document.createElement('p')
        let button = document.createElement('button')

        li.setAttribute('id',i)
        li.classList.add('cardCarrinhoCompra')
        img.src = arrProduto[i].img
        h5.innerText = arrProduto[i].nameItem
        p.innerText = arrProduto[i].value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
        button.innerText = 'Remover produto'
        button.setAttribute('id', arrProduto[i].id)
        

        figure.appendChild(img)
        div.appendChild(h5)
        div.appendChild(p)
        div.appendChild(button)
        li.appendChild(figure)
        li.appendChild(div)

        ulCompras.appendChild(li)
    }
     
}


// --------------------------------------
//   ||área de somar quantidade e valor||
// ---------------------------------------

let divTotal          = document.querySelector('.total')
let ul                = document.createElement('ul')
let liQuantidades     = document.createElement('li')
let liTotal           = document.createElement('li')
let pQuantidade       = document.createElement('p')
let pQuantidadeItens  = document.createElement('p')
let pTextTotal        = document.createElement('p')
let pTotal            = document.createElement('p')

pQuantidade.classList.add('quantidade')
pQuantidadeItens.classList.add('quantidadeItens')
pTextTotal.classList.add('textTotal')
pTotal.classList.add('totalValor')

pQuantidade.innerText = 'Quantidades:'
pTextTotal.innerText  = 'Total:' 

divTotal.appendChild(ul)
ul.append(liQuantidades , liTotal)
liQuantidades.append(pQuantidade , pQuantidadeItens)
liTotal.append(pTextTotal , pTotal)



function quantidadeItens(arrCarrinho) {
    
    divTotal.classList.remove('hidden')

    let quantidadeItens = document.querySelector('.quantidadeItens')  
    
    contador = 0
    for (let i = 0; i < arrCarrinho.length; i++){
        contador++
    }
    return quantidadeItens.innerText = contador

}


function soma(arrCarrinho){
   
    let total  = 0
    for (let i = 0; i < arrCarrinho.length; i++){

        total = arrCarrinho[i].value + total

    }
    // condição para mostrar o carrinho vazio    
    if (total == 0){
        divTotal.classList.add('hidden')
        let div = document.createElement('div')
        let h3  = document.createElement('h3')
        let img = document.createElement('img')
        let p = document.createElement('p')
    
        div.classList.add('carrinhoNull')
        h3.classList.add('carrinhoVazio')
        p.classList.add('carrinhoVazioAdicionarItens')
    
        h3.innerText = 'Carrinho Vazio'
        img.src      = 'img/carrinhoVazio.png'
        p.innerText  = 'Adicione itens'
   
        div.append(h3 , img , p)
        ulCompras.appendChild(div)
        
        // ulCompras.innerHTML = `<p class="carrinhoVazio">Carrinho Vazio</p>`
    }

    document.querySelector(".totalValor").innerText = total.toLocaleString('pt-BR',{style: 'currency', currency: 'BRL' })

}


// --------------------------------------
//       ||remover do carrinho||
// ---------------------------------------

ulCompras.addEventListener('click', removerCarrinho)


function removerCarrinho(evento) {

  
    let remove = evento.target
    if(remove.tagName == 'BUTTON'){
       
        remove = evento.target.closest('li')

        arrCarrinho.splice(remove.id, 1)

        addCarinhoCompra(arrCarrinho)
        quantidadeItens(arrCarrinho)
        soma(arrCarrinho)
    }
}


