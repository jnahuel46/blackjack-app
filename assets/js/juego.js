const myModule = (() => {
    'use strict'

    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'],
        especiales = ['A', 'J', 'Q', 'K'];

    let playerPoints = [];

    //REFERENCIAS DE HTML
    const btnRequest = document.querySelector('#btnRequest'),
        btnStop = document.querySelector('#btnStop'),
        btnNew = document.querySelector('#btnNew');

    const divPlayerCards = document.querySelectorAll('.divCards'),
        smalls = document.querySelectorAll('small');


    //Iniciar juego 
    const startGame = (numPlayers = 2) => {

        deck = createDeck();
        playerPoints = [];

        for (let i = 0; i < numPlayers; i++) {
            playerPoints.push(0);
        }

        smalls.forEach(elem => elem.innerText = 0);
        divPlayerCards.forEach(elem => elem.innerHTML = '');

        btnRequest.disabled = false;
        btnStop.disabled = false;



    };

    // Esta función crea un nuevo deck
    const createDeck = () => {
        deck = [];
        for (let i = 2; i <= 10; i++) {
            for (let tipo of tipos) {
                deck.push(i + tipo);
            }
        }
        for (let tipo of tipos) {
            for (let especial of especiales) {
                deck.push(especial + tipo);
            }
        }
        return _.shuffle(deck);
    }


    // Esta función me permite tomar una carta
    const requestCard = () => {
        if (deck.length === 0) {
            throw 'there are no more cards';
        }
        return deck.pop();
    }

    //validacion de carta y valor
    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1); //los if reducidos con el op ternario
        return (isNaN(valor)) ?
            (valor === 'A') ? 11 : 10
            : valor * 1;
        /*let puntos = 0;
        if (isNaN(valor)) {
            puntos = (valor ==='A') ? 11 : 10 ; //operador ternario
        } else {
            puntos = valor * 1;//multiplico por uno, para que el valor sea un numero y no un string 
        }*/
    };

    //acumular todos los puntos
    // turno 0=>1er jugador --- 1=>pc
    const accumulatePoints = (carta, turno) => {
        playerPoints[turno] = playerPoints[turno] + valorCarta(carta);
        smalls[turno].innerText = playerPoints[turno];
        return playerPoints[turno];
    };

    const createCard = (carta, turno) => {
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/cartas/${carta}.png`;
        imgCarta.className = 'carta';
        divPlayerCards[turno].append(imgCarta);
    };
    const determineWinner = () => {

        const [puntosMinimos, pointsComputer] = playerPoints;

        setTimeout(() => {
            if (pointsComputer === puntosMinimos) {
                alert('DRAW');
            } else if (puntosMinimos > 21) {
                alert('Computer Win');
            } else if (pointsComputer > 21) {
                alert('Player Win');
            } else {
                alert('Computer Win');
            }

        }, 100);
    }

    //TURNO DE LA PC
    const computerTurn = (puntosMinimos) => {

        let pointsComputer = 0;

        do {
            const carta = requestCard();
            pointsComputer = accumulatePoints(carta, playerPoints.length - 1);
            createCard(carta, playerPoints.length - 1);

        } while (
            (pointsComputer < puntosMinimos) && puntosMinimos <= 21
        );

        determineWinner();
    };

    //EVENTOS
    btnRequest.addEventListener('click', () => {

        const carta = requestCard();
        const pointsPlayerOne = accumulatePoints(carta, 0);//turno actual 0 porque es el del 1er player

        createCard(carta, 0);

        if (pointsPlayerOne > 21) {
            btnRequest.disabled = true;
            btnStop.disabled = true;
            computerTurn(pointsPlayerOne);

        } else if (pointsPlayerOne === 21) {
            btnRequest.disabled = true;
            btnStop.disabled = true;
            computerTurn(pointsPlayerOne);
        }
    });

    btnStop.addEventListener('click', () => {
        btnRequest.disabled = true;
        btnStop.disabled = true;

        computerTurn(playerPoints[0]);
    });

    /*btnNew.addEventListener('click', () => {
        startGame();
    });*/

    return {
        newGame: startGame
    };

})();


