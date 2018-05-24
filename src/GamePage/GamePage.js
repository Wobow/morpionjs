import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Game } from "../_components/Game.js";
import { userActions } from "../_actions";
import { gameActions } from "../_actions";

class GamePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameName: "",
      submitted: false
    };
    console.log(
      "+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ in constructor"
    );
    console.log(props);
  }

  componentDidMount() {}

  handleGameLeave(user) {
    return e => this.props.dispatch(gameActions.leaveGame(user.id));
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
            Leave Lobby
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
