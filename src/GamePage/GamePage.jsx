import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Game } from "../_components/Game.js";
import { userActions } from "../_actions";
import { gameActions } from "../_actions";
import { tictacActions } from "../_actions";
import io from "socket.io-client";

const gameIds = [1, 2, 4, 8, 16, 32, 64, 128, 256];

class GamePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      secret: undefined
    };
    this.socket = io.connect("http://localhost:5000/");
    this.socket.on("message", message => {
      if (message.data.turn) {
        if (message.data.turn == this.props.user.user._id) {
          this.props.dispatch(tictacActions.turn(true));
        } else {
          this.props.dispatch(tictacActions.turn(false));
        }
      }

      if (message.data) {
        this.props.dispatch(tictacActions.getBoard(message.data.moves));
      }

      // If message.data.status == ended -> display "GAME HAS ENDED" instead of current turn

      console.log(message);
      // Handle socket messages
      // {message: 'MESSAGE', data: Game, finished: Boolean}
    });

    this.socket.on("error", error => {
      console.log(error);
      // Handle error message
      // {message: 'MESSAGE', stack: Object}
    });

    this.socket.on("turn", turn => {
      console.log("turn");
      console.log(turn);
      if (turn.data) {
        this.props.dispatch(tictacActions.getBoard(turn.data.moves));
        if (turn.data.turn == this.props.user.user._id) {
          this.props.dispatch(tictacActions.turn(true));
        } else {
          this.props.dispatch(tictacActions.turn(false));
        }
      }
      // Handle turn event
      // {message: 'MESSAGE', data: Game}
    });
    this.state = {
      gameName: "",
      submitted: false
    };
    this.socket.emit("joinGame", {
      gameId: this.props.match.params.id
    });
  }

  playTurn() {
    this.socket.emit("playTurn", {
      gameId: this.props.match.params.id
    });
  }

  componentDidMount() {}

  componentWillUnmount() {
    this.props.dispatch(gameActions.leave(this.props.user.user._id));
  }

  handleGameLeave(user) {
    return e => this.props.dispatch(gameActions.leave(user.user._id));
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit(gameName) {
    this.props.dispatch(gameActions.create(gameName));
  }

  render() {
    const { user, games, currLobby } = this.props;
    const { gameName, submitted } = this.state;
    const { game } = games;
    let secret = undefined;

    if (secret == undefined && game && game.players) {
      for (let player in game.players) {
        console.log("------------------------------------- PLAYER LOOOOOOOOP");
        console.log(player);
        if (game.players[player].secret) {
          secret = game.players[player].secret;
        }
      }
    }
    console.log("GameRender");
    console.log(this.props);

    return (
      <div>
        <Game
          secret={secret}
          socket={this.socket}
          gameId={this.props.match.params.id}
        />
        <p>
          <Link to="/" onClick={this.handleGameLeave(user)}>
            Leave Game
          </Link>
        </p>
        <p>
          <Link to="/login">Logout</Link>
        </p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { users, authentication, lobbies, games, tictac } = state;
  const { user } = authentication;
  const { currLobby } = lobbies;
  const { game } = games;
  return {
    user,
    users,
    currLobby,
    games,
    game
  };
}

const connectedGamePage = connect(mapStateToProps)(GamePage);
export { connectedGamePage as GamePage };
