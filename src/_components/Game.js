import React from "react";
import "./game.css";
import { connect } from "react-redux";
import { tictacActions } from "../_actions";

const gameIds = [1, 2, 4, 8, 16, 32, 64, 128, 256];

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true,
      turn: undefined,
      socket: undefined,
      gameId: undefined
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    if (this.state.turn == false) {
      return;
    }
    console.log("HANDLECLICK");
    console.log(this.props);
    console.log(
      gameIds[i],
      this.props.secret,
      this.props.gameId,
      this.props.socket
    );
    this.props.dispatch(
      tictacActions.playTurn(
        gameIds[i],
        this.props.secret,
        this.props.gameId,
        this.props.socket
      )
    );

    // squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    });
  }

  render() {
    const turn = this.props.tictac.isMyTurn;
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    let board = this.props.tictac.board;
    let index;
    // if (!this.state.socket || !this.state.secret) {
    //   this.setState({
    //     socket: this.props.socket,
    //     secret: this.props.secret,
    //     turn: turn
    //   });
    // }
    if (board) {
      for (let i in board) {
        console.log("i=" + i + " - gameIds[i]=" + gameIds[i]);
        index = gameIds.indexOf(board[i]);
        if (i % 2 == 0) {
          current.squares[index] = "X";
        } else {
          current.squares[index] = "O";
        }

        console.log("IN IF : " + index);
      }
    }

    console.log("PROPS UNDER HERE");
    console.log(this.props);
    const moves = history.map((step, move) => {
      const desc = move ? "Go to move #" + move : "Go to game start";
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (turn ? "YOU" : "YOUR ENEMY");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={i => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

//ReactDOM.render(<Game />, document.getElementById("root"));

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function mapStateToProps(state) {
  const { users, authentication, lobbies, tictac } = state;
  const { user } = authentication;
  const { currLobby, games } = lobbies;
  return {
    user,
    users,
    currLobby,
    games,
    tictac
  };
}

const connectedGame = connect(mapStateToProps)(Game);
export { connectedGame as Game };
