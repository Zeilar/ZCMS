import { Redirect } from 'react-router-dom';
import React from 'react';

export default function Logout() {
    if (localStorage.getItem('user') === null) {
        return <Redirect to={
            {
                pathname: '/',
                state: 'You are already logged out.',
            }
        } />
    }
    fetch('/logout', { method: 'GET' });
    localStorage.removeItem('user');

    return <Redirect to={
        {
            pathname: '/',
            state: 'You have been logged out.',
        }
    } />
}