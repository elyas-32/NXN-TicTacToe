import Cell from "./Cell";
export interface BoardCell {
  bgColor: string;
  borderStatus: string;
  color: string;
  id: number;
  val: null | string;
}

export default function Board({
  board,
  size,
  ...props
}: {
  board: BoardCell[];
  size: number;
  [key: string]: any;
}) {
  return (
    <div
      className={`size-[80vw] min-[960px]:size-[50vw] 2xl:size-[40vw] grid mt-3 ${
        size < 15 ? "divide-x-2 divide-y-2" : "divide-x divide-y"
      }`}
      style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}
    >
      {board.map((cell, index) => (
        <Cell
          key={cell.id}
          cellIndex={index}
          board={board}
          cell={cell}
          size={size}
          setBoard={props.setBoard}
          currentPlayers={props.currentPlayers}
          player={props.player}
          setPlayer={props.setPlayer}
          setWin={props.setWin}
          win={props.win}
          winBy={props.winBy}
        />
      ))}
    </div>
  );
}
