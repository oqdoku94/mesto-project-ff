import '../pages/index.css'
import { initialCards } from "./cards.js";
import { createCard, removeCard, likeCard } from "../components/card.js"
import { openModal, closeModal } from "../components/modal.js"

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
const closePopupOnClickLayout = evt => {
    if (evt.target === evt.currentTarget) {
        closePopup(evt.currentTarget);
    }
};

const closePopupOnPressEscape = evt => {
    if (evt.key === 'Escape') {
        const currentPopup = document.querySelector('.popup_is-opened');
        closePopup(currentPopup);
    }
}

const closePopup = popupElement => {
    closeModal(popupElement);
    document.removeEventListener('keydown', closePopupOnPressEscape);
}

const openPopup = popupElement => {
    openModal(popupElement);
    document.addEventListener('keydown', closePopupOnPressEscape);
}

const openPopupImage = (placeName, link) => {
    cardImagePopupImageElement.src = link;
    cardImagePopupDescriptionElement.textContent = placeName;

    openPopup(cardImagePopupElement);
}
/* End Functions */

/* Start Events */
profileEditButtonElement.addEventListener('click', () => {
    openPopup(profileEditPopupElement);

    profileEditPopupFormNameElement.value = profileTitleElement.textContent;
    profileEditPopupFormDescriptionElement.value = profileDescriptionElement.textContent;
});
profileEditPopupElement.addEventListener('mousedown', closePopupOnClickLayout);
profileEditPopupCloseButtonElement.addEventListener('click', () => closePopup(profileEditPopupElement));
profileEditPopupFormElement.addEventListener('submit', evt => {
    evt.preventDefault();

    profileTitleElement.textContent = profileEditPopupFormNameElement.value;
    profileDescriptionElement.textContent = profileEditPopupFormDescriptionElement.value;
    profileEditPopupFormNameElement.value = '';
    profileEditPopupFormDescriptionElement.value = '';

    closePopup(profileEditPopupElement);
});

cardAddButtonElement.addEventListener('click', () => openPopup(cardAddPopupElement));
cardAddPopupElement.addEventListener('mousedown', closePopupOnClickLayout);
cardAddPopupCloseButtonElement.addEventListener('click', () => closePopup(cardAddPopupElement));
cardAddPopupFormElement.addEventListener('submit', evt => {
    evt.preventDefault();

    const card = createCard(cardAddPopupFormNameElement.value, cardAddPopupFormUrlElement.value, removeCard, likeCard, openPopupImage);
    placesListElement.prepend(card);
    cardAddPopupFormNameElement.value = '';
    cardAddPopupFormUrlElement.value = '';

    closePopup(cardAddPopupElement);
});

cardImagePopupElement.addEventListener('mousedown', closePopupOnClickLayout);
cardImagePopupCloseButtonElement.addEventListener('click', () => closePopup(cardImagePopupElement));
/* End Events */

/* Start Runtime Initialize */
document.querySelectorAll('.popup').forEach(popupElement => popupElement.classList.add('popup_is-animated'));

initialCards.forEach(card => {
    const newCard = createCard(card.name, card.link, removeCard, likeCard, openPopupImage);
    placesListElement.append(newCard);
});
/* End Runtime Initialize */


