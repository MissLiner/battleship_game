import { boardFactory } from "./makeBoard";
import { playerFactory } from "./makePlayer";
import { shipFactory } from "../makeShips";

const player1 = playerFactory(true, 1);
const player2 = playerFactory(true, 2);

const board1 = boardFactory();
const board2 = boardFactory();

const gameBoard = document.getElementById('gameboard');

function addSpaces(row) {
  for(i = 0; i < 10; i++) {
    const space = document.createElement('div');
    space.class = 'space';
    row.appendChild(space);
  }
}
(function buildBoard(board) {
  for(i = 0; i < 10; i++) {
    const row = document.createElement('div');
    row.class = 'row';
    buildRow(row);
    gameBoard.appendChild(row);
  }
})()