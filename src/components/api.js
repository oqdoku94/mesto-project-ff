/* Start Variables */

const config = {
    url: 'https://nomoreparties.co/v1/wff-cohort-8', headers: {
        authorization: 'b5d60a60-8b0b-49ea-97c5-5b1d150a6fac', 'Content-Type': 'application/json'
    }
}

/* End Variables */

/* Start Private Functions */

const sendHttpRequest = async (action, method, bodyObj) => {
    const actionUrl = `${config.url}/${action}`;

    const response = await fetch(actionUrl, {
        headers: config.headers, method: method, body: JSON.stringify(bodyObj)
    });

    if (!response.ok) {
        throw new Error(`Запрос по адресу \'${actionUrl}\' вернул код состояния \'${response.status}\'.`);
    }

    return await response.json();
}

const sendGetHttpRequest = async (action) => {
    return await sendHttpRequest(action, 'GET');
}

const sendDeleteHttpRequest = async (action) => {
    return await sendHttpRequest(action, 'DELETE');
}

const sendPostHttpRequest = async (action, bodyObj) => {
    return await sendHttpRequest(action, 'POST', bodyObj);
}

const sendPutHttpRequest = async (action, bodyObj) => {
    return await sendHttpRequest(action, 'PUT', bodyObj);
}

const sendPatchHttpRequest = async (action, bodyObj) => {
    return await sendHttpRequest(action, 'PATCH', bodyObj);
}

/* End Private Functions */

/* Start Public Functions */

export const getProfile = async () => {
    return await sendGetHttpRequest('users/me');
}

export const updateProfile = async (name, about) => {
    return await sendPatchHttpRequest('users/me', {
        name, about
    });
}

export const getCards = async () => {
    return await sendGetHttpRequest('cards');
}

export const createCard = async (card) => {
    return await sendPostHttpRequest('cards', {
        name: card.name,
        link: encodeURI(card.link)
    });
}

export const removeCard = async (id) => {
    return await sendDeleteHttpRequest(`cards/${id}`);
}

export const addLikeCard = async (id) => {
    return await sendPutHttpRequest(`cards/likes/${id}`);
}

export const removeLikeCard = async (id) => {
    return await sendDeleteHttpRequest(`cards/likes/${id}`);
}

export const updateProfileAvatar = async (url) => {
    return await sendPatchHttpRequest(`users/me/avatar`, {
        avatar: encodeURI(url)
    });
}

/* End Public Functions */


