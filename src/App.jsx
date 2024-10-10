import { useRef } from "react";
import TicTacToe from "./TicTacToe";

export default function App() {  
  return (
    <div className="min-h-[100vh] flex justify-center items-center w-[100vw]">
      <TicTacToe />
    </div>
  );
}
