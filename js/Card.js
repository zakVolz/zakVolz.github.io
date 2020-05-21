class Card {
  constructor(placesList, id, _card) {
    this.placesList = placesList;
    this.id = id;
    this._card = _card;
  }

  // Кнопка Like
  like(event, api) {
    const placeCard = event.target.closest('.place-card');
    const counter = event.target.nextElementSibling;
    if (
      event.target.classList.contains('place-card__like-icon') &&
      !event.target.classList.contains('place-card__like-icon_liked')
    ) {
      api
        .putLikes(placeCard.dataset.cardId)
        .then((data) => {
          event.target.classList.toggle('place-card__like-icon_liked');
          counter.textContent = data.likes.length;
        })
        .catch((err) => console.log(err));
    } else if (event.target.classList.contains('place-card__like-icon_liked')) {
      api
        .deleteLikes(placeCard.dataset.cardId)
        .then((data) => {
          event.target.classList.toggle('place-card__like-icon_liked');
          counter.textContent = data.likes.length;
        })
        .catch((err) => console.log(err));
    }
  }

  // Кнопка удаления карточки
  remove(event, api) {
    const placeCard = event.target.closest('.place-card');
    if (
      event.target.classList.contains('place-card__delete-icon') &&
      confirm('Удалить данную карточку?')
    ) {
      api
        .deleteCard(placeCard.dataset.cardId)
        .then(() => {
          this.placesList.removeChild(event.target.closest('.place-card'));
          placeCard
            .querySelector('.place-card__like-icon')
            .removeEventListener('click', (event) => this.like(event, api));
          event.target.removeEventListener('click', (event) =>
            this.remove(event, api)
          );
        })
        .catch((err) => console.log(err));
    }
  }

  // Отображение ранее установленных лайков пользователем
  setLikes(obj) {
    let likeState;
    if (obj.likes.find((res) => res._id === this.id)) {
      return (likeState = 'place-card__like-icon_liked');
    }
    return likeState;
  }

  // Установка слушателей на remove && like
  setEventListeners() {
    this.placesList.addEventListener('click', (event) => {
      this.like(event, api);
    });
    this.placesList.addEventListener('click', (event) => {
      this.remove(event, api);
    });
  }

  // Добавление карточки
  create(obj) {
    const template = document.createElement('div');
    template.insertAdjacentHTML(
      'beforeend',
      `
			<div class="place-card">
			<div class="place-card__image">
			<button class="place-card__delete-icon" style="display: none"></button>
			</div>
			<div class="place-card__description">
			<h3 class="place-card__name"></h3>
			<div class="place-card__like-group">
			<button class="place-card__like-icon"></button>
			<span class="place-card__like-counter">0</span>
			</div>
			</div>
			</div>`
    );
    this._card = template.firstElementChild;
    this._card.dataset.cardId = obj._id;
    this._card.querySelector('.place-card__name').textContent = obj.name;
    this._card.querySelector('.place-card__image').style.backgroundImage = `url(${obj.link})`;
    this._card.querySelector('.place-card__like-icon').classList.add(this.setLikes(obj));
    this._card.querySelector('.place-card__like-counter').textContent = obj.likes.length;
    this._card.querySelector('.place-card__image').style.cursor = 'pointer';

    // Сверка id пользователя и id автора карточки для отображения кнопки удаления
    if (obj.owner._id === this.id) {
      this._card
        .querySelector('.place-card__delete-icon')
        .removeAttribute('style');
    }
    return this._card;
  }
}
