import { faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useRef, useEffect } from 'react';
import AdminDashboard from './Admin/AdminDashboard';
import { createUseStyles } from 'react-jss';
import { NavLink } from 'react-router-dom';

export default function Navbar({ user }) {
    const styles = createUseStyles({
        header: {
            'box-shadow': '0 0 10px 2px rgba(0, 0, 0, 0.25)',
            background: 'var(--color-secondary)',
        },
        navbar: {
            'align-items': 'center',
            padding: '0.5rem',
            display: 'flex',
            height: '2rem',
        },
        navbarLeft: {
            width: 'var(--container-margin)',
        },
        navbarRight: {
            width: 'var(--container-margin)',
            'justify-content': 'flex-end',
            'padding-right': '0.5rem',
            'align-items': 'center',
            display: 'flex',
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
        adminToggler: {
            'justify-content': 'center',
            'align-items': 'center',
            'border-radius': '50%',
            display: 'flex',
            height: '1rem',
            width: '1rem',
        },
        arrows: {
            color: 'var(--color-secondary)',
        },
    });
    const classes = styles();

    const [adminDashboardOpen, setAdminDashboardOpen] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        if (!isAdmin && user && user.roles && user.roles.includes('admin')) {
            setIsAdmin(true);
            const body = document.querySelector('body');
            body.style.overflowY = adminDashboardOpen ? 'hidden' : 'auto';
        }
    }, [adminDashboardOpen, user, setIsAdmin]);

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
                        isAdmin && 
                            <button className={classes.adminToggler} onClick={() => setAdminDashboardOpen(p => !p)}>
                                <FontAwesomeIcon className={classes.arrows} icon={faAngleDoubleDown} />
                            </button>
                    }
                </div>
            </nav>
            {isAdmin && <AdminDashboard user={user} open={adminDashboardOpen} setOpen={setAdminDashboardOpen} />}
        </header>
    );
}