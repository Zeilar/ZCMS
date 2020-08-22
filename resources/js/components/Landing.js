import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createUseStyles } from 'react-jss';
import { NavLink } from 'react-router-dom';
import Navbar from './Navbar';

export default function Landing({ history }) {
    const user = JSON.parse(localStorage.getItem('user'));

    function logout() {
        fetch('/logout', { method: 'GET' });
        localStorage.removeItem('user');
        history.push('/');
    }

    return (
        <>
            <Navbar />
            Landing page

            {user ? <h1>Welcome, {user.username}</h1> : ''}

            {user ? <NavLink onClick={logout} to="/">Logout</NavLink> : ''}
        </>
    );
}