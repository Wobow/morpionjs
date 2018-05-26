import { gameConstants } from "../_constants";

export function games(state = {}, action) {
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

    case gameConstants.GAME_LEAVE_FAILURE:
      return Object.assign({}, state, {
        error: action.error
      });

    // Delete game
    case gameConstants.GAME_DELETE_REQUEST:
      return Object.assign({}, state, {
        games: state.games.map(
          game => (game.id === action.id ? { ...game, deleting: true } : game)
        )
      });
    case gameConstants.GAME_DELETE_SUCCESS:
      return Object.assign({}, state, {
        games: state.games.filter(game => game.id !== action.id)
      });
    case gameConstants.GAME_DELETE_FAILURE:
      return Object.assign({}, state, {
        games: state.games.map(game => {
          if (game.id === action.id) {
            const { deleting, ...gameCopy } = game;

            return { ...gameCopy, deleteError: action.error };
          }

          return game;
        })
      });
    default:
      return state;
  }
}
