export default class Http {
    static async request(method = 'get', url = '', args = null, errorResponse = false) {
        url = `${location.origin}/api/${url}`;
        const standard = {
            method: method,
            headers: {
                Accept: 'application/json',
                'X-CSRF-Token': document.querySelector('[name=csrf-token]')?.getAttribute('content'),
            },
        };
        const response = await fetch(url, {...standard, ...args});
        if (response.status === 200) {
            return response.json();
        } else {
            return errorResponse ? response.json() : false;
        }
    }

    static async get(url, errorResponse = false) {
        return await Http.request('get', url, errorResponse);
    }

    static async post(url, args, errorResponse = false) {
        return await Http.request('post', url, args, errorResponse);
    }

    static async put(url, args, errorResponse = false) {
        return await Http.request('put', url, args, errorResponse);
    }

    static async patch(url, args, errorResponse = false) {
        return await Http.request('patch', url, args, errorResponse);
    }

    static async delete(url, args, errorResponse = false) {
        return await Http.request('delete', url, args, errorResponse);
    }
}
