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
  profileEditModal,
  addCardModal,
  profileAvatarButton,
} from "../utils/constants.js";

import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";
import Api from "../components/Api.js";

/*----------api--------*/

const api = new Api({
  baseURL: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "adcecec5-9510-4711-9ed0-4cd27672ee63",
    "Content-Type": "application/json",
  },
});

/*---------cards---------*/

function createCard(cardData) {
  const card = new Card(
    {
      name: cardData.name,
      link: cardData.link,
    },
    "#cards-template",
    handleImageClick,
    handleOpenDeleteModal,
    handleLikeClick
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

api
  .getInitialCards()
  .then((result) => {
    result.forEach((cardData) => {
      cardsSection.addItem(createCard(cardData));
    });
    cardsSection.renderItems();
  })
  .catch((err) => console.log("Error loading initial cards:", err));

/*---------User info---------*/

const userInfo = new UserInfo({
  profileTitle: ".profile__title",
  profileDescription: ".profile__description",
  avatarSelector: ".profile__image",
});

api
  .getUserInfo()
  .then((result) => {
    if (userInfo) {
      userInfo.setUserInfo({
        title: result.name,
        description: result.about,
      });
      userInfo.setUserAvatar(result.avatar);
    }
  })
  .catch((err) => console.log("Error loading user info:", err));

function fillUserData() {
  const userData = userInfo.getUserInfo();
  profileEditTitle.value = userData.title;
  profileEditDescription.value = userData.description.trim();
}

/*----------Popups-----*/

//Edit Profile Popup
const editModalWithForm = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);

editModalWithForm.setEventListeners();

//Add new Card Popup
const addCardWithForm = new PopupWithForm(
  "#add-card-modal",
  handleAddCardSubmit
);

addCardWithForm.setEventListeners();

addNewCardBtn.addEventListener("click", () => addCardWithForm.open());

//Image preview Popup
const imagePopup = new PopupWithImage("#modal-image-preview");

imagePopup.setEventListeners();

//Delete card Confirm Popup
const deleteConfirmModal = new PopupWithConfirm({
  popupSelector: "#delete-confirm-modal",
});
deleteConfirmModal.setEventListeners();

//Adit Avater Popup
const avatarModal = new PopupWithForm(
  "#edit-avatar-modal",
  handleEditAvatarFormSubmit
);
avatarModal.setEventListeners();

profileAvatarButton.addEventListener("click", () => {
  avatarModal.open();
});

function handleImageClick(imageName, imageLink) {
  imagePopup.open({ name: imageName, link: imageLink });
}

//handle functions

function handleProfileEditSubmit(value) {
  function makeRequest() {
    return api
      .updateUserInfo(value.title, value.description)
      .then((userData) => {
        userInfo.setUserInfo({
          titleinput: value.title,
          descriptionInput: value.description,
        });
      });
  }
}

function handleAddCardSubmit({ title, URL }) {
  function makeRequest() {
    return api.addNewCard({ name: title, link: URL }).then((res) => {
      cardsSection.addItem(newCard);
      formValidators["addCardForm"].disableButton();
      addCardWithForm.close();
    });
  }
}

function handleEditAvatarFormSubmit(value) {
  function makeRequest() {
    return api.updateAvatar(value.url).then((res) => {
      userInfo.setUserAvatar(res.avatar);
      formValidators["avatar-edit-form"].disableButton();
    });
  }
}

function handleOpenDeleteModal(card) {
  deleteConfirmModal.open();
  deleteConfirmModal.setHandleDeleteMethod(() => {
    api
      .deleteCard(card.id)
      .then(() => {
        deleteConfirmModal.close();
        card.removeCardElement();
      })
      .catch(console.error);
  });
}

function handleLikeClick(card) {
  if (card.isLiked) {
    api
      .dislikeCard(card.id)
      .then(() => {
        card.handleLikeButton();
      })
      .catch(console.error);
  }
  if (!card.isLiked) {
    api
      .likeCard(card.id)
      .then(() => {
        card.handleLikeButton();
      })
      .catch(console.error);
  }
}

profileEditBtn.addEventListener("click", () => {
  fillUserData();

  /*---------Form Validators----------*/

  formValidators["editCardForm"].resetValidation();
  editModalWithForm.open();
});

formList.forEach((form) => {
  const validator = new FormValidator(config, form);
  validator.enableValidation();
  formValidators[form.name] = validator;
  forms[form.name] = form;
});
