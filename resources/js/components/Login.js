import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import Landing from './Landing';

export default function Login({ user, setUser }) {
    const history = useHistory();
    if (user) history.push('/');

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
            console.log(response.error);
        } else {
            setUser(response.user);
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