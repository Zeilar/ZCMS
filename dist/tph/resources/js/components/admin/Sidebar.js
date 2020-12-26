import { createUseStyles } from 'react-jss';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import React from 'react';

export default function Sidebar() {
    const styles = createUseStyles({
        sidebar: {
            boxShadow: [0, 0, 5, 0, 'rgba(0, 0, 0, 0.75)'],
            backgroundColor: 'var(--color-main)',
            color: 'var(--color-primary)',
            minWidth: 200,
            zIndex: 100,
        },
        brand: {
            fontFamily: 'Merriweather',
            letterSpacing: 3,
            fontSize: '2rem',
            color: 'inherit',
            marginTop: 20,
            padding: 20,
            '&:hover': {
                textDecoration: 'none',
                color: 'inherit',
            },
        },
        navlist: {
            
        },
        navlink: {
            borderLeft: '5px solid transparent',
            fontFamily: 'Montserrat',
            fontSize: '1.25rem',
            userSelect: 'none',
            transition: 'none',
            padding: [10, 20],
            color: 'inherit',
            '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.15)',
                textDecoration: 'none',
                color: 'inherit',
            },
            '&.active': {
                borderLeftColor: 'var(--color-primary)',
                backgroundColor: 'rgba(0, 0, 0, 0.75)',
                fontWeight: 'bold',
            },
        },
    });
    const classes = styles();

    return (
        <div className={classnames(classes.sidebar, 'col')}>
            <NavLink className={classnames(classes.brand, 'no-select text-center bold')} to="/">TPH</NavLink>
            <ul className={classnames(classes.navlist, 'mt-5')}>
                <li>
                    <NavLink className={classnames(classes.navlink, 'd-flex')} to="/admin" exact>Start</NavLink>
                </li>
                <li>
                    <NavLink className={classnames(classes.navlink, 'd-flex')} to="/admin/users" exact>Users</NavLink>
                </li>
            </ul>
        </div>
    );
}
