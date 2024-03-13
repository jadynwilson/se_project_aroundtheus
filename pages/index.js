import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import {
  initialCards,
  config,
  profileEditBtn,
  addNewCardBtn,
  formList,
  profileEditTitle,
  profileEditDescription,
  formValidators,
  cardSelector,
  forms,
} from "../utils/constants.js";

import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupwithForm.js";

/*  Elements */

const userInfo = new UserInfo({
  profileTitle: ".profile__title",
  profileDescription: ".profile__description",
});

formList.forEach((form) => {
  const validator = new FormValidator(config, form);
  validator.enableValidation();
  formValidators[form.name] = validator;
  forms[form.name] = form;
});

const editModalWithForm = new PopupWithForm(
  {
    popupSelector: "#profile-edit-modal",
  },
  handleProfileEditSubmit
);

editModalWithForm.setEventListeners();

const modalWithImage = new PopupWithImage({
  popupSelector: "#preview__image-modal",
});

modalWithImage.setEventListeners();

const cardRenderer = new Section({
  items: initialCards,
  renderer: createCard,
});
/* Functions */

function createCard(cardData) {
  const card = new Card(cardData, "#cards-template", handleImageClick);
  return card.getView();
}

function handleProfileEditSubmit(evt) {
  userInfo.setUserInfo(value);
  editModalWithForm.close();
}

function handleAddCardSubmit({ title, link }) {
  const newCard = createCard({ name: title, link });
  cardsRenderer.addItem(newCard);
  formValidators["addCardForm"].disableButton();
  forms.addCardForm.reset();
  addCardWithForm.close();
}

function fillUserData() {
  const userData = userInfo.getUserInfo();
  editModalInputTitle.value = userData.title;
  editModalDescription.value = userData.description.trim();
}

function handleImageClick(name, link) {
  modalWithImage.open({ name, link });
}

// form listeners
profileEditButton.addEventListener("click", () => {
  fillUserData();

  formValidators["editCardForm"].resetValidation();
  editModalWithForm.open();
});

addNewCardButton.addEventListener("click", () => addCardWithForm.open());

cardsRenderer.renderItems();

editModalWithForm.setEventListeners();
