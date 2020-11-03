import { FeedbackModalContext } from '../contexts/FeedbackModalContext';
import React, { useRef, useEffect, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { createUseStyles } from 'react-jss';
import { NavLink } from 'react-router-dom';
import Http from '../classes/Http';

export default function Header({ forwardRef }) {
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
            color: 'var(--color-primary)',
            textTransform: 'uppercase',
            position: 'relative',
            letterSpacing: 1,
            fontWeight: 600,
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
            '&:hover': {
                textDecoration: 'none',
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
            fontSize: '3rem',
            lineHeight: 0.7,
        },
        siteSlogan: {
            color: 'var(--color-primary)',
            fontFamily: 'Raleway',
        },
    });
    const classes = styles();

    const { setMessage, setType } = useContext(FeedbackModalContext);
    const { user, setUser } = useContext(UserContext);
    const navbar = useRef();

    async function logout() {
        const response = await Http.post('logout');
        if (response.code === 200) {
            setType('success');
            setMessage('Successfully logged out');
            return setUser(false);
        } else {
            return setMessage('Something went wrong, try refreshing the page');
        }
    }

    const navItems = () => {
        if (user == null) return;
        if (user) {
            return <>
                <li className={`${classes.navitem}`}>
                    <NavLink className={`${classes.navlink} no-select`} to="/admin">
                        Admin
                    </NavLink>
                </li>
                <li className={`${classes.navitem}`}>
                    <a className={`${classes.navlink} no-select`} onClick={logout}>
                        Logout
                    </a>
                </li>
            </>
        } else {
            return <>
                <li className={`${classes.navitem}`}>
                    <NavLink className={`${classes.navlink}`} to="/login">
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
        <header className={`${classes.header} center-children sticky col`} ref={forwardRef}>
            <div className={`${classes.hero} col center-children my-4 mb-0 text-center overflow-hidden`}>
                <h1 className={`${classes.siteHeader} py-2`}>
                    <NavLink className={`${classes.siteHeaderLink} no-select`} to="/">TPH</NavLink>
                </h1>
                <p className={`${classes.siteSlogan}`}>The pioneer hangout</p>
            </div>
            <nav className={`${classes.navbar} row my-4`} ref={navbar}>
                <ul className={`${classes.navlist} row`}>
                    {navItems()}
                </ul>
            </nav>
        </header>
    );
}