import { authHeader } from "../_helpers";

export const lobbyService = {
  createLobby,
  getLobbies,
  getLobby,
  getLobbyUsers,
  getLobbyGames,
  delete: _delete
};

function createLobby(name) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({ name })
  };

  return fetch("http://localhost:5000/api/lobbies", requestOptions).then(
    response => {
      if (!response.ok) {
        return Promise.reject(response.statusText);
      }

      return response.json();
    }
  );
}

function getLobbies() {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };

  return fetch("http://localhost:5000/api/lobbies", requestOptions).then(
    handleResponse
  );
}

function getLobby(id) {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };

  return fetch("http://localhost:5000/api/lobbies" + _id, requestOptions).then(
    handleResponse
  );
}

function getLobbyUsers(id) {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };

  return fetch(
    "http://localhost:5000/api/lobbies" + _id + "/users",
    requestOptions
  ).then(handleResponse);
}

function getLobbyGames(id) {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };

  return fetch(
    "http://localhost:5000/api/lobbies" + _id + "/games",
    requestOptions
  ).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  const requestOptions = {
    method: "DELETE",
    headers: authHeader()
  };

  return fetch("http://localhost:5000/api/lobbies/" + id, requestOptions).then(
    handleResponse
  );
}

function handleResponse(response) {
  if (!response.ok) {
    return Promise.reject(response.statusText);
  }

  return response.json();
}
