// Baraja de cartas
const palos = ['Corazón rojo', 'Brillo rojo', 'Corazón negro', 'Trébol negro'];
const valores = ['As', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
let cartas = [];
let cartaActual = 0;

// Función para barajar las cartas
function barajarCartas() {
  cartas = [];
  cartaActual = 0;
  for (const palo of palos) {
    for (const valor of valores) {
      cartas.push(`${palo}: ${valor}`);
    }
  }
  for (let i = cartas.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = cartas[i];
    cartas[i] = cartas[j];
    cartas[j] = temp;
  }
}

// Función para obtener la siguiente carta
function obtenerCarta() {
  const carta = cartas[cartaActual];
  cartaActual++;
  return carta;
}

// Función para calcular puntos de una mano
function calcularPuntos(cartas) {
  let puntos = 0;
  for (const carta of cartas) {
    const valor = carta.split(': ')[1];
    puntos += valor === 'As' ? 1 : valor === 'J' || valor === 'Q' || valor === 'K' ? 10 : parseInt(valor);
  }
  return puntos;
}

// Función para pedir una carta adicional
function pedirCarta() {
  if (cartaActual >= cartas.length) {
    alert('No quedan cartas en la baraja.');
    return;
  }

  const carta = obtenerCarta();
  const cartasJugador = document.getElementById('cartasJugador').textContent.split(', ');
  cartasJugador.push(carta);

  let cartasJugadorTexto = '';
  for (let i = 0; i < cartasJugador.length; i++) {
    if (i !== 0) {
      cartasJugadorTexto += ', ';
    }
    cartasJugadorTexto += cartasJugador[i];
  }

  document.getElementById('cartasJugador').textContent = cartasJugadorTexto;
  const puntosJugador = calcularPuntos(cartasJugador);
  document.getElementById('puntosJugador').textContent = puntosJugador;

  if (puntosJugador > 21) {
    alert('¡Jugador se pasa de 21! Máquina gana.');
    finalizarJuego();
  }
}

// Función para finalizar el juego
function finalizarJuego() {
  const puntosJugador = parseInt(document.getElementById('puntosJugador').textContent);
  const puntosMaquina = parseInt(document.getElementById('puntosMaquina').textContent);

  let ganador = '';

  if (puntosJugador === 21 || (puntosJugador < 21 && (puntosMaquina > 21 || puntosJugador > puntosMaquina))) {
    ganador = '¡Jugador gana!';
  } else if (puntosMaquina === 21 || (puntosMaquina < 21 && (puntosJugador > 21 || puntosMaquina > puntosJugador))) {
    ganador = '¡Máquina gana!';
  } else {
    ganador = 'Empate';
  }

  document.getElementById('ganador').textContent = ganador;
}

// Manejadores de eventos
document.getElementById('empezarBtn').addEventListener('click', function () {
  barajarCartas();
  const cartasJugador = [obtenerCarta(), obtenerCarta()];
  const cartasMaquina = [obtenerCarta(), obtenerCarta()];

  let cartasJugadorTexto = '';
  for (let i = 0; i < cartasJugador.length; i++) {
    if (i !== 0) {
      cartasJugadorTexto += ', ';
    }
    cartasJugadorTexto += cartasJugador[i];
  }

  document.getElementById('cartasJugador').textContent = cartasJugadorTexto;
  document.getElementById('puntosJugador').textContent = calcularPuntos(cartasJugador);

  document.getElementById('cartasMaquina').textContent = cartasMaquina[0];
  document.getElementById('puntosMaquina').textContent = calcularPuntos([cartasMaquina[0]]);
});

document.getElementById('pedirCartaBtn').addEventListener('click', pedirCarta);
document.getElementById('finalizarBtn').addEventListener('click', finalizarJuego);
