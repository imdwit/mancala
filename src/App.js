import React, { Component } from 'react';
import { connect } from 'react-redux';

import { p1mancala, p2mancala } from './reducers';

import './App.css';

class App extends Component {
  render() {
    const {
      player1Row,
      player2Row,
      p1Score,
      p2Score,
      sew,
      turn,
      ended,
      tallyScore,
      winner,
      reset,
    } = this.props;
    return (
      <div class="app">
        <h1 className="current-player">Player {turn.slice(-1)} Go!</h1>
        <div
          className={`board row board--${ended ? 'ended' : ''} board--${turn}`}
        >
          <div
            className={`score player player--${turn !== 'player1'
              ? 'current'
              : ''}`}
          >
            <p>Player 2 score:&nbsp;{p2Score}</p>
          </div>
          <div className="rows">
            <ul className="row row--player-2">
              {player2Row.map(p => (
                <li
                  key={p.i}
                  onClick={
                    ended
                      ? null
                      : () =>
                          sew({
                            i: p.i - (turn === 'player2' ? 1 : 0),
                            n: p.marbles,
                          })
                  }
                >
                  {p.marbles}
                </li>
              ))}
            </ul>

            <ul className="row">
              {player1Row.map(p => (
                <li
                  key={p.i}
                  onClick={ended ? null : () => sew({ i: p.i, n: p.marbles })}
                >
                  {p.marbles}
                </li>
              ))}
            </ul>
          </div>
          <div
            className={`score player player--${turn === 'player1'
              ? 'current'
              : ''}`}
          >
            <p>Player 1 score:&nbsp;{p1Score}</p>
          </div>
        </div>
        {ended && winner.length ? (
          <div className="game-over">
            <h2>{winner}</h2>
            <button onClick={reset}>Click to Reset</button>
          </div>
        ) : null}
        {ended && !winner.length ? (
          <div className="game-over">
            Game over!{' '}
            <button onClick={tallyScore}>Click to tally score</button>
          </div>
        ) : null}
      </div>
    );
  }
}

// <pre>{JSON.stringify(this.props.board, null, 2)}</pre>
const mapStateToProps = state => {
  const board = Array.from(state.board);
  return {
    player1Row: board.slice(0, 6),
    player2Row: board.slice(7, board.length - 1),
    p1Score: board[p1mancala].marbles,
    p2Score: board[p2mancala].marbles,
    turn: state.turn,
    board: state.board,
    ended: state.ended,
    winner: state.winner,
  };
};

const sewPocket = ({ i, n }) => ({
  type: 'SEW',
  i,
  n,
});

const tallyScore = () => ({
  type: 'TALLY_SCORE',
});

const mapDispatchToProps = dispatch => {
  return {
    sew(pocket) {
      dispatch(sewPocket(pocket));
    },
    tallyScore() {
      dispatch(tallyScore());
    },
    reset() {
      dispatch({
        type: 'RESET',
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
