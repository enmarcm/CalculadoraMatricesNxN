class GJ{
    constructor(sizeN){
        this.array = new Array()
        this.filas = sizeN
        this.columnas = sizeN + 1
        this.arrayPivote = new Array()
        this.j = 0
        this.pivote 
        this.valorACero
        this.arrayResultados = new Array()
        // this.array = [[2,4,8,12],[9,3,18,6],[10,5,15,40]]

        // Con esto creamos el array con las medidas requeridas y ademas lo lllenamos de cero
        for (let i = 0; i<this.filas; i++) {
            
            // En cada columna, se crea un array
            for(let j=0;j<this.columnas;j++) {
                this.array[i] = new Array()
                
                // Aqui, el array que acabamos de crear lo llenamos de ceros
                for(let j2=0;j2<this.columnas;j2++){
                    this.array[i].push(0)
                }

            }

        }
    }

    Llenar = (arrayPasado) =>{
        let nArrayPasado = arrayPasado.length

        for (let i = 0; i < this.filas; i++) {
            for (let j = 0; j < this.columnas; j++) {

                if(nArrayPasado > this.filas){                    
                    this.array[i][j] = arrayPasado[i]
                    j !== this.columnas-1 ? arrayPasado.shift() : false
                }else{
                    this.array = arrayPasado.slice()
                }
                
                // Si no ponemos esto (EL IF DE J ES DIFERENTE), en cada iteracion eliminara el ultimo elemento (que es el primero de la siguiente iteracion) y puden quedar valor undefined
                // es this.columnas-1 para guiarnos de que estamos basandonos en las iteraciones de este for, es lo equivalente a poner el "<"
            }
        }

    return this;
    }

    SacarUnos = () =>{
        for (let i = 0; i < this.filas; i++) {
            if(i === this.j){
                this.pivote = this.array[i][this.j]
    
                for (let l = 0; l < this.columnas; l++) {
                    this.array[i][l] /= this.pivote
                }
                this.arrayPivote = this.array[i].slice()
            }
        }
    }

    SacarCeros = () =>{
        for (let i = 0; i < this.filas; i++) {

            if(i!== this.j){
                this.valorACero = this.array[i][this.j]

                for (let k = 0; k < this.columnas; k++) {
                    this.array[i][k] = (-this.valorACero*this.arrayPivote[k]) + (this.array[i][k])
                }

            }

        }
        console.log(`ok`)
    }

    ArreglarCeros = () =>{
        for (let i = 0; i < this.filas; i++) {
            for (let j = 0; j < this.columnas; j++) {
                this.array[i][j] === -0 ? this.array[i][j] = 0 : false
            }
        }
    }

    GuardarResultados = () =>{
        for (let i = 0; i < this.filas; i++) {
            for (let j = 0; j < this.columnas; j++) {
                // Aqui va a saber que es la ultima columna de cada fila, luego, si es Nan, agregamos que es invalido, si no es Nan, guardamos el elemento en Number con dos decimales de redondeo

                if(j == this.columnas-1){
                    
                    if(isNaN(this.array[i][j]) || this.array[i][j] == Infinity){
                        this.array[i][j] = "Es invalido o tiene infinitas soluciones"
                        this.arrayResultados.push(this.array[i][j])
                    }else{
                        this.arrayResultados.push(Number(this.array[i][j].toFixed(3)))
                    }

                }

            }
        }
    }

    GaussJordan = () =>{
        for (this.j; this.j < this.columnas-1; this.j++){
            this.SacarUnos()
            this.SacarCeros()
        }
        this.ArreglarCeros()
        this.GuardarResultados()

        return this.arrayResultados
    }
    
}

export default GJ