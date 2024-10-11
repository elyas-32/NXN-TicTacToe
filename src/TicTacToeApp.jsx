import { useEffect, useRef, useState } from "react";
import Board from "./Board";
import Modal from "./Modal";
export default function TicTacToeApp() {
  const [size, setSize] = useState(3);
  const templateArr = generateTemplateArr(size);
  const [board, setBoard] = useState(templateArr);
  const [turn, setTurn] = useState(false);
  const [win, setWin] = useState('no');
  function calculateLeftIndexes(col) {
    let leftIndexes = [];
    for (let i = 0; i < col; i++) {
      leftIndexes.push(col * i)
    }
    return leftIndexes;
  }
  function generateTemplateArr(col) {
    const arr = [];
    for (let i = 0; i < col ** 2; i++) {
      arr.push({
        val: null,
        id: i + 1,
        borderStatus:
        i === 0 ? '!border-t-0 !border-l-0':
        i < col ? "!border-t-0" :
        calculateLeftIndexes(col).some(indx=>indx === i)  ? '!border-l-0' :
        'border-2'
      });
    }
    return arr;
  }
  console.log(templateArr);
  let winner = useRef();
  useEffect(() => {
    winner.current = turn;
  }, [turn]);
  function closeModal() {
    setWin(false);
    setTurn(false);
    setBoard(templateArr);
  }
  function handleDocClick(e) {
    e.stopPropagation();
    if (e.target.name !== "modal") {
      closeModal();
    } else if (e.target.name === "closeBtn") {
      closeModal();
    }
  }
  useEffect(() => {
    if (win === 'yes' || win === 'draw') {
      document.addEventListener("click", handleDocClick);
    }
    return () => {
      document.removeEventListener("click", handleDocClick);
    };
  }, [win]);
  return (
    <div className="flex flex-col items-center relative">
      {/* <Modal win={win} winner={winner} /> */}
      <h2
        className={`font-semibold text-2xl mb-5 transition-opacity ${
          win ? "opacity-0" : "opacity-100"
        }`}
      >
        Player "{turn ? "O" : "X"}" To Move
      </h2>
      <Board
        board={board}
        size={size}
        setBoard={setBoard}
        turn={turn}
        setTurn={setTurn}
        win={win}
        setWin={setWin}
      />
      <input type="number" onChange={(e)=>{setSize(e.target.value);setBoard(generateTemplateArr(e.target.value))}} value={size}/>
    </div>
  );
}
