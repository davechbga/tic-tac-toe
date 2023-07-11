import { useState } from "react"
import confetti from "canvas-confetti"
import { Square } from "./components/Square"
import { TURNS } from "./constants"
import { checkWinnerFrom, checkEndGame } from "./logic/board"
import { WinnerModal } from "./components/WinnerModal"
// declaro las constantes de los turnos


function App() {
  // me guardo el estado del tablero
  const [board, setBoard] = useState(Array(9).fill(null))
  // me guardo el estado del turno
  const [turn, setTurn] = useState(TURNS.X)
  // me guardo el estado del ganador
  const [winner, setWinner] = useState(null)
  // me guardo el estado del empate


  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }



  const updateBoard = (index) => {
    // si el cuadrado ya tiene un valor o si ya hay un ganador, no hago nada
    if (board[index] || winner) return
    // si no, actualizo el tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    // actualizo el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    // actualizo el ganador
    const newWinner = checkWinnerFrom(newBoard)
    // si hay ganador
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }


  return (
    <main className="board">
      <h1>Tic tac toe</h1>

      <button onClick={resetGame}>
        <svg viewBox="0 0 16 16" class="bi bi-arrow-repeat" fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"></path>
          <path d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z" fill-rule="evenodd"></path>
        </svg>
        Reiniciar el juego
      </button>
      <section className="game">
        {
          board.map((_, index) => {
            return (
              <Square key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {board[index]}


              </Square>
            )
          })
        }
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner}></WinnerModal>

    </main>
  )
}

export default App
