class Popup {
	constructor(popup) {
		this.popup = popup;
	};

	// Открытие Popup
	open() {
		if (event.target.classList.contains('button')
			|| event.target.classList.contains('place-card__image')) {
			this.popup.classList.toggle('popup_is-opened');
		};
	};

	// Закрытие Popup
	close() {
		this.popup.classList.remove('popup_is-opened');
	};
};