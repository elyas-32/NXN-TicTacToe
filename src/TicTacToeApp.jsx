import { useState } from "react";
import { players } from "./utilities/functionality";
import Board from "./Board";
import NumInput from "./NumInput";
export default function TicTacToeApp() {
  const [inputs, setInputs] = useState({ size: 3, winBy: 3, playerCount: 2 });
  const [currentPlayers, setCurrentPlayers] = useState(
    calculateCurrentPlayers(inputs.playerCount)
  );
  const [player, setPlayer] = useState(
    currentPlayers[currentPlayers.length - 1]
  );
  const [win, setWin] = useState("no");
  const [board, setBoard] = useState(generateTemplateArr(inputs.size));
  function calculateCurrentPlayers(playersNumber = 2) {
    let currentPlayers = [];
    for (let i = 0; i < playersNumber; i++) {
      currentPlayers.push(players[i]);
    }
    return currentPlayers;
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
            : sizeValue < 15
            ? "border-2"
            : "border",
        color: "text-white",
        bgColor: "",
      });
    }
    return arr;
  }
  function calculateMoveTurn() {
    let currentPlayerIndex = currentPlayers.findIndex((p) => {
      return p.val === player.val;
    });
    let y;
    if (currentPlayers.length - 1 < currentPlayerIndex + 1) {
      y = 0;
    } else {
      y = currentPlayerIndex + 1;
    }
    return y;
  }
  function updateGameByPlayerCount(inputValue) {
    setWin("no");
    setInputs({ ...inputs, playerCount: inputValue });
    setCurrentPlayers(calculateCurrentPlayers(inputValue));
    setPlayer(
      calculateCurrentPlayers(inputValue)[
        calculateCurrentPlayers(inputValue).length - 1
      ].val
    );
    setBoard(generateTemplateArr(inputs.size));
  }
  function minusNumInputHandler(target) {
    if (target === "playerCount") {
      if (inputs.playerCount !== 1) {
        // let inputVal = inputs.playerCount === 1 ? 1 : inputs.playerCount - 1;
        updateGameByPlayerCount(inputs.playerCount - 1);
      }
    } else if (target === "winBy") {
      if (inputs.winBy !== 1) {
        setInputs({ ...inputs, winBy: inputs.winBy - 1 });
      }
    } else {
      if (inputs.size !== 1) {
        let inputVal = inputs.size - 1;
        setBoard(generateTemplateArr(inputVal));
        setWin("no");
        setInputs({ ...inputs, size: inputVal });
        setPlayer(currentPlayers[currentPlayers.length - 1]);
      }
    }
  }
  function plusNumInputHandler(target) {
    if (target === "playerCount") {
      if (inputs.playerCount !== 4) {
        // let inputVal = inputs.playerCount === 4 ? 4 : inputs.playerCount + 1;
        updateGameByPlayerCount(inputs.playerCount + 1);
      }
    } else if (target === "winBy") {
      setInputs({ ...inputs, winBy: inputs.winBy + 1 });
    } else {
      setBoard(generateTemplateArr(inputs.size + 1));
      setWin("no");
      setInputs({ ...inputs, size: inputs.size + 1 });
      setPlayer(currentPlayers[currentPlayers.length - 1]);
    }
  }
  return (
    <div className="flex flex-col items-center text-white max-h-[100vh] h-[100vh] overflow-hidden">
      <h2 className={`font-semibold mb-5 transition-all my-7 text-4xl`}>
        {win === "no"
          ? `Player "${currentPlayers[calculateMoveTurn()].val}" To Move`
          : win === "draw"
          ? "draw"
          : `player "${player.val}" won`}
      </h2>
      <Board
        board={board}
        size={inputs.size}
        setBoard={setBoard}
        player={player}
        setPlayer={setPlayer}
        win={win}
        setWin={setWin}
        winBy={inputs.winBy}
        players={players}
        currentPlayers={currentPlayers}
        setCurrentPlayers={setCurrentPlayers}
      />
      <button
        className="border p-2 px-4 hover:bg-slate-900 border-white rounded-lg my-7"
        onClick={() => {
          setBoard(generateTemplateArr(inputs.size));
          setWin("no");
          setPlayer(currentPlayers[currentPlayers.length - 1]);
        }}
      >
        RESET
      </button>
      <div className="flex-col flex w-full min-[500px]:flex-row gap-5 mb-5 min-[500px]:justify-evenly items-center">
        <NumInput
          input={inputs.size}
          minusNumInputHandler={minusNumInputHandler}
          plusNumInputHandler={plusNumInputHandler}
          readOnly={true}
          title={"Size"}
          target={"size"}
        />
        <NumInput
          plusNumInputHandler={plusNumInputHandler}
          minusNumInputHandler={minusNumInputHandler}
          readOnly={true}
          title={`Win By ${inputs.winBy} In a Row`}
          input={inputs.winBy}
          target={"winBy"}
        />
        <NumInput
          readOnly={true}
          target={"playerCount"}
          input={inputs.playerCount}
          title={"Player Count"}
          plusNumInputHandler={plusNumInputHandler}
          minusNumInputHandler={minusNumInputHandler}
        />
      </div>
    </div>
  );
}
