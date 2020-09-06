import React, { useState, useRef, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import Sidebar from './Sidebar';
import User from './User';

export default function Users() {
    const styles = createUseStyles({
        wrapper: {
            color: 'var(--text-secondary)',
            'flex-direction': 'column',
            display: 'flex',
            margin: '15px',
            flex: 1,
        },
        tableWrapper: {
            'box-shadow': '0 0 15px 0 rgba(0, 0, 0, 0.15)',
            background: 'white',
        },
        table: {
            border: '1px solid rgb(225, 225, 225)',
            'border-collapse': 'collapse',
            width: 'calc(100% - 30px)',
            margin: '15px',
        },
        toolbar: {
            'margin-bottom': '15px',
            'align-items': 'center',
            display: 'flex',
        },
        th: {
            'text-align': 'left',
            'font-weight': 500,
            padding: '15px',
            width: '25%',
        },
        header: {
            'margin-right': '10px',
            'font-size': '1.5rem',
            'font-weight': 500,
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
            <div className={classes.wrapper}>
                <div className={classes.toolbar}>
                    <h1 className={classes.header}>Users</h1>
                    <button className="btnDashboard">
                        Add user
                    </button>
                </div>
                <div className={classes.tableWrapper}>
                    <table className={classes.table}>
                        <thead className={classes.thead}>
                            <tr className={classes.tr}>
                                <th className={classes.th}>ID</th>
                                <th className={classes.th}>Username</th>
                                <th className={classes.th}>Email</th>
                                <th className={classes.th}>Actions</th>
                            </tr>
                        </thead>
                        <tbody className={classes.tbody}>
                            {
                                users.map(({ id, username, email }) => (
                                    <User id={id} username={username} email={email} setUsers={setUsers} key={id} />
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}