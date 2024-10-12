import { useRef, useState } from "react";
import { checkGameStatus } from "./utilities/functionality";
export default function Cell({
  setBoard,
  cellIndex,
  board,
  size,
  player,
  setPlayer,
  win,
  setWin,
  setDraw,
  cell,
  winBy,
  setWinBy,
  players,
  currentPlayers,
  setCurrentPlayers,
  ...props
}) {
  let cellFilled = board[cellIndex].val;
  function findNextPlayerIndex() {
    let x = currentPlayers.findIndex(p=>{
      return p.val=== player;
    })
    console.log('this is x', x);
    
    let y;
    if(currentPlayers.length - 1 < x + 1) {
      console.log('assigning zero');
      y = 0;
    } else {
      y = x+1;
    }
    console.log('next player index : ',y);
    return y;
  }
  function handleCellClick(ci, ev) {
    ev.stopPropagation();
    if (cellFilled === null && win === "no") {
      let nextboard = board.map((boardItem) => ({ ...boardItem }));
      // let cellVal = player ? 'O' : 'X';
      let cellVal = currentPlayers[findNextPlayerIndex()].val;
      nextboard[ci].val = cellVal;
      setBoard(nextboard);
      setPlayer(cellVal);
      checkGameStatus(nextboard, winBy, size, setWin);
    }
  }
  let color;
  if (cell.val === "X") {
    color = "red";
  } else if (cell.val === "O") {
    color = "blue";
  }
  console.log(player);
  
  return (
    <div
      className={`flex justify-center items-center font-bold leading-[0] text-2xl hover:bg-[#0d0d22] cursor-pointer ${cell.borderStatus}`}
      onClick={(e) => {
        handleCellClick(cellIndex, e);
      }}
    >
      <span
        className={`text-white transition-all duration-200 ease-myTransitionFunc ${
          cellFilled ? "scale-100" : "scale-0"
        }`}
      >
        {cell.val}
      </span>
      {/* <img className="size-12" src='./players/circle-svgrepo-com.svg' alt=""/> */}
    </div>
  );
}
