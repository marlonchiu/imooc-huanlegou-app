import { useState } from 'react'
import Board from './Board'
import History from './History'

// 通过区块内内容，计算谁是赢家
function calcWinner(squares) {
  const winConditions = [
    // 三行
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // 三列
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // 对角线
    [0, 4, 8],
    [2, 4, 6]
  ]
  for (let i = 0; i < winConditions.length; i++) {
    const winCondition = winConditions[i]
    const [a, b, c] = winCondition
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }

  const filledSquares = squares.filter((item) => item === 'X' || item === 'O')
  if (filledSquares.length === 9) {
    return 'Nobody'
  }

  return null
}
function Game() {
  const [squares, setSquares] = useState(Array(9).fill(null))
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [winner, setWinner] = useState(undefined)

  // 是否已经存在胜利者
  if (!winner) {
    const result = calcWinner(squares)
    result && setWinner(result)
  }

  const handleChangeSquare = (newSquares) => {
    setSquares(newSquares)
    setHistory([...history, newSquares])
  }

  const handleChangeHistory = (index) => {
    const newSquares = history[index]
    setSquares(newSquares)
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={squares} winner={winner} onChange={handleChangeSquare} />
      </div>
      <div className="game-history">{winner ? <History history={history} onChange={handleChangeHistory} /> : null}</div>
    </div>
  )
}

export default Game
