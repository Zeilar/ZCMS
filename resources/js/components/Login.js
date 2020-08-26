import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { createUseStyles } from 'react-jss';

export default function Login({ setPopup, setPopupContent }) {
    const history = useHistory();
    if (localStorage.getItem('user')) {
        setPopupContent({
            message: 'You are already logged in.',
            type: 'error',
        });
        setPopup(true);
        return <Redirect push to={history.goBack()} />
    }

    const password = useRef();
    const id = useRef();

    async function login(e) {
        e.preventDefault();
        let response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id.current.value,
                password: password.current.value,
            }),
        });
        response = await response.json();
        if (response.error) {
            console.log(response.message);
        } else {
            localStorage.setItem('user', JSON.stringify(response.user));
            history.push('/');
        }
    }

    return (
        <div>
            <h1>Login</h1>

            <form onSubmit={login}>
                <input type="text" ref={id} />
                <input type="password" ref={password} />
                <button type="submit">Go</button>
            </form>
        </div>
    );
}