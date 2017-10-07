'use strict';
const row = [4, 4, 4, 4, 4, 4, 0];
export const board = [...row, ...row];

export const log = console.log;
export const print = o => log(JSON.stringify(o, null, 2));
export const increment = val => val + 1;


export function addMarbles(board, i, n, skip) {
  const fromIToN = board.slice().map((p, idx) => {
    if (idx === skip) return p;
    if (i < idx && idx < i + n + 1) return p + 1;
    return p;
  });
  if (i + n <= board.length) {
    return fromIToN;
  }

  const leftOver = (i + n) - board.length;
  return addMarbles(fromIToN, -1, leftOver + 1, skip)
}

export function zeroAtIndex(board, i) {
  return board.map((p, idx) => {
    if (idx == i) return 0;
    return p;
  });
}


