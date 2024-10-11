import { useRef, useState } from "react";

export default function Cell({
  setBoard,
  cellIndex,
  board,
  size,
  turn,
  setTurn,
  win,
  setWin,
  setDraw,
  cell,
  ...props
}) {
  let cellFilled = board[cellIndex].val;
  function findWinner(arr) {
    // let flatArr = arr.reduce((acc, row) => acc.concat(row.data), []);
    // let winningCombinations = [
    //   [0, 1, 2],
    //   [3, 4, 5],
    //   [6, 7, 8],
    //   [0, 3, 6],
    //   [1, 4, 7],
    //   [2, 5, 8],
    //   [0, 4, 8],
    //   [2, 4, 6],
    // ];
    // for (let combo of winningCombinations) {
    //   let [a, b, c] = combo;
    //   if (
    //     flatArr[a].val !== null &&
    //     flatArr[a].val === flatArr[b].val &&
    //     flatArr[a].val === flatArr[c].val
    //   ) {
    //     setWin(true);
    //     return;
    //   }
    // }

  let winComboRow = [];
  for(let i = 0 ; i < size ; i++) {
    console.log('from',i * size);
    console.log('untill',((size * (i + 1))-2)-1) ;
    console.log('parent loop  ');
    for(let j = size*i ; j < (size * (i+1))-2 ; i++) {
    //   winComboRow.push(j, j+1, j+2);

    console.log(j, ((size * (i+1))-2)-1);
    if(i === 100) {return}
    // return
    }
  }
  
  if(!win) {
    let draw = arr.every(data=>data.val !== null)
    draw && setWin('draw');
  }
  }
  function handleCellClick(ci, ev) {
    ev.stopPropagation();
    if (cellFilled === null && win === 'no') {
      let nextboard = board.map((boardItem) => ({...boardItem}));      
      let cellVal = turn ? "O" : "X";
      nextboard[ci].val = cellVal;
      setBoard(nextboard);
      setTurn(!turn);
      findWinner(nextboard);
    }
  }
  let color;
  if (cell.val === "X") {
    color = "red";
  } else if (cell.val === "O") {
    color = "blue";
  }


  return (
    <div
      className={`flex justify-center items-center font-bold leading-[0] text-2xl hover:bg-gray-100 cursor-pointer ${cell.borderStatus}`}
      onClick={(e) => {
        handleCellClick(cellIndex, e);
      }}
    >
      <span className={`text-${color}-600 transition-all ${cellFilled ? 'scale-100' : 'scale-0'}`}>{cell.val}</span>
    </div>
  );
}
