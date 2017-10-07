import { addMarbles, zeroAtIndex } from './redo';

const player1Mancala = 6;
const player2Mancala = 13;
const row = [4, 4, 4, 4, 4, 4, 0];
export const board = [...row, ...row];
export const initialState = {
  board,
  turn: 'player1',
  skip: {
    player2: player1Mancala, // if turn == 'player2' skip over player 1's mancala
    player1: player2Mancala, // if turn == 'player1' skip over player 2's mancala
  },
};

export default function mancala(state = initialState, action) {
  switch (action.type) {
    case 'SOW':
      const { i } = action;
      const { board, turn, skip } = state;
      const n = board[i];
      const boardAfterZeroing = zeroAtIndex(board, i);
      const boardAfterAdding = addMarbles(boardAfterZeroing, i, n, skip[turn]);

      /*
        check if it landed in  my side
          if so keep turn
        
        check if it landed in an empty pocket on my side
          if so grab marbles on opposite side
      */

      return {
        ...state,
        board: boardAfterAdding,
      };
    default:
      return state;
  }
}
