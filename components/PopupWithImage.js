import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._previewImage = this._popupElement.querySelector(
      ".modal__preview-image"
    );
    this._previewImageTitle = this._popupElement.querySelector(
      ".modal__title-preview"
    );
  }
  open(data) {
    this._previewImage.src = data.link;
    this._previewImage.alt = data.name;
    this._previewImageTitle.textContent = data.name;
    super.open();
  }
}
