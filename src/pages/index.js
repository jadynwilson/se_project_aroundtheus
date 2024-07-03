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
} from "../utils/constants.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Api from "../components/Api.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";

//API

const api = new Api({
  baseURL: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "54e4661b-7123-411a-9839-cd0d137d21ab",
    "Content-Type": "application/json",
  },
});

api
  .getInitialCards()
  .then((result) => {
    result.foreach((cardData) => {
      cardsSection.appendItem(createCard(cardData));
    });
  })
  .catch(console.error);

api
  .getUserInfo()
  .then((result) => {
    userInfo.setUserInfo({
      profileEditTitle: result.title,
      profileEditDescription: result.description,
      avatar: result.avatar,
    });
  })
  .catch(console.error);

formList.forEach((form) => {
  const validator = new FormValidator(config, form);
  validator.enableValidation();
  formValidators[form.name] = validator;
  forms[form.name] = form;
});

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
  avatarSelector: "profile__image",
});

function fillUserData() {
  const userData = userInfo.getUserInfo();
  profileEditTitle.value = userData.title;
  profileEditDescription.value = userData.description.trim();
}

const avatarModal = new PopupWithForm(
  "#edit-avatar-modal",
  handleEditAvatarSubmit
);

avatarModal.setEventListeners();

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

const deleteConfirmModal = new PopupWithConfirm({
  popupSelector: "#delete-confirm-modal",
});
deleteConfirmModal.setEventListeners();

//handle functions

function handleSubmit(request, modalInstance, loadingText = "Saving...") {
  modalInstance.renderLoading(true, loadingText);
  request()
    .then(() => {
      modalInstance.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      modalInstance.renderLoading(false);
    });
}

//function handleProfileEditSubmit(value) {
// userInfo.setUserInfo(value);
// editModalWithForm.close();
//}

function handleProfileEditSubmit(value) {
  function makerequest() {
    return api
      .updateUserInfo(values.title, values.description)
      .then((userData) => {
        userInfo.setUserInfo({
          profileEditTitle: values.title,
          profileEditDescription: values.description,
        });
      });
  }
  handleSumbit(makerequest, profileEditModal);
}

//function handleAddCardSubmit({ title, URL }) {
//const newCard = createCard({ name: title, link: URL });
// cardsSection.addItem(newCard);
// formValidators["addCardForm"].disableButton();
// addCardWithForm.close();
//}

function handleAddCardSubmit({ title, URl }) {
  function makerequest() {
    return api.addNewCard({ name: title, link: URl }).then((res) => {
      cardsSection.addItem(newCard(res));
      formValidators["addCardForm"].disableButton();
      addCardWithForm.close();
    });
  }
  handleSubmit(makerequest, addCardWithForm, "Creating...");
}

function handleEditAvatarFormSubmit(inputValues) {
  function makeRequest() {
    return api.updateAvatar(inputValues.url).then((res) => {
      userInfo.setUserAvatar(res.avatar);
      formValidators["edit-avatar-form"].disableButton();
    });
  }
  handleSubmit(makeRequest, avatarModal);
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
  formValidators["editCardForm"].resetValidation();
  editModalWithForm.open();
});
