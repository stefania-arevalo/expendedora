const citas = {
  1: 'Cena romántica, hoy podes elegir el menú',
  2: 'Podemos jugar a juegos de mesa, play, compu o del celu, vos elegis',
  3: 'Noche de Peliculas o series',
  4: 'Quedarse en casa y darnos amor',
  5: 'Picnic en una plaza o parque',
  6: 'Merienda dulce y rica en casa',
  7: 'Paseo por el lugar que vos elijas',
  8: 'Mirar las estrellas abrazados y mimandonos',
};

let citaActual = null;
const usadas = new Set();

function mostrarPantalla(id) {
  document.querySelectorAll('.pantalla').forEach(p => p.classList.remove('activa'));
  document.getElementById(id).classList.add('activa');
}

function mostrarCita(num) {
  if (usadas.has(num)) {
    mostrarMensajeEmergente('Esa cita ya fue usada, bebé ❤️');
    return;
  }

  citaActual = num;
  document.getElementById('mensajeUsado').innerText = '';
  mostrarPantalla('imprimiendo');

  setTimeout(() => {
    document.getElementById('contenidoCita').innerText = citas[num];
    mostrarPantalla('ticketFinal');
  }, 2000);
}


function guardarTicket() {
  html2canvas(document.getElementById('ticket')).then(canvas => {
    const link = document.createElement('a');
    link.download = 'ticket-cita.png';
    link.href = canvas.toDataURL();
    link.click();
  });
}

function marcarUsado() {
  if (citaActual !== null) {
    usadas.add(citaActual);
    const btn = document.getElementById(`btn-${citaActual}`);
    btn.classList.add('cita-usada');
    document.getElementById('mensajeUsado').innerText = '✅ ¡Cita marcada como realizada!';
    mostrarPantalla('inicio');
  }
}

function reiniciar() {
  document.getElementById('contenidoCita').innerText = '';
  document.getElementById('mensajeUsado').innerText = '';
  mostrarPantalla('inicio');
}

function restaurarCitas() {
  usadas.clear();
  for (let i = 1; i <= 8; i++) {
    const btn = document.getElementById(`btn-${i}`);
    btn.classList.remove('cita-usada');
  }
  document.getElementById('mensajeUsado').innerText = '';
}

function mostrarMensajeEmergente(texto) {
    const mensaje = document.getElementById('mensajeEmergente');
    mensaje.textContent = texto;
    mensaje.classList.add('mostrar');
  
    setTimeout(() => {
      mensaje.classList.remove('mostrar');
    }, 3000); // El mensaje desaparece luego de 3 segundos
  }
  