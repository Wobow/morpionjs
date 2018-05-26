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
    this.joinedGame = false;
    this.state = {
      gameName: "",
      submitted: false,
      joinedGame: false
    };
    console.log(
      "+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ in constructor"
    );
    console.log(props);
    this.props.dispatch(lobbyActions.getLobbyGames(props.match.params.id));
    this.componentCleanup = this.componentCleanup.bind(this);
    this.dispatch = this.props.dispatch;
    this.userId = this.props.user.user._id;
  }

  componentCleanup() {
    this.dispatch(lobbyActions.leaveLobby(this.userId));
    this.dispatch(gameActions.leave(this.userId));
  }

  componentWillMount() {
    window.addEventListener("beforeunload", this.componentCleanup);
    //   this.setState({ joinedGame: false });
  }

  componentWillUnmount() {
    console.log("---------------------------------- WILL UNMOUND");
    console.log(this.state);

    if (this.joinedGame == false) {
      this.componentCleanup();
      window.removeEventListener("beforeunload", this.componentCleanup);
    }
  }

  handleLobbyLeave(user) {
    this.props.dispatch(lobbyActions.leaveLobby(user.user._id));
    this.props.dispatch(gameActions.leave(this.props.user.user._id));
  }

  handleDeleteLobby(id) {
    this.props.dispatch(lobbyActions.delete(id));
  }

  handleJoinGame(id) {
    console.log("handleJoin");
    this.joinedGame = true;

    this.props.dispatch(gameActions.join(id));
    this.props.dispatch(gameActions.get(id));
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  async handleSubmit(gameName) {
    this.props.dispatch(
      await gameActions.create(gameName, this.props.match.params.id)
    );
    this.props.dispatch(lobbyActions.getLobbyGames(this.props.match.params.id));
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
                    onClick={() => this.handleJoinGame(game._id)}
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
          <Link to="/" onClick={() => this.handleLobbyLeave(user)}>
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
