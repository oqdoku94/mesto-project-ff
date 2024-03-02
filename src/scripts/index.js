import '../pages/index.css'
import {initialCards} from "./cards.js";
import {createCard, removeCard, likeCard} from "../components/card.js"
import {openModal, closeModal, handleCloseModalOnMouseDown} from "../components/modal.js"
import {clearValidation, enableValidation} from "../components/validation";

/* Start Variables */
const placesListElement = document.querySelector('.places__list');
const profileTitleElement = document.querySelector('.profile__title');
const profileDescriptionElement = document.querySelector('.profile__description');
const profileEditButtonElement = document.querySelector('.profile__edit-button');
const profileEditPopupElement = document.querySelector('.popup_type_edit');
const profileEditPopupCloseButtonElement = profileEditPopupElement.querySelector('.popup__close');
const profileEditPopupFormElement = document.forms['edit-profile'];
const profileEditPopupFormNameElement = profileEditPopupFormElement.elements.name;
const profileEditPopupFormDescriptionElement = profileEditPopupFormElement.elements.description;
const cardAddButtonElement = document.querySelector('.profile__add-button');
const cardAddPopupElement = document.querySelector('.popup_type_new-card');
const cardAddPopupCloseButtonElement = cardAddPopupElement.querySelector('.popup__close');
const cardAddPopupFormElement = document.forms['new-place'];
const cardAddPopupFormNameElement = cardAddPopupFormElement.elements['place-name'];
const cardAddPopupFormUrlElement = cardAddPopupFormElement.elements['link'];
const cardImagePopupElement = document.querySelector('.popup_type_image');
const cardImagePopupCloseButtonElement = cardImagePopupElement.querySelector('.popup__close');
const cardImagePopupImageElement = cardImagePopupElement.querySelector('.popup__image');
const cardImagePopupDescriptionElement = cardImagePopupElement.querySelector('.popup__caption');
const validateConfiguration = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};
/* End Variables */

/* Start Functions */
const openPopupImage = (placeName, link) => {
    openModal(cardImagePopupElement);
    cardImagePopupImageElement.src = link;
    cardImagePopupImageElement.alt = placeName;
    cardImagePopupDescriptionElement.textContent = placeName;
}

const handleProfileEditButtonOnClick = () => {
    openModal(profileEditPopupElement);
    profileEditPopupFormNameElement.value = profileTitleElement.textContent;
    profileEditPopupFormDescriptionElement.value = profileDescriptionElement.textContent;
    clearValidation(profileEditPopupFormElement, validateConfiguration)
}

const handleProfileEditPopupCloseButtonOnClick = () => {
    closeModal(profileEditPopupElement);
}

const handleProfileEditPopupFormOnSubmit = evt => {
    evt.preventDefault();

    profileTitleElement.textContent = profileEditPopupFormNameElement.value;
    profileDescriptionElement.textContent = profileEditPopupFormDescriptionElement.value;
    profileEditPopupFormElement.reset();
    closeModal(profileEditPopupElement);
}

const handleCardAddButtonOnClick = () => {
    openModal(cardAddPopupElement);
}

const handleCardAddPopupCloseButtonOnClick = () => {
    closeModal(cardAddPopupElement);
}

const handleCardAddPopupFormOnSubmit = evt => {
    evt.preventDefault();

    const card = createCard(cardAddPopupFormNameElement.value, cardAddPopupFormUrlElement.value, removeCard, likeCard, openPopupImage);
    placesListElement.prepend(card);
    cardAddPopupFormElement.reset();
    closeModal(cardAddPopupElement);
    clearValidation(cardAddPopupFormElement, validateConfiguration)
}

const handleCardImagePopupCloseButtonOnClick = () => {
    closeModal(cardImagePopupElement);
}
/* End Functions */

/* Start Events */
profileEditButtonElement.addEventListener('click', handleProfileEditButtonOnClick);
profileEditPopupElement.addEventListener('mousedown', handleCloseModalOnMouseDown);
profileEditPopupCloseButtonElement.addEventListener('click', handleProfileEditPopupCloseButtonOnClick);
profileEditPopupFormElement.addEventListener('submit', handleProfileEditPopupFormOnSubmit);

cardAddButtonElement.addEventListener('click', handleCardAddButtonOnClick);
cardAddPopupElement.addEventListener('mousedown', handleCloseModalOnMouseDown);
cardAddPopupCloseButtonElement.addEventListener('click', handleCardAddPopupCloseButtonOnClick);
cardAddPopupFormElement.addEventListener('submit', handleCardAddPopupFormOnSubmit);

cardImagePopupElement.addEventListener('mousedown', handleCloseModalOnMouseDown);
cardImagePopupCloseButtonElement.addEventListener('click', handleCardImagePopupCloseButtonOnClick);
/* End Events */

/* Start Runtime Initialize */
document.querySelectorAll('.popup').forEach(popupElement => popupElement.classList.add('popup_is-animated'));

initialCards.forEach(card => {
    const newCard = createCard(card.name, card.link, removeCard, likeCard, openPopupImage);
    placesListElement.append(newCard);
});

enableValidation(validateConfiguration);
/* End Runtime Initialize */



