import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import TicTacToeApp from "./TicTacToeApp";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TicTacToeApp />
  </StrictMode>
);
