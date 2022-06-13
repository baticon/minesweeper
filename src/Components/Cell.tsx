import React, { FC } from "react";
import { useState } from "react";
import styles from "./Cell.module.css";
import { BoardCell } from "../Types/BoardCell";

interface CellProps {
  details: BoardCell;
  grid: BoardCell[][];
  boardWidth: number;
  win: boolean;
  setWin: (isWin: boolean) => void;
  width: number;
  numMines: number;
  openHandler: (rowInd: number, colInd: number) => void;
  openHandlerIterator: () => void;
  rowInd: number;
  colInd: number;
}

const Cell: FC<CellProps> = ({
  details,
  grid,
  boardWidth,
  win,
  setWin,
  width,
  numMines,
  openHandler,
  openHandlerIterator,
  rowInd,
  colInd,
}) => {
  const [flagged, setFlagged] = useState(false);

  function changeFlag() {
    if (details.open === false) {
      setFlagged((oldFlagged) => !oldFlagged);
    }
  }

  function winCondition() {
    let counterCell = 0;
    let counterMine = 0;
    for (let i = 0; i < boardWidth; i++) {
      for (let j = 0; j < boardWidth; j++) {
        if (grid[i][j].value === "X" && grid[i][j].open === false) {
          counterMine = counterMine + 1;
        }
        if (grid[i][j].value !== "X" && grid[i][j].open === true) {
          counterCell = counterCell + 1;
        }
        if (
          counterMine === numMines &&
          counterCell === width * width - (numMines + 1)
        ) {
          setWin(true);
        }
      }
    }
  }

  return (
    <div
      className={`${flagged ? styles.flagged : styles.defaut} ${
        details.open ? styles.revealed : styles.default
      } ${
        details.open === true && details.value === 0
          ? styles.revealedZero
          : styles.defaut
      }`}
      onClick={() =>
        `${
          (winCondition(),
          flagged ? "" : openHandler(rowInd, colInd),
          openHandlerIterator())
        }`
      }
      onContextMenu={() =>
        `${
          (winCondition(),
          changeFlag(),
          flagged ? (details.flag = true) : (details.flag = false))
        }`
      }
      style={{
        height: 50,
        width: 50,
      }}
    >
      {details.value}
    </div>
  );
};

export default Cell;
