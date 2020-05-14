// Переменные
// Глобальная переменная root
const root = document.querySelector('.root');

// Область карточек
const placesList = root.querySelector('.places-list');

// Отдельная карточка
const placeCard = root.querySelector('.place-card');

// Данные пользователя в html
const userInfoName = root.querySelector('.user-info__name');
const userInfoJob = root.querySelector('.user-info__job');

// Попап добавления карточек и кнопка его открытия
const addButton = root.querySelector('.user-info__button');
const popup = root.querySelector('.popup-box');
const popupForm = root.querySelector('.popup__form');
const popupButton = popupForm.querySelector('.popup__button');

// Попап редактирования информации пользователя и кнопка открытия
const editButton = root.querySelector('.user-info__edit-button');
const editor = root.querySelector('.popup_editor');
const editorForm = editor.querySelector('.popup__form_editor');
const editorName = editorForm.querySelector('.popup__input_editor_type_name');
const editorAbout = editorForm.querySelector('.popup__input_editor_type_about');
const popupButtonEdit = editorForm.querySelector('.popup__button_editor');

// Попап увеличенной картинки
const widget = root.querySelector('.widget');

// Кнопки закрытия попапов
const closePopup = popup.querySelector('.popup__close');
const closeEditor = editor.querySelector('.popup__close_editor');
const closeWidget = widget.querySelector('.widget__close');

// Пустой массив для хранения карточек
const initialCards = [];

// Объект с ошибками для полей форм
const objectErrors = {
  required: 'Это обязательное поле',
  characterLength: 'Должно быть от 2 до 30 символов',
  typeLink: 'Здесь должна быть ссылка',
};

// Данные для авторизации
const token = '2a99eabc-8064-4ad5-93d7-0eee6d1d7fb0';
const baseUrl = 'https://praktikum.tk/cohort10';

// API
const api = new Api({
  server: baseUrl,
  headers: {
    authorization: token,
    'Content-Type': 'application/json',
  },
});

// Делаем запрос информации о пользователе с сервера
api.getInfoUser().then(main).catch(() => location.reload());
function main(user) {
// Получаем id пользователя с сервера
const userId = user._id;

// Конструкторы
const card = new Card(placesList, userId);
const createCard = (obj) => card.create(obj);
const cardList = new CardList(placesList, initialCards, createCard);
const popupAdd = new Popup(popup);
const popupEdit = new Popup(editor);
const popupZoom = new Popup(widget);
const formValidator = new FormValidator(objectErrors);
const widgetZoom = new Widget(widget);
const userInfo = new UserInfo(userInfoName, userInfoJob);

// Открытие Popup добавления пользовательских карточек
addButton.addEventListener('click', () => {
  popupAdd.open();
  formValidator.resetErrors(popupForm, popupButton);
});

// Открытие Popup редактирования основной информации профиля
editButton.addEventListener('click', () => {
  userInfo.setUserInfo(editorName, userInfoName);
  userInfo.setUserInfo(editorAbout, userInfoJob);
  popupEdit.open();
  formValidator.setSubmitButtonState(editorForm, editorForm.lastElementChild);
});

// Открытие Popup увеличенного изображения
placesList.addEventListener('click', (event) => {
  if (event.target.classList.contains('place-card__image')) {
    popupZoom.open();
    widgetZoom.zoom(event);
  }
});

// Закрытие Popup добавления пользовательских карточек
closePopup.addEventListener('click', () => {
  formValidator.resetErrors(popupForm, popupButton);
  popupAdd.close();
  popupForm.reset();
});

// Закрытие Popup редактирования основной информации профиля
closeEditor.addEventListener('click', () => {
  formValidator.resetErrors(editorForm, popupButtonEdit);
  popupEdit.close();
  editorForm.reset();
});

// Закрытие Popup увеличенного изображения
closeWidget.addEventListener('click', () => {
  popupZoom.close();
});

// Вызовы функций
formValidator.setEventListeners(popupForm);
formValidator.setEventListeners(editorForm);
userInfo.setUserInfo(editorName, userInfoName);
userInfo.setUserInfo(editorAbout, userInfoJob);

// Рендер готовых карточек с сервера
api
  .getInitialCards()
  .then((data) => {
    data.forEach((res) => {
      initialCards.push(res);
    });
    cardList.render();
  })
  .catch((err) => console.log(err));

// Редактирование информации профиля
editorForm.addEventListener('submit', (event) => {
  event.preventDefault();
  api
    .patchInfoUser(editorName.value, editorAbout.value)
    .then(() => {
      userInfo.updateUserInfo(editorName, editorAbout);
      editor.classList.remove('popup_is-opened');
    })
    .catch((err) => console.log(err));
});

// Отображение информации пользователя в html
api
  .getInfoUser()
  .then((info) => {
    userInfoName.textContent = info.name;
    userInfoJob.textContent = info.about;
  })
  .catch((err) => console.log(err));

// Добавление новых карточек
popupForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const popupName = popupForm.querySelector('.popup__input_type_description');
  const popupLink = popupForm.querySelector('.popup__input_type_link-url');
  api
    .postNewCard(popupName.value, popupLink.value)
    .then((res) => {
      const inputValues = {
        name: res.name,
        link: res.link,
        likes: res.likes,
        owner: res.owner,
        _id: res._id,
      };
      cardList.addCard(inputValues);
      popupAdd.close();
      popupForm.reset();
    })
    .catch((err) => console.log(err));
});

// Вызов функции слушателей на remove && like
card.setEventListeners();
};