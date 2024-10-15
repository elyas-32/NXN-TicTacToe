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
    let x = currentPlayers.findIndex((p) => {
      return p.val === player.val;
    });
    let y;
    if (currentPlayers.length - 1 < x + 1) {
      y = 0;
    } else {
      y = x + 1;
    }
    return y;
  }
  // const [isWinIndex, setIsWinIndex] = useState(false);
  function handleCellClick(ci, ev) {
    ev.stopPropagation();
    if (cellFilled === null && win === "no") {
      let nextPlayer = currentPlayers[findNextPlayerIndex()];
      let nextboard = board.map((boardItem) => ({ ...boardItem }));
      nextboard[cellIndex].val = nextPlayer.val;
      nextboard[cellIndex].color = nextPlayer.color;
      setPlayer(nextPlayer);
      let combo = checkGameStatus(nextboard, winBy, size, setWin);
      if (combo) {
        for (let i = 0; i < board.length; i++) {
          for (let com of combo) {
            if (i === com) {
              nextboard[i].bgColor = "bg-slate-600 win-shadow";
            }
          }
        }
      }
      setBoard(nextboard);
    }
  }
  return (
    <div
      className={`flex justify-center items-center overflow-hidden font-bold grow-0 shrink-0 transition-[background] duration-700 hover:bg-[#0d0d22] cursor-pointer ${cell.bgColor} ${cell.borderStatus}`}
      onClick={(e) => {
        handleCellClick(cellIndex, e);
      }}
    >
      <span
        className={`transition-all duration-200 !leading-[0] inline-block ${cell.color} ${
          cellFilled ? "scale-100" : "scale-0"
        } ${
          size < 7 ? 'text-5xl' : 
          size < 11 ? 'text-3xl' :
          size < 15 ? 'text-xl' :
          size < 20 ? 'text-sm' : 
          size < 27 ? 'text-xs' : 'text-[5px]'

        }`}
      >
        {cell.val}
      </span>
    </div>
  );
}
