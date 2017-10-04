import { addMarbles, initialState } from './index';
const print = obj => JSON.stringify(obj, null, 2);

describe('marbles', () => {
  var state;
  var board;
  var pockets;
  beforeEach(() => {
    state = Object.assign({}, initialState);
    board = state.board;
    pockets = Array.from(board).slice(0, 6);
    console.log('before', pockets)
  });

  afterEach(() => {
    state = null;
    board = null;
    pockets = [];
  });

  xit('should not modify the length of the array', () => {
    const index = 1;
    expect(pockets[index].marbles).toBe(4);
    const p = addMarbles(pockets, 0, index);
    expect(p.length).toBe(pockets.length);
  });

  xit('should empty the pocket at the index', () => {
    const index = 1;
    const n = 3;
    console.log(pockets);
    const p = addMarbles(pockets, n, index);
    expect(p[index].marbles).toBe(0);
  });

  xit('should add one to each pocket in turn', () => {
    const index = 1;
    const n = 3;
    const $pockets = [...pockets.slice()];
    const p = addMarbles(pockets, n, index);
    const s = pockets
      .slice(index + 1)
      .every(
        (p, i, arr) => {
          console.log(i, p, pockets[p.i])
           return p.marbles == pockets[p.i].marbles
        }
      );
    expect(s).toBe(true);
    expect(p[index].marbles).toBe(0);
  });
});
