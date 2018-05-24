import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Game } from "../_components/Game.js";
import { userActions } from "../_actions";
import { lobbyActions } from "../_actions";
import { gameActions } from "../_actions";

class LobbyPage extends React.Component {
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
    this.props.dispatch(lobbyActions.getLobbyGames(props.match.params.id));
  }

  componentDidMount() {}

  handleLobbyLeave(user) {
    return e => this.props.dispatch(lobbyActions.leaveLobby(user.id));
  }

  handleDeleteLobby(id) {
    return e => this.props.dispatch(lobbyActions.delete(id));
  }

  handleJoinGame(id) {
    return e => this.props.dispatch(gameActions.join(id));
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

    console.log("LobbyRender");
    console.log(currLobby);
    console.log(this.props);

    return (
      <div className="col-md-6 col-md-offset-3">
        {currLobby &&
          games && (
            <ul>
              {games.map((game, index) => (
                <li key={game._id}>
                  {game._id} - {game.players.length} {"player(s) - "}
                  <Link
                    to={`/game/${game._id}`}
                    onClick={this.handleJoinGame(game._id)}
                  >
                    Join
                  </Link>
                </li>
              ))}
            </ul>
          )}
        <button
          className="btn btn-primary"
          to="/games"
          onClick={() => this.handleSubmit(this.props.match.params.id)}
        >
          Create Game
        </button>
        <p>
          <Link to="/" onClick={this.handleLobbyLeave(user)}>
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

const connectedLobbyPage = connect(mapStateToProps)(LobbyPage);
export { connectedLobbyPage as LobbyPage };
