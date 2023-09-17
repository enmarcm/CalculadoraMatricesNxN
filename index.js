import GaussJordan from "../GJ.js";

let containerInputs = document.querySelector(".containerInputs")
let containerResultados = document.querySelector(".item-2")
let tablaResultados = document.querySelector(".resultadosContainer")
let botonAgregar = document.querySelector(".addInput")
let botonRestar = document.querySelector(".restInput")
let botonCalcular = document.querySelector(".calcular")
let valorN

window.addEventListener("load", ()=>{
    agregarORestarFilas(null, true)
    containerResultados.style.display = "none"
})

botonAgregar.addEventListener("click", () => agregarORestarFilas(true))
botonRestar.addEventListener("click", () => agregarORestarFilas(false))

botonCalcular.addEventListener("click", ()=>{
    let valores = ResolverGJ()
    MostrarResultados(valores)
})



const agregarORestarFilas = (parametro, inicio) =>{
    containerResultados.style.display = "none"
    // Este si recibe true, es que esta agregando, si recibe false esta restando


    parametro ? valorN++ : 
        valorN == 2 ? valorN = 2 : valorN--

    inicio ? valorN = 2 : false

    containerInputs.style.gridTemplateColumns = `repeat(${valorN+1}, 70px)`
    containerInputs.style.gridTemplateRows = `repeat(${valorN}, 1fr)`

    document.querySelectorAll(".valor").forEach(element => {
        element.remove()
    });

    let inputsArray = []
    for (let i = 0; i < valorN; i++) {
        for (let j = 0; j < valorN+1; j++) {
            let inputNuevo = document.createElement("input")
            
            if(j===valorN){
                inputNuevo.placeholder = `X${i+1}`; 
                inputNuevo.style.backgroundColor = "#40CFFF"
             }else inputNuevo.placeholder = `X${i+1}${j+1}`

            inputsArray.push(inputNuevo)
        }
    }

    inputsArray.forEach(e=>{
        e.classList.add("valor")
        containerInputs.appendChild(e)
    })
}

const obtenerValores = () =>{
    let cadaValor = document.querySelectorAll(".valor")
    let arrayValores = []

    cadaValor.forEach(e=>{

        if(e.value == ""){
            arrayValores.push(0)
        }else if(isNaN(e.value)){
            console.error("Uno de los valores ingresados no corresponde a un numero")
            
            e.style.backgroundColor = "#dc3545"
        }else{
            e.style.backgroundColor = "field"
            arrayValores.push(Number(e.value))
        }
        
    })

    return arrayValores
}

const ResolverGJ =() =>{
    let GJ = new GaussJordan(valorN)
    // La funcion obtenerValores nos devuelve un array con los elementos a agregar

    return GJ.Llenar(obtenerValores()).GaussJordan()
}


const MostrarResultados = (resultados) =>{
    document.querySelectorAll(".resultado").forEach(e=>e.remove())
    containerResultados.style.display = "block"

    resultados.forEach((e,i)=>{
        let fila = document.createElement("tr")
        fila.classList.add("resultado")
        let columna1 = document.createElement("td")
        let columna2 = document.createElement("td")

        columna1.innerHTML = `X<span class="indice">${i+1}</span>`
        columna2.innerHTML = `${e}`

        fila.appendChild(columna1)
        fila.appendChild(columna2)
        tablaResultados.appendChild(fila)

    })
}



