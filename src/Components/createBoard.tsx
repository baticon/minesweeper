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
  for (let dummyRow = 0; dummyRow < row; dummyRow++) {
    for (let dummyCol = 0; dummyCol < col; dummyCol++) {
      if (board[dummyRow][dummyCol].value === "X") {
        continue;
      }

      // Top
      if (dummyRow > 0 && board[dummyRow - 1][dummyCol].value === "X") {
        const val = Number(board[dummyRow][dummyCol].value);
        board[dummyRow][dummyCol].value = val + 1;
      }

      // Top Left
      // dummyRow and dummyCol to be > 0
      // if you are on the first square you can go out ob bound
      if (
        dummyRow > 0 &&
        dummyCol > 0 &&
        board[dummyRow - 1][dummyCol - 1].value === "X"
      ) {
        const val = Number(board[dummyRow][dummyCol].value);
        board[dummyRow][dummyCol].value = val + 1;
        // board[dummyRow][dummyCol].value++;
      }

      // Top Right
      if (
        dummyRow > 0 &&
        dummyCol < col - 1 &&
        board[dummyRow - 1][dummyCol + 1].value === "X"
      ) {
        const val = Number(board[dummyRow][dummyCol].value);
        board[dummyRow][dummyCol].value = val + 1;
        // board[dummyRow][dummyCol].value++;
      }

      // Bottom
      if (dummyRow < row - 1 && board[dummyRow + 1][dummyCol].value === "X") {
        const val = Number(board[dummyRow][dummyCol].value);
        board[dummyRow][dummyCol].value = val + 1;
        // board[dummyRow][dummyCol].value++;
      }

      // Bottom Left
      if (
        dummyRow < row - 1 &&
        dummyCol > 0 &&
        board[dummyRow + 1][dummyCol - 1].value === "X"
      ) {
        const val = Number(board[dummyRow][dummyCol].value);
        board[dummyRow][dummyCol].value = val + 1;
        // board[dummyRow][dummyCol].value++;
      }

      // Bottom Right
      if (
        dummyRow < row - 1 &&
        dummyCol < col - 1 &&
        board[dummyRow + 1][dummyCol + 1].value === "X"
      ) {
        const val = Number(board[dummyRow][dummyCol].value);
        board[dummyRow][dummyCol].value = val + 1;
        // board[dummyRow][dummyCol].value++;
      }

      // Left
      if (dummyCol > 0 && board[dummyRow][dummyCol - 1].value === "X") {
        const val = Number(board[dummyRow][dummyCol].value);
        board[dummyRow][dummyCol].value = val + 1;
        // board[dummyRow][dummyCol].value++;
      }

      // Right
      if (dummyCol < col - 1 && board[dummyRow][dummyCol + 1].value === "X") {
        const val = Number(board[dummyRow][dummyCol].value);
        board[dummyRow][dummyCol].value = val + 1;
        // board[dummyRow][dummyCol].value++;
      }
    }
  }
  return board;
}
