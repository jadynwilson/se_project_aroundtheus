import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
  }

  setHandleDeleteMethod(handleDeleteSubmit) {
    this._handleDeleteSubmit = handleDeleteSubmit;
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleDeleteSubmit();
    });
    super.setEventListeners();
  }
}
