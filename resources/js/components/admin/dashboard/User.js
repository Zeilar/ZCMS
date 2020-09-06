import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createUseStyles } from 'react-jss';

export default function User({ id, username, email, avatar, setUsers }) {
    const styles = createUseStyles({
        td: {
            'border-bottom': '1px solid white',
        },
    });
    const classes = styles();

    const [editing, setEditing] = useState(false);

    async function remove() {
        await fetch(`/admin/users/${id}`, { method: 'DELETE' })
            .then(response => response.json())
            .then(users => setUsers(users));
    }

    return (
        <tr className={classes.tr}>
            <td className={classes.td}>{id}</td>
            <td className={classes.td}>{username}</td>
            <td className={classes.td}>{email}</td>
            <td className={classes.td}>
                <img src={`${location.origin}${avatar}`} alt="User avatar" />
            </td>
            <td className={classes.td}>
                <button>
                    Edit
                </button>
                <button onClick={remove}>
                    Delete
                </button>
            </td>
        </tr>
    );
}