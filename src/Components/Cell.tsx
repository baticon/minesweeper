import React, { FC } from "react";
import { useState } from "react";
import styles from "./Cell.module.css";
import { BoardCell } from "../Types/BoardCell";

interface CellProps {
  details: BoardCell;
  grid: BoardCell[][];
  setGrid: any;
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
  setGrid,
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
        `${(flagged ? "" : openHandler(rowInd, colInd), openHandlerIterator())}`
      }
      onContextMenu={() =>
        `${details.open ? "" : setFlagged((oldFlagged) => !oldFlagged)}`
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
