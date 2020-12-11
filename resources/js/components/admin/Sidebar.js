import { createUseStyles } from 'react-jss';
import classnames from 'classnames';
import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
    const styles = createUseStyles({
        sidebar: {
            backgroundColor: 'var(--color-main)',
            color: 'var(--color-primary)',
            minWidth: 200,
        },
        brand: {
            fontFamily: 'Merriweather',
            margin: [10, 20],
            letterSpacing: 3,
            fontSize: '2rem',
            color: 'inherit',
            marginTop: 20,
            '&:hover': {
                color: 'inherit',
            },
        },
        navlist: {
            marginTop: 20,
        },
        navlink: {
            border: '2px solid transparent',
            fontSize: '1.25rem',
            transition: 'none',
            padding: [10, 20],
            color: 'inherit',
            '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.35)',
                textDecoration: 'none',
                color: 'inherit',
            },
            '&.active': {
                borderLeftColor: '',
            },
        },
    });
    const classes = styles();

    return (
        <div className={classnames(classes.sidebar, 'bold col')}>
            <NavLink className={classnames(classes.brand, 'w-fit')} to="/">TPH</NavLink>
            <ul className={classnames(classes.navlist)}>
                <li>
                    <NavLink className={classnames(classes.navlink, 'd-flex')} to="/admin">Start</NavLink>
                    <NavLink className={classnames(classes.navlink, 'd-flex')} to="/admin/users">Users</NavLink>
                </li>
            </ul>
        </div>
    );
}
