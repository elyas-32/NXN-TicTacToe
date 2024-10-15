import Cell from "./Cell";
export default function Board({ board, size, ...props }) {
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
          {...props}
        />
      ))}
    </div>
  );
}
