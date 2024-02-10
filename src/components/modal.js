const openModal = popupElement => {
    popupElement.classList.add('popup_is-opened');
};

const closeModal = popupElement => {
    popupElement.classList.remove('popup_is-opened');
}

const closeModalOnMouseDownHandler = (evt, closeModalCallback) => {
    if (evt.target === evt.currentTarget) {
        closeModalCallback(evt.currentTarget);
    }
};

const closeModalOnPressEscapeHandler = (evt, closeModalCallback) => {
    if (evt.key === 'Escape') {
        const currentPopup = document.querySelector('.popup_is-opened');
        closeModalCallback(currentPopup);
    }
}

export { openModal, closeModal, closeModalOnMouseDownHandler, closeModalOnPressEscapeHandler }