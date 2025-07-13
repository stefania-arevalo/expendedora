const citas = {
  1: 'Cena italiana romántica',
  2: 'Podemos juegos de mesa, play, compu o del celu',
  3: 'Noche de Películas o series',
  4: 'Quedarse en casa y darnos amor',
  5: 'Picnic sorpresa en la plaza',
  6: 'Merienda dulce en casa',
  7: 'Paseo por el lugar que vos elijas',
  8: 'Mirar las estrellas abrazados',
};

let citaActual = null;
let usadas = new Set(JSON.parse(localStorage.getItem('citasUsadas')) || []);

// Muestra pantalla activa
function mostrarPantalla(id) {
  document.querySelectorAll('.pantalla').forEach(p => p.classList.remove('activa'));
  document.getElementById(id).classList.add('activa');
}

// Muestra cita elegida
function mostrarCita(num) {
  if (usadas.has(num)) {
    mostrarMensajeEmergente('Esa cita ya fue usada, bebé ❤️');
    return;
  }

  citaActual = num;
  mostrarPantalla('imprimiendo');

  setTimeout(() => {
    document.getElementById('contenidoCita').innerText = citas[num];
    document.getElementById('mensajeUsado').innerText = '';
    mostrarPantalla('ticketFinal');
  }, 2000);
}

// Guardar ticket como imagen
function guardarTicket() {
  html2canvas(document.getElementById('ticket')).then(canvas => {
    const link = document.createElement('a');
    link.download = 'ticket-cita.png';
    link.href = canvas.toDataURL();
    link.click();
  });
}

// Marca como usada y guarda en localStorage
function marcarUsado() {
  if (citaActual !== null) {
    usadas.add(citaActual);
    localStorage.setItem('citasUsadas', JSON.stringify(Array.from(usadas)));

    const boton = document.getElementById(`btn-${citaActual}`);
    if (boton) boton.classList.add('cita-usada');

    document.getElementById('mensajeUsado').innerText = '✅ ¡Cita marcada como realizada!';
    mostrarPantalla('inicio');
  }
}

// Reiniciar a pantalla principal
function reiniciar() {
  document.getElementById('contenidoCita').innerText = '';
  document.getElementById('mensajeUsado').innerText = '';
  mostrarPantalla('inicio');
}

// Restaurar todas las citas (borrar localStorage)
function restaurarCitas() {
  usadas.clear();
  localStorage.removeItem('citasUsadas');

  for (let i = 1; i <= 8; i++) {
    const boton = document.getElementById(`btn-${i}`);
    if (boton) boton.classList.remove('cita-usada');
  }
}

// Mostrar mensaje emergente lindo
function mostrarMensajeEmergente(texto) {
  const mensaje = document.createElement('div');
  mensaje.className = 'mensaje-emergente mostrar';
  mensaje.innerText = texto;
  document.body.appendChild(mensaje);

  setTimeout(() => {
    mensaje.remove();
  }, 3000);
}

// ✅ AL INICIO: Marcar citas usadas si existen en localStorage
window.addEventListener('DOMContentLoaded', () => {
  usadas.forEach(num => {
    const boton = document.getElementById(`btn-${num}`);
    if (boton) boton.classList.add('cita-usada');
  });
});
