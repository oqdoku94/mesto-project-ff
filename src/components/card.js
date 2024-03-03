const templateElement = document.querySelector('#card-template').content;
const templateCardElement = templateElement.querySelector('.card');

const createCardElement = (card, profileId, removeCardCallback, likeCallback, showImageCallback) => {
    const cardElement = templateCardElement.cloneNode(true);
    const cardImageElement = cardElement.querySelector('.card__image');
    const cardTitleElement = cardElement.querySelector('.card__title');
    const cardDeleteButtonElement = cardElement.querySelector('.card__delete-button');
    const cardLikeButtonElement = cardElement.querySelector('.card__like-button');
    const cardLikeCountElement = cardElement.querySelector('.card__like-count');

    cardImageElement.src = card.link;
    cardImageElement.alt = card.name;
    cardImageElement.addEventListener('click', () => showImageCallback(card.name, card.link));
    cardTitleElement.textContent = card.name;
    cardLikeCountElement.textContent = card.likes ? card.likes.length : '';
    cardLikeButtonElement.addEventListener('click', () => likeCallback(card._id, cardLikeCountElement, cardLikeButtonElement));

    if (card.owner._id === profileId)
        cardDeleteButtonElement.addEventListener('click', () => removeCardCallback(card, cardElement));
    else
        cardElement.removeChild(cardDeleteButtonElement);

    if (card.likes.some(like => like._id === profileId))
        toggleLikeCardElement(cardLikeButtonElement);

    return cardElement;
}

const removeCardElement = cardElement => {
    cardElement.remove();
}

const toggleLikeCardElement = likeButton => {
    likeButton.classList.toggle('card__like-button_is-active');
}

const isActiveLikeButtonElement = likeButton => {
    return likeButton.classList.contains('card__like-button_is-active');
}

export {createCardElement, removeCardElement, toggleLikeCardElement, isActiveLikeButtonElement}