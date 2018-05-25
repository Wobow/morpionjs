import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Game } from "../_components/Game.js";
import { userActions } from "../_actions";
import { gameActions } from "../_actions";
import io from "socket.io-client";

const gameIds = [1, 2, 4, 8, 16, 32, 64, 128, 256];

class GamePage extends React.Component {
  constructor(props) {
    super(props);
    this.socket = io.connect("http://localhost:5000/");
    console.log(this.props);
    this.props.dispatch(gameActions.get(this.props.match.params.id));
    this.socket.on("message", message => {
      console.log("message");
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
    console.log(
      "+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ in constructor"
    );
    console.log(props);
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

    console.log("GameRender");
    console.log(this.props);

    return (
      <div>
        <Game />
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
  const { users, authentication, lobbies } = state;
  const { user } = authentication;
  const { currLobby, games } = lobbies;
  return {
    user,
    users,
    currLobby,
    games
  };
}

const connectedGamePage = connect(mapStateToProps)(GamePage);
export { connectedGamePage as GamePage };
