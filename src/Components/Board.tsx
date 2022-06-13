import { useEffect, useState, FC } from "react";
import createBoard from "./createBoard";
import Cell from "./Cell";
import { BoardCell } from "../Types/BoardCell";

interface String {
  /**
   * Gets a substring beginning at the specified location and having the specified length.
   * (deprecation removed)
   * @param from The starting position of the desired substring. The index of the first character in the string is zero.
   * @param length The number of characters to include in the returned substring.
   */
  substr(from: number, length?: number): string;
}

let coordinateSet = new Set<string>([]);
let keyCounterOne = 0;
let keyCounterTwo = 200;

const Board: FC = () => {
  const [grid, setGrid] = useState<BoardCell[][]>([]);
  const [lost, setLost] = useState(false);
  const [win, setWin] = useState(false);
  const width = 8;
  const numMines = 2;

  useEffect(() => {
    function freshBoard() {
      const newBoard = createBoard(width, width, numMines);
      setGrid(newBoard);
    }
    freshBoard();
  }, []);

  if (grid.length === 0) {
    return <div>Loading</div>;
  }

  let boardWidth = grid.length;

  function openCellHandler(rowInd: number, colInd: number) {
    if (
      rowInd > -1 &&
      rowInd < boardWidth &&
      colInd > -1 &&
      colInd < boardWidth &&
      grid[rowInd][colInd] !== undefined &&
      grid[rowInd][colInd].open === false &&
      grid[rowInd][colInd].value === "X"
    ) {
      setLost(true);
    }

    if (
      rowInd > -1 &&
      rowInd < boardWidth &&
      colInd > -1 &&
      colInd < boardWidth &&
      grid[rowInd][colInd] !== undefined &&
      grid[rowInd][colInd].open === false
    ) {
      setGrid((grid) => [
        ...grid.slice(0, rowInd),
        [
          ...grid[rowInd].slice(0, colInd),
          { ...grid[rowInd][colInd], open: true },
          ...grid[rowInd].slice(colInd + 1),
        ],
        ...grid.slice(rowInd + 1),
      ]);
      if (coordinateSet.has(grid[rowInd][colInd].id) === false) {
        coordinateSet.add(grid[rowInd][colInd].id);
      }
    }
  }

  function openHandler(rowInd: number, colInd: number) {
    console.log(grid);
    openCellHandler(rowInd, colInd);
    if (grid[rowInd][colInd].value === 0) {
      let xRight = colInd + 1;
      let xLeft = colInd - 1;
      let yUp = rowInd - 1;
      let yDown = rowInd + 1;

      let boolMineRight = true;
      let boolMineTopRight = true;
      let boolMineBottomRight = true;

      // Right
      if (xRight > -1 && xRight < boardWidth) {
        if (grid[rowInd][xRight].value !== "X") {
          boolMineRight = false;
        }
      } else {
        boolMineRight = false;
      }
      // Top Right
      if (xRight > -1 && xRight < boardWidth && yUp > -1 && yUp < boardWidth) {
        if (grid[yUp][xRight].value !== "X") {
          boolMineTopRight = false;
        }
      } else {
        boolMineTopRight = false;
      }
      // Bottom Right
      if (
        xRight > -1 &&
        xRight < boardWidth &&
        yDown > -1 &&
        yDown < boardWidth
      ) {
        if (grid[yDown][xRight].value !== "X") {
          boolMineBottomRight = false;
        }
      } else {
        boolMineBottomRight = false;
      }
      // CHECKER FOR THE ENTIRE RIGHT SIDE
      if (
        boolMineRight === false &&
        boolMineTopRight === false &&
        boolMineBottomRight === false
      ) {
        openCellHandler(rowInd, xRight);
        openCellHandler(yUp, xRight);
        openCellHandler(yDown, xRight);
      }

      let boolMineLeft = true;
      let boolMineTopLeft = true;
      let boolMineBottomLeft = true;

      // Left
      if (xLeft > -1 && xLeft < boardWidth) {
        if (grid[rowInd][xLeft].value !== "X") {
          boolMineLeft = false;
        }
      } else {
        boolMineLeft = false;
      }
      // Top Left
      if (xLeft > -1 && xLeft < boardWidth && yUp > -1 && yUp < boardWidth) {
        if (grid[yUp][xLeft].value !== "X") {
          boolMineTopLeft = false;
        }
      } else {
        boolMineTopLeft = false;
      }
      // Bottom Left
      if (
        xLeft > -1 &&
        xLeft < boardWidth &&
        yDown > -1 &&
        yDown < boardWidth
      ) {
        if (grid[yDown][xLeft].value !== "X") {
          boolMineBottomLeft = false;
        }
      } else {
        boolMineBottomLeft = false;
      }
      // CHECKING ALL LEFT
      if (
        boolMineLeft === false &&
        boolMineTopLeft === false &&
        boolMineBottomLeft === false
      ) {
        openCellHandler(rowInd, xLeft);
        openCellHandler(yUp, xLeft);
        openCellHandler(yDown, xLeft);
      }

      let boolMineUp = true;
      let boolMineUpLeft = true;
      let boolMineUpRight = true;

      // Up
      if (yUp > -1 && yUp < boardWidth) {
        if (grid[yUp][colInd].value !== "X") {
          boolMineUp = false;
        }
      } else {
        boolMineUp = false;
      }
      // Up Right
      if (yUp > -1 && yUp < boardWidth && xRight > -1 && xRight < boardWidth) {
        if (grid[yUp][xRight].value !== "X") {
          boolMineUpLeft = false;
        }
      } else {
        boolMineUpLeft = false;
      }
      // Up Left
      if (yUp > -1 && yUp < boardWidth && xLeft > -1 && xLeft < boardWidth) {
        if (grid[yUp][xLeft].value !== "X") {
          boolMineUpRight = false;
        }
      } else {
        boolMineUpRight = false;
      }
      // CHECKING ALL UP
      if (
        boolMineUp === false &&
        boolMineUpLeft === false &&
        boolMineUpRight === false
      ) {
        openCellHandler(yUp, colInd);
        openCellHandler(yUp, xRight);
        openCellHandler(yUp, xLeft);
      }

      let boolMineDown = true;
      let boolMineDownRight = true;
      let boolMineDownLeft = true;
      //Down
      if (yDown > -1 && yDown < boardWidth) {
        if (grid[yDown][colInd].value !== "X") {
          boolMineDown = false;
        }
      } else {
        boolMineDown = false;
      }
      // Down Right
      if (
        yDown > -1 &&
        yDown < boardWidth &&
        xRight > -1 &&
        xRight < boardWidth
      ) {
        if (grid[yDown][xRight].value !== "X") {
          boolMineDownRight = false;
        }
      } else {
        boolMineDownRight = false;
      }
      // Down Left
      if (
        yDown > -1 &&
        yDown < boardWidth &&
        xLeft > -1 &&
        xLeft < boardWidth
      ) {
        if (grid[yDown][xLeft].value !== "X") {
          boolMineDownLeft = false;
        }
      } else {
        boolMineDownLeft = false;
      }

      if (
        boolMineDown === false &&
        boolMineDownRight === false &&
        boolMineDownLeft === false
      ) {
        openCellHandler(yDown, colInd);
        openCellHandler(yDown, xRight);
        openCellHandler(yDown, xLeft);
      }
    }
  }

  function openHandlerIterator() {
    coordinateSet.forEach((element: String) => {
      let xCoordinate = parseInt(element.substr(0, 1));
      let yCoordinate = parseInt(element.substr(1, 1));
      openHandler(xCoordinate, yCoordinate);
    });
  }

  if (win === true) {
    return <h1>YOU HAVE WON 😊</h1>;
  }
  function counter() {
    keyCounterTwo = keyCounterTwo + 1;
    return keyCounterTwo;
  }
  if (lost === false) {
    keyCounterOne = keyCounterOne + 1;
    keyCounterTwo = keyCounterTwo + 1;
    return (
      <div key={keyCounterOne}>
        {grid.map((singleRow: Array<any>, rowInd: number) => {
          return (
            <div key={counter()} style={{ display: "flex" }}>
              {singleRow.map((singleBlock, colInd) => {
                return (
                  <div
                    key={singleBlock.id}
                    style={{ width: 50, height: 50, border: "2px solid grey" }}
                  >
                    <Cell
                      details={singleBlock}
                      grid={grid}
                      boardWidth={boardWidth}
                      win={win}
                      setWin={setWin}
                      width={width}
                      numMines={numMines}
                      openHandler={openHandler}
                      openHandlerIterator={openHandlerIterator}
                      rowInd={rowInd}
                      colInd={colInd}
                    ></Cell>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
  if (lost === true) {
    return <h1>YOU HAVE LOST 👼</h1>;
  }
  return null;
};

export default Board;
