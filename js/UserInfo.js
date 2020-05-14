class UserInfo {
	constructor(nameValue, infoValue) {
		this.nameValue = nameValue;
		this.infoValue = infoValue;
	}
	// Передача информации в input
	setUserInfo(inputValue, contentValue) {
		inputValue.value = contentValue.textContent;
		inputValue.textContent = contentValue.value;
	};

	// Передача информации в html
	updateUserInfo(formName, formAbout) {
		this.setUserInfo(this.nameValue, formName);
		this.setUserInfo(this.infoValue, formAbout);
	};
};