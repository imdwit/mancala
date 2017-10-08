'use strict';
import { board, increment, log, print, addMarbles, zeroAtIndex } from './redo';

describe('Mancala', () => {
  describe('addMarbles', () => {
    test('increments from i to n', () => {
      const i = 0;
      const n = 4;
      const state = board.slice();
      const expected = [4, 5, 5, 5, 5, 4, 0, 4, 4, 4, 4, 4, 4, 0];

      const actual = addMarbles(state, i, n);

      expect(actual).toEqual(expected);
    });

    test('if i + n is out of bounds, iterate from i to the end, then start at the begining', () => {
      const i = 10;
      const n = 8;
      const state = board.slice();
      //                                              i
      const expected = [5, 5, 5, 5, 5, 4, 0, 4, 4, 4, 4, 5, 5, 1];

      const actual = addMarbles(state, i, n);

      expect(actual).toEqual(expected);
    });

    test('do not increment the skipped index', () => {
      const i = 0;
      const n = 15;
      const state = board.slice();
      const skip = 6;
      const expected = [5, 6, 5, 5, 5, 5, 0, 5, 5, 5, 5, 5, 5, 1];

      const actual = addMarbles(state, i, n, skip);

      expect(actual).toEqual(expected);
    });
  });
  describe('zeroAtIndex', () => {
    test('pocket at index 1 should be set to 0', () => {
      const i = 1;
      const state = board.slice(0, 6);
      const actual = zeroAtIndex(state, i);
      const expected = [4, 0, 4, 4, 4, 4];
      expect(actual).toEqual(expected);
    });
  });

  describe('calculateIndex', () => {

  });
});
