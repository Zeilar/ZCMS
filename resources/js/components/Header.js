import React, { useState, useRef, useEffect, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { createUseStyles } from 'react-jss';
import { NavLink } from 'react-router-dom';
import Http from '../classes/Http';

export default function Header() {
    const styles = createUseStyles({
        header: {
            backgroundColor: 'var(--color-darkGray)',
            padding: [0, 'var(--container-margin)'],
        },
        hero: {
            
        },
        navbar: {
            
        },
        navlist: {

        },
        navitem: {
            margin: [0, 20],
        },
        navlink: {
            transition: 'color 0.25s ease-out',
            color: 'var(--text-secondary)',
            textTransform: 'uppercase',
            textDecoration: 'none',
            position: 'relative',
            letterSpacing: 1,
            fontWeight: 600,
            color: 'white',
            padding: 10,
            '&::after': {
                backgroundColor: 'var(--color-main)',
                transition: 'width 0.25s ease-out',
                position: 'absolute',
                borderRadius: 10,
                content: '""',
                height: 2,
                bottom: 0,
                width: 0,
                left: 0,
            },
            '&:hover, &.active': {
                color: 'var(--color-main)',
                '&::after': {
                    width: '100%',
                },
            },
        },
        siteHeader: {
            letterSpacing: 2,
        },
        siteHeaderLink: {
            backgroundImage: 'var(--color-main-gradient)',
            '-webkit-text-fill-color': 'transparent',
            '-webkit-background-clip': 'text',
            color: 'var(--color-main)',
            'background-clip': 'text',
            textDecoration: 'none',
            fontSize: '3rem',
            lineHeight: 0.7,
        },
        siteSlogan: {
            fontFamily: 'Raleway',
            color: 'white',
        },
    });
    const classes = styles();

    const header = useRef();
    const navbar = useRef();

    function checkNavbarPosition() {
        if (header.current == null) return;
        const threshold = header.current.getBoundingClientRect().height;
        if (window.scrollY >= threshold) {
            header.current.classList.add('hide');
        } else {
            header.current.classList.remove('hide');
        }
    }

    useEffect(() => {
        checkNavbarPosition();
        document.addEventListener('scroll', checkNavbarPosition);
    });


    const { user, setUser } = useContext(UserContext);

    async function logout() {
        const success = await Http.post('logout');
        if (success) setUser(false);
    }

    const navItems = () => {
        if (user == null) return;
        if (user) {
            return <>
                <li className={`${classes.navitem}`}>
                    <NavLink className={`${classes.navlink}`} to="/admin">
                        Admin
                    </NavLink>
                </li>
                <li className={`${classes.navitem}`}>
                    <a className={`${classes.navlink} pointer`} onClick={logout}>
                        Logout
                    </a>
                </li>
            </>
        } else {
            return <>
                <li className={`${classes.navitem}`}>
                    <NavLink className={`${classes.navlink}`} to="login">
                        Login
                    </NavLink>
                </li>
                <li className={`${classes.navitem}`}>
                    <NavLink className={`${classes.navlink}`} to="/register">
                        Register
                    </NavLink>
                </li>
            </>
        }
    }

    return (
        <header className={`${classes.header} center-children sticky col`} ref={header}>
            <div className={`${classes.hero} col center-children my-4 mb-0 text-center overflow-hidden`}>
                <h1 className={`${classes.siteHeader} py-2`}>
                    <NavLink className={`${classes.siteHeaderLink} no-select`} to="/">
                        TPH
                    </NavLink>
                </h1>
                <p className={`${classes.siteSlogan}`}>
                    The pioneer hangout
                </p>
            </div>
            <nav className={`${classes.navbar} row my-4`} ref={navbar}>
                <ul className={`${classes.navlist} row`}>
                    {navItems()}
                </ul>
            </nav>
        </header>
    );
}