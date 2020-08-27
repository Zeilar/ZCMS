import { Redirect } from 'react-router-dom';
import React from 'react';

export default function Logout({ setUser, setPopup, setPopupContent }) {
    async function popupModal() {
        const response = await fetch('/api/logout', { method: 'POST' })
            .then(response => {
                return response.json();
            })
            .then(data => {
                return data;
            });
        if (!response.error) setUser(null);
        setPopupContent(response);
        setPopup(true);
    }
    popupModal();

    return <Redirect push to="/" />;
}