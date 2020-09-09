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
            'table-layout': 'fixed',
            width: '100%',
        },
        toolbar: {
            'align-items': 'center',
            'margin': '15px 0',
            display: 'flex',
        },
        th: {
            'text-align': 'left',
            'font-weight': 500,
            padding: '15px',
            '&.small': {
                width: '50px',
            }
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
                'box-shadow': '0 0 0 1px var(--dashboard-primary)',
            },
        },
        bulk: {
            'justify-content': 'center',
            'align-items': 'center',
            display: 'flex',
        },
        bulkSelect: {
            'margin-right': '10px',
            'user-select': 'none',
            padding: '8px',
        },
    });
    const classes = styles();

    const [showUserForm, setShowUserForm] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [errorContent, setErrorContent] = useState();
    const [checkboxes, setCheckboxes] = useState([]);
    const [error, setError] = useState(false);
    const [users, setUsers] = useState([]);
    const searchInput = useRef();
    const bulkSelect = useRef();

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

    async function bulk() {
        const action = bulkSelect.current.value;
        if (action === 'edit') {
            
        }
        if (action === 'delete') {
            const args = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(checkboxes),
            };
            await fetch('/admin/users/bulk/delete', args)
                .then(response => response.json())
                .then(users => setUsers(users))
                .catch(error => alert(error));
        }
    }

    function checkAll(e) {
        const checked = e.target.checked;
        if (!checked) return setCheckboxes([]);
        setCheckboxes(users.map(user => user.id));
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
                    <button className="btnDashboard" onClick={() => setShowUserForm(p => !p)}>
                        Add user
                    </button>
                    {
                        showUserForm &&
                            <form className={classes.addUser} action="/admin/users" method="POST">
                                <div className={classes.fieldRow}>
                                    <input type="text" name="username" autoComplete="off" required />
                                </div>
                                <div className={classes.fieldRow}>
                                    <input type="email" name="email" autoComplete="off" required />
                                </div>
                                <div className={classes.fieldRow}>
                                    <input type="password" name="password" autoComplete="off" required />
                                </div>
                                <div className={classes.fieldRow}>
                                    <input type="password" name="password_confirmation" autoComplete="off" required />
                                </div>
                                <button className="btnDashboard" type="submit">
                                    Create
                                </button>
                            </form>
                    }
                    <div className={classes.toolbar}>
                        <div className={classes.bulk}>
                            <select className={classes.bulkSelect} ref={bulkSelect}>
                                <option>With selected</option>
                                <option value="edit">Edit</option>
                                <option value="delete">Delete</option>
                            </select>
                            <button className="btnDashboard" onClick={bulk}>
                                Apply
                            </button>
                        </div>
                        <div className={classes.search}>
                            <span>Search</span>
                            <input className={classes.searchInput} ref={searchInput} onInput={search} type="text" />
                        </div>
                    </div>
                    <table className={classes.table}>
                        <thead className={classes.thead}>
                            <tr className={classes.tr}>
                                <th className={`${classes.th} small`}>
                                    <input type="checkbox" onClick={checkAll} />
                                </th>
                                <th className={`${classes.th} small`}>ID</th>
                                <th className={classes.th}>Username</th>
                                <th className={classes.th}>Email</th>
                                <th className={classes.th}>Actions</th>
                            </tr>
                        </thead>
                        <tbody className={classes.tbody}>
                            {
                                searchInput?.current?.value !== ''
                                    ? searchResults.map(({ id, username, email }) => (
                                        <User id={id} username={username} email={email} setUsers={setUsers} checkboxes={checkboxes} setCheckboxes={setCheckboxes} key={id} />
                                    ))
                                    : users.map(({ id, username, email }) => (
                                        <User id={id} username={username} email={email} setUsers={setUsers} checkboxes={checkboxes} setCheckboxes={setCheckboxes} key={id} />
                                    ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}