import { addMarbles, zeroAtIndex, calculateIndex } from './redo';

const player1Mancala = 6;
const player2Mancala = 13;
const row = [4, 4, 4, 4, 4, 4, 0];

const sides = {
  player1: [0, player1Mancala],
  player2: [7, player2Mancala],
};
export const board = [...row, ...row];
export const initialState = {
  board,
  turn: 'player1',
  skip: {
    player2: player1Mancala, // if turn == 'player2' skip over player 1's mancala
    player1: player2Mancala, // if turn == 'player1' skip over player 2's mancala
  },
  ended: false,
  mancalas: {
    player1: player1Mancala,
    player2: player2Mancala,
  },
};

export default function mancala(state = initialState, action) {
  switch (action.type) {
    case 'SOW':
      let { i } = action;
      i = 5;
      const { board, turn, skip, mancalas } = state;
      const length = board.length;
      const n = board[i];
      const boardAfterZeroing = zeroAtIndex(board, i);
      var boardAfterAdding = addMarbles(boardAfterZeroing, i, n, skip[turn]);
      const currentPlayersMancala = mancalas[turn];
      const indexOfLastMarble = calculateIndex({ i, n, l: board.length });
      const isInCurrentPlayersMancala =
        indexOfLastMarble === currentPlayersMancala;
      const updatedTurn = isInCurrentPlayersMancala
        ? turn // keep it the same
        : turn === 'player1' ? 'player2' : 'player1';

      const opponent = turn == 'player1' ? 'player2' : 'player1';
      const opponentsSide = boardAfterAdding.slice(...sides[opponent]);
      const mySide = boardAfterAdding.slice(...sides[turn]);
      const lastMarbleDidLandOnMySide =
        indexOfLastMarble < player1Mancala && turn === 'player1' ||
        indexOfLastMarble < player2Mancala && turn === 'player2';
        // console.log()
        boardAfterAdding[indexOfLastMarble] = 0;
      const isPocketEmpty = !boardAfterAdding[indexOfLastMarble];
      if (lastMarbleDidLandOnMySide && isPocketEmpty) {
        /*
          check if it landed in an empty pocket on my side
            if so grab marbles on opposite side
        */
        let oppositeSide = opponentsSide.reverse(); // mirror image
        const pocket = oppositeSide[indexOfLastMarble > 7 ? indexOfLastMarble - 7 : indexOfLastMarble ];
        const t = pocket + boardAfterAdding[currentPlayersMancala] + 1;

        // const indexOfOpponent = indexOfLastMarble > 7 ? ;
        // boardAfterAdding = zeroAtIndex(zeroAtIndex(board, indexOfOpponent), indexOfLastMarble);
        // console.log('hi', boardAfterAdding)
        // increase playersmana
      }
      console.log('the index', indexOfLastMarble)

      return {
        ...state,
        board: boardAfterAdding,
        turn: updatedTurn,
      };
    default:
      return state;
  }
}
