import { authHeader } from "../_helpers";

export const GameService = {
  getGames,
  getGame
};

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
