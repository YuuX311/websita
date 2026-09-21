const tarjetas = document.querySelectorAll('.tarjeta');
const btnAtras = document.getElementById('atras');
const btnSiguiente = document.getElementById('siguiente');

const DURACION = 600;  // milisegundos, igual que el CSS (0.4s)
let actual = 0;        // índice de la tarjeta que se ve ahora
let ocupado = false;   // true mientras hay una transición en curso

tarjetas[0].classList.add('activa', 'visible');

function irA(nuevo) {
  // Guardias: si algo no cuadra, no hacemos nada
  if (ocupado) return;                         // ya hay una transición
  if (nuevo < 0 || nuevo >= tarjetas.length) return;  // no existe esa tarjeta

  ocupado = true;  // ponemos el candado

  const saliente = tarjetas[actual];
  const entrante = tarjetas[nuevo];

  // 1. La tarjeta actual empieza a desvanecerse
  saliente.classList.remove('visible');

  // 2. Esperamos a que termine el desvanecimiento
  setTimeout(() => {
    saliente.classList.remove('activa');   // ahora sí, se oculta del todo
    entrante.classList.add('activa');      // la nueva entra al diseño (opacity 0)

    void entrante.offsetWidth;             // truco: forzar al navegador a "notarlo"

    entrante.classList.add('visible');     // la nueva se desvanece hacia adentro

    actual = nuevo;                        // actualizamos la memoria
    actualizarBotones();

    // 3. Quitamos el candado cuando termina la entrada
    setTimeout(() => { ocupado = false; }, DURACION);
  }, DURACION);
}

btnSiguiente.addEventListener('click', () => irA(actual + 1));
btnAtras.addEventListener('click', () => irA(actual - 1));

function actualizarBotones() {
  btnAtras.disabled = (actual === 0);
  btnSiguiente.disabled = (actual === tarjetas.length - 1);
}

actualizarBotones();  // llamarla una vez al inicio

