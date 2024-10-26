import { createRoot } from "react-dom/client";
import TicTacToeApp from "./TicTacToeApp";
import "./index.css";

createRoot(document.getElementById("root")!).render(
    <TicTacToeApp />
);
