import { useRef, useState } from "react";

export default function TableCell({
  rowID,
  setTableArr,
  data,
  rowIndex,
  cellIndex,
  tableArr,
  turn,
  setTurn,
  win,
  setWin,
  setDraw,
  ...props
}) {
  let cellFilled = tableArr[rowIndex].data[cellIndex].val;
  function findWinner(arr) {
    let flatArr = arr.reduce((acc, row) => acc.concat(row.data), []);
    let winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let combo of winningCombinations) {
      let [a, b, c] = combo;
      if (
        flatArr[a].val !== null &&
        flatArr[a].val === flatArr[b].val &&
        flatArr[a].val === flatArr[c].val
      ) {
        setWin(true);
        return;
      }
    }
      
  if(!win) {
    let draw = flatArr.every(data=>data.val !== null)
    draw && setDraw(true);
  }
  }

  function handleCellClick(ri, ci, ev) {
    ev.stopPropagation();
    if (cellFilled === null && !win) {
      let nextTableArr = tableArr.map((tableArrItem) => ({
        ...tableArrItem,
        data: tableArrItem.data.map((dataItem) => ({ ...dataItem })),
      }));
      let cellVal = turn ? "O" : "X";
      nextTableArr[ri].data[ci].val = cellVal;
      setTableArr(nextTableArr);
      setTurn(!turn);
      findWinner(nextTableArr);
    }
  }
  // console.log(data.val);
  let color;
  if (data.val === "X") {
    color = "red";
  } else if (data.val === "O") {
    color = "blue";
  }
  console.log(color);
  

  return (
    <td
      className={`border-2 text-center font-bold text-2xl text-${color}-600 border-black size-12 hover:bg-gray-200 ${
        cellFilled !== null || win ? "cursor-not-allowed" : "cursor-pointer"
      }`}
      onClick={(e) => {
        handleCellClick(rowIndex, cellIndex, e);
      }}
    >
      {data.val}
    </td>
  );
}
