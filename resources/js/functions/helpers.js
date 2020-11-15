import calendar from 'dayjs/plugin/calendar';
import dayjs from 'dayjs';

function ucfirst(string = '') {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function errorCodeHandler(code, errorCallback, successCallback) {
    switch (code) {
        case 200:
            if (successCallback) successCallback();
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

function humanReadableDate(date) {
    dayjs.extend(calendar);
    return dayjs(date).calendar(null, {
        sameDay: '[Today at] hh:mm',
        lastDay: '[Yesterday at] hh:mm',
        sameElse: 'YYYY/MM/DD',
    });
}

export {
    ucfirst,
    errorCodeHandler,
    humanReadableDate,
};
