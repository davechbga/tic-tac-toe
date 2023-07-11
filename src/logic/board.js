import { WINNER_COMBOS } from '../constants'

export const checkWinnerFrom = (boardToCheck) => {
    // recorro el array de combinaciones ganadoras
    for (const combo of WINNER_COMBOS) {
        // desestructuro el array de combinaciones ganadoras
        const [a, b, c] = combo
        // si hay ganador
        if (boardToCheck[a] && boardToCheck[a] === boardToCheck[b] && boardToCheck[a] === boardToCheck[c]) {
            return boardToCheck[a]
        }
    }
    // si no hay ganador
    return null
}

export const checkEndGame = (newBoard) => {
    // si todos los cuadrados tienen un valor, es empate
    return newBoard.every((square) => square !== null)
}