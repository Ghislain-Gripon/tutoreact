import React from "react";
import { useState } from "react";

export default function Board() {
  const [player, setPlayer] = useState(true)
  const [board, setBoard] = useState(Array(9).fill(null))
  const players = {
    true : "X",
    false : "O"
  }
  let status
  let winner = [null, []]

  function handleOnClick(order) {
      if(board[order] == null && checkBoard(board)[0] == null)
      {
        const nextBoard = board.slice()
        nextBoard[order] = players[player]
        setBoard(nextBoard)
        setPlayer(!player)
      }
  }

  winner = checkBoard(board)
  if(winner[0])
  {
    status = <p className="winner">{winner[0]} wins !</p>
  }
  else
  {
    status = `It is ${players[player]}'s turn !`
  }

  return (
    <div>
      <div>
        <div className="board-row">
          <Square player={board[0]} onSquareClick={handleOnClick} order={0} alternateStyle={winner}/>
          <Square player={board[1]} onSquareClick={handleOnClick} order={1} alternateStyle={winner}/>
          <Square player={board[2]} onSquareClick={handleOnClick} order={2} alternateStyle={winner}/>
        </div>
        <div className="board-row">
          <Square player={board[3]} onSquareClick={handleOnClick} order={3} alternateStyle={winner}/>
          <Square player={board[4]} onSquareClick={handleOnClick} order={4} alternateStyle={winner}/>
          <Square player={board[5]} onSquareClick={handleOnClick} order={5} alternateStyle={winner}/>
        </div>
        <div className="board-row">
          <Square player={board[6]} onSquareClick={handleOnClick} order={6} alternateStyle={winner}/>
          <Square player={board[7]} onSquareClick={handleOnClick} order={7} alternateStyle={winner}/>
          <Square player={board[8]} onSquareClick={handleOnClick} order={8} alternateStyle={winner}/>
        </div>
      </div>
      <div>
        {status}
      </div>
  </div>
  );
}

function checkBoard(board) {
  let winner = [null, []]
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  
  for(let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if(board[a] && board[a] === board[b] && board[b] === board[c])
    {
      winner = [board[a], lines[i]]
    }
  }

  return winner
}

function Square({player, onSquareClick, order, alternateStyle}) {
  const style = alternateStyle[1].includes(order) ? "red-square" : "blue-square"
  const squareStyle = `square ${alternateStyle[0] ? style : ""}`
  return <button className={squareStyle} onClick={() => onSquareClick(order)}>{player}</button>
}
