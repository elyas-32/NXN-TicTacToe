import { useEffect, useRef, useState } from "react";
import { checkGameStatus, players } from "./utilities/functionality";
import Board from "./Board";
export default function TicTacToeApp() {
  const [playerCount, setPlayerCount] = useState(2);
  const [currentPlayers, setCurrentPlayers] = useState(
    calculateCurrentPlayers(playerCount)
  );
  const [size, setSize] = useState(3);
  const [winBy, setWinBy] = useState(3);
  const [board, setBoard] = useState(generateTemplateArr(size));
  const [player, setPlayer] = useState(
    currentPlayers[currentPlayers.length - 1]
  );
  const [win, setWin] = useState("no");
  function calculateCurrentPlayers(playersNumber = 2) {
    let current = [];
    for (let i = 0; i < playersNumber; i++) {
      current.push(players[i]);
    }
    return current;
  }
  function calculateLeftIndexes(col) {
    let leftIndexes = [];
    for (let i = 0; i < col; i++) {
      leftIndexes.push(col * i);
    }
    return leftIndexes;
  }
  function generateTemplateArr(sizeValue = 3) {
    const arr = [];
    for (let i = 0; i < sizeValue ** 2; i++) {
      arr.push({
        val: null,
        id: i + 1,
        borderStatus:
          i === 0
            ? "!border-t-0 !border-l-0"
            : i < sizeValue
            ? "!border-t-0"
            : calculateLeftIndexes(sizeValue).some((indx) => indx === i)
            ? "!border-l-0"
            : "border-2",
        color: "text-white",
        bgColor: "",
      });
    }
    return arr;
  }

  let winner = useRef();
  useEffect(() => {
    winner.current = player;
  }, [player]);
  function closeModal() {
    setWin("no");
    setPlayer(currentPlayers[currentPlayers.length - 1]);
    setBoard(generateTemplateArr(size));
  }
  function handleDocClick(e) {
    e.stopPropagation();
    if (e.target.name !== "modal") {
      closeModal();
    }
  }
  useEffect(() => {
    if (win === "yes" || win === "draw") {
      document.addEventListener("click", handleDocClick);
    }
    return () => {
      document.removeEventListener("click", handleDocClick);
    };
  }, [win]);
  let currentPlayer = currentPlayers.findIndex((p) => {
    return p.val === player.val;
  });
  let y;
  if (currentPlayers.length - 1 < currentPlayer + 1) {
    y = 0;
  } else {
    y = currentPlayer + 1;
  }
  console.log('running app compo');
  
  return (
    <div className="flex flex-col items-center relative text-white">
      <h2
        className={`font-semibold mb-5 transition-all ${
          win === "no" && winBy <= size ? "text-2xl" : "text-[0]"
        }`}
      >
        Player "{currentPlayers[y].val}" To Move
      </h2>
      <Board
        board={board}
        size={size}
        setBoard={setBoard}
        player={player}
        setPlayer={setPlayer}
        win={win}
        setWin={setWin}
        winBy={winBy}
        setWinBy={setWinBy}
        players={players}
        currentPlayers={currentPlayers}
        setCurrentPlayers={setCurrentPlayers}
      />
      <button
        className="border px-1 hover:bg-slate-900 font-bold mt-8 border-white rounded-lg"
        onClick={() => {
          setBoard(generateTemplateArr(size));
          setWin("no");
          setPlayer(currentPlayers[currentPlayers.length - 1])
        }}
      >
        reset
      </button>
      <label htmlFor="size">size :</label>
      <input
        className="border text-black"
        type="number"
        id="size"
        onChange={(e) => {
          setSize(e.target.value);
          setBoard(generateTemplateArr(e.target.value));
        }}
        value={size}
      />
      <label htmlFor="winRate">win by :</label>
      <input
        className="border text-black"
        type="number"
        id="winRate"
        onChange={(e) => {
          setWinBy(e.target.value);
        }}
        value={winBy}
      />
      <label htmlFor="playerCount">players :</label>
      <input
        className="border text-black"
        type="number"
        id="playerCount"
        onChange={(e) => {
          let inputVal = e.target.value;
          setPlayerCount(inputVal);
          console.log(inputVal);
          setCurrentPlayers(calculateCurrentPlayers(inputVal));
          setPlayer(
            calculateCurrentPlayers(inputVal)[
              calculateCurrentPlayers(inputVal).length - 1
            ].val
          );
          setBoard(generateTemplateArr(size));
        }}
        max={4}
        value={playerCount}
      />
    </div>
  );
}
