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
import PopupWithForm from "../components/PopupWithForm.js";

// Cards

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

function createCard(cardData) {
  const card = new Card(cardData, cardSelector, handleImageClick);

  return card.getView();
}

addNewCardBtn.addEventListener("click", () => addCardWithForm.open());

cardsSection.renderItems();

//valid

formList.forEach((form) => {
  const validator = new FormValidator(config, form);
  validator.enableValidation();
  formValidators[form.name] = validator;
  forms[form.name] = form;
});

profileEditBtn.addEventListener("click", () => {
  fillUserData();

  formValidators["editCardForm"].resetValidation();
  editModalWithForm.open();
});

// userinfo

const userInfo = new UserInfo({
  profileTitle: ".profile__title",
  profileDescription: ".profile__description",
});

function fillUserData() {
  const userData = userInfo.getUserInfo();
  profileEditTitle.value = userData.title;
  profileEditDescription.value = userData.description.trim();
}

//popup cards

const editModalWithForm = new PopupWithForm(
  {
    popupSelector: "#profile-edit-modal",
  },
  handleProfileEditSubmit
);

editModalWithForm.setEventListeners();

const modalWithImage = new PopupWithImage({
  popupSelector: "#modal-image-preview",
});

modalWithImage.setEventListeners();

//handlefunctions

function handleProfileEditSubmit(evt) {
  userInfo.setUserInfo(value);
  editModalWithForm.close();
}

function handleAddCardSubmit({ title, link }) {
  const newCard = createCard({ name: title, link });
  cardsSection.addItem(newCard);
  formValidators["addCardForm"].disableButton();
  forms.addCardForm.reset();
  addCardWithForm.close();
}

function handleImageClick(name, link) {
  modalWithImage.open({ name, link });
}
