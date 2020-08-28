import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { createUseStyles } from 'react-jss';

export default function Login({ user, setUser, setPopup, setPopupContent }) {
    const history = useHistory();

    console.log('login comp');

    if (user) {
        setPopupContent({
            message: 'You are already logged in.',
            type: 'error',
        });
        setPopup(true);
        return <Redirect push to={history.goBack() ?? '/'} />
    }

    const password = useRef();
    const id = useRef();

    async function login(e) {
        e.preventDefault();
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id.current.value,
                password: password.current.value,
            }),
        })
        .then(response => response.json());

        if (response.error) {
            console.log(response.message);
        } else {
            setUser(response.user);
            history.push('/');
        }
    }

    return (
        <div>
            <h1>Login</h1>

            <form onSubmit={login}>
                <input type="text" ref={id} placeholder="Username" />
                <input type="password" ref={password} placeholder="Password" />
                <button type="submit">Go</button>
            </form>
        </div>
    );
}