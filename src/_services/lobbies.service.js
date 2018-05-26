import { authHeader } from "../_helpers";

export const lobbyService = {
  createLobby,
  getLobbies,
  getLobby,
  getLobbyUsers,
  getLobbyGames,
  joinLobby,
  leaveLobby,
  delete: _delete
};

function joinLobby(id) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({
      type: "joinLobby",
      accessResource: id
    })
  };

  return fetch("http://morbak.alan-balbo.com/api/requests", requestOptions).then(
    handleResponse
  );
}

async function leaveLobby(userId) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: await JSON.stringify({
      type: "leaveLobby",
      accessResource: userId
    })
  };

  return fetch("http://morbak.alan-balbo.com/api/requests", requestOptions).then(
    handleResponse
  );
}

function createLobby(name) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({ name })
  };

  return fetch("http://morbak.alan-balbo.com/api/lobbies", requestOptions).then(
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

  return fetch("http://morbak.alan-balbo.com/api/lobbies", requestOptions).then(
    handleResponse
  );
}

function getLobby(id) {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };

  return fetch("http://morbak.alan-balbo.com/api/lobbies/" + id, requestOptions).then(
    handleResponse
  );
}

function getLobbyUsers(id) {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };

  return fetch(
    "http://morbak.alan-balbo.com/api/lobbies/" + id + "/users",
    requestOptions
  ).then(handleResponse);
}

function getLobbyGames(id) {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };

  return fetch(
    "http://morbak.alan-balbo.com/api/lobbies/" + id + "/games",
    requestOptions
  ).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  const requestOptions = {
    method: "DELETE",
    headers: authHeader()
  };

  return fetch("http://morbak.alan-balbo.com/api/lobbies/" + id, requestOptions).then(
    handleResponse
  );
}

function handleResponse(response) {
  if (!response.ok) {
    return Promise.reject(response.statusText);
  }
  const ret = response.json();
  console.log("Response is");
  console.log(ret);
  return ret;
}
