import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createUseStyles } from 'react-jss';
import { NavLink } from 'react-router-dom';

export default function Landing() {
    const user = JSON.parse(localStorage.getItem('user'));
    return (
        <div>
            Landing page

            {user ? <h1>Welcome, {user.username}</h1> : ''}

            {!user ? <NavLink to="/login">Login</NavLink> : ''}
            {user ? <NavLink onClick={() => localStorage.removeItem('user')} to="/">Logout</NavLink> : ''}
        </div>
    );
}