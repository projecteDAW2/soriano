

let valorValido = 0;
let valorAcertado = 0;
let statusRobot = false;
let intentos = 3;
const controller = new AbortController();

const frasesPistas = [
    " Una variable simple es un contenidor on s’emmagatzemen dades senzilles ",
    " Un operador et permet fer funcions matemátiques als programes",
    " Una variable complexa es un contenidor on s’emmagatzemen variables senzilles ",
    " Un prototip es el equivalent a una clase heredada, en comptes de modificar la clase original, es modifica una cópia de la mateixa. ",
    " Github es un servei públic en el que es pot emmagatzemar aplicacions de forma lliure per a que tot el món pugui accedir ",
    " L'experiència d'aprendre un llenguatge de programació ens permet aprendre altres molt més rápid. "
]


function cargarDatos(){

    document.getElementById("intentosRestantes").innerHTML = "Pistas : " + intentos;
    const zero = parseInt(0);
    const arrayvalores = [1,1,1,1,zero,zero,zero,2,2,3];

    for (i = 1; i <=5; i++){
        for (i2 = 1; i2 <=5; i2++){


            let valor = Math.floor(Math.random() * 10);

            document.getElementById("row" + i + "column" + i2).innerHTML = arrayvalores[valor];



        }





    }

    for (i = 1 ; i <=5; i++){
        for (i2 = 1; i2 <=5; i2++){


            
        let valor = parseInt(document.getElementById("row" + i + "column" + i2).innerHTML);
        if (valor === 0){
            let valorFila = parseInt(document.getElementById("row" + i + "column" + 6 + "gameOver").innerHTML);
            let valorColumna = parseInt(document.getElementById("row" + 6 + "column" + i2 + "gameOver").innerHTML);
            let valorTotalFila = valorFila + 1;
            let valorTotalColumna = valorColumna + 1;
            document.getElementById("row" + i + "column" + 6 + "gameOver").innerHTML = valorTotalFila;
            document.getElementById("row" + 6 + "column" + i2 + "gameOver").innerHTML = valorTotalColumna;

        }
        else {
            let valorFila = parseInt(document.getElementById("row" + i + "column" + 6 + "number").innerHTML);
            let valorColumna = parseInt(document.getElementById("row" + 6 + "column" + i2 + "number").innerHTML);
            let valorTotalFila = valorFila + valor;
            let valorTotalColumna = valorColumna + valor;
            document.getElementById("row" + i + "column" + 6 + "number").innerHTML = valorTotalFila;
            document.getElementById("row" + 6 + "column" + i2 + "number").innerHTML = valorTotalColumna;
            

            if (valor !== 1){
                
                valorValido += 1;

            }

        }

        }


    }

        let modalInicio = new bootstrap.Modal(document.getElementById('modalInicio'), {
        keyboard: false
        });

        modalInicio.toggle();




    

};


// FUNCIONES AL CLICAR EN CADA PANEL

let cajas = document.querySelectorAll('.celdaVoltorb');

for (const caja of cajas) {
    caja.addEventListener('click', function(){


        let filaColumna = caja.id;
        let valor = calculoFilaColumna(filaColumna);

        if (statusRobot === false) {
            
        
            if (!caja.classList.contains("animacioMoviment")){

                
                comprobarResultadoCasilla(filaColumna,valor);  

            }
            


        }
        else if (valor === 0) {


            renovarPista();
            document.getElementById("dibujo").setAttribute('src', 'media/webApp/muñeco/AnimacionPeligro.gif');
            intentos = intentos - 1;
            document.getElementById("intentosRestantes").innerHTML = "Pistas : " + intentos;
            statusRobot = false;
            setTimeout(contadorPista,3000);

        }
        else {

            renovarPista();
            document.getElementById("dibujo").setAttribute('src', './media/webApp/muñeco/AnimacionAcierto.gif');
            intentos = intentos - 1;
            document.getElementById("intentosRestantes").innerHTML = "Pistas : " + intentos;
            statusRobot = false;
            setTimeout(contadorPista,3000);
        }
            
        
    });
}

function calculoFilaColumna(filaColumna){  
    return parseInt(document.getElementById("" + filaColumna).innerHTML);
};

function mover (filaColumna, i) {
    document.getElementById("" + filaColumna).style.textIndent = i + "%";  
            
    
};

function contadorPista (){
    

    document.getElementById("dibujo").setAttribute('src', './media/webApp/muñeco/Normal.png');
    


}

function comprobarResultadoCasilla(filaColumna, valor){

    document.getElementById("" + filaColumna).classList.add("animacioMoviment");
    document.getElementById(filaColumna).disabled;

    switch (valor){
        case 1:
            

            break;


        case 2:
        case 3:
            valorAcertado += 1;

            if (valorAcertado === valorValido){
                document.getElementById("textModal").innerHTML = "Has Ganado!";
            
                let myModal = new bootstrap.Modal(document.getElementById('modalResultado'), {
                        keyboard: false
                });
                    
                myModal.toggle();
            }
            break;
        case 0:
            document.getElementById("textModal").innerHTML = "Has Perdido!";
            
            let myModal = new bootstrap.Modal(document.getElementById('modalResultado'), {
                    keyboard: false
            });
                
            myModal.toggle();
                
            break;
        default:
            alert("Error.");



    }             


}


//Una vez acabe el juego, dirigirse a otra página

document.getElementById("btnJugarDeNuevo").addEventListener("click", function(){

    location.reload();


    
},false); 

document.getElementById("btnSortir").addEventListener("click", function(){

    location.href='../../frontend/games.php'



    
},false);

document.getElementById("ayudaJuego").addEventListener("click", function(){

    let myModal = new bootstrap.Modal(document.getElementById('modalAyuda'), {
        keyboard: false
    });

    myModal.toggle();
})


document.getElementById("pistaRobot").addEventListener("click", function(){


    if (intentos != 0){
        if (statusRobot === false){
        document.getElementById("dibujo").setAttribute('src', './media/webApp/muñeco/Pensando.gif');
        statusRobot = true;
        }
        else {
            document.getElementById("dibujo").setAttribute('src', './media/webApp/muñeco/Normal.png');
            statusRobot = false;
        }

    }
    else {
        document.getElementById("dibujo").setAttribute('src', './media/webApp/muñeco/AnimacionError.gif');
    }

    

},false);

function renovarPista (){

    let numeroPistas = frasesPistas.length;

    let pistaAleatoria = Math.floor(Math.random() * numeroPistas);
    
    document.getElementById("pistas").innerHTML = frasesPistas[pistaAleatoria];
}
