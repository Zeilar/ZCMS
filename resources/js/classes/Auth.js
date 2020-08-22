class Auth {
    // Change states to true/false based on authenticity
    async authenticate(role = 'user', ...setters) {
        let response = await fetch('/authenticate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: {
                role: role,
            },
        });
        response = await response.json();

        setters.forEach(setter => {
            response.user !== null ? setter(true) : setter(false);
        });
    }
}

export default new Auth();