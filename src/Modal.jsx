export default function Modal({win, winner, draw}) {
    let modalOpen;
    let modalVal;
    if (win) {
      modalOpen = "w-[220px] h-[100px] p-2 border-2";
      // modalVal = `Player "${span}" won !`;
    } else {
      // modalOpen = "size-0 p-0 border-none ";
      if (draw) {
        modalOpen = "w-[220px] h-[100px] p-2 border-2";
        modalVal = "Draw !";
      } else {
        modalOpen = "size-0 p-0 border-none ";
      }
    }
  return (
    <div
      className={`rounded-xl flex-col flex -top-[120PX] bg-slate-50 overflow-hidden shadow-xl border-slate-500 items-center text-slate-800 absolute justify-around transition-all ${modalOpen}`}
      name="modal"
    >
      <h1 className="text-2xl font-bold">
        {win && 'player "'}
        {win ? (
          <span className={winner.current ? "text-blue-600" : "text-red-600"}>
            {winner.current ? "O" : "X"}
          </span>
        ) : (
          "draw"
        )}
        {win && '" won ! '}
      </h1>
      <button
        name="closeBtn"
        className="py-[2px] px-2 hover:bg-slate-200 font-bold border-slate-500 border-2 rounded-2xl "
      >
        OK
      </button>
    </div>
  );
}
