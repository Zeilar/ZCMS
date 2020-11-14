export default class Http {
    static async request(method = 'get', url = '', args = null, headers = null) {
        url = `/api/${url}`;
        const standard = {
            method: method,
            headers: {
                ...headers,
                'X-CSRF-Token': document.querySelector('[name=csrf-token]').getAttribute('content'),
            },
        };
        const response = await fetch(url, { ...args, ...standard });
        return { data: await response.json(), code: response.status};
    }

    static async get(url, args) {
        return await Http.request('get', url, args);
    }

    static async post(url, args) {
        return await Http.request('post', url, args);
    }

    static async put(url, args) {
        return await Http.request('put', url, args);
    }

    static async patch(url, args) {
        return await Http.request('patch', url, args);
    }

    static async delete(url, args) {
        return await Http.request('delete', url, args);
    }
}
