class Api {
  constructor(key) {
    this.key = key;
  }

  _getData(res) {
    if (res.ok) return res.json();
    return Promise.reject(`Ошибка: ${res.status} (${res.statusText})`);
  }

  // Получение информации о пользователе
  async getInfoUser() {
    const res = await fetch(`${this.key.server}/users/me`, {
      headers: this.key.headers,
    });
    return this._getData(res);
  }

  // Получение карточек
  async getInitialCards() {
    const res = await fetch(`${this.key.server}/cards`, {
      headers: this.key.headers,
    });
    return this._getData(res);
  }

  // Обновление информации о пользователе
  async patchInfoUser(name, about) {
    const res = await fetch(`${this.key.server}/users/me`, {
      method: 'PATCH',
      headers: this.key.headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    });
    return this._getData(res);
  }

  // Отправка новой карточки
  async postNewCard(name, link) {
    const res = await fetch(`${this.key.server}/cards`, {
      method: 'POST',
      headers: this.key.headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    });
    return this._getData(res);
  }

  // Удаление карточки
  async deleteCard(cardId) {
    const res = await fetch(`${this.key.server}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.key.headers,
    });
    return this._getData(res);
  }

  // Оправка лайков
  async putLikes(cardId) {
    const res = await fetch(`${this.key.server}/cards/like/${cardId}`, {
      method: 'PUT',
      headers: this.key.headers,
    });
    return this._getData(res);
  }

  // Удаление лайков
  async deleteLikes(cardId) {
    const res = await fetch(`${this.key.server}/cards/like/${cardId}`, {
      method: 'DELETE',
      headers: this.key.headers,
    });
    return this._getData(res);
  }
}
