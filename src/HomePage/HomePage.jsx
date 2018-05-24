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
      lobbies: {}
    };
    this.props.dispatch(userActions.getAll());
    this.props.dispatch(lobbyActions.getAll());
    this.props.dispatch(lobbyActions.leaveLobby(this.props.user.user._id));
  }

  componentDidMount() {}

  handleJoinLobby(id) {
    return e => this.props.dispatch(lobbyActions.joinLobby(id));
  }

  handleDeleteUser(id) {
    return e => this.props.dispatch(userActions.delete(id));
  }

  handleDeleteLobby(id) {
    return e => this.props.dispatch(lobbyActions.delete(id));
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.setState({ submitted: true });
    const { lobbyName } = this.state;
    const { dispatch } = this.props;
    if (lobbyName) {
      dispatch(lobbyActions.create(lobbyName));
    }
  };

  render() {
    const { user, users, lobbies } = this.props;
    const { lobbyName, submitted } = this.state;
    let test = false;

    console.log("toto");
    console.log(this.state);
    console.log(users);
    console.log(lobbies);
    console.log(this.props);

    return (
      <div className="col-md-6 col-md-offset-3">
        <h1>Hi {user.firstName}!</h1>
        <p>You're logged in with React!!</p>
        <h3>All registered users:</h3>
        {users.loading && <em>Loading users...</em>}
        {users.error && (
          <span className="text-danger">ERROR: {users.error}</span>
        )}
        {users.items && (
          <ul>
            {users.items.map((user, index) => (
              <li key={user._id}>
                {user.username}
                {user.deleting ? (
                  <em> - Deleting...</em>
                ) : user.deleteError ? (
                  <span className="text-danger">
                    {" "}
                    - ERROR: {user.deleteError}
                  </span>
                ) : (
                  <span>
                    {" "}
                    - <a onClick={this.handleDeleteUser(user.id)}>Delete</a>
                  </span>
                )}
              </li>
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
                      <a onClick={this.handleDeleteLobby(lobby._id)}>Delete</a>
                      <Link
                        to={`/lobby/${lobby._id}`}
                        onClick={this.handleJoinLobby(lobby._id)}
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
        <p>
          <Game />
        </p>
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
