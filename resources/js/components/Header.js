import { FeedbackModalContext } from '../contexts/FeedbackModalContext';
import { UserContext } from '../contexts/UserContext';
import { Knockout } from './styled-components/index';
import React, { useRef, useContext } from 'react';
import { createUseStyles } from 'react-jss';
import { NavLink } from 'react-router-dom';
import Http from '../classes/Http';

export default function Header({ forwardRef }) {
    const styles = createUseStyles({
        header: {
            backgroundColor: 'var(--color-darkGray)',
            padding: [0, '25%'],
        },
        brand: {
            
        },
        navbar: {

        },
        navlist: {
            alignItems: 'center',
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
            fontSize: '2rem',
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
            setUser(false);
            return;
        } else {
            return setMessage('Something went wrong, try refreshing the page');
        }
    }

    const navItems = () => {
        if (user == null) return;
        if (user) {
            return <>
                {
                    user.roles[0].clearance <= 2 &&
                        <li className={`${classes.navitem}`}>
                            <NavLink className={`${classes.navlink} no-select`} to="/admin">
                                Admin
                            </NavLink>
                        </li>
                }
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
            <nav className={`${classes.navbar} w-100 row my-3`} ref={navbar}>
                <ul className={`${classes.navlist} flex row`}>
                    <div className={`${classes.brand} mr-auto col center-children`}>
                        <NavLink className={`${classes.siteHeaderLink}`} to="/">
                            <Knockout className={`${classes.siteHeader} py-2`} as="h1">TPH</Knockout>
                        </NavLink>
                        <p className={`${classes.siteSlogan}`}>The pioneer hangout</p>
                    </div>
                    {navItems()}
                </ul>
            </nav>
        </header>
    );
}