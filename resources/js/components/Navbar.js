import React, { useState, useRef, useEffect, useCallback } from 'react';
import AdminDashboard from './Admin/AdminDashboard';
import { createUseStyles } from 'react-jss';
import { NavLink } from 'react-router-dom';

export default function Navbar({ user, users, setUsers, adminDashboard, setAdminDashboard }) {
    const styles = createUseStyles({
        header: {
            'border-bottom': '1px solid var(--color-secondary)',
            'box-shadow': '0 0 10px 2px rgba(0, 0, 0, 0.25)',
            background: 'var(--body-bg)',
        },
        navbar: {
            padding: '0.5rem',
            display: 'flex',
        },
        navbarLeft: {
            width: 'var(--container-margin)',
        },
        navbarRight: {
            width: 'var(--container-margin)',
        },
        navList: {
            display: 'flex',
            flex: '1',
        },
        navItem: {
            margin: '0 0.5rem',
            display: 'flex',
        },
        navLink: {
            color: 'var(--text-primary)',
            'border-radius': '0.25rem',
            'text-decoration': 'none',
            padding: '0.75rem 1.5rem',
            'user-select': 'none',
            position: 'relative',
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

    let dashboard;
    useEffect(() => {
        if (user && user.roles.includes('admin') && adminDashboard) {
            
        }
    }, [dashboard, adminDashboard, setAdminDashboard, AdminDashboard, user, users, setUsers]);

    return (
        <header className={classes.header}>
            <nav className={classes.navbar}>
                <div className={classes.navbarLeft}>

                </div>
                <ul className={classes.navList}>
                    <li className={classes.navItem}>
                        <NavLink exact className={classes.navLink} to="/">
                            Home
                        </NavLink>
                    </li>
                    <li className={classes.navItem}>
                        <NavLink className={classes.navLink} to="/login">
                            Login
                        </NavLink>
                    </li>
                    <li className={classes.navItem}>
                        <NavLink className={classes.navLink} to="/logout">
                            Logout
                        </NavLink>
                    </li>
                </ul>
                <div className={classes.navbarRight}>
                    {
                        adminDashboard
                            ? <button onClick={() => setAdminDashboard(false)}>Close admin</button>
                            : <button onClick={() => setAdminDashboard(true)}>Open admin</button>
                    }
                </div>
            </nav>
            {adminDashboard && <AdminDashboard users={users} setUsers={setUsers} setAdminDashboard={setAdminDashboard} />}
        </header>
    );
}