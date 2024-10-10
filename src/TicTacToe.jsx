import { useEffect, useRef, useState } from "react";
import Table from "./Table";
import { data } from "autoprefixer";

export default function TicTacToe() {
  const [turn, setTurn] = useState(false);
  const [win, setWin] = useState(false);
  const [draw, setDraw] = useState(false);
  let tmplateArr = [
    {
      data: [
        { val: null, id: 1 },
        { val: null, id: 2 },
        { val: null, id: 3 },
      ],
      id: 1,
    },
    {
      data: [
        { val: null, id: 4 },
        { val: null, id: 5 },
        { val: null, id: 6 },
      ],
      id: 2,
    },
    {
      data: [
        { val: null, id: 7 },
        { val: null, id: 8 },
        { val: null, id: 9 },
      ],
      id: 3,
    },
  ];
  const [tableArr, setTableArr] = useState(tmplateArr);

  // console.log("win ? ", win);
  // let modalState = false;
  let winner = useRef();
  useEffect(()=>{winner.current = turn},[turn])
  // console.log(winner.current  );
  
  function closeModal() {
    setWin(false);
    setTurn(false);
    setDraw(false);
    setTableArr(tmplateArr);
  }
  let handleDocClick = (e) => {
    e.stopPropagation();
    //   console.log(e.target === );
    //   console.log("e.target");
    // console.log("i'm here !");
    if (e.target.name !== "modal") {
      closeModal();
    } else if (e.target.name === "closeBtn") {
      closeModal();
    }
  };
  useEffect(() => {
    if (win || draw) {
      document.addEventListener("click", handleDocClick);
    }
    return () => {
      document.removeEventListener("click", handleDocClick);
    };
  }, [win, draw]);
  let modalOpen;
  let modalVal;
  if(win) {
    modalOpen = "w-[220px] h-[100px] p-2 border-2";
    // modalVal = `Player "${span}" won !`;
  } else {
    // modalOpen = "size-0 p-0 border-none ";
    if(draw) {
    modalOpen = "w-[220px] h-[100px] p-2 border-2";
    modalVal = 'Draw !'
  } else {
    modalOpen = "size-0 p-0 border-none ";
  }
  } 
  console.log('draw ? :', draw);
  console.log('win ? :', win);
  return (
    <div className="flex flex-col items-center relative">
      <div
        className={`rounded-xl flex-col flex -top-[120PX] bg-slate-50 overflow-hidden shadow-xl border-slate-500 items-center text-slate-800 absolute justify-around transition-all ${modalOpen}`}
        name="modal"
      >
        <h1 className="text-2xl font-bold">
          {win && 'player "'}
          {win ? <span className={winner.current ? 'text-blue-600' : 'text-red-600'}>{winner.current ? "O" : "X"}</span> : 'draw'}
          {win && '" won ! '}
        </h1>
        <button
          name="closeBtn"
          className="py-[2px] px-2 hover:bg-slate-200 font-bold border-slate-500 border-2 rounded-2xl "
        >
          OK
        </button>
      </div>
      <h2 className={`font-semibold text-2xl mb-5 transition-opacity ${win ? 'opacity-0' : 'opacity-100'}`}>
        Player "{turn ? "O" : "X"}" To Move
      </h2>
      <Table
        tableArr={tableArr}
        setDraw={setDraw}
        setTableArr={setTableArr}
        turn={turn}
        setTurn={setTurn}
        win={win}
        setWin={setWin}
      />
    </div>
  );
}
