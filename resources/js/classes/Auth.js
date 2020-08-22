class Auth {
    // Change states to true/false based on authenticity
    async authenticate(...setters) {
        let response = await fetch('/authenticate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }
        });
        response = await response.json();

        setters.forEach(setter => {
            response.user !== null ? setter(true) : setter(false);
        });
    }
}

export default new Auth();