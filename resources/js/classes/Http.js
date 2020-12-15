export default class Http {
    static async request(method = 'get', url = '', args = null, headers = null) {
        url = `/api/${url}`;
        const standard = {
            method: method,
            headers: {
                Accept: 'application/json',
                'X-CSRF-Token': document.querySelector('[name=csrf-token]').getAttribute('content'),
                ...headers,
            },
        };
        const response = await fetch(url, { ...args, ...standard });
        let data = [];
        try {
            data = await response.json();
        } catch (e) {
            console.error(e);
        }
        return { data: data, code: response.status, response: response };
    }

    static async get(url, args, headers) {
        return await Http.request('get', url, args, headers);
    }

    static async post(url, args, headers) {
        return await Http.request('post', url, args, headers);
    }

    static async put(url, args, headers) {
        return await Http.request('put', url, args, headers);
    }

    static async patch(url, args, headers) {
        return await Http.request('patch', url, args, headers);
    }

    static async delete(url, args, headers) {
        return await Http.request('delete', url, args, headers);
    }
}
