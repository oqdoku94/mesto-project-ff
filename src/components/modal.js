const openModal = popupElement => {
    popupElement.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeModalOnPressEscapeHandler);
};

const closeModal = popupElement => {
    popupElement.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeModalOnPressEscapeHandler);
}

const closeModalOnMouseDownHandler = evt => {
    if (evt.target === evt.currentTarget) {
        closeModal(evt.currentTarget);
    }
};

const closeModalOnPressEscapeHandler = evt => {
    if (evt.key === 'Escape') {
        const currentPopup = document.querySelector('.popup_is-opened');
        closeModal(currentPopup);
    }
}

export { openModal, closeModal, closeModalOnMouseDownHandler }