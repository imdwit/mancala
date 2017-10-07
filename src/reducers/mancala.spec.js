import mancala, {initialState} from './index';

describe('mancala', () => {
  it('should return initial state', () => {
    const expected = initialState;
    const actual = mancala(undefined, {});
    expect(actual).toEqual(expected);
  });

  it('should handle SOW', () => {
    const expected = [];
    const actual = mancala(undefined, {
      type: 'SOW',
      i: 1,
    });
    expect(actual).toEqual(expected);
  })
})