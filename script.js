let elitiCount = 0
let elitiItems = [ //Quantidade, Preço, Produção
    [0, 5, 1], //Mouses
    [0, 40, 10]] //Camisas


function elitisPS() {
    let Valor = 0

    elitiItems.forEach(function (Item) {
        Valor += Number(Item[0]) * Number(Item[2])
    })

    return Valor
}

function comprarItem(Item) {
    const custo = (Number(elitiItems[Item][0]) + 1) * Number(elitiItems[Item][1])
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
}

function carregar() {
    elitiCount = Number(localStorage.getItem("elitiCount"))

    if (elitiCount == null) { elitiCount = 0 }
}

function render() {
    document.querySelector("#Counter").innerHTML = elitiCount + " Elitianos"

    document.querySelector("#BuyMouses").innerHTML = "Comprar Mouses ($" + (Number(elitiItems[0][0]) + 1) * Number(elitiItems[0][1]) + ") [" + elitiItems[0][0] + "]"
    document.querySelector("#BuyHenriques").innerHTML = "Comprar Henriques ($" + (Number(elitiItems[1][0]) + 1) * Number(elitiItems[1][1]) + ") [" + elitiItems[1][0] + "]"

    document.querySelector("#PerSecond").innerHTML = elitisPS() + " E/ps"
}

setInterval(function() {elitiCountEvent(elitisPS())}, 1000)
window.onbeforeunload = () => { salvar() }

carregar()
render()