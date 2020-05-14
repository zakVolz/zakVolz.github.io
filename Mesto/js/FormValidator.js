class FormValidator {
	constructor(objectErrors) {
		this.objectErrors = objectErrors;
		this.validate = this.validate.bind(this);
	};

	// Валидатор формы
	checkInputValidity(input, error) {
		if (input.value.length === 0) {
			error.textContent = this.objectErrors.required;
			return;
		}
		if (input.validity.tooShort === true) {
			error.textContent = this.objectErrors.characterLength;
			return;
		}
		if (input.validity.typeMismatch) {
			error.textContent = this.objectErrors.typeLink;
			return;
		} error.textContent = `\u00A0`;
	};

	// Изменение состояния кнопки в форме
	setSubmitButtonState(form, button) {
		const inputs = Array.from(form.getElementsByTagName('input'));
		let isValid = true;
		inputs.forEach((value) => {
			if (!value.validity.valid) {
				isValid = false;
			};
		});
		if (isValid) {
			button.removeAttribute('disabled', true);
			button.classList.add('button_is-enabled');
		} else {
			button.setAttribute('disabled', true);
			button.classList.remove('button_is-enabled');
		};
	};

	// Валидация
	validate(event) {
		this.checkInputValidity(event.target, event.target.nextElementSibling);
		this.setSubmitButtonState(event.currentTarget, event.currentTarget.lastElementChild);
	};

	// Добавление обработчиков к валидации
	setEventListeners(popup) {
		popup.addEventListener('input', this.validate);
	};

	// Сброс ошибок
	resetErrors(popup, button) {
		popup.querySelectorAll('.popup__error').forEach((item) => {
			item.textContent = `\u00A0`;
			this.setSubmitButtonState(popup, button)
		});
	};
};