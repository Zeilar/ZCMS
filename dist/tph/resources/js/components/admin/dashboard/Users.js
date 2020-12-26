import { mdiLoading, mdiAlertCircleOutline, mdiCheckCircleOutline, mdiCloseCircle } from '@mdi/js';
import React, { useState, useRef, useEffect } from 'react';
import Tags from "@yaireo/tagify/dist/react.tagify";
import SubmitButton from '../../SubmitButton';
import { createUseStyles } from 'react-jss';
import "@yaireo/tagify/dist/tagify.css";
import Sidebar from './Sidebar';
import Icon from '@mdi/react';
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
            margin: '5px 0',
        },
        fieldRow: {
            'flex-direction': 'column',
            display: 'flex',
            margin: '5px',
        },
        rolesInputWrapper: {
            padding: '5px',
        },
        addUserSubmit: {
            margin: '10px',
        },
        loading: {
            margin: 'auto',
            'margin-top': '10px',
            height: '50px',
            width: '50px',
        },
        error: {
            'flex-direction': 'column',
            'align-items': 'center',
            margin: '10px 0',
            display: 'flex',
        },
        errorMessage: {
            'margin-bottom': '10px',
        },
        message: {
            'align-items': 'center',
            'border-radius': '5px',
            border: '1px solid',
            margin: '10px 0',
            display: 'flex',
            padding: '10px',
            '&.error': {
                color: 'var(--color-danger)',
                'border-color': 'red',
            },
            '&.success': {
                'border-color': 'green',
                color: 'green',
            },
        },
        messageContent: {

        },
        messageIcon: {
            'align-items': 'center',
            'margin-right': '5px',
            display: 'flex',
            height: '20px',
            width: '20px',
        },
        messageClose: {
            'margin-left': 'auto',
            background: 'none',
            color: 'inherit',
            display: 'flex',
        },
        messageCloseIcon: {
            height: '20px',
            width: '20px',
        },
    });
    const classes = styles();

    const [showUserForm, setShowUserForm] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [translations, setTranslations] = useState();
    const [checkboxes, setCheckboxes] = useState([]);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState();
    const [users, setUsers] = useState([]);
    const searchInput = useRef();
    const bulkSelect = useRef();
    const addUser = useRef();

    async function getUsers() {
        setError(false);
        await fetch('/admin/users/all')
            .then(response => response.json())
            .then(users => setUsers(users))
            .catch(error => setError(true));
    }

    async function getTranslations() {
        await fetch('/api/translations')
            .then(response => response.json())
            .then(translations => setTranslations(translations));
    }

    function search() {
        const results = users.filter(user => {
            const search = searchInput.current.value.toLowerCase();
            if (user.suspended && search.includes(translations?.dashboard?.suspended)) {
                return user;
            }

            const roleMatches = [];
            user.roles.forEach(role => {
                if (role.name.toLowerCase().includes(search)) {
                    roleMatches.push(user);
                }
            });
            if (roleMatches.length > 0) return roleMatches;
            
            for (const property in user) {
                if (String(user[property]).toLowerCase().includes(search)) {
                    return user;
                }
            }
        });
        setSearchResults(results);
    }

    async function bulk() {
        if (checkboxes.length <= 0) {
            return setMessage({
                content: translations?.dashboard?.select_user_first,
                type: 'error',
            });
        }
        const action = bulkSelect.current.value;
        if (action === 'delete') {
            const answer = confirm(translations?.dashboard?.delete_users_confirm);
            if (answer) {
                const args = {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(checkboxes),
                };
                await fetch('/admin/users/bulk/delete', args)
                    .then(response => {
                        if (response.status === 200) {
                            return response.json();
                        }
                        let message = translations?.dashboard?.error;
                        if (response.status === 403) {
                            message = translations?.dashboard?.insufficient_permissions;
                        }
                        if (response.status === 404) {
                            message = translations?.dashboard?.user_not_found;
                        }
                        setMessage({
                            content: message,
                            type: 'error',
                        });
                        return false;
                    })
                    .then(users => {
                        if (users) {
                            setCheckboxes([]);
                            setMessage({
                                content: translations?.dashboard?.deleted_users,
                                type: 'success',
                            });
                            setUsers(users);
                        }
                    })
                    .catch(error => alert(error));
            }
        }
    }

    function checkAll(e) {
        const checked = e.target.checked;
        if (!checked) return setCheckboxes([]);
        setCheckboxes(users.map(user => user.id));
    }

    useEffect(() => {
        if (translations == null) getTranslations();
        if (!error && users.length <= 0) getUsers();
    }, [translations, error, users, getUsers]);

    return (
        <>
            <Sidebar active="users" />
            <div className={classes.wrapper}>
                <h1 className={classes.header}>Users</h1>
                <div className={classes.tableWrapper}>
                    <button className="btnDashboard" onClick={() => setShowUserForm(p => !p)}>
                        {translations?.dashboard?.add_user}
                    </button>
                    {
                        showUserForm &&
                            <form className={classes.addUser} action="/admin/users" method="POST" ref={addUser}>
                                <div className={classes.fieldRow}>
                                    <span>{translations?.dashboard?.username}</span>
                                    <input className={classes.addUserInput} type="text" name="username" autoComplete="off" required />
                                </div>
                                <div className={classes.fieldRow}>
                                    <span>{translations?.dashboard?.email}</span>
                                    <input className={classes.addUserInput} type="email" name="email" autoComplete="off" required />
                                </div>
                                <div className={classes.fieldRow}>
                                    <span>{translations?.dashboard?.password}</span>
                                    <input className={classes.addUserInput} type="password" name="password" autoComplete="off" required />
                                </div>
                                <div className={classes.fieldRow}>
                                    <span>{translations?.dashboard?.password_confirm}</span>
                                    <input className={classes.addUserInput} type="password" name="password_confirmation" autoComplete="off" required />
                                </div>
                                <div className={classes.fieldRow}>
                                    <span>{translations?.dashboard?.roles}</span>
                                    <div className={classes.rolesInputWrapper}>
                                        <Tags name="roles" value="user" />
                                    </div>
                                </div>
                                <SubmitButton className={`${classes.addUserSubmit} btnDashboard`} onClick={() => addUser?.current?.submit()}>
                                    <span>{translations?.dashboard?.create}</span>
                                </SubmitButton>
                            </form>
                    }
                    <div className={classes.toolbar}>
                        <div className={classes.bulk}>
                            <select className={classes.bulkSelect} ref={bulkSelect}>
                                <option>{translations?.dashboard?.with_selected}</option>
                                <option value="delete">{translations?.dashboard?.delete}</option>
                            </select>
                            <button className="btnDashboard" onClick={bulk}>
                                {translations?.dashboard?.apply}
                            </button>
                        </div>
                        <div className={classes.search}>
                            <span>{translations?.dashboard?.search}</span>
                            <input className={classes.searchInput} ref={searchInput} onInput={search} type="text" />
                        </div>
                    </div>
                    {
                        message &&
                            <div className={`${classes.message} ${message?.type ?? ''}`}>
                                <Icon className={classes.messageIcon} path={message?.type === 'error' ? mdiAlertCircleOutline : mdiCheckCircleOutline} />
                                <p className={classes.messageContent}>
                                    {message?.content}
                                </p>
                                <button className={classes.messageClose} onClick={() => setMessage(null)}>
                                    <Icon className={classes.messageCloseIcon} path={mdiCloseCircle} />
                                </button>
                            </div>
                    }
                    <table className={classes.table}>
                        <thead className={classes.thead}>
                            <tr className={classes.tr}>
                                <th className={`${classes.th} small`}>
                                    <input type="checkbox" onClick={checkAll} />
                                </th>
                                <th className={`${classes.th} small`}>
                                    ID
                                </th>
                                <th className={classes.th}>
                                    {translations?.dashboard?.username}
                                </th>
                                <th className={classes.th}>
                                    {translations?.dashboard?.email}
                                </th>
                                <th className={classes.th}>
                                    <span>{translations?.dashboard?.roles}</span>
                                </th>
                                <th className={classes.th}>
                                    <span>{translations?.dashboard?.actions}</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className={classes.tbody}>
                            {
                                searchInput?.current?.value !== ''
                                    ? searchResults.map(({ id, username, email, roles, suspended }) => (
                                        <User 
                                            key={id}
                                            id={id}
                                            username={username}
                                            email={email}
                                            roles={roles}
                                            suspended={suspended}
                                            setUsers={setUsers}
                                            checkboxes={checkboxes}
                                            setCheckboxes={setCheckboxes}
                                            setMessage={setMessage}
                                            translations={translations}
                                        />
                                    ))
                                    : users.map(({ id, username, email, roles, suspended }) => (
                                        <User 
                                            key={id}
                                            id={id}
                                            username={username}
                                            email={email}
                                            roles={roles}
                                            suspended={suspended}
                                            setUsers={setUsers}
                                            checkboxes={checkboxes}
                                            setCheckboxes={setCheckboxes}
                                            setMessage={setMessage}
                                            translations={translations}
                                        />
                                    ))
                            }
                        </tbody>
                    </table>
                    {
                        searchResults.length <= 0 && users.length <= 0 && !error &&
                            <div className={classes.loading}>
                                <Icon path={mdiLoading} spin={1} />
                            </div>
                    }
                    {
                        error &&
                            <div className={classes.error}>
                                <h1 className={classes.errorMessage}>
                                    {translations?.dashboard?.error}
                                </h1>
                                <button className="btnDashboard" onClick={getUsers}>
                                    {translations?.dashboard?.try_again}
                                </button>
                            </div>
                    }
                </div>
            </div>
        </>
    );
}