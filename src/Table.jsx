import TableRow from "./TableRow";
import { useState } from "react";

export default function Table({ tableArr, ...props }) {

  return (
    <table className="select-none size-[180px]">
      <tbody>
        {tableArr.map((tRow, rowIndex) => (
          <TableRow
            key={tRow.id}
            rowIndex={rowIndex}
            tableArr={tableArr}
            data={tRow.data}
            rowID={tRow.id}
            {...props}
          />
        ))}
      </tbody>
    </table>
  );
}
