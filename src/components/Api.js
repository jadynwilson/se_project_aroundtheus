export default class Api {
  constructor({ baseURL, headers }) {
    this._baseURL = baseURL;
    this._headers = headers;
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkPromise);
  }

  _checkPromise(res) {
    if (res.ok) {
      return res.json();
    }
    // promise is rejected if the server returns an error
    return Promise.reject(`Error: ${res.status}`);
  }

  //Card Routes

  getInitialCards() {
    return this._request(`${this._baseURL}/cards`, { headers: this._headers });
  }

  addNewCard(name, link) {
    return this._request(`${this._baseURL}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    });
  }

  deleteCard(cardId) {
    return this._request(`${this._baseURL}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  likeCard(cardId) {
    return this._request(`${this._baseURL}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then(() => console.log("Card has been liked"));
  }

  dislikeCard(cardId) {
    return this._request(`${this._baseURL}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then(() => console.log("Card is not yet liked"));
  }

  //User Routes

  getUserInfo() {
    return this._request(`${this._baseURL}/users/me`, {
      headers: this._headers,
    }).then((userData) => {
      return userData;
    });
  }

  updateUserInfo(name, about) {
    return this._request(`${this._baseURL}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    });
  }

  updateAvatar(link) {
    return this._request(`${this._baseURL}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: link,
      }),
    });
  }
}
