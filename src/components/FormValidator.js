export default class FormValidator {
  constructor(config, form) {
    this._formElement = form;

    this._inputSelector = config.inputSelector;

    this._submitButtonSelector = config.submitButtonSelector;

    this._inactiveButtonClass = config.inactiveButtonClass;

    this._inputErrorClass = config.inputErrorClass;

    this._errorClass = config.errorClass;

    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
  }

  _showInputError = (inputEl) => {
    const errorMessageEl = this._formElement.querySelector(
      `#${inputEl.id}-error`
    );

    inputEl.classList.add(this._inputErrorClass);

    errorMessageEl.textContent = inputEl.validationMessage;

    errorMessageEl.classList.add(this._errorClass);
  };

  _hideInputError = (inputEl) => {
    const errorMessageEl = this._formElement.querySelector(
      `#${inputEl.id}-error`
    );

    inputEl.classList.remove(this._inputErrorClass);

    errorMessageEl.textContent = "";

    errorMessageEl.classList.add(this._errorClass);
  };

  _checkInputValidity = (inputEl) => {
    if (!inputEl.validity.valid) {
      this._showInputError(inputEl);
    } else {
      this._hideInputError(inputEl);
    }
  };

  _hasInvalidInput(inputList) {
    let foundInvalid = false;

    this._inputList.forEach((inputElement) => {
      if (!inputElement.validity.valid) {
        foundInvalid = true;
      }
    });

    return foundInvalid;
  }

  _toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this.disableButton();
    } else {
      this._enableButton();
    }
  };

  _enableButton = () => {
    this._submitButton.classList.remove(this._inactiveButtonClass);

    this._submitButton.disabled = false;
  };

  disableButton = () => {
    this._submitButton.classList.add(this._inactiveButtonClass);

    this._submitButton.disabled = true;
  };

  _setEventListeners() {
    this._submitButton = this._formElement.querySelector(
      this._submitButtonSelector
    );

    this._inputList.forEach((inputEl) => {
      inputEl.addEventListener("input", () => {
        this._checkInputValidity(inputEl);

        this._toggleButtonState(inputEl);
      });
    });
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    this._setEventListeners();
  }

  resetForm() {
    this._formElement.reset();
  }

  resetValidation() {
    this._toggleButtonState();

    this._inputList.forEach((inputEl) => {
      this._hideInputError(inputEl);
    });
  }
}
