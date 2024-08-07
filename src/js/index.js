// Variables para controlar el juego
let jugador = true; 
const casillasV = document.getElementsByClassName("casillas");
let ganoYa = false;
let conteo = 0;
let ganadorFigura;

// Funcion que maneja el movimiento del usuario
function movimientoUsuario(e) {
   if (e.target.innerHTML === '') {
        e.target.innerHTML = 'x';
        conteo++;
        jugador = !jugador;

        // Verifica posibles líneas ganadoras
        CheckLine(0,1,2);
        CheckLine(3,4,5);
        CheckLine(6,7,8); 
        CheckLine(0,3,6); 
        CheckLine(1,4,7);
        CheckLine(2,5,8);
        CheckLine(0,4,8); 
        CheckLine(6,4,2); 

        // Si no hay ganador, la maquina hace su movimiento
        if (!ganoYa && !empate()) {
            maquina();    
        }
   }
}

// Añadi un evento de click a cada casilla para manejar el movimiento del usuario
Array.from(casillasV).forEach(casilla => casilla.addEventListener('click', movimientoUsuario));

// Funcion que verifica si hay una linea ganadora
function CheckLine(c1, c2, c3) {
    if (casillasV[c1].innerHTML !== "" && casillasV[c1].innerHTML === casillasV[c2].innerHTML && casillasV[c2].innerHTML === casillasV[c3].innerHTML) {
        ganadorFigura = casillasV[c1].innerHTML;
        ganador(ganadorFigura);
        ganoYa = true;
    }
} 

// Funcion que muestra el mensaje de ganador
function ganador(player1) {
    document.querySelector('#Resultado').innerHTML = '${player1} Has ganado👏🏻';
    alert('${player1} Felicidades has ganado🥳');
}

// Funcion que verifica si el juego ha terminado en empate
function empate() {
    const vacios = Array.from(casillasV).filter(estaVacio => estaVacio.innerHTML === "");
    
    if (vacios.length === 0 && !ganoYa) {
         alert ("EMPATE");
         return true;
    }
    return false;
}

// Funcion que realiza el movimiento de la máquina
function maquina() {
    let movValido = false;

    while (!movValido) {
        let moverse = Math.floor(Math.random() * 9);

        if (casillasV[moverse].innerHTML === '') {
            casillasV[moverse].innerHTML = 'O';
            movValido = true;
            conteo++;
            jugador = !jugador;

            // Verifica posibles lineas ganadoras despues del movimiento de la maquina
            CheckLine(0,1,2);
            CheckLine(3,4,5);
            CheckLine(6,7,8); 
            CheckLine(0,3,6); 
            CheckLine(1,4,7);
            CheckLine(2,5,8);
            CheckLine(0,4,8); 
            CheckLine(6,4,2); 
        }
    }

    // Despues del movimiento de la maquina, verifica si el juego ha terminado en empate
    if (!ganoYa) {
        empate();
    }
}




