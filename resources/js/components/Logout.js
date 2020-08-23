import { Redirect } from 'react-router-dom';
import React from 'react';

export default function Logout() {
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
    
    fetch('/logout', { method: 'GET' });
    localStorage.removeItem('user');

    return <Redirect to={
        {
            pathname: '/',
            state: {
                message: 'You have been logged out.',
                type: 'success',
            }
        }
    } />
}