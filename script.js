let intentos= 6;
//establezco una palabra por defecto, luego se reemplaza por una palabra aleatoria obtenida de la API.
let palabra = 'IPHONE'; 
const API = "https://random-word-api.vercel.app/api?words=5&length=6&type=uppercase";

//realizo una solicitud a la API de palabras aleatorias utilizando la función fetch(). 
fetch(API).then(response=>response.json()).
then(response=> {
    console.log(response[0]);
    palabra=response[0].toUpperCase();
    console.log(palabra)
})
.catch(err=>{
    console.log("Hubo un problema");
})

const BOTON= document.getElementById('guess-button');
BOTON.addEventListener('click', intentar);

//Lee el valor del campo de entrada que es guess-input y lo convierto en mayúsculas antes de devolver.
function leerIntento(){
    let intento= document.getElementById('guess-input').value;
    return intento.toUpperCase();
}

function intentar(){
    const INTENTO = leerIntento();
    const GRID = document.getElementById("grid");
    const ROW = document.createElement('div');
    ROW.className = 'row';
    for (let i in palabra){
        const SPAN = document.createElement('span');
        SPAN.className = 'letter';
        if (INTENTO[i]===palabra[i]){ //VERDE
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = 'green';
        } else if( palabra.includes(INTENTO[i]) ) { //AMARILLO
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = 'yellow';
        } else {      //GRIS
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = 'grey';
        }
        ROW.appendChild(SPAN)
    }
    //Después de crear la fila completa, se agrega al contenedor principal (grid).
    GRID.appendChild(ROW)
    
    intentos--
    if(INTENTO=== palabra){
        terminar("<h1> Felicidades! Haz adivinado :D</h1>");
        return INTENTO
    }
    if (intentos==0){
        terminar("<h1> OH! Haz perdido... </h1>")
    }
    return
}

function terminar(mensaje){
    const INPUT = document.getElementById("guess-input");
    INPUT.disabled = true;
    BOTON.disabled = true;
    let contenedor = document.getElementById('guesses');
    contenedor.innerHTML = mensaje;
}
