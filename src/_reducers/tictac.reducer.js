import { tictacConstants } from "../_constants";

export function tictac(state = {}, action) {
  console.log("TICTAC REDUCER");
  console.log(action);
  switch (action.type) {
    // Get All Lobbies
    case tictacConstants.TICTAC_TURN_REQUEST:
      return Object.assign({}, state, {
        isMyTurn: action.isMyTurn.isMyTurn
      });
    case tictacConstants.TICTAC_BOARD_REQUEST:
      return Object.assign({}, state, {
        board: action.moves.moves
      });
    default:
      return state;
  }
}
