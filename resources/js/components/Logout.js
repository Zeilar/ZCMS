import { Redirect, useHistory } from 'react-router-dom';
import React from 'react';

export default function Logout({ setPopup, setPopupContent }) {
    const history = useHistory();

    async function popupModal() {
        const response = await fetch('/logout', { method: 'POST' })
            .then(response => {
                return response.json();
            })
            .then(data => {
                return data;
            });
        if (!response.error) localStorage.removeItem('user');
        setPopupContent(response);
        setPopup(true);
    }
    popupModal();

    return <Redirect push to={history.goBack() ?? '/'} />;
}