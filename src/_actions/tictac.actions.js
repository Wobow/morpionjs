import { tictacConstants } from "../_constants";

export const tictacActions = {
  turn,
  playTurn,
  getBoard
};

function turn(isMyTurn) {
  console.log("IN TURNHINGY");
  return dispatch => {
    dispatch(request({ isMyTurn }));
  };

  function request(isMyTurn) {
    let ret = { type: tictacConstants.TICTAC_TURN_REQUEST, isMyTurn };

    return ret;
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
    dispatch(request({ moves: moves }));
  };
  function request(moves) {
    let ret = { type: tictacConstants.TICTAC_BOARD_REQUEST, moves };
    console.log(ret);
    return ret;
  }
}
