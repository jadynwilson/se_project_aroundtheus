export default class Card {
  constructor({ name, link }, cardSelector, handleImageClick) {
    this.name = name;
    this.link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    this._cardElement
      .querySelector(".cards__like-button")
      .addEventListener("click", () => {
        this._handleLikeIcon();
      });
    this._cardElement
      .querySelector(".cards__list-trash")
      .addEventListener("click", () => {
        this._cardElement.remove();
      });

    this._cardElement
      .querySelector(".cards__list-image")
      .addEventListener("click", () => {
        this._handleImageClick(this);
      });
  }
  _handleLikeIcon() {
    this._cardElement
      .querySelector(".cards__like-button")
      .classList.toggle("cards__like-button-active");
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

    this._cardImage.src = this.link;
    this._cardImage.alt = this.name;
    this._cardTitle.textContent = this.name;

    this._setEventListeners();

    return this._cardElement;
  }
}
