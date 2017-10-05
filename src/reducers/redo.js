const pockets = [4, 4, 4, 4, 4, 4, 0];
const initialState = {
  player1: {
    pockets: [...pockets],
  },
  player2: {
    pockets: [...pockets],
  },
  turn: 'player1',
};

const log = console.log;
const print = o => log(JSON.stringify(o, null, 2));
const increment = val => val + 1;

const xb = (p1, p2, i, n) => {
  if (i + n >= p1.length) {
    const offset = n - (p1.length - i);
    // const offset = n % p1.length;
    const sub = addMarbles(p1, i, p1.length);
    const sub2 = [
      ...p2.slice(0, offset + 1).map(increment),
      ...p2.slice(offset + 1),
    ];
    log('offset', offset);
    // if (n )
    // MOD
    if (n > p1.length) {
      log('over', n % p1.length);
      return x(sub, sub2, 0, n % p1.length);
    }
    return {
      p1: sub,
      p2: sub2,
    };
  }

  const sub = addMarbles(p1, i, n);
  return {
    p1: sub,
    p2,
  };
};

const x = ({p1, p2}, i, n) => {
  if ( i + n < 7) {
    log('a')
    return {
      p1: addMarbles(p1, i, n),
      p2,
    }
  }
  log('b', 8 - i)
  return {
    p1: addMarbles(p1, i, 7),
    p2: addMarbles(p2, -1,  8 - i),
  }
};

const addMarbles = (arr, i, n) => {
  n = n + 1;
  return [
    ...arr.slice(0, i + 1),
    ...arr.slice(i + 1, i + n).map(increment),
    ...arr.slice(i + n),
  ];
};

const mancala = (state = initialState, action) => {
  switch (action.type) {
    case 'SOW':
      const { turn } = state;
      const { i } = action;
      const opponent = turn == 'player1' ? 'player2' : 'player1';
      const opponentsRow = state[opponent].pockets;
      // const cachedPocket = opponentsRow.pop();
      const s = state[turn].pockets;
      const n = s[i];
      const currentRow = [...s.slice(0, i), 0, ...s.slice(i + 1)];
      const updated = x({p1:currentRow, p2:opponentsRow}, i, n);
      const { p1, p2 } = updated;
      log(n, p1, p2);
      const nextTurn = turn == 'player1' ? 'player2' : 'player1';
      return {
        ...state,
        player1: { pockets: n > 7 ? p2 : p1},
        // player1: {pockets: p2},
        player2: { pockets: n > 2 ? p2 : p1 },
        turn: nextTurn,
      };
    default:
      return state;
  }
};
export default mancala;
