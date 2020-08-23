import { Redirect } from 'react-router-dom';
import React from 'react';

export default function Logout({ history }) {
    if (localStorage.getItem('user') === null) {
        return <Redirect to={
            {
                pathname: '/',
                state: {
                    message: 'You are already logged out.',
                    type: 'error',
                }
            }
        } />
    }

    fetch('/logout', { method: 'POST' });
    localStorage.removeItem('user');

    return <Redirect to="/" />
}