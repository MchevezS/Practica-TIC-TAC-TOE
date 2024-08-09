// Variables para controlar el juego
let jugador = true; 
const casillasV = document.getElementsByClassName("casillas");
let ganoYa = false;
let conteo = 0;
let ganadorFigura;
let btnVJugar = document.getElementById("btnVJugar");
let contadorX = document.getElementById("contadorX");
let contadorO = document.getElementById("contadorO");
const eliminarMarcador = document.getElementById("eliminarMarcador")
// Inicializar contadores desde el localStorage o en 0 si no existen
let victoriasX = localStorage.getItem("victoriasX") ? parseInt(localStorage.getItem("victoriasX")) : 0;
let victoriasO = localStorage.getItem("victoriasO") ? parseInt(localStorage.getItem("victoriasO")) : 0;

// Actualizar los contadores en pantalla
contadorX.innerText = victoriasX;
contadorO.innerText = victoriasO;

// Funcion que maneja el movimiento del usuario
function movimientoUsuario(e) {
   if (e.target.innerHTML === '') {
        e.target.innerHTML = '❌';
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
        Array.from(casillasV).forEach(casilla => casilla.addEventListener('click', ()=>{   //Si hay ganador No dejara que el jugador siga marcando, tiene que reiniciar la partida
            alert("Porfavor Reiniciar la partida")
        }));
    }
} 

// Funcion que muestra el mensaje de ganador
function ganador(player1) {
    document.querySelector('#Resultado').innerHTML = player1 + ' Haz ganado👏🏻';
    alert(`Felicidades ${player1} haz ganado 🥳`)
    if (player1 === "❌") {
        victoriasX++;
        localStorage.setItem("victoriasX", victoriasX);
        contadorX.innerText = victoriasX;
    } else {
        victoriasO++;
        localStorage.setItem("victoriasO", victoriasO);
        contadorO.innerText = victoriasO;
    }
    Array.from(casillasV).forEach(casilla => casilla.removeEventListener('click', movimientoUsuario));
    
}

 // Añadí el evento click al boton eliminar para que se reiniciara el marcador.
eliminarMarcador.addEventListener("click", ()=>{
    victoriasX = 0
    victoriasO = 0
  contadorO.innerHTML=0
  contadorX.innerHTML=0
  localStorage.clear()
})

// Funcion que verifica si el juego ha terminado en empate
function empate() {
    const vacios = Array.from(casillasV).filter(estaVacio => estaVacio.innerHTML === "");
    
    if (vacios.length === 0 && !ganoYa) {
         alert (" EMPATE :) ");
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
            casillasV[moverse].innerHTML = '⭕';
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

btnVJugar.addEventListener('click', ()=>{
    window.location.href=window.location.href     // Al terminar la partida se reiniciara el juego

})


