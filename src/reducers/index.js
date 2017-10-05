export const p1mancala = 6;
export const p2mancala = 13;
const pockets1 = [0, 1, 2, 3, 4, 5]; // first row of pockets
const pockets2 = [7, 8, 9, 10, 11, 12]; // second row of pockets
const sides = {
  player1: pockets1,
  player2: pockets2,
};
const mancalas = {
  player1: p1mancala,
  player2: p2mancala,
};
/*
  board:
    [13, 12, 11, 10, 9, 8, 7]
    [0, 1, 2, 3, 4, 5, 6]
    6 is player 1's mancala
    13 is player 2's mancala

    the game is played in a counter clockwise fashion
*/

const p1pockets = [...pockets1, p1mancala]; // first row and player1's mancala
const p2pockets = [...pockets2, p2mancala]; // second row and player2's mancala

// player 1 can not deposit marbles into player 2's mancala
// player 2 can not deposit marbles into player 1's mancala
export const initialState = {
  player1: {
    // player 1's pockets (row 1 and mancala) and second row (without player 2's mancala)
    pockets: [...p1pockets, ...pockets2],
  },
  player2: {
    // player 2's pockets (row 2 and mancala) and first row (without player 1's mancala)
    pockets: [...pockets1, ...p2pockets],
  },
  // board is made up of all pockets
  board: [...p1pockets, ...p2pockets].reduce(
    (acc, val, i) => {
      const isp1Mancala = i === p1mancala;
      const isp2Mancala = i === p2mancala;
      const isMancala = isp1Mancala || isp2Mancala;
      const pocket = {
        marbles: isMancala ? 0 : 4,
        isMancala,
        i,
      };
      acc[val] = pocket;
      return acc;
    },
    { length: 14 }
  ),
  turn: 'player1',
  ended: false,
  winner: '',
};
const log = console.log;
const mancala = (state = initialState, action) => {
  switch (action.type) {
    case 'SEW':
      let { i, n } = action;
      const { turn: currentPlayer } = state;
      const board = Array.from(state.board);
      const otherMancala = currentPlayer === 'player2' ? p1mancala : p2mancala;
      const currentPlayersPockets = state[currentPlayer].pockets;

      const arr = currentPlayersPockets.map(id => Object.assign({}, board[id]));

      const playersPockets = addMarbles(arr, n, i);
      var updatedBoard = [
        ...playersPockets.slice(0, otherMancala),
        board[otherMancala],
        ...playersPockets.slice(otherMancala),
      ];
      let stop = i + n;
      let turn;

      // check if either side has been cleared
      const row1 = updatedBoard.slice(0, 6);
      const row2 = updatedBoard.slice(7, updatedBoard.length - 1);
      let ended = false;
      const hasNoMarbles = p => p.marbles === 0;
      if (row1.every(hasNoMarbles) || row2.every(hasNoMarbles)) {
        ended = true;
      }

      if (stop >= board.length) stop = stop - board.length + 1;
      let lastMarbleDropped = board[stop];
      let lastMarbleDroppedAt = lastMarbleDropped.i;

      const isOnCurrentPlayersSide = sides[currentPlayer].includes(stop);
      log('last marble dropped at', lastMarbleDropped);
      if (lastMarbleDroppedAt > 6 && lastMarbleDroppedAt !== 13) {
        lastMarbleDropped = board[lastMarbleDroppedAt + 1];
      }
      if (hasNoMarbles(lastMarbleDropped) && isOnCurrentPlayersSide) {
        const index =
          lastMarbleDroppedAt > 6
            ? sides[currentPlayer]
                .slice(0, 6)
                .reverse()
                .indexOf(lastMarbleDroppedAt) - 1
            : sides[currentPlayer].indexOf(lastMarbleDroppedAt);
        const adjacentSide =
          lastMarbleDroppedAt > 6
            ? updatedBoard[index]
            : updatedBoard.slice(7, 13).reverse()[index];
        const { i: idToEmpty, marbles: marblesToCapture } = adjacentSide;
        const mancalaToAddTo = updatedBoard[mancalas[currentPlayer]];

        log('adjacentSide', adjacentSide);
        updatedBoard = updatedBoard.map(pocket => {
          if (pocket.i == mancalaToAddTo.i) {
            return {
              ...pocket,
              marbles: mancalaToAddTo.marbles + marblesToCapture + 1,
            };
          }
          if (pocket.i == idToEmpty || pocket.i == lastMarbleDropped.i) {
            return {
              ...pocket,
              marbles: 0,
            };
          }
          return pocket;
        });
      }

      if (currentPlayer === 'player1' && stop === p1mancala) {
        turn = 'player1';
      } else if (currentPlayer === 'player2' && stop + 1 === p2mancala) {
        turn = 'player2';
      } else {
        turn = currentPlayer === 'player1' ? 'player2' : 'player1';
      }
      return {
        ...state,
        board: updatedBoard,
        turn,
        ended,
      };

    case 'TALLY_SCORE':
      const getMarbles = p => p.marbles;
      const sum = (a, b) => a + b;
      const sumScore = arr => arr.reduce(sum, 0);
      const b = Array.from(state.board);

      const p1Marbles = b.slice(0, p1mancala + 1);
      const p1Score = sumScore(p1Marbles.map(getMarbles));
      const p2Score = sumScore(b.slice(7, 13).map(getMarbles));
      const zeroOut = p => Object.assign({}, p, { marbles: 0 });

      const newBoard = [
        ...b.slice(0, p1mancala).map(zeroOut),
        { ...b[p1mancala], marbles: p1Score },
        ...b.slice(p1mancala + 1, p2mancala).map(zeroOut),
        { ...b[p2mancala], marbles: p2Score },
      ];

      const winner =
        p1Score == p2Score
          ? 'Its a tie!'
          : p1Score > p2Score ? 'player 1 wins' : 'player 2 wins';
      return {
        ...state,
        ended: true,
        winner,
        board: newBoard,
      };

    case 'RESET':
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default mancala;

export function addMarbles(arr, n, i) {
  if (n < 1) return arr;
  var $i = i + 1;
  var $j = 0;
  var a = Array.from(arr);
  a[i].marbles = 0;
  while ($j++ < n) {
    if ($i >= arr.length) $i = 0;
    a[$i].marbles++;
    $i++;
  }
  return a;
}
