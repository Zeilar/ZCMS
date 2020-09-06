import { mdiTrashCan, mdiSquareEditOutline } from '@mdi/js';
import React, { useState, useRef, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import Icon from '@mdi/react';

export default function User({ id, username, email, setUsers }) {
    const styles = createUseStyles({
        td: {
            'border-top': '1px solid rgb(225, 225, 225)',
            padding: '8px 15px',
            '&.actions': {
                display: 'flex',
            },
            '&.edit': {
                border: 0,
            },
        },
        tr: {
            '&:nth-child(odd)': {
                background: 'rgb(250, 250, 250)',
            },
        },
        icon: {
            height: '20px',
            width: '20px',
        },
    });
    const classes = styles();

    const [editing, setEditing] = useState(false);

    async function remove() {
        const answer = confirm(`Are you sure you want to delete user ${username}?`);

        if (answer) {
            await fetch(`/admin/users/${id}`, { method: 'DELETE' })
                .then(response => response.json())
                .then(users => setUsers(users))
                .catch(error => alert(error));
        }
    }

    function edit() {
        setEditing(true);
    }

    function save() {
        setEditing(false);
    }

    return (
        <>
            <tr className={classes.tr}>
                <td className={classes.td}>{id}</td>
                <td className={classes.td}>{username}</td>
                <td className={classes.td}>{email}</td>
                <td className={`${classes.td} actions`}>
                    <button className="btnDashboard" onClick={edit}>
                        <Icon className={classes.icon} path={mdiSquareEditOutline} />
                        <span>Edit</span>
                    </button>
                    <button className="btnDashboard delete" onClick={remove}>
                        <Icon className={classes.icon} path={mdiTrashCan} />
                        <span>Delete</span>
                    </button>
                </td>
            </tr>
            {
                editing &&
                    <tr>
                        <td className={`${classes.td} edit`}>
                            <input type="text" name="id" defaultValue={id} />
                        </td>
                        <td className={`${classes.td} edit`}>
                            <input type="text" name="username" defaultValue={username} />
                        </td>
                        <td className={`${classes.td} edit`}>
                            <input type="text" name="email" defaultValue={email} />
                        </td>
                        <td className={`${classes.td} edit actions`}>
                            <button className="btnDashboard" onClick={() => setEditing(false)}>
                                Cancel
                            </button>
                            <button className="btnDashboard" onClick={save}>
                                Save
                            </button>
                        </td>
                    </tr>
            }
        </>
    );
}