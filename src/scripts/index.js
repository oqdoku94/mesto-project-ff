import { initialCards } from "./cards.js";

const templateElement = document.querySelector('#card-template').content;
const templateCardElement = templateElement.querySelector('.card');
const placesListElement = document.querySelector('.places__list');

const createCardElement = (name, link, removeCardCallback) => {
    const card = templateCardElement.cloneNode(true);
    const cardImageElement = card.querySelector('.card__image');
    const cardTitleElement = card.querySelector('.card__title');
    const cardDeleteButtonElement = card.querySelector('.card__delete-button');

    cardImageElement.src = link;
    cardTitleElement.textContent = name;
    cardDeleteButtonElement.addEventListener('click', () => removeCardCallback(card));

    return card;
}

const removeCardElement = cardElement => {
    cardElement.remove();
}

initialCards.forEach(card => {
    const newCardElement = createCardElement(card.name, card.link, removeCardElement);
    placesListElement.append(newCardElement);
});