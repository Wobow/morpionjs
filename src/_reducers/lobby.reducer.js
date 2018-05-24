import { lobbyConstants } from "../_constants";

export function lobbies(state = {}, action) {
  switch (action.type) {
    // Get All Lobbies
    case lobbyConstants.LOBBY_GETALL_REQUEST:
      return Object.assign({}, state, {
        loading: true
      });
    case lobbyConstants.LOBBY_GETALL_SUCCESS:
      return Object.assign({}, state, {
        items: action.lobbys
      });
    case lobbyConstants.LOBBY_GETALL_FAILURE:
      return Object.assign({}, state, {
        error: action.error
      });

    // Get One Lobby
    case lobbyConstants.LOBBY_GET_REQUEST:
      return Object.assign({}, state, {
        loading: true
      });
    case lobbyConstants.LOBBY_GET_SUCCESS:
      return Object.assign({}, state, {
        items: action.lobbys
      });
    case lobbyConstants.LOBBY_GET_FAILURE:
      return Object.assign({}, state, {
        error: action.error
      });

    // Join Lobby
    case lobbyConstants.LOBBY_JOIN_REQUEST:
      return Object.assign({}, state, {
        loading: true
      });
    case lobbyConstants.LOBBY_JOIN_SUCCESS:
      return Object.assign({}, state, {
        currLobby: action.res.requestId
      });
    case lobbyConstants.LOBBY_JOIN_FAILURE:
      return Object.assign({}, state, {
        error: action.error
      });

    // Leave Lobby
    case lobbyConstants.LOBBY_LEAVE_REQUEST:
      return Object.assign({}, state, {
        loading: true
      });
    case lobbyConstants.LOBBY_LEAVE_SUCCESS:
      return Object.assign({}, state, {
        loading: false
      });
    /*  return {
        ...state,
        loading: false
      };*/
    case lobbyConstants.LOBBY_LEAVE_FAILURE:
      return Object.assign({}, state, {
        error: action.error
      });

    case lobbyConstants.LOBBY_GAMES_GET_REQUEST:
      return Object.assign({}, state, {
        loading: true
      });
    case lobbyConstants.LOBBY_GAMES_GET_SUCCESS:
      return Object.assign({}, state, {
        games: action.games
      });
    case lobbyConstants.LOBBY_GAMES_GET_FAILURE:
      return Object.assign({}, state, {
        error: action.error
      });

    // Delete Lobby
    case lobbyConstants.LOBBY_DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      return Object.assign({}, state, {
        ...state,
        items: state.items.map(
          lobby =>
            lobby.id === action.id ? { ...lobby, deleting: true } : lobby
        )
      });
    case lobbyConstants.LOBBY_DELETE_SUCCESS:
      // remove deleted user from state
      return Object.assign({}, state, {
        items: state.items.filter(lobby => lobby.id !== action.id)
      });
    case lobbyConstants.LOBBY_DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user
      return Object.assign({}, state, {
        ...state,
        items: state.items.map(lobby => {
          if (lobby.id === action.id) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...lobbyCopy } = lobby;
            // return copy of user with 'deleteError:[error]' property
            return { ...lobbyCopy, deleteError: action.error };
          }

          return lobby;
        })
      });
    default:
      return state;
  }
}
