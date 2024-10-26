import { BoardCell } from "./Board";
import React, { SetStateAction } from "react";
import { checkGameStatus } from "./utilities/functionality";
interface player {
  color: string;
  val: string;
}
interface cellProps {
  setBoard: React.Dispatch<SetStateAction<BoardCell[]>>;
  cellIndex: number;
  board: BoardCell[];
  size: number;
  player: player;
  setPlayer: React.Dispatch<SetStateAction<player>>;
  win: string;
  setWin: React.Dispatch<SetStateAction<string>>;
  cell : BoardCell;
  winBy : number;
  currentPlayers: player[];
}
export default function Cell({
  setBoard,
  cellIndex,
  board,
  size,
  player,
  setPlayer,
  win,
  setWin,
  cell,
  winBy,
  currentPlayers,
  ...props
}:cellProps) {
  let cellFilled = board[cellIndex].val;
  function findNextPlayerIndex() {
    let currentPlayerIndex = currentPlayers.findIndex((p) => {
      return p.val === player.val;
    });
    let nextPlayerIndex;
    if (currentPlayers.length - 1 < currentPlayerIndex + 1) {
      nextPlayerIndex = 0;
    } else {
      nextPlayerIndex = currentPlayerIndex + 1;
    }
    return nextPlayerIndex;
  }
  function handleCellClick(ci:number, ev:React.MouseEvent<HTMLElement>) {
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
        className={`transition-all duration-200 !leading-[0] inline-block ${
          cell.color
        } ${cellFilled ? "scale-100" : "scale-0"} ${
          size < 7
            ? "text-5xl"
            : size < 11
            ? "text-3xl"
            : size < 15
            ? "text-xl"
            : size < 20
            ? "text-sm"
            : size < 27
            ? "text-xs"
            : "text-[5px]"
        }`}
      >
        {cell.val}
      </span>
    </div>
  );
}
