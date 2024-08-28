let elitiCount = 0
let elitiItems = [ //Quantidade, Preço, Produção
    [0, 5, 1], //Mouses
    [0, 40, 10], //Henriques
    [0, 160, 70], //Computadores
    [0, 350, 120], //Escolas
    [0, 800, 200], //Cursos
    [0, 2000, 600], //Estagios
    [0, 9000, 1200], //SICREDIs
    [0, 20000, 4000], //SICOOBs
    [0, 40, 10]
]

function resetdata() { //remover depois
    elitiCount = 0
    elitiItems = [
        [0, 5, 1],
        [0, 40, 10],
        [0, 160, 70],
        [0, 350, 120],
        [0, 800, 200],
        [0, 2000, 600],
        [0, 9000, 1200],
        [0, 20000, 4000],
        [0, 40, 10]
    ]

    salvar()
    carregar()
    render()
} 

function formatarNumero(Numero) {
    Numero = Number(Numero)
    let NumeroString = ""

    if(Numero >= 100000000000000000000) {
        NumeroString = JSON.stringify(Numero / 1000000000000000000000).split(".")
        return NumeroString[0] + "." + NumeroString[1].charAt(0) + "Sx"
    }
    if(Numero >= 100000000000000000) {
        NumeroString = JSON.stringify(Numero / 1000000000000000000).split(".")
        return NumeroString[0] + "." + NumeroString[1].charAt(0) + "Qt"
    }
    if(Numero >= 100000000000000) {
        NumeroString = JSON.stringify(Numero / 1000000000000000).split(".")
        return NumeroString[0] + "." + NumeroString[1].charAt(0) + "Qd"
    }
    if(Numero >= 1000000000000) {
        NumeroString = JSON.stringify(Numero / 1000000000000).split(".")
        return NumeroString[0] + "." + NumeroString[1].charAt(0) + "T"
    }
    if(Numero >= 1000000000) {
        NumeroString = JSON.stringify(Numero / 1000000000).split(".")
        return NumeroString[0] + "." + NumeroString[1].charAt(0) + "B"
    }
    if(Numero >= 1000000) {
        NumeroString = JSON.stringify(Numero / 1000000).split(".")
        return NumeroString[0] + "." + NumeroString[1].charAt(0) + "M"
    }
    if(Numero >= 1000) {
        NumeroString = JSON.stringify(Numero / 1000).split(".")
        return NumeroString[0] + "." + NumeroString[1].charAt(0) + "K"
    }
    return Numero
}

function calcularPreco(Item) {
    if (elitiItems[Item][0] == 0) {
        return elitiItems[Item][1]
    }
    return ((Number(elitiItems[Item][0]) + 1) * Number(elitiItems[Item][1])) * 1.2
}

function elitisPS() {
    let Valor = 0

    elitiItems.forEach(function (Item) {
        Valor += Number(Item[0]) * Number(Item[2])
    })

    return Valor
}

function comprarItem(Item) {
    const custo = calcularPreco(Item)
    if (elitiCount >= custo) {
        elitiCount -= custo
        elitiItems[Item][0]++
    }

    render()
}

function elitiCountEvent(Valor) {
    elitiCount += Valor
    salvar()
    render()
}

function salvar() {
    localStorage.setItem("elitiCount", elitiCount)
    localStorage.setItem("elitiItems", JSON.stringify(elitiItems))
}

function carregar() {
    elitiCount = Number(localStorage.getItem("elitiCount"))

    if (elitiCount == null) { elitiCount = 0 }
    if (localStorage.getItem("elitiItems") !== null) { elitiItems = JSON.parse(localStorage.getItem("elitiItems")) }
}

function render() {
    document.querySelector("#Counter").innerHTML = formatarNumero(elitiCount) + " Elitianos"

    document.querySelector("#BuyMouses").innerHTML = "Comprar Mouses ($" + calcularPreco(0) + ") [" + elitiItems[0][0] + "]"
    document.querySelector("#BuyHenriques").innerHTML = "Comprar Henriques ($" + calcularPreco(1) + ") [" + elitiItems[1][0] + "]"
    document.querySelector("#BuyComputadores").innerHTML = "Comprar Computadores ($" + calcularPreco(2) + ") [" + elitiItems[2][0] + "]"
    document.querySelector("#BuyEscolas").innerHTML = "Comprar Escolas ($" + calcularPreco(3) + ") [" + elitiItems[3][0] + "]"
    document.querySelector("#BuyCursos").innerHTML = "Comprar Cursos ($" + calcularPreco(4) + ") [" + elitiItems[4][0] + "]"
    document.querySelector("#BuyEstagios").innerHTML = "Comprar Estagios ($" + calcularPreco(5) + ") [" + elitiItems[5][0] + "]"
    document.querySelector("#BuySICREDIs").innerHTML = "Comprar SICREDIs ($" + calcularPreco(6) + ") [" + elitiItems[6][0] + "]"
    document.querySelector("#BuySICOOBs").innerHTML = "Comprar SICOOBs ($" + calcularPreco(7) + ") [" + elitiItems[7][0] + "]" 
    


    document.querySelector("#PerSecond").innerHTML = elitisPS() + " E/ps"
}

setInterval(function() {elitiCountEvent(elitisPS())}, 1000)
window.onbeforeunload = () => { salvar() }

carregar()
render()