export default class Card {
  constructor({ name, link }, cardSelector, handleImageClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    this._cardLikeButton.addEventListener("click", () => {
      this._handleLikeIcon();
    });
    this._cardElement
      .querySelector(".cards__list-trash")
      .addEventListener("click", () => {
        this._cardElement.remove();
      });

    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this);
    });
  }
  _handleLikeIcon() {
    this._cardLikeButton.classList.toggle("cards__like-button-active");
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".cards__list-cards")
      .cloneNode(true);

    this._cardImage = this._cardElement.querySelector(".cards__list-image");
    this._cardTitle = this._cardElement.querySelector(".cards__list-title");
    this._cardLikeButton = this._cardElement.querySelector(
      ".cards__like-button"
    );

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    this._setEventListeners();
    return this._cardElement;
  }
}
