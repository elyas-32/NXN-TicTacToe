import TableCell from "./TableCell";

export default function TableRow({ data, rowID, ...props }) {
  return (
    <tr>
      {data.map((tData, cellIndex) => (
        <TableCell
          cellIndex={cellIndex}
          key={tData.id}
          data={tData}
          rowID={rowID}
          {...props}
        />
      ))}
    </tr>
  );
}
