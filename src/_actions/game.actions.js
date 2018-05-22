import { gameConstants } from "../_constants";
import { gameService } from "../_services";
import { alertActions } from "./";
import { history } from "../_helpers";

export const gameActions = {
  create,
  list,
  get,
  join,
  leave
};

function create(lobbyId) {
  return dispatch => {
    dispatch(request({ lobbyId }));

    gameService.createGame(name).then(
      game => {
        dispatch(success(game));
      },
      error => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      }
    );
  };

  function request(lobbyId) {
    return { type: gameConstants.GAME_CREATE_REQUEST, lobbyId };
  }
  function success(lobbyId) {
    return { type: gameConstants.GAME_CREATE_SUCCESS, lobbyId };
  }
  function failure(error) {
    return { type: gameConstants.GAME_CREATE_FAILURE, lobbyId };
  }
}

function list() {
  return dispatch => {
    dispatch(request());

    gameService
      .getGames()
      .then(
        games => dispatch(success(games)),
        error => dispatch(failure(error))
      );
  };

  function request() {
    return { type: gameConstants.GAME_GETALL_REQUEST };
  }
  function success(games) {
    console.log("game SUCCESS");
    return { type: gameConstants.GAME_GETALL_SUCCESS, games };
  }
  function failure(error) {
    return { type: gameConstants.GAME_GETALL_FAILURE, error };
  }
}

function get(id) {
  return dispatch => {
    dispatch(request());

    gameService
      .getGame(id)
      .then(game => dispatch(success(game)), error => dispatch(failure(error)));
  };

  function request() {
    return { type: gameConstants.GAME_GET_REQUEST };
  }
  function success(game) {
    return { type: gameConstants.GAME_GET_SUCCESS, game };
  }
  function failure(error) {
    return { type: gameConstants.GAME_GET_FAILURE, error };
  }
}

function join(id) {
  return dispatch => {
    dispatch(request());

    gameService
      .joinGame(id)
      .then(res => dispatch(success(res)), error => dispatch(failure(error)));
  };

  function request() {
    return { type: gameConstants.GAME_JOIN_REQUEST };
  }
  function success(res) {
    return { type: gameConstants.GAME_JOIN_SUCCESS, res };
  }
  function failure(error) {
    return { type: gameConstants.GAME_JOIN_FAILURE, error };
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function leave(id) {
  return dispatch => {
    dispatch(request(id));

    gameService.leaveGame(id).then(
      game => {
        dispatch(success(id));
      },
      error => {
        dispatch(failure(id, error));
      }
    );
  };

  function request(id) {
    return { type: gameConstants.GAME_LEAVE_REQUEST, id };
  }
  function success(id) {
    return { type: gameConstants.GAME_LEAVE_SUCCESS, id };
  }
  function failure(id, error) {
    return { type: gameConstants.GAME_LEAVE_FAILURE, id, error };
  }
}
