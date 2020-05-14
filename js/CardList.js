class CardList {
	constructor(container, array, createCard) {
		this.container = container;
		this.array = array;
		this.createCard = createCard;
	};


	// Добавление карточек
	addCard(obj) {
		this.container.appendChild(this.createCard(obj));
	};

	// Рендер готовых карточек
	render() {
		for (let item of this.array) {
			this.addCard(item);
		};
	};
}