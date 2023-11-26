const initialCards = [
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
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
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

/*  Elements */

const profileEditBtn = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileCloseBtn = document.querySelector("#modal-close-button");
const profileTitle = document.querySelector(".profile__title");
const profileDesciption = document.querySelector(".profile__description");
const profileEditTitle = document.querySelector("#profile-title-input");
const profileEditDescription = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");
const cardTemplate =
  document.querySelector("#cards-template").content.firstElementChild;

/* Functions */

function closePopup() {
  profileEditModal.classList.remove("modal_opened");
}

function getCardElement(cardData) {
  // selecting card and cloning it same amount of times as array length
  const cardElement = cardTemplate.cloneNode(true);
  //selecting images and title of card
  const cardImage = cardElement.querySelector(".cards__list-image");
  const cardTitle = cardElement.querySelector(".cards__list-title");
  //set text image and alt to same as array data
  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  return cardElement;
}

/* Event Handlers */

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileEditTitle.value;
  profileDesciption.textContent = profileEditDescription.value;
  closePopup();
}

/* Event Listeners */

profileEditBtn.addEventListener("click", () => {
  profileEditTitle.value = profileTitle.textContent;
  profileEditDescription.value = profileDesciption.textContent;
  profileEditModal.classList.add("modal_opened");
});

profileCloseBtn.addEventListener("click", closePopup);

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardList.prepend(getcardData(cardElement));
});
