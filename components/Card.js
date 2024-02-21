export default class Card {
  constructor({ name, link }, cardSelector, handleImageClick) {
    this.name = name;
    this.link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeIcon();
    });
    this._trashButton.addEventListener("click", () => {
      this._handleDeleteCard();
    });

    this._cardImageEl.addEventListener("click", () => {
      this._handleImageClick(this);
    });
  }

  _handleLikeIcon() {
    this._likeButton.classList.toggle(".card__like-button-active");
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".cards__list-cards")
      .cloneNode(true);
  }

  generateCard() {
    this._cardElement = this.getView();
    this._likeButton = this._cardElement.querySelector(".cards__like-button");
    this._trashButton = this._cardElement.querySelector(".cards__trash-button");
    this._cardImageEl = this._cardElement.querySelector(".cards__image");
    this._cardTitleEl = this._cardElement.querySelector(".cards__title");

    this._cardTitleEl.textContent = this.name;
    this._cardImageEl.setAttribute("src", this.link);
    this._cardImageEl.setAttribute("alt", this.name);

    this._setEventListeners();

    return this._cardElement;
  }
}
