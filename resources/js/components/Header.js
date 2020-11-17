import { FeedbackModalContext } from '../contexts/FeedbackModalContext';
import React, { useRef, useState, useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import { Knockout } from './styled-components/index';
import { createUseStyles } from 'react-jss';
import { mdiLoading } from '@mdi/js';
import classnames from 'classnames';
import Http from '../classes/Http';
import Icon from '@mdi/react';

export default function Header({ forwardRef }) {
    const styles = createUseStyles({
        header: {
            padding: [0, 'var(--container-margin)'],
            backgroundColor: 'var(--color-dark)',
        },
        brand: {
            '&:hover': {
                textDecoration: 'none',
            },
        },
        navbar: {

        },
        navlist: {
            alignItems: 'center',
        },
        navitem: {
            margin: [0, 20, 0, 0],
            userSelect: 'none',
            '&:last-child': {
                marginRight: 0,
            },
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
            fontFamily: 'Merriweather',
            fontSize: '2.5rem',
            letterSpacing: 2,
            lineHeight: 0.7,
        },
        siteSlogan: {
            color: 'var(--color-primary)',
            fontFamily: 'Raleway',
        },
        loading: {
            color: 'var(--color-main)',
        }
    });
    const classes = styles();

    const { setMessage } = useContext(FeedbackModalContext);
    const [loggingOut, setLoggingOut] = useState(false);
    const { user, setUser } = useContext(UserContext);
    const history = useHistory();
    const navbar = useRef();

    async function logout() {
        setLoggingOut(true);
        const response = await Http.post('logout');
        setLoggingOut(false);
        if (response.code === 200) {
            history.push('/');
            setUser(false);
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
                    <NavLink className={`${classes.navlink}`} to={{
                        pathname: '/login',
                        state: { url: window.location.pathname },
                    }}>
                        Login
                    </NavLink>
                </li>
                <li className={`${classes.navitem}`}>
                    <NavLink className={`${classes.navlink}`} to={{
                        pathname: '/register',
                        state: { url: window.location.pathname },
                    }}>
                        Register
                    </NavLink>
                </li>
            </>
        }
    }

    return (
        <>
            <header className={`${classes.header} center-children sticky col`} ref={forwardRef}>
                <nav className={`${classes.navbar} w-100 row my-3`} ref={navbar}>
                    <ul className={`${classes.navlist} flex row`}>
                        <NavLink className={`${classes.brand} mr-auto col center-children`} to="/">
                            <Knockout className={`${classes.siteHeader} py-2`} as="h1">TPH</Knockout>
                            <p className={`${classes.siteSlogan}`}>The pioneer hangout</p>
                        </NavLink>
                        {navItems()}
                    </ul>
                </nav>
            </header>
            {loggingOut && <Icon className={classnames(classes.loading, 'fixed center-self')} path={mdiLoading} size={5} spin={1} />}
        </>
    );
}