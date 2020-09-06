import React, { useState, useRef, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import Sidebar from './Sidebar';
import User from './User';

export default function Users() {
    const styles = createUseStyles({
        table: {
            'border-collapse': 'collapse',
        },
        th: {
            'text-align': 'left',
        },
    });
    const classes = styles();

    const [users, setUsers] = useState([]);

    async function getUsers() {
        await fetch('/admin/users/all')
            .then(response => response.json())
            .then(users => setUsers(users));
    }

    useEffect(() => {
        if (users.length <= 0) getUsers();
    }, [users, getUsers]);

    return (
        <>
            <Sidebar active="users" />
            <table className={classes.table}>
                <thead className={classes.thead}>
                    <tr className={classes.tr}>
                        <th className={classes.th}>ID</th>
                        <th className={classes.th}>Username</th>
                        <th className={classes.th}>Email</th>
                        <th className={classes.th}>Avatar</th>
                        <th className={classes.th}>Actions</th>
                    </tr>
                </thead>
                <tbody className={classes.tbody}>
                    {
                        users.map(({ id, username, email, avatar }) => (
                            <User id={id} username={username} email={email} avatar={avatar} setUsers={setUsers} key={id} />
                        ))
                    }
                </tbody>
            </table>
        </>
    );
}