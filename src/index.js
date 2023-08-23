import React, {useState} from "react";
import  ReactDOM  from "react-dom";

import './index.css'

const Square = (props) =>{

  return (
    <button class="Square" onClick={props.onClickEvent}>
      {props.value}
    </button>
  )
}

const Board = () =>{
  const initialSquares =  Array(9).fill(null);
  const [squares, setSquares] = useState(initialSquares);
  const [xIsNext, setXIsNext] = useState(true);

  const handleClieckEvent = (i) => {
    //1. make a copy of quare state array
    const newSquares = [...squares];

    const winnerDeclared = Boolean(calculateWiner(newSquares));
    const sqaureFilled = Boolean(newSquares[i]);
    if(winnerDeclared || sqaureFilled){
      return;
    }
    //2. mutate the copy, setting the i-th element to X
    newSquares[i] = xIsNext ? 'X' : 'O';
    //3. call the squares function whith the mutate copy
    setSquares(newSquares);
    setXIsNext(!xIsNext)
  }

  const renderSquare = (i) =>{
    return (
    <Square value={squares[i]}
    onClickEvent={() => handleClieckEvent(i)}
    />
    );
  };
  const winner = calculateWiner(squares);
  const status = winner ?
   `Winer: ${winner}` :
   `Next player: ${xIsNext ? 'X' : 'O'}`;
  return (
    <div class="containerBoard">
       <div class="status">{status}</div>
      <div class="board-row">
        {renderSquare(0)}{renderSquare(1)}{renderSquare(2)}
      </div>
      <div class="board-row">
        {renderSquare(3)}{renderSquare(4)}{renderSquare(5)}
      </div>
      <div class="board-row">
        {renderSquare(6)}{renderSquare(7)}{renderSquare(8)}
      </div>
    </div>
  )
}



const Game = () => {
  return (
    <div class="containerGame">
      <div class="title">TIC-TAC-TOE</div>
      <Board/>
    </div>
  );
};

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWiner(squares) {
  const lines = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,7], [2,4,6],
  ];

  for (let line of lines) {
    const [a,b,c] = line;

    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){

      return squares[a];
    }
  }
  return null;
}