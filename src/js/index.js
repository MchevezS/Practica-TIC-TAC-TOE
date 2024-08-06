const jugador = true; 
const casillasV = document.getElementsByClassName("casillas")
const btnVJugarV = document.getElementById("btnVJugar")
const conteo = 0;
const ganoYa = false;
let ganadorFigura;



function movimientoUsuario(e) {
   let casillasvalue = e.target.innerHTML;
   if (!casillasvalue.length) {
        e.target.innerHTML = 'x';
        conteo = conteo+2
        jugador =! jugador;
         CheckLine(0,1,2);
         CheckLine(3,4,5);
         CheckLine(6,7,8); 
         CheckLine(1,4,7,);
         CheckLine(0,3,6); 
         CheckLine(0,4,8); 
         CheckLine(6,4,2); 
         CheckLine(2,5,8);
         
   }
   
   if (!ganoYa && !empate()) {
         maquina();    
   }
}
for (let index = 0; index < casillasV.length; index++) {
    casillasV[index].addEventListener('click', movimientoUsuario );
    
}

function CheckLine(c1, c2, c3) {
    if (casillasV[c1].innerHTML != "" && casillasV[c1].innerHTML === casillasV[c2].innerHTML && casillasV[c2].innerHTML === casillasV[c3].innerHTML) {
        ganadorFigura = casillasV[c1].innerHTML;
        ganador(casillasV[c1].innerHTML);
        ganoYa = true;
    }
} 

function ganador(player1) {
   if (document.querySelector('#Resultado').innerHTML = player1 + ' Has ganado👏🏻') {
     alert(document.querySelector('#Resultado').innerHTML = ganadorFigura + ' Felicidades has ganado🥳')
   } 
}

function empate() {
    let vacios = Array.from(casillasV).filter(estaVacio => estaVacio.innerHTML === "");
    
    if (vacios.length === 0 && !ganoYa) {
         alert ("EMPATE")
         return true;
    }
      return false;
}

function maquina() {
    let bombillo = true;
    while (bombillo) {
        let moverse = Math.floor(Math.random() * 9);

        if (casillasV[moverse].innerHTML == '') {
            casillasV[moverse].innerHTML = 'O';
            bombillo = false;
        }

        if (casillasV[moverse].innerHTML == '') {
            casillasV[moverse].innerHTML = 'x';
            bombillo = true;
        } 

        if (conteo > 8) {
            bombillo = false;
        }

    }
}





