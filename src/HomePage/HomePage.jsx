import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Game } from "../_components/Game.js";
import { userActions } from "../_actions";
import { lobbyActions } from "../_actions";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lobbyName: "",
      submitted: false,
      lobbies: {},
      userId: this.props.user.user._id
    };
    this.props.dispatch(userActions.getAll());
    this.props.dispatch(lobbyActions.getAll());
  }

  componentWillUnMount() {
    lobbyActions.leaveLobby(this.state.userId);
  }

  handleJoinLobby(id) {
    this.props.dispatch(lobbyActions.joinLobby(id));
  }

  handleDeleteUser(id) {
    this.props.dispatch(userActions.delete(id));
  }

  async handleDeleteLobby(id) {
    this.props.dispatch(await lobbyActions.delete(id));
    this.props.dispatch(lobbyActions.getAll());
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async e => {
    e.preventDefault();

    this.setState({ submitted: true });
    const { lobbyName } = this.state;
    const { dispatch } = this.props;
    if (lobbyName) {
      dispatch(await lobbyActions.create(lobbyName));
      dispatch(lobbyActions.getAll());
    }
  };

  render() {
    const { user, users, lobbies } = this.props;
    const { lobbyName, submitted } = this.state;
    let test = false;

    return (
      <div className="col-md-6 col-md-offset-3">
        <h1>Hi {user.firstName}!</h1>
        <p>
          You're logged in with React!!<br />Welcome on Morpion JS Project.
        </p>
        <h3>Here are the registered users and lobbies:</h3>
        {users.loading && <em>Loading users...</em>}
        {users.error && (
          <span className="text-danger">ERROR: {users.error}</span>
        )}
        {users.items && (
          <ul>
            {users.items.map((user, index) => (
              <li key={user._id}>{user.username}</li>
            ))}
          </ul>
        )}

        {lobbies &&
          lobbies.items && (
            <ul>
              {lobbies.items.map((lobby, index) => (
                <li key={lobby._id}>
                  {lobby.name}
                  {lobby.deleting ? (
                    <em> - Deleting...</em>
                  ) : lobby.deleteError ? (
                    <span className="text-danger">
                      {" "}
                      - ERROR: {lobby.deleteError}
                    </span>
                  ) : (
                    <span>
                      {" "}
                      -{" "}
                      <a onClick={() => this.handleDeleteLobby(lobby._id)}>
                        Delete
                      </a>
                      <Link
                        to={`/lobby/${lobby._id}`}
                        onClick={() => this.handleJoinLobby(lobby._id)}
                      >
                        Join
                      </Link>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}

        <p>
          <Link to="/login">Logout</Link>
        </p>

        <form name="form" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="lobbyName   ">LobbyName</label>
            <input
              type="text"
              className="form-control"
              name="lobbyName"
              value={lobbyName}
              onChange={this.handleChange}
            />
            {submitted &&
              !lobbyName && (
                <div className="help-block">Lobby name is required</div>
              )}
          </div>
          <div className="form-group">
            <button className="btn btn-primary">Create Lobby</button>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { users, authentication, lobbies } = state;
  const { user } = authentication;
  console.log("this is test");
  return {
    user,
    users,
    lobbies
  };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };
