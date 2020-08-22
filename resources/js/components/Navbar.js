import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createUseStyles } from 'react-jss';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
    const styles = createUseStyles({
        header: {
            background: 'rgb(15, 15, 15)',
        },
        navbar: {
            margin: '0 var(--container-margin)', 
            padding: '0.5rem',
            display: 'flex',
        },
        navList: {
            display: 'flex',
        },
        navItem: {
            margin: '0 0.5rem',
            display: 'flex',
        },
        navLink: {
            'border-radius': '0.25rem',
            'text-decoration': 'none',
            padding: '0.75rem 1.5rem',
            position: 'relative',
            color: 'white',
            '&::after': {
                transition: 'width 0.15s linear',
                transform: 'translateX(-50%)',
                position: 'absolute',
                background: 'white',
                content: '""',
                height: '2px',
                left: '50%',
                bottom: '0',
                width: '0',
            },
            '&.active': {
                color: 'var(--color-secondary)',

                '&::after': {
                    background: 'var(--color-secondary)',
                    width: '100%',
                },
            },
            '&:hover::after': {
                width: '100%',
            },
        },
    });
    const classes = styles();

    return (
        <header className={classes.header}>
            <nav className={classes.navbar}>
                <ul className={classes.navList}>
                    <li className={classes.navItem}>
                        <NavLink exact className={classes.navLink} to='/'>
                            Home
                        </NavLink>
                    </li>
                    <li className={classes.navItem}>
                        <NavLink className={classes.navLink} to='/login'>
                            Login
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}