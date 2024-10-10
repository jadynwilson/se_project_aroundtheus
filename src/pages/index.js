import "../pages/index.css";
import "../pages/index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import {
  config,
  profileEditBtn,
  addNewCardBtn,
  profileEditTitle,
  profileEditDescription,
  formValidators,
  forms,
  formList,
  profileAvatarButton,
  addCardFormElement,
} from "../utils/constants.js";

import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupDeleteCard from "../components/PopupDeleteCard.js";
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
      _id: cardData._id,
      isLiked: cardData.isLiked,
    },
    "#cards-template",
    handleImageClick,
    (cardId, card) => {
      handleDeleteModal(cardId, card);
    },
    (cardId, isLiked, cardElement) => {
      handleLikeClick(cardId, isLiked, cardElement, card);
    }
  );
  return card.getView();
}
const cardsSection = new Section(
  {
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
    cardsSection.renderItems(result);
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
const deleteCardPopup = new PopupDeleteCard({
  popupSelector: "#delete-confirm-modal",
});
deleteCardPopup.setEventListeners();

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
  editModalWithForm.setLoadingState(false);
  return api
    .updateUserInfo(value.title, value.description)
    .then((userData) => {
      userInfo.setUserInfo({
        title: value.title,
        description: value.description,
      });
      editModalWithForm.close();
    })
    .catch((err) => {
      console.error("Profile update error:", err);
    })
    .finally(() => {
      editModalWithForm.setLoadingState(true);
    });
}

function handleAddCardSubmit({ title, URL }) {
  addCardWithForm.setLoadingState(false);
  return api
    .addNewCard({ name: title, link: URL })
    .then((res) => {
      cardsSection.addItem(createCard(res));
      formValidators["addCardForm"].disableButton();
      addCardWithForm.close();
      addCardFormElement.reset();
    })
    .catch((err) => {
      console.error("Add card error:", err);
    })
    .finally(() => {
      addCardWithForm.setLoadingState(true);
    });
}
function handleEditAvatarFormSubmit(value) {
  avatarModal.setLoadingState(false);
  return api
    .updateAvatar(value.avatar)
    .then((res) => {
      userInfo.setUserAvatar(res.avatar);
      avatarModal.close();
    })
    .catch((err) => {
      console.error("Avatar update error:", err);
    })
    .finally(() => {
      avatarModal.setLoadingState(true);
    });
}

function handleDeleteModal(cardId, card) {
  deleteCardPopup.setFormSubmitHandler(() => {
    deleteCardPopup.setDeleteState(true);
    api
      .deleteCard(cardId)
      .then(() => {
        card.deleteCard();
        deleteCardPopup.close();
      })
      .catch((err) => {
        console.error("Delete card error:", err);
      })
      .finally(() => {
        deleteCardPopup.setDeleteState(false);
      });
  });

  deleteCardPopup.open();
}

function handleLikeClick(cardId, isLiked, card) {
  if (isLiked) {
    api
      .dislikeCard(cardId)
      .then(() => {
        card.updateIsLiked(false);
      })
      .catch(console.error);
  } else {
    api
      .likeCard(cardId)
      .then(() => {
        card.updateIsLiked(true);
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
