import { useEffect, useImperativeHandle, useRef, useState } from "react";
import { checkGameStatus, players } from "./utilities/functionality";
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
            : sizeValue < 15
            ? "border-2"
            : "border",
        color: "text-white",
        bgColor: "",
      });
    }
    return arr;
  }

  let winner = useRef();
  useEffect(() => {
    winner.current = player.val;
  }, [player]);
  // function closeModal() {
  //   setWin("no");
  //   setPlayer(currentPlayers[currentPlayers.length - 1]);
  //   setBoard(generateTemplateArr(inputs.size));
  // }
  // function handleDocClick(e) {
  //   e.stopPropagation();
  //   if (e.target.name !== "modal") {
  //     closeModal();
  //   }
  // }
  // useEffect(() => {
  //   if (win === "yes" || win === "draw") {
  //     document.addEventListener("click", handleDocClick);
  //   }
  //   return () => {
  //     document.removeEventListener("click", handleDocClick);
  //   };
  // }, [win]);
  let currentPlayer = currentPlayers.findIndex((p) => {
    return p.val === player.val;
  });
  let y;
  if (currentPlayers.length - 1 < currentPlayer + 1) {
    y = 0;
  } else {
    y = currentPlayer + 1;
  }
  // console.log("running app compo");
  // console.log("inputs", inputs);
  console.log("board", board);
  // let playerCountInput = inputs.playerCount;
  function updateGameByPlayerCount(inputValue) {
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
      let inputVal = inputs.playerCount === 1 ? 1 : inputs.playerCount - 1;
      updateGameByPlayerCount(inputVal);
    } else if (target === "winBy") {
      inputs.winBy === 1
        ? setInputs({ ...inputs, winBy: 1 })
        : setInputs({ ...inputs, winBy: inputs.winBy - 1 });
    } else {
      let inputVal = inputs.size === 1 ? 1 : inputs.size - 1;
      console.log("cell number should be ;", inputVal);

      setBoard(generateTemplateArr(inputVal));
      setInputs({ ...inputs, size: inputVal });
    }
  }
  function changeNumInputHandler(e, actionTarget) {
    if (actionTarget === "playerCount") {
    } else if (actionTarget === "winBy") {
      setInputs({ ...inputs, winBy: e.target.value });
    } else {
      setBoard(generateTemplateArr(e.target.value));
      setInputs({ ...inputs, size: +e.target.value });
    }
  }
  function plusNumInputHandler(target) {
    if (target === "playerCount") {
      let inputVal = inputs.playerCount === 4 ? 4 : inputs.playerCount + 1;
      updateGameByPlayerCount(inputVal);
    } else if (target === "winBy") {
      setInputs({ ...inputs, winBy: inputs.winBy + 1 });
    } else {
      setBoard(generateTemplateArr(inputs.size + 1));
      setInputs({ ...inputs, size: inputs.size + 1 });
    }
  }

  return (
    <div className="flex flex-col items-center text-white max-h-[100vh] h-[100vh] justify-between">
      <h2 className={`font-semibold mb-5 transition-all my-7 text-4xl`}>
        {win === "no"
          ? `Player "${currentPlayers[y].val}" To Move`
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
      <div className="flex-col flex justify-between w-full gap-2 mb-3 min-[500px]:flex-row items-center">
        <NumInput
          changeNumInputHandler={changeNumInputHandler}
          input={inputs.size}
          minusNumInputHandler={minusNumInputHandler}
          plusNumInputHandler={plusNumInputHandler}
          readOnly={true}
          title={"Size"}
          target={"size"}
        />
        <NumInput
          changeNumInputHandler={changeNumInputHandler}
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
          changeNumInputHandler={changeNumInputHandler}
        />
      </div>
    </div>
  );
}
