export default class Card {
  constructor(
    { name, link, _id, isLiked },
    cardSelector,
    handleImageClick,
    handleDeleteModal,
    handleLikeClick
  ) {
    this._name = name;
    this._link = link;
    this._id = _id;
    this._isLiked = isLiked;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteModal = handleDeleteModal;
    this._handleLikeClick = handleLikeClick;
  }

  _setEventListeners() {
    this._cardLikeButton.addEventListener("click", () => {
      this._handleLikeClick(this._id, this._isLiked, this);
    });

    this._cardElement
      .querySelector(".cards__list-trash")
      .addEventListener("click", () => {
        this._handleDeleteModal(this._id, this);
      });

    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this._name, this._link);
    });
  }
  _handleLikeIcon() {
    this._cardLikeButton.classList.toggle("cards__like-button-active");
  }

  deleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }
  updateLikes() {
    if (this._isLiked) {
      this._cardLikeButton.classList.add("cards__like-button-active");
    } else {
      this._cardLikeButton.classList.remove("cards__like-button_active");
    }
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
