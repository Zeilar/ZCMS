import { FeedbackModalContext, UserContext } from '../../contexts';
import React, { useRef, useState, useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { Knockout } from '../styled-components';
import { createUseStyles } from 'react-jss';
import { NavDropdown } from '../misc';
import { mdiLoading } from '@mdi/js';
import { Http } from '../../classes';
import classnames from 'classnames';
import Icon from '@mdi/react';

export default function Header({ forwardRef }) {
    const styles = createUseStyles({
        header: {
            padding: [0, 'var(--container-margin)'],
            backgroundColor: 'var(--color-dark)',
            zIndex: 100,
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

    const { user } = useContext(UserContext);
    const navbar = useRef();

    const navItems = () => {
        if (user) {
            return (
                <>
                    {
                        user.roles[0].clearance <= 2 &&
                            <NavDropdown
                                toggler="Admin"
                                items={[
                                    {
                                        name: 'Dashboard',
                                        to: { pathname: '/admin' },
                                    },
                                ]} 
                            />
                    }
                    <NavDropdown
                        toggler={<img className={classnames('round')} style={{ width: 50 }} src={`/storage/avatars/${user.avatar}`} />}
                        items={[
                            {
                                name: 'Logout',
                                to: {
                                    pathname: '/logout',
                                    state: { url: window.location.pathname },
                                },
                            },
                            {
                                name: 'Profile',
                                to: { pathname: `/user/${user.username}` },
                            },
                        ]} 
                    />
                </>
            );
        } else {
            return (
                <>
                    <li className={classnames(classes.navitem)}>
                        <NavLink className={classnames(classes.navlink)} to={{
                            pathname: '/login',
                            state: { url: window.location.pathname },
                        }}>
                            Login
                        </NavLink>
                    </li>
                    <li className={classnames(classes.navitem)}>
                        <NavLink className={classnames(classes.navlink)} to={{
                            pathname: '/register',
                            state: { url: window.location.pathname },
                        }}>
                            Register
                        </NavLink>
                    </li>
                </>
            );
        }
    }

    return (
        <header className={classnames(classes.header, 'center-children sticky col')} ref={forwardRef}>
            <nav className={classnames(classes.navbar, 'w-100 row my-3')} ref={navbar}>
                <ul className={classnames(classes.navlist, 'flex row')}>
                    <NavLink className={classnames(classes.brand, 'mr-auto col center-children')} to="/">
                        <Knockout className={classnames(classes.siteHeader, 'py-2')} as="h1">TPH</Knockout>
                        <p className={classnames(classes.siteSlogan)}>The pioneer hangout</p>
                    </NavLink>
                    {user && navItems()}
                </ul>
            </nav>
        </header>
    );
}
