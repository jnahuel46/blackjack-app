//c= clubs=trebol
//d=diamonds
//h=hearth
//s=spades

let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];


const createDeck = () => {
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
    deck = _.shuffle(deck);
    console.log(deck);
    return deck;
}

createDeck();

const pedirCarta = () => {

    if (deck.length === 0) {
        throw 'no hay mas cartas'

    }
    const carta = deck.pop();
    console.log(deck);
    console.log(carta);
    return carta;
}

pedirCarta();