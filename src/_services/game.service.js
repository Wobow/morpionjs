import { authHeader } from "../_helpers";

export const GameService = {
  getGames,
  getGame
};

function createGame(lobbyId) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({
      type: "createGame",
      accessResource: lobbyId
    })
  };

  return fetch("http://localhost:5000/api/requests", requestOptions).then(
    handleResponse
  );
}

function leaveGame(userId) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({
      type: "leaveGame",
      accessResource: userId
    })
  };

  return fetch("http://localhost:5000/api/requests", requestOptions).then(
    handleResponse
  );
}
function joinGame(gameId) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({
      type: "joinGame",
      accessResource: gameId
    })
  };

  return fetch("http://localhost:5000/api/requests", requestOptions).then(
    handleResponse
  );
}

function getGames() {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };

  return fetch("http://localhost:5000/api/games", requestOptions).then(
    handleResponse
  );
}

function getGame(id) {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };

  return fetch("http://localhost:5000/api/games/" + _id, requestOptions).then(
    handleResponse
  );
}

function handleResponse(response) {
  if (!response.ok) {
    return Promise.reject(response.statusText);
  }

  return response.json();
}
