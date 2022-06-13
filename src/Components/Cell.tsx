import React, { FC } from "react";
import { useState } from "react";
import styles from "./Cell.module.css";
import { BoardCell } from "../Types/BoardCell";

interface CellProps {
  details: BoardCell;
  grid: BoardCell[][];
  setGrid: React.Dispatch<React.SetStateAction<BoardCell[][]>>;
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
      className={`${details.flag ? styles.flagged : styles.defaut} ${
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
        `${
          (details.open ? "" : setFlagged((oldFlagged) => !oldFlagged),
          setGrid((grid) => [
            ...grid.slice(0, rowInd),
            [
              ...grid[rowInd].slice(0, colInd),
              { ...grid[rowInd][colInd], flag: true },
              ...grid[rowInd].slice(colInd + 1),
            ],
            ...grid.slice(rowInd + 1),
          ]))
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
