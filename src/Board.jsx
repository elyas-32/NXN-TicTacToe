import Cell from "./Cell";
export default function Board({ board, size, ...props }) {
  return (
    <div
      className="size-[280px] grid divide-x-2 divide-y-2"
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
