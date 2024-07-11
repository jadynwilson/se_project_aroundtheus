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

const api = new Api({
  baseURL: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "adcecec5-9510-4711-9ed0-4cd27672ee63",
    "Content-Type": "application/json",
  },
});

api
  .getInitialCards()
  .then((result) => {
    result.forEach((cardData) => {
      cardsSection.appendItem(createCard(cardData));
    });
  })
  .catch(console.error);

api
  .getUserInfo()
  .then((result) => {
    userInfo.setUserInfo({
      profileEditTitle: result.name,
      profileEditDescription: result.description,
    });
    userInfo.setUserAvatar(result.avatar);
  })
  .catch(console.error);

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

profileAvatarButton.addEventListener("click", () => {
  avatarModal.open();
});

//user info

const userInfo = new UserInfo({
  profileTitle: ".profile__title",
  profileDescription: ".profile__description",
  avatarSelector: ".profile__image",
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

const avatarModal = new ModalWithForm(
  "#edit-avatar-modal",
  handleEditAvatarFormSubmit
);
avatarModal.setEventListeners();

const deleteConfirmModal = new ModalConfirm({
  modalSelector: "#delete-confirm-modal",
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
  handleSubmit(makeRequest, profileEditModal);
}

function handleAddCardSubmit({ title, URL }) {
  function makeRequest() {
    return api.addNewCard({ name: title, link: URL }).then((res) => {
      cardsSection.addItem(newCard);
      formValidators["addCardForm"].disableButton();
      addCardWithForm.close();
    });
  }
  handleSubmit(makeRequest, addCardModal, "Creating...");
}

function handleEditAvatarFormSubmit(value) {
  function makeRequest() {
    return api.updateAvatar(Value.url).then((res) => {
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

formList.forEach((form) => {
  const validator = new FormValidator(config, form);
  validator.enableValidation();
  formValidators[form.name] = validator;
  forms[form.name] = form;
});
