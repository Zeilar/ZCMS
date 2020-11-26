import React, { useState, useRef, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import classnames from 'classnames';
import { NavLink } from 'react-router-dom';

export default function User({ user }) {
    const styles = createUseStyles({
        wrapper: {
            boxShadow: [0, 0, 5, 0, 'rgba(0, 0, 0, 0.15)'],
            color: 'var(--text-primary)',
            alignItems: 'center',
            width: 350,
            '&:hover': {
                textDecoration: 'none',
                '& .username': {
                    color: 'var(--color-link)',
                },
            },
        },
        avatar: {
            width: 50,
        },
        username: {

        },
    });
    const classes = styles();

    return (
        <NavLink className={classnames(classes.wrapper, 'row p-2 mt-2')} to={`/user/${user.username}`}>
            <img className={classnames(classes.avatar, 'round')} src={`/storage/avatars/${user.avatar}`} alt="Profile picture" />
            <h3 className={classnames(classes.username, `color-${user.roles[0].clearance}`, 'ml-2 username')}>{user.username}</h3>
        </NavLink>
    );
}
