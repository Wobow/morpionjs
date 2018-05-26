import { tictacConstants } from "../_constants";

export const tictacActions = {
  turn,
  playTurn,
  getBoard
};

function turn(isMyTurn) {
  return dispatch => {
    dispatch(request({ isMyTurn }));
  };

  function request(isMyTurn) {
    return { type: tictacConstants.TICTAC_TURN_REQUEST, isMyTurn };
  }
}

function playTurn(cellId, secret, gameId, socket) {
  socket.emit("playTurn", {
    gameId: gameId,
    secret: secret,
    move: cellId
  });
}

function getBoard(moves) {
  return dispatch => {
    dispatch(request({ moves }));
  };
  function request(moves) {
    return { type: tictacConstants.TICTAC_BOARD_REQUEST, moves };
  }
}
