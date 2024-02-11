import '../pages/index.css'
import { initialCards } from "./cards.js";
import { createCard, removeCard, likeCard } from "../components/card.js"
import { openModal, closeModal, handleCloseModalOnMouseDown } from "../components/modal.js"

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
/* End Variables */

/* Start Functions */
const openPopupImage = (placeName, link) => {
    openModal(cardImagePopupElement);
    cardImagePopupImageElement.src = link;
    cardImagePopupImageElement.alt = placeName;
    cardImagePopupDescriptionElement.textContent = placeName;
}

const handleProfileEditButtonClick = () => {
    openModal(profileEditPopupElement);
    profileEditPopupFormNameElement.value = profileTitleElement.textContent;
    profileEditPopupFormDescriptionElement.value = profileDescriptionElement.textContent;
}

const handleProfileEditPopupCloseButtonClick = () => {
    closeModal(profileEditPopupElement);
}

const handleProfileEditPopupFormSubmit = evt => {
    evt.preventDefault();

    profileTitleElement.textContent = profileEditPopupFormNameElement.value;
    profileDescriptionElement.textContent = profileEditPopupFormDescriptionElement.value;
    profileEditPopupFormNameElement.value = '';
    profileEditPopupFormDescriptionElement.value = '';
    closeModal(profileEditPopupElement);
}

const handleCardAddButtonClick = () => {
    openModal(cardAddPopupElement);
}

const handleCardAddPopupCloseButtonClick = () => {
    closeModal(cardAddPopupElement);
}

const handleCardAddPopupFormSubmit = evt => {
    evt.preventDefault();

    const card = createCard(cardAddPopupFormNameElement.value, cardAddPopupFormUrlElement.value, removeCard, likeCard, openPopupImage);
    placesListElement.prepend(card);
    cardAddPopupFormNameElement.value = '';
    cardAddPopupFormUrlElement.value = '';
    closeModal(cardAddPopupElement);
}

const handleCardImagePopupCloseButtonClick = () => {
    closeModal(cardImagePopupElement);
}
/* End Functions */

/* Start Events */
profileEditButtonElement.addEventListener('click', handleProfileEditButtonClick);
profileEditPopupElement.addEventListener('mousedown', handleCloseModalOnMouseDown);
profileEditPopupCloseButtonElement.addEventListener('click', handleProfileEditPopupCloseButtonClick);
profileEditPopupFormElement.addEventListener('submit', handleProfileEditPopupFormSubmit);

cardAddButtonElement.addEventListener('click', handleCardAddButtonClick);
cardAddPopupElement.addEventListener('mousedown', handleCloseModalOnMouseDown);
cardAddPopupCloseButtonElement.addEventListener('click', handleCardAddPopupCloseButtonClick);
cardAddPopupFormElement.addEventListener('submit', handleCardAddPopupFormSubmit);

cardImagePopupElement.addEventListener('mousedown', handleCloseModalOnMouseDown);
cardImagePopupCloseButtonElement.addEventListener('click', handleCardImagePopupCloseButtonClick);
/* End Events */

/* Start Runtime Initialize */
document.querySelectorAll('.popup').forEach(popupElement => popupElement.classList.add('popup_is-animated'));

initialCards.forEach(card => {
    const newCard = createCard(card.name, card.link, removeCard, likeCard, openPopupImage);
    placesListElement.append(newCard);
});
/* End Runtime Initialize */


