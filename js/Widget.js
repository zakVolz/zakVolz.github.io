class Widget {
	constructor(widget) {
		this.widget = widget;
	}

	zoom(event) {
		if (event.target.classList.contains('place-card__image')) {
			const placeCardImage = event.target.closest('.place-card__image').style.backgroundImage.slice(5, -2);
			this.widget.querySelector('.widget__zoom-image').setAttribute(`src`, `${placeCardImage}`);
		}
	};
}