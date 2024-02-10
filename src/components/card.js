const templateElement = document.querySelector('#card-template').content;
const templateCardElement = templateElement.querySelector('.card');

export const createCard = (name, link, removeCardCallback, likeCallback, showImageCallback) => {
    const card = templateCardElement.cloneNode(true);
    const cardImageElement = card.querySelector('.card__image');
    const cardTitleElement = card.querySelector('.card__title');
    const cardDeleteButtonElement = card.querySelector('.card__delete-button');
    const cardLikeButtonElement = card.querySelector('.card__like-button');

    cardImageElement.src = link;
    cardImageElement.addEventListener('click', () => showImageCallback(name, link));
    cardTitleElement.textContent = name;
    cardDeleteButtonElement.addEventListener('click', () => removeCardCallback(card));
    cardLikeButtonElement.addEventListener('click', () => likeCallback(cardLikeButtonElement));

    return card;
}

export const removeCard = cardElement => {
    cardElement.remove();
}

export const likeCard = likeButton => {
    likeButton.classList.toggle('card__like-button_is-active');
}