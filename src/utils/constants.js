export const initialCards = [
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
export const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

export const previewCloseButton = document.querySelector(
  ".modal__close-preview-button"
);

export const profileEditModal = document.querySelector("profile-edit-modal");

export const profileEditForm = document.querySelector("#edit-profile-form");

export const addCardModal = document.querySelector("#add-card-modal");

export const addCardFormElement = document.querySelector("#add-card-form");

export const profileEditBtn = document.querySelector("#profile-edit-button");

export const profileModalCloseButton = document.querySelector(
  "#modal-close-button"
);

export const addCardModalCloseButton = document.querySelector(
  "#modal-add-card-close-button"
);

export const addNewCardBtn = document.querySelector(".profile__add-button");

export const profileAvatarButton = document.querySelector(
  ".profile__avatar-button"
);

export const editProfileInputList = Array.from(
  profileEditForm.querySelectorAll(".modal__input")
);

export const profileEditTitle = document.querySelector("#profile-title-input");

export const profileEditDescription = document.querySelector(
  "#profile-description-input"
);

export const cardSelector = "#card-template";

export const cardsList = document.querySelector(".cards__list");

export const formList = [...document.querySelectorAll(".modal__form")];

export const formValidators = {};

export const forms = {};

/*

export const cardList = document.querySelector(".cards__list");

export const profileEditBtn = document.querySelector(".profile__edit-button");
export const addNewCardBtn = document.querySelector(".profile__add-button");
export const profileName = document.querySelector(".profile__title");
export const profileJob = document.querySelector(".profile__job");
export const profileAvatarButton = document.querySelector(
  ".profile__avatar-button"
);

export const nameInput = document.querySelector("[name='name'");
export const jobInput = document.querySelector("[name='job']");

export const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-button",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

*/
