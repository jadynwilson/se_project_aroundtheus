import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = [...this._popupForm.querySelectorAll(".modal__input")];
    this._modalSubmitButton =
      this._popupElement.querySelector(".modal__button");
  }

  _getInputValues() {
    const inputValue = {};

    this._inputList.forEach((input) => {
      inputValue[input.name] = input.value;
    });

    return inputValue;
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const inputValues = this._getInputValues();
      this._handleFormSubmit(inputValues);
      this._popupForm.reset();
    });
    super.setEventListeners();
  }

  showButtonLoading(text) {
    this._modalSubmitButton.textContent = text;
  }

  hideButtonLoading(defaultText) {
    this._modalSubmitButton.textContent = defaultText;
  }
}
