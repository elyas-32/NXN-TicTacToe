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
  winBy,
  setWinBy,
  ...props
}) {
  let cellFilled = board[cellIndex].val;
  function calculateGameStatus(arr) {
    checkWinner();
    function checkWinner() {
      for (let combo of calculateCombos(winBy)) {
        let winning = true;
        let firstValue = arr[combo[0]].val;
        if (firstValue === null) {
          winning = false;
        } else {
          for (let comboIndex of combo) {
            if (arr[comboIndex].val !== firstValue) {
              winning = false;
              break;
            }
          }
        }
        if (winning) {
          setWin("yes");
          return;
        }
      }
      checkDraw();
    }
    function calculateCombos(winByVal = 3) {
      let combos = [
        ...calculateRowCombos(winByVal),
        ...calculateColCombos(winByVal),
        ...calculateDiagonalCombosLTR(winByVal),
        ...calculateDiagonalCombosRTL(winByVal),
      ];
      console.log(combos);
      return combos;
    }
    function calculateStartIndexesLTR(winByVal = 3) {
      let startIndexes = [];
      for (let i = 0; i < size - (winByVal - 1); i++) {
        for (let j = 0; j < size - (winByVal - 1); j++) {
          startIndexes.push(i + j * size);
        }
      }
      return startIndexes;
    }
    function calculateStartIndexesRTL(winByVal = 3) {
      let startIndexes = [];
      for (let i = size - 1; i >= winByVal - 1; i--) {
        for (let j = 0; j < size - (winByVal - 1); j++) {
          startIndexes.push(i + j * size);
        }
      }
      return startIndexes;
    }
    function calculateDiagonalCombosRTL(winByVal = 3) {
      let winCombos = [];
      for (let startIndex of calculateStartIndexesRTL(winByVal)) {
        let winArr = [];
        for (let i = 0; i < winByVal; i++) {
          winArr.push(startIndex + (i * size - i));
        }
        winCombos.push(winArr);
      }
      return winCombos;
    }
    function calculateDiagonalCombosLTR(winByVal = 3) {
      let winCombos = [];
      for (let startIndex of calculateStartIndexesLTR(winByVal)) {
        let winArr = [];
        for (let i = 0; i < winByVal; i++) {
          winArr.push(startIndex + (i * size + i));
        }
        winCombos.push(winArr);
      }
      return winCombos;
    }
    function calculateColCombos(winByVal = 3) {
      let winCombos = [];
      for (let col = 0; col < size; col++) {
        for (let startIndex = 0; startIndex <= size - winByVal; startIndex++) {
          let combo = [];
          for (let step = 0; step < winByVal; step++) {
            combo.push(startIndex * size + step * size + col);
          }
          winCombos.push(combo);
        }
      }
      // console.log(winCombos);
      return winCombos;
    }
    function calculateRowCombos(winByVal = 3) {
      let winCombos = [];
      for (let row = 0; row < size; row++) {
        for (let startIndex = 0; startIndex <= size - winByVal; startIndex++) {
          let combo = [];
          for (let step = 0; step < winByVal; step++) {
            combo.push(size * row + startIndex + step);
          }
          winCombos.push(combo);
        }
      }
      // console.log("row", winCombos);
      return winCombos;
    }
    function checkDraw() {
      let draw = arr.every((data) => data.val !== null);
      draw && setWin("draw");
    }
  }
  function handleCellClick(ci, ev) {
    ev.stopPropagation();
    if (cellFilled === null && win === "no") {
      let nextboard = board.map((boardItem) => ({ ...boardItem }));
      let cellVal = turn ? "O" : "X";
      nextboard[ci].val = cellVal;
      setBoard(nextboard);
      setTurn(!turn);
      calculateGameStatus(nextboard);
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
      <span
        className={`text-${color}-600 transition-all ${
          cellFilled ? "scale-100" : "scale-0"
        }`}
      >
        {cell.val}
      </span>
    </div>
  );
}
