import "../pages/index.css";
import "../pages/index.css";
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

//Cards

function createCard(cardData) {
  const card = new Card(
    {
      name: cardData.name,
      link: cardData.link,
    },
    "#cards-template",
    handleImageClick
  );
  return card.getView();
}
const cardsSection = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const cardElement = createCard(data);
      cardsSection.addItem(cardElement);
    },
  },
  ".cards__list"
);
cardsSection.renderItems();

const addCardWithForm = new PopupWithForm(
  {
    popupSelector: "#add-card-modal",
  },
  handleAddCardSubmit
);

addCardWithForm.setEventListeners();

addNewCardBtn.addEventListener("click", () => addCardWithForm.open());

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

function handleAddCardSubmit({ title, URL }) {
  const newCard = createCard({ name: title, link: URL });
  cardsSection.addItem(newCard);
  formValidators["addCardForm"].disableButton();
  addCardWithForm.close();
}

profileEditBtn.addEventListener("click", () => {
  fillUserData();

  formValidators["editCardForm"].resetValidation();
  editModalWithForm.open();
});
