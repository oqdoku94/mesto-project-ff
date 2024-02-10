export const openModal = popupElement => {
    popupElement.classList.add('popup_is-opened');
};

export const closeModal = popupElement => {
    popupElement.classList.remove('popup_is-opened');
}

export const closeModalOnMouseDownLayout = evt => {
    if (evt.target === evt.currentTarget) {
        closeModal(evt.currentTarget);
    }
};

export const closeModalOnPressEscape = evt => {
    if (evt.key === 'Escape') {
        const currentPopup = document.querySelector('.popup_is-opened');
        closeModal(currentPopup);
    }
}