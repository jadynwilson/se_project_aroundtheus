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

export const profileEditModal = document.querySelector("profile-edit-modal");

export const profileEditForm = document.querySelector("#edit-profile-form");

export const profileEditBtn = document.querySelector("#profile-edit-button");

export const addNewCardBtn = document.querySelector(".profile__add-button");

export const editProfileInputList = Array.from(
  profileEditForm.querySelectorAll(".modal__input")
);

export const profileEditTitle = document.querySelector("#profile-title-input");

export const profileEditDescription = document.querySelector(
  "#profile-description-input"
);

export const addCardFormElement = document.querySelector("#add-card-form");

export const cardSelector = "#card-template";

export const formList = [...document.querySelectorAll(".modal__form")];

export const formValidators = {};

export const forms = {};
