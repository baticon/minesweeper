import { BoardCell } from "../Types/BoardCell";

function randomNumGen(min = 0, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default function CreateBoard(
  row: number,
  col: number,
  bombs: number
): BoardCell[][] {
  // let board: any = [];
  let board: BoardCell[][] = [];
  // let mineLocation = [];
  // Create blank board

  // x = column
  for (let x = 0; x < row; x++) {
    let subCol = [];
    for (let y = 0; y < col; y++) {
      let convertedX = x.toString();
      let convertedY = y.toString();
      let XY = convertedX.concat(convertedY);
      subCol.push({
        id: XY,
        value: 0,
        flag: false,
        hasmine: false,
        open: false,
      });
    }
    board.push(subCol);
  }

  // Randomize Bomb Placement
  let bombCount = 0;
  while (bombCount < bombs) {
    let x = randomNumGen(0, row - 1);
    let y = randomNumGen(0, col - 1);

    if (board[x][y].value === 0) {
      board[x][y].value = "X";
      board[x][y].hasmine = true;
      // mineLocation.push([x, y]);
      bombCount = bombCount + 1;
    }
  }

  // Adding numbers
  for (let iteratorRow = 0; iteratorRow < row; iteratorRow++) {
    for (let iteratorCol = 0; iteratorCol < col; iteratorCol++) {
      if (board[iteratorRow][iteratorCol].value === "X") {
        continue;
      }

      // Top
      if (
        iteratorRow > 0 &&
        board[iteratorRow - 1][iteratorCol].value === "X"
      ) {
        const val = Number(board[iteratorRow][iteratorCol].value);
        board[iteratorRow][iteratorCol].value = val + 1;
      }

      // Top Left
      // iteratorRow and iteratorCol to be > 0
      // if you are on the first square you can go out ob bound
      if (
        iteratorRow > 0 &&
        iteratorCol > 0 &&
        board[iteratorRow - 1][iteratorCol - 1].value === "X"
      ) {
        const val = Number(board[iteratorRow][iteratorCol].value);
        board[iteratorRow][iteratorCol].value = val + 1;
        // board[iteratorRow][iteratorCol].value++;
      }

      // Top Right
      if (
        iteratorRow > 0 &&
        iteratorCol < col - 1 &&
        board[iteratorRow - 1][iteratorCol + 1].value === "X"
      ) {
        const val = Number(board[iteratorRow][iteratorCol].value);
        board[iteratorRow][iteratorCol].value = val + 1;
        // board[iteratorRow][iteratorCol].value++;
      }

      // Bottom
      if (
        iteratorRow < row - 1 &&
        board[iteratorRow + 1][iteratorCol].value === "X"
      ) {
        const val = Number(board[iteratorRow][iteratorCol].value);
        board[iteratorRow][iteratorCol].value = val + 1;
        // board[iteratorRow][iteratorCol].value++;
      }

      // Bottom Left
      if (
        iteratorRow < row - 1 &&
        iteratorCol > 0 &&
        board[iteratorRow + 1][iteratorCol - 1].value === "X"
      ) {
        const val = Number(board[iteratorRow][iteratorCol].value);
        board[iteratorRow][iteratorCol].value = val + 1;
        // board[iteratorRow][iteratorCol].value++;
      }

      // Bottom Right
      if (
        iteratorRow < row - 1 &&
        iteratorCol < col - 1 &&
        board[iteratorRow + 1][iteratorCol + 1].value === "X"
      ) {
        const val = Number(board[iteratorRow][iteratorCol].value);
        board[iteratorRow][iteratorCol].value = val + 1;
        // board[iteratorRow][iteratorCol].value++;
      }

      // Left
      if (
        iteratorCol > 0 &&
        board[iteratorRow][iteratorCol - 1].value === "X"
      ) {
        const val = Number(board[iteratorRow][iteratorCol].value);
        board[iteratorRow][iteratorCol].value = val + 1;
        // board[iteratorRow][iteratorCol].value++;
      }

      // Right
      if (
        iteratorCol < col - 1 &&
        board[iteratorRow][iteratorCol + 1].value === "X"
      ) {
        const val = Number(board[iteratorRow][iteratorCol].value);
        board[iteratorRow][iteratorCol].value = val + 1;
        // board[iteratorRow][iteratorCol].value++;
      }
    }
  }
  return board;
}
