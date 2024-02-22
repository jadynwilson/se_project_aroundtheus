import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

/*  Elements */

const profileEditBtn = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const profileFormElement = profileEditModal.querySelector(".modal__form");
const addCardFormElement = addCardModal.querySelector(".modal__form");
const profileModalCloseButton = profileEditModal.querySelector(
  "#modal-close-button"
);
const addCardModalCloseButton = addCardModal.querySelector(
  "#modal-add-card-close-button"
);
const profileTitle = document.querySelector(".profile__title");
const profileDesciption = document.querySelector(".profile__description");
const profileEditTitle = document.querySelector("#profile-title-input");
const profileEditDescription = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");
const cardsList = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#cards-template").content.firstElementChild;
const addNewCardBtn = document.querySelector(".profile__add-button");
const cardTitleInput = addCardFormElement.querySelector(
  "#modal-input-type-title"
);
const cardUrlInput = addCardFormElement.querySelector("#modal-input-type-url");
const modalPreviewImage = document.querySelector("#modal-image-preview");
const modalImagePreviewLink = modalPreviewImage.querySelector(
  ".modal__preview-image"
);
const modalPreviewTitle = modalPreviewImage.querySelector(
  ".modal__title-preview"
);
const previewCloseButton = document.querySelector(
  ".modal__close-preview-button"
);

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};
const profileEditFormValidator = new FormValidator(config, profileEditForm);

profileEditFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(config, addCardFormElement);

addCardFormValidator.enableValidation();

/* Functions */

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeModalsByEsc);
  modal.removeEventListener("mousedown", closeModalByClickOff);
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeModalsByEsc);
  modal.addEventListener("mousedown", closeModalByClickOff);
}

function renderCard(cardData) {
  const cardElement = createCard(cardData);
  cardsList.prepend(cardElement);
}

function createCard(cardData) {
  const card = new Card(cardData, "#cards-template", handleImageClick);
  return card.getView();
}

function handleProfileEditSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileEditTitle.value;
  profileDesciption.textContent = profileEditDescription.value;
  closeModal(profileEditModal);
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardsList);
  addCardFormElement.reset();
  addCardFormValidator.disableButton();
  closeModal(addCardModal);
}

function handleImageClick(cardData) {
  openModal(modalPreviewImage);
  modalPreviewImage.src = cardData.link;
  modalPreviewImage.alt = cardData.name;
  modalPreviewTitle.textContent = cardData.name;
}

function closeModalsByEsc(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    closeModal(openedModal);
  }
}

function closeModalByClickOff(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.currentTarget);
  }
}

// form listeners
profileModalCloseButton.addEventListener("click", () => {
  closeModal(profileEditModal);
});
profileEditForm.addEventListener("submit", handleProfileEditSubmit);

addCardModal.addEventListener("submit", handleAddCardSubmit);

profileEditBtn.addEventListener("click", () => {
  profileEditTitle.value = profileTitle.textContent;
  profileEditDescription.value = profileDesciption.textContent;
  profileEditFormValidator.resetValidation();
  openModal(profileEditModal);
});
previewCloseButton.addEventListener("click", () =>
  closeModal(modalPreviewImage)
);

// add new card
addNewCardBtn.addEventListener("click", () => openModal(addCardModal));
addCardModalCloseButton.addEventListener("click", () =>
  closeModal(addCardModal)
);

initialCards.forEach((cardData) => renderCard(cardData, cardsList));
