import '../pages/index.css'
import {
    createCardElement,
    removeCardElement,
    toggleLikeCardElement,
    isActiveLikeButtonElement
} from "../components/card.js"
import {openModal, closeModal, handleCloseModalOnMouseDown} from "../components/modal.js"
import {clearValidation, enableValidation} from "../components/validation";
import {
    createCard,
    getCards,
    getProfile,
    updateProfile,
    removeCard,
    removeLikeCard,
    addLikeCard, updateProfileAvatar
} from "../components/api";

/* Start Variables */

const placesListElement = document.querySelector('.places__list');
const profileImageElement = document.querySelector('.profile__image');
const profileTitleElement = document.querySelector('.profile__title');
const profileDescriptionElement = document.querySelector('.profile__description');
const profileEditButtonElement = document.querySelector('.profile__edit-button');
const profileEditPopupElement = document.querySelector('.popup_type_edit');
const profileEditPopupCloseButtonElement = profileEditPopupElement.querySelector('.popup__close');
const profileEditPopupFormElement = document.forms['edit-profile'];
const profileEditPopupFormNameElement = profileEditPopupFormElement.elements.name;
const profileEditPopupFormDescriptionElement = profileEditPopupFormElement.elements.description;
const avatarEditPopupElement = document.querySelector('.popup_type_avatar');
const avatarEditPopupCloseButtonElement = avatarEditPopupElement.querySelector('.popup__close');
const avatarEditPopupFormElement = document.forms['edit-avatar'];
const avatarEditPopupFormUrlElement = avatarEditPopupFormElement.elements.url;
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
let profileId;
const onSaveSubmitButtonText = 'Сохранение...';

/* End Variables */

/* Start Functions */
const openPopupImage = (placeName, link) => {
    openModal(cardImagePopupElement);
    cardImagePopupImageElement.src = link;
    cardImagePopupImageElement.alt = placeName;
    cardImagePopupDescriptionElement.textContent = placeName;
}

const changeAvatarImage = url => {
    profileImageElement.style.backgroundImage = `url(${encodeURI(url)})`;
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

const handleProfileEditPopupFormOnSubmit = async evt => {
    evt.preventDefault();
    const currentSubmitButtonText = evt.submitter.textContent;
    try {
        evt.submitter.textContent = onSaveSubmitButtonText;
        const profile = await updateProfile(profileEditPopupFormNameElement.value, profileEditPopupFormDescriptionElement.value);

        profileTitleElement.textContent = profile.name;
        profileDescriptionElement.textContent = profile.about;

        profileEditPopupFormElement.reset();
        closeModal(profileEditPopupElement);
    } catch (ex) {
        console.log(`Произошла ошибка при обновлении данных профиля: ${ex}`);
    } finally {
        evt.submitter.textContent = currentSubmitButtonText;
    }
}

const handleProfileImageOnClick = () => {
    avatarEditPopupFormElement.reset();
    clearValidation(avatarEditPopupFormElement, validateConfiguration);
    openModal(avatarEditPopupElement);
}

const handleAvatarEditPopupCloseButtonOnClick = () => {
    closeModal(avatarEditPopupElement);
}

const handleAvatarEditPopupFormOnSubmit = async evt => {
    evt.preventDefault();
    const currentSubmitButtonText = evt.submitter.textContent;
    try {
        evt.submitter.textContent = onSaveSubmitButtonText;
        const profile = await updateProfileAvatar(avatarEditPopupFormUrlElement.value);
        changeAvatarImage(profile.avatar);
        closeModal(avatarEditPopupElement);
    } catch (ex) {
        console.log(`Произошла ошибка при обновлении аватара: ${ex}`);
    } finally {
        evt.submitter.textContent = currentSubmitButtonText;
    }
}

const handleCardAddButtonOnClick = () => {
    openModal(cardAddPopupElement);
}

const handleCardAddPopupCloseButtonOnClick = () => {
    closeModal(cardAddPopupElement);
}

const handleCardAddPopupFormOnSubmit = async evt => {
    evt.preventDefault();
    const currentSubmitButtonText = evt.submitter.textContent;

    try {
        evt.submitter.textContent = onSaveSubmitButtonText;
        const card = await createCard({
            name: cardAddPopupFormNameElement.value,
            link: cardAddPopupFormUrlElement.value
        });
        const cardElement = createCardElement(card, profileId, handleRemoveCard, handleLikeCard, openPopupImage);
        placesListElement.prepend(cardElement);
        cardAddPopupFormElement.reset();
        closeModal(cardAddPopupElement);
        clearValidation(cardAddPopupFormElement, validateConfiguration);
    } catch (ex) {
        console.log(`Произошла ошибка при создании карточки: ${ex}`);
    } finally {
        evt.submitter.textContent = currentSubmitButtonText;
    }
}

const handleCardImagePopupCloseButtonOnClick = () => {
    closeModal(cardImagePopupElement);
}

const handleRemoveCard = async (card, cardElement) => {
    try {
        await removeCard(card._id);
        removeCardElement(cardElement);
    } catch (ex) {
        console.log(`Произошла ошибка при удалении карточки: ${ex}`);
    }
}

const handleLikeCard = async (cardId, likeCountElement, likeButton) => {
    try {
        const card = isActiveLikeButtonElement(likeButton)
            ? await removeLikeCard(cardId)
            : await addLikeCard(cardId);

        likeCountElement.textContent = card.likes.length;
        toggleLikeCardElement(likeButton);
    } catch (ex) {
        console.log(`Произошла ошибка при изменении количества лайков у карточки: ${ex}`);
    }
}
/* End Functions */

/* Start Events */
profileEditButtonElement.addEventListener('click', handleProfileEditButtonOnClick);
profileEditPopupElement.addEventListener('mousedown', handleCloseModalOnMouseDown);
profileEditPopupCloseButtonElement.addEventListener('click', handleProfileEditPopupCloseButtonOnClick);
profileEditPopupFormElement.addEventListener('submit', handleProfileEditPopupFormOnSubmit);

profileImageElement.addEventListener('click', handleProfileImageOnClick);
avatarEditPopupElement.addEventListener('mousedown', handleCloseModalOnMouseDown);
avatarEditPopupCloseButtonElement.addEventListener('click', handleAvatarEditPopupCloseButtonOnClick);
avatarEditPopupFormElement.addEventListener('submit', handleAvatarEditPopupFormOnSubmit);

cardAddButtonElement.addEventListener('click', handleCardAddButtonOnClick);
cardAddPopupElement.addEventListener('mousedown', handleCloseModalOnMouseDown);
cardAddPopupCloseButtonElement.addEventListener('click', handleCardAddPopupCloseButtonOnClick);
cardAddPopupFormElement.addEventListener('submit', handleCardAddPopupFormOnSubmit);

cardImagePopupElement.addEventListener('mousedown', handleCloseModalOnMouseDown);
cardImagePopupCloseButtonElement.addEventListener('click', handleCardImagePopupCloseButtonOnClick);
/* End Events */

/* Start Utils */
const initializeProfile = profile => {
    profileId = profile._id;
    profileTitleElement.textContent = profile.name;
    profileDescriptionElement.textContent = profile.about;
    changeAvatarImage(profile.avatar);
}

const initializeCards = (cards) => {
    cards.forEach(card => {
        const newCard = createCardElement(card, profileId, handleRemoveCard, handleLikeCard, openPopupImage);
        placesListElement.append(newCard);
    });
}

const runtimeInitialize = () => {
    Promise.all([getCards(), getProfile()])
        .then((result) => {
            initializeProfile(result[1]);
            initializeCards(result[0]);
        }).catch(ex => console.log(`Произошла ошибка при инициализации данных: ${ex}`));
}

/* End Utils */

/* Start Runtime Initialize */
document.querySelectorAll('.popup').forEach(popupElement => popupElement.classList.add('popup_is-animated'));
runtimeInitialize();
enableValidation(validateConfiguration);
/* End Runtime Initialize */



