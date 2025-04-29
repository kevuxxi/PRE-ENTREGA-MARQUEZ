// Arreglo para almacenar las respuestas
let respuestas = [];

// Función para pedir datos personales al usuario
function preguntas() {

    let nombre = '';
    let edad;
    let sexo;
    let religion = '';
    let equipoDeFutbol = '';


    while (nombre === '' || nombre === ' ') {
        nombre = prompt('Ingrese su nombre');
        if (nombre === '' || nombre === ' ') {
            alert('Ingrese un valor válido')
        } else if (isNaN(nombre) === false) {
            alert('Ingrese un valor válido')
        }
    }


    while (edad <= 0 || isNaN(edad)) {
        edad = Number(prompt('Ingrese su edad'));
        if (edad <= 0 || isNaN(edad)) {
            alert('Ingrese un valor válido')
        }
    }

    while (sexo !== 'masculino' && sexo !== 'femenino') {
        sexo = prompt('Ingrese su sexo (masculino o femenino)');
        if (sexo !== 'masculino' && sexo !== 'femenino') {
            alert('Ingrese un valor válido')
        }
    }


    while (religion === '' || religion === ' ') {
        religion = prompt('Ingrese su religión');
        if (religion === '' || religion === ' ') {
            alert('Ingrese un valor válido')
        } else if (isNaN(religion) === false) {
            alert('Ingrese un valor válido')
        }
    }


    while (equipoDeFutbol === '' || equipoDeFutbol === ' ') {
        equipoDeFutbol = prompt('Ingrese su equipo de fútbol');
        if (equipoDeFutbol === '' || equipoDeFutbol === ' ') {
            alert('Ingrese un valor válido')
        } else if (isNaN(equipoDeFutbol) === false) {
            alert('Ingrese un valor válido')
        }
    }

    return {
        Nombre: nombre,
        edad: edad,
        sexo: sexo,
        religion: religion,
        equipo: equipoDeFutbol
    };
}

// Función para confirmar la información
function confirmacion(persona) {
    let confirmar = '';

    do {

        alert(`Su información es:
- Nombre: ${persona.Nombre}
- Edad: ${persona.edad}
- Sexo: ${persona.sexo}
- Religión: ${persona.religion}
- Equipo de fútbol: ${persona.equipo}`);


        confirmar = prompt('¿La información es correcta? (si/no)').toLowerCase();


        if (confirmar === 'no') {
            alert('Por favor ingrese nuevamente sus datos.');
            persona = preguntas();
        } else if (confirmar !== 'si') {
            alert('Ingrese un valor válido ("si" o "no")');
        }

    } while (confirmar !== 'si');

    alert('Gracias por su tiempo.');
    return persona;
}

// Función para ejecutar el simulador
function ejecutar() {
    let persona = preguntas();
    persona = confirmacion(persona);
    respuestas.push(persona);
}

// Ejecutar simulador
ejecutar();

// Mostrar respuestas
console.log(respuestas);


