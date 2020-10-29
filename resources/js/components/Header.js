import React, { useState, useRef, useEffect, useContext } from 'react';
import { UserContext } from '../contexts/userContext';
import { createUseStyles } from 'react-jss';
import { NavLink } from 'react-router-dom';
import Http from '../classes/Http';

export default function Header() {
    const styles = createUseStyles({
        header: {
            backgroundColor: 'var(--color-darkGray)',
            padding: '0 var(--container-margin)',
            transition: 'all 0.25s ease-in',
            transform: 'translateY(0)',
            top: 0,
            '&.hide': {
                boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.25)',
                transitionTimingFunction: 'ease-out',
                backgroundColor: 'var(--body-bg)',
                transform: 'translateY(-130px)',
            },
        },
        hero: {
            margin: [40, 25],
            height: 90,
        },
        navbar: {
            margin: [40, 25],
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
        <header className={`${classes.header} center-children sticky col`}>
            <div className={`${classes.hero} col center-children text-center mb-0 overflow-hidden`}>
                <h1 className={`${classes.siteHeader} pt-2 pb-2`}>
                    <NavLink className={`${classes.siteHeaderLink} no-select`} to="/">
                        TPH
                    </NavLink>
                </h1>
                <p className={`${classes.siteSlogan}`}>
                    The pioneer hangout
                </p>
            </div>
            <nav className={`${classes.navbar} row m-3`}>
                <ul className={`${classes.navlist} row`}>
                    {navItems()}
                </ul>
            </nav>
        </header>
    );
}