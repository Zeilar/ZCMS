class Auth {
    // Change states to true/false based on authenticity
    async authenticate(...setters) {
        fetch('/authenticate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => {
            if (response.status === 401) {
                setters.forEach(setter => {
                    setter(false);
                });
                return false;
            } 
        });
    }
}

export default new Auth();