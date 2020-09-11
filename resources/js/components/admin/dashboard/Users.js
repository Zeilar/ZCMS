import React, { useState, useRef, useEffect } from 'react';
import Tags from "@yaireo/tagify/dist/react.tagify";
import SubmitButton from '../../SubmitButton';
import { createUseStyles } from 'react-jss';
import "@yaireo/tagify/dist/tagify.css";
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
        addUser: {
            border: '1px solid var(--border-primary)',
            'margin-top': '5px',
        },
        addUserInput: {
            margin: '5px',
        },
        formLegend: {
            'margin-left': '5px',
        },
        formFieldset: {
            margin: '10px',
        },
        rolesInputWrapper: {
            padding: '5px',
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
    const addUser = useRef();

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
                            <form className={classes.addUser} action="/admin/users" method="POST" ref={addUser}>
                                <div className={classes.fieldRow}>
                                    <fieldset className={classes.formFieldset}>
                                        <legend className={classes.formLegend}>
                                            Username
                                        </legend>
                                        <input className={classes.addUserInput} type="text" name="username" autoComplete="off" required />
                                    </fieldset>
                                </div>
                                <div className={classes.fieldRow}>
                                    <fieldset className={classes.formFieldset}>
                                        <legend className={classes.formLegend}>
                                            Email
                                        </legend>
                                        <input className={classes.addUserInput} type="email" name="email" autoComplete="off" required />
                                    </fieldset>
                                </div>
                                <div className={classes.fieldRow}>
                                    <fieldset className={classes.formFieldset}>
                                        <legend className={classes.formLegend}>
                                            Password
                                        </legend>
                                        <input className={classes.addUserInput} type="password" name="password" autoComplete="off" required />
                                    </fieldset>
                                </div>
                                <div className={classes.fieldRow}>
                                    <fieldset className={classes.formFieldset}>
                                        <legend className={classes.formLegend}>
                                            Confirm Password
                                        </legend>
                                        <input className={classes.addUserInput} type="password" name="password_confirmation" autoComplete="off" required />
                                    </fieldset>
                                </div>
                                <div className={classes.fieldRow}>
                                    <fieldset className={classes.formFieldset}>
                                        <legend className={classes.formLegend}>
                                            Roles
                                        </legend>
                                        <div className={classes.rolesInputWrapper}>
                                            <Tags name="roles" value="user" />
                                        </div>
                                    </fieldset>
                                </div>
                                <SubmitButton className="btnDashboard" onClick={() => addUser?.current?.submit()}>
                                    <span>Create</span>
                                </SubmitButton>
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