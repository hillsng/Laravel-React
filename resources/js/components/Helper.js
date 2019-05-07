export const helperService = {
    isLoggedIn,
    authToken,
    apiHeader,
    apiCustomHeader,
    logout,
};
export function authToken() {
    return localStorage.getItem('AUTH_TOKEN');
}

export function isLoggedIn() {
    if (authToken()) {
        return true;
    } else {
        return false;
    }
}

export function apiHeader() {
    return {
        headers: apiCustomHeader()
    };
}

export function apiCustomHeader() {
    return {
        Authorization: 'Bearer ' + authToken(),
        'Content-Type': 'application/json'
    };
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('AUTH_TOKEN');
}


