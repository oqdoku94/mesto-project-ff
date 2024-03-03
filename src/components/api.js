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

    return response;
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
    const response = await sendGetHttpRequest('users/me');
    return await response.json();
}

export const updateProfile = async (name, about) => {
    const response = await sendPatchHttpRequest('users/me', {
        name, about
    });
    return await response.json();
}

export const getCards = async () => {
    const response = await sendGetHttpRequest('cards');
    return await response.json();
}

export const createCard = async (card) => {
    const response = await sendPostHttpRequest('cards', {
        name: card.name,
        link: encodeURI(card.link)
    });
    return await response.json();
}

export const removeCard = async (id) => {
    const response = await sendDeleteHttpRequest(`cards/${id}`);
    return await response.json();
}

export const addLikeCard = async (id) => {
    const response = await sendPutHttpRequest(`cards/likes/${id}`);
    return await response.json();
}

export const removeLikeCard = async (id) => {
    const response = await sendDeleteHttpRequest(`cards/likes/${id}`)
    return await response.json();
}

export const updateProfileAvatar = async (url) => {
    const response = await sendPatchHttpRequest(`users/me/avatar`, {
        avatar: encodeURI(url)
    });
    return response.json();
}

/* End Public Functions */


