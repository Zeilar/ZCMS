function ucfirst(string = '') {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function errorCodeHandler(code, setMessage, success) {
    if (!setMessage) return console.error('setMessage must be a valid callback');
    if (!setMessage) return console.error('success must be a valid callback');
    switch (code) {
        case 200:
            if (success) success();
            break;

        case 404:
            setMessage('Post not found');
            break;

        case 403:
            setMessage('Insufficient permissions');
            break;

        case 401:
            setMessage('Unauthorized');
            break;

        case 500:
            setMessage('Something went wrong');
            break;

        default:
            setMessage('Unexpected error');
            break;
    }
}

export {
    ucfirst,
    errorCodeHandler,
};
