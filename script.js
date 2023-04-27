let intentos= 6;
//establezco una palabra por defecto, luego se reemplaza por una palabra aleatoria obtenida de la API.
let palabra = 'IPHONE'; 
const API = "https://random-word-api.vercel.app/api?words=5&length=6&type=uppercase";

//realizo una solicitud a la API de palabras aleatorias utilizando la función fetch(). 
//Si la solicitud se realizo de forma correcta, se convierte la respuesta en un objeto JSON 
//y se asigna la primera palabra obtenida de la respuesta a la variable palabra. 
fetch(API).then(response=>response.json()).
then(response=> {
    console.log(response[0]);
    palabra=response[0].toUpperCase();
    console.log(palabra)
})
.catch(err=>{
    console.log("Hubo un problema");
})

//Se selecciona el botón de adivinanza que es guess-button y le agrego un evento click. 
//Cuando el usuario hace clic en el botón, se llama a la función intentar().
const BOTON= document.getElementById('guess-button');
BOTON.addEventListener('click', intentar);

//Lee el valor del campo de entrada que es guess-input y lo convierto en mayúsculas antes de devolver.
function leerIntento(){
    let intento= document.getElementById('guess-input').value;
    return intento.toUpperCase();
}


//La función se llama cada vez que el usuario hace clic en el botón de intentar. 
//Primero llama a leerIntento() para obtener la palabra que ingreso el usuario. 
//Para cada letra en el intento del usuario, se compara con la letra correspondiente en la palabra objetivo. 
//Si las letras coinciden, se establece el color de fondo del span correspondiente en verde. 
//Si la letra existe en la palabra objetivo pero no está en la posición correcta, se establece el color de 
//fondo del span correspondiente en amarillo. 
//Si la letra no existe en la palabra objetivo, se establece el color de fondo del span correspondiente en gris.
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
    //Se reduce la variable intentos en 1 y se comprueba si el usuario ha adivinado la palabra. 
    //Si la adivinó, se llama a la función terminar() con un mensaje de felicitación. 
    //Si no, se comprueba si el número de intentos restantes es 0. Si es 0, se llama a la función terminar() 
    //con un mensaje de fracaso.
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

//La función terminar() se llama cuando el juego termina, ya sea porque el usuario adivinó la palabra o porque se 
//quedó sin intentos. Deshabilita el campo de entrada y el botón de adivinanza y muestra un mensaje de éxito o 
//fracaso en el elemento guesses.
function terminar(mensaje){
    const INPUT = document.getElementById("guess-input");
    INPUT.disabled = true;
    BOTON.disabled = true;
    let contenedor = document.getElementById('guesses');
    contenedor.innerHTML = mensaje;
}