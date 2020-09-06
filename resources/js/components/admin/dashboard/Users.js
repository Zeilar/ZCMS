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
            padding: '15px',
        },
        table: {
            border: '1px solid rgb(225, 225, 225)',
            'border-collapse': 'collapse',
            width: '100%',
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
            'margin-bottom': '15px',
            'font-size': '1.5rem',
            'font-weight': 500,
        },
        search: {
            'margin-left': 'auto',
        },
        searchInput: {
            transition: 'box-shadow 0.05s linear',
            'border-radius': '5px',
            'margin-left': '10px',
            padding: '5px',
            '&:focus': {
                'box-shadow': '0 0 0 2px var(--dashboard-primary)',
            },
        },
    });
    const classes = styles();

    const [searchResults, setSearchResults] = useState([]);
    const [users, setUsers] = useState([]);
    const searchInput = useRef();

    async function getUsers() {
        await fetch('/admin/users/all')
            .then(response => response.json())
            .then(users => setUsers(users));
    }

    function search() {
        const results = users.filter(user => {
            for (const property in user) {
                if (property === 'created_at' || property === 'updated_at') break;
                if (String(user[property]).includes(searchInput.current.value)) {
                    return user;
                }
            }
        });
        setSearchResults(results);
    }

    useEffect(() => {
        if (users.length <= 0) getUsers();
    }, [users, getUsers]);

    return (
        <>
            <Sidebar active="users" />
            <div className={classes.wrapper}>
                <h1 className={classes.header}>Users</h1>
                <div className={classes.tableWrapper}>
                    <div className={classes.toolbar}>
                        <button className="btnDashboard">
                            Add user
                        </button>
                        <div className={classes.search}>
                            <span>Search</span>
                            <input className={classes.searchInput} ref={searchInput} onInput={search} type="text" />
                        </div>
                    </div>
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
                                searchResults.length > 0
                                    ? searchResults.map(({ id, username, email }) => (
                                        <User id={id} username={username} email={email} setUsers={setUsers} key={id} />
                                    ))
                                    : users.map(({ id, username, email }) => (
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