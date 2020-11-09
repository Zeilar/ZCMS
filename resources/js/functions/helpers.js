function ucfirst(string = '') {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function errorCodeHandler(code, errorCallback, successCallback) {
    if (!errorCallback) return console.error('errorCallback must be a valid callback');
    if (!errorCallback) return console.error('successCallback must be a valid callback');
    switch (code) {
        case 200:
            successCallback();
            break;

        case 404:
            errorCallback('Post not found');
            break;

        case 403:
            errorCallback('Insufficient permissions');
            break;

        case 401:
            errorCallback('Unauthorized');
            break;

        case 500:
            errorCallback('Something went wrong');
            break;

        default:
            errorCallback('Unexpected error');
            break;
    }
}

export {
    ucfirst,
    errorCodeHandler,
};
