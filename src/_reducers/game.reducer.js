import { gameConstants } from "../_constants";

export function lobbies(state = {}, action) {
  switch (action.type) {
    // Get All Lobbies
    case gameConstants.GAME_GETALL_REQUEST:
      return Object.assign({}, state, {
        loading: true
      });
    case gameConstants.GAME_GETALL_SUCCESS:
      return Object.assign({}, state, {
        games: action.games
      });
    case gameConstants.GAME_GETALL_FAILURE:
      return Object.assign({}, state, {
        error: action.error
      });

    // Get One game
    case gameConstants.GAME_GET_REQUEST:
      return Object.assign({}, state, {
        loading: true
      });
    case gameConstants.GAME_GET_SUCCESS:
      return Object.assign({}, state, {
        game: action.game
      });
    case gameConstants.GAME_GET_FAILURE:
      return Object.assign({}, state, {
        error: action.error
      });

    // Join game
    case gameConstants.GAME_JOIN_REQUEST:
      return Object.assign({}, state, {
        loading: true
      });
    case gameConstants.GAME_JOIN_SUCCESS:
      return Object.assign({}, state, {
        currgame: action.res.requestId
      });
    case gameConstants.GAME_JOIN_FAILURE:
      return Object.assign({}, state, {
        error: action.error
      });

    // Leave game
    case gameConstants.GAME_LEAVE_REQUEST:
      return Object.assign({}, state, {
        loading: true
      });
    case gameConstants.GAME_LEAVE_SUCCESS:
      return Object.assign({}, state, {
        loading: false
      });
    /*  return {
        ...state,
        loading: false
      };*/
    case gameConstants.GAME_LEAVE_FAILURE:
      return Object.assign({}, state, {
        error: action.error
      });

    // Delete game
    case gameConstants.GAME_DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      return Object.assign({}, state, {
        games: state.games.map(
          game => (game.id === action.id ? { ...game, deleting: true } : game)
        )
      });
    case gameConstants.GAME_DELETE_SUCCESS:
      // remove deleted user from state
      return Object.assign({}, state, {
        games: state.games.filter(game => game.id !== action.id)
      });
    case gameConstants.GAME_DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user
      return Object.assign({}, state, {
        games: state.games.map(game => {
          if (game.id === action.id) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...gameCopy } = game;
            // return copy of user with 'deleteError:[error]' property
            return { ...gameCopy, deleteError: action.error };
          }

          return game;
        })
      });
    default:
      return state;
  }
}
