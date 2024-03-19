import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import {
  initialCards,
  profileEditForm,
  addCardFormElement,
  cardsList,
  config,
  profileModalCloseButton,
  profileEditBtn,
  previewCloseButton,
  addNewCardBtn,
  addCardModalCloseButton,
  profileEditTitle,
  profileEditDescription,
  formValidators,
  forms,
  formList,
} from "../utils/constants.js";

import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";

//validator

const profileEditFormValidator = new FormValidator(config, profileEditForm);

profileEditFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(config, addCardFormElement);

addCardFormValidator.enableValidation();

//Cards

function renderCard(cardData) {
  const cardElement = createCard(cardData);
  cardsList.prepend(cardElement);
}

function createCard(cardData) {
  const card = new Card(cardData, "#cards-template", handleImageClick);
  return card.getView();
}

const addCardWithForm = new PopupWithForm(
  {
    popupSelector: "#add-card-modal",
  },
  handleAddCardSubmit
);

addCardWithForm.setEventListeners();

const cardsSection = new Section(
  {
    items: initialCards,
    renderer: createCard,
  },
  ".cards__list"
);

addNewCardBtn.addEventListener("click", () => addCardWithForm.open());

addCardModalCloseButton.addEventListener("click", () =>
  addCardWithForm.close()
);

//user info

const userInfo = new UserInfo({
  profileTitle: ".profile__title",
  profileDescription: ".profile__description",
});

function fillUserData() {
  const userData = userInfo.getUserInfo();
  profileEditTitle.value = userData.title;
  profileEditDescription.value = userData.description.trim();
}

const editModalWithForm = new PopupWithForm(
  {
    popupSelector: "#profile-edit-modal",
  },
  handleProfileEditSubmit
);

editModalWithForm.setEventListeners();

function handleImageClick(imageName, imageLink) {
  imagePopup.open({ name: imageName, link: imageLink });
}

const imagePopup = new PopupWithImage({
  popupSelector: "#modal-image-preview",
});

imagePopup.setEventListeners();

//handle functions

function handleProfileEditSubmit(value) {
  userInfo.setUserInfo(value);
  editModalWithForm.close();
}

formList.forEach((form) => {
  const validator = new FormValidator(config, form);
  validator.enableValidation();
  formValidators[form.name] = validator;
  forms[form.name] = form;
});

function handleAddCardSubmit({ title, link }) {
  const newCard = createCard({ name: title, link });
  cardsSection.addItem(newCard);
  formValidators["addCardForm"].disableButton();
  forms.addCardForm.reset();
  addCardWithForm.close();
}

function closeModalByClickOff(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.currentTarget);
  }
}

profileEditBtn.addEventListener("click", () => {
  fillUserData();

  formValidators["editCardForm"].resetValidation();
  editModalWithForm.open();
});

initialCards.forEach((cardData) => renderCard(cardData, cardsList));

/**
 * function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeModalsByEsc);
  modal.removeEventListener("mousedown", closeModalByClickOff);
}
 * function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeModalsByEsc);
  modal.addEventListener("mousedown", closeModalByClickOff);
}

 * 
 * function closeModalsByEsc(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    closeModal(openedModal);
  }
}
 * addNewCardBtn.addEventListener("click", () => openModal(addCardModal));
 * 
 * 
 * previewCloseButton.addEventListener("click", () =>
  closeModal(modalPreviewImage)
);
 * addCardModalCloseButton.addEventListener("click", () =>
  closeModal(addCardModal)
);
profileEditBtn.addEventListener("click", () => {
  profileEditTitle.value = profileTitle.textContent;
  profileEditDescription.value = profileDesciption.textContent;
  profileEditFormValidator.resetValidation();
  openModal(profileEditModal);
});

profileModalCloseButton.addEventListener("click", () => {
  closeModal(profileEditModal);
});
profileEditForm.addEventListener("submit", handleProfileEditSubmit);

addCardFormElement.addEventListener("submit", handleAddCardSubmit);

previewCloseButton.addEventListener("click", () =>
  closeModal(modalPreviewImage)
);


 */
