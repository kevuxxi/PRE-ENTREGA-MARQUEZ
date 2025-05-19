let numerosecreto = Math.floor(Math.random() * 100) + 1;
let adivinar = document.getElementById('adivinar');
let number = document.getElementById('number');
let resultado = document.getElementById('resultado');
let reset = document.getElementById('reset');
let intentos = [];
let contador = 0;
let restantes = 10;
let record = localStorage.getItem('record');
let intentosprevios = document.getElementById('intentos');

// Muestra el récord actual al iniciar, si existe
function recordactual() {
    if (record !== null) {
        resultado.innerHTML = `<p>Récord actual: ${record} intentos</p>`;
    }
};
recordactual();

// Evento cuando se hace clic en el botón "adivinar"
adivinar.addEventListener('click', function () {


    let numero = parseInt(number.value);
    if (isNaN(numero) || numero < 1 || numero > 100) {
        resultado.innerHTML = '<p>ingrese un numero valido</p>';
        return;
    }

    intentos.push(numero);
    contador += 1;
    restantes -= 1;
    intentosprevios.innerHTML = `<p> usaste anteriormente : ${intentos.join(', ')}`

    if (numero === numerosecreto) {
        resultado.innerHTML += `<p>Correcto, Lo adivinaste en ${contador} intentos </p><p>Haz ganado</p>`;
        adivinar.disabled = true;
        if (record === null || contador < parseInt(record)) {
            localStorage.setItem('record', contador);
            record = contador;
            resultado.innerHTML += `<p> Nuevo récord: ${contador} intentos</p>`;
        } else {
            resultado.innerHTML += `<p>Récord actual: ${record} intentos</p>`;
            return;
        }

        return;
    }

    if (restantes === 0) {
        resultado.innerHTML = `<p>Has perdido. El número era ${numerosecreto}</p>`;
        adivinar.disabled = true;
        return;
    }



    if (numero < numerosecreto) {
        resultado.innerHTML += `<p>Muy bajo te quedan ${restantes} intentos</p>`;


    } else if (numero > numerosecreto) {
        resultado.innerHTML += `<p>Muy alto te quedan ${restantes} intentos</p>`;

    }


});


// Función para reiniciar el juego al hacer clic en el botón "Reset"
function reiniciar() {
    reset.addEventListener('click', function () {
        number.value = '';
        resultado.innerHTML = '';
        numerosecreto = Math.floor(Math.random() * 100) + 1;
        intentos = [];
        contador = 0;
        restantes = 10;
        adivinar.disabled = false;
        intentosprevios.innerHTML = '';
        record = localStorage.getItem('record');
        recordactual();
    })
};
reiniciar(); // Se llama para activar el evento del botón reset

